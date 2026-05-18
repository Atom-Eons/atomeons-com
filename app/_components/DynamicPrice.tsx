"use client";

import { useEffect, useState } from "react";

/**
 * Live ladder-price display.
 *
 * Polls /api/sales-count every 30s. Shows current price + remaining
 * buyers at this price + next tier price. Used by Hero, BuyButton,
 * SkusTable, StickyBuyBar — anywhere the price is shown.
 *
 * If the fetch fails or hasn't loaded yet, falls back to the
 * `fallbackDollars` prop (default $1) so the UI never shows nothing.
 */

type Variant = "inline" | "stacked" | "badge" | "button-label";

type Props = {
  variant?: Variant;
  fallbackDollars?: number;
  /** When true, ALSO renders the "N left at this price" urgency line. */
  showUrgency?: boolean;
  className?: string;
};

type LiveState = {
  price: number;
  next: number;
  remaining: number;
  buyers: number;
} | null;

export function DynamicPrice({
  variant = "inline",
  fallbackDollars = 1,
  showUrgency = false,
  className = "",
}: Props) {
  const [state, setState] = useState<LiveState>(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch("/api/sales-count", { cache: "no-store" });
        if (!res.ok) return;
        const j = await res.json();
        if (!alive) return;
        setState({
          price: j.current_price_usd ?? fallbackDollars,
          next: j.next_price_usd ?? fallbackDollars + 1,
          remaining: j.remaining_at_this_price ?? 100,
          buyers: j.net_buyers ?? 0,
        });
      } catch {
        // keep fallback
      }
    }
    load();
    const id = setInterval(load, 30_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [fallbackDollars]);

  const dollars = state?.price ?? fallbackDollars;
  const next = state?.next ?? fallbackDollars + 1;
  const remaining = state?.remaining ?? 100;
  const buyers = state?.buyers ?? 0;

  if (variant === "button-label") {
    return <span className={className}>${dollars}</span>;
  }

  if (variant === "badge") {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-md border border-[#22F0D5]/60 bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5] shadow-[0_0_24px_rgba(34,240,213,0.25)] ${className}`}
      >
        <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5]" />
        ${dollars} now · ${next} after next {remaining} sales
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          current price · {buyers} sold
        </span>
        <span className="text-3xl font-medium text-[#FF7A1A]">${dollars}</span>
        {showUrgency ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]">
            ↑ ${next} after the next {remaining} sales
          </span>
        ) : null}
      </div>
    );
  }

  // inline
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="text-[#FF7A1A]">${dollars}</span>
      {showUrgency ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]">
          → ${next} in {remaining}
        </span>
      ) : null}
    </span>
  );
}
