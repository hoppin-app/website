"use client";

import { useCallback, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { usePrefersReducedMotion } from "./StoryParts";

export type Chapter = { id: string; label: string };

/**
 * The home page's chapter navigation: a timeline down the right edge. Each
 * chapter is a dot; the line between them fills as you read, so it reaches a
 * dot exactly as that chapter starts.
 *
 * It floats over the page's right margin rather than taking room from it, so
 * the story stays centred. The labels stay out from 1536px, where the margin
 * is wide enough to hold them; narrower desktops show them on hover, and
 * phones get the line and dots alone.
 */
export default function Timeline({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const reduce = usePrefersReducedMotion();
  const fill = useMotionValue(0);
  const smoothFill = useSpring(fill, { stiffness: 260, damping: 40, mass: 0.6 });
  const { scrollY } = useScroll();

  const measure = useCallback(() => {
    const tops: number[] = [];
    for (const chapter of chapters) {
      const el = document.getElementById(chapter.id);
      if (!el) return;
      tops.push(el.getBoundingClientRect().top + window.scrollY);
    }
    const doc = document.documentElement;
    // A chapter counts as reached once its top passes just above the middle.
    const probe = window.scrollY + window.innerHeight * 0.45;
    const atEnd = window.scrollY + window.innerHeight >= doc.scrollHeight - 4;

    let index = 0;
    tops.forEach((top, i) => {
      if (top <= probe) index = i;
    });
    if (atEnd) index = tops.length - 1;

    const last = tops.length - 1;
    let value = 1;
    if (index < last && !atEnd) {
      const span = tops[index + 1] - tops[index];
      const within = span > 0 ? Math.min(1, Math.max(0, (probe - tops[index]) / span)) : 0;
      value = (index + within) / last;
    }
    fill.set(value);
    setActive(index);
  }, [chapters, fill]);

  useMotionValueEvent(scrollY, "change", measure);

  // First reading once laid out (a reload can land mid-page), then on resize.
  useEffect(() => {
    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const go = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
    if (index === 0) {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    document.getElementById(chapters[index].id)?.scrollIntoView({ behavior, block: "start" });
  };

  const lineFill = reduce ? fill : smoothFill;

  return (
    <>
      {/* ---------------- Desktop: labelled timeline ---------------- */}
      <nav
        aria-label="Chapters"
        className="group fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:right-8"
      >
        <ol className="relative flex flex-col gap-5">
          <span aria-hidden className="absolute bottom-3 right-[4.5px] top-3 w-px bg-hairline-strong" />
          <motion.span
            aria-hidden
            style={{ scaleY: lineFill }}
            className="absolute bottom-3 right-[4.5px] top-3 w-px origin-top bg-accent"
          />
          {chapters.map((chapter, i) => {
            const reached = i <= active;
            const current = i === active;
            return (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  onClick={(e) => go(e, i)}
                  aria-current={current ? "step" : undefined}
                  className="flex h-6 items-center justify-end gap-3"
                >
                  <span
                    className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[12.5px] tracking-[-0.01em] transition-[opacity,color] duration-300 max-2xl:bg-[var(--nav-bg)] max-2xl:opacity-0 max-2xl:backdrop-blur-xl group-hover:opacity-100 group-focus-within:opacity-100 ${
                      current ? "font-medium text-foreground" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {chapter.label}
                  </span>
                  <span
                    className={`relative h-2.5 w-2.5 shrink-0 rounded-full border transition-all duration-300 ${
                      reached ? "border-accent bg-accent" : "border-hairline-strong bg-background"
                    } ${current ? "scale-125 shadow-[0_0_0_4px_var(--accent-soft)]" : ""}`}
                  />
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* ---------------- Phones: the line and dots alone ---------------- */}
      <div aria-hidden className="pointer-events-none fixed right-2 top-1/2 z-30 -translate-y-1/2 lg:hidden">
        <div className="relative flex flex-col gap-2">
          <span className="absolute bottom-[9px] right-[2.5px] top-[9px] w-px bg-hairline-strong" />
          <motion.span
            style={{ scaleY: lineFill }}
            className="absolute bottom-[9px] right-[2.5px] top-[9px] w-px origin-top bg-accent"
          />
          {chapters.map((chapter, i) => (
            <span key={chapter.id} className="flex h-[18px] items-center justify-end">
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  i <= active ? "bg-accent" : "bg-hairline-strong"
                } ${i === active ? "scale-150" : ""}`}
              />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
