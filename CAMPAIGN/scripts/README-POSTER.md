# poster.mjs — multi-platform social super-poster

ToS-safe automated scheduling for the /goal:100 campaign.
Built because no MCP exists for X/LinkedIn/Reddit posting in 2026.

## What it does

Reads `queue.jsonl`, fires posts when their scheduled time arrives,
respects platform rate limits, logs results.

Supports:
- ✅ X (Twitter API v2)
- ✅ LinkedIn (UGC Posts API)
- ✅ Reddit (OAuth + Submit API)
- 🟡 TikTok/YouTube/IG/FB — require multipart media upload, recommend platform-native scheduler UI for those

## Setup (one-time, operator action)

### 1. X API tokens

Go to https://developer.x.com/en/portal/dashboard

- Create app under "Atomeons" project
- Generate "User Authentication Settings" with `Read and write` scope
- Copy: API Key + Secret + Access Token + Secret + Bearer Token
- Set as env vars:
  ```
  export X_BEARER_TOKEN="..."
  export X_API_KEY="..."
  export X_API_SECRET="..."
  export X_ACCESS_TOKEN="..."
  export X_ACCESS_TOKEN_SECRET="..."
  ```

Note: X API requires "Basic" tier ($100/mo) for write access in 2026.
If not subscribed, poster falls back to dry-run preview mode.

### 2. LinkedIn API tokens

Go to https://www.linkedin.com/developers/apps

- Create app, request "Share on LinkedIn" + "Sign In with LinkedIn" products
- Generate OAuth 2.0 access token with `w_member_social` scope
- Get your person URN: `curl -H "Authorization: Bearer YOUR_TOKEN" https://api.linkedin.com/v2/userinfo` → use the `sub` field as `urn:li:person:SUB`
- Set env vars:
  ```
  export LINKEDIN_ACCESS_TOKEN="..."
  export LINKEDIN_AUTHOR_URN="urn:li:person:..."
  ```

LinkedIn API is FREE for personal use (no monthly fee).

### 3. Reddit API credentials

Go to https://www.reddit.com/prefs/apps

- Click "create another app" → script type
- App name: atomeons-poster
- Redirect URI: http://localhost
- Copy client_id (under app name) + client_secret
- Use account credentials (u/Sufficient-Welcome58)
- Set env vars:
  ```
  export REDDIT_CLIENT_ID="..."
  export REDDIT_CLIENT_SECRET="..."
  export REDDIT_USERNAME="Sufficient-Welcome58"
  export REDDIT_PASSWORD="..."
  ```

Reddit API is FREE.

## Usage

```bash
# Preview what's due (no posts)
node poster.mjs --dry-run

# Fire the next due post
node poster.mjs --fire-next

# Fire ALL due posts (90s spacing between to respect rate limits)
node poster.mjs --fire-all-due

# Add a new post to queue
node poster.mjs --add "your tweet text" --x --schedule "2026-05-17T10:00:00Z"

# Show queue stats
node poster.mjs --stats
```

## Cron-style automation (Windows Task Scheduler)

Run `poster.mjs --fire-all-due` every 30 minutes via Windows Task Scheduler:

```cmd
schtasks /create /tn "AtomEons Poster" /tr "node C:\AtomEons\.claude\worktrees\bold-leakey-4470e8\CAMPAIGN\scripts\poster.mjs --fire-all-due" /sc minute /mo 30
```

Or on macOS/Linux via cron:
```
*/30 * * * * cd /path/to/CAMPAIGN/scripts && node poster.mjs --fire-all-due >> poster.log 2>&1
```

## Queue file format

`queue.jsonl` — one JSON object per line:

```json
{
  "id": "x-001",
  "platform": "x",
  "text": "the post text",
  "schedule": "2026-05-17T10:00:00Z",
  "status": "queued"
}
```

For Reddit, add `subreddit` and `title`:
```json
{
  "id": "reddit-001",
  "platform": "reddit",
  "subreddit": "ClaudeAI",
  "title": "Show: I built a $49 desktop cockpit for Claude Code",
  "text": "body...",
  "schedule": "2026-05-17T15:00:00Z",
  "status": "queued"
}
```

## Built-in safety

- **Rate limit:** 90 seconds between posts when `--fire-all-due`
- **Status tracking:** never re-posts a `posted` entry
- **Error logging:** all failures logged with reason to `poster.log`
- **Dry-run default:** no surprise posts during testing
- **No bot signature:** posts come from operator's real account via official API

## What this is NOT

- ❌ Not a scraper
- ❌ Not a bot army
- ❌ Not multi-account
- ❌ Not engagement-buying
- ❌ Does NOT bypass platform rate limits

Just real scheduled posts from your real account via official APIs.
ToS-safe, account-safe, and accountable.

## Cost

- X API: $100/mo (Basic tier) for write access
- LinkedIn API: $0
- Reddit API: $0
- Compute: ~$0 (runs on your laptop via cron or Vercel cron)

Total monthly: ~$100 for full automation across X + LinkedIn + Reddit.
Cheaper than Buffer, Hootsuite, or any social management SaaS.
