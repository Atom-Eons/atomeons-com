"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LESSONS } from "./_data/lessons";
import { LEVELS } from "./_data/levels";

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

/**
 * ContinueReading — localStorage-aware "resume where you left off" card.
 *
 * Computes next incomplete lesson based on global lesson order
 * (sorted by .number). If the user has done at least one lesson AND
 * has at least one incomplete lesson, surfaces the lowest-numbered
 * incomplete lesson as a "pick up here" card.
 *
 * If user has done zero lessons → renders nothing (the diagnostic
 * CTA elsewhere on the page is the right action for them).
 *
 * If user has done all 27 lessons → renders a celebration card.
 *
 * No server. No account. Purely localStorage-driven.
 */
export function ContinueReading() {
  const [state, setState] = useState<
    | { kind: "loading" }
    | { kind: "fresh" } // no progress yet → don't render
    | {
        kind: "resume";
        slug: string;
        title: string;
        oneLiner: string;
        number: number;
        levelName: string;
        levelAccent: string;
        completedCount: number;
        totalCount: number;
      }
    | { kind: "complete"; totalCount: number }
  >({ kind: "loading" });

  useEffect(() => {
    function recompute() {
      const progress = readProgress();
      const completedSlugs = Object.keys(progress);
      const sortedLessons = [...LESSONS].sort((a, b) => a.number - b.number);

      if (completedSlugs.length === 0) {
        setState({ kind: "fresh" });
        return;
      }
      if (completedSlugs.length >= sortedLessons.length) {
        setState({ kind: "complete", totalCount: sortedLessons.length });
        return;
      }

      // Find the lowest-numbered lesson that isn't in progress
      const next = sortedLessons.find((l) => !progress[l.slug]);
      if (!next) {
        setState({ kind: "complete", totalCount: sortedLessons.length });
        return;
      }
      const lvl = LEVELS.find((L) => L.id === next.level);
      setState({
        kind: "resume",
        slug: next.slug,
        title: next.title,
        oneLiner: next.oneLiner,
        number: next.number,
        levelName: lvl?.name ?? next.level,
        levelAccent: lvl?.accent ?? "#22F0D5",
        completedCount: completedSlugs.length,
        totalCount: sortedLessons.length,
      });
    }

    recompute();
    function onUpdate() {
      recompute();
    }
    window.addEventListener("storage", onUpdate);
    window.addEventListener("atomeons-learn-progress-update", onUpdate);
    return () => {
      window.removeEventListener("storage", onUpdate);
      window.removeEventListener("atomeons-learn-progress-update", onUpdate);
    };
  }, []);

  // Pre-hydration + fresh-user state both render nothing — the diagnostic
  // CTA already on the page handles the "where do I start" case.
  if (state.kind === "loading" || state.kind === "fresh") return null;

  if (state.kind === "complete") {
    return (
      <section
        className="border-b border-[#1A2225] bg-gradient-to-r from-[#FFB87A]/10 via-[#22F0D5]/05 to-[#FFB87A]/10"
        aria-label="Curriculum complete"
      >
        <div className="mx-auto w-full max-w-4xl px-6 py-8 md:py-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::you finished the curriculum
          </p>
          <p className="mt-4 text-xl font-medium leading-[1.3] text-[#F2F4F5] md:text-2xl">
            All {state.totalCount} lessons marked complete. The chain
            remembers. The next move is the work, not another lesson.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/orangebox"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF7A1A] px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] transition-all hover:bg-[#FFA45A]"
            >
              the cockpit · /orangebox →
            </Link>
            <Link
              href="/founders-view"
              className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:border-[#22F0D5]"
            >
              tonight's broadcast · /founders-view →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Resume state
  const pct = Math.round((state.completedCount / state.totalCount) * 100);
  return (
    <section
      className="border-b border-[#1A2225]"
      style={{ background: state.levelAccent + "08" }}
      aria-label="Resume your lesson"
    >
      <div className="mx-auto w-full max-w-4xl px-6 py-8 md:py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.32em]"
              style={{ color: state.levelAccent }}
            >
              ::pick up here · {state.completedCount} of {state.totalCount}{" "}
              done ({pct}%)
            </p>
            <p
              className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]"
            >
              L{state.number} · {state.levelName}
            </p>
            <h2 className="mt-2 text-balance text-xl font-medium leading-[1.3] text-[#F2F4F5] md:text-2xl">
              {state.title}
            </h2>
            <p className="mt-2 text-sm leading-[1.5] text-[#9BA5A7] md:text-base">
              {state.oneLiner}
            </p>
          </div>
          <Link
            href={`/learn/lesson/${state.slug}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] transition-all"
            style={{
              background: state.levelAccent,
              color: "#0B1014",
              boxShadow: `0 0 24px ${state.levelAccent}55`,
            }}
          >
            resume →
          </Link>
        </div>
      </div>
    </section>
  );
}
