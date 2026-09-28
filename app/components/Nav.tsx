import Link from "next/link";
import { HopMark } from "./HopMark";
import ThemeToggle from "./ThemeToggle";

/**
 * The header on the standalone pages (privacy, terms, support, join). The
 * home page has no bar at all: its navigation is the timeline on the right.
 */
export default function Nav() {
  return (
    <header className="px-4 pt-4 sm:px-6 sm:pt-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="flex h-10 items-center gap-2 text-[16px] font-semibold tracking-[-0.02em]"
        >
          <HopMark className="h-[19px] w-[19px] text-accent" />
          hoppin
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
