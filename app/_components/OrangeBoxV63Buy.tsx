"use client";

import { useState } from "react";

/**
 * OrangeBoxV63Buy — three-phase launch button.
 *
 * Always renders. On click POSTs to /api/checkout/v63. The endpoint
 * routes through one of three launch phases:
 *
 *   FREE WEEK (200, { free: true, url: <download> })
 *     Redirect to the direct download URL. No charge. Grandfathered
 *     license for life. Operator sets NEXT_PUBLIC_ORANGEBOX_FREE_WEEK_ENDS_AT
 *     + NEXT_PUBLIC_ORANGEBOX_DOWNLOAD_URL to activate.
 *
 *   PAID (200, { url: <stripe-checkout> })
 *     Redirect to Stripe. Operator sets STRIPE_ORANGEBOX_V63_ENABLED=true
 *     + (optional) STRIPE_ORANGEBOX_V63_PRICE_ID after the countdown
 *     expires. Default price $99.
 *
 *   PRE-LAUNCH / INSTALLER PENDING (503, inquire-by-email fallback)
 *     mailto fallback so the button is never a dead-end.
 */
export function OrangeBoxV63Buy({
  className,
  label = "get the bundle →",
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
        | {
            url?: string;
            error?: string;
            inquire?: string;
            free?: boolean;
            ends_at?: string;
          }
        | null;

      if (res.ok && data?.url) {
        // Covers both FREE WEEK (free=true, url=download) and PAID
        // (url=stripe checkout). Either way, the URL is where the
        // user goes next.
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
        "inline-flex items-center justify-center gap-2 rounded-full bg-[#22F0D5] px-7 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-black shadow-[0_0_40px_rgba(34, 240, 213,0.4)] transition-all hover:bg-[#FFA45A] disabled:opacity-60"
      }
    >
      {pending ? "redirecting…" : label}
    </button>
  );
}
