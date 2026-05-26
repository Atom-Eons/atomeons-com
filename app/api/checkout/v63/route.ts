import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * /api/checkout/v63 — ORANGEBOX v6.3 SKU checkout ($49 once, forever).
 *
 * Separate endpoint from /api/checkout (which carries the legacy $1
 * v6.1.0 flow). The /orangebox page already presents the v6.3 product
 * as inquire-to-ship by default. When the operator activates a Stripe
 * Price by setting STRIPE_ORANGEBOX_V63_PRICE_ID in Vercel env, the
 * /orangebox page can flip to self-serve checkout by POSTing here.
 *
 * Until that env is set, the endpoint responds 503 with an inquire-by-
 * email fallback message, mirroring the /orangebox page's current
 * inquire-only state. No behavior change for buyers either way.
 *
 * Two activation paths:
 *
 *   A. STRIPE_ORANGEBOX_V63_PRICE_ID — preferred. A real Stripe Price
 *      created in the Stripe dashboard for the $49 ORANGEBOX SKU. The
 *      session uses `line_items[].price` and the price is locked at
 *      whatever the dashboard says. Recommended.
 *
 *   B. Fallback (no env): the endpoint creates an ad-hoc price_data
 *      line at $49 USD. Works without dashboard work but doesn't carry
 *      the brand-level Price object. Useful for first-day activation.
 *
 * Field collection mirrors the v6.1 endpoint: name + email + postal +
 * phone + birthdate + marketing opt-in. customer_creation = "always"
 * so /account works for the buyer afterward.
 */
export async function POST(req: Request) {
  try {
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atomeons.com";

    // --- rate limit: 5 requests per minute per IP ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rl = rateLimit({ key: `checkout-v63:${ip}`, limit: 5, windowMs: 60_000 });
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "rate-limited", retry_after_seconds: rl.retryAfterSeconds },
        {
          status: 429,
          headers: { "Retry-After": String(rl.retryAfterSeconds ?? 60) },
        },
      );
    }

    // --- v6.3 activation gate ---
    // Operator opts into self-serve checkout by setting
    // STRIPE_ORANGEBOX_V63_ENABLED=true in Vercel. Until then the
    // /orangebox page stays inquire-only.
    const enabled =
      process.env.STRIPE_ORANGEBOX_V63_ENABLED === "true" ||
      process.env.NEXT_PUBLIC_ORANGEBOX_V63_ENABLED === "true";
    if (!enabled) {
      return NextResponse.json(
        {
          error: "v63-checkout-disabled",
          message:
            "ORANGEBOX v6.3 self-serve checkout is not yet activated. Email a.mccree@gmail.com with subject 'ORANGEBOX purchase inquiry' to ship today.",
          inquire: "mailto:a.mccree@gmail.com?subject=ORANGEBOX%20purchase%20inquiry",
        },
        { status: 503 },
      );
    }

    const stripe = getStripe();
    const priceId = process.env.STRIPE_ORANGEBOX_V63_PRICE_ID;

    // Build line_items — prefer real Stripe Price, fall back to ad-hoc.
    const line_items = priceId
      ? [{ price: priceId, quantity: 1 }]
      : [
          {
            quantity: 1,
            price_data: {
              currency: "usd" as const,
              unit_amount: 4900, // $49.00
              product_data: {
                name: "ORANGEBOX Command v6.3",
                description:
                  "ORANGEBOX Command v6.3 — AE See-Suite + AE Operations. $49 once, forever. License §4A bans subscription. 30-day Material Failure Guarantee. Windows 10/11 x64.",
              },
            },
          },
        ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      customer_creation: "always",
      custom_fields: [
        {
          key: "machine_os",
          label: {
            type: "custom",
            custom: "Operating system (Win 10 or Win 11)",
          },
          type: "dropdown",
          optional: false,
          dropdown: {
            options: [
              { label: "Windows 11 (x64)", value: "win11" },
              { label: "Windows 10 (x64)", value: "win10" },
              { label: "Other / unsure", value: "other" },
            ],
          },
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
      allow_promotion_codes: true, // future: discount codes for cohorts
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&sku=v63`,
      cancel_url: `${origin}/cancel?sku=v63`,
      metadata: {
        product: "orangebox",
        version: "v6.3",
        sku: "ORANGEBOX_V63",
        price_cents: "4900",
        price_dollars: "49",
        pricing_law: "$49_once_forever_§4A_no_saas",
        license: "Commercial · §4A · MFG 30-day",
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
      sku: "ORANGEBOX_V63",
      price: 49,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
