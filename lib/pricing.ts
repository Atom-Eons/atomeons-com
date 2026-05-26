/**
 * Pricing — LEGACY $1 archive flow.
 *
 * As of 2026-05-26 this module is retired from the live-current
 * commerce path. The current $49 v6.3 SKU is served by
 * /api/checkout/v63 + OrangeBoxV63Buy (which do NOT import this
 * module). LabTicker, OrangeBoxBlock, StickyBuyBar, and /orangebox
 * all source their $49 price from static copy now.
 *
 * This module is kept ONLY for:
 *   - /api/checkout (the legacy $1 PaymentIntent endpoint, still
 *     reachable from /orangebox/legacy for historical reference)
 *   - /api/sales-count (the legacy sales counter, still readable
 *     but no longer displayed on any live-current surface)
 *   - /api/free-claim (the retired free-7-days endpoint)
 *
 * BASE_DOLLARS stays at 1 because that's the canonical price for
 * the archived v6.1.0 / $1 flow. Buyers grandfathered under
 * license §4A keep their entitlement. Do not change this value
 * to $49 — the new SKU has its own flow.
 *
 * The free-promo window logic is also kept as-is so the legacy
 * archive renders historically accurate copy.
 */

import { getStripe } from "@/lib/stripe";

const PRODUCT_NAME_FILTER = "ORANGEBOX";

/** Canonical price, in dollars. $1 forever — no ladder. */
const BASE_DOLLARS = 1;

/** ISO start of the free-7-days launch window. */
const FREE_PROMO_START_AT_DEFAULT = "2026-05-17T04:00:00Z";
const FREE_PROMO_DURATION_HOURS = 168; // 7 days

function getPromoStart(): Date {
  const env =
    process.env.NEXT_PUBLIC_FREE_PROMO_START_AT ?? FREE_PROMO_START_AT_DEFAULT;
  const d = new Date(env);
  if (Number.isNaN(d.getTime())) return new Date(FREE_PROMO_START_AT_DEFAULT);
  return d;
}

function getPromoEnd(): Date {
  const start = getPromoStart();
  return new Date(start.getTime() + FREE_PROMO_DURATION_HOURS * 3600 * 1000);
}

export type PriceState = {
  /** Net paid buyers (succeeded - refunded). Display only. */
  netBuyers: number;
  /** Canonical price in USD cents — what /api/checkout will charge AFTER the promo window. */
  priceCents: number;
  /** Canonical price in dollars (whole, for display). */
  priceDollars: number;
  /** True when the free-7-days launch promo is active. */
  isFreePromo: boolean;
  /** ISO timestamp the promo ends. */
  promoEndsAt: string;
  /** Milliseconds remaining in the promo (0 if expired). */
  promoMsRemaining: number;
  /** ISO timestamp the price was computed. */
  ts: string;
};

/**
 * Pure helper — same shape regardless of buyer count. $1 always. The
 * promo flag flips based on the launch window only.
 */
export function computePrice(netBuyers: number): PriceState {
  const safeBuyers = Math.max(0, Math.floor(netBuyers));
  const priceDollars = BASE_DOLLARS;
  const priceCents = priceDollars * 100;
  const now = Date.now();
  const end = getPromoEnd().getTime();
  const start = getPromoStart().getTime();
  const isFreePromo = now >= start && now < end;
  const promoMsRemaining = Math.max(0, end - now);
  return {
    netBuyers: safeBuyers,
    priceCents,
    priceDollars,
    isFreePromo,
    promoEndsAt: new Date(end).toISOString(),
    promoMsRemaining,
    ts: new Date().toISOString(),
  };
}

/**
 * Hit Stripe and count succeeded ORANGEBOX PaymentIntents minus refunds.
 * Used by /api/sales-count for the live buyer chip + ticker. Price math
 * is no longer derived from this count — $1 always — but the count is
 * surfaced as social proof.
 *
 * Failure-soft: on any Stripe error returns 0.
 */
export async function fetchNetBuyers(): Promise<number> {
  try {
    const stripe = getStripe();
    let totalSales = 0;
    const PAGE_LIMIT = 100;
    const MAX_PAGES = 10;
    let cursor: string | undefined = undefined;

    for (let page = 0; page < MAX_PAGES; page++) {
      const res = await stripe.paymentIntents.list({
        limit: PAGE_LIMIT,
        ...(cursor ? { starting_after: cursor } : {}),
      });

      for (const pi of res.data) {
        const isOrangebox =
          (pi.description ?? "").toUpperCase().includes(PRODUCT_NAME_FILTER) ||
          Object.values(pi.metadata ?? {}).some((v) =>
            String(v).toUpperCase().includes(PRODUCT_NAME_FILTER),
          );
        if (pi.status === "succeeded" && isOrangebox) {
          totalSales += 1;
        }
      }

      if (!res.has_more) break;
      cursor = res.data[res.data.length - 1]?.id;
      if (!cursor) break;
    }

    let refunds = 0;
    try {
      const refundsList = await stripe.refunds.list({ limit: 100 });
      refunds = refundsList.data.filter((r) => r.status === "succeeded").length;
    } catch {
      // refund count is informational only
    }

    return Math.max(0, totalSales - refunds);
  } catch {
    return 0;
  }
}

/** One-call helper for routes that just need the live price. */
export async function fetchCurrentPrice(): Promise<PriceState> {
  const buyers = await fetchNetBuyers();
  return computePrice(buyers);
}

/** Public constants exported for display copy. */
export const PRICING_CONFIG = {
  BASE_DOLLARS,
  FREE_PROMO_DURATION_HOURS,
  /** Human-readable rule for display. */
  RULE: `$${BASE_DOLLARS} once, forever. FREE first ${
    FREE_PROMO_DURATION_HOURS / 24
  } days.`,
} as const;
