import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Service — hoppin",
  description:
    "The rules for using hoppin: acceptable use, zero tolerance for objectionable content and abusive users, reporting, termination and disclaimers.",
  openGraph: {
    title: "Terms of Service — hoppin",
    description:
      "The rules for using hoppin: acceptable use, zero tolerance for objectionable content and abusive users, reporting, termination and disclaimers.",
    url: "/terms",
    siteName: "hoppin",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      intro="Short, and worth reading — especially the part about what is not allowed."
    >
      <h2>1. Accepting these terms</h2>
      <p>
        These terms are an agreement between you and{" "}
        <strong>[Company/Developer legal name]</strong> (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;) covering your use of the hoppin app and this website.
        By verifying your phone number and using hoppin, you accept them. If
        you do not accept them, do not use hoppin.
      </p>

      <h2>2. Who may use hoppin</h2>
      <p>
        You must be at least 13 years old, and at least 16 if you are in the
        European Union, or the minimum age of digital consent in your country if
        that is higher. You must be able to enter into a binding agreement and
        must not be barred from using the service under applicable law.
      </p>

      <h2>3. Your number and your keys</h2>
      <p>
        hoppin identifies you by a phone number you verify by SMS. You must use
        a number you are entitled to use. You are responsible for the security
        of your device and for what is sent from it. If you lose access to your
        number or device, your keys and your locally stored conversations cannot
        be recovered by us — we do not hold them.
      </p>

      <h2>4. Acceptable use</h2>
      <p>You agree not to use hoppin to:</p>
      <ul>
        <li>
          send, request or distribute content that is unlawful, including child
          sexual abuse material, content that incites violence or terrorism, or
          content that infringes someone else&rsquo;s rights;
        </li>
        <li>
          harass, threaten, stalk, defame, impersonate or intimidate anyone, or
          send someone messages after they have asked you to stop;
        </li>
        <li>
          send sexual content to a person who has not consented to receive it,
          or any sexual content involving minors;
        </li>
        <li>
          send bulk, automated or unsolicited messages, or use the service for
          spam, scams, phishing or fraud;
        </li>
        <li>
          attempt to break, overload, probe or circumvent the service&rsquo;s
          security, rate limits or encryption, or to access accounts or messages
          that are not yours;
        </li>
        <li>
          use the service in violation of any applicable law, or to help anyone
          else do any of the above.
        </li>
      </ul>

      <h2>5. Zero tolerance for objectionable content and abusive users</h2>
      <p>
        <strong>
          We have no tolerance for objectionable content or abusive behaviour on
          hoppin.
        </strong>{" "}
        Messages are end-to-end encrypted, so we cannot proactively scan them —
        which makes your reports the mechanism that matters. When you report a
        user, we review the report and any evidence you attach and act on it{" "}
        <strong>within 24 hours</strong>. Acting on a report may mean removing
        the reported content from our relay, suspending the account, or
        permanently terminating it and refusing further registration of that
        number.
      </p>
      <p>
        Every user has two controls available at all times, inside the app:
      </p>
      <ul>
        <li>
          <strong>Block</strong> — stops a contact from reaching you at all; you
          can block anyone from a conversation or from their contact entry.
        </li>
        <li>
          <strong>Report</strong> — sends us the account and the reason, and
          optionally the messages you choose to attach as evidence.
        </li>
      </ul>

      <h2>6. Content you send</h2>
      <p>
        You keep all rights to what you send. Because hoppin is end-to-end
        encrypted, we do not host, review, publish or licence your content; the
        only copies are on the devices in the conversation, plus a sealed,
        unreadable copy on our relay for at most 7 days if the recipient is
        offline. You are solely responsible for the content you send and for
        having the right to send it.
      </p>

      <h2>7. Suspension and termination</h2>
      <p>
        We may suspend or terminate your access at any time, without notice, if
        you breach these terms, if we are required to by law, or if your use
        endangers the service or other users. You may stop using hoppin at any
        time and can remove your account and your data from our server using{" "}
        <strong>Delete Account</strong> in the app&rsquo;s settings.
      </p>

      <h2>8. The service as it is</h2>
      <p>
        hoppin is provided <strong>&ldquo;as is&rdquo;</strong> and{" "}
        <strong>&ldquo;as available&rdquo;</strong>, without warranties of any
        kind, whether express or implied, including any implied warranties of
        merchantability, fitness for a particular purpose, or
        non-infringement. We do not warrant that the service will be
        uninterrupted, timely, secure or error-free, or that any message will be
        delivered. Messages not collected within 7 days are deleted undelivered.
        Nothing here excludes any rights you have as a consumer that cannot be
        excluded under applicable law.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we are not liable for indirect,
        incidental, special or consequential damages, or for lost data, lost
        messages or lost profits arising out of your use of hoppin. Nothing in
        these terms limits liability for death or personal injury caused by
        negligence, for fraud, or for anything else that cannot be limited by
        law.
      </p>

      <h2>10. Changes to these terms</h2>
      <p>
        We may update these terms. The date at the top of this page shows when
        they last changed, and material changes will be notified in the app.
        Continuing to use hoppin after a change means you accept the updated
        terms.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These terms are governed by the laws of{" "}
        <strong>[To be confirmed]</strong>, and the courts of{" "}
        <strong>[To be confirmed]</strong> have exclusive jurisdiction, without
        affecting any mandatory protections available to you as a consumer in
        your country of residence.
      </p>

      <h2>12. Contact</h2>
      <p>
        Reach us at <strong>[contact email]</strong> or through the{" "}
        <Link href="/support">support page</Link>. Our{" "}
        <Link href="/privacy">privacy policy</Link> explains what data is
        involved in all of this.
      </p>
    </LegalShell>
  );
}
