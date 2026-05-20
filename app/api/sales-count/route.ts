import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { computePrice } from "@/lib/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public sales counter + canonical price.
 *
 * As of 2026-05-20: $1 once forever (no ladder) + free first 7 days
 * of the launch window. Buyer count is surfaced for social proof on
 * the LabTicker and homepage. The ladder fields stay in the payload
 * for back-compat with any client still reading them, but tier and
 * remaining_at_this_price now reflect the static $1 reality.
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
      // Canonical price ($1 forever) + free-7-days promo state
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
