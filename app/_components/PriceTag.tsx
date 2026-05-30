"use client";

import { useEffect, useState } from "react";

/**
 * <PriceTag productId="..." /> — country-aware price display.
 *
 * Used everywhere on the site that needs to show a product's price.
 * Fetches the resolved price from /api/price/[productId] on mount,
 * displays it with a small transparency chip (country flag emoji +
 * tier label + "see how this works" link to /legal/pricing).
 *
 * Renders a skeleton placeholder pre-fetch so the layout doesn't
 * jump when the price lands. Falls back to "—" if the API errors;
 * never blocks rendering.
 *
 * Variants:
 *   - "hero" — large display price + tier badge below
 *   - "inline" — single line, just the price
 *   - "card" — boxed with full transparency chip
 *
 * Operator usage:
 *   <PriceTag productId="orangebox" variant="hero" />
 *   <PriceTag productId="b00kmakor" variant="inline" />
 *
 * Adding a new product = just register it in lib/pricing/products.ts.
 * No component changes required.
 */

type Resolution = {
  productId: string;
  productName: string;
  countryCode: string | null;
  countryName: string;
  tier: 1 | 2 | 3 | 4;
  tierLabel: string;
  usdCents: number;
  displayUsd: string;
  baseUsdCents: number;
  displayBaseUsd: string;
  appliedMultiplier: number;
  source: string;
  free: boolean;
  unknownCountry: boolean;
  ok: boolean;
};

// Emoji flags for the most-traffic countries — falls back to ISO code
// for the rest. Renders inline without needing a font / sprite.
const FLAG: Record<string, string> = {
  US: "🇺🇸", GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺", NZ: "🇳🇿",
  FR: "🇫🇷", DE: "🇩🇪", IT: "🇮🇹", ES: "🇪🇸", NL: "🇳🇱",
  SE: "🇸🇪", NO: "🇳🇴", FI: "🇫🇮", DK: "🇩🇰", IE: "🇮🇪",
  JP: "🇯🇵", KR: "🇰🇷", SG: "🇸🇬", HK: "🇭🇰", TW: "🇹🇼",
  IL: "🇮🇱", AE: "🇦🇪", SA: "🇸🇦",
  CN: "🇨🇳", RU: "🇷🇺", BR: "🇧🇷", MX: "🇲🇽", AR: "🇦🇷",
  TR: "🇹🇷", ZA: "🇿🇦", MY: "🇲🇾", TH: "🇹🇭",
  IN: "🇮🇳", ID: "🇮🇩", PH: "🇵🇭", VN: "🇻🇳", BD: "🇧🇩",
  PK: "🇵🇰", EG: "🇪🇬", NG: "🇳🇬", KE: "🇰🇪",
  AF: "🇦🇫", YE: "🇾🇪", ET: "🇪🇹", SO: "🇸🇴", SD: "🇸🇩",
  SS: "🇸🇸", UG: "🇺🇬", RW: "🇷🇼",
};

function flagFor(cc: string | null | undefined): string {
  if (!cc) return "🌐";
  return FLAG[cc.toUpperCase()] ?? "🌐";
}

const TIER_ACCENT: Record<1 | 2 | 3 | 4, string> = {
  1: "#22F0D5",
  2: "#7DDBC8",
  3: "#FFB87A",
  4: "#FF7A1A",
};

export function PriceTag({
  productId,
  variant = "card",
}: {
  productId: string;
  variant?: "hero" | "inline" | "card";
}) {
  const [r, setR] = useState<Resolution | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/price/${productId}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((j: Resolution) => {
        if (!cancelled) setR(j);
      })
      .catch((e: unknown) => {
        if (!cancelled) setErr(e instanceof Error ? e.message : "fetch failed");
      });
    return () => {
      cancelled = true;
    };
  }, [productId]);

  // ── INLINE ──────────────────────────────────────────────────────
  if (variant === "inline") {
    if (err) return <span className="font-mono text-[#FFB87A]">—</span>;
    if (!r)
      return (
        <span
          className="inline-block h-5 w-14 animate-pulse rounded bg-[#1A2225] align-middle"
          aria-label="loading price"
        />
      );
    return (
      <span className="inline-flex items-baseline gap-2">
        <span className="font-semibold text-[#F2F4F5]">{r.displayUsd}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          {flagFor(r.countryCode)} {r.countryName}
        </span>
      </span>
    );
  }

  // ── HERO ────────────────────────────────────────────────────────
  if (variant === "hero") {
    if (err)
      return (
        <div className="text-[#FFB87A]">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em]">::price load failed</p>
        </div>
      );
    if (!r) {
      return (
        <div aria-label="loading price">
          <div className="h-20 w-48 animate-pulse rounded-xl bg-[#1A2225]" />
        </div>
      );
    }
    const accent = TIER_ACCENT[r.tier];
    return (
      <div className="flex flex-col gap-3">
        <p
          className="text-7xl font-semibold leading-none tracking-tight md:text-8xl"
          style={{ color: accent }}
        >
          {r.displayUsd}
        </p>
        <div className="flex flex-wrap items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7]">
          <span>{flagFor(r.countryCode)} {r.countryName}</span>
          <span aria-hidden>·</span>
          <span style={{ color: accent }}>Tier {r.tier} · {r.tierLabel}</span>
          {r.usdCents < r.baseUsdCents && !r.free && (
            <>
              <span aria-hidden>·</span>
              <span className="text-[#6B7779]">
                list {r.displayBaseUsd}
              </span>
            </>
          )}
          {r.free && (
            <>
              <span aria-hidden>·</span>
              <span style={{ color: accent }}>operator gift · below Stripe minimum</span>
            </>
          )}
        </div>
        <a
          href="/legal/pricing"
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] hover:text-[#22F0D5] transition-colors"
        >
          how this price was set ↗
        </a>
      </div>
    );
  }

  // ── CARD (default) ──────────────────────────────────────────────
  if (err) {
    return (
      <div className="rounded-2xl border border-[#FFB87A]/30 bg-[#0A0F11] p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
          ::price unavailable — refresh page
        </p>
      </div>
    );
  }
  if (!r) {
    return (
      <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5" aria-label="loading price">
        <div className="h-12 w-32 animate-pulse rounded bg-[#1A2225]" />
        <div className="mt-3 h-3 w-48 animate-pulse rounded bg-[#1A2225]" />
      </div>
    );
  }
  const accent = TIER_ACCENT[r.tier];
  return (
    <div
      className="rounded-2xl border bg-[#0A0F11] p-6 md:p-7"
      style={{ borderColor: accent + "55" }}
    >
      <div className="flex items-baseline gap-3">
        <span
          className="text-5xl font-semibold tracking-tight md:text-6xl"
          style={{ color: accent }}
        >
          {r.displayUsd}
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          {r.productName} · {r.free ? "operator gift" : "once · forever"}
        </span>
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
        {flagFor(r.countryCode)} {r.countryName} · World Bank tier {r.tier} ({r.tierLabel})
      </p>
      {r.usdCents < r.baseUsdCents && !r.free && (
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          list price elsewhere: {r.displayBaseUsd} · you save {Math.round((1 - r.appliedMultiplier) * 100)}%
        </p>
      )}
      {r.free && (
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          your country&apos;s fair price ({r.displayBaseUsd === r.displayUsd ? "" : "< $0.50"}) is below the payment processor minimum — taking it as a gift from the lab
        </p>
      )}
      <a
        href="/legal/pricing"
        className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] hover:text-[#22F0D5] transition-colors"
      >
        how this works ↗
      </a>
    </div>
  );
}
