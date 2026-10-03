import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "../components/LegalShell";
import ContactEmail from "../components/ContactEmail";

export const metadata: Metadata = {
  title: "Accessibility · hoppin",
  description:
    "What hoppin supports for VoiceOver, larger text, dark mode and reduced motion, what we're still working on, and how to tell us when something gets in your way.",
  openGraph: {
    title: "Accessibility · hoppin",
    description:
      "What hoppin supports for VoiceOver, larger text, dark mode and reduced motion, what we're still working on, and how to tell us when something gets in your way.",
    url: "/accessibility",
    siteName: "hoppin",
    type: "website",
  },
};

export default function AccessibilityPage() {
  return (
    <LegalShell
      title="Accessibility"
      intro="hoppin should work for everyone who wants to use it. Here is what it supports today, where it falls short, and how to tell us."
      showUpdated={false}
    >
      <h2>What hoppin supports</h2>

      <h3>VoiceOver</h3>
      <p>
        Buttons, tabs and settings are labelled, and decorative images are
        hidden so VoiceOver doesn&rsquo;t read them out. Each message is read as
        one item: who sent it, the text, when, and whether it was sent, delivered
        or read. A message that went straight between the two phones says so.
        The Chats tab reads out how many messages are unread.
      </p>

      <h3>Larger text</h3>
      <p>
        Text follows the size you choose in{" "}
        <strong>Settings › Accessibility › Display &amp; Text Size</strong>{" "}on
        your iPhone, including the larger accessibility sizes.
      </p>

      <h3>Dark mode</h3>
      <p>
        hoppin follows your iPhone&rsquo;s light or dark appearance, and every
        colour in the app has a version for each.
      </p>

      <h3>Reduced motion</h3>
      <p>
        With <strong>Reduce Motion</strong>{" "}on, the moving backgrounds stop,
        the opening animation is skipped, and smaller touches like the typing
        dots and the welcome screens stay still. The backgrounds also stop in
        Low Power Mode.
      </p>

      <h3>Messages in your language</h3>
      <p>
        You can have a chat translated as messages arrive. Tap the translate
        button at the top of the chat. Translation runs on your iPhone, so
        nothing is sent to a translation service.
      </p>

      <h2>What we&rsquo;re still working on</h2>
      <ul>
        <li>
          At the very largest text sizes, some screens can feel crowded, and a
          long line may be cut short.
        </li>
        <li>
          hoppin doesn&rsquo;t yet change its look for{" "}
          <strong>Reduce Transparency</strong>{" "}or{" "}
          <strong>Increase Contrast</strong>.
        </li>
        <li>
          We haven&rsquo;t yet tested every screen with Voice Control or Switch
          Control.
        </li>
      </ul>
      <p>
        If one of these gets in your way, please tell us. Hearing about it is
        how it moves up the list.
      </p>

      <h2>Tell us what doesn&rsquo;t work</h2>
      <p>
        Write to <ContactEmail /> with &ldquo;Accessibility&rdquo; in the
        subject. Tell us which screen it was, what you were trying to do, and
        which settings you use, such as VoiceOver or a text size. Please
        don&rsquo;t send message content. We usually reply within a few working
        days.
      </p>

      <h2>Also useful</h2>
      <ul>
        <li>
          <Link href="/support">Support</Link>: answers to common questions
          about using hoppin.
        </li>
        <li>
          <Link href="/privacy">Privacy policy</Link>: what is processed, for
          how long, and how to have it deleted.
        </li>
      </ul>
    </LegalShell>
  );
}
