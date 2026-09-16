"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HopMark } from "./HopMark";

/* Hrefs are root-relative so the same nav works from /privacy, /terms and
   the other standalone pages, not only from the home page. */
const links = [
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/#transparency", label: "Transparency" },
  { href: "/#security", label: "Security" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-b border-hairline" : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(20px)" : undefined,
        WebkitBackdropFilter: scrolled ? "saturate(180%) blur(20px)" : undefined,
      }}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="-my-2 flex cursor-pointer items-center gap-2 py-2 text-[15px] font-semibold tracking-[-0.01em]"
        >
          <HopMark className="h-[18px] w-[18px] text-accent" />
          HopChat
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="-my-3 block cursor-pointer py-3 text-[12px] text-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#download"
          className="relative cursor-pointer rounded-full bg-brand px-4 py-1.5 text-[12px] font-medium text-white transition-opacity duration-200 after:absolute after:inset-x-0 after:-inset-y-[9px] after:content-[''] hover:opacity-85"
        >
          Get HopChat
        </Link>
      </nav>
    </header>
  );
}
