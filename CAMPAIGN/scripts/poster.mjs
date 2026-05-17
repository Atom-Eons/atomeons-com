#!/usr/bin/env node
// poster.mjs — multi-platform social posting automation
//
// Built for the /goal:100-orangebox-sales campaign.
// ToS-safe by design: respects each platform's rate limits, uses official APIs,
// requires operator-provided OAuth tokens (no scraping, no fake accounts).
//
// Usage:
//   node poster.mjs --dry-run               # preview queue, no posts
//   node poster.mjs --fire-next             # fire the next scheduled post
//   node poster.mjs --fire-all-due          # fire every post whose schedule is now/past
//   node poster.mjs --add "text" --x --schedule "2026-05-17T10:00"
//   node poster.mjs --stats                 # show counts per platform per day
//
// Queue format: CAMPAIGN/scripts/queue.jsonl (one post per line)
//   { "id": "x-001", "platform": "x", "text": "...", "schedule": "ISO8601",
//     "status": "queued|posted|failed", "posted_at": "...", "platform_id": "..." }
//
// Env vars (operator-provided, set in shell or .env.local):
//   X_BEARER_TOKEN           — Twitter API v2 bearer token (write scope)
//   X_API_KEY                — Twitter API v2 app key
//   X_API_SECRET             — Twitter API v2 app secret
//   X_ACCESS_TOKEN           — Twitter user access token
//   X_ACCESS_TOKEN_SECRET    — Twitter user access token secret
//   LINKEDIN_ACCESS_TOKEN    — LinkedIn OAuth 2.0 access token (w_member_social scope)
//   LINKEDIN_AUTHOR_URN      — LinkedIn person URN (urn:li:person:XXXX)
//   YOUTUBE_API_KEY          — YouTube Data API v3 key (for analytics, not upload)
//   YOUTUBE_OAUTH_TOKEN      — OAuth token for uploads (youtube.upload scope)
//   TIKTOK_ACCESS_TOKEN      — TikTok Content Posting API access token
//   REDDIT_CLIENT_ID         — Reddit app client ID
//   REDDIT_CLIENT_SECRET     — Reddit app client secret
//   REDDIT_USERNAME          — Reddit username
//   REDDIT_PASSWORD          — Reddit password (use app-password)
//
// Without tokens, --dry-run still works (preview/plan mode).

import { readFileSync, writeFileSync, appendFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import crypto from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const QUEUE_PATH = join(__dirname, "queue.jsonl");
const LOG_PATH = join(__dirname, "poster.log");
const ENV_PATH = join(__dirname, ".env.local");

// ──────────────────────────────────────────────────────────────────
// .env.local loader (zero-dep dotenv) — must run before any process.env reads
// ──────────────────────────────────────────────────────────────────

function loadEnvFile() {
  if (!existsSync(ENV_PATH)) return;
  const raw = readFileSync(ENV_PATH, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const k = trimmed.slice(0, eq).trim();
    let v = trimmed.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!(k in process.env)) process.env[k] = v;
  }
}
loadEnvFile();

// ──────────────────────────────────────────────────────────────────
// OAuth 1.0a signing helpers — required by X API v2 POST /2/tweets
// (Bearer alone cannot POST; needs user context.)
// ──────────────────────────────────────────────────────────────────

function rfc3986(s) {
  return encodeURIComponent(s).replace(/[!*'()]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}

function oauth1Header({ method, url, params = {}, consumerKey, consumerSecret, token, tokenSecret }) {
  const oauthParams = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: token,
    oauth_version: "1.0",
  };
  const all = { ...params, ...oauthParams };
  const baseStr = Object.keys(all)
    .sort()
    .map((k) => `${rfc3986(k)}=${rfc3986(all[k])}`)
    .join("&");
  const sigBase = `${method.toUpperCase()}&${rfc3986(url)}&${rfc3986(baseStr)}`;
  const signingKey = `${rfc3986(consumerSecret)}&${rfc3986(tokenSecret)}`;
  const signature = crypto.createHmac("sha1", signingKey).update(sigBase).digest("base64");
  oauthParams.oauth_signature = signature;
  return (
    "OAuth " +
    Object.keys(oauthParams)
      .sort()
      .map((k) => `${rfc3986(k)}="${rfc3986(oauthParams[k])}"`)
      .join(", ")
  );
}

// ──────────────────────────────────────────────────────────────────
// Queue I/O
// ──────────────────────────────────────────────────────────────────

function loadQueue() {
  if (!existsSync(QUEUE_PATH)) return [];
  const lines = readFileSync(QUEUE_PATH, "utf8").split("\n").filter(Boolean);
  return lines.map((l) => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);
}

function saveQueue(queue) {
  const lines = queue.map((p) => JSON.stringify(p)).join("\n") + "\n";
  writeFileSync(QUEUE_PATH, lines);
}

function log(msg, level = "INFO") {
  const line = `${new Date().toISOString()} [${level}] ${msg}\n`;
  appendFileSync(LOG_PATH, line);
  process.stdout.write(line);
}

// ──────────────────────────────────────────────────────────────────
// Platform posters
// ──────────────────────────────────────────────────────────────────

async function postToX(text, mediaPath = null) {
  const consumerKey = process.env.X_API_KEY;
  const consumerSecret = process.env.X_API_SECRET;
  const token = process.env.X_ACCESS_TOKEN;
  const tokenSecret = process.env.X_ACCESS_TOKEN_SECRET;

  // X API v2 POST /2/tweets requires user-context OAuth (1.0a or 2.0 PKCE).
  // Bearer alone is read-only.
  if (consumerKey && consumerSecret && token && tokenSecret) {
    const url = "https://api.twitter.com/2/tweets";
    const auth = oauth1Header({
      method: "POST",
      url,
      params: {}, // /2/tweets uses JSON body — params NOT included in signature base
      consumerKey,
      consumerSecret,
      token,
      tokenSecret,
    });
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`X API ${res.status}: ${body}`);
    }
    const json = await res.json();
    return { platform_id: json.data?.id, raw: json };
  }

  // Fallback: try app-only Bearer (will fail on /2/tweets but informs operator).
  const bearer = process.env.X_BEARER_TOKEN;
  if (!bearer) throw new Error("X_BEARER_TOKEN + Access Tokens not set");
  throw new Error("X API requires user-context Access Tokens for posting — generate at developer.x.com → app → User authentication settings → OAuth 1.0a with Read+Write");
}

async function postToLinkedIn(text, mediaUrl = null) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const author = process.env.LINKEDIN_AUTHOR_URN;
  if (!token || !author) throw new Error("LinkedIn token/author not set");

  const body = {
    author,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text },
        shareMediaCategory: "NONE",
      },
    },
    visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
  };

  const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`LinkedIn API ${res.status}: ${errBody}`);
  }
  const json = await res.json();
  return { platform_id: json.id, raw: json };
}

async function postToReddit(text, subreddit, title) {
  const username = process.env.REDDIT_USERNAME;
  const password = process.env.REDDIT_PASSWORD;
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  if (!username || !password || !clientId || !clientSecret) {
    throw new Error("Reddit creds not all set");
  }

  // 1. Get OAuth token
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenRes = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "atomeons-poster/1.0",
    },
    body: `grant_type=password&username=${username}&password=${password}`,
  });
  if (!tokenRes.ok) throw new Error(`Reddit auth ${tokenRes.status}`);
  const { access_token } = await tokenRes.json();

  // 2. Submit post
  const submitRes = await fetch("https://oauth.reddit.com/api/submit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "atomeons-poster/1.0",
    },
    body: new URLSearchParams({
      sr: subreddit,
      kind: "self",
      title,
      text,
      api_type: "json",
    }),
  });
  if (!submitRes.ok) {
    const err = await submitRes.text();
    throw new Error(`Reddit submit ${submitRes.status}: ${err}`);
  }
  const json = await submitRes.json();
  return { platform_id: json.json?.data?.id, raw: json };
}

// ──────────────────────────────────────────────────────────────────
// Dispatcher
// ──────────────────────────────────────────────────────────────────

const POSTERS = {
  x: postToX,
  linkedin: postToLinkedIn,
  reddit: postToReddit,
  // tiktok, youtube, instagram, facebook: TODO — require multipart media upload
  // which is non-trivial via raw fetch. Recommend posting via Buffer/Hootsuite
  // OR via platform-native scheduler UI for those.
};

// ──────────────────────────────────────────────────────────────────
// AuthorDiversityScorer mitigation (per CAMPAIGN/20-X-ALGORITHM-INTEL)
// xAI ranker multiplies each sequential same-author post by decay^position.
// 90-minute floor between originals on the same platform protects reach.
// Override with --force for milestone posts where decay is acceptable.
// ──────────────────────────────────────────────────────────────────

const MIN_AUTHOR_DIVERSITY_GAP_MINUTES = 90;

function lastPostedTimestampFor(platform, queue) {
  const posted = queue
    .filter((p) => p.platform === platform && p.status === "posted" && p.posted_at)
    .map((p) => new Date(p.posted_at).getTime())
    .sort((a, b) => b - a);
  return posted[0] || 0;
}

function authorDiversityGuard(post, queue, forceFlag) {
  if (forceFlag) return { ok: true };
  const last = lastPostedTimestampFor(post.platform, queue);
  if (!last) return { ok: true };
  const minutesSince = (Date.now() - last) / 60_000;
  if (minutesSince >= MIN_AUTHOR_DIVERSITY_GAP_MINUTES) return { ok: true };
  return {
    ok: false,
    reason: `Author-diversity guard: last ${post.platform} post was ${minutesSince.toFixed(1)} min ago, floor is ${MIN_AUTHOR_DIVERSITY_GAP_MINUTES} min. Use --force to override.`,
  };
}

async function firePost(post, opts = {}) {
  if (post.status === "posted") {
    log(`Skip ${post.id} — already posted at ${post.posted_at}`, "WARN");
    return post;
  }
  const poster = POSTERS[post.platform];
  if (!poster) {
    log(`Skip ${post.id} — platform '${post.platform}' has no poster (use UI)`, "WARN");
    post.status = "skipped-no-poster";
    return post;
  }
  const guard = authorDiversityGuard(post, opts.queue || [], opts.force);
  if (!guard.ok) {
    log(`Defer ${post.id} → ${post.platform}: ${guard.reason}`, "WARN");
    return post; // leave as queued, don't change status
  }
  try {
    log(`Firing ${post.id} → ${post.platform}: ${post.text.slice(0, 60)}...`);
    const result = await poster(post.text, post.media_path);
    post.status = "posted";
    post.posted_at = new Date().toISOString();
    post.platform_id = result.platform_id;
    log(`OK ${post.id} → ${post.platform} (id=${result.platform_id})`);
  } catch (e) {
    post.status = "failed";
    post.last_error = e.message;
    log(`FAIL ${post.id}: ${e.message}`, "ERROR");
  }
  return post;
}

// ──────────────────────────────────────────────────────────────────
// CLI
// ──────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const queue = loadQueue();
  const force = args.includes("--force");

  if (args.includes("--stats")) {
    const byPlatform = {};
    queue.forEach((p) => {
      const key = `${p.platform}:${p.status}`;
      byPlatform[key] = (byPlatform[key] || 0) + 1;
    });
    console.log("Queue stats:", byPlatform);
    console.log(`Total: ${queue.length} posts`);
    return;
  }

  if (args.includes("--dry-run")) {
    const now = new Date();
    const due = queue.filter((p) => p.status === "queued" && new Date(p.schedule) <= now);
    console.log(`DRY RUN — ${due.length} posts due now (of ${queue.length} total):`);
    due.forEach((p) => {
      console.log(`  ${p.id} [${p.platform}] @${p.schedule}\n    ${p.text.slice(0, 100)}`);
    });
    return;
  }

  if (args.includes("--fire-next")) {
    const now = new Date();
    const next = queue.find((p) => p.status === "queued" && new Date(p.schedule) <= now);
    if (!next) { log("No due posts in queue"); return; }
    await firePost(next, { queue, force });
    saveQueue(queue);
    return;
  }

  if (args.includes("--fire-all-due")) {
    const now = new Date();
    const due = queue.filter((p) => p.status === "queued" && new Date(p.schedule) <= now);
    log(`Firing ${due.length} due posts (author-diversity floor ${MIN_AUTHOR_DIVERSITY_GAP_MINUTES}min, --force to override)`);
    for (const p of due) {
      await firePost(p, { queue, force });
      // sustainable rate limit: 1 post per 90 seconds across all platforms
      await new Promise((r) => setTimeout(r, 90_000));
    }
    saveQueue(queue);
    return;
  }

  if (args.includes("--add")) {
    const textIdx = args.indexOf("--add") + 1;
    const text = args[textIdx];
    if (!text) { console.error("--add requires a text argument"); process.exit(1); }

    let platform = "x";
    if (args.includes("--linkedin")) platform = "linkedin";
    if (args.includes("--reddit")) platform = "reddit";
    if (args.includes("--x")) platform = "x";

    const scheduleIdx = args.indexOf("--schedule");
    const schedule = scheduleIdx >= 0
      ? args[scheduleIdx + 1]
      : new Date(Date.now() + 60_000).toISOString();

    const id = `${platform}-${String(queue.length + 1).padStart(3, "0")}`;
    queue.push({ id, platform, text, schedule, status: "queued" });
    saveQueue(queue);
    log(`Added ${id} → ${platform} @${schedule}`);
    return;
  }

  console.log(`poster.mjs — see file header for usage`);
}

main().catch((e) => { log(`Fatal: ${e.message}`, "ERROR"); process.exit(1); });
