"use client";

import Script from "next/script";

type Props = {
  /** Stripe checkout session id — used as conversion_id for dedupe */
  sessionId: string;
  /** Purchase amount in dollars (whole units, not cents) */
  value: number;
  /** ISO 4217 currency code, e.g. "USD" */
  currency?: string;
  /** Optional buyer email for hashed match — Pixel hashes client-side */
  email?: string;
};

/**
 * Fires the X Ads conversion event once on the /success page when a
 * paid Stripe session is verified. No-ops gracefully without:
 *   NEXT_PUBLIC_X_PIXEL_ID    (pixel id, set via XAdsPixel in layout)
 *   NEXT_PUBLIC_X_EVENT_ID    (the specific conversion event id from
 *                              ads.x.com → Conversion Tracking)
 *
 * Implementation notes:
 * - twq() is queued by the base pixel; safe to call before pixel
 *   initializes
 * - conversion_id = sessionId prevents duplicate counting if the buyer
 *   reloads /success
 */
export function XAdsConversion({ sessionId, value, currency = "USD", email }: Props) {
  const eventId = process.env.NEXT_PUBLIC_X_EVENT_ID;
  if (!eventId) return null;
  const payload: Record<string, unknown> = {
    value,
    currency,
    conversion_id: sessionId,
    contents: [{ content_id: "orangebox-v1", content_name: "ORANGEBOX v1" }],
  };
  if (email) payload.email_address = email;
  return (
    <Script id="x-ads-conversion" strategy="afterInteractive">
      {`if (typeof window !== 'undefined' && typeof window.twq === 'function') {
  window.twq('event', '${eventId}', ${JSON.stringify(payload)});
}`}
    </Script>
  );
}
