"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { usePrefersReducedMotion } from "./StoryParts";

/* The page is light unless you ask for dark. The choice is set on <html> by
   the inline script in layout.tsx before the first paint, so there is no
   flash; this button flips it and remembers it for the next visit. */

export const THEME_KEY = "hoppin-theme";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const readTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

const LOOKS = {
  /** A button of its own, floating over the page. */
  floating: "h-10 w-10 border border-hairline bg-[var(--nav-bg)] backdrop-blur-xl hover:text-accent",
  /** Inside a bar that already has a background. */
  plain: "h-9 w-9 hover:bg-surface-sunken",
};

export default function ThemeToggle({
  className = "",
  look = "floating",
}: {
  className?: string;
  look?: keyof typeof LOOKS;
}) {
  const theme = useSyncExternalStore(subscribe, readTheme, (): Theme => "light");
  const reduce = usePrefersReducedMotion();
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === "dark" ? "Switch to dark mode" : "Switch to light mode"}
      title={next === "dark" ? "Dark mode" : "Light mode"}
      className={`flex cursor-pointer items-center justify-center rounded-full text-foreground transition-colors duration-200 ${LOOKS[look]} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={reduce ? false : { rotate: -70, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { rotate: 70, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          {theme === "dark" ? (
            <MoonIcon weight="bold" className="h-[18px] w-[18px]" />
          ) : (
            <SunIcon weight="bold" className="h-[18px] w-[18px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
