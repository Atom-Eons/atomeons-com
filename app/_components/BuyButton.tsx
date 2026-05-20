"use client";

import { useEffect, useState } from "react";
import { DynamicPrice } from "./DynamicPrice";
import { NotifyMe } from "./v6-3/NotifyMe";

/**
 * BuyButton — promo-aware checkout button.
 *
 * Gate precedence (top wins):
 *   - NEXT_PUBLIC_ORANGEBOX_SALES_PAUSED=true  → render NotifyMe inline
 *   - is_free_promo (from /api/sales-count)    → render "Claim FREE" CTA
 *                                                with countdown to promo end
 *   - V5_LIVE=true                             → standard $1 checkout
 *   - anything else                            → disabled pre-launch state
 *
 * Pricing canon (2026-05-20): $1 once forever. FREE first 7 days of
 * launch. The /api/sales-count payload tells us if we're in the free
 * window. We render a "Claim FREE — X days left" CTA during the window;
 * a standard "Buy for $1" after. Checkout pricing is whatever Stripe
 * quotes at session create time (the binding source of truth).
 */
const SALES_PAUSED =
  process.env.NEXT_PUBLIC_ORANGEBOX_SALES_PAUSED === "true";
const V5_LIVE = process.env.NEXT_PUBLIC_V5_LIVE === "true";
const V5_LAUNCH_AT =
  process.env.NEXT_PUBLIC_V5_LAUNCH_AT ?? "2026-05-17T04:00:00Z";

type PromoState = {
  isFreePromo: boolean;
  promoEndsAt: string | null;
  promoMsRemaining: number;
};

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
    d: Math.floor(totalSec / 86400),
    h: Math.floor((totalSec % 86400) / 3600),
    m: Math.floor((totalSec % 3600) / 60),
    s: totalSec % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function BuyButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promo, setPromo] = useState<PromoState | null>(null);
  const launchCountdown = useCountdown(V5_LAUNCH_AT);

  // Poll the promo state from sales-count so the FREE badge reflects
  // server truth. 60s refresh — cheap, decisive.
  useEffect(() => {
    let cancelled = false;
    async function fetchPromo() {
      try {
        const r = await fetch("/api/sales-count", { cache: "no-store" });
        if (!r.ok) return;
        const data = (await r.json()) as {
          is_free_promo?: boolean;
          promo_ends_at?: string;
          promo_ms_remaining?: number;
        };
        if (cancelled) return;
        setPromo({
          isFreePromo: !!data.is_free_promo,
          promoEndsAt: data.promo_ends_at ?? null,
          promoMsRemaining:
            typeof data.promo_ms_remaining === "number"
              ? data.promo_ms_remaining
              : 0,
        });
      } catch {
        // failure-soft: leave promo null → standard flow renders
      }
    }
    fetchPromo();
    const id = setInterval(fetchPromo, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const promoCountdown = useCountdown(promo?.promoEndsAt ?? V5_LAUNCH_AT);

  // ───────────────────────────────────────────────────────────────
  // SALES PAUSED (e.g. v6.3 build window) — notify-me only
  // ───────────────────────────────────────────────────────────────
  if (SALES_PAUSED) {
    return (
      <div className="flex flex-col gap-3">
        <div className="rounded-2xl border border-[#FF7A1A]/40 bg-[#1A0F08]/50 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
            ::sales paused · v6.3 in build
          </p>
          <p className="mt-2 text-sm text-[#F2F4F5]">
            v6.0 buyers automatically receive v6.3 (license §4A). New buyers
            join the notify-me list — one email when v6.3 ships.
          </p>
        </div>
        <NotifyMe source="buy-button" />
      </div>
    );
  }

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
  // PRE-LAUNCH: disabled state with countdown to v6 go-live
  // ───────────────────────────────────────────────────────────────
  if (!V5_LIVE) {
    return (
      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="ORANGEBOX launches at midnight ET — download enables on go-live"
          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-[#22F0D5]/40 bg-black/40 px-6 py-3 text-base font-semibold text-[#22F0D5]/90 opacity-90 shadow-[0_0_30px_rgba(34,240,213,0.18)]"
        >
          <span className="inline-block size-2 animate-pulse rounded-full bg-[#22F0D5]" />
          {launchCountdown
            ? launchCountdown.ms === 0
              ? "deploying — refresh in 60s"
              : `live in ${pad(launchCountdown.h)}h ${pad(launchCountdown.m)}m ${pad(launchCountdown.s)}s`
            : "live in — — h — — m — — s"}
        </button>
        <p className="max-w-xs font-mono text-[10px] uppercase tracking-widest text-[#22F0D5]/70">
          download enables on go-live · $1 once, forever
        </p>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────
  // FREE PROMO ACTIVE: prominent FREE CTA + countdown to expiration
  // ───────────────────────────────────────────────────────────────
  if (promo?.isFreePromo) {
    const daysLeft = promoCountdown?.d ?? 0;
    const hoursLeft = promoCountdown?.h ?? 0;
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={buy}
            disabled={loading}
            className="cta-orbital pulse-ring inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#22F0D5] bg-[#22F0D5] px-8 py-4 text-base font-bold uppercase tracking-wide text-black shadow-[0_0_60px_rgba(34,240,213,0.55)] transition-all hover:scale-[1.02] hover:bg-[#5FF7E1] disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
          >
            {loading ? (
              "Opening checkout…"
            ) : (
              <>
                CLAIM FREE · ORANGEBOX v6.1.0
                <span aria-hidden> →</span>
              </>
            )}
          </button>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#22F0D5]/40 bg-black px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_8px_#22F0D5]" />
            FREE · {daysLeft > 0 ? `${daysLeft}d` : `${hoursLeft}h`} left
          </span>
        </div>
        <p className="max-w-md font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF7A1A]">
          launch promo · free first 7 days · $1 once after
        </p>
        <p className="max-w-md font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
          instant download · 30-day refund · forward buyers locked at $1
        </p>
        {error ? (
          <p className="max-w-xs text-xs text-[#ff4f5e]">{error}</p>
        ) : null}
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────
  // POST-PROMO: standard $1 buy button — canonical price + DynamicPrice
  // ───────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={buy}
          disabled={loading}
          className="cta-orbital pulse-ring inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#FF7A1A] bg-[#FF7A1A] px-8 py-4 text-base font-bold uppercase tracking-wide text-black shadow-[0_0_60px_rgba(255,122,26,0.55)] transition-all hover:scale-[1.02] hover:bg-[#FFA45A] disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
        >
          {loading ? (
            "Opening checkout…"
          ) : (
            <>
              GET ORANGEBOX v6.1.0 —{" "}
              <DynamicPrice variant="button-label" />
              <span aria-hidden> →</span>
            </>
          )}
        </button>
        <DynamicPrice variant="badge" />
      </div>
      <p className="max-w-md font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
        $1 once · forever · no subscription · license §4A
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
