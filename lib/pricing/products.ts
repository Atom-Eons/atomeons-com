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
 *   tierMultipliers     · optional · override the default multipliers per
 *                         product if you want a different curve
 *   perCountryOverrides · optional · ISO-2 code → USD cents · forces
 *                         a specific country to a specific price,
 *                         bypassing the tier system entirely
 *   minimumChargeCents  · optional · floor below which the price is
 *                         treated as FREE (Stripe USD min is 50 cents;
 *                         anything below becomes a thank-you gift)
 *   notes               · human-readable description of pricing rationale
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
  perCountryOverrides?: Record<CountryCode, number>; // value in USD cents
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
    baseUsdCents: 9900, // $99 base (Tier 1 anchor — operator's example)
    perCountryOverrides: {
      // Operator-set anchors (2026-05-30): see /legal/pricing for the
      // explicit reasoning behind these specific numbers.
      US: 999, // $9.99 · operator framing: accessible US pricing
      IN: 99, // $0.99 · operator framing: India at fairness pricing
      SO: 1, // $0.01 · operator framing: Somalia at the floor (→ FREE since < $0.50 Stripe min)
    },
    minimumChargeCents: STRIPE_USD_MIN_CENTS,
    notes:
      "Operator-anchored launch pricing 2026-05-30. Free for the first week regardless of country (countdown). After countdown: Tier 1 default = $99, US override = $9.99, India override = $0.99, Somalia override = $0.01 (→ free under Stripe minimum). Public messaging: price may change at random.",
  },
  // Future products go below this line. Examples to come:
  //   { id: "b00kmakor", name: "B00KMakor", baseUsdCents: ..., ... },
  //   { id: "video-shop", name: "Video Shop", baseUsdCents: ..., ... },
];

export function getProduct(productId: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === productId);
}

export const KNOWN_PRODUCT_IDS = PRODUCTS.map((p) => p.id);
