"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  AddressBookIcon,
  ArrowBendUpLeftIcon,
  ChatCircleTextIcon,
  ChecksIcon,
  CloudSlashIcon,
  FingerprintIcon,
  ImageIcon,
  ImageSquareIcon,
  SealCheckIcon,
  TranslateIcon,
  TrashIcon,
  UserMinusIcon,
  UsersThreeIcon,
  type Icon,
} from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { useStoryMotion } from "./StoryParts";

/* ==========================================================================
   Features: four tiles, each showing its point instead of a phone screenshot.
   The story chapters around it are pinned; this one simply scrolls, which
   also gives the page a change of pace.

   On phones the tiles become one row you swipe through, the next one peeking
   in from the edge: stacked, four tiles came to nearly three screens.
   ========================================================================== */

export function FeaturesChapter() {
  return (
    <section id="features" aria-labelledby="features-title" className="px-5 py-16 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="t-eyebrow">Features</p>
          <h2 id="features-title" className="t-title mt-3 max-w-[16ch] text-balance">
            Simple to start. Honest all the way.
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <div className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:mt-12 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-16 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 lg:gap-5 [&::-webkit-scrollbar]:hidden">
            <Tile
              className="md:col-span-2"
              title="One text message. That’s the sign-up."
              body="Your number is your identity. Verify it once by SMS and the server signs a certificate for your keys. No password, no email, no profile to fill in."
            >
              <SignUp />
            </Tile>
            <Tile
              title="It all stays on your phone."
              body="Messages, photos and contacts live on your iPhone and are left out of iCloud backups on purpose. Nobody else holds a copy, including us."
            >
              <OnThePhone />
            </Tile>
            <Tile
              title="Every switch says what it costs."
              body="Direct delivery is faster and keeps the relay out of it, but it shows the other person roughly where you are. The app says so on the switch itself."
            >
              <HonestSwitch />
            </Tile>
            <Tile
              className="md:col-span-2"
              title="And everything else you’d expect."
              body="Photos, groups, replies, read receipts you can turn off, a Face ID lock, and translation that happens on your phone."
            >
              <Everything />
            </Tile>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Tile({
  title,
  body,
  children,
  className = "",
}: {
  title: string;
  body: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`card flex w-[82vw] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-[1.5rem] md:w-auto md:max-w-none md:rounded-[1.75rem] ${className}`}
    >
      <div className="flex min-h-[176px] flex-1 items-center justify-center px-5 pt-6 sm:px-8 md:min-h-[210px] md:pt-8">
        {children}
      </div>
      <div className="px-5 pb-6 pt-5 sm:px-8 md:pb-8 md:pt-6">
        <h3 className="text-[1.1rem] font-semibold leading-tight tracking-[-0.025em] md:text-[1.3rem]">{title}</h3>
        <p className="mt-2 max-w-[48ch] text-[14px] leading-relaxed text-muted md:text-[15px]">{body}</p>
      </div>
    </div>
  );
}

/* ---------------- Sign-up: the code arrives and fills itself in ---------- */

const CODE = "482913";

function SignUp() {
  const { reduce } = useStoryMotion();
  const step = reduce ? 0 : 0.11;

  return (
    <motion.div
      aria-hidden
      initial="waiting"
      whileInView="arrived"
      viewport={{ once: true, amount: 0.7 }}
      className="flex w-full max-w-[420px] flex-col items-start gap-4 md:gap-5"
    >
      <motion.div
        variants={{ waiting: { opacity: 0, y: 10 }, arrived: { opacity: 1, y: 0 } }}
        transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-1.5 pl-3 text-[11.5px] text-faint">Messages · now</p>
        <p className="rounded-[18px] rounded-bl-md bg-surface-sunken px-3.5 py-2 text-[13px] md:text-[14px]">
          Your hoppin code is <span className="font-mono font-medium tracking-[0.04em]">{CODE}</span>
        </p>
      </motion.div>

      <div className="flex w-full items-center gap-1.5 md:gap-2">
        {CODE.split("").map((digit, i) => (
          <span
            key={i}
            className="flex h-10 flex-1 items-center justify-center rounded-[10px] border border-hairline-strong bg-surface font-mono text-[17px] font-medium md:h-14 md:rounded-xl md:text-[22px]"
          >
            <motion.span
              variants={{ waiting: { opacity: 0, y: 8 }, arrived: { opacity: 1, y: 0 } }}
              transition={{ delay: reduce ? 0 : 0.5 + i * step, duration: 0.25 }}
            >
              {digit}
            </motion.span>
          </span>
        ))}
      </div>

      <motion.span
        variants={{ waiting: { opacity: 0, scale: 0.94 }, arrived: { opacity: 1, scale: 1 } }}
        transition={{ delay: reduce ? 0 : 0.5 + CODE.length * step + 0.15, duration: 0.35 }}
        className="flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-[12.5px] font-medium text-accent md:text-[13px]"
      >
        <SealCheckIcon weight="fill" className="h-4 w-4" />
        Certificate signed
      </motion.span>
    </motion.div>
  );
}

/* ---------------- Stays on the phone ------------------------------------- */

const ON_PHONE: { icon: Icon; label: string }[] = [
  { icon: ChatCircleTextIcon, label: "Messages" },
  { icon: ImageSquareIcon, label: "Photos" },
  { icon: AddressBookIcon, label: "Contacts" },
];

function OnThePhone() {
  return (
    <div aria-hidden className="flex flex-col items-center gap-3 md:gap-4">
      <div className="w-[140px] rounded-[22px] border-[4px] border-ink/85 bg-background p-2.5 pt-4 md:w-[168px] md:rounded-[26px] md:border-[5px] md:p-3 md:pt-5">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-ink/15" />
        <ul className="flex flex-col gap-1.5">
          {ON_PHONE.map(({ icon: IconComponent, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-xl bg-surface px-2.5 py-1.5 text-[12px] font-medium md:py-2 md:text-[12.5px]"
            >
              <IconComponent weight="fill" className="h-4 w-4 text-accent" />
              {label}
            </li>
          ))}
        </ul>
      </div>
      <span className="flex items-center gap-1.5 text-[12.5px] text-muted">
        <CloudSlashIcon weight="bold" className="h-4 w-4" />
        Not in iCloud backups
      </span>
    </div>
  );
}

/* ---------------- The switch, and what it costs ---------------------------- */

function HonestSwitch() {
  const [on, setOn] = useState(true);
  const { spring } = useStoryMotion();

  return (
    <div className="w-full max-w-[340px] rounded-2xl bg-surface-sunken p-1.5">
      <div className="flex items-center justify-between gap-4 rounded-xl bg-surface px-4 py-3">
        <span id="direct-delivery-label" className="text-[13.5px] font-medium leading-snug md:text-[14px]">
          Deliver directly when possible
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-labelledby="direct-delivery-label"
          onClick={() => setOn(!on)}
          className={`relative h-[31px] w-[51px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
            on ? "bg-accent" : "bg-hairline-strong"
          }`}
        >
          <motion.span
            initial={false}
            animate={{ x: on ? 20 : 0 }}
            transition={spring}
            className="absolute left-[2px] top-[2px] h-[27px] w-[27px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.18)]"
          />
        </button>
      </div>
      <p aria-live="polite" className="px-3 pb-2 pt-2.5 text-[12px] leading-snug text-muted md:text-[12.5px]">
        {on
          ? "Messages go straight to the other phone when it can be reached. The people you message learn your network address: roughly your city and provider."
          : "Everything goes through the relay, which sees your address instead."}
      </p>
    </div>
  );
}

/* ---------------- Everything else ---------------------------------------- */

const EVERYDAY: { icon: Icon; text: string }[] = [
  { icon: ImageIcon, text: "Photos" },
  { icon: UsersThreeIcon, text: "Groups of up to 32" },
  { icon: ArrowBendUpLeftIcon, text: "Replies" },
  { icon: ChecksIcon, text: "Read receipts, optional" },
  { icon: FingerprintIcon, text: "Face ID lock" },
  { icon: TranslateIcon, text: "Translation on your phone" },
  { icon: TrashIcon, text: "Delete for everyone" },
  { icon: UserMinusIcon, text: "Delete your account" },
];

function Everything() {
  const { reduce } = useStoryMotion();
  return (
    <motion.ul
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: reduce ? 0 : 0.05 }}
      className="flex max-w-[560px] flex-wrap justify-center gap-1.5 md:gap-2.5"
    >
      {EVERYDAY.map((item) => (
        <motion.li
          key={item.text}
          variants={{ hidden: { opacity: 0, y: 12, scale: 0.96 }, shown: { opacity: 1, y: 0, scale: 1 } }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <span className="card flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[12px] font-medium tracking-[-0.01em] md:gap-2 md:px-3.5 md:py-2 md:text-[13px]">
            <item.icon weight="bold" className="h-3.5 w-3.5 text-accent md:h-[15px] md:w-[15px]" />
            {item.text}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
