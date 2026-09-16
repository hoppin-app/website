"use client";

import { useCallback, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger delay in ms — keep list items 30–50ms apart. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Fades content up once as it enters the viewport.
 *
 * The hidden state is applied imperatively on mount rather than rendered, so
 * the server HTML is fully visible: if JavaScript never runs, the page still
 * reads normally instead of staying blank.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const attach = useCallback((node: HTMLElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;

    if (!node || typeof IntersectionObserver === "undefined") return;

    // Arm the animation only once we know scripting works. Suppressing the
    // transition for this frame stops the element from fading *out* first —
    // ref callbacks run in the commit phase, so nothing is painted visible.
    node.style.transition = "none";
    node.dataset.visible = "false";
    void node.offsetHeight;
    node.style.transition = "";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-visible", "true");
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    observerRef.current = observer;
  }, []);

  return (
    <Tag
      ref={attach}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
