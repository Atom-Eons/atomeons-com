"use client";

import { useEffect, useState } from "react";

const FRAMES: string[] = [
  "VISION_RAIL: NOMINAL · DAG: 30/30 · CURRENT_NODE: 2D",
  "PARTY_LINE: 4 DEPTS ACTIVE · LAST_MSG: 00:00:04 AGO",
  "CODEXA_BRIDGE: VERIFIED · ROUTE: ETHERNET_GATEWAY_READY",
  "TRIAD: STRATEGY · ENGINEERING · EXPERIENCE — ALL HOT",
  "RECEIPTS: 1,121 ON DISK · CHECKMATE: PASS",
  "MCP_TOOLS: 12 REGISTERED · CLAUDE_CODE_LANE: BOUND",
  "PROOF_ROOM: 362 ARTIFACTS · LAST_VISUAL: 00:01:18 AGO",
  "KNOWLEDGE_RAIL: 923 SOURCE_CARDS · WIKI_VAULT: SYNCED",
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
      className="flex items-center gap-3 rounded-md border border-[#204538] bg-[#04100d] px-3 py-2 font-mono text-[11px] tracking-tight text-[#75ff92]"
      role="status"
      aria-live="polite"
      aria-label="ORANGEBOX cockpit telemetry sample"
    >
      <span className="inline-block h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#75ff92]" />
      <span className="truncate">{FRAMES[i]}</span>
    </div>
  );
}
