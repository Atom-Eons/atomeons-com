"use client";

import { useEffect, useState } from "react";

/**
 * Countdown to the next 8pm ET letter drop.
 *
 * 8pm Eastern → 00:00 UTC during EDT, 01:00 UTC during EST.
 * We compute the nearest future midnight UTC and tick it down.
 * If a published letter exists for "today" (per the parent's check),
 * the parent can hide this. Otherwise it renders as a sealed-envelope
 * waiting card.
 */
function nextDropUtcMs(now: number): number {
  const d = new Date(now);
  // next 00:00 UTC
  const next = new Date(
    Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate() + (d.getUTCHours() === 0 && d.getUTCMinutes() === 0 ? 1 : 1),
      0,
      0,
      0,
      0,
    ),
  );
  // if we're before today's 00:00 UTC fire (which only happens if "now" is
  // somehow Dec 31 22:00 UTC etc.), still use the next-day fire.
  return next.getTime();
}

const pad = (n: number) => String(n).padStart(2, "0");

export function FoundersViewCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now == null) {
    return (
      <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
          ::next sealed envelope · 8pm ET
        </p>
      </div>
    );
  }

  const targetMs = nextDropUtcMs(now);
  const remain = Math.max(0, targetMs - now);
  const totalSec = Math.floor(remain / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  return (
    <div className="rounded-2xl border border-[#FF7A1A]/30 bg-gradient-to-br from-[#1C0F08]/30 to-[#0A0F11] p-6 md:p-7">
      <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
        ::next sealed envelope · slipped under your door at 8pm ET
      </p>
      <div className="mt-5 flex flex-wrap items-baseline gap-4">
        <span className="font-mono text-3xl font-medium tabular-nums leading-none text-[#F2F4F5] md:text-4xl">
          {pad(h)}
          <span className="text-[#6B7779]">:</span>
          {pad(m)}
          <span className="text-[#6B7779]">:</span>
          {pad(s)}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          until tonight&apos;s broadcast
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[#9BA5A7]">
        No email list. No algorithm. You come here, or you miss it.
      </p>
    </div>
  );
}
