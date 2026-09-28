"use client";

import { motion } from "motion/react";
import {
  ArrowBendUpLeftIcon,
  CertificateIcon,
  CheckIcon,
  ChecksIcon,
  CloudSlashIcon,
  DeviceMobileIcon,
  EyeIcon,
  EyeSlashIcon,
  FingerprintIcon,
  GithubLogoIcon,
  HandIcon,
  ImageIcon,
  KeyIcon,
  LockSimpleIcon,
  MapPinIcon,
  ProhibitIcon,
  ScanIcon,
  SealCheckIcon,
  ShieldCheckIcon,
  ToggleRightIcon,
  TranslateIcon,
  TrashIcon,
  UserMinusIcon,
  UsersThreeIcon,
  WarningIcon,
  type Icon,
} from "@phosphor-icons/react";
import Scene, { type SceneStage } from "./Scene";
import { Chip, PhoneVisual, StatusCard, useStoryMotion, type PhoneStage } from "./StoryParts";
import { REPO_URL } from "./SiteFooter";

const ALTS: Record<string, string> = {
  "/shots/conversation.webp":
    "A hoppin conversation with Ana Ribeiro: her messages on the left, yours in blue on the right.",
  "/shots/inbox.webp": "hoppin’s chat list, with the conversation with Ana Ribeiro at the top.",
  "/shots/privacy.webp":
    "hoppin’s Privacy and Security settings, where Deliver directly when possible explains that contacts learn your network address.",
  "/shots/key-change.webp":
    "hoppin stopping a conversation because Ana Ribeiro’s security code changed, with Verify and Accept anyway buttons.",
};

/* ==========================================================================
   Features
   ========================================================================== */

const FEATURE_STAGES: SceneStage[] = [
  {
    title: "One text message. That’s the sign-up.",
    body: "Your number is your identity. Verify it once by SMS and the server signs a certificate for your keys. No password, no email, no profile to fill in.",
  },
  {
    title: "It all stays on your phone.",
    body: "Messages, photos and contacts live on your iPhone and are left out of iCloud backups on purpose. Nobody else holds a copy, including us.",
  },
  {
    title: "Every switch says what it costs.",
    body: "Direct delivery is faster and keeps the relay out of it, but it shows the other person roughly where you are. The app says so on the switch itself, not in a policy you’d never read.",
  },
  {
    title: "And everything else you’d expect.",
    body: "Photos, groups, replies, read receipts you can turn off, a Face ID lock, and translation that happens on your phone.",
  },
];

const FEATURE_PHONE: PhoneStage[] = [
  {
    screen: "/shots/inbox.webp",
    card: { icon: CertificateIcon, title: "Number verified", body: "Your certificate is signed. That’s it." },
    chip: { icon: ProhibitIcon, text: "No password, no email" },
  },
  {
    screen: "/shots/conversation.webp",
    card: { icon: DeviceMobileIcon, title: "Stored on this iPhone", body: "Messages, photos and contacts." },
    chip: { icon: CloudSlashIcon, text: "Left out of iCloud backups" },
  },
  {
    screen: "/shots/privacy.webp",
    card: { icon: MapPinIcon, title: "Deliver directly", body: "Faster, but contacts learn your network address." },
    chip: { icon: ToggleRightIcon, text: "Said on the switch" },
  },
  { screen: "/shots/inbox.webp" },
];

/* The last stage fans the rest of the app out around the phone. Positions are
   per chip; the ones marked `wide` only fit beside the phone on desktop. */
const EVERYDAY: { icon: Icon; text: string; at: string; wide?: boolean }[] = [
  { icon: ImageIcon, text: "Photos", at: "left-[-26%] top-[38%] lg:left-[-36%] lg:top-[8%]" },
  { icon: UsersThreeIcon, text: "Groups of up to 32", at: "right-[-30%] top-[20%] lg:right-[-44%] lg:top-[16%]" },
  { icon: ArrowBendUpLeftIcon, text: "Replies", at: "left-[-44%] top-[26%]", wide: true },
  { icon: ChecksIcon, text: "Read receipts, optional", at: "right-[-52%] top-[34%]", wide: true },
  { icon: FingerprintIcon, text: "Face ID lock", at: "left-[-22%] top-[58%] lg:left-[-40%] lg:top-[48%]" },
  { icon: TranslateIcon, text: "Translation on your phone", at: "right-[-48%] top-[54%]", wide: true },
  { icon: TrashIcon, text: "Delete for everyone", at: "left-[-34%] top-[70%]", wide: true },
  { icon: UserMinusIcon, text: "Delete your account", at: "right-[-24%] top-[76%] lg:right-[-40%] lg:top-[74%]" },
];

function EverydayChips({ show }: { show: boolean }) {
  const { reduce, spring } = useStoryMotion();
  return (
    <>
      {EVERYDAY.map((item, i) => (
        <motion.div
          key={item.text}
          aria-hidden
          initial={false}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 16, scale: show ? 1 : 0.94 }}
          transition={reduce ? spring : { ...spring, delay: show ? i * 0.045 : 0 }}
          className={`absolute ${item.at} ${item.wide ? "hidden lg:block" : ""}`}
        >
          <Chip icon={item.icon} text={item.text} />
        </motion.div>
      ))}
    </>
  );
}

export function FeaturesChapter() {
  return (
    <Scene
      id="features"
      eyebrow="Features"
      stages={FEATURE_STAGES}
      visual={(active) => (
        <PhoneVisual
          stages={FEATURE_PHONE}
          active={active}
          alts={ALTS}
          overlay={<EverydayChips show={active === FEATURE_STAGES.length - 1} />}
        />
      )}
    />
  );
}

/* ==========================================================================
   Keys
   ========================================================================== */

const KEY_STAGES: SceneStage[] = [
  {
    title: "Your keys are made on your phone.",
    body: "The private halves never leave it. They live in the iPhone’s Keychain, and no server, backup or other phone ever gets a copy.",
  },
  {
    title: "A contact’s key is pinned the first time.",
    body: "hoppin remembers the key it first sees for each person. To be certain it’s really them, scan each other’s security code in person.",
  },
  {
    title: "If it ever changes, sending stops.",
    body: "Nothing goes out until you’ve looked. And a message that isn’t signed by the key you expect is dropped, never shown.",
  },
  {
    title: "Usually it’s a new phone. Sometimes it isn’t.",
    body: "Most key changes mean someone switched iPhone. Now and then it’s someone standing in for them, and that’s the case worth stopping for.",
  },
];

const KEY_PHONE: PhoneStage[] = [
  {
    screen: "/shots/conversation.webp",
    card: { icon: KeyIcon, title: "Keys made on this iPhone", body: "The private halves stay in its Keychain." },
    chip: { icon: LockSimpleIcon, text: "Never uploaded" },
  },
  {
    screen: "/shots/conversation.webp",
    card: { icon: SealCheckIcon, title: "Ana’s key, pinned", body: "Remembered the first time you talked." },
    chip: { icon: ScanIcon, text: "Compare by QR code" },
  },
  {
    screen: "/shots/key-change.webp",
    card: { icon: WarningIcon, title: "Security code changed", body: "Sending is paused until you look." },
    chip: { icon: HandIcon, text: "Nothing sent yet" },
    chipAt: "right-[-16%] top-[28%] lg:right-[-18%] lg:top-[56%]",
  },
  {
    screen: "/shots/key-change.webp",
    card: { icon: ScanIcon, title: "New phone?", body: "Scan Ana’s code in person to be sure." },
    chip: { icon: CheckIcon, text: "Your call, not ours" },
    chipAt: "right-[-16%] top-[28%] lg:right-[-18%] lg:top-[56%]",
  },
];

export function KeysChapter() {
  return (
    <Scene
      id="keys"
      eyebrow="Keys"
      stages={KEY_STAGES}
      visual={(active) => <PhoneVisual stages={KEY_PHONE} active={active} alts={ALTS} />}
    />
  );
}

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

/* ==========================================================================
   Security: the spec sheet, lit a line at a time
   ========================================================================== */

const SECURITY_STAGES: SceneStage[] = [
  {
    title: "No invented ciphers.",
    body: "hoppin uses Apple’s CryptoKit and algorithms anyone can look up. Every conversation starts with an X25519 key agreement between the two phones.",
  },
  {
    title: "Sealed with AES-256-GCM.",
    body: "Keys are derived with HKDF-SHA256 and every message is sealed with AES-256-GCM, so anything altered on the way is caught and thrown away.",
  },
  {
    title: "Signed, or it isn’t shown.",
    body: "Every message is signed with Ed25519. One that isn’t signed, or can’t be verified, is dropped rather than shown.",
  },
  {
    title: "Encrypted all the way, and open.",
    body: "The connection to our server is TLS, pinned to its key. Nothing is ever sent unencrypted, not even as a fallback, and the source is there for anyone to read.",
    link: { href: REPO_URL, label: "Read the source", external: true },
  },
];

const SPECS = [
  { id: "agree", label: "Key agreement", value: "X25519" },
  { id: "keychain", label: "Private keys", value: "iOS Keychain" },
  { id: "kdf", label: "Key derivation", value: "HKDF-SHA256" },
  { id: "seal", label: "Encryption", value: "AES-256-GCM" },
  { id: "sign", label: "Signatures", value: "Ed25519" },
  { id: "tls", label: "Server connection", value: "TLS, pinned" },
];

const LIT: string[][] = [["agree", "keychain"], ["kdf", "seal"], ["sign"], ["tls"]];

const SPEC_CHIPS: { icon: Icon; text: string }[] = [
  { icon: KeyIcon, text: "Made on the phone" },
  { icon: ShieldCheckIcon, text: "Tampering is caught" },
  { icon: ProhibitIcon, text: "Unsigned means dropped" },
  { icon: GithubLogoIcon, text: "Open source" },
];

function SpecSheet({ active }: { active: number }) {
  const { reduce, ease, spring } = useStoryMotion();
  const lit = LIT[active] ?? [];

  return (
    <div className="relative w-[min(340px,86vw)] lg:w-[420px]">
      <div className="card rounded-[1.6rem] p-2">
        <div className="flex items-center justify-between px-3.5 pb-1.5 pt-2.5">
          <p className="text-[13px] font-medium text-muted">Inside hoppin</p>
          <p className="text-[12px] text-faint">Apple CryptoKit</p>
        </div>
        <ul>
          {SPECS.map((spec) => {
            const on = lit.includes(spec.id);
            return (
              <li key={spec.id} className="relative flex items-center justify-between gap-4 px-3.5 py-3 sm:py-3.5">
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, scaleX: on ? 1 : 0.96 }}
                  transition={ease}
                  className="absolute inset-0 rounded-[1rem] bg-accent-soft"
                />
                <span className="relative text-[13px] text-muted sm:text-[13.5px]">{spec.label}</span>
                <motion.span
                  initial={false}
                  animate={{ opacity: on ? 1 : 0.38, x: on || reduce ? 0 : 4 }}
                  transition={spring}
                  className={`relative font-mono text-[14.5px] font-medium tracking-[-0.02em] transition-colors duration-300 sm:text-[16px] ${
                    on ? "text-accent" : "text-foreground"
                  }`}
                >
                  {spec.value}
                </motion.span>
              </li>
            );
          })}
        </ul>
      </div>

      {SPEC_CHIPS.map((chip, i) => (
        <motion.div
          key={chip.text}
          aria-hidden
          initial={false}
          animate={{ opacity: i === active ? 1 : 0, x: i === active ? 0 : i < active ? 14 : 30 }}
          transition={reduce ? spring : { ...spring, delay: i === active ? 0.08 : 0 }}
          className="absolute bottom-[-7%] right-[-4%] lg:bottom-[-5%] lg:right-[-14%]"
        >
          <Chip {...chip} />
        </motion.div>
      ))}
    </div>
  );
}

export function SecurityChapter() {
  return (
    <Scene
      id="security"
      eyebrow="Security"
      stages={SECURITY_STAGES}
      visual={(active) => <SpecSheet active={active} />}
    />
  );
}
