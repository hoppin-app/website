import type { Metadata } from "next";
import Link from "next/link";
import LegalShell from "../components/LegalShell";
import ContactEmail from "../components/ContactEmail";

export const metadata: Metadata = {
  title: "Support · hoppin",
  description:
    "Help with hoppin: verification, messages without internet, safety numbers, blocking and reporting, your account, and how to reach us.",
  openGraph: {
    title: "Support · hoppin",
    description:
      "Help with hoppin: verification, messages without internet, safety numbers, blocking and reporting, your account, and how to reach us.",
    url: "/support",
    siteName: "hoppin",
    type: "website",
  },
};

export default function SupportPage() {
  return (
    <LegalShell
      title="Support"
      intro="Answers to what people ask most, and how to reach a person when they aren't enough."
      showUpdated={false}
    >
      <h2>Contact us</h2>
      <p>
        Write to <ContactEmail />. Tell us your iOS version and what you were
        doing when it went wrong. Please don&rsquo;t send message content, and
        never send a password or code from any service. We usually reply
        within a few working days.
      </p>

      <div className="legal-note">
        <p>
          <strong>Reporting abuse?</strong>{" "}Use <strong>Report</strong>{" "}in the
          app, on the person&rsquo;s profile. Reports reach us with the account
          and your reason, plus any messages you choose to attach, and we act on
          them within 24 hours. If someone is in immediate danger, call your
          local emergency number first.
        </p>
      </div>

      <h2>What you need</h2>
      <ul>
        <li>An iPhone with iOS 18 or later.</li>
        <li>A phone number that can receive one SMS, to verify it.</li>
      </ul>

      <h2>Getting started</h2>

      <h3>My verification code didn&rsquo;t arrive</h3>
      <p>
        Codes come by SMS from <strong>hoppin</strong>{" "}and work for ten
        minutes. Check the number, including the country code, check you have
        signal, and look in your filtered messages. If you&rsquo;ve asked for
        several codes in a row, wait up to an hour before asking again.
      </p>

      <h3>hoppin asks me to verify my number again</h3>
      <p>
        That happens if your number was verified on another phone, if you
        haven&rsquo;t opened hoppin for over a month, or if your registration
        was reset on our side. Verify again with the same number.
        Your conversations and keys stay on your phone, and your contacts
        won&rsquo;t see a security warning, because your keys haven&rsquo;t
        changed.
      </p>

      <h3>Why does hoppin ask for Bluetooth, Local Network and Camera?</h3>
      <ul>
        <li>
          <strong>Bluetooth</strong>{" "}passes messages between nearby phones when
          there&rsquo;s no internet.
        </li>
        <li>
          <strong>Local Network</strong>{" "}finds people on the same Wi-Fi, so
          messages can go straight between the two phones.
        </li>
        <li>
          <strong>Camera</strong>{" "}scans a contact&rsquo;s code to check their
          safety number, and takes photos to send.
        </li>
      </ul>
      <p>
        hoppin still works without any of them, through our relay. You can
        change each one in the iOS Settings app, under hoppin.
      </p>

      <h2>Sending messages</h2>

      <h3>How does a message get to the other person?</h3>
      <p>
        hoppin tries the most direct way first. On the same Wi-Fi, it goes
        straight from your phone to theirs. Across the internet, it goes
        directly when the two phones can reach each other. With no internet at
        all, a text can travel over Bluetooth. When none of that works, it
        waits on our relay, encrypted, until their phone collects it, for up to
        7 days. The <Link href="/privacy">privacy policy</Link>{" "}says exactly
        what the relay can and can&rsquo;t see.
      </p>

      <h3>Can I send messages without internet?</h3>
      <p>
        Texts, yes, as long as <strong>Settings › Bluetooth mesh</strong>{" "}is on
        and other hoppin phones are near enough. A message can hop from phone
        to phone until it reaches the person it&rsquo;s for. The phones in
        between can&rsquo;t read it or tell who it&rsquo;s for.
      </p>

      <h3>My photo says &ldquo;Waiting for Wi-Fi or mobile data&rdquo;</h3>
      <p>
        Photos are too big for Bluetooth, so they wait until your phone is back
        online and then send on their own. Texts keep going over Bluetooth in
        the meantime.
      </p>

      <h3>What do the connection messages mean?</h3>
      <ul>
        <li>
          <strong>You&rsquo;re offline:</strong>{" "}your phone has no internet.
          Texts can still go over Bluetooth to people nearby.
        </li>
        <li>
          <strong>hoppin&rsquo;s server isn&rsquo;t answering:</strong>{" "}the
          problem is on our side. Your messages wait on your phone and go out
          once it&rsquo;s back.
        </li>
        <li>
          <strong>Couldn&rsquo;t confirm this is hoppin&rsquo;s server:</strong>{" "}
          something on this network is getting in the way, often hotel or
          public Wi-Fi with a sign-in page. Sign in to that network or switch to
          mobile data. hoppin refuses to talk to a server it can&rsquo;t verify.
        </li>
      </ul>

      <h3>Notifications are late or missing</h3>
      <p>
        Check that notifications are allowed for hoppin in the iOS Settings app
        and switched on in <strong>Settings › Notifications</strong>{" "}in hoppin.
        Focus modes and Low Power Mode can hold them back.
      </p>

      <h2>Safety</h2>

      <h3>What is a safety number?</h3>
      <p>
        Every conversation has a 60-digit safety number made from both
        people&rsquo;s keys. Open the person&rsquo;s profile and compare it with
        theirs, reading it out or scanning the code on their phone. If it
        matches, nobody is sitting between you. <strong>Mark as Verified</strong>{" "}
        records that you checked.
      </p>

      <h3>hoppin says a contact&rsquo;s security code changed</h3>
      <p>
        That happens when someone reinstalls hoppin or moves to a new phone. It
        is also exactly what someone pretending to be them would look like, so
        hoppin stops sending until you&rsquo;ve looked. Check with the person
        some other way you trust, or compare safety numbers again, before you
        carry on.
      </p>

      <h3>How do I block or report someone?</h3>
      <p>
        Open their profile by tapping their name at the top of the chat, then
        choose <strong>Block</strong>{" "}or <strong>Report</strong>. You can also
        block someone by swiping left on the chat in your list. Blocked people
        can&rsquo;t reach you. A report sends us the account and your reason,
        and only the messages you choose to attach.
      </p>

      <h2>Your account</h2>

      <h3>How do I lock the app?</h3>
      <p>
        <strong>Settings › Privacy &amp; Security</strong>, then turn on{" "}
        <strong>Require Face ID</strong> (or Touch ID, or your passcode) and
        pick how soon it locks.
      </p>

      <h3>What does the relay know about me?</h3>
      <p>
        <strong>Settings › Privacy &amp; Security › Your data on the relay</strong>{" "}
        lists everything our server holds about your account, read from your
        phone.
      </p>

      <h3>How do I change my number?</h3>
      <p>
        <strong>Settings › Account › Change phone number</strong>{" "}verifies the
        new number and moves your account to it. Your conversations stay on
        your phone, and your contacts are told about the new number.
      </p>

      <h3>How do I delete my account?</h3>
      <p>
        <strong>Settings › Account › Delete account</strong>{" "}removes your
        registration and anything waiting for you from our server, and erases
        your keys and conversations from your phone. It can&rsquo;t be undone,
        and we keep no copy to restore from.
      </p>

      <h3>Can I move my messages to a new phone?</h3>
      <p>
        No. Conversations live only on the phone they were written on, and are
        left out of iCloud and computer backups on purpose, so there&rsquo;s
        nothing to restore. It&rsquo;s the price of nobody else ever holding a
        copy.
      </p>

      <h2>Also useful</h2>
      <ul>
        <li>
          <Link href="/privacy">Privacy policy</Link>: what is processed, for
          how long, and how to have it deleted.
        </li>
        <li>
          <Link href="/terms">Terms of service</Link>: the rules, and our zero
          tolerance for abuse.
        </li>
      </ul>
    </LegalShell>
  );
}
