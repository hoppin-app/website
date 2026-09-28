"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, type Transition } from "motion/react";
import type { Icon } from "@phosphor-icons/react";

/* ==========================================================================
   Pieces shared by the pinned chapters: the floating cards and chips, and the
   phone whose screen, halo and cards change with the active stage.
   ========================================================================== */

const DESKTOP = "(min-width: 1024px)";

/** Desktop pins the hero as the first frame; phones don't have the room, so
    there the headline scrolls away first and the scene starts at stage 1. */
export function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(DESKTOP);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP).matches,
    () => true,
  );
}

const REDUCED = "(prefers-reduced-motion: reduce)";

/** The visitor's Reduce Motion setting. The server and the hydrating render
    both say "motion on"; the real setting takes over right after. motion's own
    useReducedMotion returns null on the server but the real value on the
    client's first render, so with Reduce Motion on the two renders disagreed
    and React reported a hydration mismatch. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

export function useStoryMotion() {
  const reduce = usePrefersReducedMotion();
  const ease: Transition = reduce ? { duration: 0 } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] };
  const spring: Transition = reduce
    ? { duration: 0 }
    : { type: "spring", stiffness: 240, damping: 26, mass: 0.9 };
  return { reduce, ease, spring };
}

export type StoryCard = { icon: Icon; title: string; body: string };
export type StoryChip = { icon: Icon; text: string };

export function StatusCard({ icon: IconComponent, title, body }: StoryCard) {
  return (
    <div className="card flex items-start gap-3 rounded-[1.25rem] p-3.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
        <IconComponent weight="bold" className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0">
        <p className="text-[14px] font-semibold leading-tight tracking-[-0.01em]">{title}</p>
        <p className="mt-1 text-[13px] leading-snug text-muted">{body}</p>
      </div>
    </div>
  );
}

export function Chip({ icon: IconComponent, text }: StoryChip) {
  return (
    <div className="card flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium tracking-[-0.01em]">
      <IconComponent weight="bold" className="h-[15px] w-[15px] text-accent" />
      {text}
    </div>
  );
}

export type PhoneStage = {
  screen: string;
  card?: StoryCard;
  chip?: StoryChip;
  /** Where the chip sits, when the default spot would cover the screen's point. */
  chipAt?: string;
};

/**
 * The Journey's phone, reusable: every screen is mounted once and crossfaded,
 * the halo behind the phone follows the screen, and each stage's card slides
 * in from the left while its chip settles in on the right. `overlay` is drawn
 * on top for scenes that need more than one card.
 */
export function PhoneVisual({
  stages,
  active,
  alts,
  overlay,
}: {
  stages: PhoneStage[];
  active: number;
  alts: Record<string, string>;
  overlay?: React.ReactNode;
}) {
  const { reduce, ease, spring } = useStoryMotion();
  const screens = [...new Set(stages.map((s) => s.screen))];
  const current = stages[active]?.screen;

  return (
    <div className="relative h-[calc(100%-0.5rem)] max-h-[480px] lg:h-[min(72dvh,680px)] lg:max-h-none">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {screens.map((src) => (
          <motion.div
            key={src}
            initial={false}
            animate={{ opacity: current === src ? 1 : 0 }}
            transition={ease}
            className="absolute inset-0"
          >
            <Image src={src} alt="" width={161} height={350} className="device-glow h-full w-[136%]" />
          </motion.div>
        ))}
      </div>

      <div className="device h-full">
        <div className="device-screen">
          {screens.map((src) => (
            <motion.div
              key={src}
              initial={false}
              animate={{ opacity: current === src ? 1 : 0 }}
              transition={ease}
              className="absolute inset-0"
              aria-hidden={current !== src}
            >
              <Image
                src={src}
                alt={alts[src] ?? ""}
                fill
                sizes="(max-width: 1024px) 230px, 320px"
                className="object-cover object-top"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {stages.map((stage, i) =>
        stage.card ? (
          <motion.div
            key={`card-${i}`}
            aria-hidden
            initial={false}
            animate={{
              opacity: i === active ? 1 : 0,
              x: i === active ? 0 : i < active ? -14 : -30,
              scale: i === active ? 1 : 0.96,
            }}
            transition={spring}
            className="absolute left-[-30%] top-[46%] w-[200px] lg:left-[-38%] lg:top-[48%] lg:w-[250px]"
          >
            <StatusCard {...stage.card} />
          </motion.div>
        ) : null,
      )}

      {stages.map((stage, i) =>
        stage.chip ? (
          <motion.div
            key={`chip-${i}`}
            aria-hidden
            initial={false}
            animate={{
              opacity: i === active ? 1 : 0,
              x: i === active ? 0 : i < active ? 14 : 30,
            }}
            transition={reduce ? spring : { ...spring, delay: i === active ? 0.08 : 0 }}
            className={`absolute ${stage.chipAt ?? "bottom-[15%] right-[-16%] lg:bottom-[18%] lg:right-[-18%]"}`}
          >
            <Chip {...stage.chip} />
          </motion.div>
        ) : null,
      )}

      {overlay}
    </div>
  );
}
