import { NextResponse } from "next/server";
import { tweetReply } from "@/lib/twitter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 15;

/**
 * Admin reply-tweet endpoint.
 *
 * Posts a reply from @AtomMccree under an existing tweet (typically
 * another account's news announcement). Used when the operator wants
 * the lab's take threaded under an external post.
 *
 * Auth: Bearer ${CRON_SECRET}.
 * Body: { text: string, in_reply_to_tweet_id: string }
 *
 * NOT public. NOT rate-limited (admin path).
 *
 * Failure-soft via lib/twitter.ts tweetReply().
 */

type Body = {
  text?: string;
  in_reply_to_tweet_id?: string;
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

  const text = (body.text ?? "").trim();
  const inReplyToTweetId = (body.in_reply_to_tweet_id ?? "").trim();

  if (!text || !inReplyToTweetId) {
    return NextResponse.json(
      { error: "text + in_reply_to_tweet_id required" },
      { status: 400 },
    );
  }
  // Tweet ID format: digits only, ~19 chars max
  if (!/^\d+$/.test(inReplyToTweetId)) {
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

  const result = await tweetReply({ text, inReplyToTweetId });
  return NextResponse.json(result);
}
