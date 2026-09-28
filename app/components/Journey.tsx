"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Transition,
} from "motion/react";
import {
  AppleLogoIcon,
  ArrowDownIcon,
  BluetoothIcon,
  ClockCountdownIcon,
  GlobeHemisphereWestIcon,
  LockSimpleIcon,
  ProhibitIcon,
  WifiHighIcon,
  WifiSlashIcon,
  type Icon,
} from "@phosphor-icons/react";
import AppStoreLink from "./AppStoreLink";
import { Chip, StatusCard, glowFor, useIsDesktop, usePrefersReducedMotion } from "./StoryParts";

/* ==========================================================================
   The journey of one message

   The hero is the first frame of a pinned scene. Scrolling moves the story
   through the four roads a message can take; the phone stays put while the
   copy, its screen, the halo behind it and the cards around it change with
   each road, the way Flighty walks a flight from check-in to landing.

   Every stage’s copy is in the DOM from the start (stacked in one grid cell
   and faded, not mounted and unmounted), so screen readers and crawlers get
   the whole story in order and the layout never jumps.
   ========================================================================== */

type Stage = {
  id: string;
  /** Label in the stage bar. The intro has none. */
  label?: string;
  title: string;
  body: string;
  screen: string;
  card?: { icon: Icon; title: string; body: string };
  chip?: { icon: Icon; text: string };
};

const STAGES: Stage[] = [
  {
    id: "intro",
    title: "Messages that find a way.",
    body: "Encrypted on your iPhone, then sent by whichever road is open: your Wi-⁠Fi, the internet, or Bluetooth.",
    screen: "/shots/conversation.webp",
  },
  {
    id: "wifi",
    label: "Same Wi-Fi",
    title: "On the same Wi-Fi",
    body: "Your phones find each other and talk directly. The message never leaves the network, so there is nothing for a server to hold.",
    screen: "/shots/conversation.webp",
    card: {
      icon: WifiHighIcon,
      title: "Delivered directly",
      body: "Phone to phone, over your Wi-⁠Fi.",
    },
    chip: { icon: ProhibitIcon, text: "No server involved" },
  },
  {
    id: "internet",
    label: "Internet",
    title: "Across the internet",
    body: "When both phones can be reached, hoppin sends the message straight from one to the other. The relay never sees it.",
    screen: "/shots/conversation.webp",
    card: {
      icon: GlobeHemisphereWestIcon,
      title: "Sent straight across",
      body: "Both phones could reach each other.",
    },
    chip: { icon: ProhibitIcon, text: "The relay never saw it" },
  },
  {
    id: "bluetooth",
    label: "No signal",
    title: "With no signal at all",
    body: "Texts hop between nearby hoppin phones over Bluetooth until one reaches Ana. Every phone on the way carries a sealed envelope it can’t open or address.",
    screen: "/shots/mesh.webp",
    card: {
      icon: BluetoothIcon,
      title: "Carried by 2 phones nearby",
      body: "Sealed. Neither could read it.",
    },
    chip: { icon: WifiSlashIcon, text: "No Wi-⁠Fi, no data" },
  },
  {
    id: "relay",
    label: "Later",
    title: "When Ana is offline",
    body: "The relay holds the sealed message until her phone collects it, then deletes it. It keeps nothing for more than seven days, and it can never read it.",
    screen: "/shots/inbox.webp",
    card: {
      icon: LockSimpleIcon,
      title: "Waiting, sealed",
      body: "Until Ana’s phone collects it.",
    },
    chip: { icon: ClockCountdownIcon, text: "Deleted once delivered" },
  },
];

const SCREENS = [...new Set(STAGES.map((s) => s.screen))];

const SCREEN_ALT: Record<string, string> = {
  "/shots/conversation.webp":
    "A hoppin conversation with Ana Ribeiro: her messages on the left, yours in blue on the right.",
  "/shots/mesh.webp":
    "hoppin’s Bluetooth mesh screen, with Send over Bluetooth switched on and what to expect when you’re offline.",
  "/shots/inbox.webp":
    "hoppin’s chat list, with the conversation with Ana Ribeiro at the top.",
};

/* Each stage after the first gets 45vh of scrolling: a short swipe moves the
   story on by one road. Tailwind needs literal class names, so the track
   heights and #routes offsets below are written out: 4 x 45 = 180vh on
   desktop, 3 x 45 = 135vh on phones (where the intro is an ordinary hero above
   the scene). Change them together. */

export default function Journey() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  // Which stages the pinned scene scrolls through on this screen.
  const first = isDesktop ? 0 : 1;
  const count = STAGES.length - first;

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  // Stage changes are the only thing that touches React state, and only when
  // the stage actually changes: a handful of renders per full scroll.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // On phones the scene isn't pinned yet while the hero is on screen
    // (progress sits at 0): show the arriving message there, not stage 1.
    const next = !isDesktop && p <= 0 ? 0 : first + Math.min(count - 1, Math.floor(p * count));
    if (next !== active) setActive(next);
  });

  // The phone settles back a touch as the story starts, and drifts slowly
  // while it plays, so the pinned frame never looks frozen.
  const phoneScale = useTransform(scrollYProgress, [0, 1 / STAGES.length], [1, 0.95]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  // The stage bar belongs to the pinned scene: gone before the scene scrolls
  // away, so it never rides up the screen with the next chapter.
  const barOpacity = useTransform(scrollYProgress, [0.94, 0.985], [1, 0]);

  const scrollToStage = (index: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const target = top + ((Math.max(index, first) - first + 0.5) / count) * travel;
    window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
  };

  const heroCopy = (focusable: boolean) => (
    <>
      <h1 className="t-display mx-auto max-w-[12ch] text-balance lg:mx-0">{STAGES[0].title}</h1>
      <p className="t-lead mx-auto mt-4 max-w-[38ch] text-pretty sm:mt-5 lg:mx-0">
        {STAGES[0].body}
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
        <AppStoreLink className="btn btn-ink" tabIndex={focusable ? 0 : -1}>
          <AppleLogoIcon weight="fill" className="h-[18px] w-[18px]" />
          Get hoppin
        </AppStoreLink>
        <button
          type="button"
          onClick={() => scrollToStage(1)}
          className="btn btn-quiet group"
          tabIndex={focusable ? 0 : -1}
        >
          <span className="sweep-underline">How it travels</span>
          <ArrowDownIcon className="nudge-down h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
        </button>
      </div>
    </>
  );

  const ease: Transition = reduce
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.16, 1, 0.3, 1] };
  const spring: Transition = reduce
    ? { duration: 0 }
    : { type: "spring", stiffness: 240, damping: 26, mass: 0.9 };

  return (
    <section aria-label="How a hoppin message travels" className="relative">
      {/* Without JavaScript nothing scrolls the story, so don’t leave a tall
          empty track: collapse it to the hero. */}
      <noscript>
        <style>{`#journey-track{height:auto!important}#journey-track>div{position:relative!important}`}</style>
      </noscript>

      {/* Phones: an ordinary hero that scrolls away before the scene pins. */}
      <div className="px-5 pb-4 pt-28 text-center sm:px-8 lg:hidden">{heroCopy(!isDesktop)}</div>

      <div
        id="journey-track"
        ref={track}
        className="relative h-[calc(100dvh+135vh)] lg:h-[calc(100dvh+180vh)]"
      >
        {/* Where "How it travels" (/#routes) lands: the scroll position that
            opens the first road, not the hero. On desktop 0.3 of the travel
            is inside stage 1 of 5; on phones 0.125 is inside stage 1 of 4.
            The travel is (stages - 1) x 45vh. */}
        <div
          id="routes"
          aria-hidden
          className="pointer-events-none absolute left-0 top-[17vh] h-px w-px lg:top-[54vh]"
        />

        <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden">
          <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-rows-[minmax(0,1fr)_auto] items-center gap-5 px-5 pb-24 pt-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-1 lg:gap-12 lg:pb-20 lg:pt-16">
            {/* ---------------- Copy: every stage stacked in one cell ------- */}
            <div className="order-2 grid text-center lg:order-1 lg:text-left">
              {STAGES.map((stage, i) => {
                const on = i === active;
                return (
                  <motion.div
                    key={stage.id}
                    initial={false}
                    animate={{ opacity: on ? 1 : 0, y: on ? 0 : i < active ? -14 : 18 }}
                    transition={ease}
                    className={`col-start-1 row-start-1 self-center ${i === 0 ? "hidden lg:block" : ""} ${
                      on ? "" : "pointer-events-none"
                    }`}
                  >
                    {i === 0 ? (
                      heroCopy(isDesktop && on)
                    ) : (
                      <>
                        <h2 className="t-title mx-auto max-w-[14ch] text-balance max-lg:!text-[1.85rem] lg:mx-0">
                          {stage.title}
                        </h2>
                        <p className="t-lead mx-auto mt-3 max-w-[38ch] text-pretty max-lg:!text-[15.5px] sm:mt-5 lg:mx-0">
                          {stage.body}
                        </p>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* ---------------- Phone, halo and floating cards ------------- */}
            <div className="device-slot relative order-1 flex h-full min-h-0 items-center justify-center lg:order-2">
              <motion.div
                style={reduce ? undefined : { scale: phoneScale, y: phoneY }}
                className="device-frame"
              >
                {/* Halo: each screen blurred behind the phone, crossfaded. */}
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                  {SCREENS.map((src) => (
                    <motion.div
                      key={src}
                      initial={false}
                      animate={{ opacity: STAGES[active].screen === src ? 1 : 0 }}
                      transition={ease}
                      className="absolute inset-0"
                    >
                      <Image src={glowFor(src)} alt="" width={168} height={217} unoptimized className="device-glow" />
                    </motion.div>
                  ))}
                </div>

                <div className="device h-full w-full">
                  <div className="device-screen">
                    {SCREENS.map((src, i) => (
                      <motion.div
                        key={src}
                        initial={false}
                        animate={{ opacity: STAGES[active].screen === src ? 1 : 0 }}
                        transition={ease}
                        className="absolute inset-0"
                        aria-hidden={STAGES[active].screen !== src}
                      >
                        <Image
                          src={src}
                          alt={SCREEN_ALT[src] ?? ""}
                          fill
                          priority={i === 0}
                          sizes="(max-width: 1024px) 230px, 320px"
                          className="object-cover object-top"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Intro: the message itself, arriving. */}
                <motion.div
                  aria-hidden
                  initial={false}
                  animate={{
                    opacity: active === 0 ? 1 : 0,
                    y: active === 0 ? 0 : -10,
                    scale: active === 0 ? 1 : 0.97,
                  }}
                  transition={spring}
                  className="absolute right-[-30%] top-[6%] w-[215px] lg:right-[-20%] lg:top-[9%] lg:w-[260px]"
                >
                  <Notification />
                </motion.div>

                {STAGES.map((stage, i) =>
                  stage.card ? (
                    <motion.div
                      key={`${stage.id}-card`}
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

                {STAGES.map((stage, i) =>
                  stage.chip ? (
                    <motion.div
                      key={`${stage.id}-chip`}
                      aria-hidden
                      initial={false}
                      animate={{
                        opacity: i === active ? 1 : 0,
                        x: i === active ? 0 : i < active ? 14 : 30,
                      }}
                      transition={reduce ? spring : { ...spring, delay: i === active ? 0.08 : 0 }}
                      className="absolute bottom-[15%] right-[-16%] lg:bottom-[18%] lg:right-[-18%]"
                    >
                      <Chip {...stage.chip} />
                    </motion.div>
                  ) : null,
                )}
              </motion.div>
            </div>
          </div>

          <motion.div style={reduce ? undefined : { opacity: barOpacity }}>
            <StageBar active={active} onSelect={scrollToStage} transition={spring} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Pieces
   ========================================================================== */

function Notification() {
  return (
    <div className="card flex items-start gap-3 rounded-[1.4rem] p-3.5">
      <Image
        src="/app-icon-96.webp"
        alt=""
        width={38}
        height={38}
        className="h-[38px] w-[38px] shrink-0 rounded-[10px]"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[14px] font-semibold tracking-[-0.01em]">Ana Ribeiro</p>
          <span className="shrink-0 text-[12px] text-faint">now</span>
        </div>
        <p className="mt-0.5 text-[14px] leading-snug text-muted">On my way.</p>
      </div>
    </div>
  );
}

function StageBar({
  active,
  onSelect,
  transition,
}: {
  active: number;
  onSelect: (index: number) => void;
  transition: Transition;
}) {
  return (
    <nav
      aria-label="Ways a message travels"
      className="absolute inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] flex justify-center px-4"
    >
      <ol className="card flex items-center gap-0.5 rounded-full p-1">
        {STAGES.map((stage, i) =>
          stage.label ? (
            <li key={stage.id}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={i === active ? "step" : undefined}
                className={`relative cursor-pointer rounded-full px-3 py-2 text-[12.5px] font-medium tracking-[-0.01em] transition-colors duration-300 sm:px-4 sm:text-[13px] ${
                  i === active ? "text-on-ink" : "text-muted hover:text-foreground"
                }`}
              >
                {i === active && (
                  <motion.span
                    layoutId="journey-stage"
                    transition={transition}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                )}
                <span className="relative">{stage.label}</span>
              </button>
            </li>
          ) : null,
        )}
      </ol>
    </nav>
  );
}
