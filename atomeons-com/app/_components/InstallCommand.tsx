"use client";

import { useState } from "react";

const LINES: string[] = [
  "unzip ORANGEBOX-OS-AIO-v1.4.0.zip",
  "cd ORANGEBOX-OS-AIO-v1.4.0",
  "open README.md   # follow the manual inside",
];
const ALL = LINES.join("\n");

export function InstallCommand() {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedLine, setCopiedLine] = useState<number | null>(null);

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(ALL);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // clipboard blocked
    }
  }

  async function copyLine(line: string, idx: number) {
    try {
      await navigator.clipboard.writeText(line);
      setCopiedLine(idx);
      setTimeout(() => setCopiedLine(null), 1500);
    } catch {
      // clipboard blocked
    }
  }

  return (
    <div className="rounded-lg border border-[#204538] bg-[#04100d]">
      <div className="flex items-center justify-between border-b border-[#204538] px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
          ::3-line install · paste in your shell
        </p>
        <button
          onClick={copyAll}
          aria-label="Copy all install commands"
          className="inline-flex items-center gap-1.5 rounded border border-[#204538] bg-[#071915] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#a7b8ad] transition-colors hover:border-[#ff7a18]/50 hover:text-[#ff7a18]"
        >
          {copiedAll ? (
            <>
              <span className="text-[#75ff92]">✓</span> copied
            </>
          ) : (
            <>
              <span>⎘</span> copy all
            </>
          )}
        </button>
      </div>
      <ol className="font-mono text-xs leading-relaxed">
        {LINES.map((line, idx) => (
          <li
            key={idx}
            className="group flex items-center gap-3 border-b border-[#204538]/40 px-3 py-2 last:border-b-0 hover:bg-[#071915]"
          >
            <span className="shrink-0 font-mono text-[10px] tracking-widest text-[#1b8b75]">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <code className="flex-1 truncate text-[#75ff92]">
              <span className="text-[#1b8b75]">$</span> {line}
            </code>
            <button
              onClick={() => copyLine(line, idx)}
              aria-label={`Copy line ${idx + 1}`}
              className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#1b8b75] opacity-0 transition-opacity hover:text-[#ff7a18] group-hover:opacity-100"
            >
              {copiedLine === idx ? (
                <span className="text-[#75ff92]">✓</span>
              ) : (
                <span>⎘</span>
              )}
            </button>
          </li>
        ))}
      </ol>
      <p className="border-t border-[#204538] px-3 py-2 font-mono text-[10px] tracking-tight text-[#a7b8ad]">
        cockpit binds to{" "}
        <span className="text-[#75ff92]">http://127.0.0.1:8787/</span>
      </p>
    </div>
  );
}
