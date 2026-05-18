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

/**
 * PRICING LAW — ORANGEBOX is $1 forever.
 *
 * Operator decree 2026-05-17: the perpetual price is $1, full stop.
 * The launch coupon mechanism is retired — there is no $49 base anymore,
 * so there is nothing to discount.
 *
 * What we trade for the $1 price: every buyer hands us name, email,
 * postal address, phone, birthdate, and an opt-in marketing flag. The
 * buyer's Stripe Customer record is the source of truth — they can
 * update it any time via /account (Stripe Customer Portal).
 */
export const PRICE_USD_CENTS = 100;
export const PRODUCT_NAME = "ORANGEBOX Command v6.0.0";
export const PRODUCT_DESCRIPTION =
  "ORANGEBOX Command v6.0.0 — native 4.46 MB Rust + egui binary. No webview, no chromium. One file, double-click, 2-second launch. 11 lanes. Claude + GPT + Gemini + Groq LPUs + Ollama + OpenRouter. Windows 10/11. $1 once, forever. No subscription, ever. v1.x–v6.x updates free.";

/**
 * Legacy launch-coupon hook — retained ONLY for back-compat in metadata.
 * Always null going forward. Do not re-enable: $1 is the floor.
 */
export const STRIPE_LAUNCH_COUPON_ID = null as string | null;
