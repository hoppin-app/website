/**
 * The site's backdrop, and the app's: a few large, softly coloured blobs
 * drifting behind a heavy blur, like a lava lamp seen through frosted glass.
 *
 * It mirrors `LavaBackground.swift` deliberately — same five aurora colours,
 * same slow Lissajous drift, same dark base and scrim — so the site and the
 * app read as one product rather than two designs that happen to share a name.
 *
 * Kept cheap on purpose:
 *  • pure CSS keyframes on `transform`, so it runs on the compositor and the
 *    main thread stays free for scrolling;
 *  • one `filter: blur()` on the container rather than one per blob;
 *  • `prefers-reduced-motion` pauses the drift instead of removing the
 *    colour, so the page keeps its character without any movement.
 *
 * It is purely decorative: fixed behind the content, inert to pointers, and
 * hidden from assistive technology.
 */

/** Aurora, the app's default theme (`BackgroundTheme.aurora`). */
const BLOBS = [
  { color: "#5C29D9", size: 116, top: "12%", left: "18%", duration: 34, delay: 0 },
  { color: "#E6338C", size: 94, top: "58%", left: "72%", duration: 27, delay: -6 },
  { color: "#FA7324", size: 80, top: "76%", left: "26%", duration: 41, delay: -13 },
  { color: "#1473F2", size: 104, top: "26%", left: "78%", duration: 30, delay: -19 },
  { color: "#1ABFB3", size: 70, top: "46%", left: "44%", duration: 23, delay: -25 },
];

export default function LavaBackground() {
  return (
    <div className="lava" aria-hidden="true">
      {BLOBS.map((blob, i) => (
        <span
          key={i}
          className={`lava-blob lava-blob-${i % 3}`}
          style={
            {
              "--blob-color": blob.color,
              "--blob-size": `${blob.size}vmin`,
              "--blob-duration": `${blob.duration}s`,
              "--blob-delay": `${blob.delay}s`,
              top: blob.top,
              left: blob.left,
            } as React.CSSProperties
          }
        />
      ))}
      <div className="lava-scrim" />
    </div>
  );
}
