import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Reveal from "../components/Reveal";
import SiteFooter, { REPO_URL } from "../components/SiteFooter";
import { HopMark } from "../components/HopMark";
import { AppleIcon, GithubIcon, LockIcon, PhoneIdIcon, WifiIcon } from "../components/icons";

export const metadata: Metadata = {
  title: "You have been invited to HopChat",
  description:
    "Someone wants to message you on HopChat: end-to-end encrypted messaging for iPhone. Coming to the App Store. Requires iOS 18 or later.",
  openGraph: {
    title: "You have been invited to HopChat",
    description:
      "Someone wants to message you on HopChat: end-to-end encrypted messaging for iPhone. Coming to the App Store. Requires iOS 18 or later.",
    url: "/join",
    siteName: "HopChat",
    type: "website",
  },
};

const points = [
  {
    icon: LockIcon,
    title: "Encrypted end to end",
    body: "Messages, photos and captions are sealed on the device that sends them and opened only on the device that receives them.",
  },
  {
    icon: PhoneIdIcon,
    title: "One SMS, no account",
    body: "You verify your phone number once. There is no password, no email address and no profile to fill in.",
  },
  {
    icon: WifiIcon,
    title: "Direct when it can be",
    body: "On the same Wi-Fi, messages go straight between phones. Otherwise a relay holds the sealed message until yours picks it up.",
  },
];

export default function JoinPage() {
  return (
    <>
      <Nav />

      <main id="main" className="flex-1">
        <section className="relative overflow-hidden px-5 pb-8 pt-16 sm:px-8 sm:pt-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[560px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.13] blur-[110px]"
            style={{ background: "var(--glow)" }}
          />

          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <HopMark className="mx-auto h-10 w-10 text-accent" />
            </Reveal>

            <Reveal delay={60}>
              <h1 className="t-title mt-7 text-balance">
                Someone wants to message you on HopChat.
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="t-subtitle mx-auto mt-5 max-w-[32rem] text-balance text-muted">
                HopChat is an end-to-end encrypted messenger for iPhone. Your
                messages and photos stay on your device, and nobody in between —
                including us — can read them.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-[15px] font-medium text-white opacity-90">
                  <AppleIcon className="h-[18px] w-[18px]" />
                  Coming soon to the App Store
                </span>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-hairline px-7 py-3 text-[15px] font-medium transition-colors duration-200 hover:bg-surface"
                >
                  <GithubIcon className="h-[17px] w-[17px]" />
                  Build it from source
                </a>
              </div>
              <p className="mt-5 text-[12.5px] text-muted">
                Requires iOS 18 or later · A phone number that can receive one
                SMS
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-24">
          <ul className="mx-auto grid max-w-5xl gap-x-10 gap-y-12 sm:grid-cols-3">
            {points.map((point, i) => (
              <Reveal as="li" key={point.title} delay={i * 50}>
                <point.icon className="h-[26px] w-[26px] text-accent" />
                <h2 className="mt-4 text-[19px] font-semibold tracking-[-0.02em]">
                  {point.title}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="border-t border-hairline bg-surface px-5 py-20 sm:px-8 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="t-title text-balance">What happens when you join.</h2>
            <p className="t-subtitle mt-5 text-balance text-muted">
              You install HopChat, verify your number with a code, and the
              person who invited you can reach you. Your contacts stay on your
              phone, and you can block or report anyone from inside the app.
            </p>
            <p className="mt-8 text-[14px] text-muted">
              Read the <Link href="/privacy" className="text-accent underline-offset-4 hover:underline">privacy policy</Link>{" "}
              and the <Link href="/terms" className="text-accent underline-offset-4 hover:underline">terms</Link>{" "}
              before you do, or see{" "}
              <Link href="/#transparency" className="text-accent underline-offset-4 hover:underline">
                what the server can and can&rsquo;t see
              </Link>
              .
            </p>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
