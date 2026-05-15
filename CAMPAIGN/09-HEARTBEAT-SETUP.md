# Heartbeat — three layers of "don't stop"

The /goal:100-orangebox-sales campaign has three independent heartbeat layers.
If one fails, the others keep ticking.

## Layer 1 — Vercel Cron (24/7, no Claude session needed)

**What it does:** Polls Stripe every 30 minutes, counts ORANGEBOX sales, sends email to a.mccree@gmail.com on milestone crossings (1, 5, 10, 25, 50, 75, 100).

**Where it runs:** Vercel infrastructure. Independent of your local machine.
Independent of Claude Code being open.

**Endpoints shipped:**
- `https://atomeons.com/api/heartbeat` — cron-only (CRON_SECRET protected)
- `https://atomeons.com/api/sales-count` — public read-only (60s cache)

**Cron schedule:** every 30 min — `*/30 * * * *` in `vercel.json`

**Required Vercel env vars** (set at https://vercel.com/amccree-6518s-projects/project-zzk75/settings/environment-variables):

| Var | Status | Purpose |
|---|---|---|
| `STRIPE_SECRET_KEY` | already set | reads payment intents |
| `CRON_SECRET` | **YOU MUST ADD** | random string, Vercel Cron sends as Bearer auth |
| `RESEND_API_KEY` | optional but preferred | for milestone email |
| `RESEND_FROM_EMAIL` | optional but preferred | e.g. `cockpit@atomeons.com` |
| `LOOPS_API_KEY` | already set | fallback if Resend not configured |
| `LOOPS_MILESTONE_TRANSACTIONAL_ID` | optional | Loops template for milestone emails |

**To add CRON_SECRET:**
```
1. Open https://vercel.com/amccree-6518s-projects/project-zzk75/settings/environment-variables
2. Click "Add New"
3. Key: CRON_SECRET
4. Value: any 32+ char random string (e.g. paste output of `openssl rand -hex 32`)
5. Environment: Production
6. Save
7. Trigger redeploy (next git push will redeploy)
```

**To verify the cron is wired:**
```
1. Open https://vercel.com/amccree-6518s-projects/project-zzk75
2. Click "Settings" → "Cron Jobs"
3. You should see: GET /api/heartbeat — every 30 minutes
4. Click "Run" to test-fire the cron manually
5. Check https://vercel.com/amccree-6518s-projects/project-zzk75/logs for response
```

**To check current sales count anytime:**
```
curl https://atomeons.com/api/sales-count
```
Response shape:
```json
{
  "ok": true,
  "ts": "2026-05-15T20:30:00.000Z",
  "total_sales": 0,
  "total_revenue_usd": 0,
  "refunds": 0,
  "net_buyers": 0,
  "goal": 100,
  "remaining": 100,
  "progress_pct": 0
}
```

---

## Layer 2 — In-session Claude wakeup (while Claude Code is open)

**What it does:** Inside any Claude Code session that has CronCreate available,
two recurring jobs fire automatically:
- Every 4 hours at :37 — sales pulse, fire next X post, ask Stripe count, update tracker
- Daily at 9:17am local — yesterday recap, today plan, fire morning X

**Where it runs:** Inside the Claude Code REPL only. Stops when you close Claude.

**Set during this session.** To re-enable in a new session, run `/loop` mode
or fire the resume-campaign script in Layer 3.

---

## Layer 3 — Windows Task Scheduler (auto-resume Claude every N hours)

**What it does:** Auto-launches Claude Code with the campaign-tick prompt
on a schedule. Combined with Layer 2 cron jobs, this creates an effective
24/7 in-session presence.

### Scripts shipped

`CAMPAIGN/scripts/resume-campaign.cmd` — opens Claude Code with the campaign
prompt. Reads CAMPAIGN/ state, fires next queued posts, updates tracker.

`CAMPAIGN/scripts/check-sales.cmd` — one-shot sales count check via the
public /api/sales-count endpoint.

### Setting up Windows Task Scheduler (5 minutes)

```
1. Press Win key, type "Task Scheduler", open it
2. Right pane: click "Create Basic Task..."
3. Name: ORANGEBOX Campaign Heartbeat
4. Description: Auto-resume /goal:100-orangebox-sales every 4 hours
5. Trigger: Daily
6. Start: today, 09:00 (or whenever)
7. Recur every: 1 day
8. Action: Start a program
9. Program/script: C:\AtomEons\.claude\worktrees\bold-leakey-4470e8\CAMPAIGN\scripts\resume-campaign.cmd
10. Click Next, then click "Open the Properties dialog when I click Finish"
11. In Properties → Triggers → Edit → check "Repeat task every: 4 hours"
       → "for a duration of: Indefinitely"
12. Click OK, OK
```

Result: every 4 hours, your machine opens Claude Code with the campaign
tick. Claude runs the routine and exits when done.

### Alternative — Claude session keep-alive

Easier path: just leave the Claude Code session open in a terminal. The
in-session CronCreate jobs (Layer 2) will tick every 4 hours automatically
as long as the REPL is alive.

---

## Decision tree — what to do if X stops happening

| Symptom | Layer that failed | Fix |
|---|---|---|
| No milestone email after a sale | Layer 1 cron not firing | Check Vercel Cron Jobs page; verify CRON_SECRET set; verify Resend or Loops template ID set |
| sales-count API returns 0 but Stripe has sales | PRODUCT_NAME_FILTER mismatch | Check that recent payments have "ORANGEBOX" in description or metadata; adjust filter in route.ts |
| In-session crons not firing | Layer 2 stopped (Claude session ended) | Re-open Claude Code; run resume-campaign.cmd OR /loop mode |
| No X posts firing automatically | Layer 2 + Layer 3 both stopped | Run resume-campaign.cmd manually; consider Windows Task Scheduler setup |
| Heartbeat email goes to spam | Resend domain not verified OR Loops template missing | Verify your sending domain in Resend; add yourself to allowlist |

---

## Receipts

After Vercel deploy completes, this URL must return JSON:
```
https://atomeons.com/api/sales-count
```

After CRON_SECRET is set + redeploy, this URL must show in Vercel dashboard:
```
Project Settings → Cron Jobs → GET /api/heartbeat (every 30 min)
```

After first sale, you should get an email subjected:
```
ORANGEBOX milestone: 1 sale
```

After 100th sale, you should get an email subjected:
```
🎯 ORANGEBOX 100 SALES HIT — goal reached
```

If any of these don't happen, the heartbeat is broken — fix before
relying on the campaign to run unattended.
