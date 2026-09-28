"use client";

import { motion } from "motion/react";
import { EyeIcon, EyeSlashIcon, LockSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import Scene, { type SceneStage } from "./Scene";
import { Chip, StatusCard, useStoryMotion } from "./StoryParts";

/* ==========================================================================
   Transparency: one sealed envelope, looked at from the relay's side
   ========================================================================== */

const TRANSPARENCY_STAGES: SceneStage[] = [
  {
    title: "Encryption hides what you say.",
    body: "It doesn’t hide that you said something. So here is exactly what our relay handles when a message passes through it.",
  },
  {
    title: "The relay sees the outside of the envelope.",
    body: "Which number a message is for, when it arrived and how big it is. It also sees your network address while you’re connected, and doesn’t keep it.",
  },
  {
    title: "It never sees what’s inside.",
    body: "Not a word of any message or photo. And anything sent over your Wi-⁠Fi, directly across the internet or by Bluetooth never reaches it at all.",
  },
  {
    title: "And then it forgets.",
    body: "A message is deleted the moment it’s collected, and after seven days at most. There are no ads and no analytics, so there’s nothing worth selling.",
    link: { href: "/privacy", label: "Read the privacy policy" },
  },
];

const CIPHERTEXT =
  "PJM7mqQ8ToDqW/ShvrnoKhX2vw4JoSRDeh7UjvfPl7N3L4pZJYh6kDoOc1vWkoUZIWyoMbQQ6JaMQtrBkKNClavd68NK0/ynY3ebmFbsZPkwjcSmBVfmGRZBIFfqDK3U54hX52ZxfcqBdoXNgJg3c3fnL4B7Yaxn88/6r8hvj4J8Pq/N8Xx04UBA";

const OUTSIDE = [
  { label: "For", value: "+44 7700 900456" },
  { label: "Arrived", value: "14:02" },
  { label: "Size", value: "2.1 KB" },
  { label: "From", value: "Your network address" },
];

function Envelope({ active }: { active: number }) {
  const { ease, spring } = useStoryMotion();
  const sealed = active >= 1;
  const outsideLit = active === 1;
  const insideLit = active === 2;
  const gone = active === 3;

  return (
    <div className="relative w-[min(330px,84vw)] lg:w-[400px]">
      <motion.div
        initial={false}
        animate={{ opacity: gone ? 0.32 : 1, scale: gone ? 0.93 : 1, y: gone ? -18 : 0 }}
        transition={spring}
        className="card rounded-[1.6rem] p-4 sm:p-5"
      >
        <div className="flex items-center justify-between gap-3 px-1">
          <p className="text-[13px] font-medium text-muted">Waiting on the relay</p>
          <motion.span
            initial={false}
            animate={{ opacity: sealed ? 1 : 0.35 }}
            transition={ease}
            className="flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-[12px] font-medium text-accent"
          >
            <LockSimpleIcon weight="bold" className="h-3 w-3" />
            Sealed
          </motion.span>
        </div>

        {/* The outside: what the relay needs to deliver it. */}
        <div
          className={`mt-3 rounded-2xl border transition-colors duration-500 ${
            outsideLit ? "border-accent" : "border-hairline"
          }`}
        >
          <motion.dl
            initial={false}
            animate={{ opacity: active === 0 ? 0.4 : insideLit ? 0.4 : 1 }}
            transition={ease}
            className="divide-y divide-[var(--border)]"
          >
            {OUTSIDE.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4 px-3.5 py-2 sm:py-2.5">
                <dt className="text-[12.5px] text-muted">{row.label}</dt>
                <dd className="truncate font-mono text-[12.5px] font-medium tracking-[-0.01em] sm:text-[13px]">
                  {row.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* The inside: the message, then what the relay actually holds. */}
        <div
          className={`relative mt-3 h-[104px] overflow-hidden rounded-2xl border transition-colors duration-500 sm:h-[116px] ${
            insideLit ? "border-accent" : "border-hairline"
          } bg-surface-sunken`}
        >
          <motion.div
            initial={false}
            animate={{ opacity: sealed ? 0 : 1, scale: sealed ? 0.9 : 1, filter: sealed ? "blur(6px)" : "blur(0px)" }}
            transition={ease}
            className="absolute inset-0 flex flex-col items-end justify-center gap-1.5 px-4"
          >
            <span className="rounded-[18px] rounded-br-md bg-accent px-3.5 py-2 text-[14px] font-medium text-white">
              On my way.
            </span>
            <span className="text-[11.5px] text-faint">What you wrote</span>
          </motion.div>
          <motion.p
            initial={false}
            animate={{ opacity: sealed ? (insideLit ? 1 : 0.65) : 0 }}
            transition={ease}
            className="absolute inset-0 break-all px-3.5 py-3 font-mono text-[10.5px] leading-[1.6] text-muted sm:text-[11px]"
          >
            {CIPHERTEXT}
          </motion.p>
        </div>
      </motion.div>

      {/* Labels for what the relay can and can't see. */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: outsideLit ? 1 : 0, x: outsideLit ? 0 : -18 }}
        transition={spring}
        className="absolute left-[-10%] top-[-6%] lg:left-auto lg:right-[95%] lg:top-[19%]"
      >
        <Chip icon={EyeIcon} text="The relay sees this" />
      </motion.div>
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: insideLit ? 1 : 0, x: insideLit ? 0 : 18 }}
        transition={spring}
        className="absolute bottom-[-8%] right-[-6%] lg:bottom-[12%] lg:right-[-22%]"
      >
        <Chip icon={EyeSlashIcon} text="Never this" />
      </motion.div>
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: gone ? 1 : 0, y: gone ? 0 : 16, scale: gone ? 1 : 0.96 }}
        transition={spring}
        className="absolute inset-x-[6%] bottom-[18%] lg:inset-x-[10%]"
      >
        <StatusCard icon={TrashIcon} title="Collected, then deleted" body="Seven days at most if nobody collects it." />
      </motion.div>
    </div>
  );
}

export function TransparencyChapter() {
  return (
    <Scene
      id="transparency"
      eyebrow="Transparency"
      stages={TRANSPARENCY_STAGES}
      visual={(active) => <Envelope active={active} />}
    />
  );
}
