"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { useStoryMotion } from "./StoryParts";

/* ==========================================================================
   A pinned chapter, built the way the Journey is: the scene holds still
   while the copy beside it changes, stage by stage, and the visual reacts.

   Every stage's copy is in the DOM from the start, stacked in one grid cell,
   so the whole chapter reads in order without JavaScript's help and the layout
   never jumps. Only a stage's link is taken out of the tab order while that
   stage is hidden.
   ========================================================================== */

export type SceneStage = {
  title: string;
  body: string;
  link?: { href: string; label: string; external?: boolean };
};

/** Scroll given to each stage after the first. */
const STAGE_VH = 80;

export default function Scene({
  id,
  eyebrow,
  stages,
  visual,
}: {
  id: string;
  eyebrow: string;
  stages: SceneStage[];
  visual: (active: number) => React.ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { reduce, ease } = useStoryMotion();
  const count = stages.length;

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(p * count)));
    if (next !== active) setActive(next);
  });

  // A slow drift while the chapter plays, so the pinned frame never looks frozen.
  const drift = useTransform(scrollYProgress, [0, 1], [14, -14]);

  const goTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + ((index + 0.5) / count) * travel,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // Beside the copy on desktop; under the visual on phones. Only one of the
  // two is ever displayed, so only one is in the tab order.
  const stageBar = (className: string) => (
    <ol aria-label={`${eyebrow}: stages`} className={`gap-1.5 ${className}`}>
      {stages.map((stage, i) => (
        <li key={stage.title}>
          <button
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${i + 1} of ${count}: ${stage.title}`}
            aria-current={i === active ? "step" : undefined}
            className="group block cursor-pointer py-3"
          >
            <Segment progress={scrollYProgress} index={i} count={count} />
          </button>
        </li>
      ))}
    </ol>
  );

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative">
      <div
        ref={track}
        data-scene-track
        className="relative"
        style={{ height: `calc(100dvh + ${(count - 1) * STAGE_VH}vh)` }}
      >
        <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden">
          <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-rows-[auto_minmax(0,1fr)_auto] items-center gap-6 px-5 pb-10 pt-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-1 lg:gap-12 lg:py-16">
            {/* ---------------- Copy: first on phones too, so the title leads ---------------- */}
            <div className="text-center lg:text-left">
              <h2 id={`${id}-title`} className="t-eyebrow">
                {eyebrow}
              </h2>

              <div className="mt-3 grid sm:mt-4">
                {stages.map((stage, i) => {
                  const on = i === active;
                  return (
                    <motion.div
                      key={stage.title}
                      initial={false}
                      animate={{ opacity: on ? 1 : 0, y: on ? 0 : i < active ? -14 : 18 }}
                      transition={ease}
                      className={`col-start-1 row-start-1 ${on ? "" : "pointer-events-none"}`}
                    >
                      <h3 className="t-title mx-auto max-w-[15ch] text-balance max-lg:!text-[1.85rem] lg:mx-0">
                        {stage.title}
                      </h3>
                      <p className="t-lead mx-auto mt-3 max-w-[40ch] text-pretty max-lg:!text-[15.5px] sm:mt-5 lg:mx-0">
                        {stage.body}
                      </p>
                      {stage.link && <StageLink {...stage.link} focusable={on} />}
                    </motion.div>
                  );
                })}
              </div>

              {stageBar("mt-8 hidden justify-start lg:flex")}
            </div>

            {/* ---------------- Visual ---------------- */}
            <motion.div
              style={reduce ? undefined : { y: drift }}
              className="relative flex h-full min-h-0 items-center justify-center"
            >
              {visual(active)}
            </motion.div>

            {/* Phones: the progress sits under the visual, closing the frame. */}
            {stageBar("flex justify-center lg:hidden")}
          </div>
        </div>
      </div>
    </section>
  );
}

/** One bar of the chapter's progress, filling as its stage is scrolled through. */
function Segment({ progress, index, count }: { progress: MotionValue<number>; index: number; count: number }) {
  const fill = useTransform(progress, [index / count, (index + 1) / count], [0, 1]);
  return (
    <span className="relative block h-[3px] w-7 overflow-hidden rounded-full bg-hairline-strong transition-[width] duration-300 group-hover:w-9 sm:w-9 sm:group-hover:w-11">
      <motion.span style={{ scaleX: fill }} className="absolute inset-0 origin-left rounded-full bg-accent" />
    </span>
  );
}

function StageLink({
  href,
  label,
  external,
  focusable,
}: {
  href: string;
  label: string;
  external?: boolean;
  focusable: boolean;
}) {
  const className =
    "group mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-accent";
  const content = (
    <>
      {label}
      <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noreferrer noopener" tabIndex={focusable ? 0 : -1} className={className}>
      {content}
    </a>
  ) : (
    <Link href={href} tabIndex={focusable ? 0 : -1} className={className}>
      {content}
    </Link>
  );
}
