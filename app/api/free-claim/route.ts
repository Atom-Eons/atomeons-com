import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { computePrice } from "@/lib/pricing";
import { mintDownloadToken } from "@/lib/token";
import { sendDownloadEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Free-claim endpoint — the FREE-first-7-days launch promo.
 *
 * Bypasses Stripe entirely during the promo window. Captures email,
 * mints a 30-day HMAC-signed download token, emails the link via the
 * existing email pipeline (Loops first, Resend fallback).
 *
 * Gates:
 *   - Refuses if computePrice().isFreePromo is false. The window closed.
 *   - Rate limit: 3 requests / 10 minutes / IP (anti-spam).
 *   - Email regex sanity (no full validation — that's the inbox's job).
 *
 * Failure-soft on email send: returns 200 with email_error so the UI
 * can surface "check your inbox; if it doesn't arrive, try /support".
 *
 * Doctrine: NEVER mint a token if the promo isn't active. The downside
 * of a wrongly-issued free token is brand. The downside of a missed
 * legitimate claim is one support ticket.
 */

const FREE_TOKEN_TTL_DAYS = 30;
const EMAIL_RX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

type FreeClaimBody = { email?: string };

export async function POST(req: Request) {
  // 1. Rate limit by IP — 3 per 10min
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rl = rateLimit({
    key: `free-claim:${ip}`,
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });
  if (!rl.allowed) {
    return NextResponse.json(
      {
        error: "rate-limited",
        retry_after_seconds: rl.retryAfterSeconds ?? 600,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rl.retryAfterSeconds ?? 600),
        },
      },
    );
  }

  // 2. Promo gate
  const price = computePrice(0);
  if (!price.isFreePromo) {
    return NextResponse.json(
      {
        error: "promo-closed",
        message:
          "The FREE first-7-days launch window has ended. Standard $1 checkout is available.",
        promo_ended_at: price.promoEndsAt,
      },
      { status: 403 },
    );
  }

  // 3. Body parse + email sanity
  let body: FreeClaimBody;
  try {
    body = (await req.json()) as FreeClaimBody;
  } catch {
    return NextResponse.json({ error: "invalid-body" }, { status: 400 });
  }
  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RX.test(email)) {
    return NextResponse.json(
      { error: "invalid-email" },
      { status: 400 },
    );
  }

  // 4. Mint a download token — 30-day exp from now
  const sessionId = `free_${randomBytes(8).toString("hex")}`;
  const exp = Math.floor(Date.now() / 1000) + FREE_TOKEN_TTL_DAYS * 86400;
  let token: string;
  try {
    token = mintDownloadToken({ email, sessionId, exp });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "token-mint-failed";
    return NextResponse.json(
      { error: "token-mint-failed", detail: msg.slice(0, 120) },
      { status: 503 },
    );
  }

  const origin = req.headers.get("origin") ?? "https://atomeons.com";
  const downloadUrl = `${origin}/api/download?t=${encodeURIComponent(token)}`;

  // 5. Send email — failure-soft
  const emailResult = await sendDownloadEmail({
    to: email,
    downloadUrl,
    sessionId,
  });

  // 6. Receipt
  return NextResponse.json({
    ok: true,
    session_id: sessionId,
    expires_at: new Date(exp * 1000).toISOString(),
    promo_ends_at: price.promoEndsAt,
    email_via: emailResult.via,
    email_ok: emailResult.ok,
    ...(emailResult.error ? { email_error: emailResult.error } : {}),
    // Operator-discoverable in case the email send fails — buyer can
    // copy this URL directly from the success state UI.
    download_url: downloadUrl,
  });
}
