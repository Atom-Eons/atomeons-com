import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { mintDownloadToken } from "@/lib/token";
import { sendDownloadEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json(
      { error: "Missing signature or webhook secret" },
      { status: 400 },
    );
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(raw, sig, secret);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid signature";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true, type: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const email =
    session.customer_details?.email ??
    session.customer_email ??
    null;

  if (!email) {
    return NextResponse.json(
      { received: true, warn: "no email on session", id: session.id },
      { status: 200 },
    );
  }

  const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
  const token = mintDownloadToken({
    email,
    sessionId: session.id,
    exp,
  });

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://atomeons.com";
  const downloadUrl = `${origin}/api/download?t=${encodeURIComponent(token)}`;

  const sendResult = await sendDownloadEmail({
    to: email,
    downloadUrl,
    sessionId: session.id,
  });

  return NextResponse.json({
    received: true,
    sent: sendResult.ok,
    via: sendResult.via,
    error: sendResult.error,
  });
}
