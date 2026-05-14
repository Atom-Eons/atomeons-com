"use client";

import { useEffect, useState } from "react";

const FRAMES: { tag: string; text: string }[] = [
  { tag: "SYS", text: "cockpit:127.0.0.1:8787 · ready · all lanes nominal" },
  { tag: "SYS", text: "no team. no roadmap. no support. one operator." },
  { tag: "SYS", text: "stripe:live · webhook:checkout.session.completed · verified" },
  { tag: "SYS", text: "product:zip · download:hmac-signed · 30-day token" },
  { tag: "SYS", text: "party-line:project · receipts:on-disk · verified" },
  { tag: "SYS", text: "review-engines:bound · checkmate:pre-ship-only" },
  { tag: "SYS", text: "human:final-stop-authority · no:fake-green" },
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

  return (
    <div
      className="border-b border-[#204538] bg-[#04100d]/95 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="ORANGEBOX cockpit status sample"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-6 py-1.5 font-mono text-[10px] tracking-tight">
        <span className="shrink-0 rounded-sm bg-[#0a211b] px-1.5 py-0.5 text-[9px] font-bold text-[#75ff92]">
          {frame.tag}
        </span>
        <span className="truncate text-[#a7b8ad]">{frame.text}</span>
        <span className="ml-auto shrink-0 font-mono text-[9px] uppercase tracking-widest text-[#1b8b75]">
          ::sample
        </span>
      </div>
    </div>
  );
}
