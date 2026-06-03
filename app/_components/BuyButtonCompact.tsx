"use client";

import { useState } from "react";
import { DynamicPrice } from "./DynamicPrice";

/**
 * Compact buy button for tight surfaces (StickyBuyBar etc).
 *
 * Same checkout flow as <BuyButton/> — just the button itself, no FOMO
 * badge, no sub-copy paragraphs. Lives in mobile sticky bars where the
 * full BuyButton would balloon the bar to 300px+ and bury the screen.
 *
 * Honors the same NEXT_PUBLIC_V5_LIVE gate as BuyButton.
 */
const V5_LIVE = process.env.NEXT_PUBLIC_V5_LIVE === "true";

export function BuyButtonCompact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  if (!V5_LIVE) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex h-11 cursor-not-allowed items-center justify-center gap-1 rounded-md border border-[#22F0D5]/40 bg-black/40 px-4 text-sm font-semibold text-[#22F0D5]/90"
      >
        Soon
      </button>
    );
  }

  return (
    <button
      onClick={buy}
      disabled={loading}
      aria-label={loading ? "Opening checkout" : "Buy ORANGEBOX"}
      title={error ?? "Buy ORANGEBOX v6.0.0"}
      className="inline-flex h-11 items-center justify-center gap-1 whitespace-nowrap rounded-md border-2 border-[#22F0D5] bg-[#22F0D5] px-4 text-sm font-bold uppercase tracking-wide text-black shadow-[0_0_28px_rgba(34, 240, 213,0.45)] transition-colors hover:bg-[#FFA45A] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "…" : (
        <>
          BUY · <DynamicPrice variant="button-label" />{" "}
          <span aria-hidden>→</span>
        </>
      )}
    </button>
  );
}
