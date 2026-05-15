# Sales tracker — 100 ORANGEBOX target

Update this file every sales-check wakeup.

## Mission counter

```
Target:    100 sales
Current:   0 (verified via /api/sales-count, 2026-05-15 19:56Z)
Remaining: 100
Days elapsed: 0
Sales/day required: ~3.3/day for 30-day push, ~1.6/day for 60-day push
```

Live count anytime: `curl https://atomeons.com/api/sales-count`
Auto-emails on milestones (1, 5, 10, 25, 50, 75, 100) via Vercel Cron heartbeat.

## Sales log

| # | Date | Stripe ref | Source (Vercel referrer) | Refunded? | Notes |
|---|---|---|---|---|---|
|   |    |             |                          |           |       |

## Vercel Analytics weekly snapshots

### Week 0 (May 9–15, 2026)
- Visitors: 42
- Page Views: 56
- Bounce: 79%
- Top referrer: [TBD]
- Top page: [TBD]
- 0 currently online

### Week 1 (May 16–22, 2026)
- Visitors: [TBD]
- Page Views: [TBD]
- Bounce: [TBD]% (target: <50%)
- Top referrer: [TBD]
- Top page: [TBD]

## Stripe sales pulls

Stripe dashboard: https://dashboard.stripe.com/payments
Filter: payment_intent.succeeded, product = ORANGEBOX Command v1.4.0

| Pull date | Total successful payments | Refunds | Net buyers | Source notes |
|---|---|---|---|---|
| 2026-05-15 19:56Z | 0 | 0 | 0 | baseline (verified via /api/sales-count) |

## Conversion math snapshots

| Date | Visitors / day | Sales / day | Conv rate | Refund rate |
|---|---|---|---|---|
| 2026-05-15 | 6 | TBD | TBD | 0% |

## Pivot triggers

- **Day 7 (May 22):** if <5 sales total → pivot to paid ads (X Ads + Reddit Ads)
- **Day 14 (May 29):** if <15 sales total → consider B2B angle, price test ($29 tier?)
- **Day 30 (June 14):** if <40 sales total → reposition: agency outreach, partner channels
- **Day 60:** if <70 sales total → strategic review with mirrors agent + product reviewer

## Refund triggers

- 1 refund: investigate cause (was it Material Failure or Workflow Fit?), patch if MF
- 3 refunds in 7 days: full audit of recent buyers, exit interview each
- 5+ refunds in 30 days: pause campaign, fix root cause before resuming fire

## Receipts archive

Store screenshots of:
- First 5 sales (Stripe dashboard)
- Each weekly Vercel Analytics screenshot
- Top X post analytics (impressions, engagement, link clicks)
- HN post final state
- Reddit post final state per sub
- IG reel insights (after 7d)

Path: `C:/AtomEons/.claude/worktrees/bold-leakey-4470e8/CAMPAIGN/receipts/`
