/**
 * ScanChip · the TL;DR chip · Wave 51 · 2026-06-12
 *
 * Operator: "site overload for even the most technical · no less info
 * smarter tools for large amounts of info in better presentation."
 *
 * Place near the top of any long page. Renders a single-line summary
 * + reading time + difficulty tier so a visitor can decide whether to
 * commit before scrolling. Server-renderable · zero JS · accessible.
 *
 * Usage:
 *   <ScanChip
 *     tldr="The lab's full architecture in 17 sections · PDF-printable."
 *     readTime="8 min"
 *     level="L2"
 *     audience="engineering operators"
 *   />
 */

import type { ReactNode } from "react";

interface ScanChipProps {
  /** Single-line summary · 80-120 chars · the "before you scroll" line */
  tldr: ReactNode;
  /** "5 min" · "20 min" · "deep read" */
  readTime?: string;
  /** Difficulty marker · "L0 novice" through "L4 expert" · or "any" */
  level?: "any" | "L0" | "L1" | "L2" | "L3" | "L4";
  /** Who this is for · "engineers" · "writers" · "anyone" */
  audience?: string;
  /** Optional tags · 1-3 short tags */
  tags?: string[];
}

const LEVEL_LABEL: Record<NonNullable<ScanChipProps["level"]>, string> = {
  any: "any level",
  L0: "L0 · novice",
  L1: "L1 · learner",
  L2: "L2 · user",
  L3: "L3 · operator",
  L4: "L4 · pilot",
};

export function ScanChip({
  tldr,
  readTime,
  level,
  audience,
  tags,
}: ScanChipProps) {
  return (
    <aside
      role="note"
      aria-label="TL;DR summary"
      data-component="scan-chip"
      className="my-8 rounded-sm border border-[#1F242B] bg-[#0F1114] p-5"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
        <span className="text-[#22F0D5]">TL;DR</span>
        {readTime && <span>·  {readTime}</span>}
        {level && level !== "any" && <span>·  {LEVEL_LABEL[level]}</span>}
        {audience && <span>·  for {audience}</span>}
        {tags && tags.length > 0 && (
          <span className="text-[#7a818a]">·  {tags.join(" · ")}</span>
        )}
      </div>
      <p
        className="mt-3 text-[16px] leading-[1.55] text-[#F4F4F2]"
        style={{ fontFamily: "Newsreader, Georgia, serif" }}
      >
        {tldr}
      </p>
    </aside>
  );
}
