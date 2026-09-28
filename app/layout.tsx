import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hoppin.app"),
  title: "hoppin · Encrypted messages that find a way",
  description:
    "hoppin is an end-to-end encrypted messenger for iPhone. Messages go straight across your Wi-Fi, directly across the internet, over Bluetooth when there's no signal, or through a relay that only ever holds them sealed.",
  openGraph: {
    title: "hoppin · Encrypted messages that find a way",
    description:
      "End-to-end encrypted messaging for iPhone. Straight across your Wi-Fi, across the internet, or over Bluetooth with no signal at all.",
    url: "/",
    siteName: "hoppin",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
      // The theme script below sets data-theme before React hydrates.
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-on-ink"
        >
          Skip to content
        </a>
        {children}
        {/* Light unless the visitor chose dark (ThemeToggle). Runs before the
            first paint, so a dark visit never flashes light or the reverse. */}
        <Script id="theme" strategy="beforeInteractive">
          {`try{document.documentElement.dataset.theme=localStorage.getItem("hoppin-theme")==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}`}
        </Script>
      </body>
    </html>
  );
}
