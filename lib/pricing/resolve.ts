import { tierFor, countryNameFor, type IncomeTier } from "./countries";
import {
  getProduct,
  DEFAULT_TIER_MULTIPLIERS,
  STRIPE_USD_MIN_CENTS,
} from "./products";
import {
  USA_ADVANTAGE_CLAUSE,
  effectiveTierFor,
  isUsaAdvantage,
} from "./doctrines";

/**
 * Price resolution — the single function downstream code calls.
 *
 *   resolvePrice("orangebox", "GB") → { usdCents: 9900, tier: 1,
 *                                       source: "tier_default", … }      // UK · Tier 1 default
 *   resolvePrice("orangebox", "US") → { usdCents:  990, tier: 1,
 *                                       source: "usa_advantage_clause",
 *                                       usaAdvantage: true, … }          // USA Advantage Clause
 *   resolvePrice("orangebox", "CN") → { usdCents: 9900, tier: 1,
 *                                       source: "strategic_tier_lift",
 *                                       tierLifted: true, … }            // China · lifted WB Tier 2 → 1
 *   resolvePrice("orangebox", "IN") → { usdCents:  990, tier: 3, … }     // India · Tier 3 default
 *   resolvePrice("orangebox", "SO") → { usdCents:  198, tier: 4, … }     // Somalia · Tier 4 default
 *   resolvePrice("orangebox", null) → { usdCents: 9900, tier: 1, … }     // Unknown → Tier 1
 *
 * Called by:
 *   - /api/price/[productId]      (server, Vercel geolocation header)
 *   - /api/checkout/[productId]   (server, Stripe customer country)
 *   - <PriceTag productId>        (client, via fetch to /api/price)
 *
 * Returns a structured result rather than just a number so every caller
 * renders the same transparency UI: tier, country, source of decision,
 * which named doctrine applied (if any), free-floor flag.
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
  source:
    | "tier_default"
    | "tier_override"
    | "usa_advantage_clause"
    | "strategic_tier_lift"
    | "free_below_min";

  /** True if the World Bank tier was lifted by Strategic Tier Lift doctrine. */
  tierLifted: boolean;
  /** True if USA Advantage Clause applied to this resolution. */
  usaAdvantage: boolean;

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
      tierLifted: false,
      usaAdvantage: false,
      free: false,
      unknownCountry: true,
      ok: false,
    };
  }

  const cc = countryCode?.toUpperCase() ?? null;
  const baseCents = product.baseUsdCents;
  const minCents = product.minimumChargeCents ?? STRIPE_USD_MIN_CENTS;

  // 1. WORLD BANK TIER — starting point.
  const worldBankTier = tierFor(cc);

  // 2. STRATEGIC TIER LIFT DOCTRINE — specific countries lifted above
  //    their World Bank tier for stated strategic reasons. China is
  //    the canonical example: WB Tier 2 → lifted to Tier 1.
  const effectiveTier = effectiveTierFor(cc, worldBankTier);
  const tierLifted = effectiveTier !== worldBankTier;

  // 3. PRICING — two doctrine paths + the default tier path.
  let finalCents: number;
  let multiplier: number;
  let source: PriceResolution["source"];
  let usaAdvantage = false;

  if (isUsaAdvantage(cc)) {
    // USA ADVANTAGE CLAUSE — Tier 1 anchor × USA Advantage multiplier (0.1).
    // US is naturally Tier 1, so this is a 10x discount on the anchor.
    multiplier = USA_ADVANTAGE_CLAUSE.multiplier;
    finalCents = Math.round(baseCents * multiplier);
    source = "usa_advantage_clause";
    usaAdvantage = true;
  } else if (product.tierMultipliers?.[effectiveTier] !== undefined) {
    // Per-product tier multiplier override (rare).
    multiplier = product.tierMultipliers[effectiveTier] as number;
    finalCents = Math.round(baseCents * multiplier);
    source = tierLifted ? "strategic_tier_lift" : "tier_override";
  } else {
    // Default tier multiplier.
    multiplier = DEFAULT_TIER_MULTIPLIERS[effectiveTier];
    finalCents = Math.round(baseCents * multiplier);
    source = tierLifted ? "strategic_tier_lift" : "tier_default";
  }

  // 4. STRIPE FREE-FLOOR — defensive safeguard. Under current defaults
  //    (1.0/0.4/0.1/0.02 × $99 base) no country falls below $0.50; the
  //    branch remains for future multiplier changes or low-base products.
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
    tier: effectiveTier,
    tierLabel: TIER_LABELS[effectiveTier],
    usdCents: finalCents,
    displayUsd: formatUsd(finalCents),
    baseUsdCents: baseCents,
    displayBaseUsd: formatUsd(baseCents),
    appliedMultiplier: multiplier,
    source,
    tierLifted,
    usaAdvantage,
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
