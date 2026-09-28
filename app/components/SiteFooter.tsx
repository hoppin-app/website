import Image from "next/image";
import Link from "next/link";
import { AppleLogoIcon, ArrowUpIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";
import AppStoreLink from "./AppStoreLink";
import { HopMark } from "./HopMark";

export const REPO_URL = "https://github.com/rloucao/hoppin-Swift";

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
];

const linkClass = "cursor-pointer text-on-ink/70 transition-colors duration-200 hover:text-on-ink";

/**
 * The closing block: one last line, the way to get the app, then the small
 * print. It is set in ink, the site's one inverted surface (the primary
 * buttons), so it flips with the theme the way they do.
 *
 * On the home page it waits underneath the story and is uncovered as the
 * last chapter scrolls away (`.footer-reveal` in page.tsx).
 */
export default function SiteFooter() {
  return (
    <footer className="bg-ink text-on-ink">
      <div className="mx-auto flex max-w-6xl flex-col px-5 pb-8 pt-14 sm:px-8 sm:pt-16">
        <div className="flex items-center gap-3">
          <Image
            src="/app-icon-96.webp"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-[10px]"
          />
          <p className="font-mono text-[12.5px] tracking-[-0.01em] text-on-ink/70">
            Free, for iPhone on iOS 18 or later
          </p>
        </div>

        <h2 className="t-display mt-6 max-w-[15ch] text-balance">Say something only they can read.</h2>

        <AppStoreLink className="btn btn-on-ink mt-8 self-start">
          <AppleLogoIcon weight="fill" className="h-[18px] w-[18px]" />
          Get the app
        </AppStoreLink>

        <div className="mt-14 flex flex-col gap-4 border-t border-on-ink/15 pt-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
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
            <p className="text-on-ink/55">
              Built by{" "}
              <a
                href="https://rloucao.dev"
                target="_blank"
                rel="noreferrer noopener"
                className="cursor-pointer underline-offset-4 transition-colors duration-200 hover:text-on-ink hover:underline"
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
