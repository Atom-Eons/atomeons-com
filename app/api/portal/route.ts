import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe Customer Portal session opener.
 *
 * Flow:
 *   1. Buyer enters their purchase email at /account.
 *   2. We look up the Stripe Customer by email (most-recent match wins).
 *   3. If found → mint a Customer Portal session → redirect.
 *   4. If not found → 404 with a helpful message.
 *
 * The portal lets the buyer update name, address, phone, payment method,
 * cancel marketing emails, and (when they buy again) reuse the same
 * customer record — no re-typing.
 *
 * Requires STRIPE_SECRET_KEY in env. Customer Portal config must be saved
 * once in Stripe Dashboard → Settings → Billing → Customer portal.
 */
export async function POST(req: Request) {
  try {
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atomeons.com";

    // --- rate limit: 5 requests per minute per IP ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rl = rateLimit({ key: `portal:${ip}`, limit: 5, windowMs: 60_000 });
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "rate-limited", retry_after_seconds: rl.retryAfterSeconds },
        {
          status: 429,
          headers: { "Retry-After": String(rl.retryAfterSeconds ?? 60) },
        },
      );
    }

    const body = await req.json().catch(() => ({}));
    const emailRaw = typeof body?.email === "string" ? body.email : "";
    const email = emailRaw.trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Enter the email you used at checkout." },
        { status: 400 },
      );
    }

    const stripe = getStripe();
    const customers = await stripe.customers.list({ email, limit: 5 });
    // Take the most-recently-created match (Stripe sorts desc by created).
    const customer = customers.data[0];
    if (!customer) {
      return NextResponse.json(
        {
          error:
            "No ORANGEBOX purchase found for that email. Try the address on your Stripe receipt, or email a.mccree@gmail.com.",
        },
        { status: 404 },
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${origin}/account?returned=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
