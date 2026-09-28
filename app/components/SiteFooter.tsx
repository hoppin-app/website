import Link from "next/link";
import { HopMark } from "./HopMark";
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";

export const REPO_URL = "https://github.com/rloucao/hoppin-Swift";

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-surface px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center justify-between gap-5 sm:flex-row">
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-2 text-[13px] text-muted transition-colors duration-200 hover:text-foreground"
          >
            <HopMark className="h-4 w-4" />
            <span>hoppin</span>
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="cursor-pointer text-[13px] text-muted transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="hoppin on GitHub"
            className="cursor-pointer text-muted transition-colors duration-200 hover:text-foreground"
          >
            <GithubLogoIcon className="h-[18px] w-[18px]" />
          </a>
        </div>

        <p className="text-center text-[12.5px] text-muted">
          Built by{" "}
          <a
            href="https://github.com/rloucao"
            target="_blank"
            rel="noreferrer noopener"
            className="cursor-pointer underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
          >
            Rodrigo Loução
          </a>
          . Sealed on your device, before it goes anywhere.
        </p>
      </div>
    </footer>
  );
}
