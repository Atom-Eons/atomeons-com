"use client";

import { useEffect, useState } from "react";

const RECEIPT_STREAM: { from: string; status: string; text: string }[] = [
  { from: "AE3", status: "VERIFIED", text: "design pass complete · 8 components shipped" },
  { from: "AE7", status: "VERIFIED", text: "checkmate panel pass · 12/12 criteria" },
  { from: "AE8", status: "VERIFIED", text: "deploy ready · build 14s · target=production" },
  { from: "AE6", status: "VERIFIED", text: "12 routes compile · smoke 200 across the board" },
  { from: "MIRRORS", status: "REVIEWED", text: "theater debt detected · single hard fix proposed" },
  { from: "ORANGE", status: "REVIEWED", text: "ruling: cut three sections · ranked top 3 adds" },
];

const LANES = [
  { id: "VISION_RAIL", value: 0.94, color: "#75ff92" },
  { id: "PARTY_LINE", value: 0.72, color: "#59d9ff" },
  { id: "TRIAD_LANES", value: 0.87, color: "#ff7a18" },
];

/**
 * Inline SVG/CSS mock of the ORANGEBOX cockpit — visible product
 * demo on the home hero and /orangebox. Pure SVG + CSS. Animated
 * fill bars + rotating receipt feed + heartbeat dot. Labeled SAMPLE.
 * No real data — illustrative of cockpit visual language and shape.
 */
export function CockpitMiniPanel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = setInterval(() => {
      setI((p) => (p + 1) % RECEIPT_STREAM.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const live = RECEIPT_STREAM[i];

  return (
    <div
      className="overflow-hidden rounded-xl border border-[#204538] bg-[#04100d]"
      role="img"
      aria-label="Sample ORANGEBOX cockpit panel illustration"
    >
      {/* TITLE BAR */}
      <div className="flex items-center justify-between border-b border-[#204538] bg-[#071915] px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-[#75ff92]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#a7b8ad]">
            ::cockpit · sample
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#1b8b75]">
          orangebox v6.0.0
        </span>
      </div>

      {/* LANES */}
      <div className="px-3 py-3">
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#a7b8ad]">
          ::triad lanes
        </p>
        <div className="space-y-2">
          {LANES.map((lane) => (
            <div key={lane.id}>
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#f7f0e4]">{lane.id}</span>
                <span style={{ color: lane.color }}>
                  {Math.round(lane.value * 100)}%
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#0a211b]">
                <div
                  className="cockpit-lane-fill h-full rounded-full"
                  style={{
                    width: `${lane.value * 100}%`,
                    background: lane.color,
                    opacity: 0.9,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DAG MINI-GRAPH */}
      <div className="border-t border-[#204538] bg-[#04100d]/60 px-3 py-2">
        <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#a7b8ad]">
          ::routing graph
        </p>
        <svg viewBox="0 0 320 36" width="100%" height="36" aria-hidden>
          <line x1="20" y1="18" x2="80" y2="18" stroke="#1b8b75" strokeWidth="1" />
          <line x1="80" y1="18" x2="160" y2="18" stroke="#1b8b75" strokeWidth="1" />
          <line x1="160" y1="18" x2="240" y2="18" stroke="#1b8b75" strokeWidth="1" />
          <line x1="160" y1="18" x2="240" y2="6" stroke="#1b8b75" strokeWidth="1" />
          <line x1="160" y1="18" x2="240" y2="30" stroke="#1b8b75" strokeWidth="1" />
          <line x1="240" y1="18" x2="300" y2="18" stroke="#1b8b75" strokeWidth="1" />
          <circle cx="20" cy="18" r="4" fill="#75ff92" />
          <circle cx="80" cy="18" r="4" fill="#59d9ff" />
          <circle cx="160" cy="18" r="5" className="dag-node-active" />
          <circle cx="240" cy="6" r="3" fill="#1b8b75" />
          <circle cx="240" cy="18" r="4" fill="#ffc46b" />
          <circle cx="240" cy="30" r="3" fill="#1b8b75" />
          <circle cx="300" cy="18" r="4" fill="#75ff92" />
        </svg>
      </div>

      {/* PARTY-LINE FEED */}
      <div className="border-t border-[#204538] bg-[#071915]/60 px-3 py-2">
        <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#a7b8ad]">
          ::party line · last
        </p>
        <div
          key={i}
          className="cockpit-feed-fade flex items-center gap-2 font-mono text-[10px]"
        >
          <span className="shrink-0 rounded-sm bg-[#04100d] px-1.5 py-0.5 text-[9px] font-bold text-[#ff7a18]">
            {live.from}
          </span>
          <span className="shrink-0 rounded-sm bg-[#04100d] px-1.5 py-0.5 text-[9px] font-bold text-[#75ff92]">
            {live.status}
          </span>
          <span className="truncate text-[#a7b8ad]">{live.text}</span>
        </div>
      </div>

      {/* RECEIPT STRIP */}
      <div className="flex items-center justify-between border-t border-[#204538] bg-[#04100d] px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest">
        <span className="text-[#1b8b75]">::receipts on disk</span>
        <span className="text-[#75ff92]">checkmate · pass</span>
        <span className="text-[#a7b8ad]">no fake green</span>
      </div>
    </div>
  );
}
