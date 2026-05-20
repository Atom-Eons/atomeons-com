"use client";

import { useEffect, useState } from "react";

/**
 * Live price display — promo-aware.
 *
 * Polls /api/sales-count every 30s and renders the canonical price
 * surface ($1 always). When `is_free_promo` is true, swaps the price
 * for a "FREE" treatment with a countdown to when $1 resumes. Used by
 * Hero, BuyButton, SkusTable, StickyBuyBar — anywhere the price shows.
 *
 * Failure-soft: if the fetch fails or hasn't loaded yet, falls back to
 * `fallbackDollars` (default $1) so the UI never shows nothing.
 */

type Variant = "inline" | "stacked" | "badge" | "button-label";

type Props = {
  variant?: Variant;
  fallbackDollars?: number;
  /** When true, renders the urgency / promo line. */
  showUrgency?: boolean;
  className?: string;
};

type LiveState = {
  price: number;
  buyers: number;
  isFreePromo: boolean;
  promoMsRemaining: number;
} | null;

function formatRemain(ms: number): string {
  if (ms <= 0) return "0s";
  const totalSec = Math.floor(ms / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

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
          buyers: j.net_buyers ?? 0,
          isFreePromo: !!j.is_free_promo,
          promoMsRemaining:
            typeof j.promo_ms_remaining === "number"
              ? j.promo_ms_remaining
              : 0,
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
  const buyers = state?.buyers ?? 0;
  const isFreePromo = state?.isFreePromo ?? false;
  const promoRemain = state?.promoMsRemaining ?? 0;

  // Display label adapts to promo state.
  const priceLabel = isFreePromo ? "FREE" : `$${dollars}`;
  const promoSubLabel = isFreePromo
    ? `then $${dollars} · forever`
    : `$${dollars} once · forever`;

  if (variant === "button-label") {
    return <span className={className}>{priceLabel}</span>;
  }

  if (variant === "badge") {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-md border bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] shadow-[0_0_24px_rgba(34,240,213,0.25)] ${
          isFreePromo
            ? "border-[#22F0D5]/60 text-[#22F0D5]"
            : "border-[#FF7A1A]/60 text-[#FF7A1A]"
        } ${className}`}
      >
        <span
          className={`inline-block size-1.5 animate-pulse rounded-full ${
            isFreePromo ? "bg-[#22F0D5]" : "bg-[#FF7A1A]"
          }`}
        />
        {isFreePromo ? (
          <>FREE NOW · {formatRemain(promoRemain)} left · then ${dollars}</>
        ) : (
          <>${dollars} once · forever · no subscription</>
        )}
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          {isFreePromo ? "launch promo · 7 free days" : `${buyers} sold`}
        </span>
        <span
          className={`text-3xl font-medium ${
            isFreePromo ? "text-[#22F0D5]" : "text-[#FF7A1A]"
          }`}
        >
          {priceLabel}
        </span>
        {showUrgency ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]">
            {isFreePromo
              ? `↑ ${promoSubLabel} · ${formatRemain(promoRemain)} of FREE left`
              : `${promoSubLabel} · forward buyers locked under §4A`}
          </span>
        ) : null}
      </div>
    );
  }

  // inline
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span
        className={isFreePromo ? "text-[#22F0D5]" : "text-[#FF7A1A]"}
      >
        {priceLabel}
      </span>
      {showUrgency ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]">
          {isFreePromo
            ? `· ${formatRemain(promoRemain)} left`
            : `· once · forever`}
        </span>
      ) : null}
    </span>
  );
}
