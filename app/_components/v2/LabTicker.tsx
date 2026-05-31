"use client";

import { useEffect, useState } from "react";

/**
 * LabTicker — persistent bottom ticker. Fixed, full-width, 36px.
 * z-30: below sticky buy bar (z-50), above content.
 *
 * 6 strings (rewritten 2026-05-23): brand · research · product
 * (v6.3 codename + inquire-to-ship) · price + license · live
 * broadcast countdown · cite-and-forward call. Buyer count poll
 * removed — no public counter at the $49 / inquire-only tier.
 *
 * Content is duplicated inside a single span so the CSS marquee
 * loops seamlessly. Animation pauses on hover. Mobile runs the
 * loop in 40s instead of 60s (narrower viewport).
 */

function getNextBroadcast(): Date {
  // Next 8pm ET from now.
  // ET = UTC-4 (EDT) or UTC-5 (EST). We use a heuristic: offset -4 in summer.
  const now = new Date();
  // Get current ET hour by adjusting UTC. Determine DST naively by month.
  const month = now.getUTCMonth() + 1; // 1-12
  const etOffset = month >= 3 && month <= 11 ? -4 : -5;
  const etNow = new Date(now.getTime() + etOffset * 60 * 60 * 1000);

  const target = new Date(etNow);
  target.setUTCHours(20, 0, 0, 0); // 8pm ET in shifted coords = 20:00 UTC+etOffset

  if (target <= etNow) {
    // already past 8pm ET today — target tomorrow
    target.setUTCDate(target.getUTCDate() + 1);
  }

  // Convert back to real UTC
  return new Date(target.getTime() - etOffset * 60 * 60 * 1000);
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "LIVE NOW";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}H ${m}M`;
  if (m > 0) return `${m}M ${s}S`;
  return `${s}S`;
}

export function LabTicker() {
  const [countdown, setCountdown] = useState<string>("...");

  // Countdown tick — one second; the only live value left on the ticker
  useEffect(() => {
    function tick() {
      const next = getNextBroadcast();
      const diff = next.getTime() - Date.now();
      setCountdown(formatCountdown(diff));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items: string[] = [
    "LAB · ATOMEONS · MARCO ISLAND FL",
    "ÆONS RESEARCH · 12 PAPERS · CC-BY 4.0",
    "ORANGEBOX v1.0.0-beta · TURBO-OPTIMIZE CLAUDE · SHIPPED 2026-05-30",
    "B00KMAKR v3.2.0 · AI PUBLISHING COCKPIT · MAC + WINDOWS",
    "FREE LAUNCH WEEK · ENDS JUNE 6 · §4A NO-SAAS LOCK",
    `FOUNDER'S VIEW · NEXT BROADCAST IN ${countdown}`,
    "CITE THE WORK · FORWARD THE LINK · NO ALGORITHM",
  ];

  const separator = (
    <span className="mx-4 text-[#1A2225]" aria-hidden>
      ·
    </span>
  );

  // Build one copy of the content — we'll render it twice inside the span
  // so the animation loops seamlessly (second copy picks up exactly where
  // the first ends).
  function renderItems() {
    return items.map((item, i) => (
      <span key={i}>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]/70">
          {item}
        </span>
        {separator}
      </span>
    ));
  }

  return (
    <>
      {/* Spacer so page content is not obscured by the fixed ticker */}
      <div className="h-9" aria-hidden />

      <div
        className="fixed bottom-0 left-0 right-0 z-30 h-9 overflow-hidden border-t border-[#1A2225] bg-black"
        role="marquee"
        aria-label="Lab status ticker"
        aria-live="off"
      >
        {/* Inner wrapper — wider than viewport so overflow:hidden clips cleanly */}
        <div className="flex h-full items-center">
          <span
            className="lab-ticker-inner inline-flex shrink-0 items-center whitespace-nowrap"
          >
            {renderItems()}
            {/* Duplicate for seamless loop */}
            {renderItems()}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .lab-ticker-inner {
          animation: ticker-scroll 60s linear infinite;
        }
        .lab-ticker-inner:hover {
          animation-play-state: paused;
        }
        @media (max-width: 767px) {
          .lab-ticker-inner {
            animation-duration: 40s;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .lab-ticker-inner {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
