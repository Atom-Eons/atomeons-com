import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { rateLimit } from "@/lib/rate-limit";
import { resolvePrice, detectCountry } from "@/lib/pricing/resolve";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * /api/checkout/b00kmakor — B00KMAKR v3.2.0 checkout.
 *
 * THREE-PHASE LAUNCH FLOW (operator-set via env vars):
 *
 *   1. PRE-LAUNCH (no envs set)
 *      Returns 503 with the email-inquire fallback while the operator
 *      stages the binaries to a CDN. Page stays in inquire-to-ship mode.
 *
 *   2. FREE WEEK (optional · symmetric to ORANGEBOX)
 *      Operator sets NEXT_PUBLIC_B00KMAKOR_FREE_WEEK_ENDS_AT to an ISO
 *      timestamp. While in the future, the endpoint returns 200 with
 *      `free=true` + download URL. License is grandfathered for life.
 *
 *   3. PAID
 *      Dynamic price via lib/pricing — Tier 1 anchor $99 with USA
 *      Advantage Clause + Strategic Tier Lift + Tier 2/3/4 defaults.
 *      Stripe checkout activates when STRIPE_B00KMAKOR_ENABLED=true.
 *
 * Cross-platform: the binary delivered is the same bundle. The HTML app
 * runs everywhere. Native installers (Mac .dmg / Windows .msi+.exe) are
 * both in the zip; buyer picks whichever matches their OS at unzip.
 */

function isFreeWeekActive(): { active: boolean; endsAt: number } {
  const endsAtStr = process.env.NEXT_PUBLIC_B00KMAKOR_FREE_WEEK_ENDS_AT ?? "";
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
    const rl = rateLimit({
      key: `checkout-b00kmakor:${ip}`,
      limit: 5,
      windowMs: 60_000,
    });
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "rate-limited", retry_after_seconds: rl.retryAfterSeconds },
        {
          status: 429,
          headers: { "Retry-After": String(rl.retryAfterSeconds ?? 60) },
        },
      );
    }

    // --- Phase 2: FREE WEEK ---
    const freeWeek = isFreeWeekActive();
    if (freeWeek.active) {
      const downloadUrl =
        process.env.NEXT_PUBLIC_B00KMAKOR_DOWNLOAD_URL ?? "";
      if (downloadUrl) {
        return NextResponse.json({
          free: true,
          ends_at: new Date(freeWeek.endsAt).toISOString(),
          url: downloadUrl,
          sku: "B00KMAKOR_V3_2_0_FREE_WEEK",
          price: 0,
          message:
            "FREE during the launch countdown. Full v3.2.0 dual-platform bundle (Mac + Windows). License is grandfathered for life — locked in now even when the price changes after the countdown.",
        });
      }
      return NextResponse.json(
        {
          error: "free-week-binary-pending",
          message:
            "Free-week countdown is live but the binary URL is not staged yet. Email a.mccree@gmail.com to be on the day-zero list — your free license is grandfathered for life regardless.",
          inquire:
            "mailto:a.mccree@gmail.com?subject=B00KMAKR%20free-week%20day-zero%20list",
          ends_at: new Date(freeWeek.endsAt).toISOString(),
        },
        { status: 503 },
      );
    }

    // --- Phase 3: PAID ---
    const enabled =
      process.env.STRIPE_B00KMAKOR_ENABLED === "true" ||
      process.env.NEXT_PUBLIC_B00KMAKOR_ENABLED === "true";
    if (!enabled) {
      return NextResponse.json(
        {
          error: "b00kmakor-checkout-disabled",
          message:
            "B00KMAKR self-serve checkout is not yet activated. Email a.mccree@gmail.com with subject 'B00KMAKR purchase inquiry' to ship today.",
          inquire:
            "mailto:a.mccree@gmail.com?subject=B00KMAKR%20purchase%20inquiry",
        },
        { status: 503 },
      );
    }

    // --- Dynamic price resolution (country-aware via Vercel IP header) ---
    const country = detectCountry(req);
    const resolved = resolvePrice("b00kmakor", country);
    if (!resolved.ok) {
      return NextResponse.json(
        { error: "price resolution failed" },
        { status: 500 },
      );
    }

    const stripe = getStripe();
    const priceId = process.env.STRIPE_B00KMAKOR_PRICE_ID;

    // Build line_items — prefer real Stripe Price, fall back to dynamic
    // price_data based on the resolved country price.
    const line_items = priceId
      ? [{ price: priceId, quantity: 1 }]
      : [
          {
            quantity: 1,
            price_data: {
              currency: "usd" as const,
              unit_amount: resolved.usdCents,
              product_data: {
                name: "B00KMAKR v3.2.0 (Mac + Windows bundle)",
                description:
                  "AI publishing cockpit. Same app for Mac + Windows: universal HTML, smart launcher, PowerShell installer (Windows), Tauri native build (.dmg on Mac · .msi/.exe on Windows). 142 feature surfaces. PDF manual included (book-red Mac · blue Windows). $99 Tier 1 anchor · dynamic-world-pricing applied. Once · forever. §4A no-saas. 30-day Material Failure Guarantee.",
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
          key: "platform",
          label: {
            type: "custom",
            custom: "Which platform are you on?",
          },
          type: "dropdown",
          optional: false,
          dropdown: {
            options: [
              { label: "macOS (any · Intel or Apple Silicon)", value: "mac" },
              { label: "Windows 11 (x64)", value: "win11" },
              { label: "Windows 10 (x64)", value: "win10" },
              { label: "Both — send me the dual bundle", value: "both" },
            ],
          },
        },
        {
          key: "what_you_are_writing",
          label: {
            type: "custom",
            custom: "What are you writing? (optional — helps me help you)",
          },
          type: "text",
          optional: true,
        },
      ],
      automatic_tax: { enabled: false },
      allow_promotion_codes: true,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&sku=b00kmakor`,
      cancel_url: `${origin}/cancel?sku=b00kmakor`,
      metadata: {
        product: "b00kmakor",
        version: "v3.2.0",
        sku: "B00KMAKR_V3_2_0",
        price_cents: String(resolved.usdCents),
        price_dollars: String(resolved.usdCents / 100),
        resolved_country: resolved.countryCode ?? "unknown",
        resolved_tier: String(resolved.tier),
        pricing_source: resolved.source,
        pricing_law:
          "dynamic_world_pricing_§4A_no_saas_random_change_disclosed",
        license: "Commercial · §4A · MFG 30-day",
        bundle: "Mac + Windows (universal HTML + native installers)",
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
      sku: "B00KMAKR_V3_2_0",
      price: resolved.usdCents / 100,
      country: resolved.countryCode,
      tier: resolved.tier,
      source: resolved.source,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
