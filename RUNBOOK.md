# atomeons.com RUNBOOK

Disaster recovery and operational reference for atomeons.com.

## Live system inventory

| Component | Where | Notes |
|---|---|---|
| App | Vercel project `project-zzk75` (team `amccree-6518s-projects`) | Auto-deploys on push to `main` |
| Domain | atomeons.com — Vercel-managed nameservers | A `@` → 76.76.21.21, CNAME `www` → cname.vercel-dns.com |
| Payments | Stripe live mode | Webhook id `we_1TWn6r5VctoYPUK39qwwtCwl` |
| Product file | Vercel Blob `atomeons-products` | Streamed via `/api/download` (v12+); no public URL exposed |
| Email | Loops (optional) — Resend (optional) | Either or neither configured. Without: success page is sole delivery |
| Ads pixel | X/Twitter pixel id `rbrlw`, event `tw-rbrlw-rceri` | Conversion fires on /success ok-state |

## Required env vars (Vercel production)

| Var | Purpose | Failure mode if missing |
|---|---|---|
| `STRIPE_SECRET_KEY` | Stripe SDK auth | `/api/checkout` returns 500 |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verify | `/api/webhook` returns 400 |
| `DOWNLOAD_TOKEN_SECRET` | HMAC-SHA256 token signing | `/api/download` throws 500 (v12 — no fallback) |
| `PRODUCT_BLOB_URL` | Source URL for `/api/download` stream | `/api/download` returns 500 |
| `BLOB_READ_WRITE_TOKEN` | Blob CLI / SDK access | Build OK; uploads fail |
| `NEXT_PUBLIC_SITE_URL` | Stripe success/cancel URL anchor | Falls back to `https://atomeons.com` |
| `NEXT_PUBLIC_X_PIXEL_ID` | X pixel base | Pixel script silent no-op |
| `NEXT_PUBLIC_X_EVENT_ID` | X conversion event | Conversion event silent no-op |
| `LOOPS_API_KEY` + `LOOPS_TRANSACTIONAL_ID` | Email backup | Email silent fail (success page still works) |
| `RESEND_API_KEY` + `RESEND_FROM_EMAIL` | Alt email backup | Same |

## Smoke test (after every deploy)

```bash
BASE_URL=https://atomeons.com bash scripts/smoke.sh
```

13 checks. Exits non-zero on any regression. Run before announcing
v(N+1).

## Unit tests

```bash
pnpm vitest run
```

Currently covers `lib/token.ts` (5 cases: round-trip, expiry, tampered
sig, tampered payload, malformed input).

## Rollback procedures

### Bad deploy (live regression)

```powershell
# 1. Find last known-good deployment
vercel ls --scope amccree-6518s-projects | head -10

# 2. Promote it back to production
vercel rollback <deployment-url> --scope amccree-6518s-projects

# 3. Verify
curl -I https://atomeons.com/
bash scripts/smoke.sh
```

### Bad Stripe webhook secret

```powershell
# 1. Pull the correct signing secret from Stripe dashboard
#    → Developers → Webhooks → we_1TWn6r5VctoYPUK39qwwtCwl → Signing secret

# 2. Update Vercel env
vercel env rm STRIPE_WEBHOOK_SECRET production --yes
echo "whsec_..." | vercel env add STRIPE_WEBHOOK_SECRET production

# 3. Redeploy
vercel --prod --yes
```

### Bad DOWNLOAD_TOKEN_SECRET rotation

If you rotate this secret, every outstanding buyer token is invalidated
immediately. Recovery:

```powershell
# 1. Restore previous secret value in Vercel env (keep both saved
#    privately during any rotation window)
vercel env rm DOWNLOAD_TOKEN_SECRET production --yes
echo "<previous-64-hex>" | vercel env add DOWNLOAD_TOKEN_SECRET production

# 2. Redeploy
vercel --prod --yes

# 3. Only rotate after the longest outstanding token TTL has expired
#    (currently 30 days — see TOKEN_TTL_SECONDS in webhook + success)
```

### Buyer lost their download link

```bash
# Re-mint a token from a paid Stripe session id.
# Run from a machine with STRIPE_SECRET_KEY + DOWNLOAD_TOKEN_SECRET set:

node -e "
  const Stripe = require('stripe');
  const { createHmac } = require('crypto');
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sessionId = process.argv[1];
  stripe.checkout.sessions.retrieve(sessionId).then(s => {
    if (s.payment_status !== 'paid') return console.log('not paid');
    const email = s.customer_details.email;
    const exp = Math.floor(Date.now()/1000) + 60*60*24*30;
    const claim = { email, sessionId, exp };
    const payload = Buffer.from(JSON.stringify(claim)).toString('base64')
      .replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/g,'');
    const sig = createHmac('sha256', process.env.DOWNLOAD_TOKEN_SECRET)
      .update(payload).digest('base64')
      .replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/g,'');
    console.log('https://atomeons.com/api/download?t=' + payload + '.' + sig);
  });
" cs_live_<session_id>
```

Email the resulting URL to the buyer.

## Cost ceilings (free-tier headroom)

- Vercel hobby: 100 GB bandwidth/month. Product zip 302 KB → ~330k downloads
- Stripe: 2.9% + $0.30 per $49 sale → net $47.27
- Loops free: 1k contacts, 2k sends/mo
- Vercel Blob free: 1 GB storage, 10 GB bandwidth/mo

## Operator-only secrets to rotate periodically

- `BLOB_READ_WRITE_TOKEN` (currently in operator's local `.env.local` —
  rotate after any laptop event)
- `VERCEL_OIDC_TOKEN` (issued on demand; expires periodically)
- `STRIPE_SECRET_KEY` (no rotation schedule; rotate on suspicion)
- `DOWNLOAD_TOKEN_SECRET` (rotation invalidates all outstanding tokens — see above)

## Known YELLOW (release-stewardship gaps)

- No durable purchase state (no DB row per session_id). If email
  silently fails AND buyer closes tab → no automated recovery, must
  re-mint manually via Stripe session id.
- No release tags. Recovery via Vercel deployment history only.
- No CI smoke run on push. Manual `bash scripts/smoke.sh` required.

## Operator contact

a.mccree@gmail.com · Marco Island, FL
