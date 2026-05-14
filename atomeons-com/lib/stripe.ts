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
export const PRODUCT_NAME = "ORANGEBOX OS v1.4.0";
export const PRODUCT_DESCRIPTION =
  "ORANGEBOX OS All-In-One v1.4.0. Local-first command cockpit for one operator. Node 18+. No support.";
