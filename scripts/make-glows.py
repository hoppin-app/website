"""Bakes the glow behind the Journey's phone into small transparent images.

The glow used to be the screenshot itself under `filter: blur(64px)`. Safari
clips a blur like that to the image's own box on first paint, so the page
opened with a pale rectangle behind the phone until the first scroll. A
pre-blurred image with its soft edge already inside it has nothing to clip,
and it is far cheaper to draw on a phone.

Each glow is the screenshot stretched over the box the old CSS gave it (from
18% left of the phone to 18% right of it, starting 8% down), blurred with a
Gaussian a quarter of the phone's width across and saturated a touch, on a
canvas with three standard deviations of transparent room on every side.

    python3 website/scripts/make-glows.py        # needs Pillow and numpy

Prints the box to paste into `.device-glow` in app/globals.css; rerun it
whenever a screenshot in public/shots/ changes.
"""

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance

SHOTS = Path(__file__).resolve().parent.parent / "public" / "shots"
NAMES = ["conversation", "mesh", "inbox"]

# Geometry in phone widths (W). The phone is 644 x 1400.
ASPECT = 1400 / 644                 # H in W
BOX = (-0.18, 0.08 * ASPECT, 1.36, 1.0 * ASPECT)   # left, top, width, height
SIGMA = 0.24                        # blur standard deviation, in W
MARGIN = 3 * SIGMA                  # where the Gaussian has faded to nothing
PX_PER_W = 60                       # render scale: the glow is soft, so small is plenty
SATURATE = 1.25


def gaussian_blur(pixels: np.ndarray, sigma: float) -> np.ndarray:
    """Separable Gaussian blur of an H x W x C float array, zero outside."""
    radius = int(math.ceil(3 * sigma))
    x = np.arange(-radius, radius + 1)
    kernel = np.exp(-(x ** 2) / (2 * sigma ** 2))
    kernel /= kernel.sum()
    h, w, _ = pixels.shape
    padded = np.pad(pixels, ((radius, radius), (radius, radius), (0, 0)))
    across = sum(k * padded[:, i:i + w, :] for i, k in enumerate(kernel))
    return sum(k * across[i:i + h, :, :] for i, k in enumerate(kernel))


def main() -> None:
    left, top, width, height = BOX
    canvas_w = round((width + 2 * MARGIN) * PX_PER_W)
    canvas_h = round((height + 2 * MARGIN) * PX_PER_W)
    box_w = round(width * PX_PER_W)
    box_h = round(height * PX_PER_W)
    offset = round(MARGIN * PX_PER_W)

    for name in NAMES:
        shot = Image.open(SHOTS / f"{name}.webp").convert("RGBA").resize((box_w, box_h), Image.LANCZOS)
        pixels = np.zeros((canvas_h, canvas_w, 4))
        pixels[offset:offset + box_h, offset:offset + box_w] = np.asarray(shot, dtype=float) / 255

        # Blur premultiplied, so the transparent surround doesn't bleed black
        # into the colours.
        pixels[..., :3] *= pixels[..., 3:4]
        pixels = gaussian_blur(pixels, SIGMA * PX_PER_W)
        alpha = pixels[..., 3:4]
        pixels[..., :3] = np.where(alpha > 1e-4, pixels[..., :3] / np.maximum(alpha, 1e-4), 0)

        rgba = Image.fromarray(np.clip(pixels * 255 + 0.5, 0, 255).astype(np.uint8), "RGBA")
        rgb = ImageEnhance.Color(rgba.convert("RGB")).enhance(SATURATE)
        rgb.putalpha(rgba.getchannel("A"))
        out = SHOTS / f"glow-{name}.webp"
        rgb.save(out, "WEBP", quality=85, method=6)
        print(f"{out.name}: {canvas_w} x {canvas_h}, {out.stat().st_size} bytes")

    # The canvas as percentages of the phone, for .device-glow.
    print("\n.device-glow box (percent of the phone's width / height):")
    print(f"  left:   {-(MARGIN - left) * 100:.2f}%")
    print(f"  top:    {(top - MARGIN) / ASPECT * 100:.2f}%")
    print(f"  width:  {(width + 2 * MARGIN) * 100:.2f}%")
    print(f"  height: {(height + 2 * MARGIN) / ASPECT * 100:.2f}%")


if __name__ == "__main__":
    main()
