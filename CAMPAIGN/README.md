# /goal: 100 ORANGEBOX sales — campaign harness

Built 2026-05-15. Operator: Atom McCree. Target: 100 sales of ORANGEBOX Command v1.4.0 ($49 each).

## Files in this directory

| File | Purpose |
|---|---|
| `00-CAMPAIGN-MISSION.md` | The mission contract, math, and don't-stop clauses |
| `01-CONTENT-CALENDAR.md` | 14-day content calendar with cadence rules |
| `02-POSTING-PLAYBOOK.md` | Surface-specific copy for X, Reddit, HN, FB, IG, YT |
| `03-REDDIT-POSTS.md` | 5 paste-ready Reddit posts (R1–R5) for different subs |
| `04-HN-POST.md` | Show HN submission with pre-drafted Q&A answers |
| `05-FB-IG-CAPTIONS.md` | FB page + IG @atommccree + IG @atomraps captions |
| `06-MIDJOURNEY-PROMPTS.md` | 12 visual asset prompts for IG/FB content |
| `07-SALES-TRACKER.md` | Sales log + Vercel snapshots + pivot triggers |
| `08-OPERATOR-CHECKLIST.md` | What only Atom can do (prioritized) |
| `README.md` | This file |

## Quickstart for operator

1. Read `08-OPERATOR-CHECKLIST.md` — top section first.
2. Grant Chrome extension access for: business.facebook.com, instagram.com, reddit.com, news.ycombinator.com, youtube.com.
3. Paste current Stripe sales count when next asked — that becomes the campaign baseline.
4. Tell Claude "grants are in" — fire of all queued posts begins.

## Wakeup loops scheduled

- **Every 4 hours at :37** — sales-check pulse, fire next X post, ask operator for fresh Stripe count, update tracker
- **Daily at 9:17am local** — morning ritual: yesterday's results, today's plan, fire morning X

These are session-only (CronCreate doesn't actually persist past Claude session in this runtime). To extend: re-fire at session start.

## What's already shipped (Day 0, May 15)

### Infrastructure
- v20 bounce-fix pass committed + deployed to atomeons.com
- 5 conversion fixes live: H1 names buyer + outcome, BuyButton above fold, refund copy honest, SmartScreen warning collapsed, sticky bar copy fixed, OG card rewritten
- Vercel deploy: dpl_8G2XydogMSYNVNz8jaPB25B5pXCF (READY, production)

### Distribution
- 11 X posts live on @AtomMccree (X1–X11)
- Vercel baseline: 42 visitors/7d, 56 PV, 79% bounce (pre-fix snapshot)
- Reddit/HN/FB/IG: paste-ready content waiting on Chrome grants

### Production tools
- Midjourney access granted via Chrome MCP (12 prompts ready)
- Gemini access granted via Chrome MCP (research + caption assist)
- Vercel Analytics access granted (live KPI feed)

## Pivot triggers (from `07-SALES-TRACKER.md`)

- Day 7 with <5 sales → paid ads (X Ads + Reddit Ads)
- Day 14 with <15 sales → B2B angle, $29 price test
- Day 30 with <40 sales → agency outreach, partner channels
- 3+ refunds in 7 days → audit + fix root cause before resuming fire

## Mom's Law

Full effort every tick. Receipts on every claim. No green without proof.
