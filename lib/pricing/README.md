# `lib/pricing` — Dynamic World Pricing System

Single source of truth for how every paid AtomEons product is priced
per country. Reusable across ORANGEBOX, B00KMakor, Video Shop, and
every future SKU.

## Why

Operator doctrine (2026-05-30): "Dynamically price based on poverty
level. All products must follow this system." Plus the refinements
that followed: "no country override that is the glitch" / "all your
system mine were random numbers and for concept only" / "I do like
US at a 10x global first world competition. China is 99" / "USA
Advantage Pricing Clause."

The system that emerged: pure tier-driven defaults for ~95% of
countries (no per-country thinking), plus TWO NAMED DOCTRINES for
the specific geopolitical decisions the operator has chosen to
publish. No opaque per-country overrides anywhere.

## How (the 30-second version)

```
buyer hits page
  → /api/price/<product> fires (country detected from Vercel IP header)
    → lib/pricing/resolve.ts:resolvePrice("<product>", country)
      → looks up country tier in lib/pricing/countries.ts
      → applies Strategic Tier Lift if country is on the lift list
      → applies USA Advantage Clause if country is US
      → otherwise: base × tier multiplier
      → defensive: floors anything below Stripe's $0.50 USD min to FREE
  → returns { usdCents, tier, source, usaAdvantage, tierLifted, free, ... }
buyer sees their country's price + small transparency chip
checkout uses the SAME function (server-side) — no front/back drift
```

## The two named doctrines

Both live in `lib/pricing/doctrines.ts`. Both are public, reasoned,
and reviewable.

### USA Advantage Pricing Clause

US buyers pay 10% of the Tier 1 anchor — $9.90 on a $99 product.
Operator-declared, mission-aligned with the 44M displaced-worker
frame. Scope: `US` only. Multiplier: `0.1`. Published in
`/legal/pricing` and `/dynamic-world-pricing`.

### Strategic Tier Lift

Specific countries lifted ABOVE their World Bank classification for
stated strategic reasons. Currently: China lifted from WB Tier 2 →
Tier 1 ($99). Reasoning: state-backed adversarial markets pay the
anchor price regardless of GNI per capita. Lifts are entries in
`STRATEGIC_TIER_LIFT.lifts` — one line per country.

Adding/removing a country from either doctrine is one file edit
plus a `/changelog` entry. Geopolitical pricing decisions live as
named clauses, never as opaque per-country numbers in `products.ts`.

## Adding a new product (B00KMakor, Video Shop, etc.)

ONE file change. Open `lib/pricing/products.ts` and append:

```ts
export const PRODUCTS: Product[] = [
  { id: "orangebox", ... },
  // NEW:
  {
    id: "b00kmakor",
    name: "B00KMakor",
    baseUsdCents: 14900,                 // $149 Tier-1 anchor
    // tierMultipliers: optional — only set if this product needs a
    // different curve than the defaults. Most products don't.
    notes: "Set 2026-XX-XX. Reasoning: ...",
  },
];
```

That's it. Once the entry exists:
- `/api/price/b00kmakor?cc=US` immediately returns $14.90 (USA Advantage)
- `/api/price/b00kmakor?cc=CN` returns $149 (Strategic Tier Lift)
- `/api/price/b00kmakor?cc=IN` returns $14.90 (Tier 3 default)
- `<PriceTag productId="b00kmakor" variant="hero" />` works anywhere
- `/legal/pricing` auto-renders B00KMakor in the product table
- The Stripe checkout integration reads the same resolution

No component edits. No route changes. No copy-paste. The named
doctrines apply to every product automatically.

## The tier system

| Tier | World Bank classification | GNI/capita (USD) | Default multiplier | $99 anchor → |
|------|---------------------------|------------------|--------------------|--------------|
| 1    | High-income               | > $13,935        | 1.00x (base)       | $99.00       |
| 2    | Upper-middle-income       | $4,496–$13,935   | 0.40x              | $39.60       |
| 3    | Lower-middle-income       | $1,136–$4,495    | 0.10x              | $9.90        |
| 4    | Low-income                | ≤ $1,135         | 0.02x              | $1.98        |

Tier mapping is the World Bank FY2026 classification (2024 GNI per
capita Atlas method). Updated annually each July. The constant lives
in `lib/pricing/countries.ts` — when the World Bank revises, edit
that file.

## Resolution order (highest priority first)

1. **USA Advantage Clause** — country is in `USA_ADVANTAGE_CLAUSE.countries` (currently `US`)
2. **Strategic Tier Lift** — country has an entry in `STRATEGIC_TIER_LIFT.lifts` (currently `CN`); the lifted tier replaces the World Bank tier going forward
3. **Per-product tier override** — `product.tierMultipliers[effectiveTier]` (rare)
4. **Default tier multiplier** — `DEFAULT_TIER_MULTIPLIERS[effectiveTier]`
5. **Stripe free-floor safeguard** — if any of the above produced a result below `$0.50`, the price becomes FREE

`PriceResolution` returns `source` as one of:
`tier_default | tier_override | usa_advantage_clause | strategic_tier_lift | free_below_min`,
plus two boolean convenience flags: `usaAdvantage`, `tierLifted`.

## Stripe minimum free-floor

Stripe's USD minimum charge is $0.50. The free-floor doctrine says:
when the fairness mechanism produces a price below $0.50, give the
product FREE rather than round up. Under current default multipliers
no country lands below $0.50, so the doctrine sits as a published
safeguard — invoked the moment a future product or multiplier curve
produces a sub-floor result.

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

# explicit country (testing)
curl https://atomeons.com/api/price/orangebox?cc=GB   # tier default · $99
curl https://atomeons.com/api/price/orangebox?cc=US   # USA Advantage Clause · $9.90
curl https://atomeons.com/api/price/orangebox?cc=CN   # Strategic Tier Lift · $99
curl https://atomeons.com/api/price/orangebox?cc=IN   # tier default · $9.90
curl https://atomeons.com/api/price/orangebox?cc=SO   # tier default · $1.98
```

The response is structured JSON with the resolved price, the
effective tier (after any tier lift), the multiplier, the named
source, and the base list price. Two booleans (`usaAdvantage`,
`tierLifted`) say plainly whether a named clause applied.

## Public transparency

`/legal/pricing` renders the full mechanism for the public —
World Bank tier table, the two named doctrines with their published
reasoning, current product anchors, Stripe-minimum policy,
country-detection method, VPN-abuse posture, §4A no-saas
compatibility statement.

`/dynamic-world-pricing` is the longer-form public paper that
documents the synthesis (seven named doctrines, including USA
Advantage Pricing Clause and Strategic Tier Lift) as the lab's
original contribution.

## §4A no-saas compatibility

License §4A (no-saas covenant) binds the lab to never move any
one-time-priced product to a subscription model. Per-country
pricing is allowed under §4A — the covenant is about pricing
MODEL (one-time vs. recurring), not pricing AMOUNT (USD vs. INR
vs. KES).

A buyer at $99 and a buyer at $1.98 are both paying ONCE, FOREVER,
for the same product. That's §4A-compliant.

## Files

- `countries.ts` — ISO-2 country code → World Bank income tier (1–4).
  Updates: each July when the World Bank revises classifications.
- `doctrines.ts` — Named country doctrines (USA Advantage Clause,
  Strategic Tier Lift). The only place where specific countries get
  non-default treatment.
- `products.ts` — Product registry. ADD NEW PRODUCTS HERE.
- `resolve.ts` — `resolvePrice(productId, country) → PriceResolution`.
  The single function every downstream caller uses. Do not duplicate.
- `README.md` — this file.

## Calling sites

- `app/api/price/[productId]/route.ts` — public JSON endpoint
- `app/_components/PriceTag.tsx` — client display component (3 variants)
- `app/legal/pricing/page.tsx` — public transparency page
- `app/dynamic-world-pricing/page.tsx` — public marketing paper
- `app/api/checkout/*` — Stripe checkout (TODO: wire when binary ships)
- `app/orangebox/*`, `app/pricing/*` — display via `<PriceTag />`

## Future work

- Stripe Adaptive Pricing integration (multi-currency rendering at checkout)
- Annual World Bank tier refresh job (cron or manual on July 1)
- Optional: PPP factor refinement using World Bank PPP conversion factors
  for finer-grained per-country adjustment within tiers
- Doctrine review cadence (operator-set, e.g. quarterly): confirm
  USA Advantage Clause and Strategic Tier Lift still align with
  stated mission and posture
