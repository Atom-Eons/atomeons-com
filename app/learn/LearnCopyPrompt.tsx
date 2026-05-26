"use client";

import { useState } from "react";

/**
 * LearnCopyPrompt — copy-paste artifact for lesson drills.
 *
 * Same idea as the one on /onboard before /onboard got retired: render
 * a multiline prompt verbatim, single click copies to clipboard, 2-second
 * confirmation flash. The "copy" action IS the moment the lesson becomes
 * real instead of a paragraph to read.
 */
export function LearnCopyPrompt({
  prompt,
  label,
  accent = "#22F0D5",
}: {
  prompt: string;
  label?: string;
  accent?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyIt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select the textarea for ⌘C / Ctrl+C
      const ta = document.getElementById("learn-prompt-fallback");
      if (ta && ta instanceof HTMLTextAreaElement) {
        ta.focus();
        ta.select();
      }
    }
  }

  return (
    <div
      className="rounded-2xl border bg-[#0A0F11] p-4 md:p-5"
      style={{ borderColor: accent + "55" }}
    >
      <div className="flex items-center justify-between gap-3">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.28em]"
          style={{ color: accent }}
        >
          ::{label ?? "drill prompt"} · copy-paste into any AI chat
        </p>
        <button
          type="button"
          onClick={copyIt}
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] transition-all"
          style={{
            borderColor: copied ? accent : "#1A2225",
            background: copied ? accent + "18" : "#0A0F11",
            color: copied ? accent : "#9BA5A7",
          }}
          aria-label="Copy prompt to clipboard"
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre className="mt-3 whitespace-pre-wrap break-words font-mono text-[12px] leading-[1.7] text-[#F2F4F5] md:text-[13px]">
        {prompt}
      </pre>
      <textarea
        id="learn-prompt-fallback"
        readOnly
        value={prompt}
        className="sr-only"
        aria-hidden
      />
    </div>
  );
}
