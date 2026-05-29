"use client";

import { useState } from "react";

/**
 * CopyLearnLink — clipboard copy with visual confirm.
 *
 * Used at the bottom of /learn in the "send to one person" CTA.
 * Copies `https://atomeons.com/learn` verbatim — no shortener, no
 * UTM, no tracking pixel. ~1.8s "copied ✓" confirmation, then resets.
 */
export function CopyLearnLink() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText("https://atomeons.com/learn");
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard API blocked — graceful no-op */
        }
      }}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] transition-all ${
        copied
          ? "border-[#22F0D5] bg-[#22F0D5]/20 text-[#22F0D5]"
          : "border-[#1A2225] bg-[#0A0F11] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
      }`}
      aria-label="Copy the /learn URL to clipboard"
    >
      {copied ? "copied ✓" : "copy link →"}
    </button>
  );
}
