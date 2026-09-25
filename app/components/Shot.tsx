import Image from "next/image";

/**
 * A real screenshot, taken from the app running on a simulator.
 *
 * There is no drawn bezel and no illustrated handset: the rounded corner and
 * the hairline are the whole frame. A fake phone around a real screen makes
 * the screen look fake too, and the screenshots already carry the app's own
 * status bar, tab bar and backdrop.
 */
export default function Shot({
  src,
  alt,
  className = "",
  priority = false,
  width = 644,
  height = 1400,
  sizes = "(max-width: 640px) 78vw, 320px",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={`h-auto w-full rounded-[2rem] border border-white/12 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] ${className}`}
    />
  );
}
