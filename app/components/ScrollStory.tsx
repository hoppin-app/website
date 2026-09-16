"use client";

import { useCallback, useEffect, useRef } from "react";

/* ==========================================================================
   Scroll-driven story

   Same mechanic as an Apple product page: a tall spacer holds a stage pinned
   to the viewport, and scroll position inside that spacer drives the frame.
   Instead of scrubbing a sequence of rendered images, this scrubs the real
   product UI — the devices are the same HTML the hero uses, so the "frames"
   stay sharp at any size and cost nothing to download.

   JS writes plain numbers into CSS custom properties; every transform below
   is expressed in CSS as calc() against them. No animation library.
   ========================================================================== */

const STEPS = [
  {
    title: "It starts with your number.",
    body: "One SMS code, and the server signs a certificate for the keys your phone generated. No password, no email, no profile.",
  },
  {
    title: "Your phone seals the message.",
    body: "Encrypted on the device to your contact's pinned keys, with a fresh ephemeral key for every message. Nothing leaves in the clear.",
  },
  {
    title: "On your network, it goes straight across.",
    body: "Same Wi-Fi, one direct connection, phone to phone. Nothing in between sees it at all.",
  },
  {
    title: "Otherwise it waits, sealed, at the relay.",
    body: "If they are offline, a small relay holds the sealed envelope for up to seven days. It can pass it on, but it never gets a key to open it.",
  },
];

/** Normalised progress of `p` across the range [a, b]. */
const seg = (p: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (p - a) / (b - a)));

export default function ScrollStory() {
  const spacerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const render = useCallback(() => {
    frameRef.current = null;
    const spacer = spacerRef.current;
    const stage = stageRef.current;
    if (!spacer || !stage) return;

    const rect = spacer.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    const p = travel <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / travel));

    const set = (name: string, value: number) =>
      stage.style.setProperty(name, value.toFixed(4));

    set("--p", p);
    set("--sep", seg(p, 0.03, 0.28));
    set("--draw", seg(p, 0.26, 0.48));
    set("--sent", seg(p, 0.4, 0.5));
    set("--packet", seg(p, 0.5, 0.72));
    set("--landed", seg(p, 0.7, 0.78));
    set("--server", seg(p, 0.8, 0.9));
    set("--strike", seg(p, 0.9, 1));

    const step = p < 0.26 ? 0 : p < 0.5 ? 1 : p < 0.78 ? 2 : 3;
    if (stage.dataset.step !== String(step)) stage.dataset.step = String(step);
  }, []);

  const onScroll = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(render);
  }, [render]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const start = () => {
      if (reduced.matches) {
        // No pinning: the stage renders its finished state as a static image.
        const stage = stageRef.current;
        if (stage) {
          stage.dataset.step = "3";
          (["--p", "--sep", "--draw", "--sent", "--packet", "--landed", "--server", "--strike"] as const).forEach(
            (n) => stage.style.setProperty(n, "1"),
          );
        }
        return;
      }
      render();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    };

    start();
    reduced.addEventListener("change", start);

    return () => {
      reduced.removeEventListener("change", start);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [render, onScroll]);

  return (
    <div ref={spacerRef} className="story-spacer relative mt-14">
      <div ref={stageRef} className="story-stage" data-step="0">
        <div className="story-devices-wrap">
          <div className="story-devices">
            <ConnectionLayer />
            <Device side="left" />
            <Device side="right" />
            <ServerBlock />
          </div>
        </div>

        <div className="story-captions">
          {STEPS.map((step, i) => (
            <div key={step.title} className="story-caption" data-index={i}>
              <h3 className="text-[22px] font-semibold tracking-[-0.025em] sm:text-[28px]">
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[30rem] text-[15px] leading-relaxed text-muted sm:text-[16px]">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <ol className="story-rail" aria-hidden="true">
          {STEPS.map((step, i) => (
            <li key={step.title} data-index={i} />
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ==========================================================================
   Stage pieces
   ========================================================================== */

const ARC = "M 232 196 Q 360 120 488 196";

function ConnectionLayer() {
  return (
    <svg
      className="story-arc"
      viewBox="0 0 720 420"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={ARC}
        pathLength={1}
        className="story-arc__path"
        stroke="var(--accent)"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <text
        x={360}
        y={100}
        textAnchor="middle"
        className="story-arc__label"
        fill="var(--accent)"
        fontSize={13}
        fontWeight={600}
      >
        end-to-end encrypted
      </text>
      <circle r={7} className="story-packet" fill="var(--accent)" />
    </svg>
  );
}

function Device({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div className={`story-device story-device--${side}`}>
      <div className="story-device__screen">
        <div className="story-device__bar">
          <span className="story-device__dot" />
          {isLeft ? "You" : "Ana"}
        </div>

        <div className="story-device__body">
          {isLeft ? (
            <>
              <span className="story-device__number">+351 ••• ••• •••</span>
              <div className="story-bubble story-bubble--me">
                Ninguém pelo caminho consegue ler isto.
              </div>
            </>
          ) : (
            <div className="story-bubble story-bubble--them story-bubble--lands">
              Ninguém pelo caminho consegue ler isto.
            </div>
          )}
        </div>

        <div className="story-device__composer">
          <span />
          <i />
        </div>
      </div>
    </div>
  );
}

function ServerBlock() {
  return (
    <div className="story-server" aria-hidden="true">
      <div className="story-server__box">
        <span />
        <span />
      </div>
      <p className="story-server__label">Relay · holds it sealed</p>
      <div className="story-server__seal">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4.5" y="10.5" width="15" height="10" rx="3" />
          <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
        </svg>
      </div>
    </div>
  );
}
