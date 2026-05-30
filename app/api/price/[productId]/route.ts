import { NextResponse } from "next/server";
import { resolvePrice, detectCountry } from "@/lib/pricing/resolve";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * /api/price/[productId] — country-aware price resolution endpoint.
 *
 * Returns the structured PriceResolution for the requesting country.
 * Caller is typically <PriceTag productId="orangebox" /> (client
 * component) on page mount, but server components can also call
 * resolvePrice() directly with the country code from the request.
 *
 * Country detection: Vercel header → Cloudflare header → ?cc= URL
 * param. Unknown country falls back to Tier 1 (base price).
 *
 * Cache: explicitly bypassed (force-dynamic + Cache-Control private)
 * so every visitor gets their own country's price. CDN caching here
 * would leak one country's price to another.
 */

export async function GET(
  req: Request,
  ctx: { params: Promise<{ productId: string }> },
) {
  const { productId } = await ctx.params;
  const country = detectCountry(req);
  const result = resolvePrice(productId, country);

  if (!result.ok) {
    return NextResponse.json(
      { error: `Unknown product: ${productId}` },
      { status: 404, headers: { "Cache-Control": "no-store, private" } },
    );
  }

  return NextResponse.json(result, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, private",
      "X-Atomeons-Country": country ?? "unknown",
      "X-Atomeons-Tier": String(result.tier),
    },
  });
}
