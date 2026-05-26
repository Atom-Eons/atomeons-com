"use client";

import { useState } from "react";

/**
 * OrangeBoxV63Buy — v6.3 buy button.
 *
 * Always renders. On click, POSTs to /api/checkout/v63:
 *   - 200 → Stripe Checkout URL. Redirect.
 *   - 503 → endpoint disabled (no STRIPE_ORANGEBOX_V63_ENABLED env yet);
 *           falls back to mailto inquire so the button is never a
 *           dead-end. Same outcome as the inquire CTA on the page.
 *
 * Operator activation path: set STRIPE_ORANGEBOX_V63_ENABLED=true in
 * Vercel env (optionally with STRIPE_ORANGEBOX_V63_PRICE_ID for a real
 * Stripe Price object). Button starts taking real payments instantly.
 */
export function OrangeBoxV63Buy({
  className,
  label = "buy orangebox · $49 once →",
}: {
  className?: string;
  label?: string;
}) {
  const [pending, setPending] = useState(false);

  async function onClick() {
    if (pending) return;
    setPending(true);
    try {
      const res = await fetch("/api/checkout/v63", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = (await res.json()) as
        | { url?: string; error?: string; inquire?: string }
        | null;

      if (res.ok && data?.url) {
        window.location.href = data.url;
        return;
      }

      // 503: fall back to inquire mailto (same as page's inquire CTA).
      // 4xx/5xx: same fallback, with the error message in the subject so
      //          the operator sees what went wrong if anything is broken.
      const inquireBase =
        data?.inquire ??
        "mailto:a.mccree@gmail.com?subject=ORANGEBOX%20purchase%20inquiry";
      const inquireUrl = data?.error
        ? `${inquireBase}%20(${encodeURIComponent(data.error)})`
        : inquireBase;
      window.location.href = inquireUrl;
    } catch {
      window.location.href =
        "mailto:a.mccree@gmail.com?subject=ORANGEBOX%20purchase%20inquiry";
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 rounded-full bg-[#FF7A1A] px-7 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-black shadow-[0_0_40px_rgba(255,122,26,0.4)] transition-all hover:bg-[#FFA45A] disabled:opacity-60"
      }
    >
      {pending ? "redirecting…" : label}
    </button>
  );
}
