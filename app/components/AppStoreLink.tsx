import type { AnchorHTMLAttributes } from "react";

/* hoppin on the App Store. Empty until the listing is live: every "Get the
   app" button goes through AppStoreLink, so filling this in turns them all on
   at once. */
export const APP_STORE_URL = "";

/**
 * A link to hoppin's App Store listing. While `APP_STORE_URL` is empty it is
 * a disabled link: the button is in place, but it goes nowhere.
 */
export default function AppStoreLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!APP_STORE_URL) {
    return (
      <a role="link" aria-disabled="true" {...props}>
        {children}
      </a>
    );
  }
  return (
    <a href={APP_STORE_URL} {...props}>
      {children}
    </a>
  );
}
