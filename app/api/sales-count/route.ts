import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { computePrice } from "@/lib/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public sales counter + live ladder price.
 *
 * Same Stripe count math as before, plus dynamic-pricing fields so the
 * site can render "current price = $X / next tier = $X+1 in N sales".
 *
 * Cached at the edge for 60s. Reasonable: prices only jump every 100
 * sales, so a 60s stale window almost never crosses a tier boundary
 * (would need ~6 sales/minute sustained to risk it). At tier boundary
 * the worst case is one buyer briefly sees the old price; Stripe
 * session creation will still charge the new tier from the moment the
 * count crosses (the cache is on display, not on charge).
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
      // Dynamic ladder pricing fields
      current_price_usd: price.priceDollars,
      current_price_cents: price.priceCents,
      tier: price.tier,
      next_price_usd: price.nextPriceDollars,
      remaining_at_this_price: price.remainingAtThisPrice,
      // Legacy "goal" fields kept for SalesCounterV5 back-compat
      goal: 100,
      remaining: price.remainingAtThisPrice,
      progress_pct: Math.min(100, Math.round(((netBuyers % 100) / 100) * 100)),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    },
  );
}
