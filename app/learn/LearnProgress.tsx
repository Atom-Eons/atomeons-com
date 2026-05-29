"use client";

import { useEffect, useState } from "react";

/**
 * LearnProgress — localStorage-backed progress display.
 *
 * Reads which lessons the user has marked complete (via MarkLessonComplete
 * on each lesson page) from a single localStorage key, and renders a
 * "X of N complete" progress bar.
 *
 * No server. No signup. No tracking. Just the browser remembering
 * what the user told it. If the user clears storage, the progress
 * resets — which is the right tradeoff for a no-account product.
 *
 * Pre-hydration shows a skeleton (no progress count) so the SSR-rendered
 * HTML matches the first client paint exactly — no hydration flash.
 */

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

export function LearnProgress({
  totalLessons,
  variant = "spine",
}: {
  totalLessons: number;
  variant?: "spine" | "compact";
}) {
  const [completed, setCompleted] = useState<number | null>(null);

  useEffect(() => {
    setCompleted(Object.keys(readProgress()).length);
    // Listen for cross-tab updates and same-tab MarkComplete dispatches.
    function onUpdate() {
      setCompleted(Object.keys(readProgress()).length);
    }
    window.addEventListener("storage", onUpdate);
    window.addEventListener("atomeons-learn-progress-update", onUpdate);
    return () => {
      window.removeEventListener("storage", onUpdate);
      window.removeEventListener("atomeons-learn-progress-update", onUpdate);
    };
  }, []);

  // Pre-hydration / SSR placeholder
  if (completed === null) {
    return (
      <div
        className={
          variant === "spine"
            ? "rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5"
            : "rounded-xl border border-[#1A2225] bg-[#0E1418] p-4"
        }
        aria-hidden
      >
        <div className="h-3 w-full overflow-hidden rounded-full bg-[#1A2225]" />
      </div>
    );
  }

  const pct = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  const isCompact = variant === "compact";

  return (
    <div
      className={
        isCompact
          ? "rounded-xl border border-[#1A2225] bg-[#0E1418] p-4"
          : "rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] p-5 md:p-6"
      }
      role="status"
      aria-label={`Curriculum progress: ${completed} of ${totalLessons} lessons complete`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p
          className={
            isCompact
              ? "font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]"
              : "font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]"
          }
        >
          ::your progress · saved in this browser only
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#9BA5A7]">
          {completed} / {totalLessons} · {pct}%
        </p>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#1A2225]">
        <div
          className="h-full bg-gradient-to-r from-[#22F0D5] via-[#7DDBC8] to-[#FFB87A] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      {!isCompact && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          {completed === 0
            ? "::no lessons done yet · pick one and mark it complete at the bottom"
            : completed === totalLessons
              ? "::you finished the curriculum · the next move is the work"
              : `::${totalLessons - completed} lessons remaining`}
        </p>
      )}
    </div>
  );
}
