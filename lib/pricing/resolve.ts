import { tierFor, countryNameFor, type IncomeTier } from "./countries";
import {
  getProduct,
  DEFAULT_TIER_MULTIPLIERS,
  STRIPE_USD_MIN_CENTS,
  type Product,
} from "./products";

/**
 * Price resolution — the single function downstream code calls.
 *
 *   resolvePrice("orangebox", "IN")  →  { usdCents: 99, tier: 3, free: false, ... }
 *   resolvePrice("orangebox", "SO")  →  { usdCents: 0, tier: 4, free: true,  ... }
 *   resolvePrice("orangebox", "US")  →  { usdCents: 999, tier: 1, free: false, ... }
 *   resolvePrice("orangebox", null)  →  { usdCents: 9900, tier: 1, free: false, ... }
 *
 * The same call is made by:
 *   - /api/price/[productId]      (server-side, with Vercel geolocation header)
 *   - /api/checkout/[productId]   (server-side, with Stripe customer country)
 *   - <PriceTag productId>        (client-side, via fetch to /api/price)
 *
 * Returns a structured result rather than just a number so every caller
 * can render the same transparency UI (tier name, country name, why this
 * price, "rounded up to processor minimum" / "below minimum → free").
 */

export type PriceResolution = {
  productId: string;
  productName: string;
  countryCode: string | null;
  countryName: string;
  tier: IncomeTier;
  tierLabel: string;

  /** What price actually charges (USD cents). 0 if free. */
  usdCents: number;
  /** Human-readable USD display ($X.YY or "FREE"). */
  displayUsd: string;

  /** Anchor price for Tier 1 buyers — the "list price." */
  baseUsdCents: number;
  displayBaseUsd: string;

  /** Multiplier actually applied (after override). 1.0 = full price, 0.0 = free. */
  appliedMultiplier: number;

  /** Source of the price decision. */
  source: "country_override" | "tier_default" | "tier_override" | "rounded_up" | "free_below_min";

  /** True if final charge would be < Stripe min and gets gifted free. */
  free: boolean;

  /** True if no country was detected (fell back to baseUsdCents). */
  unknownCountry: boolean;

  /** True if base was found and tier resolved cleanly. */
  ok: boolean;
};

const TIER_LABELS: Record<IncomeTier, string> = {
  1: "High-income",
  2: "Upper-middle-income",
  3: "Lower-middle-income",
  4: "Low-income",
};

function formatUsd(cents: number): string {
  if (cents <= 0) return "FREE";
  const dollars = cents / 100;
  // 99 cents → "$0.99"; 999 → "$9.99"; 9900 → "$99"
  if (cents < 100) return `$${dollars.toFixed(2)}`;
  if (cents % 100 === 0) return `$${Math.round(dollars)}`;
  return `$${dollars.toFixed(2)}`;
}

export function resolvePrice(
  productId: string,
  countryCode: string | null | undefined,
): PriceResolution {
  const product = getProduct(productId);
  if (!product) {
    return {
      productId,
      productName: productId,
      countryCode: countryCode ?? null,
      countryName: countryNameFor(countryCode),
      tier: 1,
      tierLabel: TIER_LABELS[1],
      usdCents: 0,
      displayUsd: "—",
      baseUsdCents: 0,
      displayBaseUsd: "—",
      appliedMultiplier: 0,
      source: "tier_default",
      free: false,
      unknownCountry: true,
      ok: false,
    };
  }

  const cc = countryCode?.toUpperCase() ?? null;
  const tier = tierFor(cc);
  const baseCents = product.baseUsdCents;
  const minCents = product.minimumChargeCents ?? STRIPE_USD_MIN_CENTS;

  let finalCents: number;
  let multiplier: number;
  let source: PriceResolution["source"];

  // 1. Per-country override wins
  const override = cc ? product.perCountryOverrides?.[cc] : undefined;
  if (override !== undefined) {
    finalCents = override;
    multiplier = override / baseCents;
    source = "country_override";
  } else {
    // 2. Tier multiplier (per-product override OR default)
    const tierMult =
      product.tierMultipliers?.[tier] ?? DEFAULT_TIER_MULTIPLIERS[tier];
    multiplier = tierMult;
    finalCents = Math.round(baseCents * tierMult);
    source = product.tierMultipliers?.[tier] !== undefined ? "tier_override" : "tier_default";
  }

  // 3. Apply Stripe minimum floor — below min becomes FREE (not rounded up,
  // because the operator's stated philosophy is fairness, not extraction).
  let free = false;
  if (finalCents > 0 && finalCents < minCents) {
    free = true;
    finalCents = 0;
    source = "free_below_min";
  }

  return {
    productId: product.id,
    productName: product.name,
    countryCode: cc,
    countryName: countryNameFor(cc),
    tier,
    tierLabel: TIER_LABELS[tier],
    usdCents: finalCents,
    displayUsd: formatUsd(finalCents),
    baseUsdCents: baseCents,
    displayBaseUsd: formatUsd(baseCents),
    appliedMultiplier: multiplier,
    source,
    free,
    unknownCountry: !cc,
    ok: true,
  };
}

/**
 * Extract country code from a Next.js / Vercel request.
 *
 * Order of preference:
 *   1. Vercel's geolocation header `x-vercel-ip-country` (free, no API call)
 *   2. Cloudflare's `cf-ipcountry` (if behind CF)
 *   3. `?cc=XX` URL query param (for testing / explicit override)
 *
 * Returns null if no detection.
 */
export function detectCountry(req: Request): string | null {
  // URL param wins (operator override / testing)
  try {
    const url = new URL(req.url);
    const param = url.searchParams.get("cc");
    if (param && /^[A-Za-z]{2}$/.test(param)) return param.toUpperCase();
  } catch {
    // ignore url parse errors
  }
  const vercelCountry = req.headers.get("x-vercel-ip-country");
  if (vercelCountry && /^[A-Z]{2}$/.test(vercelCountry)) return vercelCountry;
  const cfCountry = req.headers.get("cf-ipcountry");
  if (cfCountry && /^[A-Z]{2}$/.test(cfCountry)) return cfCountry.toUpperCase();
  return null;
}
