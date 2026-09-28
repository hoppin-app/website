"use client";

import { useCallback, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { HopMark } from "./HopMark";
import ThemeToggle from "./ThemeToggle";

export type Chapter = { id: string; label: string };

/**
 * The home page's navigation: a timeline down the right edge instead of a bar
 * across the top. Each chapter is a dot; the line between them fills as you
 * read, so it reaches a dot exactly as that chapter starts. The logo and the
 * theme switch sit in the top corners.
 *
 * Desktop shows the labels (on hover between 1024 and 1280px, where there
 * isn't room to keep them out); phones get the line and dots alone.
 */
export default function Timeline({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
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
      {/* ---------------- Corners ---------------- */}
      <a
        href="#top"
        onClick={(e) => go(e, 0)}
        className="fixed left-4 top-4 z-40 flex h-10 items-center gap-2 rounded-full border border-hairline bg-[var(--nav-bg)] pl-3 pr-3.5 text-[15px] font-semibold tracking-[-0.02em] backdrop-blur-xl sm:left-6 sm:top-5"
      >
        <HopMark className="h-[18px] w-[18px] text-accent" />
        hoppin
      </a>
      <ThemeToggle className="fixed right-4 top-4 z-40 sm:right-6 sm:top-5" />

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
                    className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[12.5px] tracking-[-0.01em] transition-[opacity,color] duration-300 max-xl:bg-[var(--nav-bg)] max-xl:opacity-0 max-xl:backdrop-blur-xl group-hover:opacity-100 group-focus-within:opacity-100 ${
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
