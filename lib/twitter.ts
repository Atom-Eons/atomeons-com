import { TwitterApi } from "twitter-api-v2";

/**
 * Twitter / X v2 client for the Founder's View autonomous post.
 *
 * Auth: OAuth 1.0a user context — the only flow that can write tweets
 * on behalf of @AtomMccree without a per-tweet manual approval.
 *
 * Required env vars (all four must be set):
 *   TWITTER_API_KEY              — app consumer key
 *   TWITTER_API_SECRET           — app consumer secret
 *   TWITTER_ACCESS_TOKEN         — @AtomMccree's user access token
 *   TWITTER_ACCESS_TOKEN_SECRET  — @AtomMccree's user access token secret
 *
 * Get all four from developer.x.com → Projects & Apps → AtomEons app
 * → Keys and tokens. The user tokens must be regenerated with
 * read+write permissions (the default is read-only).
 *
 * Optional kill switch:
 *   FOUNDERS_VIEW_TWEET_PAUSE=true   skip the tweet without failing
 */

let _client: TwitterApi | null = null;

function getClient(): TwitterApi | null {
  if (_client) return _client;
  const appKey = process.env.TWITTER_API_KEY;
  const appSecret = process.env.TWITTER_API_SECRET;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;
  const accessSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
  if (!appKey || !appSecret || !accessToken || !accessSecret) {
    return null;
  }
  _client = new TwitterApi({ appKey, appSecret, accessToken, accessSecret });
  return _client;
}

const TWEET_MAX = 280;
const URL_LEN = 23; // X always counts URLs as 23 chars regardless of actual length
const NEWLINES = 2; // "\n\n" between title and url
// Reserve room: 23 (url) + 2 (newlines) = 25. Leaves 255 chars for body.
const BODY_BUDGET = TWEET_MAX - URL_LEN - NEWLINES;

/**
 * Build the tweet body for a letter. Atom's voice: terse, no preamble,
 * no "tonight's letter" framing — just the title (which is already
 * Atom-style) + dek (also Atom-style) + the permalink.
 *
 * Format A (preferred — title + dek + url):
 *   {title}
 *
 *   {dek}
 *
 *   {url}
 *
 * Format B (fallback when dek is too long — title + url):
 *   {title}
 *
 *   {url}
 *
 * No emoji. No "🧵". No "↓ link in bio." No "tonight at 8pm." The
 * title and dek were written in Atom's voice by the Founder; they
 * stand alone.
 */
export function formatLetterTweet(opts: {
  title: string;
  dek: string | null;
  url: string;
}): string {
  const { title, dek, url } = opts;
  if (dek) {
    const formatted = `${title}\n\n${dek}`;
    if (formatted.length <= BODY_BUDGET) {
      return `${formatted}\n\n${url}`;
    }
  }
  // Fallback: title only
  let body = title;
  if (body.length > BODY_BUDGET) {
    body = body.slice(0, BODY_BUDGET - 1) + "…";
  }
  return `${body}\n\n${url}`;
}

export type TweetResult =
  | { ok: true; tweet_id: string; tweet_url: string; body: string }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; error: string };

/**
 * Post the letter tweet. Failure-soft: never throws; returns a
 * discriminated-union result the caller can log without breaking
 * the letter-publish flow.
 */
export async function tweetLetter(opts: {
  title: string;
  dek: string | null;
  letterUrl: string;
}): Promise<TweetResult> {
  if (process.env.FOUNDERS_VIEW_TWEET_PAUSE === "true") {
    return {
      ok: false,
      skipped: true,
      reason: "FOUNDERS_VIEW_TWEET_PAUSE=true",
    };
  }

  const client = getClient();
  if (!client) {
    return {
      ok: false,
      skipped: true,
      reason:
        "Twitter env not configured (need TWITTER_API_KEY + TWITTER_API_SECRET + TWITTER_ACCESS_TOKEN + TWITTER_ACCESS_TOKEN_SECRET)",
    };
  }

  const body = formatLetterTweet({
    title: opts.title,
    dek: opts.dek,
    url: opts.letterUrl,
  });

  try {
    const { data } = await client.v2.tweet(body);
    const tweetId = data.id;
    return {
      ok: true,
      tweet_id: tweetId,
      tweet_url: `https://x.com/AtomMccree/status/${tweetId}`,
      body,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "tweet failed";
    return { ok: false, error: msg };
  }
}

/**
 * Post a reply to an existing tweet. Same auth, same failure-soft
 * shape as tweetLetter — for replying under an external post (e.g.
 * announcing the lab's take under a news-maker's announcement).
 *
 * Length cap is 280 chars (X counts URLs as 23 regardless of actual
 * length). The caller is responsible for fitting under that ceiling.
 *
 * Note: if the parent tweet's author has restricted replies (only
 * verified, only follows, etc.), the X API returns 403. Use
 * tweetQuote() in that case — quote tweets bypass reply restrictions.
 */
export async function tweetReply(opts: {
  text: string;
  inReplyToTweetId: string;
}): Promise<TweetResult> {
  if (process.env.FOUNDERS_VIEW_TWEET_PAUSE === "true") {
    return {
      ok: false,
      skipped: true,
      reason: "FOUNDERS_VIEW_TWEET_PAUSE=true",
    };
  }

  const client = getClient();
  if (!client) {
    return {
      ok: false,
      skipped: true,
      reason:
        "Twitter env not configured (need TWITTER_API_KEY + TWITTER_API_SECRET + TWITTER_ACCESS_TOKEN + TWITTER_ACCESS_TOKEN_SECRET)",
    };
  }

  if (!opts.text || !opts.inReplyToTweetId) {
    return { ok: false, error: "text + inReplyToTweetId both required" };
  }

  try {
    const { data } = await client.v2.tweet(opts.text, {
      reply: { in_reply_to_tweet_id: opts.inReplyToTweetId },
    });
    const tweetId = data.id;
    return {
      ok: true,
      tweet_id: tweetId,
      tweet_url: `https://x.com/AtomMccree/status/${tweetId}`,
      body: opts.text,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "reply failed";
    return { ok: false, error: msg };
  }
}

/**
 * Quote-tweet an existing tweet. The quoted tweet renders inline
 * inside the new tweet. Quote tweets bypass reply-restriction settings
 * the parent author may have set.
 */
export async function tweetQuote(opts: {
  text: string;
  quoteTweetId: string;
}): Promise<TweetResult> {
  if (process.env.FOUNDERS_VIEW_TWEET_PAUSE === "true") {
    return { ok: false, skipped: true, reason: "FOUNDERS_VIEW_TWEET_PAUSE=true" };
  }
  const client = getClient();
  if (!client) {
    return {
      ok: false,
      skipped: true,
      reason: "Twitter env not configured",
    };
  }
  if (!opts.text || !opts.quoteTweetId) {
    return { ok: false, error: "text + quoteTweetId both required" };
  }
  try {
    const { data } = await client.v2.tweet(opts.text, {
      quote_tweet_id: opts.quoteTweetId,
    });
    const tweetId = data.id;
    return {
      ok: true,
      tweet_id: tweetId,
      tweet_url: `https://x.com/AtomMccree/status/${tweetId}`,
      body: opts.text,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "quote tweet failed";
    return { ok: false, error: msg };
  }
}

/**
 * Delete a tweet by ID. Used for cleaning up test posts. Returns
 * { ok: true } with empty tweet_id on success.
 */
export async function deleteTweet(opts: {
  tweetId: string;
}): Promise<TweetResult> {
  const client = getClient();
  if (!client) {
    return { ok: false, skipped: true, reason: "Twitter env not configured" };
  }
  if (!opts.tweetId) return { ok: false, error: "tweetId required" };
  try {
    const { data } = await client.v2.deleteTweet(opts.tweetId);
    if (!data.deleted) return { ok: false, error: "delete returned false" };
    return {
      ok: true,
      tweet_id: opts.tweetId,
      tweet_url: `https://x.com/AtomMccree/status/${opts.tweetId}`,
      body: "[deleted]",
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "delete failed";
    return { ok: false, error: msg };
  }
}
