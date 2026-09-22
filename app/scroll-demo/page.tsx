import type { Metadata } from "next";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import ScrollVideo, { type ScrollVideoCaption } from "../components/ScrollVideo";

/* Demo of the scroll-scrubbed video technique, using a generated clip
   (public/scroll-demo: lava backdrop + a message hopping between nodes). Not linked from the site; swap the frames for
   real footage before using it on the landing page. */

export const metadata: Metadata = {
  title: "Scroll video demo — hoppin",
  robots: { index: false, follow: false },
};

const captions: ScrollVideoCaption[] = [
  { at: 0.06, title: "One message.", body: "Written on your iPhone, sealed before it moves." },
  { at: 0.36, title: "Hop by hop.", body: "Straight across your Wi-Fi, or through a relay that can't read it." },
  { at: 0.66, title: "Nobody in between can look inside.", body: "Fresh keys for every message. Certificates pinned on first contact." },
  { at: 0.96, title: "Delivered. Only they can open it." },
];

export default function ScrollDemoPage() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <section className="px-6 pt-40 pb-24 text-center">
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">Demo</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">Scroll to play.</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            180 frames extracted from a 6-second clip. Your scroll position is the playhead —
            scroll back up and it plays in reverse.
          </p>
          <p className="mt-10 animate-bounce text-2xl text-muted" aria-hidden="true">↓</p>
        </section>

        <ScrollVideo
          frameCount={180}
          basePath="/scroll-demo"
          captions={captions}
          pxPerFrame={16}
          label="A glowing message hops between four points over a moving colour background as you scroll"
        />

        <section className="px-6 py-32 text-center">
          <h2 className="text-4xl font-bold tracking-tight">That&rsquo;s the effect.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Swap the frames for your own footage — a phone turning, a message flying — and it drops
            into the landing page as-is.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
