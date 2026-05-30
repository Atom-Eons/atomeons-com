import type { IncomeTier } from "./countries";

/**
 * Product registry — single source of truth for every paid lab product.
 *
 * To add a new product (B00KMakor, Video Shop, future SKUs), append
 * one entry below. Everything downstream — /api/price/[productId],
 * <PriceTag productId="…" />, Stripe checkout — reads from this file.
 *
 * Each product carries:
 *
 *   id                  · stable URL slug (also used as productId in checkout metadata)
 *   name                · display name
 *   baseUsdCents        · Tier-1 (high-income) anchor price in USD cents
 *                         (using cents avoids floating-point money drift)
 *   tierMultipliers     · optional · per-product multiplier curve override
 *                         (use sparingly — defaults cover almost everything)
 *   minimumChargeCents  · optional · floor below which the price is
 *                         treated as FREE (Stripe USD min is 50 cents;
 *                         anything below becomes a thank-you gift)
 *   notes               · human-readable description of pricing rationale
 *
 * Per-country overrides DO NOT exist. The system is pure tier-driven:
 *   baseUsdCents × tier multiplier
 * with two NAMED DOCTRINES (see lib/pricing/doctrines.ts) applied as
 * exceptions:
 *   1. USA Advantage Clause  — US gets 10x off Tier 1 ($99 → $9.90)
 *   2. Strategic Tier Lift   — specific countries lifted above their
 *                              World Bank tier (currently: China → T1)
 * Both doctrines are public, reasoned, and reviewable. New geopolitical
 * pricing decisions belong in doctrines.ts as NAMED CLAUSES, never as
 * opaque per-country numbers in this file.
 *
 * License posture: §4A no-saas covenant binds the lab to NEVER move any
 * one-time-priced product to subscription. Per-country pricing is allowed
 * (and intended) under §4A — the covenant is about pricing MODEL, not
 * pricing AMOUNT.
 */

export type CountryCode = string; // ISO 3166-1 alpha-2

export type Product = {
  id: string;
  name: string;
  baseUsdCents: number;
  tierMultipliers?: Partial<Record<IncomeTier, number>>;
  minimumChargeCents?: number;
  notes?: string;
};

/**
 * Default tier multipliers applied to baseUsdCents when no per-product
 * override is set.
 *
 * Tier 1: 1.00x  (high-income · pays full anchor)
 * Tier 2: 0.40x  (upper-middle · ~half-off)
 * Tier 3: 0.10x  (lower-middle · 90% off)
 * Tier 4: 0.02x  (low-income / conflict · floor or free)
 *
 * These multipliers are calibrated against the GNI-per-capita spread
 * (Tier 1 ~$45k median · Tier 4 ~$700 median = ~65x spread). The
 * multipliers are NOT proportional to that spread (that would make
 * Tier 1 ~$650, Tier 4 ~$10) — instead they preserve enough margin
 * in higher tiers to cross-subsidize lower tiers while keeping low-
 * income access genuinely affordable.
 */
export const DEFAULT_TIER_MULTIPLIERS: Record<IncomeTier, number> = {
  1: 1.0,
  2: 0.4,
  3: 0.1,
  4: 0.02,
};

/** Stripe minimum USD charge is $0.50 across most cards. Anything below this becomes FREE. */
export const STRIPE_USD_MIN_CENTS = 50;

// ─────────────────────────────────────────────────────────────────────
// THE PRODUCT REGISTRY
// ─────────────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  {
    id: "orangebox",
    name: "ORANGEBOX",
    baseUsdCents: 9900, // $99 Tier 1 anchor
    minimumChargeCents: STRIPE_USD_MIN_CENTS,
    notes:
      "Launch pricing 2026-05-30. Free for the first week regardless of country (countdown). After countdown the resolver yields: GB $99 (Tier 1 default) · US $9.90 (USA Advantage Clause) · CN $99 (Strategic Tier Lift · WB Tier 2 → Tier 1) · IN $9.90 (Tier 3 default) · SO $1.98 (Tier 4 default). Public messaging: price may change at random.",
  },
  // Future products go below this line. Examples to come:
  //   { id: "b00kmakor", name: "B00KMakor", baseUsdCents: ..., ... },
  //   { id: "video-shop", name: "Video Shop", baseUsdCents: ..., ... },
];

export function getProduct(productId: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === productId);
}

export const KNOWN_PRODUCT_IDS = PRODUCTS.map((p) => p.id);
