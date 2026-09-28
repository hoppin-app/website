import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AppleLogoIcon,
  DeviceMobileIcon,
  GithubLogoIcon,
  LockSimpleIcon,
  PathIcon,
} from "@phosphor-icons/react/ssr";
import AppStoreLink from "../components/AppStoreLink";
import Nav from "../components/Nav";
import Reveal from "../components/Reveal";
import SiteFooter, { REPO_URL } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "You have been invited to hoppin",
  description:
    "Someone wants to message you on hoppin: end-to-end encrypted messaging for iPhone. Coming to the App Store. Requires iOS 18 or later.",
  openGraph: {
    title: "You have been invited to hoppin",
    description:
      "Someone wants to message you on hoppin: end-to-end encrypted messaging for iPhone. Coming to the App Store. Requires iOS 18 or later.",
    url: "/join",
    siteName: "hoppin",
    type: "website",
  },
};

const points = [
  {
    icon: LockSimpleIcon,
    title: "Encrypted end to end",
    body: "Messages and photos are sealed on the phone that sends them and opened only on the phone that receives them.",
  },
  {
    icon: DeviceMobileIcon,
    title: "One SMS, no account",
    body: "You verify your phone number once. There is no password, no email address and no profile to fill in.",
  },
  {
    icon: PathIcon,
    title: "It finds a way",
    body: "Straight across the same Wi-Fi, directly across the internet, or over Bluetooth with no signal. Otherwise a relay holds it, sealed, until your phone collects it.",
  },
];

export default function JoinPage() {
  return (
    <>
      <Nav />

      <main id="main" className="flex-1">
        <section className="px-5 pb-8 pt-28 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Image
                src="/app-icon-384.webp"
                alt="The hoppin app icon"
                width={88}
                height={88}
                priority
                className="mx-auto h-[88px] w-[88px] rounded-[21px] shadow-[var(--shadow-phone)]"
              />
            </Reveal>

            <Reveal delay={60}>
              <h1 className="t-title mt-9 text-balance">
                Someone wants to message you on hoppin.
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="t-lead mx-auto mt-5 max-w-[36ch] text-balance">
                An end-to-end encrypted messenger for iPhone. Nobody in
                between can read what you send, including us.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex flex-col items-center justify-center gap-2 sm:flex-row">
                <AppStoreLink className="btn btn-ink">
                  <AppleLogoIcon weight="fill" className="h-[18px] w-[18px]" />
                  Coming soon to the App Store
                </AppStoreLink>
                <a href={REPO_URL} target="_blank" rel="noreferrer noopener" className="btn btn-quiet">
                  <GithubLogoIcon className="h-[18px] w-[18px]" />
                  Read the source
                </a>
              </div>
              <p className="mt-5 text-[13px] text-muted">
                For iOS 18 or later, with a phone number that can receive one SMS.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-24">
          <ul className="mx-auto grid max-w-5xl gap-x-10 gap-y-12 sm:grid-cols-3">
            {points.map((point, i) => (
              <Reveal as="li" key={point.title} delay={i * 50}>
                <point.icon weight="light" className="h-9 w-9 text-accent" />
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

        <section className="border-t border-hairline px-5 py-20 sm:px-8 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="t-title text-balance">What happens when you join.</h2>
            <p className="t-lead mx-auto mt-5 max-w-[46ch] text-balance">
              You install hoppin, verify your number with a code, and the
              person who invited you can reach you. Your contacts stay on your
              phone, and you can block or report anyone from inside the app.
            </p>
            <p className="mt-8 text-[14px] text-muted">
              Read the{" "}
              <Link href="/privacy" className="text-accent underline-offset-4 hover:underline">privacy policy</Link>{" "}
              and the{" "}
              <Link href="/terms" className="text-accent underline-offset-4 hover:underline">terms</Link>{" "}
              first, or see{" "}
              <Link href="/#transparency" className="text-accent underline-offset-4 hover:underline">
                what the relay can and can&rsquo;t see
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
