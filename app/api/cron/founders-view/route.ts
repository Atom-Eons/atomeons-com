import { NextResponse } from "next/server";
import { serviceSupabase } from "@/lib/supabase";
import {
  FOUNDERS_VIEW_VOICE,
  buildUserPrompt,
} from "@/lib/founders-view-prompt";
import { fetchDailyNewsContext } from "@/lib/news-fetcher";
import { tweetLetter } from "@/lib/twitter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // seconds — Vercel Cron timeout

/**
 * Autonomous nightly broadcast generator — fires daily at 00:00 UTC
 * (8pm ET during EDT, 7pm during EST) per vercel.json crons schedule.
 *
 * Flow:
 *   1. Auth: header `authorization: Bearer <CRON_SECRET>`. Vercel Cron
 *      sets this automatically when CRON_SECRET env is configured.
 *   2. Check FOUNDERS_VIEW_PAUSE — kill switch. If "true", skip silently.
 *   3. Call Anthropic Sonnet with the voice prompt → JSON post body.
 *   4. Slugify title, insert into Supabase founders_view_posts (status=published).
 *   5. Return summary (used by Vercel Cron logs).
 *
 * Manual fire: POST with the same Bearer for testing.
 * GET also accepted (Vercel Cron fires GET by default).
 */

const ANTHROPIC_MODEL =
  process.env.ANTHROPIC_FOUNDERS_VIEW_MODEL ??
  "claude-sonnet-4-5"; // operator: bump to latest Sonnet ID when released

type AnthropicResponse = {
  content: Array<{ type: string; text?: string }>;
  stop_reason?: string;
  usage?: { input_tokens: number; output_tokens: number };
};

type GeneratedPost = {
  title: string;
  dek: string;
  theme: string;
  voice_tags: string[];
  body_md: string;
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
  const d = new Date();
  const tag = d.toISOString().slice(0, 10);
  return `${tag}-${base}`;
}

async function handle(req: Request) {
  // 1. AUTH
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

  // 2. KILL SWITCH
  if (process.env.FOUNDERS_VIEW_PAUSE === "true") {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: "FOUNDERS_VIEW_PAUSE=true",
    });
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 },
    );
  }

  // 2b. FETCH TODAY'S NEWS (failure-soft — empty bundle is OK)
  const newsContext = await fetchDailyNewsContext().catch(() => ({
    markdown: "",
    feed_count: 0,
    story_count: 0,
    beats: [],
    fetched_at: new Date().toISOString(),
  }));

  // 3. CALL SONNET
  const t0 = Date.now();
  const today = new Date();
  let body: AnthropicResponse;
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 4096,
        temperature: 0.9,
        system: FOUNDERS_VIEW_VOICE,
        messages: [
          {
            role: "user",
            content: buildUserPrompt(today, newsContext.markdown),
          },
        ],
      }),
    });
    if (!r.ok) {
      const errText = await r.text().catch(() => "");
      return NextResponse.json(
        {
          error: `Anthropic HTTP ${r.status}`,
          detail: errText.slice(0, 500),
        },
        { status: 502 },
      );
    }
    body = (await r.json()) as AnthropicResponse;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "fetch failed";
    return NextResponse.json(
      { error: `Anthropic fetch error: ${msg}` },
      { status: 502 },
    );
  }
  const generation_ms = Date.now() - t0;

  // Extract assistant text + parse JSON envelope
  const rawText = body.content
    .filter((c) => c.type === "text")
    .map((c) => c.text ?? "")
    .join("")
    .trim();
  // strip ```json fences if Sonnet added them
  const cleaned = rawText
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();

  let post: GeneratedPost;
  try {
    post = JSON.parse(cleaned) as GeneratedPost;
  } catch {
    return NextResponse.json(
      {
        error: "Sonnet returned non-JSON body",
        raw_preview: rawText.slice(0, 500),
      },
      { status: 502 },
    );
  }

  if (!post.title || !post.body_md) {
    return NextResponse.json(
      { error: "Sonnet payload missing title or body_md", post },
      { status: 502 },
    );
  }

  // 4. INSERT
  const slug = withDateSuffix(slugify(post.title));
  const word_count = post.body_md.split(/\s+/).filter(Boolean).length;

  const supabase = serviceSupabase();
  const { data, error } = await supabase
    .from("founders_view_posts")
    .insert({
      slug,
      title: post.title,
      dek: post.dek ?? null,
      body_md: post.body_md,
      voice_tags: post.voice_tags ?? [],
      theme: post.theme ?? null,
      word_count,
      model_used: ANTHROPIC_MODEL,
      generation_ms,
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

  // 5. TWEET (failure-soft — letter remains published if tweet fails)
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://atomeons.com";
  const letterUrl = `${siteUrl}/founders-view/${slug}`;
  const tweetResult = await tweetLetter({
    title: post.title,
    dek: post.dek,
    letterUrl,
  });

  // 6. REPORT
  return NextResponse.json({
    ok: true,
    id: data?.id,
    slug: data?.slug,
    title: post.title,
    theme: post.theme,
    word_count,
    generation_ms,
    model: ANTHROPIC_MODEL,
    published_at: data?.published_at,
    news: {
      feed_count: newsContext.feed_count,
      story_count: newsContext.story_count,
      beats: newsContext.beats,
      fetched_at: newsContext.fetched_at,
    },
    twitter: tweetResult,
  });
}

export async function GET(req: Request) {
  return handle(req);
}
export async function POST(req: Request) {
  return handle(req);
}
