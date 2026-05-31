"use client";

import { useState } from "react";

/**
 * Buy button for /b00kmakor.
 *
 * Hits /api/checkout/b00kmakor — receives one of:
 *   - { free: true, url: <download> }  → redirect to direct download
 *   - { url: <stripe-checkout> }       → redirect to Stripe
 *   - { error: ..., inquire: mailto }  → render mailto inquire
 *   - { error: "rate-limited", ... }   → friendly retry message
 *
 * The component is dumb on purpose: the endpoint owns the 3-phase
 * routing logic. The button only renders state.
 */

type CheckoutResult =
  | { url: string; free?: boolean }
  | { error: string; inquire?: string; retry_after_seconds?: number };

export default function B00KMakrBuy({
  variant = "primary",
}: {
  variant?: "primary" | "secondary";
}) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [inquire, setInquire] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setErr(null);
    setInquire(null);
    try {
      const res = await fetch("/api/checkout/b00kmakor", { method: "POST" });
      const j: CheckoutResult = await res.json();
      if ("url" in j && j.url) {
        window.location.assign(j.url);
        return;
      }
      if ("error" in j) {
        setErr(j.error === "rate-limited"
          ? `Too many checkout attempts — try again in ${j.retry_after_seconds ?? 60}s.`
          : j.error);
        if ("inquire" in j && j.inquire) setInquire(j.inquire);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  const baseClasses =
    variant === "primary"
      ? "inline-flex items-center gap-2 rounded-lg border border-[#FF7A1A] bg-[#FF7A1A] px-7 py-3.5 text-base font-semibold text-black shadow-[0_0_40px_rgba(255,122,26,0.4)] transition-colors hover:bg-[#FFA45A] disabled:opacity-60"
      : "inline-flex items-center gap-2 rounded-lg border border-[#22F0D5]/40 bg-[#0A0F11] px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10 disabled:opacity-60";

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={baseClasses}
      >
        {loading ? "Opening checkout…" : "Get B00KMAKR →"}
      </button>
      {err && (
        <div className="max-w-md rounded-lg border border-[#FFB87A]/40 bg-[#1C1108] px-4 py-3 text-sm text-[#FFB87A]">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em]">
            ::checkout pending
          </p>
          <p className="mt-2">{err}</p>
          {inquire && (
            <a
              href={inquire}
              className="mt-3 inline-block text-sm text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              email the founder directly →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
