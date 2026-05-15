import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public sales counter — operator can curl this anytime, site can display
 * "X sales so far" as social proof.
 *
 * Read-only, no auth, no email side effects. Same Stripe count math as
 * /api/heartbeat but stripped to the count itself.
 *
 * Cached at the edge for 60s to avoid hammering Stripe under traffic.
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
    // ignore — refund count is informational only
  }

  const netBuyers = Math.max(0, totalSales - refunds);

  return NextResponse.json(
    {
      ok: true,
      ts: new Date().toISOString(),
      total_sales: totalSales,
      total_revenue_usd: totalRevenue / 100,
      refunds,
      net_buyers: netBuyers,
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
