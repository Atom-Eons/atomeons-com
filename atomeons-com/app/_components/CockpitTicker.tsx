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

const FRAME_INTERVAL = 3600;
const TYPE_SPEED = 18;
const REVEAL_CAP = 50;

export function CockpitTicker() {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState("");

  // Cycle frames
  useEffect(() => {
    const t = setInterval(() => {
      setI((p) => (p + 1) % FRAMES.length);
    }, FRAME_INTERVAL);
    return () => clearInterval(t);
  }, []);

  // Typewriter reveal on each frame change
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = FRAMES[i];
    if (reduced) {
      setShown(frame);
      return;
    }
    setShown("");
    let pos = 0;
    const id = setInterval(() => {
      pos += 1;
      if (pos > REVEAL_CAP) {
        setShown(frame);
        clearInterval(id);
        return;
      }
      setShown(frame.slice(0, pos));
      if (pos >= frame.length) {
        clearInterval(id);
      }
    }, TYPE_SPEED);
    return () => clearInterval(id);
  }, [i]);

  const typing = shown.length < FRAMES[i].length;

  return (
    <div
      className="group rounded-md border border-[#204538] bg-[#04100d] transition-colors hover:border-[#ff7a18]/40"
      role="status"
      aria-live="polite"
      aria-label="ORANGEBOX cockpit telemetry sample (hover to pause)"
      onMouseEnter={() => {
        // Pause indication via group:hover styles; full pause semantics
        // would need state, this gives visual focus only.
      }}
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
        <span
          className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#75ff92] ${
            typing ? "animate-pulse" : ""
          }`}
        />
        <span className="truncate">
          {shown}
          {typing ? <span className="ml-px text-[#ff7a18]">▋</span> : null}
        </span>
      </div>
    </div>
  );
}
