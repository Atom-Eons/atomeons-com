"use client";

import { useEffect, useState } from "react";

/**
 * MarkLessonComplete — per-lesson "Done" toggle.
 *
 * Mounts at the bottom of each lesson page. Click toggles a flag in
 * localStorage under a single shared key, then dispatches a same-tab
 * event so the LearnProgress bar elsewhere on the page re-reads.
 *
 * Persists across visits in the same browser. No server. No account.
 * Clears with browser storage.
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

function writeProgress(p: ProgressMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    window.dispatchEvent(new Event("atomeons-learn-progress-update"));
  } catch {
    /* storage blocked — graceful no-op */
  }
}

export function MarkLessonComplete({
  slug,
  accent = "#22F0D5",
}: {
  slug: string;
  accent?: string;
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

  function toggle() {
    const cur = readProgress();
    if (cur[slug]) {
      delete cur[slug];
    } else {
      cur[slug] = true;
    }
    writeProgress(cur);
    setDone(Boolean(cur[slug]));
  }

  // Pre-hydration placeholder — matches the rendered shape so no
  // hydration flash.
  if (done === null) {
    return (
      <div
        className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 md:p-6"
        aria-hidden
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B7779]">
          ::loading progress
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border bg-[#0A0F11] p-5 md:p-6 transition-colors"
      style={{
        borderColor: done ? accent : "#1A2225",
        background: done ? accent + "0A" : "#0A0F11",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.28em]"
            style={{ color: done ? accent : "#6B7779" }}
          >
            ::progress · saved in this browser only
          </p>
          <p className="mt-2 text-base font-medium text-[#F2F4F5] md:text-lg">
            {done
              ? "Marked complete. The chain remembers."
              : "Did you do the drill? Mark this lesson done."}
          </p>
        </div>
        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] transition-all"
          style={{
            borderColor: done ? accent : "#1A2225",
            background: done ? accent + "22" : "#0E1418",
            color: done ? accent : "#C8CCCE",
          }}
          aria-pressed={done}
        >
          {done ? "✓ marked complete" : "mark complete →"}
        </button>
      </div>
    </div>
  );
}
