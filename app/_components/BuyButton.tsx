"use client";

import { useEffect, useState } from "react";
import { DynamicPrice } from "./DynamicPrice";

/**
 * V6 launch gate + dynamic ladder pricing.
 *
 * - NEXT_PUBLIC_V5_LIVE=true → checkout active.
 * - Anything else → button disabled, countdown to NEXT_PUBLIC_V5_LAUNCH_AT.
 *
 * Pricing: starts at $1, +$1 per 100 sales forever (lib/pricing.ts).
 * The button label fetches live price; checkout fires at whatever price
 * Stripe quotes at session create time (the binding source of truth).
 */
const V5_LIVE = process.env.NEXT_PUBLIC_V5_LIVE === "true";
const V5_LAUNCH_AT =
  process.env.NEXT_PUBLIC_V5_LAUNCH_AT ?? "2026-05-17T04:00:00Z";

function useCountdown(targetIso: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now == null) return null;
  const ms = Math.max(0, new Date(targetIso).getTime() - now);
  const totalSec = Math.floor(ms / 1000);
  return {
    ms,
    h: Math.floor(totalSec / 3600),
    m: Math.floor((totalSec % 3600) / 60),
    s: totalSec % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function BuyButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const countdown = useCountdown(V5_LAUNCH_AT);

  async function buy() {
    if (!V5_LIVE) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `HTTP ${res.status}`);
      }
      const { url } = await res.json();
      if (!url) throw new Error("No checkout URL returned");
      window.location.href = url;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Checkout failed";
      setError(msg);
      setLoading(false);
    }
  }

  // ───────────────────────────────────────────────────────────────
  // PRE-LAUNCH: disabled state with countdown
  // ───────────────────────────────────────────────────────────────
  if (!V5_LIVE) {
    return (
      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="ORANGEBOX v6.0.0 launches at midnight ET — download enables on go-live"
          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-[#22F0D5]/40 bg-black/40 px-6 py-3 text-base font-semibold text-[#22F0D5]/90 opacity-90 shadow-[0_0_30px_rgba(34,240,213,0.18)]"
        >
          <span className="inline-block size-2 animate-pulse rounded-full bg-[#22F0D5]" />
          {countdown
            ? countdown.ms === 0
              ? "v6.0.0 deploying — refresh in 60s"
              : `v6.0.0 live in ${pad(countdown.h)}h ${pad(countdown.m)}m ${pad(countdown.s)}s`
            : "v6.0.0 live in — — h — — m — — s"}
        </button>
        <p className="max-w-xs font-mono text-[10px] uppercase tracking-widest text-[#22F0D5]/70">
          download enables on go-live · ladder pricing starts at $1
        </p>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────
  // POST-LAUNCH: live buy button — dynamic price + FOMO badge
  // ───────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={buy}
          disabled={loading}
          className="pulse-ring inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#FF7A1A] bg-[#FF7A1A] px-8 py-4 text-base font-bold uppercase tracking-wide text-black shadow-[0_0_60px_rgba(255,122,26,0.55)] transition-all hover:scale-[1.02] hover:bg-[#FFA45A] disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
        >
          {loading ? (
            "Opening checkout…"
          ) : (
            <>
              BUY ORANGEBOX v6.0.0 —{" "}
              <DynamicPrice variant="button-label" />
              <span aria-hidden> →</span>
            </>
          )}
        </button>
        <DynamicPrice variant="badge" />
      </div>
      <p className="max-w-md font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
        ladder pricing · every 100 sales the price goes up $1 · forward buyers only
      </p>
      <p className="max-w-md font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
        instant download · stripe checkout · 30-day refund
      </p>
      {error ? (
        <p className="max-w-xs text-xs text-[#ff4f5e]">{error}</p>
      ) : null}
    </div>
  );
}
