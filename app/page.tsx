import Journey from "./components/Journey";
import Nav from "./components/Nav";
import Timeline, { type Chapter } from "./components/Timeline";
import { FeaturesChapter } from "./components/FeaturesGrid";
import { KeysChapter } from "./components/KeysChapter";
import { TransparencyChapter } from "./components/Chapters";
import { SecurityChapter } from "./components/SecurityChapter";
import LavaTrail from "./components/LavaTrail";
import SiteFooter from "./components/SiteFooter";

/* The page is one story told in chapters. The journey and transparency are
   pinned while they play; features, keys and security simply scroll, the last
   two with something to try. The top bar only carries the name, the theme and
   the way to get the app; the timeline on the right is the chapter
   navigation, one dot per chapter. The story ends on Security, and the footer
   waits underneath it. */
const CHAPTERS: Chapter[] = [
  { id: "journey", label: "How it travels" },
  { id: "features", label: "Features" },
  { id: "keys", label: "Keys" },
  { id: "transparency", label: "Transparency" },
  { id: "security", label: "Security" },
];

export default function Home() {
  return (
    <>
      <Nav />
      <Timeline chapters={CHAPTERS} />

      {/* Without JavaScript nothing drives the chapters: collapse each to its
          first stage instead of leaving tall empty tracks. */}
      <noscript>
        <style>{`[data-scene-track]{height:auto!important}[data-scene-track]>div{position:relative!important}`}</style>
      </noscript>

      {/* Opaque and above the footer, so the last chapter scrolls away and
          uncovers it. The clip keeps the fixed lava canvas inside main, so it
          never paints over the footer as that comes into view. */}
      <main id="main" className="relative z-10 flex-1 bg-background [clip-path:inset(0)]">
        <LavaTrail />

        <div id="journey">
          <Journey />
        </div>

        <FeaturesChapter />
        <KeysChapter />
        <TransparencyChapter />
        <SecurityChapter />
      </main>

      <div className="footer-reveal">
        <SiteFooter />
      </div>
    </>
  );
}
