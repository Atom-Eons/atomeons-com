import { NextResponse } from "next/server";
import { tweetReply, tweetQuote, deleteTweet } from "@/lib/twitter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 15;

/**
 * Admin tweet-action endpoint (multi-mode).
 *
 * Auth: Bearer ${CRON_SECRET}.
 *
 * Body shapes:
 *   { text, in_reply_to_tweet_id }                — mode defaults to "reply"
 *   { text, in_reply_to_tweet_id, mode: "reply" } — explicit reply
 *   { text, quote_tweet_id, mode: "quote" }       — quote tweet (bypasses
 *                                                   parent author's reply
 *                                                   restrictions)
 *   { tweet_id, mode: "delete" }                  — delete a tweet by ID
 *                                                   (text optional, ignored)
 *
 * NOT public. NOT rate-limited (admin path).
 *
 * The route stays at /api/admin/reply-tweet for backward compat with
 * existing call sites — the original reply mode still works without
 * a mode parameter.
 */

type Mode = "reply" | "quote" | "delete";

type Body = {
  mode?: Mode;
  text?: string;
  in_reply_to_tweet_id?: string;
  quote_tweet_id?: string;
  tweet_id?: string;
};

export async function POST(req: Request) {
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

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const mode: Mode = body.mode ?? "reply";
  const numeric = /^\d+$/;

  if (mode === "reply") {
    const text = (body.text ?? "").trim();
    const id = (body.in_reply_to_tweet_id ?? "").trim();
    if (!text || !id) {
      return NextResponse.json(
        { error: "reply mode requires text + in_reply_to_tweet_id" },
        { status: 400 },
      );
    }
    if (!numeric.test(id)) {
      return NextResponse.json(
        { error: "in_reply_to_tweet_id must be numeric" },
        { status: 400 },
      );
    }
    if (text.length > 280) {
      return NextResponse.json(
        { error: `text length ${text.length} > 280` },
        { status: 400 },
      );
    }
    const result = await tweetReply({ text, inReplyToTweetId: id });
    return NextResponse.json(result);
  }

  if (mode === "quote") {
    const text = (body.text ?? "").trim();
    const id = (body.quote_tweet_id ?? "").trim();
    if (!text || !id) {
      return NextResponse.json(
        { error: "quote mode requires text + quote_tweet_id" },
        { status: 400 },
      );
    }
    if (!numeric.test(id)) {
      return NextResponse.json(
        { error: "quote_tweet_id must be numeric" },
        { status: 400 },
      );
    }
    if (text.length > 280) {
      return NextResponse.json(
        { error: `text length ${text.length} > 280` },
        { status: 400 },
      );
    }
    const result = await tweetQuote({ text, quoteTweetId: id });
    return NextResponse.json(result);
  }

  if (mode === "delete") {
    const id = (body.tweet_id ?? body.in_reply_to_tweet_id ?? "").trim();
    if (!id) {
      return NextResponse.json(
        { error: "delete mode requires tweet_id" },
        { status: 400 },
      );
    }
    if (!numeric.test(id)) {
      return NextResponse.json(
        { error: "tweet_id must be numeric" },
        { status: 400 },
      );
    }
    const result = await deleteTweet({ tweetId: id });
    return NextResponse.json(result);
  }

  return NextResponse.json(
    { error: `unknown mode: ${mode}` },
    { status: 400 },
  );
}
