import { NextResponse } from "next/server";
import { serviceSupabase } from "@/lib/supabase";
import { tweetLetter } from "@/lib/twitter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * Admin publish endpoint — manual letter ship.
 *
 * Used when the autonomous nightly cron fails (e.g. Anthropic balance
 * out, Sonnet outage, model regression) and the operator wants to
 * publish a hand-written or alternately-sourced Founder's View letter
 * without modifying the cron route or restoring credits.
 *
 * Auth: Bearer ${CRON_SECRET} (same secret as the cron — no separate
 * surface). Refuses 503 if CRON_SECRET is unset.
 *
 * Flow:
 *   1. POST { title, dek?, body_md, theme?, voice_tags? }
 *   2. Slugify title → withDateSuffix
 *   3. Insert into founders_view_posts (status=published)
 *   4. tweetLetter() → failure-soft
 *   5. Return receipt
 *
 * NOT a public surface. NOT rate-limited (admin path, single-caller).
 * NOT discoverable from any client component.
 */

type PublishBody = {
  title: string;
  dek?: string | null;
  body_md: string;
  theme?: string | null;
  voice_tags?: string[];
  model_used?: string;
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function withDateSuffix(base: string): string {
  const tag = new Date().toISOString().slice(0, 10);
  return `${tag}-${base}`;
}

async function handle(req: Request) {
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

  let body: PublishBody;
  try {
    body = (await req.json()) as PublishBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!body.title || !body.body_md) {
    return NextResponse.json(
      { error: "title and body_md are required" },
      { status: 400 },
    );
  }

  const slug = withDateSuffix(slugify(body.title));
  const word_count = body.body_md.split(/\s+/).filter(Boolean).length;

  const supabase = serviceSupabase();
  const { data, error } = await supabase
    .from("founders_view_posts")
    .insert({
      slug,
      title: body.title,
      dek: body.dek ?? null,
      body_md: body.body_md,
      voice_tags: body.voice_tags ?? [],
      theme: body.theme ?? null,
      word_count,
      model_used: body.model_used ?? "manual-blend",
      generation_ms: 0,
      status: "published",
    })
    .select("id, slug, published_at")
    .single();

  if (error) {
    return NextResponse.json(
      { error: `Supabase insert failed: ${error.message}` },
      { status: 500 },
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://atomeons.com";
  const letterUrl = `${siteUrl}/founders-view/${slug}`;
  const tweetResult = await tweetLetter({
    title: body.title,
    dek: body.dek ?? null,
    letterUrl,
  });

  return NextResponse.json({
    ok: true,
    id: data?.id,
    slug: data?.slug,
    title: body.title,
    word_count,
    letter_url: letterUrl,
    published_at: data?.published_at,
    twitter: tweetResult,
  });
}

export async function POST(req: Request) {
  return handle(req);
}
