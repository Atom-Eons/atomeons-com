import { NextResponse } from "next/server";
import { serviceSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * Admin update endpoint — overwrite an existing Founder's View letter
 * without re-tweeting.
 *
 * Companion to /api/admin/publish-letter. The publish endpoint inserts
 * + auto-tweets. This one only updates. Used when a publish goes out
 * with the wrong body (e.g. a parser bug truncates the body) and the
 * letter row needs to be patched in-place. The tweet that already went
 * out cannot be edited from this surface — that's an X platform limit.
 *
 * Auth: Bearer ${CRON_SECRET} (same gate as the cron + publish-letter).
 *
 * Body: { id?, slug?, title?, dek?, body_md?, theme?, voice_tags? }
 *   - Either `id` or `slug` is required to find the row.
 *   - Any other field is optional; only provided fields are written.
 *   - word_count auto-recomputes when body_md is supplied.
 *
 * Returns the updated row.
 *
 * NOT a public surface. NOT discoverable from any client component.
 */

type UpdateBody = {
  id?: string;
  slug?: string;
  title?: string;
  dek?: string | null;
  body_md?: string;
  theme?: string | null;
  voice_tags?: string[];
};

export async function POST(req: Request) {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured — refusing to run." },
      { status: 503 },
    );
  }
  const auth = req.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: UpdateBody;
  try {
    body = (await req.json()) as UpdateBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!body.id && !body.slug) {
    return NextResponse.json(
      { error: "Either `id` or `slug` is required to find the row." },
      { status: 400 },
    );
  }

  const patch: Record<string, unknown> = {};
  if (body.title !== undefined) patch.title = body.title;
  if (body.dek !== undefined) patch.dek = body.dek;
  if (body.body_md !== undefined) {
    patch.body_md = body.body_md;
    patch.word_count = body.body_md.split(/\s+/).filter(Boolean).length;
  }
  if (body.theme !== undefined) patch.theme = body.theme;
  if (body.voice_tags !== undefined) patch.voice_tags = body.voice_tags;

  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { error: "No updatable fields supplied." },
      { status: 400 },
    );
  }

  const supabase = serviceSupabase();
  const matchKey = body.id ? "id" : "slug";
  const matchValue = body.id ?? body.slug!;

  const { data, error } = await supabase
    .from("founders_view_posts")
    .update(patch)
    .eq(matchKey, matchValue)
    .select("id, slug, title, word_count, published_at")
    .single();

  if (error) {
    return NextResponse.json(
      { error: `Supabase update failed: ${error.message}` },
      { status: 500 },
    );
  }
  if (!data) {
    return NextResponse.json(
      { error: `No row matched ${matchKey}=${matchValue}` },
      { status: 404 },
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://atomeons.com";
  return NextResponse.json({
    ok: true,
    id: data.id,
    slug: data.slug,
    title: data.title,
    word_count: data.word_count,
    letter_url: `${siteUrl}/founders-view/${data.slug}`,
    published_at: data.published_at,
    updated_fields: Object.keys(patch),
  });
}
