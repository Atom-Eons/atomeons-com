/**
 * Dynamic pricing ladder — operator decree 2026-05-17.
 *
 *   First 100 buyers   → $1
 *   Buyers 101-200     → $2
 *   Buyers 201-300     → $3
 *   ...etc forever
 *
 * Formula: priceCents = (floor(netBuyers / 100) + 1) * 100
 *
 * "Forward buyers only" — current buyers paid what they paid at session
 * creation time. Stripe sessions lock the price at create; this helper
 * just computes the right price for the NEXT session.
 */

import { getStripe } from "@/lib/stripe";

const PRODUCT_NAME_FILTER = "ORANGEBOX";
const STEP = 100; // buyers per tier
const STEP_DOLLARS = 1; // price increase per tier (dollars)
const BASE_DOLLARS = 1;

export type PriceState = {
  /** Net paid buyers (succeeded - refunded). */
  netBuyers: number;
  /** Current 100-buyer tier index (0, 1, 2, ...). */
  tier: number;
  /** Current price in USD cents — what /api/checkout will charge a new session. */
  priceCents: number;
  /** Current price in dollars (whole, for display). */
  priceDollars: number;
  /** Next-tier price in dollars (price the NEXT 100th buyer will see). */
  nextPriceDollars: number;
  /** Buyers remaining at the current price before the next $1 jump. */
  remainingAtThisPrice: number;
  /** ISO timestamp the price was computed. */
  ts: string;
};

/**
 * Compute the current dynamic price purely from a net-buyer count.
 * Pure function — no Stripe calls. Used by both the route handlers and
 * any preview / SSR display path.
 */
export function computePrice(netBuyers: number): PriceState {
  const safeBuyers = Math.max(0, Math.floor(netBuyers));
  const tier = Math.floor(safeBuyers / STEP);
  const priceDollars = BASE_DOLLARS + tier * STEP_DOLLARS;
  const priceCents = priceDollars * 100;
  const remainingAtThisPrice = STEP - (safeBuyers % STEP);
  return {
    netBuyers: safeBuyers,
    tier,
    priceCents,
    priceDollars,
    nextPriceDollars: priceDollars + STEP_DOLLARS,
    remainingAtThisPrice,
    ts: new Date().toISOString(),
  };
}

/**
 * Hit Stripe and count succeeded ORANGEBOX PaymentIntents minus refunds.
 * Same math as /api/sales-count, kept DRY here so both /api/checkout and
 * /api/sales-count share one source of truth.
 *
 * Failure-soft: on any Stripe error returns netBuyers=0 → price stays $1.
 * Doctrine: NEVER charge more than $1 if we can't verify the count. The
 * downside of a $1 sale is zero; the downside of overcharging is brand.
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
  STEP_DOLLARS,
  STEP,
  /** Human-readable rule: "Every 100 sales the price goes up $1." */
  RULE: `Every ${STEP} sales the price goes up $${STEP_DOLLARS}.`,
} as const;
