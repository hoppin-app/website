import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "../components/LegalShell";
import ContactEmail from "../components/ContactEmail";
import { OPERATOR, OPERATOR_COUNTRY } from "../site";

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
        hoppin (&ldquo;the app&rdquo;) is made by <strong>{OPERATOR}</strong>, an
        individual developer based in {OPERATOR_COUNTRY}{" "}(&ldquo;we&rdquo;,
        &ldquo;us&rdquo;). Under the EU General Data Protection Regulation
        (GDPR), we are the controller of the personal data described below.
        Write to <ContactEmail />{" "}about anything on this page.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>
          Your messages and photos are end-to-end encrypted on your phone. We
          cannot read them, and we never receive a key that could.
        </li>
        <li>
          Your conversations are stored on your phone only, and are left out of
          iCloud and computer backups.
        </li>
        <li>
          Our server knows your phone number, because it verifies it and
          delivers messages to it. It sees the network address you connect
          from, but doesn&rsquo;t store it.
        </li>
        <li>
          Many messages never reach our server: on the same Wi-Fi, directly
          across the internet, or over Bluetooth between nearby phones. When a
          message does wait on our server, it waits as ciphertext, for at most
          7 days.
        </li>
        <li>
          No analytics, no tracking, no advertising and no third-party code, in
          the app or on this website.
        </li>
      </ul>

      <h2>What we process, and why</h2>

      <h3>Your phone number</h3>
      <p>
        To use hoppin you verify one phone number with a code sent by SMS. We
        keep the number so we can issue your identity certificate and deliver
        messages to you. Verification codes are stored only as a salted hash,
        expire after ten minutes and never appear in our logs. Phone numbers
        appear in our logs only masked, for example{" "}
        <code>+35191*****78</code>.
      </p>
      <p>
        <strong>Legal basis:</strong>{" "}performing our agreement with you
        (Article 6(1)(b) GDPR).
      </p>

      <h3>Your public keys and identity certificate</h3>
      <p>
        Your phone makes its own keys and sends us only the public halves. We
        sign a certificate that ties your number to those public keys, and hand
        it to people who want to message you. Your private keys are made on the
        phone, kept in the iOS Keychain, and never sent to us or anyone else.
      </p>
      <p>
        <strong>Legal basis:</strong>{" "}performing our agreement with you
        (Article 6(1)(b) GDPR).
      </p>

      <h3>Network address and connection details</h3>
      <p>
        When your phone connects to our server, we necessarily see its IP
        address. We hold it in memory to apply rate limits that keep the
        service up and hard to abuse. It is not written to our logs or kept.
      </p>
      <p>
        We also see when a message is deposited or collected, how large it is
        and which number it is for, but never what it says.
      </p>
      <p>
        <strong>Legal basis:</strong>{" "}our legitimate interest in running a
        secure, available service (Article 6(1)(f) GDPR).
      </p>

      <h3>Messages waiting for delivery</h3>
      <p>
        When hoppin can&rsquo;t reach the other phone any other way, the
        encrypted message waits on our relay. It is stored as ciphertext and
        deleted as soon as the other phone collects it, or after{" "}
        <strong>7 days</strong>{" "}at the latest. We cannot decrypt it at any
        point.
      </p>
      <p>
        <strong>Legal basis:</strong>{" "}performing our agreement with you
        (Article 6(1)(b) GDPR).
      </p>

      <h3>Direct delivery across the internet</h3>
      <p>
        When both phones can reach each other directly, hoppin sends the message
        straight from one to the other instead of through our relay. To make
        that possible, your phone tells the people you message how to reach it:
        its network address, which roughly reveals your city and internet
        provider. That address travels inside your encrypted messages, so only
        your contacts learn it, and our server never sees it. It&rsquo;s on by
        default. Turn it off in{" "}
        <strong>Settings › Privacy &amp; Security › Direct delivery</strong>{" "}to
        send everything through the relay instead.
      </p>

      <h3>Bluetooth, with no internet</h3>
      <p>
        When your phone has no internet connection and the Bluetooth mesh is on,
        text messages can be passed between nearby hoppin phones until one
        reaches the person they&rsquo;re for. What those phones carry is sealed:
        it has no sender and no recipient written on it, and they can&rsquo;t
        read it. Your phone may carry sealed messages for other people in the
        same way. Nothing is carried for more than 24 hours, and none of this
        involves our server. Photos never travel this way. Turn it off in{" "}
        <strong>Settings › Bluetooth mesh</strong>.
      </p>

      <h3>Notifications</h3>
      <p>
        If you allow notifications, iOS gives your phone a push token, and your
        phone gives it to our server so we can ask Apple to wake it when a
        message arrives. The notification we send says only that something
        arrived. It contains no sender, no text and nothing about the message.
        Your phone fills in the details itself after decrypting. To know when
        to send one, our server relies on a flag the sender&rsquo;s phone
        adds: a message or a photo asks for a notification, while a receipt, a
        profile update or a group change doesn&rsquo;t. So our server can tell
        those apart, though it can&rsquo;t read any of them. Turning
        notifications off in hoppin deletes the token from our server.
      </p>
      <p>
        <strong>Legal basis:</strong>{" "}performing our agreement with you
        (Article 6(1)(b) GDPR).
      </p>

      <h3>Reports of abuse</h3>
      <p>
        If you report someone, we receive their phone number, your phone number,
        the reason you give, and any messages you choose to attach (up to 20).
        Attaching messages is your choice. When you do, those messages reach us
        in readable form so that we can act on the report. We use reports to
        investigate abuse and to suspend or close accounts.
      </p>
      <p>
        <strong>Legal basis:</strong>{" "}our legitimate interest, and that of other
        users, in preventing abuse and keeping hoppin safe (Article 6(1)(f)
        GDPR).
      </p>

      <h3>Crash reports</h3>
      <p>
        If you have turned on sharing with app developers in iOS Settings, Apple
        may pass us anonymous crash and performance reports. They contain no
        message content and are covered by Apple&rsquo;s own privacy terms.
      </p>

      <h2>What we don&rsquo;t collect</h2>
      <ul>
        <li>
          <strong>Message content.</strong>{" "}Text and photos are encrypted on
          your phone before they leave it. We only ever hold ciphertext.
        </li>
        <li>
          <strong>Your contacts.</strong>{" "}Your address book is never uploaded.
          The app only asks our server about a number when you actually want to
          message it.
        </li>
        <li>
          <strong>Your message history.</strong>{" "}Conversations live in the
          app&rsquo;s own storage on your iPhone, protected by iOS data
          protection and left out of backups.
        </li>
        <li>
          <strong>Your profile.</strong>{" "}Your name and photo go only to the
          people you talk to, inside encrypted messages.
        </li>
        <li>
          <strong>Analytics, tracking or advertising data.</strong>{" "}Neither the
          app nor this website contains analytics, trackers, ads or third-party
          scripts. This website sets no cookies.
        </li>
        <li>
          <strong>Your location, email address or payment details.</strong>{" "}
          hoppin never asks for them.
        </li>
      </ul>

      <h2>How long we keep things</h2>
      <ul>
        <li>
          <strong>Phone number, public keys and certificate:</strong>{" "}for as
          long as your account exists.
        </li>
        <li>
          <strong>Messages waiting for delivery:</strong>{" "}until collected, and
          at most 7 days.
        </li>
        <li>
          <strong>Verification codes:</strong> 10 minutes, stored hashed.
        </li>
        <li>
          <strong>Push token:</strong>{" "}until you turn notifications off, delete
          your account, or Apple tells us the app is no longer installed.
        </li>
        <li>
          <strong>Server logs</strong> (masked phone numbers, no IP addresses):
          30 days.
        </li>
        <li>
          <strong>Abuse reports:</strong>{" "}as long as needed to investigate and
          to act against repeat abuse.
        </li>
      </ul>

      <h2>Who else is involved</h2>
      <p>
        We don&rsquo;t sell personal data and we don&rsquo;t share it for
        advertising. These companies process data for us:
      </p>
      <ul>
        <li>
          <strong>Twilio</strong>{" "}sends the SMS verification code, so it
          receives your phone number and the code. It keeps its own delivery
          records under its own terms.
        </li>
        <li>
          <strong>Microsoft Azure</strong>{" "}hosts our server, in its France
          Central region (Paris).
        </li>
        <li>
          <strong>Apple</strong>{" "}delivers push notifications, and receives the
          push token and the contentless notification described above.
        </li>
      </ul>
      <p>
        We may also disclose information when the law requires it. What we can
        disclose is limited to what we hold. We cannot hand over the content of
        messages, because we never have it in readable form.
      </p>

      <h2>International transfers</h2>
      <p>
        Our server is in the European Union. Twilio and Apple may process data
        in the United States. Those transfers rely on the EU-US Data Privacy
        Framework or the European Commission&rsquo;s Standard Contractual
        Clauses.
      </p>

      <h2>Deleting your data</h2>
      <p>
        <strong>Settings › Account › Delete account</strong>{" "}deletes your
        certificate, your registration, your push token and any messages
        waiting for you from our server, and erases your keys and conversations
        from your phone. It cannot be undone.
      </p>
      <p>
        Deleting the app alone erases your conversations, but not your
        registration on our server, and iOS keeps the app&rsquo;s keys in the
        Keychain in case you reinstall. Use Delete account first if you want
        everything gone.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the GDPR you can ask for a copy of the personal data we hold about
        you, have it corrected or erased, restrict or object to how we use it,
        and receive it in a portable form. Write to <ContactEmail />{" "}and
        we&rsquo;ll answer within one month.
      </p>
      <p>
        If you think we&rsquo;ve mishandled your data, you can complain to your
        local data protection authority. In Portugal that is the Comissão
        Nacional de Proteção de Dados (CNPD).
      </p>

      <h2>Children</h2>
      <p>
        hoppin isn&rsquo;t made for children. You must be at least 13 to use
        it, and at least 16 in the European Union, or the age of digital
        consent in your country if that is higher. If we learn that an account
        belongs to someone younger, we delete it.
      </p>

      <h2>Security</h2>
      <p>
        Every message is encrypted with keys used for that message only, and
        signed, so a changed or unsigned message is rejected rather than shown.
        Connections to our server use TLS, pinned to our own certificate. Keys
        and certificates live in the iOS Keychain, and conversations on your
        phone are protected by iOS data protection. No system is perfect, but
        nothing we hold would let us read your messages.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        When this policy changes, the date at the top of this page changes with
        it. For significant changes we&rsquo;ll also tell you in the app.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy go to <ContactEmail />, or see the{" "}
        <Link href="/support">support page</Link>.
      </p>
    </LegalShell>
  );
}
