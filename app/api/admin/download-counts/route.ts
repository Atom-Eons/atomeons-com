import { NextResponse } from "next/server";
import { serviceSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 15;

/**
 * /api/admin/download-counts — operator-only summary of download events.
 *
 * Auth: Bearer ${CRON_SECRET} (same secret used by publish-letter).
 *
 * Returns aggregate counts by product / platform / surface / country,
 * plus a running total and the last 10 events.
 *
 * Usage:
 *   curl -H "Authorization: Bearer $CRON_SECRET" \
 *        https://atomeons.com/api/admin/download-counts
 */
export async function GET(req: Request) {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 503 },
    );
  }
  const auth = req.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = serviceSupabase();

  const [allRes, recentRes] = await Promise.all([
    supabase.from("download_events").select("product, platform, surface, country"),
    supabase
      .from("download_events")
      .select("created_at, product, platform, surface, country, ua_bucket")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  if (allRes.error) {
    return NextResponse.json({ error: allRes.error.message }, { status: 500 });
  }

  const rows = allRes.data ?? [];
  const total = rows.length;

  // Aggregate buckets
  const by = (key: "product" | "platform" | "surface" | "country") => {
    const m = new Map<string, number>();
    for (const r of rows) {
      const k = ((r as Record<string, unknown>)[key] as string | null) ?? "(unknown)";
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return Object.fromEntries(
      Array.from(m.entries()).sort((a, b) => b[1] - a[1]),
    );
  };

  return NextResponse.json(
    {
      ok: true,
      total,
      by_product: by("product"),
      by_platform: by("platform"),
      by_surface: by("surface"),
      by_country: by("country"),
      recent: recentRes.data ?? [],
    },
    { headers: { "cache-control": "no-store" } },
  );
}
