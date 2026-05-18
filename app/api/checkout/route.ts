import { NextResponse } from "next/server";
import {
  getStripe,
  PRODUCT_NAME,
  PRODUCT_DESCRIPTION,
} from "@/lib/stripe";
import { fetchCurrentPrice } from "@/lib/pricing";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Checkout session — ORANGEBOX dynamic ladder pricing.
 *
 * Price is computed at session-create time from live Stripe sales count:
 *   first 100 sales → $1, next 100 → $2, etc. Forward buyers only —
 *   already-completed sessions keep whatever they paid (Stripe locks
 *   the price at create time). Stripe checkout sessions live ~24h and
 *   the price the buyer SEES is the price they PAY.
 *
 * What we collect from every buyer:
 *   - name              · billing_address_collection.name
 *   - email             · always
 *   - postal address    · billing_address_collection: required
 *   - phone             · phone_number_collection.enabled
 *   - birthdate         · custom_fields[birthdate]
 *   - marketing opt-in  · custom_fields[marketing_opt_in] dropdown
 *
 * customer_creation = "always" → every paid session yields a reusable
 * Stripe Customer. /account uses Customer Portal so the buyer can update
 * any of these fields before the next purchase.
 */
export async function POST(req: Request) {
  try {
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atomeons.com";

    // --- rate limit: 5 requests per minute per IP ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rl = rateLimit({ key: `checkout:${ip}`, limit: 5, windowMs: 60_000 });
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "rate-limited", retry_after_seconds: rl.retryAfterSeconds },
        {
          status: 429,
          headers: { "Retry-After": String(rl.retryAfterSeconds ?? 60) },
        },
      );
    }

    void req;

    // Live price — failure-soft to $1 if Stripe count is unreachable.
    const price = await fetchCurrentPrice();

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: price.priceCents,
            product_data: {
              name: `${PRODUCT_NAME} · #${price.netBuyers + 1} buyer`,
              description: PRODUCT_DESCRIPTION,
            },
          },
        },
      ],
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      customer_creation: "always",
      custom_fields: [
        {
          key: "birthdate",
          label: { type: "custom", custom: "Birthdate (MM/DD/YYYY)" },
          type: "text",
          optional: false,
          text: { minimum_length: 8, maximum_length: 10 },
        },
        {
          key: "marketing_opt_in",
          label: {
            type: "custom",
            custom: "Email me product news, updates, drops",
          },
          type: "dropdown",
          optional: false,
          dropdown: {
            options: [
              { label: "Yes — keep me in the loop", value: "yes" },
              { label: "No thanks — receipts only", value: "no" },
            ],
          },
        },
      ],
      automatic_tax: { enabled: false },
      allow_promotion_codes: false,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        product: "orangebox",
        version: "v6.0.0",
        price_cents: String(price.priceCents),
        price_dollars: String(price.priceDollars),
        tier: String(price.tier),
        buyer_number: String(price.netBuyers + 1),
        pricing_law: "ladder_every_100_plus_1",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe returned no session URL" },
        { status: 500 },
      );
    }
    return NextResponse.json({
      url: session.url,
      id: session.id,
      price: price.priceDollars,
      buyer_number: price.netBuyers + 1,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
