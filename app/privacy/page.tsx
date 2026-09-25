import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy · hoppin",
  description:
    "What hoppin processes, what it never collects, how long anything is kept, and how to have it deleted.",
  openGraph: {
    title: "Privacy Policy · hoppin",
    description:
      "What hoppin processes, what it never collects, how long anything is kept, and how to have it deleted.",
    url: "/privacy",
    siteName: "hoppin",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      intro="hoppin is built so that there is very little to write down here. This page says exactly what does exist."
    >
      <h2>Who is responsible</h2>
      <p>
        hoppin (&ldquo;the app&rdquo;) is provided by{" "}
        <strong>[Company/Developer legal name]</strong>, based in Portugal
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;). For the purposes of the EU General
        Data Protection Regulation (GDPR), we are the controller of the personal
        data described below. You can reach us through our{" "}
        <Link href="/support">support page</Link> or at{" "}
        <strong>[contact email]</strong>. Our postal address is{" "}
        <strong>[postal address]</strong>.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>
          Your messages, photos, captions and contact names are end-to-end
          encrypted. We cannot read them, and we never receive a key that could.
        </li>
        <li>
          Messages and media are stored on your device only, and are excluded
          from iCloud and iTunes backups.
        </li>
        <li>
          Our server knows your phone number, because it verifies it and routes
          messages to it. It also sees the IP address you connect from and basic
          connection metadata.
        </li>
        <li>
          When the other person is offline, the server holds the encrypted
          message until their phone fetches it, and for no more than 7 days.
        </li>
        <li>
          There is no analytics, no tracking, no advertising and no
          third-party SDK, in the app or on this website.
        </li>
      </ul>

      <h2>What we process, and why</h2>

      <h3>Your phone number</h3>
      <p>
        To use hoppin you verify one phone number with a code sent by SMS. We
        store the number so that we can issue your identity certificate and
        route incoming messages to you. Verification codes are stored only as a
        salted hash, expire after ten minutes and are never written to our logs.
        Phone numbers appear in operational logs only in masked form (for
        example <code>+35191*****78</code>).
      </p>
      <p>
        <strong>Legal basis:</strong> performance of our agreement with you
        (Article 6(1)(b) GDPR).
      </p>

      <h3>Your public keys and identity certificate</h3>
      <p>
        Your device generates its own key pairs and sends us only the public
        halves. We sign a certificate binding your phone number to those public
        keys, and serve it to people who want to message you. Your private keys
        are generated on the device, kept in the iOS keychain and never
        transmitted to us or anyone else.
      </p>
      <p>
        <strong>Legal basis:</strong> performance of our agreement with you
        (Article 6(1)(b) GDPR).
      </p>

      <h3>IP address and connection metadata</h3>
      <p>
        When your device connects to our server we necessarily see the IP
        address it connects from. We use it to operate the service and to apply
        rate limits that keep the service available and resistant to abuse. We
        also see when a message is deposited or fetched, how large it is, and
        which number it is addressed to. We cannot see its content.
      </p>
      <p>
        <strong>Legal basis:</strong> our legitimate interest in operating a
        secure, available service (Article 6(1)(f) GDPR).
      </p>

      <h3>Encrypted messages awaiting delivery</h3>
      <p>
        If the person you are messaging is not reachable on your local network,
        the encrypted message is deposited with our relay. It is stored as
        ciphertext, deleted as soon as the recipient&rsquo;s device fetches and
        acknowledges it, and in any case after <strong>7 days</strong>. We
        cannot decrypt it at any point. Messages delivered directly between two
        devices on the same local network do not pass through our server at all.
      </p>
      <p>
        <strong>Legal basis:</strong> performance of our agreement with you
        (Article 6(1)(b) GDPR).
      </p>

      <h3>Reports of abuse</h3>
      <p>
        If you report a user, we receive the reported phone number, your phone
        number, the reason you select, and any message evidence you choose to
        attach to the report. Attaching evidence is your decision: when you do,
        the selected messages are sent to us in readable form so that we can act
        on the report. We use reports to investigate abuse and to suspend or
        terminate accounts.
      </p>
      <p>
        <strong>Legal basis:</strong> our legitimate interest, and that of other
        users, in preventing abuse and keeping the service safe (Article 6(1)(f)
        GDPR).
      </p>

      <h3>Crash reports</h3>
      <p>
        Once hoppin is distributed through the App Store, Apple may share
        aggregated crash and performance reports with us if you have enabled
        sharing in your iOS settings. These are provided by Apple, contain no
        message content, and are governed by Apple&rsquo;s own privacy terms.
      </p>

      <h2>What we do not collect</h2>
      <ul>
        <li>
          <strong>Message content.</strong> Text, photos and captions are
          encrypted on your device before they are sent. We only ever hold
          ciphertext.
        </li>
        <li>
          <strong>Your address book.</strong> Contacts you import stay on your
          device. We are never sent your contact list; the app only asks about a
          number when you actually want to message it.
        </li>
        <li>
          <strong>Your message history.</strong> Conversations live in the
          app&rsquo;s own storage on your iPhone, protected by iOS data
          protection and excluded from device backups.
        </li>
        <li>
          <strong>Analytics, tracking or advertising data.</strong> The app
          contains no analytics or tracking SDK and no advertising. This website
          contains no analytics, no cookies and no third-party scripts, and sets
          nothing in your browser.
        </li>
        <li>
          <strong>Location data, your name, your email address or payment
          details.</strong> hoppin never asks for them.
        </li>
      </ul>

      <h2>How long we keep things</h2>
      <ul>
        <li>
          <strong>Phone number, public keys and certificate:</strong> for as
          long as your account exists.
        </li>
        <li>
          <strong>Encrypted messages awaiting delivery:</strong> until fetched
          and acknowledged, and at most 7 days.
        </li>
        <li>
          <strong>Verification codes:</strong> 10 minutes, stored hashed.
        </li>
        <li>
          <strong>Operational logs containing IP addresses and masked phone
          numbers:</strong> <strong>[retention period, to be confirmed]</strong>
          , then deleted.
        </li>
        <li>
          <strong>Abuse reports:</strong> kept for as long as needed to
          investigate and to enforce against repeat abuse.
        </li>
      </ul>

      <h2>Who else is involved</h2>
      <p>
        We do not sell personal data and we do not share it for advertising. We
        use the following processors:
      </p>
      <ul>
        <li>
          <strong>SMS delivery</strong> uses an SMS provider (currently Twilio)
          receives your phone number and the verification code in order to
          deliver the message to you.
        </li>
        <li>
          <strong>Hosting</strong>: our server runs on infrastructure provided
          by <strong>[hosting provider]</strong>.
        </li>
      </ul>
      <p>
        We may also disclose information where we are legally required to do so.
        What we can disclose is limited by what we hold: we cannot produce the
        content of messages, because we never have it in readable form.
      </p>

      <h2>International transfers</h2>
      <p>
        Where a processor handles data outside the European Economic Area, that
        transfer relies on the European Commission&rsquo;s Standard Contractual
        Clauses or an adequacy decision.
      </p>

      <h2>Deleting your data</h2>
      <p>
        hoppin has a <strong>Delete Account</strong> option in Settings. Using
        it tells the server to delete your certificate, your queued messages and
        your registration, and wipes the keys and conversations stored on your
        device. Deleting the app alone removes everything stored locally, but
        does not remove your server-side registration. Use Delete Account
        first if you want both.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the GDPR you have the right to access the personal data we hold
        about you, to have it corrected or erased, to restrict or object to its
        processing, and to receive it in a portable form. To exercise any of
        these, contact us via the <Link href="/support">support page</Link>. We
        will respond within one month.
      </p>
      <p>
        If you believe we have handled your data improperly, you may complain to
        your local supervisory authority. In Portugal this is the Comissão
        Nacional de Proteção de Dados (CNPD).
      </p>

      <h2>Children</h2>
      <p>
        hoppin is not directed to children. You must be at least 13 years old
        to use it, and at least 16 if you are in the European Union, or the
        minimum age of digital consent in your country if that is higher. We do
        not knowingly collect data from children below that age; if we learn
        that we have, we delete the account.
      </p>

      <h2>Security</h2>
      <p>
        Messages are encrypted end to end with per-message ephemeral keys and
        signed, so a modified or unsigned message is rejected rather than shown.
        Connections to our server use TLS with certificate pinning. Keys,
        pinned contact keys and certificates are held in the iOS keychain, and
        conversation data on your device is protected by iOS data protection and
        excluded from backups. No system is perfect, but nothing we hold is
        readable to us.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy we will update the date at the top of this page
        and, for significant changes, notify you in the app.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy go to <strong>[contact email]</strong>, or
        through the <Link href="/support">support page</Link>.
      </p>
    </LegalShell>
  );
}
