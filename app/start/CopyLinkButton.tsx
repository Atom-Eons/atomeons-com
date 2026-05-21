"use client";

import { useState } from "react";

/**
 * CopyLinkButton — clipboard copy with visual confirm.
 *
 * Used at the bottom of /start to make sharing as low-friction as the
 * page promises. No tracking, no shortener — copies `https://atomeons.com/start`
 * verbatim. ~1.8s "copied ✓" confirmation, then back to label.
 */
export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText("https://atomeons.com/start");
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard API blocked — graceful no-op */
        }
      }}
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] transition-all ${
        copied
          ? "border-[#22F0D5] bg-[#22F0D5]/20 text-[#22F0D5]"
          : "border-[#1A2225] bg-[#0F151A] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
      }`}
    >
      {copied ? "copied ✓" : "copy link →"}
    </button>
  );
}
