import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * /api/checkout/v63 — ORANGEBOX bundle checkout ($99 once, post-launch).
 *
 * THREE-PHASE LAUNCH FLOW (operator-set via env vars):
 *
 *   1. PRE-LAUNCH (no envs set)
 *      Returns 503 with the email-inquire fallback. The /orangebox page
 *      stays in inquire-to-ship mode while the operator finishes the
 *      installer.
 *
 *   2. FREE WEEK
 *      Operator sets NEXT_PUBLIC_ORANGEBOX_FREE_WEEK_ENDS_AT to an ISO
 *      timestamp 7 days out. While that timestamp is in the future,
 *      the endpoint returns 200 with a `free=true` payload pointing the
 *      client to the direct download URL (no Stripe charge). The
 *      OrangeBoxV63Buy component reads this and renders the FREE
 *      download flow.
 *
 *   3. PAID ($99)
 *      After the countdown deadline passes — or when the operator
 *      explicitly sets STRIPE_ORANGEBOX_V63_ENABLED=true — Stripe
 *      Checkout activates at $99. Free-week buyers are grandfathered
 *      for life by clause; no enforcement needed in code, the
 *      grandfathering is a public commitment carried by the license.
 *
 * Stripe Price source of truth:
 *   A. STRIPE_ORANGEBOX_V63_PRICE_ID — preferred. Real Stripe Price
 *      object created in the dashboard. Locks the amount at whatever
 *      the dashboard says.
 *   B. Fallback (no env): ad-hoc price_data at $99 USD.
 *
 * 2026-05-30 — switched fallback from $49 → $99 to match the new
 * launch pricing posture. The price-may-change-at-random doctrine
 * means future tweaks to this number are expected; the surrounding
 * messaging on /orangebox + /pricing carries that fact publicly.
 */

function isFreeWeekActive(): { active: boolean; endsAt: number } {
  const endsAtStr = process.env.NEXT_PUBLIC_ORANGEBOX_FREE_WEEK_ENDS_AT ?? "";
  if (!endsAtStr) return { active: false, endsAt: 0 };
  const t = Date.parse(endsAtStr);
  if (Number.isNaN(t)) return { active: false, endsAt: 0 };
  return { active: Date.now() < t, endsAt: t };
}
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

    // --- launch-phase routing ---
    // Phase 2: FREE WEEK. If a countdown deadline is set + in the
    // future, the bundle is free — return a download payload, no
    // Stripe charge. The grandfathering of free-week buyers is a
    // public commitment, no DB-side enforcement needed.
    const freeWeek = isFreeWeekActive();
    if (freeWeek.active) {
      const downloadUrl =
        process.env.NEXT_PUBLIC_ORANGEBOX_DOWNLOAD_URL ?? "";
      if (downloadUrl) {
        return NextResponse.json({
          free: true,
          ends_at: new Date(freeWeek.endsAt).toISOString(),
          url: downloadUrl,
          sku: "ORANGEBOX_BUNDLE_FREE_WEEK",
          price: 0,
          message:
            "FREE during the launch countdown. Download the full bundle (ORANGEBOX cockpit + AE Operations + Delta IDE). Your license is grandfathered for life — locked in now even when the price changes after the countdown.",
        });
      }
      // Free week active but no download URL set yet — operator is
      // still finishing the installer. Return 503 with the same
      // grandfathering message.
      return NextResponse.json(
        {
          error: "free-week-binary-pending",
          message:
            "Free-week countdown is live but the installer is still finishing. Email a.mccree@gmail.com to be on the day-zero list — you keep the free license for life.",
          inquire:
            "mailto:a.mccree@gmail.com?subject=ORANGEBOX%20free-week%20day-zero%20list",
          ends_at: new Date(freeWeek.endsAt).toISOString(),
        },
        { status: 503 },
      );
    }

    // Phase 3: PAID ($99). Stripe checkout active.
    // Phase 1: PRE-LAUNCH (no envs). 503 with email-inquire fallback.
    const enabled =
      process.env.STRIPE_ORANGEBOX_V63_ENABLED === "true" ||
      process.env.NEXT_PUBLIC_ORANGEBOX_V63_ENABLED === "true";
    if (!enabled) {
      return NextResponse.json(
        {
          error: "v63-checkout-disabled",
          message:
            "ORANGEBOX bundle self-serve checkout is not yet activated. Email a.mccree@gmail.com with subject 'ORANGEBOX purchase inquiry' to ship today.",
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
              unit_amount: 9900, // $99.00 (post-countdown price)
              product_data: {
                name: "ORANGEBOX Bundle (Cockpit + AE Operations + Delta IDE)",
                description:
                  "Three-tool bundle. ORANGEBOX cockpit (command surface) + AE Operations (systems layer) + Delta (visual-intelligence IDE replacing Cursor / VS Code for AI-in-the-loop builders). $99 once, forever. License §4A bans subscription. 30-day Material Failure Guarantee. Source included. Windows 10/11 x64.",
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
        product: "orangebox-bundle",
        version: "v6.3 + AE Operations + Delta",
        sku: "ORANGEBOX_BUNDLE_V1",
        price_cents: "9900",
        price_dollars: "99",
        pricing_law: "$99_post_countdown_§4A_no_saas_random_change_disclosed",
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
      sku: "ORANGEBOX_BUNDLE_V1",
      price: 99,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
