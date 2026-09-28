"use client";

import { useEffect, useRef } from "react";
import "./ScrollVideo.css";

/* ==========================================================================
   Scroll-scrubbed video

   A video exported as numbered still frames, played by scroll position:
   a tall spacer pins a full-viewport stage, and progress through the spacer
   picks the frame. Frames are drawn on a <canvas> ("cover" fit, sharp on
   retina) so swapping 180 images costs one drawImage per animation frame.

   Loading: frame 0 first (so the stage is never blank), then everything else
   in the background. While a frame is still downloading, the nearest loaded
   one is shown instead. Phones get the smaller frame set.

   Fit: "cover" fills the stage. "contain" (for portrait footage) keeps the
   whole frame visible with rounded corners, over a blurred, dimmed copy of
   the same frame that fills the rest of the stage.

   Reduced motion: no pinning, no scrubbing — a single representative still.
   ========================================================================== */

export type ScrollVideoCaption = {
  /** Progress (0–1) at which the caption is fully visible. */
  at: number;
  title: string;
  body?: string;
};

type Props = {
  /** Number of frames, named 000…(n-1). */
  frameCount: number;
  /** Folder under /public holding `lg/` and `sm/` sets of `NNN.webp`. */
  basePath: string;
  captions?: ScrollVideoCaption[];
  /** Scroll distance per frame, in px. Larger = slower playback. */
  pxPerFrame?: number;
  /** Frame shown when motion is reduced. */
  posterFrame?: number;
  fit?: "cover" | "contain";
  label: string;
};

const pad = (n: number) => String(n).padStart(3, "0");

export default function ScrollVideo({
  frameCount,
  basePath,
  captions = [],
  pxPerFrame = 14,
  posterFrame = Math.floor(frameCount * 0.6),
  fit = "cover",
  label,
}: Props) {
  const spacerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const backdropRef = useRef<HTMLCanvasElement | null>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const spacer = spacerRef.current;
    if (!canvas || !spacer) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const backdrop = backdropRef.current;
    const bctx = backdrop?.getContext("2d") ?? null;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const set = window.matchMedia("(max-width: 820px)").matches ? "sm" : "lg";
    const url = (i: number) => `${basePath}/${set}/${pad(i)}.webp`;

    const images: HTMLImageElement[] = new Array(frameCount);
    const loaded = new Uint8Array(frameCount);
    let current = -1;
    let raf: number | null = null;
    let cancelled = false;

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          loaded[i] = 1;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = url(i);
        images[i] = img;
      });

    const nearestLoaded = (i: number) => {
      for (let d = 0; d < frameCount; d++) {
        if (i - d >= 0 && loaded[i - d]) return i - d;
        if (i + d < frameCount && loaded[i + d]) return i + d;
      }
      return -1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (backdrop) {
        // Tiny on purpose: CSS blurs it heavily anyway.
        backdrop.width = Math.max(1, Math.round(w / 12));
        backdrop.height = Math.max(1, Math.round(h / 12));
      }
      current = -1; // force a redraw at the new size
    };

    const draw = (i: number) => {
      const shown = nearestLoaded(i);
      if (shown < 0 || shown === current) return;
      const img = images[shown];
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      if (fit === "contain") {
        if (bctx && backdrop) {
          const bs = Math.max(backdrop.width / iw, backdrop.height / ih);
          bctx.drawImage(img, (backdrop.width - iw * bs) / 2, (backdrop.height - ih * bs) / 2, iw * bs, ih * bs);
        }
        // Leave breathing room around the frame on wide screens.
        const pad = Math.round(Math.min(cw, ch) * 0.06);
        const scale = Math.min((cw - pad * 2) / iw, (ch - pad * 2) / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        // Wide screens: sit right of centre so captions get the left side
        // (matches the wide-screen caption layout in globals.css).
        const wide = window.matchMedia("(min-width: 900px)").matches;
        const x = wide ? Math.min(cw - pad - dw, cw * 0.66 - dw / 2) : (cw - dw) / 2;
        const y = (ch - dh) / 2;
        ctx.clearRect(0, 0, cw, ch);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, dw, dh, Math.round(dw * 0.06));
        ctx.clip();
        ctx.drawImage(img, x, y, dw, dh);
        ctx.restore();
      } else {
        // "cover": fill the stage, crop the overflow evenly.
        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      }
      current = shown;
    };

    const progress = () => {
      const rect = spacer.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      return travel <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / travel));
    };

    const render = () => {
      raf = null;
      const p = progress();
      draw(Math.min(frameCount - 1, Math.round(p * (frameCount - 1))));

      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      captions.forEach((c, idx) => {
        const el = captionRefs.current[idx];
        if (!el) return;
        // Fully visible at `at`, fading out linearly 0.1 either side.
        const o = Math.max(0, 1 - Math.abs(p - c.at) / 0.1);
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - o) * 24 * Math.sign(c.at - p)).toFixed(1)}px, 0)`;
      });
    };

    const schedule = () => {
      if (raf === null) raf = requestAnimationFrame(render);
    };

    resize();

    if (reduced) {
      spacer.dataset.reduced = "true";
      load(posterFrame).then(() => !cancelled && draw(posterFrame));
      captionRefs.current.forEach((el) => el && (el.style.opacity = "1"));
      const onResize = () => {
        resize();
        draw(posterFrame);
      };
      window.addEventListener("resize", onResize);
      return () => {
        cancelled = true;
        window.removeEventListener("resize", onResize);
      };
    }

    load(0).then(() => {
      if (cancelled) return;
      schedule();
      // Everything else, a few at a time so the first screens stay snappy.
      let next = 1;
      const pump = () => {
        if (cancelled || next >= frameCount) return;
        const batch = [];
        for (let k = 0; k < 6 && next < frameCount; k++) batch.push(load(next++));
        Promise.all(batch).then(() => {
          schedule();
          pump();
        });
      };
      pump();
    });

    const onResize = () => {
      resize();
      schedule();
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [frameCount, basePath, captions, posterFrame, fit]);

  return (
    <section
      ref={spacerRef}
      aria-label={label}
      className="scrollvideo-spacer relative"
      data-fit={fit}
      style={{ ["--scrollvideo-height" as string]: `calc(100vh + ${frameCount * pxPerFrame}px)` }}
    >
      <div className="scrollvideo-stage">
        {fit === "contain" && (
          <canvas ref={backdropRef} className="scrollvideo-backdrop" aria-hidden="true" />
        )}
        <canvas ref={canvasRef} className="scrollvideo-canvas" aria-hidden="true" />
        <div className="scrollvideo-shade" aria-hidden="true" />

        <div className="scrollvideo-captions">
          {captions.map((c, i) => (
            <div
              key={c.title}
              ref={(el) => {
                captionRefs.current[i] = el;
              }}
              className="scrollvideo-caption"
            >
              <h2>{c.title}</h2>
              {c.body && <p>{c.body}</p>}
            </div>
          ))}
        </div>

        <div className="scrollvideo-progress" aria-hidden="true">
          <div ref={barRef} className="scrollvideo-progress-bar" />
        </div>
      </div>
    </section>
  );
}
