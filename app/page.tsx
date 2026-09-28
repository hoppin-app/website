import Image from "next/image";
import { AppleLogoIcon } from "@phosphor-icons/react/ssr";
import Journey from "./components/Journey";
import Timeline, { type Chapter } from "./components/Timeline";
import {
  FeaturesChapter,
  KeysChapter,
  SecurityChapter,
  TransparencyChapter,
} from "./components/Chapters";
import Reveal from "./components/Reveal";
import SiteFooter from "./components/SiteFooter";

/* The page is one story told in chapters, each pinned while it plays. The
   timeline on the right is the navigation: one dot per chapter, in order. */
const CHAPTERS: Chapter[] = [
  { id: "journey", label: "How it travels" },
  { id: "features", label: "Features" },
  { id: "keys", label: "Keys" },
  { id: "transparency", label: "Transparency" },
  { id: "security", label: "Security" },
  { id: "download", label: "Get hoppin" },
];

export default function Home() {
  return (
    <>
      <Timeline chapters={CHAPTERS} />

      {/* Without JavaScript nothing drives the chapters: collapse each to its
          first stage instead of leaving tall empty tracks. */}
      <noscript>
        <style>{`[data-scene-track]{height:auto!important}[data-scene-track]>div{position:relative!important}`}</style>
      </noscript>

      {/* Room on the right for the timeline, so it never sits on the story. */}
      <main id="main" className="flex-1 lg:pr-12 xl:pr-40">
        <div id="journey">
          <Journey />
        </div>

        <FeaturesChapter />
        <KeysChapter />
        <TransparencyChapter />
        <SecurityChapter />

        <section
          id="download"
          aria-labelledby="download-title"
          className="px-5 py-32 text-center sm:px-8 sm:py-44"
        >
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center">
            <Image
              src="/app-icon-384.webp"
              alt="The hoppin app icon"
              width={112}
              height={112}
              className="h-24 w-24 rounded-[26px] shadow-[var(--shadow-phone)] sm:h-28 sm:w-28 sm:rounded-[30px]"
            />
            <h2 id="download-title" className="t-title mt-10 text-balance">
              Say something only they can read.
            </h2>
            <p className="t-lead mx-auto mt-5 max-w-[40ch] text-balance">
              Free, with no ads and no tracking. For iPhone, on iOS 18 or later.
            </p>

            <span role="link" aria-disabled="true" className="btn btn-ink mt-10">
              <AppleLogoIcon weight="fill" className="h-[18px] w-[18px]" />
              Coming soon to the App Store
            </span>
          </Reveal>
        </section>
      </main>

      <div className="lg:pr-12 xl:pr-40">
        <SiteFooter />
      </div>
    </>
  );
}
