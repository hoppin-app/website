import type { Metadata } from "next";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import ScrollVideo, { type ScrollVideoCaption } from "../components/ScrollVideo";

/* Scroll-scrubbed demo with real footage (public/scroll-ride: 181 frames
   from a 6 s portrait clip). Not linked from the site. */

export const metadata: Metadata = {
  title: "Scroll ride demo · hoppin",
  robots: { index: false, follow: false },
};

const captions: ScrollVideoCaption[] = [
  { at: 0.05, title: "Out on the road.", body: "No Wi-Fi for miles. Just mobile data and whatever signal the hills allow." },
  { at: 0.33, title: "Your message still leaves.", body: "Sealed on your iPhone before it goes anywhere." },
  { at: 0.62, title: "The relay holds it.", body: "Encrypted, for up to seven days. It can pass it on, never open it." },
  { at: 0.93, title: "Home before you are.", body: "Waiting on their phone when the ride's over." },
];

export default function ScrollRidePage() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <section className="px-6 pt-40 pb-24 text-center">
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">Demo</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">Scroll to ride.</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            A real 6-second clip, 181 frames. Your scroll is the playhead: scroll back up and the
            ride rewinds.
          </p>
          <p className="mt-10 animate-bounce text-2xl text-muted" aria-hidden="true">↓</p>
        </section>

        <ScrollVideo
          frameCount={181}
          basePath="/scroll-ride"
          captions={captions}
          pxPerFrame={22}
          fit="contain"
          posterFrame={90}
          label="First-person video of a road bike ride that plays as you scroll"
        />

        <section className="px-6 py-32 text-center">
          <h2 className="text-4xl font-bold tracking-tight">Signal or not, it gets there.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            On the same Wi-Fi, hoppin goes phone to phone. Everywhere else, the relay carries a
            sealed envelope it can&rsquo;t read.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
