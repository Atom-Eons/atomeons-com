import { NextResponse } from "next/server";
import {
  getStripe,
  PRICE_USD_CENTS,
  PRODUCT_NAME,
  PRODUCT_DESCRIPTION,
} from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // SECURITY: hardcoded from env, never trust the request Origin header.
    // Trusting Origin allows a crafted POST to redirect Stripe success_url to
    // an attacker domain and leak the session_id.
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atomeons.com";
    void req; // keep req in signature; do not read Origin from it.

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: PRICE_USD_CENTS,
            product_data: {
              name: PRODUCT_NAME,
              description: PRODUCT_DESCRIPTION,
            },
          },
        },
      ],
      allow_promotion_codes: false,
      automatic_tax: { enabled: false },
      billing_address_collection: "auto",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        product: "orangebox",
        version: "v1-prototype",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe returned no session URL" },
        { status: 500 },
      );
    }
    return NextResponse.json({ url: session.url, id: session.id });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
