# Hashtag + tag strategy

Per-platform counts (May 2026 best practices, sourced research):
- **TikTok:** 5 hashtags max (1-2 trending + 3-4 niche)
- **Instagram:** 9 hashtags
- **LinkedIn:** 3 hashtags
- **X (Twitter):** 0 hashtags (algo penalizes hashtag-stuffed posts now)
- **YouTube:** 5 in description, 3 in title

## Core niche hashtags (always include)

`#claudecode #orangebox #vibecoding #aicockpit #indiedev`

These are the "spiderweb of AI users" lock-ins. Each is a known discoverable feed in 2026.

## Tier 2 niche (rotate for variety)

`#aitools #anthropic #mcp #aiops #localfirst #devtools #buildinpublic #soloFounder #aiagents #cursor #aider #cline`

## Tier 3 broad (one trending per post for reach)

`#ai #artificialintelligence #generativeai #technology #startup #saas`

Use ONE broad tag per post, NOT a stack. Algorithm 2026 punishes broad-tag spam.

---

## TikTok hashtag sets (5 per post)

### Reel #1 — cancel-subscription (Mr Beast hook)
```
#claudecode #vibecoding #aicockpit #anthropic #ai
```

### Reel #2 — 7-day-test (build-in-public)
```
#buildinpublic #claudecode #indiedev #aicockpit #vibecoding
```

### Reel #3 — comparison ladder ($49 vs $200/mo)
```
#aitools #claudecode #saas #orangebox #aicockpit
```

### Reel #4 — local-first / Ollama
```
#localfirst #ollama #claudecode #aicockpit #vibecoding
```

### Reel #5 — Marco Island solo founder
```
#solofounder #indiedev #buildinpublic #orangebox #claudecode
```

## Instagram hashtag sets (9 per post)

### IG @atommccree (frontier-tier)
```
#claudecode #aicockpit #vibecoding #anthropic #aitools #devtools #buildinpublic #frontier #futureofai
```

### IG @atomraps (creative crossover)
```
#claudecode #aicockpit #musicianlife #studiosetup #aitools #vibecoding #marcoisland #indiefounder #beats
```

## LinkedIn hashtag sets (3 per post)

### LinkedIn long-form
```
#ClaudeCode #AIOps #BuildInPublic
```

### LinkedIn carousel (PDF format)
```
#ClaudeCode #AITools #IndieDev
```

## YouTube Shorts (5 in description + 3 in title)

### Title hashtags (use as part of title where possible)
`#ClaudeCode #Anthropic #AITools`

### Description hashtags
```
#ClaudeCode #AICockpit #VibeCoding #Anthropic #IndieDev
```

## @-tags to leverage (per platform)

### X — @ Tier 1 in posts when contextually relevant
- @bcherny — Anthropic Claude Code lead
- @theo — Claude Code reviewer (T3)
- @shl — Gumroad CEO vibe coder
- @AnthropicAI — official
- @ClaudeDevs — dev relations

DON'T @ them sycophantically. Only @ when post directly references their work
or contributes to their thread.

### LinkedIn — @ companies when relevant
- @anthropic
- @gumroad (Sahil)
- @cursor
- @lovable

### IG/TikTok — collab/duet/stitch
- Duet @theo's Claude Code review → add ORANGEBOX angle
- Stitch @SnazzyLabs ChatGPT-cancel-Claude
- Collab @atomraps for music+code crossover

## Hashtag DON'Ts

- ❌ Don't stuff 30 tags (IG algorithm flags as spam)
- ❌ Don't use #FYP, #ForYou, #viral (TikTok algo ignores these now)
- ❌ Don't use generic #motivation, #entrepreneur (low-signal traffic)
- ❌ Don't put hashtags in X tweets (algo punishes)
- ❌ Don't reuse the SAME 9 tags on every IG post (algo flags as bot)

## Tracking

After each post, log to `CAMPAIGN/receipts/hashtag-perf-YYYY-MM-DD.json`:
```json
{
  "post_id": "tiktok-r1-2026-05-17",
  "tags_used": ["claudecode", "vibecoding", "aicockpit", "anthropic", "ai"],
  "views_24h": null,
  "engagement_24h": null,
  "link_clicks_24h": null
}
```

Operator pulls 24h numbers + I update tracker. Identifies winning tag combos for repeat use.
