import Link from "next/link";
import Nav from "./components/Nav";
import Reveal from "./components/Reveal";
import SiteFooter, { REPO_URL } from "./components/SiteFooter";
import { Phone, ChatListScreen, ChatRoomScreen } from "./components/Phone";
import ScrollStory from "./components/ScrollStory";
import { HopMark } from "./components/HopMark";
import {
  LockIcon,
  NoServerIcon,
  NetworkIcon,
  PhoneIdIcon,
  WifiIcon,
  ShieldIcon,
  AppleIcon,
  GithubIcon,
  ArrowIcon,
  CheckIcon,
} from "./components/icons";

const features = [
  {
    icon: LockIcon,
    title: "Encrypted end to end",
    body: "Every message is sealed with a fresh ephemeral key before it leaves your phone: Curve25519 key agreement, AES-GCM encryption, signed on the way out and verified on the way in. There is no plaintext fallback.",
  },
  {
    icon: PhoneIdIcon,
    title: "Your number is your identity",
    body: "Verify your number once with an SMS code and the server signs a certificate for your public keys. No password, no email, no profile to fill in.",
  },
  {
    icon: ShieldIcon,
    title: "Keys you can check",
    body: "A contact's key is pinned the first time you see it. If it ever changes, HopChat warns you before you can send — and you can compare safety numbers or scan their QR code in person.",
  },
  {
    icon: WifiIcon,
    title: "Direct on your network",
    body: "On the same Wi-Fi, devices find each other over Bonjour and connect straight across. Same room, same network, no detour through the internet.",
  },
  {
    icon: NetworkIcon,
    title: "Relayed only when it has to be",
    body: "Off your network, a small relay holds the sealed message until their phone fetches it, for up to 7 days. It routes ciphertext and never holds a key that could open it.",
  },
  {
    icon: NoServerIcon,
    title: "Kept on your device",
    body: "Messages, photos and contacts are stored on your iPhone and excluded from backups. Groups up to 32, read receipts, delete for everyone, block and report, app lock, delete account.",
  },
];

const steps = [
  {
    n: "01",
    title: "Verify your number",
    body: "One SMS code. The server issues a certificate binding your number to your public keys and signs it; your private keys are generated on the device and stay in the iOS keychain.",
    detail: "SMS code → signed certificate",
  },
  {
    n: "02",
    title: "Pin their keys",
    body: "Before the first message, HopChat fetches your contact's certificate and pins it. A later key change is flagged and has to be acknowledged, never silently accepted.",
    detail: "certificate → pinned on first sight",
  },
  {
    n: "03",
    title: "Send it sealed",
    body: "The message is encrypted to their keys on your phone. If they are on the same network it goes straight across; otherwise the relay holds the sealed copy until they fetch it.",
    detail: "AES-GCM → local network or relay",
  },
];

const specs = [
  { label: "Key agreement", value: "Curve25519 ECDH" },
  { label: "Message encryption", value: "AES-GCM" },
  { label: "Signatures", value: "Ed25519" },
  { label: "Key derivation", value: "HKDF-SHA256" },
  { label: "Private keys", value: "iOS Keychain" },
  { label: "Transport to server", value: "TLS, pinned" },
  { label: "Relay retention", value: "≤ 7 days" },
];

const guarantees = [
  "Keys are generated on your device, and private keys never leave it.",
  "Unsigned messages, or messages from an unverifiable certificate, are dropped rather than shown.",
  "A message that fails to decrypt is discarded, never displayed raw.",
  "A contact's key change blocks sending until you acknowledge it.",
  "No analytics, no trackers and no third-party SDKs — in the app or on this site.",
];

const serverSees = [
  "Your phone number, which it verifies by SMS and uses to route messages to you.",
  "The numbers you look up or address a message to.",
  "The IP address your device connects from, and the time and size of what it deposits or fetches.",
  "Sealed messages waiting for delivery — kept for up to 7 days, deleted once fetched.",
  "Reports you send, including any message evidence you choose to attach.",
];

const serverCannotSee = [
  "The content of any message, photo or caption. It only ever holds ciphertext.",
  "Anything at all about messages delivered over your local network — those never reach it.",
  "Your address book. HopChat only asks about numbers you actually message.",
  "Your message history. Nothing is kept once a message has been fetched and acknowledged.",
  "Anything it could hand to an analytics or advertising provider, because there are none.",
];

export default function Home() {
  return (
    <>
      <Nav />

      <main id="main" className="flex-1">
        {/* ================================================================
            Hero
            ================================================================ */}
        <section className="relative overflow-hidden px-5 pb-4 pt-16 sm:px-8 sm:pt-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[620px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.13] blur-[110px]"
            style={{ background: "var(--glow)" }}
          />

          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="t-eyebrow text-accent">
                End-to-end encrypted messaging for iPhone
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="t-display mt-4 text-balance">
                Straight to them.
                <br />
                <span className="text-muted">Sealed either way.</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="t-subtitle mx-auto mt-6 max-w-[34rem] text-balance text-muted">
                On the same Wi-Fi, HopChat delivers device to device. Everywhere
                else it goes through a relay that only ever holds the sealed
                envelope. Your messages and photos live on your phone.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#download"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-7 py-3 text-[15px] font-medium text-white transition-opacity duration-200 hover:opacity-85"
                >
                  <AppleIcon className="h-[18px] w-[18px]" />
                  Get HopChat
                </a>
                <a
                  href="#direct"
                  className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-3 text-[15px] text-accent transition-colors duration-200 hover:text-foreground"
                >
                  See how it works
                  <ArrowIcon className="h-[15px] w-[15px] transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>
              <p className="mt-5 text-[12.5px] text-muted">
                Coming soon to the App Store · Requires iOS 18 or later
              </p>
            </Reveal>
          </div>

          {/* Two devices, one hop */}
          <Reveal delay={220}>
            <div className="relative mx-auto mt-16 flex max-w-5xl items-center justify-center">
              <div className="flex items-end justify-center gap-6 sm:gap-14">
                <Phone
                  label="HopChat conversation list showing unread messages and the floating tab bar"
                  className="hidden sm:block lg:-rotate-2"
                >
                  <ChatListScreen />
                </Phone>
                <Phone
                  label="A HopChat conversation with end-to-end encrypted messages"
                  className="lg:rotate-2"
                >
                  <ChatRoomScreen />
                </Phone>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ================================================================
            The point
            ================================================================ */}
        <section id="direct" className="scroll-mt-16 px-5 pt-24 sm:px-8 sm:pt-32">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="t-title text-balance">
                Every other messenger can read what it carries.
              </h2>
              <p className="t-subtitle mt-5 text-balance text-muted">
                Your message goes up to their server as something the company
                could open. Scroll to watch HopChat seal it first.
              </p>
            </Reveal>

            {/* Pinned stage: scroll position scrubs the whole sequence */}
            <ScrollStory />

            {/* Honest footnote — what the one piece of infrastructure does */}
            <Reveal className="mx-auto mt-4 mb-24 flex max-w-3xl items-start gap-4 rounded-2xl border border-hairline px-6 py-5 sm:mb-32">
              <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-[14px] leading-relaxed text-muted">
                <span className="font-medium text-foreground">
                  There is a server, and here is what it does.
                </span>{" "}
                It verifies phone numbers by SMS, signs the certificate that
                binds a number to its keys, and holds sealed messages for up to
                seven days when the other phone is offline. It cannot decrypt
                them, and it keeps nothing once they are collected.{" "}
                <Link href="#transparency" className="text-accent underline-offset-4 hover:underline">
                  The full list is below.
                </Link>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            Features
            ================================================================ */}
        <section
          id="features"
          className="scroll-mt-16 border-y border-hairline bg-surface px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <p className="t-eyebrow text-accent">What you get</p>
              <h2 className="t-title mt-3 text-balance">
                Built to need as little as possible.
              </h2>
            </Reveal>

            <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <Reveal as="li" key={feature.title} delay={i * 40}>
                  <feature.icon className="h-[26px] w-[26px] text-accent" />
                  <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.02em]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {feature.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ================================================================
            How it works
            ================================================================ */}
        <section id="how" className="scroll-mt-16 px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <Reveal className="max-w-2xl">
              <p className="t-eyebrow text-accent">How it works</p>
              <h2 className="t-title mt-3 text-balance">
                Three steps, and only the first needs us.
              </h2>
            </Reveal>

            <ol className="mt-14 space-y-px overflow-hidden rounded-3xl border border-hairline">
              {steps.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.n}
                  delay={i * 60}
                  className="grid gap-4 bg-surface px-7 py-9 sm:grid-cols-[5rem_1fr_auto] sm:items-baseline sm:gap-8 sm:px-10"
                >
                  <span className="font-mono text-[13px] text-accent">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-[20px] font-semibold tracking-[-0.02em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                  <code className="font-mono text-[12px] text-muted sm:text-right">
                    {step.detail}
                  </code>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ================================================================
            Transparency — what the server can and cannot see
            ================================================================ */}
        <section
          id="transparency"
          className="scroll-mt-16 border-y border-hairline bg-surface px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <p className="t-eyebrow text-accent">Transparency</p>
              <h2 className="t-title mt-3 text-balance">
                What the server can and can&rsquo;t see.
              </h2>
              <p className="t-subtitle mt-5 text-muted">
                Encryption protects what you say. It does not hide that you said
                something, so here is the rest of it, in plain terms.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              <Reveal className="rounded-3xl border border-hairline bg-background p-8 sm:p-10">
                <h3 className="text-[19px] font-semibold tracking-[-0.02em]">
                  It can see
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {serverSees.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-muted"
                      />
                      <span className="text-[15px] leading-relaxed text-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal
                delay={80}
                className="rounded-3xl border border-hairline bg-background p-8 sm:p-10"
              >
                <h3 className="text-[19px] font-semibold tracking-[-0.02em]">
                  It cannot see
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {serverCannotSee.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckIcon className="mt-0.5 h-[17px] w-[17px] shrink-0 text-accent" />
                      <span className="text-[15px] leading-relaxed text-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal className="mt-8">
              <p className="text-[14px] leading-relaxed text-muted">
                The{" "}
                <Link
                  href="/privacy"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  privacy policy
                </Link>{" "}
                says the same thing at greater length, including how long each
                item is kept and how to have it deleted.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            Security
            ================================================================ */}
        <section
          id="security"
          className="scroll-mt-16 px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <p className="t-eyebrow text-accent">Security</p>
              <h2 className="t-title mt-3 text-balance">
                Cryptography you can look up.
              </h2>
              <p className="t-subtitle mt-5 text-muted">
                No invented primitives and no proprietary protocol. HopChat uses
                Apple&rsquo;s CryptoKit with well-understood algorithms, and the
                source is public so you can check every line of it.
              </p>

              <ul className="mt-9 space-y-3.5">
                {guarantees.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon className="mt-0.5 h-[17px] w-[17px] shrink-0 text-accent" />
                    <span className="text-[15px] leading-relaxed text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-9 inline-flex cursor-pointer items-center gap-2 text-[15px] text-accent transition-colors duration-200 hover:text-foreground"
              >
                <GithubIcon className="h-[17px] w-[17px]" />
                Read the source
                <ArrowIcon className="h-[15px] w-[15px] transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </Reveal>

            <Reveal delay={80}>
              <dl className="overflow-hidden rounded-3xl border border-hairline bg-surface">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-6 border-b border-hairline px-6 py-4 last:border-b-0 sm:px-8"
                  >
                    <dt className="text-[14px] text-muted">{spec.label}</dt>
                    <dd className="font-mono text-[13px] tracking-tight">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 px-2 text-[13px] leading-relaxed text-muted">
                Identity certificates are signed by the server and pinned by the
                app, and each contact&rsquo;s key is pinned again on your device
                the first time you see it.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            Download
            ================================================================ */}
        <section
          id="download"
          className="scroll-mt-16 border-t border-hairline bg-surface px-5 py-28 text-center sm:px-8 sm:py-36"
        >
          <Reveal className="mx-auto max-w-2xl">
            <HopMark className="mx-auto h-9 w-9 text-accent" />
            <h2 className="t-title mt-7 text-balance">
              Say something no one else can read.
            </h2>
            <p className="t-subtitle mx-auto mt-5 max-w-lg text-balance text-muted">
              Free, open source, and built on Apple&rsquo;s own frameworks. No
              trackers, no ads, no business model.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-7 py-3 text-[15px] font-medium text-white transition-opacity duration-200 hover:opacity-85"
              >
                <AppleIcon className="h-[18px] w-[18px]" />
                Build it from source
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-hairline px-7 py-3 text-[15px] font-medium transition-colors duration-200 hover:bg-background"
              >
                <GithubIcon className="h-[17px] w-[17px]" />
                View on GitHub
              </a>
            </div>

            <p className="mt-6 text-[12.5px] text-muted">
              Coming soon to the App Store · Requires iOS 18 or later
            </p>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
