import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

/* Fallback for non-Apple platforms — Apple devices get real SF Pro
   from the system stack declared in globals.css. */
const inter = Inter({
  variable: "--font-inter",
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
  title: "hoppin — End-to-end encrypted messaging for iPhone",
  description:
    "hoppin delivers end-to-end encrypted messages between iPhones — directly over your local network, or through a relay that only ever holds sealed ciphertext. Messages, photos and contacts stay on your device.",
  openGraph: {
    title: "hoppin — End-to-end encrypted messaging for iPhone",
    description:
      "End-to-end encrypted messaging for iPhone. Direct on your local network, relayed as sealed ciphertext everywhere else. Messages stay on your device.",
    url: "/",
    siteName: "hoppin",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Light is the primary theme, so the browser chrome matches it everywhere.
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
