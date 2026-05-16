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
 * Public sales counter — pulls /api/sales-count every 60s.
 *
 * The point: build-in-public stakes. Visible "X of 100 sold" creates
 * urgency, scarcity, and gives press a live number to quote.
 *
 * Hackers/rebel aesthetic: monospace, orange-on-green, terminal-style.
 */
export function SalesCounter() {
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

  if (error || !data) return null;

  const sold = data.net_buyers;
  const goal = data.goal;
  const remaining = data.remaining;
  const pct = data.progress_pct;

  return (
    <div className="inline-flex flex-col gap-1 rounded-md border border-[#204538] bg-[#04100d] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em]">
      <div className="flex items-baseline gap-2">
        <span className="text-[#1b8b75]">::sold</span>
        <span className="text-base font-bold text-[#ff7a18]">{sold}</span>
        <span className="text-[#a7b8ad]">of {goal}</span>
        <span className="text-[#75ff92]">· {remaining} remain</span>
      </div>
      <div className="relative h-1 w-48 overflow-hidden rounded-full bg-[#0a211b]">
        <div
          className="absolute inset-y-0 left-0 bg-[#ff7a18] transition-all duration-1000"
          style={{ width: `${Math.max(2, pct)}%` }}
          aria-hidden
        />
      </div>
      <p className="text-[8px] text-[#a7b8ad]">
        live stripe count · 60s refresh · first 100 buyers get founder discord
      </p>
    </div>
  );
}
