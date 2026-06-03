import { NextResponse } from "next/server";
import { serviceSupabase } from "@/lib/supabase";
import { createHash } from "crypto";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Cyber training subscribe endpoint.
 *
 * POST { email, source?, persona? } → inserts into cyber_subscribers (Supabase).
 *
 * Powers the email capture on /learn/cyber/start. Each row becomes a
 * future marketing-list send (email-series drip on the cyber career
 * track) + a lead-list the operator can export for outreach.
 *
 * Source values used in production:
 *   - "cyber-start" — primary /learn/cyber/start page
 *   - "cyber-path" — /learn/cyber/path CTA
 *   - "cyber-labs" — /learn/cyber/labs CTA
 *   - "cyber-hackerone" — /learn/cyber/hackerone CTA
 *   - "cyber-employers" — /learn/cyber/employers CTA
 *
 * Persona values are free-text but UI will offer: "student",
 * "self-taught", "career-switcher", "vet", "professional".
 *
 * Defenses:
 *   - rate-limited 5 req/min/IP (shared lib token bucket)
 *   - email lower-cased + shape check + length cap
 *   - duplicate email returns { ok: false, duplicate: true } (UI shows
 *     "already on the list" — never an error)
 *   - IP hashed (sha256) for abuse forensics — never raw IP
 *   - user agent stored truncated 200 chars
 *
 * Public surface — no auth header. Rate limit is the gate.
 *
 * Supabase migration to run BEFORE this ships (operator paste in SQL editor):
 *
 *   create table public.cyber_subscribers (
 *     id           uuid primary key default gen_random_uuid(),
 *     created_at   timestamptz not null default now(),
 *     email        text not null unique,
 *     source       text,
 *     persona      text,
 *     user_agent   text,
 *     ip_hash      text,
 *     consent_text text,
 *     unsubscribed boolean not null default false
 *   );
 *   create index cyber_subscribers_created_at on public.cyber_subscribers (created_at desc);
 *   alter table public.cyber_subscribers enable row level security;
 *   -- service-role inserts only; no anon read
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
  const ip = clientIp(req);
  const rl = rateLimit({
    key: `cyber-subscribe:${ip}`,
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

  let body: { email?: string; source?: string; persona?: string };
  try {
    body = (await req.json()) as {
      email?: string;
      source?: string;
      persona?: string;
    };
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
  const persona = (body.persona ?? "").slice(0, 32) || null;
  const userAgent = (req.headers.get("user-agent") ?? "").slice(0, 200) || null;
  const ipHash = createHash("sha256").update(ip).digest("hex");
  const consentText =
    "I want the AtomEons cyber career track and updates on new cyber education content. I can unsubscribe at any time.";

  const supabase = serviceSupabase();
  const { error } = await supabase.from("cyber_subscribers").insert({
    email,
    source,
    persona,
    user_agent: userAgent,
    ip_hash: ipHash,
    consent_text: consentText,
  });

  if (error) {
    if ((error as { code?: string }).code === "23505") {
      return NextResponse.json({ ok: false, duplicate: true });
    }
    if ((error as { code?: string }).code === "42P01") {
      // Table doesn't exist yet — return clear error to operator
      return NextResponse.json(
        {
          ok: false,
          error:
            "cyber_subscribers table not yet created. See /api/cyber/subscribe route.ts header for migration SQL.",
        },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { ok: false, error: `Insert failed: ${error.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
