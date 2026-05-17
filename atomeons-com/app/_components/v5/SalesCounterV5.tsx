"use client";

import { useEffect, useState } from "react";

type SalesData = {
  ok: boolean;
  ts: string;
  total_sales: number;
  refunds: number;
  net_buyers: number;
  goal: number;
  remaining: number;
  progress_pct: number;
};

/**
 * v5 live sales counter — bio-cyan + orange palette, monospace.
 * Pulls /api/sales-count every 60s. The point is build-in-public proof.
 * Render placeholder (skeleton) on initial mount so SSR + first paint
 * don't show a missing element when the API hasn't responded yet.
 */
export function SalesCounterV5() {
  const [data, setData] = useState<SalesData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchSales() {
      try {
        const res = await fetch("/api/sales-count", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: SalesData = await res.json();
        if (!cancelled) {
          setData(json);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }
    fetchSales();
    const id = setInterval(fetchSales, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (error) return null;

  // skeleton state — keep visual slot reserved
  if (!data) {
    return (
      <div className="inline-flex items-center gap-3 rounded-lg border border-[#1A2225] bg-black/60 px-4 py-3 backdrop-blur-sm">
        <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B7779]">
          loading live sales…
        </span>
      </div>
    );
  }

  const { net_buyers: sold, goal, remaining, progress_pct: pct } = data;

  return (
    <div className="inline-flex flex-col gap-2 rounded-lg border border-[#1A2225] bg-black/70 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className="text-[#22F0D5]">::sold live</span>
        <span className="text-2xl font-medium tabular-nums leading-none text-[#FF7A1A]">
          {sold}
        </span>
        <span className="text-[#6B7779]">of {goal}</span>
        <span className="text-[#22F0D5]">· {remaining} remain</span>
      </div>
      <div className="relative h-1 w-56 overflow-hidden rounded-full bg-[#1A2225]">
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FF7A1A] to-[#22F0D5] transition-all duration-1000"
          style={{
            width: `${Math.max(2, pct)}%`,
            boxShadow: "0 0 8px rgba(34,240,213,0.6)",
          }}
        />
      </div>
      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#6B7779]">
        live stripe count · 60s refresh · first 100 get founder discord
      </p>
    </div>
  );
}
