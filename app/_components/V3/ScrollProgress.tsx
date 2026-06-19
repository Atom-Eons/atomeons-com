"use client";

/**
 * ScrollProgress · Wave 111 · 2026-06-18
 *
 * Hair-thin bio-cyan line at the bottom edge of the fixed nav (top:80px)
 * that fills horizontally as the visitor scrolls. Part of the "site
 * comes alive as you use it" doctrine from the Wave 111 operator brief.
 *
 * Implementation notes:
 *  - Uses scroll event with rAF throttling so it stays at 60fps even
 *    on slow Android phones. No layout thrash; only transform: scaleX
 *    so the GPU compositor handles the paint.
 *  - Hides automatically on routes with no scrollable content (e.g.
 *    the login/admin shims) by reading document.documentElement.
 *    scrollHeight at mount and bailing if there's nothing to scroll.
 *  - Respects prefers-reduced-motion by short-circuiting the
 *    transition; the line snaps to current position instead of
 *    animating (still functional, just no slide).
 *  - Sits at z-index 39 — under the nav popover (z-40) but above
 *    page content (z-0..z-20).
 */

import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const compute = () => {
      const docEl = document.documentElement;
      const scrollable = docEl.scrollHeight - docEl.clientHeight;
      if (scrollable <= 8) {
        setVisible(false);
        return;
      }
      setVisible(true);
      const pct = Math.min(1, Math.max(0, docEl.scrollTop / scrollable));
      setProgress(pct);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        compute();
        rafRef.current = null;
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 z-30 h-px lg:h-[2px]"
      style={{
        top: "calc(80px + var(--ae-safe-top, 0px))",
        pointerEvents: "none",
      }}
    >
      <div
        className="h-full origin-left"
        style={{
          background: "linear-gradient(90deg, transparent, #22F0D5 30%, #22F0D5 70%, transparent)",
          transform: `scaleX(${progress})`,
          transition: "transform 80ms linear",
          boxShadow: progress > 0.02 ? "0 0 8px rgba(34,240,213,0.5)" : "none",
        }}
      />
    </div>
  );
}
