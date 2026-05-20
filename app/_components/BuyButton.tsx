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
  // FREE PROMO ACTIVE: email-capture flow that bypasses Stripe.
  // Mints an HMAC token + emails the download link via /api/free-claim.
  // ───────────────────────────────────────────────────────────────
  if (promo?.isFreePromo) {
    return (
      <FreeClaimFlow
        countdownLabel={
          promoCountdown
            ? (promoCountdown.d ?? 0) > 0
              ? `${promoCountdown.d}d`
              : `${promoCountdown.h}h`
            : "—"
        }
      />
    );
  }

  // ───────────────────────────────────────────────────────────────
  // POST-PROMO: standard $1 buy button — canonical price + DynamicPrice
  // ───────────────────────────────────────────────────────────────
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  void buy;
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

/**
 * FreeClaimFlow — inline email-capture form that POSTs to /api/free-claim,
 * mints the HMAC download token + emails the link. Bypasses Stripe.
 *
 * States: idle (button) → form (email input) → claiming (loading) →
 * sent (success card with download_url fallback if email failed).
 */

type FreeClaimResponse = {
  ok?: boolean;
  session_id?: string;
  expires_at?: string;
  download_url?: string;
  email_ok?: boolean;
  email_via?: string;
  email_error?: string;
  error?: string;
  message?: string;
};

type FreeState =
  | { kind: "idle" }
  | { kind: "form" }
  | { kind: "claiming" }
  | { kind: "sent"; result: FreeClaimResponse }
  | { kind: "error"; message: string };

function FreeClaimFlow({ countdownLabel }: { countdownLabel: string }) {
  const [state, setState] = useState<FreeState>({ kind: "idle" });
  const [email, setEmail] = useState("");

  async function claim(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState({ kind: "claiming" });
    try {
      const res = await fetch("/api/free-claim", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const j = (await res.json()) as FreeClaimResponse;
      if (!res.ok) {
        const msg =
          j.message ??
          j.error ??
          (res.status === 429
            ? "Too many requests. Try again in 10 minutes."
            : `HTTP ${res.status}`);
        setState({ kind: "error", message: msg });
        return;
      }
      setState({ kind: "sent", result: j });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "claim-failed";
      setState({ kind: "error", message: msg });
    }
  }

  if (state.kind === "sent") {
    const r = state.result;
    return (
      <div className="rounded-2xl border border-[#22F0D5]/50 bg-[#08151A]/70 p-6 shadow-[0_0_60px_rgba(34,240,213,0.25)]">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
          ::claim · sealed
        </p>
        <h3 className="mt-2 text-xl font-medium text-[#F2F4F5]">
          {r.email_ok
            ? "Check your inbox."
            : "Token ready — keep this link safe."}
        </h3>
        {r.email_ok ? (
          <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
            Sent your download link via{" "}
            <span className="text-[#F2F4F5]">{r.email_via}</span>. The link is
            valid for 30 days. If it doesn&apos;t arrive in 5 minutes, check
            spam or use the fallback below.
          </p>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-[#FF7A1A]">
            Email send failed ({r.email_via}). Use the direct download URL
            below — save it now, it&apos;s your only copy.
          </p>
        )}
        {r.download_url ? (
          <div className="mt-4 rounded-lg border border-[#1A2225] bg-black/60 p-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#6B7779]">
              direct download · 30-day exp
            </p>
            <a
              href={r.download_url}
              className="mt-1 block break-all font-mono text-xs text-[#22F0D5] hover:text-[#F2F4F5]"
            >
              {r.download_url}
            </a>
          </div>
        ) : null}
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
          session · {r.session_id} · expires {r.expires_at?.slice(0, 10)}
        </p>
      </div>
    );
  }

  if (state.kind === "form" || state.kind === "claiming") {
    const isClaiming = state.kind === "claiming";
    return (
      <form
        onSubmit={claim}
        className="flex flex-col gap-3 rounded-2xl border border-[#22F0D5]/30 bg-[#08151A]/40 p-5"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
          ::free claim · launch promo
        </p>
        <p className="text-sm text-[#9BA5A7]">
          Enter your email. We&apos;ll send a 30-day download link. No
          subscription. No follow-up sales. The token expires in 30 days.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isClaiming}
            className="flex-1 rounded-lg border border-[#1A2225] bg-black px-4 py-3 text-sm text-[#F2F4F5] placeholder:text-[#6B7779] focus:border-[#22F0D5] focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isClaiming}
            className="cta-orbital inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#22F0D5] bg-[#22F0D5] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-all hover:scale-[1.02] hover:bg-[#5FF7E1] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isClaiming ? "Claiming…" : "Claim free →"}
          </button>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#6B7779]">
          one address per IP · rate-limited 3 / 10min · check spam if it
          doesn&apos;t arrive in 5 minutes
        </p>
      </form>
    );
  }

  if (state.kind === "error") {
    return (
      <div className="rounded-2xl border border-[#ff4f5e]/40 bg-[#1A0808]/40 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ff4f5e]">
          ::claim · refused
        </p>
        <p className="mt-2 text-sm text-[#F2F4F5]">{state.message}</p>
        <button
          type="button"
          onClick={() => setState({ kind: "form" })}
          className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] hover:text-[#F2F4F5]"
        >
          ← try again
        </button>
      </div>
    );
  }

  // idle
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setState({ kind: "form" })}
          className="cta-orbital pulse-ring inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#22F0D5] bg-[#22F0D5] px-8 py-4 text-base font-bold uppercase tracking-wide text-black shadow-[0_0_60px_rgba(34,240,213,0.55)] transition-all hover:scale-[1.02] hover:bg-[#5FF7E1] sm:text-lg"
        >
          CLAIM FREE · ORANGEBOX v6.1.0
          <span aria-hidden> →</span>
        </button>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-[#22F0D5]/40 bg-black px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_8px_#22F0D5]" />
          FREE · {countdownLabel} left
        </span>
      </div>
      <p className="max-w-md font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF7A1A]">
        launch promo · free first 7 days · $1 once after
      </p>
      <p className="max-w-md font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
        instant download · 30-day token expiry · forward buyers locked at $1
      </p>
    </div>
  );
}
