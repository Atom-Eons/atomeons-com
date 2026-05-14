"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** ms to wait after intersect before showing — staggers nicely */
  delay?: number;
  className?: string;
};

/**
 * Wraps a section to fade-up when it enters the viewport.
 *
 * Default state is VISIBLE (opacity 1, no translate). The reveal
 * animation only fires if the element starts BELOW the viewport at
 * mount time AND the user has motion enabled. This means crawlers,
 * screenshot tools, JS-disabled visitors, and reduced-motion users
 * all see the content immediately. Animation is enhancement, not gate.
 */
export function ScrollReveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Default: shown immediately. Animation will only run if we explicitly
  // detect below-fold + motion-allowed at mount and toggle to "hidden first".
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const belowFold = rect.top > window.innerHeight;
    if (!belowFold) return; // already in/above viewport — leave shown:true
    setShouldAnimate(true);
    setShown(false);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const t = setTimeout(() => setShown(true), delay);
            obs.disconnect();
            return () => clearTimeout(t);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(16px)",
        transition: shouldAnimate
          ? "opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)"
          : "none",
      }}
    >
      {children}
    </div>
  );
}
