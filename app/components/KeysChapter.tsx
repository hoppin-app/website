"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowCounterClockwiseIcon,
  ArrowUpIcon,
  DeviceMobileIcon,
  HandIcon,
  KeyIcon,
  QrCodeIcon,
  SealCheckIcon,
  WarningIcon,
  type Icon,
} from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { useStoryMotion } from "./StoryParts";

/* ==========================================================================
   Keys: instead of describing a key change, let the visitor cause one.

   The card is the app's own safety number for a chat: 60 digits in 12 groups,
   half from each person's key. "Ana gets a new phone" replaces her half, the
   way a real key change does; sending pauses until you verify (scan her code
   in person) or accept the new key, which leaves her unverified. Same choices,
   same words, as the app's key-change screen.
   ========================================================================== */

type State = "verified" | "changed" | "scanning" | "reverified" | "accepted";

/** The first six groups are your half; the last six are Ana's. */
const BEFORE = ["37192", "80456", "11903", "62847", "09381", "55720", "48116", "90263", "27704", "61839", "04527", "73390"];
const AFTER = [...BEFORE.slice(0, 6), "86431", "15078", "39925", "70412", "58860", "21947"];

const CAPTIONS: Record<State, string> = {
  verified: "Pinned the first time you talked, and compared in person since.",
  changed: "Her half of the number changed. Usually that means a new phone. Sometimes it means someone standing in for her.",
  scanning: "Comparing the codes on both phones…",
  reverified: "The codes matched on both phones: the new key really is Ana’s.",
  accepted: "Messages flow again, but Ana is no longer marked verified.",
};

const POINTS: { icon: Icon; title: string; body: string }[] = [
  {
    icon: KeyIcon,
    title: "Pinned the first time",
    body: "hoppin remembers the key it first sees for each person, and checks every message against it.",
  },
  {
    icon: HandIcon,
    title: "Paused when it changes",
    body: "If a contact’s key changes, nothing is sent until you’ve looked.",
  },
  {
    icon: QrCodeIcon,
    title: "Checked in person",
    body: "Scan each other’s code to be sure it’s really them.",
  },
];

export function KeysChapter() {
  const [state, setState] = useState<State>("verified");
  const { reduce } = useStoryMotion();

  // Verifying stands in for scanning Ana's QR code: a moment, then a match.
  useEffect(() => {
    if (state !== "scanning") return;
    const timer = window.setTimeout(() => setState("reverified"), reduce ? 300 : 1700);
    return () => window.clearTimeout(timer);
  }, [state, reduce]);

  const groups = state === "verified" ? BEFORE : AFTER;

  return (
    <section id="keys" aria-labelledby="keys-title" className="px-5 py-16 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-start gap-10 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="t-eyebrow">Keys</p>
          <h2 id="keys-title" className="t-title mt-3 max-w-[14ch] text-balance">
            Your keys are made on your phone.
          </h2>
          <p className="t-lead mt-5 max-w-[40ch] text-pretty">
            The private halves never leave it. They live in the iPhone’s Keychain, and no server,
            backup or other phone ever gets a copy.
          </p>
          <ul className="mt-9 flex flex-col gap-5">
            {POINTS.map(({ icon: IconComponent, title, body }) => (
              <li key={title} className="flex gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                  <IconComponent weight="bold" className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <p className="text-[15px] font-semibold tracking-[-0.01em]">{title}</p>
                  <p className="mt-0.5 max-w-[42ch] text-[14.5px] leading-snug text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* The card changes height with the state. Kept out of scroll anchoring,
            or the browser scrolls the page to compensate and everything jumps. */}
        <Reveal delay={80} className="flex flex-col items-center [overflow-anchor:none]">
          <div className="card relative w-full max-w-[460px] overflow-hidden rounded-[1.75rem]">
            {/* Who */}
            <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[13px] font-semibold text-accent">
                  AR
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold tracking-[-0.01em]">Ana Ribeiro</p>
                  <p className="truncate text-[12.5px] text-muted">+44 7700 900456</p>
                </div>
              </div>
              <StatusPill state={state} />
            </div>

            {/* The safety number */}
            <div className="relative px-5 pb-5 pt-4">
              <p className="text-[12.5px] text-muted">Safety number</p>
              <div className="mt-3 grid grid-cols-4 gap-x-3 gap-y-2 font-mono text-[15px] tracking-[0.02em] sm:gap-x-4 sm:text-[16.5px]">
                {groups.map((group, i) => (
                  <Group key={i} value={group} delay={i >= 6 ? (i - 6) * 0.06 : 0} warn={i >= 6 && state === "changed"} />
                ))}
              </div>
              <AnimatePresence>{state === "scanning" && <Scanner />}</AnimatePresence>
            </div>

            {/* Sending, or why it stopped */}
            <div className="relative border-t border-hairline p-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {state === "changed" ? (
                  <motion.div
                    key="paused"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: reduce ? 0 : 0.25 }}
                    className="rounded-2xl bg-warn-soft p-3.5"
                  >
                    <p className="flex items-center gap-2 text-[13.5px] font-semibold text-warn">
                      <WarningIcon weight="fill" className="h-4 w-4 shrink-0" />
                      Sending paused until you look
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setState("scanning")}
                        className="btn btn-ink !px-4 !py-2 text-[13.5px]"
                      >
                        Verify
                      </button>
                      <button
                        type="button"
                        onClick={() => setState("accepted")}
                        className="btn !px-4 !py-2 text-[13.5px] text-foreground hover:bg-surface"
                      >
                        Accept anyway
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="composer"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: reduce ? 0 : 0.25 }}
                    aria-hidden
                    className="flex items-center gap-2"
                  >
                    <span className="flex-1 rounded-full bg-surface-sunken px-4 py-2.5 text-[14px] text-faint">Message</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
                      <ArrowUpIcon weight="bold" className="h-4 w-4" />
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* What to do next, and what just happened */}
          <div className="mt-6 flex h-11 items-center">
            {state === "verified" && (
              <button type="button" onClick={() => setState("changed")} className="btn btn-ink !py-2.5 text-[14px]">
                <DeviceMobileIcon weight="bold" className="h-4 w-4" />
                Ana gets a new phone
              </button>
            )}
            {(state === "reverified" || state === "accepted") && (
              <button type="button" onClick={() => setState("verified")} className="btn btn-quiet group text-[14px]">
                <ArrowCounterClockwiseIcon className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45" />
                Start over
              </button>
            )}
          </div>
          <p aria-live="polite" className="mt-3 min-h-[3em] max-w-[40ch] text-center text-[14px] leading-snug text-muted">
            {CAPTIONS[state]}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Pieces ------------------------------------------------- */

function StatusPill({ state }: { state: State }) {
  const look =
    state === "changed"
      ? { cls: "bg-warn-soft text-warn", icon: WarningIcon, text: "Security code changed" }
      : state === "scanning"
        ? { cls: "bg-surface-sunken text-muted", icon: QrCodeIcon, text: "Scanning…" }
        : state === "accepted"
          ? { cls: "bg-surface-sunken text-muted", icon: null, text: "Not verified" }
          : { cls: "bg-accent-soft text-accent", icon: SealCheckIcon, text: "Verified" };
  const IconComponent = look.icon;
  return (
    <span
      className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-medium transition-colors duration-300 ${look.cls}`}
    >
      {IconComponent && <IconComponent weight="fill" className="h-3.5 w-3.5" />}
      {look.text}
    </span>
  );
}

/** One group of five digits; a new value rolls in over the old one. */
function Group({ value, delay, warn }: { value: string; delay: number; warn: boolean }) {
  const { reduce } = useStoryMotion();
  return (
    <span
      className={`relative -mx-1.5 block overflow-hidden rounded-md px-1.5 py-0.5 transition-colors duration-500 ${
        warn ? "bg-warn-soft text-warn" : ""
      }`}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          className="block"
          initial={reduce ? false : { y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: "-110%", opacity: 0 }}
          transition={{ duration: 0.4, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* A QR code drawn from a fixed seed, so server and browser draw the same one.
   Decoration only: it encodes nothing. */
const QR_SIZE = 21;
const QR_MODULES: [number, number][] = (() => {
  let seed = 20260928;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= QR_SIZE - 8 && y < 8) || (x < 8 && y >= QR_SIZE - 8);
  const modules: [number, number][] = [];
  for (let y = 0; y < QR_SIZE; y++) {
    for (let x = 0; x < QR_SIZE; x++) {
      if (!inFinder(x, y) && random() > 0.52) modules.push([x, y]);
    }
  }
  return modules;
})();

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={7} height={7} rx={1.4} fill="currentColor" />
      <rect x={x + 1} y={y + 1} width={5} height={5} rx={0.9} className="fill-surface" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.6} fill="currentColor" />
    </g>
  );
}

function Scanner() {
  const { reduce } = useStoryMotion();
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 flex items-center justify-center gap-4 bg-surface/95"
    >
      <div className="relative h-[104px] w-[104px] overflow-hidden rounded-lg p-1 text-foreground">
        <svg viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`} className="h-full w-full">
          {QR_MODULES.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
          ))}
          <Finder x={0} y={0} />
          <Finder x={QR_SIZE - 7} y={0} />
          <Finder x={0} y={QR_SIZE - 7} />
        </svg>
        {!reduce && (
          <motion.span
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute inset-x-0 h-0.5 bg-accent shadow-[0_0_12px_2px_var(--accent)]"
          />
        )}
      </div>
      <p className="max-w-[14ch] text-[13px] leading-snug text-muted">Scanning Ana’s code, in person</p>
    </motion.div>
  );
}
