# atomeons.com — AE brand website + ORANGEBOX store

Next.js 16 + Stripe Checkout. Brand site for AtomEons / ÆoNs Research Lab, plus a complete e-commerce surface for the ORANGEBOX prototype ($49 one-time download).

## Stack
- Next.js 16 (App Router) + React 19 + Tailwind v4
- Stripe Checkout (one-time `payment` mode)
- HMAC-signed download tokens (no DB)
- Vercel Blob (or any HTTPS URL) for the product ZIP
- Loops or Resend for receipt email

## Local dev
```powershell
pnpm install
cp .env.example .env.local
pnpm dev
```

## Deploy
1. Push the `atomeons-com/` directory to a GitHub repo (e.g. `atomeons-com`).
2. Vercel → Import → select repo → root = `atomeons-com/`.
3. Set all env vars from `.env.example`.
4. Deploy.
5. In Stripe dashboard, add a webhook endpoint at `https://atomeons.com/api/webhook`, listen for `checkout.session.completed`, copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
6. Upload the product ZIP to Vercel Blob (`vercel blob put orangebox-v1.zip --add-random-suffix`), paste the URL into `PRODUCT_BLOB_URL`.
7. Point `atomeons.com` DNS to Vercel.

## Smoke test
```powershell
# Use Stripe test card 4242 4242 4242 4242 with test keys.
# Webhook fires → email is sent → /api/download?t=... 302s to the blob URL.
```

## Routes
**Brand**
- `GET /` — AE brand home (hero, doctrine, what-we-ship, CTA)
- `GET /orangebox` — full ORANGEBOX product page + buy flow
- `GET /about` — Atom + ÆoNs Research Lab + doctrine

**Store**
- `POST /api/checkout` — creates Stripe Checkout Session, returns `{url}`
- `POST /api/webhook` — Stripe webhook; mints token, sends email
- `GET /api/download?t=<token>` — verifies HMAC, redirects to blob URL
- `GET /success?session_id=...` — post-purchase confirmation
- `GET /cancel` — Stripe cancel return

**Legal**
- `GET /legal/{terms,privacy,refund}`

Shared `<Header>` + `<Footer>` on every page via root layout.
