"use client";

import { useState } from "react";

const COMMAND = "unzip orangebox-v1.zip && cd orangebox-v1 && npm install && npm run start";

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked; user can still select manually
    }
  }

  return (
    <div className="rounded-lg border border-[#204538] bg-[#04100d]">
      <div className="flex items-center justify-between border-b border-[#204538] px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
          ::three-line install · paste in your shell
        </p>
        <button
          onClick={copy}
          aria-label="Copy install command"
          className="inline-flex items-center gap-1.5 rounded border border-[#204538] bg-[#071915] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#a7b8ad] transition-colors hover:border-[#ff7a18]/50 hover:text-[#ff7a18]"
        >
          {copied ? (
            <>
              <span className="text-[#75ff92]">✓</span> copied
            </>
          ) : (
            <>
              <span>⎘</span> copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-3 py-3 font-mono text-xs leading-relaxed text-[#75ff92]">
        <span className="text-[#1b8b75]">$</span> {COMMAND}
      </pre>
      <p className="border-t border-[#204538] px-3 py-2 font-mono text-[10px] tracking-tight text-[#a7b8ad]">
        then open{" "}
        <span className="text-[#75ff92]">http://127.0.0.1:8787/</span>
      </p>
    </div>
  );
}
