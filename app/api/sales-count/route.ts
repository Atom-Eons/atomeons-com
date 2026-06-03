import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { computePrice } from "@/lib/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public sales counter + LEGACY $1 canonical price.
 *
 * As of 2026-05-26 this endpoint is no longer consumed by any
 * live-current display surface — LabTicker, OrangeBoxBlock, and
 * StickyBuyBar all read from static $99 v6.3 copy. It is kept for:
 *   - back-compat with /orangebox/legacy archive
 *   - any third-party that scraped the endpoint
 * Counts only succeeded $1 v6.1.0 PaymentIntents through the legacy
 * /api/checkout flow. Does NOT count $99 v6.3 sales (those flow
 * through /api/checkout/v63 + STRIPE_ORANGEBOX_V63_PRICE_ID and
 * carry different metadata).
 *
 * Cached 60s at the edge.
 */

const PRODUCT_NAME_FILTER = "ORANGEBOX";

export async function GET() {
  const stripe = getStripe();

  let totalSales = 0;
  let totalRevenue = 0;
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
        totalRevenue += pi.amount;
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

  const netBuyers = Math.max(0, totalSales - refunds);
  const price = computePrice(netBuyers);

  return NextResponse.json(
    {
      ok: true,
      ts: new Date().toISOString(),
      total_sales: totalSales,
      total_revenue_usd: totalRevenue / 100,
      refunds,
      net_buyers: netBuyers,
      // Legacy v6.1.0 canonical price ($1) + retired free-7-days promo
      current_price_usd: price.priceDollars,
      current_price_cents: price.priceCents,
      is_free_promo: price.isFreePromo,
      promo_ends_at: price.promoEndsAt,
      promo_ms_remaining: price.promoMsRemaining,
      // Legacy fields kept for SalesCounterV5 back-compat — now static
      tier: 0,
      next_price_usd: price.priceDollars,
      remaining_at_this_price: 0,
      goal: 100,
      remaining: Math.max(0, 100 - netBuyers),
      progress_pct: Math.min(100, Math.round((netBuyers / 100) * 100)),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    },
  );
}
