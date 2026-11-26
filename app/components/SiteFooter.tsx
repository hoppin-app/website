import Image from "next/image";
import Link from "next/link";
import { AppleLogoIcon, ArrowUpIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";
import AppStoreLink from "./AppStoreLink";
import { HopMark } from "./HopMark";

export const REPO_URL = "https://github.com/hoppin-app/hoppin";

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
  { href: "/accessibility", label: "Accessibility" },
];

const linkClass = "cursor-pointer text-foreground/70 transition-colors duration-200 hover:text-foreground";

/**
 * The closing block: one last line, the way to get the app, then the small
 * print. It sits on the app's lava backdrop (light: pastel Aurora, dark: the
 * full colours) seen through liquid glass that covers the whole footer (`.footer-lava`, `.footer-glass`
 * in globals.css).
 *
 * On the home page it waits underneath the story and is uncovered as the
 * last chapter scrolls away (`.footer-reveal` in page.tsx).
 */
export default function SiteFooter() {
  return (
    <footer className="footer-lava">
      <div aria-hidden="true">
        <span className="lava-blob" />
        <span className="lava-blob" />
        <span className="lava-blob" />
        <span className="lava-blob" />
        <span className="lava-blob" />
      </div>
      <div className="footer-glass" aria-hidden="true" />
      <div className="mx-auto flex max-w-6xl flex-col px-5 pb-8 pt-14 sm:px-8 sm:pt-16">
        <div className="flex items-center gap-3">
          <Image
            src="/app-icon-96.webp"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-[10px]"
          />
          <p className="font-mono text-[12.5px] tracking-[-0.01em] text-foreground/70">
            Free, for iPhone on iOS 18 or later
          </p>
        </div>

        <h2 className="t-display mt-6 max-w-[15ch] text-balance">Say something only they can read.</h2>

        <AppStoreLink className="btn btn-ink mt-8 self-start">
          <AppleLogoIcon weight="fill" className="h-[18px] w-4.5" />
          Get the app
        </AppStoreLink>

        <div className="mt-14 flex flex-col gap-4 border-t border-foreground/10 pt-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li>
                <Link href="/" className={`flex items-center gap-2 font-medium ${linkClass}`}>
                  <HopMark className="h-4 w-4" />
                  hoppin
                </Link>
              </li>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`flex items-center gap-1.5 ${linkClass}`}
                >
                  <GithubLogoIcon className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-foreground/60">
              Built by{" "}
              <a
                href="https://rloucao.dev"
                target="_blank"
                rel="noreferrer noopener"
                className="cursor-pointer underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
              >
                Rodrigo Loução
              </a>
              . Sealed on your device, before it goes anywhere.
            </p>
            <a href="#" className={`group flex items-center gap-1.5 ${linkClass}`}>
              Back to top
              <ArrowUpIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
