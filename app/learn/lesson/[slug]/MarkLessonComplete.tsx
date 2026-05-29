"use client";

import { useEffect, useRef, useState } from "react";

/**
 * MarkLessonComplete — per-lesson "Done" toggle with micro-celebration.
 *
 * On first transition false→true, fires a brief confetti animation
 * (CSS-only — 8 colored squares radiating from the button, fading,
 * 700ms). Pure aesthetic reward for the act of marking complete.
 *
 * localStorage-backed. Single shared key. Dispatches a same-tab event
 * so LearnProgress re-reads without a refresh.
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
  const [celebrate, setCelebrate] = useState(false);
  const wasDoneRef = useRef<boolean | null>(null);

  useEffect(() => {
    const cur = Boolean(readProgress()[slug]);
    setDone(cur);
    wasDoneRef.current = cur;
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
    const wasDone = Boolean(cur[slug]);
    if (wasDone) {
      delete cur[slug];
    } else {
      cur[slug] = true;
    }
    writeProgress(cur);
    setDone(!wasDone);
    // Only celebrate on false → true transition
    if (!wasDone) {
      setCelebrate(true);
      window.setTimeout(() => setCelebrate(false), 800);
    }
  }

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

  // 8 confetti particles — colored squares radiating from button center
  const particleColors = [
    accent,
    "#FFB87A",
    "#7DDBC8",
    "#FF7A1A",
    accent,
    "#22F0D5",
    "#FFB87A",
    "#F2F4F5",
  ];

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
        <div className="relative">
          {/* CONFETTI — only renders briefly on celebrate */}
          {celebrate &&
            particleColors.map((color, i) => {
              const angle = (i / particleColors.length) * 2 * Math.PI;
              const distance = 60;
              const dx = Math.cos(angle) * distance;
              const dy = Math.sin(angle) * distance;
              return (
                <span
                  key={i}
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 size-2 rounded-sm"
                  style={{
                    background: color,
                    transform: "translate(-50%, -50%)",
                    animation: `confetti-pop 800ms cubic-bezier(0.12, 0.8, 0.32, 1) forwards`,
                    ["--dx" as string]: `${dx}px`,
                    ["--dy" as string]: `${dy}px`,
                  }}
                />
              );
            })}
          <button
            type="button"
            onClick={toggle}
            className="relative inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] transition-all"
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

      <style>{`
        @keyframes confetti-pop {
          0% {
            transform: translate(-50%, -50%) scale(0.4);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1) rotate(180deg);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .relative span[aria-hidden] {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
