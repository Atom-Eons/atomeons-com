"use client";

import { useState } from "react";

type Props = {
  bibtex: string;
};

/**
 * CiteAs — renders a BibTeX block with a copy-to-clipboard button.
 *
 * Client island. Parent is a server component; this handles only the
 * copy interaction. No state leaks upward.
 */
export function CiteAs({ bibtex }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API blocked — fallback: select the text
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
      {/* header row */}
      <div className="flex items-center justify-between border-b border-[#1A2225] px-5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B7779]">
          ::cite as · bibtex
        </p>
        <button
          onClick={handleCopy}
          className="rounded border border-[#1A2225] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[#6B7779] transition-colors hover:border-[#22F0D5]/50 hover:text-[#22F0D5]"
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      {/* bibtex body */}
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[11px] leading-relaxed text-[#9BA5A7] md:text-xs">
        {bibtex}
      </pre>
    </div>
  );
}
