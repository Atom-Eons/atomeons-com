"use client";

/**
 * ReadingTime · Wave 118 · 2026-06-18
 *
 * "ALIVE AS YOU USE IT" mechanic #2 from the Wave 111 Track B
 * aliveness designer pass.
 *
 * Counts words in the nearest <article> on mount (falls back to
 * <main>). Computes:
 *   - total reading time at 240 words/minute (industry average for
 *     web prose, slightly faster than print's 220)
 *   - current scroll percentage
 *   - estimated remaining seconds
 *
 * Renders a small pill at top-right of the page, fixed beneath the
 * nav chrome. Hides on routes < 600 words to avoid noise. Updates
 * scroll percentage via rAF-throttled scroll listener.
 *
 * Accessibility: aria-live="polite" so screen readers receive
 * incremental updates. prefers-reduced-motion still allowed — this
 * component shows status, not animation.
 */

import { useEffect, useRef, useState } from "react";

const WORDS_PER_MINUTE = 240;
const MIN_WORDS_TO_SHOW = 600;

export function ReadingTime() {
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const wordCountRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Find the long-form root. <article> wins; fall back to <main>.
    const article = document.querySelector("article") ?? document.querySelector("main");
    if (!article) return;

    const text = article.textContent ?? "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    if (words < MIN_WORDS_TO_SHOW) return;

    wordCountRef.current = words;
    setTotalMinutes(Math.max(1, Math.round(words / WORDS_PER_MINUTE)));
    setVisible(true);

    const compute = () => {
      const docEl = document.documentElement;
      const scrollable = docEl.scrollHeight - docEl.clientHeight;
      if (scrollable <= 0) {
        setPercent(0);
        return;
      }
      const p = Math.min(1, Math.max(0, docEl.scrollTop / scrollable));
      setPercent(p);
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

  const remainingSeconds = Math.max(0, Math.round(
    (wordCountRef.current * (1 - percent)) / WORDS_PER_MINUTE * 60
  ));
  const remainingMin = Math.floor(remainingSeconds / 60);
  const remainingSec = remainingSeconds % 60;
  const readPct = Math.round(percent * 100);

  const remainingLabel =
    remainingSeconds < 30
      ? "almost done"
      : remainingMin === 0
        ? `${remainingSec}s left`
        : remainingSec === 0
          ? `${remainingMin} min left`
          : `${remainingMin} min ${remainingSec}s left`;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Reading progress · ${readPct}% complete · ${remainingLabel}`}
      className="fixed right-4 z-30 hidden sm:flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
      style={{
        top: "calc(96px + var(--ae-safe-top, 0px))",
        background: "rgba(15, 17, 20, 0.85)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        borderColor: percent > 0.05 ? "rgba(34, 240, 213, 0.35)" : "rgba(255,255,255,0.08)",
        color: percent > 0.05 ? "#22F0D5" : "#8E969D",
        boxShadow: percent > 0.05 ? "0 0 12px rgba(34, 240, 213, 0.15)" : "none",
        transition: "border-color 200ms, color 200ms, box-shadow 200ms",
      }}
    >
      <span>{totalMinutes} min read</span>
      <span aria-hidden style={{ opacity: 0.4 }}>·</span>
      <span>{remainingLabel}</span>
    </div>
  );
}
