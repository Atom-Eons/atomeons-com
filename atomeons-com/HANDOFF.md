# atomeons.com → ORANGEBOX storefront — Operator handoff

Status: **build green, deploy-ready**. You finish auth-gated steps below.

## What's already done
- Next.js 16 + Tailwind v4 + Stripe SDK installed (build passes)
- 10 routes implemented: landing, buy, cancel, success, terms, privacy, refund, /api/{checkout,webhook,download}
- Product ZIP built: `product-build/orangebox-v1.zip` (302 KB)
- SHA-256: `6352368baf4235e2e3ab703dae8f9165cb2a35dced910110e97b4280e4ef7a8e`

## What you do (in order)

### 1. Local preview (optional but recommended — 1 min)
```powershell
cd atomeons-com
pnpm dev
# open http://localhost:3000 — confirm hero + features render
```

### 2. Generate the token-signing secret (10 sec)
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the 64-char hex string. It goes into `DOWNLOAD_TOKEN_SECRET`.

### 3. Push to GitHub (2 min)
```powershell
# from repo root (not the atomeons-com subdir)
git add .
git commit -m "atomeons.com: ORANGEBOX $49 Stripe storefront"
git push -u origin claude/bold-leakey-4470e8

# Then in GitHub UI: open PR to main, merge.
# Or push directly to a new repo:
gh repo create atomeons-com --public --source=atomeons-com --push
```

### 4. Vercel project (3 min)
```powershell
cd atomeons-com
vercel link            # pick team, name = atomeons-com
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add DOWNLOAD_TOKEN_SECRET production
vercel env add NEXT_PUBLIC_SITE_URL production    # https://atomeons.com
vercel env add LOOPS_API_KEY production
vercel env add LOOPS_TRANSACTIONAL_ID production
# (skip Loops vars and use RESEND_API_KEY + RESEND_FROM_EMAIL if going Resend)
```

### 5. Upload product ZIP to Vercel Blob (1 min)
```powershell
vercel blob put product-build/orangebox-v1.zip --add-random-suffix
# copy the returned URL into:
vercel env add PRODUCT_BLOB_URL production
```

### 6. Deploy
```powershell
vercel --prod
```

### 7. Stripe webhook (2 min)
- Stripe Dashboard → Developers → Webhooks → Add endpoint
- URL: `https://atomeons.com/api/webhook`
- Events: `checkout.session.completed`
- Copy the **Signing secret** → re-run `vercel env add STRIPE_WEBHOOK_SECRET production` with the real value
- `vercel --prod` again to re-deploy with the secret

### 8. DNS — point atomeons.com (5 min, then DNS propagation)
At your registrar, set these records on `atomeons.com`:
| Type | Name | Value |
|---|---|---|
| A    | @   | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

In Vercel: Project → Settings → Domains → add `atomeons.com` and `www.atomeons.com`. Vercel will auto-verify when DNS propagates.

### 9. Live smoke test (5 min)
1. Open https://atomeons.com
2. Click "Buy ORANGEBOX · $49"
3. Use a real card OR a test card on test keys: `4242 4242 4242 4242` / any future date / any CVC / any zip
4. Get redirected to /success
5. Watch for the email
6. Click the download link → should 302 to your blob URL → ZIP downloads
7. Open the ZIP, run the cockpit per `INSTALL.md` to confirm

## Loops template setup (if using Loops)
Create a transactional template with:
- Subject: `Your ORANGEBOX download`
- Body variables: `{{downloadUrl}}`, `{{sessionId}}`, `{{productName}}`
- Body should contain a clickable link to `{{downloadUrl}}`
- Copy the template ID into `LOOPS_TRANSACTIONAL_ID`

## What happens when things go wrong
- **Webhook 400 "missing signature"**: STRIPE_WEBHOOK_SECRET not set in Vercel env
- **Email never sent**: LOOPS_API_KEY or LOOPS_TRANSACTIONAL_ID missing → check `vercel logs`
- **Download 401 "expired"**: 30 day token TTL passed; Stripe Dashboard → re-mail customer manually
- **Download 500 "PRODUCT_BLOB_URL missing"**: env var not set
- **DNS doesn't resolve after 1h**: registrar caching, wait or flush

## Files you should NOT commit
- `.env.local` (already in .gitignore)
- `product-build/orangebox-v1/` and `product-build/*.zip` (already in .gitignore — too big)
- `node_modules/` (default)

## Costs running
- Vercel hobby tier: free until you hit 100 GB bandwidth/month (302 KB × ~300k downloads = 90 GB)
- Stripe: 2.9% + $0.30 per sale. $49 → you net ~$47.27.
- Loops free tier: 1k contacts, 2k sends/mo
- Vercel Blob free tier: 1 GB storage, 10 GB bandwidth/mo

## Cancel / reverse
Worst case rollback:
```powershell
vercel domains rm atomeons.com    # detach domain
vercel project rm atomeons-com    # nuke project
git revert HEAD                   # undo commits
```
