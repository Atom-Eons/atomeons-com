"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "atomeons-learn-progress-v1";
type ProgressMap = Record<string, true>;

function readProgress(): ProgressMap {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as ProgressMap;
    return {};
  } catch {
    return {};
  }
}

function writeProgress(p: ProgressMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    window.dispatchEvent(new Event("atomeons-learn-progress-update"));
  } catch {}
}

/**
 * StickyLessonNav — bottom-anchored, mobile-first lesson navigation.
 *
 * Floats above the existing LabTicker on every lesson page. Three
 * actions: prev (if exists) · mark complete (toggle) · next (or
 * library if at end). On phones this is the primary navigation — the
 * sticky next button is one tap away no matter how far the user has
 * scrolled.
 */
export function StickyLessonNav({
  slug,
  accent,
  prevSlug,
  prevTitle,
  nextSlug,
  nextTitle,
}: {
  slug: string;
  accent: string;
  prevSlug: string | null;
  prevTitle: string | null;
  nextSlug: string | null;
  nextTitle: string | null;
}) {
  const [done, setDone] = useState<boolean | null>(null);

  useEffect(() => {
    setDone(Boolean(readProgress()[slug]));
    function onUpdate() {
      setDone(Boolean(readProgress()[slug]));
    }
    window.addEventListener("storage", onUpdate);
    window.addEventListener("atomeons-learn-progress-update", onUpdate);
    return () => {
      window.removeEventListener("storage", onUpdate);
      window.removeEventListener("atomeons-learn-progress-update", onUpdate);
    };
  }, [slug]);

  function toggleDone() {
    const cur = readProgress();
    if (cur[slug]) delete cur[slug];
    else cur[slug] = true;
    writeProgress(cur);
    setDone(Boolean(cur[slug]));
  }

  return (
    <>
      {/* Spacer so page content isn't covered by the sticky nav */}
      <div className="h-20" aria-hidden />

      <nav
        className="fixed bottom-9 left-0 right-0 z-20 border-t border-[#1A2225] bg-black/95 backdrop-blur-md md:bottom-9"
        role="navigation"
        aria-label="Lesson navigation"
      >
        <div className="mx-auto flex w-full max-w-3xl items-center gap-2 px-3 py-2.5 md:gap-3 md:px-6 md:py-3">
          {/* PREV */}
          {prevSlug ? (
            <Link
              href={`/learn/lesson/${prevSlug}`}
              className="hidden shrink-0 items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0E1418] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] transition-all hover:border-[#22F0D5]/40 hover:text-[#22F0D5] sm:inline-flex"
              aria-label={`Previous lesson: ${prevTitle ?? ""}`}
            >
              ← prev
            </Link>
          ) : (
            <Link
              href="/learn"
              className="hidden shrink-0 items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0E1418] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] transition-all hover:border-[#22F0D5]/40 hover:text-[#22F0D5] sm:inline-flex"
            >
              ← /learn
            </Link>
          )}

          {/* MARK COMPLETE */}
          <button
            type="button"
            onClick={toggleDone}
            disabled={done === null}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] transition-all md:px-5"
            style={{
              borderColor: done ? accent : "#1A2225",
              background: done ? accent + "22" : "#0E1418",
              color: done ? accent : "#C8CCCE",
            }}
            aria-pressed={done ?? false}
          >
            {done === null
              ? "..."
              : done
                ? "✓ complete"
                : "mark done"}
          </button>

          {/* NEXT — primary action */}
          {nextSlug ? (
            <Link
              href={`/learn/lesson/${nextSlug}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] transition-all md:px-5"
              style={{
                background: accent,
                color: "#0B1014",
                boxShadow: `0 0 24px ${accent}55`,
              }}
              aria-label={`Next lesson: ${nextTitle ?? ""}`}
            >
              next →
            </Link>
          ) : (
            <Link
              href="/learn/library"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#FFB87A]/40 bg-[#FFB87A]/15 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFB87A] transition-all md:px-5"
            >
              library →
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
