"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowCounterClockwiseIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  LockSimpleIcon,
  ProhibitIcon,
} from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { REPO_URL } from "./SiteFooter";
import { useStoryMotion } from "./StoryParts";

/* ==========================================================================
   Security: the claims, and a way to check the main one yourself.

   The card seals whatever you type with real AES-256-GCM, in your browser,
   through the Web Crypto API: the key comes from a random secret run through
   HKDF-SHA256, the way the app derives its message keys (the secret stands in
   for the X25519 agreement between two phones). Change one byte and opening
   it fails, because the 16-byte tag no longer matches: that is the whole
   "anything altered on the way is caught and thrown away" claim, live.
   ========================================================================== */

const SPECS = [
  { label: "Key agreement", value: "X25519" },
  { label: "Key derivation", value: "HKDF-SHA256" },
  { label: "Encryption", value: "AES-256-GCM" },
  { label: "Signatures", value: "Ed25519" },
  { label: "Private keys", value: "iOS Keychain" },
  { label: "Server connection", value: "TLS, pinned" },
];

const TAG_BYTES = 16;
const MAX_CHARS = 80;

type Result = "sealed" | "opened" | "dropped";

async function makeKey(): Promise<CryptoKey> {
  const secret = crypto.getRandomValues(new Uint8Array(32));
  const base = await crypto.subtle.importKey("raw", secret, "HKDF", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: new Uint8Array(32),
      info: new TextEncoder().encode("hoppin website demo"),
    },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export function SecurityChapter() {
  const [text, setText] = useState("On my way.");
  const [key, setKey] = useState<CryptoKey | null>(null);
  const [unsupported, setUnsupported] = useState(false);
  const [sealed, setSealed] = useState<{ iv: Uint8Array<ArrayBuffer>; bytes: Uint8Array<ArrayBuffer> } | null>(null);
  const [changed, setChanged] = useState<number | null>(null);
  const [result, setResult] = useState<Result>("sealed");
  const [opened, setOpened] = useState("");
  const latest = useRef(0);

  // Web Crypto only exists in a secure context; without it, makeKey rejects
  // and the card says so instead.
  useEffect(() => {
    Promise.resolve().then(makeKey).then(setKey, () => setUnsupported(true));
  }, []);

  // Seal again on every keystroke, with a fresh nonce each time.
  useEffect(() => {
    if (!key) return;
    const run = ++latest.current;
    const iv = crypto.getRandomValues(new Uint8Array(12));
    crypto.subtle
      .encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(text))
      .then((buffer) => {
        if (run !== latest.current) return;
        setSealed({ iv, bytes: new Uint8Array(buffer) });
        setChanged(null);
        setResult("sealed");
      });
  }, [key, text]);

  const shown = (() => {
    if (!sealed) return null;
    if (changed === null) return sealed.bytes;
    const copy = sealed.bytes.slice();
    copy[changed] ^= 0x5a;
    return copy;
  })();

  const toggleChange = () => {
    if (!sealed) return;
    if (changed !== null) {
      setChanged(null);
    } else {
      // Somewhere in the message itself when there is one, not only the tag.
      const body = sealed.bytes.length - TAG_BYTES;
      const span = body > 0 ? body : sealed.bytes.length;
      setChanged(Math.floor(Math.random() * span));
    }
    setResult("sealed");
  };

  const open = async () => {
    if (!key || !sealed || !shown) return;
    try {
      const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: sealed.iv }, key, shown);
      setOpened(new TextDecoder().decode(plain));
      setResult("opened");
    } catch {
      setResult("dropped");
    }
  };

  return (
    <section
      id="security"
      aria-labelledby="security-title"
      // Extra room at the bottom: the footer is uncovered the moment the page
      // runs out, so the demo needs space below it to be read in full.
      className="px-5 pb-44 pt-20 sm:px-8 sm:pb-52 sm:pt-36"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-10 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="t-eyebrow">Security</p>
          <h2 id="security-title" className="t-title mt-3 max-w-[14ch] text-balance">
            Encrypted all the way, and open.
          </h2>
          <p className="t-lead mt-4 max-w-[42ch] text-pretty max-sm:!text-[15.5px] sm:mt-5">
            No invented ciphers: hoppin uses Apple’s CryptoKit and algorithms anyone can look up.
            Every message is sealed and signed, and one that fails a check is dropped, never shown.
            Nothing is ever sent unencrypted, not even as a fallback.
          </p>

          {/* A two-column grid on phones; the ruled list from sm up. */}
          <dl className="mt-6 grid max-w-[440px] grid-cols-2 gap-x-6 gap-y-3 border-y border-hairline py-4 sm:mt-8 sm:grid-cols-1 sm:gap-0 sm:divide-y sm:divide-[var(--border)] sm:py-0">
            {SPECS.map((spec) => (
              <div
                key={spec.label}
                className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:py-2.5"
              >
                <dt className="text-[12.5px] text-muted sm:text-[14px]">{spec.label}</dt>
                <dd className="font-mono text-[13.5px] font-medium tracking-[-0.01em] sm:text-[14px]">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-accent sm:mt-7"
          >
            Read the source
            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <Reveal delay={80} className="[overflow-anchor:none]">
          <div className="card mx-auto w-full max-w-[500px] rounded-[1.5rem] p-4 sm:rounded-[1.75rem] sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[15px] font-semibold tracking-[-0.01em]">Seal a message</p>
              <span className="flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[12px] font-medium text-accent">
                <LockSimpleIcon weight="bold" className="h-3.5 w-3.5" />
                Real AES-256-GCM, in your browser
              </span>
            </div>

            {unsupported ? (
              <p className="mt-5 text-[14px] leading-snug text-muted">
                This browser won’t run Web Crypto here, so the demo can’t seal anything. The app
                doesn’t depend on it: it uses Apple’s CryptoKit.
              </p>
            ) : (
              <>
                <label htmlFor="seal-input" className="mt-4 block text-[12.5px] text-muted sm:mt-5">
                  Write something
                </label>
                <div className="mt-2 flex items-center gap-2 rounded-2xl border border-hairline-strong bg-background px-3.5 py-2.5 focus-within:border-accent sm:px-4 sm:py-3">
                  <input
                    id="seal-input"
                    value={text}
                    maxLength={MAX_CHARS}
                    onChange={(e) => setText(e.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                    className="min-w-0 flex-1 bg-transparent text-[16px] outline-none sm:text-[15px] placeholder:text-faint"
                    placeholder="Type a message"
                  />
                  <span className="shrink-0 font-mono text-[11.5px] text-faint">
                    {text.length}/{MAX_CHARS}
                  </span>
                </div>

                <p className="mt-4 text-[12.5px] text-muted sm:mt-5">What the relay would hold</p>
                <Bytes bytes={shown} changed={changed} />

                <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                  <button type="button" onClick={toggleChange} disabled={!sealed} className="btn btn-quiet group !px-3.5 !py-2 max-sm:!text-[13.5px] ring-1 ring-hairline-strong sm:!px-4">
                    {changed === null ? (
                      "Change one byte"
                    ) : (
                      <>
                        <ArrowCounterClockwiseIcon className="h-4 w-4" />
                        Undo the change
                      </>
                    )}
                  </button>
                  <button type="button" onClick={open} disabled={!sealed} className="btn btn-ink !px-3.5 !py-2 max-sm:!text-[13.5px] sm:!px-4">
                    Open it on Ana’s phone
                  </button>
                </div>

                <Outcome result={result} opened={opened} />
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Pieces ------------------------------------------------- */

/** The sealed bytes in hex: the message, then the tag that guards it. */
function Bytes({ bytes, changed }: { bytes: Uint8Array | null; changed: number | null }) {
  const tagFrom = bytes ? bytes.length - TAG_BYTES : 0;
  return (
    <div className="mt-2 rounded-2xl bg-surface-sunken p-3 sm:p-3.5">
      <p className="sr-only">
        {bytes ? `${bytes.length} bytes: ${tagFrom} of sealed message and a ${TAG_BYTES}-byte tag.` : "Sealing…"}
      </p>
      <p aria-hidden className="flex min-h-[3.2em] flex-wrap gap-x-[0.45em] gap-y-1 font-mono text-[11.5px] leading-snug sm:text-[12.5px]">
        {bytes
          ? Array.from(bytes, (byte, i) => (
              <span
                key={i}
                className={`rounded-[4px] ${
                  i === changed
                    ? "bg-warn-soft px-0.5 text-warn ring-1 ring-warn/40"
                    : i >= tagFrom
                      ? "text-accent"
                      : "text-foreground/80"
                }`}
              >
                {byte.toString(16).padStart(2, "0")}
              </span>
            ))
          : "…"}
      </p>
      <p aria-hidden className="mt-3 flex gap-4 text-[11.5px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-foreground/60" />
          Your message, sealed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Tag: catches any change
        </span>
      </p>
    </div>
  );
}

function Outcome({ result, opened }: { result: Result; opened: string }) {
  const { reduce } = useStoryMotion();
  const motionProps = {
    initial: reduce ? false : { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? undefined : { opacity: 0, y: -6 },
    transition: { duration: 0.22 },
  } as const;

  return (
    <div aria-live="polite" className="relative mt-3 min-h-[64px] sm:mt-4 sm:min-h-[76px]">
      <AnimatePresence mode="popLayout" initial={false}>
        {result === "sealed" && (
          <motion.p key="sealed" {...motionProps} className="pt-1 text-[13.5px] leading-snug text-muted">
            Without the key, that’s all anyone on the way ever sees. Try opening it, then change a
            byte and try again.
          </motion.p>
        )}
        {result === "opened" && (
          <motion.div key="opened" {...motionProps} className="rounded-2xl bg-accent-soft p-3.5">
            <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-accent">
              <CheckCircleIcon weight="fill" className="h-4 w-4" />
              Opened on Ana’s phone
            </p>
            <p className="mt-2 inline-block max-w-full break-words rounded-[16px] rounded-bl-md bg-surface px-3 py-1.5 text-[14px]">
              {opened || "(an empty message)"}
            </p>
          </motion.div>
        )}
        {result === "dropped" && (
          <motion.div key="dropped" {...motionProps} className="rounded-2xl bg-warn-soft p-3.5">
            <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-warn">
              <ProhibitIcon weight="bold" className="h-4 w-4" />
              Dropped, never shown
            </p>
            <p className="mt-1.5 text-[13px] leading-snug text-muted">
              One byte changed on the way, so the tag no longer matches. hoppin throws it away
              rather than show something that was tampered with.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
