import { CONTACT_EMAIL } from "../site";

/**
 * The support address as a mailto link, or an unmistakable placeholder while
 * no mailbox exists. A placeholder is better than an address that bounces:
 * it can't be mistaken for a working one.
 */
export default function ContactEmail() {
  if (!CONTACT_EMAIL) {
    return <strong>[contact email]</strong>;
  }
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium">
      {CONTACT_EMAIL}
    </a>
  );
}
