"use client";

import { useEffect, useState } from "react";

const FRAMES: string[] = [
  "VISION_RAIL: NOMINAL · DAG: NN/NN · CURRENT_NODE: SET",
  "PARTY_LINE: DEPTS ACTIVE · LAST_MSG: SECONDS AGO",
  "CODEXA_BRIDGE: VERIFIED · ROUTE: ETHERNET_GATEWAY_READY",
  "TRIAD: STRATEGY · ENGINEERING · EXPERIENCE — ALL HOT",
  "RECEIPTS: ON DISK · CHECKMATE: PASS",
  "MCP_TOOLS: REGISTERED · CLAUDE_CODE_LANE: BOUND",
  "PROOF_ROOM: ARTIFACTS · LAST_VISUAL: RECENT",
  "KNOWLEDGE_RAIL: SOURCE_CARDS · WIKI_VAULT: SYNCED",
  "OPERATOR_STATUS: HUMAN_FINAL_STOP · NO_FAKE_GREEN",
  "REVIEW_ENGINES: ORANGE · MIRRORS · LIPS · MISFITS · CHECKMATE",
];

export function CockpitTicker({ intervalMs = 3200 }: { intervalMs?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((prev) => (prev + 1) % FRAMES.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);

  return (
    <div
      className="rounded-md border border-[#204538] bg-[#04100d]"
      role="status"
      aria-live="polite"
      aria-label="ORANGEBOX cockpit telemetry sample"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#204538] px-3 py-1">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#a7b8ad]">
          ::sample cockpit telemetry
        </span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#1b8b75]">
          frame {i + 1}/{FRAMES.length}
        </span>
      </div>
      <div className="flex items-center gap-3 px-3 py-2 font-mono text-[11px] tracking-tight text-[#75ff92]">
        <span className="inline-block h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#75ff92]" />
        <span className="truncate">{FRAMES[i]}</span>
      </div>
    </div>
  );
}
