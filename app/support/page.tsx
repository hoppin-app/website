import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Support — hoppin",
  description:
    "How to get help with hoppin: verification, safety numbers, blocking and reporting, app lock, deleting your account, and how to reach us.",
  openGraph: {
    title: "Support — hoppin",
    description:
      "How to get help with hoppin: verification, safety numbers, blocking and reporting, app lock, deleting your account, and how to reach us.",
    url: "/support",
    siteName: "hoppin",
    type: "website",
  },
};

export default function SupportPage() {
  return (
    <LegalShell
      title="Support"
      intro="Answers to the things people ask most, and how to reach a human when they are not enough."
      showUpdated={false}
    >
      <h2>Contact us</h2>
      <p>
        Email <strong>[contact email]</strong>. Include your iOS version and
        what you were doing when the problem happened — but never include your
        message content, and never send us a password or recovery code from any
        service. We aim to reply within a few working days.
      </p>

      <div className="legal-note">
        <p>
          <strong>Reporting abuse?</strong> Use <strong>Report</strong> inside
          the app, from the conversation or the contact. Reports reach us with
          the account and reason, plus any messages you choose to attach, and we
          act on them within 24 hours. If someone is in immediate danger,
          contact your local emergency services first.
        </p>
      </div>

      <h2>Requirements</h2>
      <ul>
        <li>iPhone running iOS 18 or later.</li>
        <li>A phone number that can receive an SMS, for one-time verification.</li>
        <li>
          hoppin is not on the App Store yet. It is coming; in the meantime the
          source is public and can be built and run yourself.
        </li>
      </ul>

      <h2>Common questions</h2>

      <h3>I did not receive my verification code</h3>
      <p>
        Codes are sent by SMS and are valid for ten minutes. Check that the
        number is correct including the country code, that you have signal, and
        that the message has not been filtered as junk. Requests are rate
        limited, so if you have tried several times in a row you may need to
        wait an hour before requesting another.
      </p>

      <h3>What is a safety number?</h3>
      <p>
        Each conversation has a 60-digit safety number derived from both
        people&rsquo;s keys. If it matches on both phones — read it out, or scan
        the other person&rsquo;s QR code when you are together — nobody is
        sitting between you. Marking a contact as verified records that you
        checked.
      </p>

      <h3>hoppin says a contact&rsquo;s key changed</h3>
      <p>
        That happens when they reinstall the app or move to a new device — and
        it is also what an impersonation attempt would look like. hoppin blocks
        sending until you acknowledge the change. Confirm with the person over a
        channel you trust, or compare safety numbers again, before you continue.
      </p>

      <h3>Are my messages on a server?</h3>
      <p>
        Only when they cannot be delivered directly, and only as ciphertext. On
        the same local network, messages go straight between devices. Otherwise
        the encrypted message waits on the relay until the other phone fetches
        it, for at most 7 days, and is deleted after that. The{" "}
        <Link href="/privacy">privacy policy</Link> lists exactly what the
        server can and cannot see.
      </p>

      <h3>How do I block or report someone?</h3>
      <p>
        Open the conversation or the contact and choose <strong>Block</strong>{" "}
        to stop them reaching you, or <strong>Report</strong> to send us the
        account and a reason. A report may include message evidence, but only
        the messages you choose to attach.
      </p>

      <h3>How do I lock the app?</h3>
      <p>
        Settings → App Lock turns on Face ID or a passcode, with a timeout you
        choose.
      </p>

      <h3>How do I change my number?</h3>
      <p>
        Settings → Change Number verifies the new number and moves your
        identity to it, keeping your conversations on the device.
      </p>

      <h3>How do I delete my account?</h3>
      <p>
        Settings → Delete Account removes your registration, your certificate
        and any queued messages from the server, and wipes your keys and
        conversations from the device. It cannot be undone and nothing can be
        restored afterwards — we hold no backup of it.
      </p>

      <h3>Can I recover my messages on a new phone?</h3>
      <p>
        No. Conversations are stored only on the device and deliberately
        excluded from iCloud and device backups, so there is nothing to restore.
      </p>

      <h2>Also useful</h2>
      <ul>
        <li>
          <Link href="/privacy">Privacy policy</Link> — what is processed, for
          how long, and how to have it deleted.
        </li>
        <li>
          <Link href="/terms">Terms of service</Link> — acceptable use and our
          zero-tolerance rule for abuse.
        </li>
      </ul>
    </LegalShell>
  );
}
