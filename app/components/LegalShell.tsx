import Nav from "./Nav";
import SiteFooter from "./SiteFooter";

/** Single source of truth for the date shown on the legal pages. */
export const LAST_UPDATED = "16 September 2026";

/**
 * Shared chrome for the standalone text pages (privacy, terms, support, join).
 * Body copy inside `children` is styled by the `.legal` rules in globals.css.
 */
export default function LegalShell({
  title,
  intro,
  showUpdated = true,
  children,
}: {
  title: string;
  intro?: string;
  showUpdated?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />

      <main id="main" className="flex-1 px-5 pb-28 pt-14 sm:px-8 sm:pt-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="t-title text-balance">{title}</h1>

          {intro && (
            <p className="t-subtitle mt-5 text-balance text-muted">{intro}</p>
          )}

          {showUpdated && (
            <p className="mt-7 text-[13px] text-muted">
              Last updated: {LAST_UPDATED}
            </p>
          )}

          <div className="legal mt-12">{children}</div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
