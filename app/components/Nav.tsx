"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppleLogoIcon } from "@phosphor-icons/react";
import AppStoreLink from "./AppStoreLink";
import { HopMark } from "./HopMark";
import ThemeToggle from "./ThemeToggle";

/**
 * The top bar, Flighty-style: at the top of the page it is a full-width,
 * transparent row; the moment you scroll it shrinks into a floating frosted
 * pill, and back again at the top. Three things only: the name, the theme
 * switch and the way to get the app. Chapter navigation on the home page is
 * the timeline on the right.
 *
 * "Scrolled" comes from an IntersectionObserver on a marker at the top of the
 * document, so the state flips once each way with no scroll listener. The bar
 * is fixed, so nothing below it moves when it changes shape.
 */
export default function Nav() {
  const marker = useRef<HTMLDivElement>(null);
  const [floating, setFloating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const el = marker.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setFloating(!entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // On the home page the name takes you back to the top instead of reloading it.
  const toTop = (event: React.MouseEvent) => {
    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div ref={marker} aria-hidden className="pointer-events-none absolute left-0 top-0 h-10 w-full" />

      <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5">
        <nav
          aria-label="Main"
          data-floating={floating}
          className="nav-pill mx-auto flex items-center justify-between"
        >
          <Link
            href="/"
            onClick={toTop}
            className="flex shrink-0 items-center gap-2 text-[16px] font-semibold tracking-[-0.02em]"
          >
            <HopMark className="h-[19px] w-[19px] text-accent" />
            hoppin
          </Link>

          <div className="flex items-center gap-1.5">
            <ThemeToggle look="plain" />
            <AppStoreLink className="btn btn-ink shrink-0 !gap-1.5 !px-4 !py-2 text-[13.5px]">
              <AppleLogoIcon weight="fill" className="h-4 w-4" />
              Get the app
            </AppStoreLink>
          </div>
        </nav>
      </header>
    </>
  );
}
