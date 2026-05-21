"use client";

import { useState } from "react";

/**
 * GlossaryCard — click-to-reveal definition. Default state shows the term
 * + one-line gloss. Click expands to full sentence. Cyan accent on hover.
 */
export function GlossaryCard({
  term,
  short,
  body,
}: {
  term: string;
  short: string;
  body: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      className="group block w-full rounded-2xl border border-[#1A2225] bg-[#0F151A] p-5 text-left transition-all hover:border-[#22F0D5]/40 hover:bg-[#11181E]"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-base font-semibold tracking-tight text-[#F2F4F5] md:text-lg">
          {term}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
          {short}
        </span>
      </div>
      <p
        className={`mt-3 overflow-hidden text-sm leading-[1.65] text-[#9BA5A7] transition-all ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {body}
      </p>
      <p
        className={`mt-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors ${
          open ? "text-[#6B7779]" : "text-[#22F0D5]/60 group-hover:text-[#22F0D5]"
        }`}
      >
        {open ? "tap to collapse ↑" : "tap to expand ↓"}
      </p>
    </button>
  );
}
