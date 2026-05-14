"use client";

import { useEffect, useState } from "react";

const FRAMES: { tag: string; text: string }[] = [
  { tag: "SYS", text: "build:bab866a · region:iad1 · 13 routes · ok" },
  { tag: "SYS", text: "no team. no roadmap. no support. one operator." },
  { tag: "MFT", text: "the misfit is outside because they can still see the system" },
  { tag: "SYS", text: "alias:atomeons.com · stripe:live · webhook:we_1TWn6r5..." },
  { tag: "MFT", text: "we do not rebel for noise. we rebel against false structure." },
  { tag: "SYS", text: "blob:store_eGTja1mgRhdqqa3l · product:303KB · sha:c7434744..." },
  { tag: "MFT", text: "a real command loop beats a thousand imaginary features." },
  { tag: "SYS", text: "obox:127.0.0.1:8787 · party-line:atomeons-com · verified" },
  { tag: "MFT", text: "sovereignty first. meaning second. beauty third. expansion last." },
];

export function SystemLog({ intervalMs = 4200 }: { intervalMs?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((p) => (p + 1) % FRAMES.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);

  const frame = FRAMES[i];
  const isMft = frame.tag === "MFT";

  return (
    <div
      className="border-b border-[#204538] bg-[#04100d]/95 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-6 py-1.5 font-mono text-[10px] tracking-tight">
        <span
          className={`shrink-0 rounded-sm px-1.5 py-0.5 text-[9px] font-bold ${
            isMft
              ? "bg-[#1a0a0c] text-[#ff4f5e]"
              : "bg-[#0a211b] text-[#75ff92]"
          }`}
        >
          {frame.tag}
        </span>
        <span
          className={`truncate ${
            isMft ? "italic text-[#ffc46b]" : "text-[#a7b8ad]"
          }`}
        >
          {frame.text}
        </span>
      </div>
    </div>
  );
}
