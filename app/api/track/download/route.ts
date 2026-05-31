import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { serviceSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

/**
 * /api/track/download — privacy-preserving launch download tracker.
 *
 * Fire-and-forget POST from client-side download click handlers. Records
 * one row in public.download_events with bucketed UA + hashed IP +
 * country (from Vercel edge geolocation header).
 *
 * Privacy posture:
 *   - Raw IP never stored (SHA-256 hashed for coarse dedup only).
 *   - Raw UA never stored (bucketed to mac/windows/linux/mobile/other).
 *   - Country comes from x-vercel-ip-country header (already in request
 *     stream — no third-party lookup, no cookie).
 *   - No request body required beyond {product, platform, surface}.
 *
 * Latency posture: the client fires this with keepalive:true so the
 * browser sends it as the page navigates to the blob download. We do
 * not block the download on this call. The response is a 202 Accepted
 * which the client ignores.
 *
 * Abuse posture: per-IP rate limit (60 events / minute) via an in-memory
 * counter. Anyone trying to inflate the counter from one machine hits
 * the cap quickly; from a distributed botnet there's nothing to defend
 * — the launch counter is a vanity signal, not a billing surface.
 */

type TrackBody = {
  product?: string;
  platform?: string;
  surface?: string;
};

const ALLOWED_PRODUCT = new Set(["orangebox", "b00kmakor"]);
const ALLOWED_PLATFORM = new Set([
  "windows",
  "mac",
  "manual-mac",
  "manual-win",
  "cert",
  "unknown",
]);
const ALLOWED_SURFACE = new Set([
  "launch-banner",
  "home-tiles",
  "product-page",
  "download-page",
  "press",
  "other",
]);

function bucketUserAgent(ua: string): string {
  const s = ua.toLowerCase();
  if (s.includes("mobile") || s.includes("android") || s.includes("iphone")) return "mobile";
  if (s.includes("mac os x") || s.includes("macintosh")) return "mac";
  if (s.includes("windows")) return "windows";
  if (s.includes("linux") || s.includes("ubuntu") || s.includes("fedora")) return "linux";
  return "other";
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

// Tiny in-process per-IP rate limiter. Resets on cold-boot which is fine
// at indie scale — this is a vanity counter, not a payment gate.
const ratebuckets = new Map<string, { count: number; resetAt: number }>();
function rateLimited(ipHash: string, now: number): boolean {
  const b = ratebuckets.get(ipHash);
  if (!b || now >= b.resetAt) {
    ratebuckets.set(ipHash, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  b.count += 1;
  if (b.count > 60) return true;
  return false;
}

function refererHost(ref: string | null): string | null {
  if (!ref) return null;
  try {
    return new URL(ref).host;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  let body: TrackBody;
  try {
    body = (await req.json()) as TrackBody;
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const product = (body.product ?? "").toLowerCase();
  const platform = (body.platform ?? "").toLowerCase();
  const surface = (body.surface ?? "other").toLowerCase();

  if (!ALLOWED_PRODUCT.has(product)) {
    return NextResponse.json({ ok: false, error: "bad product" }, { status: 400 });
  }
  if (!ALLOWED_PLATFORM.has(platform)) {
    return NextResponse.json({ ok: false, error: "bad platform" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "0.0.0.0";
  const ipHash = hashIp(ip);

  const now = Date.now();
  if (rateLimited(ipHash, now)) {
    return NextResponse.json({ ok: false, error: "rate-limited" }, { status: 429 });
  }

  const country = req.headers.get("x-vercel-ip-country") ?? null;
  const ua = req.headers.get("user-agent") ?? "";
  const ua_bucket = bucketUserAgent(ua);
  const referer = req.headers.get("referer");
  const referer_host = refererHost(referer);

  try {
    const supabase = serviceSupabase();
    const { error } = await supabase.from("download_events").insert({
      product,
      platform,
      surface: ALLOWED_SURFACE.has(surface) ? surface : "other",
      country,
      ua_bucket,
      ip_hash: ipHash,
      referer_host,
    });
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 202 });
}
