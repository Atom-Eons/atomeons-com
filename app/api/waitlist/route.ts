import { NextResponse } from "next/server";
import { serviceSupabase } from "@/lib/supabase";
import { createHash } from "crypto";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Waitlist endpoint for ORANGEBOX v6.3 "Silent Canvas".
 *
 * POST { email, source? } → inserts into orangebox_v63_waitlist (Supabase).
 *
 * Defenses:
 *   - rate-limited 5 req/min/IP (in-memory token bucket, shared lib)
 *   - email lower-cased + basic shape check
 *   - duplicate email returns { ok: false, duplicate: true } (not error;
 *     UI re-affirms standing)
 *   - IP hashed (sha256, no salt) for abuse forensics — never raw IP
 *   - user agent stored truncated 200 chars
 *
 * Public surface — no auth header. The rate limit is the gate.
 *
 * No marketing list. No drip. The waitlist is single-purpose: one
 * notification when v6.3 ships.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: Request) {
  // 1. Rate limit
  const ip = clientIp(req);
  const rl = rateLimit({
    key: `waitlist:${ip}`,
    limit: 5,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "rate-limited",
        retry_after_seconds: rl.retryAfterSeconds,
      },
      {
        status: 429,
        headers: rl.retryAfterSeconds
          ? { "Retry-After": String(rl.retryAfterSeconds) }
          : {},
      },
    );
  }

  // 2. Parse + validate
  let body: { email?: string; source?: string };
  try {
    body = (await req.json()) as { email?: string; source?: string };
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 },
    );
  }

  const source = (body.source ?? "").slice(0, 64) || null;
  const userAgent = (req.headers.get("user-agent") ?? "").slice(0, 200) || null;
  const ipHash = createHash("sha256").update(ip).digest("hex");

  // 3. Insert (Supabase enforces unique email at index level)
  const supabase = serviceSupabase();
  const { error } = await supabase.from("orangebox_v63_waitlist").insert({
    email,
    source,
    user_agent: userAgent,
    ip_hash: ipHash,
  });

  if (error) {
    // Postgres unique violation = 23505. Surface as duplicate, not error.
    if ((error as { code?: string }).code === "23505") {
      return NextResponse.json({ ok: false, duplicate: true });
    }
    return NextResponse.json(
      { ok: false, error: `Insert failed: ${error.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
