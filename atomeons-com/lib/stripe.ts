import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to Vercel env vars before processing payments.",
    );
  }
  _stripe = new Stripe(key, { typescript: true });
  return _stripe;
}

export const PRICE_USD_CENTS = 4900;
export const PRODUCT_NAME = "ORANGEBOX Command v1.5.0";
export const PRODUCT_DESCRIPTION =
  "ORANGEBOX Command v1.5.0 — Faster · Smarter · Cached. The AI cockpit you actually own. Windows 10/11 + Node.js 20+. $49 once, forever. No subscription.";

/**
 * V5 LAUNCH PROMO — $1 TILL 6AM ET.
 *
 * Create coupon in Stripe Dashboard before launch:
 *   Stripe → Coupons → Create coupon
 *   ID: OBOXV5DOLLAR
 *   Type: Fixed amount discount
 *   Amount: $48.00 (off $49 base → final $1.00)
 *   Currency: USD
 *   Duration: Once
 *   Redeem by: 2026-05-17T10:00:00Z (6am ET = window close)
 *   Max redemptions: leave blank (unlimited until expiry)
 *
 * Then set STRIPE_LAUNCH_COUPON_ID=OBOXV5DOLLAR in Vercel env.
 * Applies automatically at checkout. After 6am ET coupon expires server-side
 * and Stripe rejects it gracefully — checkout falls back to $49 full price.
 */
export const STRIPE_LAUNCH_COUPON_ID =
  process.env.STRIPE_LAUNCH_COUPON_ID ?? null;
