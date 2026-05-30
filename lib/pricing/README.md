# `lib/pricing` — PPP / Fair-Pricing System

Single source of truth for how every paid AtomEons product is priced
per country. Reusable across ORANGEBOX, B00KMakor, Video Shop, and
every future SKU.

## Why

Operator doctrine (2026-05-30): "I need you to dynamically price
when we do price based on poverty level. In America I want
ORANGEBOX $9.99 but in India I want it more fair 99 cents, UK $99,
Somalia 1 penny etc. All products must follow this system."

This module is the implementation. World Bank income tiers + per-
product anchors + per-country overrides + Stripe-minimum free-floor.

## How (the 30-second version)

```
buyer hits page
  → /api/price/<product> fires (country detected from Vercel IP header)
    → lib/pricing/resolve.ts:resolvePrice("<product>", country)
      → looks up country tier in lib/pricing/countries.ts
      → looks up product anchor in lib/pricing/products.ts
      → applies override or default-tier-multiplier
      → floors anything below Stripe's $0.50 USD min to FREE
  → returns { usdCents, displayUsd, tier, source, free, ... }
buyer sees their country's price + small transparency chip
checkout uses the SAME function (server-side) — no front/back drift
```

## Adding a new product (B00KMakor, Video Shop, etc.)

ONE file change. Open `lib/pricing/products.ts` and append:

```ts
export const PRODUCTS: Product[] = [
  { id: "orangebox", ... },
  // NEW:
  {
    id: "b00kmakor",
    name: "B00KMakor",
    baseUsdCents: 14900,        // $149 Tier-1 anchor
    perCountryOverrides: {
      US: 1999,                  // $19.99 in US
      IN: 199,                   // $1.99 in India
      SO: 1,                     // 1¢ Somalia → free under Stripe min
    },
    notes: "Set 2026-XX-XX. Reasoning: ...",
  },
];
```

That's it. Once the entry exists:
- `/api/price/b00kmakor?cc=IN` immediately returns the right price
- `<PriceTag productId="b00kmakor" variant="hero" />` works anywhere
- `/legal/pricing` auto-renders B00KMakor in the product table
- The Stripe checkout integration reads the same resolution

No component edits. No route changes. No copy-paste.

## The tier system

| Tier | World Bank classification | GNI/capita (USD) | Default multiplier |
|------|---------------------------|------------------|--------------------|
| 1    | High-income               | > $13,935        | 1.00x (base)       |
| 2    | Upper-middle-income       | $4,496–$13,935   | 0.40x              |
| 3    | Lower-middle-income       | $1,136–$4,495    | 0.10x              |
| 4    | Low-income                | ≤ $1,135         | 0.02x              |

Tier mapping is the World Bank FY2026 classification (2024 GNI per
capita Atlas method). Updated annually each July. The constant lives
in `lib/pricing/countries.ts` — when the World Bank revises, edit
that file.

## Override hierarchy (highest priority first)

1. **Per-country override** — `product.perCountryOverrides["IN"]`
2. **Per-product tier override** — `product.tierMultipliers[3]`
3. **Default tier multiplier** — `DEFAULT_TIER_MULTIPLIERS[3]`

So when the operator sets a specific anchor like `US: 999` ($9.99),
that wins over the tier system entirely. The tier system is the
default — overrides are when the operator wants a specific number
for political / strategic / market reasons.

## Stripe minimum free-floor

Stripe's USD minimum charge is $0.50. When the fairness mechanism
produces a price below that floor (e.g. Somalia at 1¢), the price
is set to FREE rather than rounded up. This is consistent with the
doctrine that the goal is fairness, not extraction at the margin.

## Country detection

Order of preference in `lib/pricing/resolve.ts:detectCountry()`:

1. URL query param `?cc=XX` (for testing / explicit override)
2. Vercel header `x-vercel-ip-country` (default in production)
3. Cloudflare header `cf-ipcountry` (if behind CF)
4. `null` (defaults to Tier 1 base price)

## Auditing your own price

```bash
# default — detected from your IP
curl https://atomeons.com/api/price/orangebox

# explicit country
curl https://atomeons.com/api/price/orangebox?cc=IN

# Somalia (should return free=true)
curl https://atomeons.com/api/price/orangebox?cc=SO
```

The response is structured JSON with the resolved price, the tier,
the multiplier, the source, and the base list price. No surprises.

## Public transparency

`/legal/pricing` renders the full mechanism for the public —
World Bank tier table, current product anchors, per-country
overrides, Stripe-minimum policy, country-detection method,
VPN-abuse posture, §4A no-saas compatibility statement.

When the operator wants to point a buyer at "why am I being charged
this," the link is that page.

## §4A no-saas compatibility

License §4A (no-saas covenant) binds the lab to never move any
one-time-priced product to a subscription model. Per-country
pricing is allowed under §4A — the covenant is about pricing
MODEL (one-time vs. recurring), not pricing AMOUNT (USD vs. INR
vs. KES).

A buyer at $99 and a buyer at $0.99 are both paying ONCE, FOREVER,
for the same product. That's §4A-compliant.

## Files

- `countries.ts` — ISO-2 country code → World Bank income tier (1–4).
  Updates: each July when the World Bank revises classifications.
- `products.ts` — Product registry. ADD NEW PRODUCTS HERE.
- `resolve.ts` — `resolvePrice(productId, country) → PriceResolution`.
  This is the function every downstream caller uses. Do not duplicate.
- `README.md` — this file.

## Calling sites

- `app/api/price/[productId]/route.ts` — public JSON endpoint
- `app/_components/PriceTag.tsx` — client display component (3 variants)
- `app/legal/pricing/page.tsx` — public transparency page
- `app/api/checkout/*` — Stripe checkout (TODO: wire when binary ships)
- `app/orangebox/*`, `app/pricing/*` — display via `<PriceTag />`

## Future work

- Stripe Adaptive Pricing integration (multi-currency rendering at checkout)
- Annual World Bank tier refresh job (cron or manual on July 1)
- Optional: PPP factor refinement using World Bank PPP conversion factors
  for finer-grained per-country adjustment within tiers
