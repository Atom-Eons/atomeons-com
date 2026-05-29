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
 *   3. Read LETTER_PROVIDER env (default "anthropic") and dispatch to
 *      the chosen provider. Both providers return the same
 *      GeneratedPost shape.
 *   4. Slugify title, insert into Supabase founders_view_posts
 *      (status=published).
 *   5. Tweet the letter (failure-soft).
 *   6. Return summary (used by Vercel Cron logs).
 *
 * ─────────────────────────────────────────────────────────────────────
 * PROVIDER SWAP (operator runtime knob — no code change needed)
 * ─────────────────────────────────────────────────────────────────────
 * Set env var `LETTER_PROVIDER` to one of:
 *
 *   "anthropic"  (default) — uses ANTHROPIC_API_KEY +
 *                ANTHROPIC_FOUNDERS_VIEW_MODEL (default claude-sonnet-4-5)
 *   "openai"              — uses OPENAI_API_KEY +
 *                OPENAI_FOUNDERS_VIEW_MODEL (default gpt-5)
 *
 * The system + user prompts are identical across providers — both
 * receive FOUNDERS_VIEW_VOICE as the system message and the
 * buildUserPrompt() result as the user message, and both are asked
 * to return the same JSON envelope.
 *
 * To flip in production: Vercel dashboard → project → Environment
 * Variables → set LETTER_PROVIDER=openai → redeploy or wait for the
 * next cron tick. The Anthropic path stays available; flip back any
 * time. No code change. No re-deploy needed if you set it before the
 * next cron fires (Vercel reads env on each invocation).
 *
 * Manual fire: POST with Bearer ${CRON_SECRET} for testing — uses
 * whichever provider is currently configured.
 */

type LetterProvider = "anthropic" | "openai";

function getProvider(): LetterProvider {
  const raw = (process.env.LETTER_PROVIDER ?? "anthropic").toLowerCase();
  if (raw === "openai") return "openai";
  return "anthropic";
}

const ANTHROPIC_MODEL =
  process.env.ANTHROPIC_FOUNDERS_VIEW_MODEL ?? "claude-sonnet-4-5";
const OPENAI_MODEL =
  process.env.OPENAI_FOUNDERS_VIEW_MODEL ?? "gpt-5";

type GeneratedPost = {
  title: string;
  dek: string;
  theme: string;
  voice_tags: string[];
  body_md: string;
};

// ─────────────────────────────────────────────────────────────────────
// PROVIDER ADAPTERS — both return {raw, model, ms} on success
// ─────────────────────────────────────────────────────────────────────

type ProviderResult =
  | {
      ok: true;
      raw: string;
      model: string;
      ms: number;
    }
  | {
      ok: false;
      status: number;
      error: string;
      detail?: string;
    };

async function callAnthropic(args: {
  systemPrompt: string;
  userPrompt: string;
}): Promise<ProviderResult> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return {
      ok: false,
      status: 500,
      error: "ANTHROPIC_API_KEY not configured",
    };
  }
  const t0 = Date.now();
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 4096,
        temperature: 0.9,
        system: args.systemPrompt,
        messages: [{ role: "user", content: args.userPrompt }],
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      return {
        ok: false,
        status: 502,
        error: `Anthropic HTTP ${r.status}`,
        detail: detail.slice(0, 500),
      };
    }
    const body = (await r.json()) as {
      content: Array<{ type: string; text?: string }>;
    };
    const raw = body.content
      .filter((c) => c.type === "text")
      .map((c) => c.text ?? "")
      .join("")
      .trim();
    return { ok: true, raw, model: ANTHROPIC_MODEL, ms: Date.now() - t0 };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "fetch failed";
    return { ok: false, status: 502, error: `Anthropic fetch error: ${msg}` };
  }
}

async function callOpenAI(args: {
  systemPrompt: string;
  userPrompt: string;
}): Promise<ProviderResult> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return {
      ok: false,
      status: 500,
      error: "OPENAI_API_KEY not configured",
    };
  }
  const t0 = Date.now();
  try {
    // OpenAI chat completions API. response_format=json_object forces
    // valid JSON output (requires the word "JSON" to appear in the
    // prompt — buildUserPrompt() already includes it).
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        max_completion_tokens: 4096,
        temperature: 0.9,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: args.systemPrompt },
          { role: "user", content: args.userPrompt },
        ],
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      return {
        ok: false,
        status: 502,
        error: `OpenAI HTTP ${r.status}`,
        detail: detail.slice(0, 500),
      };
    }
    const body = (await r.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    const raw = body.choices?.[0]?.message?.content?.trim() ?? "";
    return { ok: true, raw, model: OPENAI_MODEL, ms: Date.now() - t0 };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "fetch failed";
    return { ok: false, status: 502, error: `OpenAI fetch error: ${msg}` };
  }
}

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

  // 2b. FETCH TODAY'S NEWS (failure-soft — empty bundle is OK)
  const newsContext = await fetchDailyNewsContext().catch(() => ({
    markdown: "",
    feed_count: 0,
    story_count: 0,
    beats: [],
    fetched_at: new Date().toISOString(),
  }));

  // 3. CALL THE CHOSEN PROVIDER
  const provider = getProvider();
  const today = new Date();
  const userPrompt = buildUserPrompt(today, newsContext.markdown);

  const result =
    provider === "openai"
      ? await callOpenAI({
          systemPrompt: FOUNDERS_VIEW_VOICE,
          userPrompt,
        })
      : await callAnthropic({
          systemPrompt: FOUNDERS_VIEW_VOICE,
          userPrompt,
        });

  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.error,
        detail: result.detail,
        provider,
      },
      { status: result.status },
    );
  }

  // 4. PARSE THE JSON ENVELOPE
  // Strip code fences if a provider added them (Anthropic sometimes
  // does; OpenAI in json_object mode does not, but be defensive).
  const cleaned = result.raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();

  let post: GeneratedPost;
  try {
    post = JSON.parse(cleaned) as GeneratedPost;
  } catch {
    return NextResponse.json(
      {
        error: `${provider} returned non-JSON body`,
        provider,
        model: result.model,
        raw_preview: result.raw.slice(0, 500),
      },
      { status: 502 },
    );
  }

  if (!post.title || !post.body_md) {
    return NextResponse.json(
      {
        error: `${provider} payload missing title or body_md`,
        provider,
        model: result.model,
        post,
      },
      { status: 502 },
    );
  }

  // 5. INSERT INTO SUPABASE
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
      model_used: `${provider}:${result.model}`,
      generation_ms: result.ms,
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

  // 6. TWEET (failure-soft — letter remains published if tweet fails)
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://atomeons.com";
  const letterUrl = `${siteUrl}/founders-view/${slug}`;
  const tweetResult = await tweetLetter({
    title: post.title,
    dek: post.dek,
    letterUrl,
  });

  // 7. REPORT
  return NextResponse.json({
    ok: true,
    id: data?.id,
    slug: data?.slug,
    title: post.title,
    theme: post.theme,
    word_count,
    generation_ms: result.ms,
    provider,
    model: result.model,
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
