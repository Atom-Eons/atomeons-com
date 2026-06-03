"use client";

import { useEffect, useState } from "react";

/**
 * CockpitFrame — viewport-corner HUD that turns the browser into the
 * cockpit bezel.
 *
 * Signature theme move from the misfits-rebels round 1 panel. Four L-shaped
 * brackets pinned to the viewport corners with live lab data at each arm:
 *
 *   ┌─ top-left:    ::COCKPIT ONLINE                          top-right ─┐
 *   │                                                                    │
 *   │                  (your page content)                               │
 *   │                                                                    │
 *   └─ bottom-left:  current scroll section          broadcast clock ─┘
 *
 * The brackets fade in on scroll past 100px and dissolve at < 40px so the
 * hero stays clean. Pointer-events disabled — the frame never blocks clicks.
 *
 * Hidden under md: breakpoint to avoid clutter on phones.
 * z-30 — sits below StickyBuyBar (z-50) and modals.
 *
 * Live signals:
 *   - top-right:    /api/sales-count polled every 60s (net buyers)
 *   - bottom-left:  current section heading from IntersectionObserver on
 *                   data-cockpit-section attribute (set on each homepage section)
 *   - bottom-right: countdown to next 8pm ET broadcast (pure date math)
 */

type SalesPayload = {
  ok?: boolean;
  net_buyers?: number;
  current_price_usd?: number;
};

const POLL_MS = 60_000;

// 8pm ET broadcast time
function nextBroadcastUtc(now = new Date()): Date {
  // Convert "now" to ET. EDT = UTC-4 (March-November), EST = UTC-5 otherwise.
  // For 2026-05-18 we're in EDT, so target = 8pm ET = 00:00 UTC next day.
  // Use a simple offset: if Date.now() lands before today's 00:00 UTC, target
  // is today's 00:00 UTC. Otherwise tomorrow's 00:00 UTC.
  // (Cron actually fires at 23:30 UTC = 7:30pm ET; we display the clean 8pm.)
  const utc = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
      0,
    ),
  );
  if (utc.getTime() <= now.getTime()) {
    utc.setUTCDate(utc.getUTCDate() + 1);
  }
  return utc;
}

function formatCountdown(targetMs: number, nowMs: number): string {
  const remain = Math.max(0, targetMs - nowMs);
  const totalSec = Math.floor(remain / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(h)}:${p(m)}:${p(s)}`;
}

export function CockpitFrame() {
  const [visible, setVisible] = useState(false);
  const [netBuyers, setNetBuyers] = useState<number | null>(null);
  const [sectionLabel, setSectionLabel] = useState<string>("HERO");
  const [countdown, setCountdown] = useState<string>("--:--:--");

  // 1. Visibility on scroll
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 100);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2. Poll sales-count for net buyers
  useEffect(() => {
    let cancelled = false;
    async function fetchOnce() {
      try {
        const r = await fetch("/api/sales-count", { cache: "no-store" });
        if (!r.ok) return;
        const data = (await r.json()) as SalesPayload;
        if (!cancelled && typeof data.net_buyers === "number") {
          setNetBuyers(data.net_buyers);
        }
      } catch {
        // failure-soft: keep last known value
      }
    }
    fetchOnce();
    const id = setInterval(fetchOnce, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // 3. IntersectionObserver for current section label
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-cockpit-section]"),
    );
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry most visible in the upper half of the viewport.
        const candidates = entries.filter((e) => e.isIntersecting);
        if (candidates.length === 0) return;
        const top = candidates.reduce((acc, e) =>
          e.boundingClientRect.top < acc.boundingClientRect.top ? e : acc,
        );
        const label = (top.target as HTMLElement).dataset.cockpitSection;
        if (label) setSectionLabel(label.toUpperCase());
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 4. Broadcast countdown tick
  useEffect(() => {
    function tick() {
      const target = nextBroadcastUtc();
      setCountdown(formatCountdown(target.getTime(), Date.now()));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cornerClass =
    "pointer-events-none fixed z-30 hidden font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]/70 transition-opacity duration-500 md:block";
  const opacity = visible ? "opacity-100" : "opacity-0";

  // L-shaped bracket SVG (40px arm, 1px stroke)
  const bracket = (corner: "tl" | "tr" | "bl" | "br") => {
    const paths: Record<typeof corner, string> = {
      tl: "M0 40 L0 0 L40 0",
      tr: "M0 0 L40 0 L40 40",
      bl: "M0 0 L0 40 L40 40",
      br: "M40 0 L40 40 L0 40",
    };
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        aria-hidden
        className="block"
      >
        <path
          d={paths[corner]}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>
    );
  };

  return (
    <>
      {/* top-left: cockpit online */}
      <div className={`${cornerClass} ${opacity} left-3 top-3`}>
        <div className="flex items-start gap-2">
          {bracket("tl")}
          <span className="mt-1 inline-flex items-center gap-1.5">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5]" />
            ::COCKPIT ONLINE
          </span>
        </div>
      </div>

      {/* top-right: live buyer count */}
      <div className={`${cornerClass} ${opacity} right-3 top-3`}>
        <div className="flex items-start justify-end gap-2">
          <span className="mt-1 text-[#22F0D5]/80">
            BUYERS · {netBuyers == null ? "--" : netBuyers} / 100
          </span>
          {bracket("tr")}
        </div>
      </div>

      {/* bottom-left: current section */}
      <div className={`${cornerClass} ${opacity} bottom-3 left-3`}>
        <div className="flex items-end gap-2">
          {bracket("bl")}
          <span className="mb-1">::SECTION · {sectionLabel}</span>
        </div>
      </div>

      {/* bottom-right: broadcast countdown */}
      <div className={`${cornerClass} ${opacity} bottom-3 right-3`}>
        <div className="flex items-end justify-end gap-2">
          <span className="mb-1 tabular-nums text-[#22F0D5]/80">
            NEXT BROADCAST · {countdown}
          </span>
          {bracket("br")}
        </div>
      </div>
    </>
  );
}
