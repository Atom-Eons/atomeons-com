"use client";

import { useEffect, useState } from "react";

/**
 * V5 launch gate.
 * Set NEXT_PUBLIC_V5_LIVE=true in Vercel env at launch to enable purchases.
 * Until then the button is visibly disabled with a countdown to the launch
 * target (NEXT_PUBLIC_V5_LAUNCH_AT, ISO string, defaults to midnight ET tonight).
 */
const V5_LIVE = process.env.NEXT_PUBLIC_V5_LIVE === "true";
const V5_LAUNCH_AT =
  process.env.NEXT_PUBLIC_V5_LAUNCH_AT ?? "2026-05-17T04:00:00Z"; // midnight ET
// $1 LAUNCH PROMO — auto-expires at 6am ET (10:00 UTC) per Stripe coupon TTL.
// Front-end falls back to $49 display after this timestamp.
const PROMO_ACTIVE =
  process.env.NEXT_PUBLIC_LAUNCH_PROMO_ACTIVE === "true";
const PROMO_LABEL =
  process.env.NEXT_PUBLIC_LAUNCH_PROMO_LABEL ?? "$1 till 6am ET";
const PROMO_PRICE =
  process.env.NEXT_PUBLIC_LAUNCH_PROMO_PRICE ?? "$1";
const PROMO_EXPIRES_AT =
  process.env.NEXT_PUBLIC_LAUNCH_PROMO_EXPIRES_AT ??
  "2026-05-17T10:00:00Z"; // 6am ET

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
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return { ms, h, m, s };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function BuyButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const countdown = useCountdown(V5_LAUNCH_AT);
  const promoLeft = useCountdown(PROMO_EXPIRES_AT);
  // Promo only shows when (a) env says so AND (b) Date.now() is before expiry.
  const promoStillValid =
    PROMO_ACTIVE && (!promoLeft || promoLeft.ms > 0);

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
          title="ORANGEBOX v1.5.0 launches at midnight ET — download enables on go-live"
          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-[#22F0D5]/40 bg-black/40 px-6 py-3 text-base font-semibold text-[#22F0D5]/90 opacity-90 shadow-[0_0_30px_rgba(34,240,213,0.18)]"
        >
          <span className="inline-block size-2 animate-pulse rounded-full bg-[#22F0D5]" />
          {countdown
            ? countdown.ms === 0
              ? "v1.5.0 deploying — refresh in 60s"
              : `v1.5.0 live in ${pad(countdown.h)}h ${pad(countdown.m)}m ${pad(countdown.s)}s`
            : "v1.5.0 live in — — h — — m — — s"}
        </button>
        <p className="max-w-xs font-mono text-[10px] uppercase tracking-widest text-[#22F0D5]/70">
          download enables on go-live · midnight ET · $49 once
        </p>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────
  // POST-LAUNCH: live buy button (original behavior, with promo badge)
  // ───────────────────────────────────────────────────────────────
  const buttonLabel = loading
    ? "Opening checkout…"
    : promoStillValid
      ? `Get ORANGEBOX · ${PROMO_PRICE}`
      : "Buy ORANGEBOX v1.5.0 · $49";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={buy}
          disabled={loading}
          className="pulse-ring inline-flex items-center justify-center gap-2 rounded-lg border border-[#FF7A1A] bg-[#FF7A1A] px-7 py-3.5 text-base font-semibold text-black shadow-[0_0_40px_rgba(255,122,26,0.4)] transition-colors hover:bg-[#FFA45A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {buttonLabel}
        </button>
        {promoStillValid ? (
          <span className="inline-flex items-center gap-2 rounded-md border border-[#22F0D5]/60 bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5] shadow-[0_0_24px_rgba(34,240,213,0.25)]">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5]" />
            {PROMO_LABEL}
            {promoLeft ? (
              <span className="text-[#F2F4F5]">
                · {pad(promoLeft.h)}:{pad(promoLeft.m)}:{pad(promoLeft.s)}
              </span>
            ) : null}
          </span>
        ) : null}
      </div>
      {promoStillValid ? (
        <p className="max-w-xs font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
          launch promo · returns to $49 at 6am ET
        </p>
      ) : null}
      {error ? (
        <p className="max-w-xs text-xs text-[#ff4f5e]">{error}</p>
      ) : null}
    </div>
  );
}
