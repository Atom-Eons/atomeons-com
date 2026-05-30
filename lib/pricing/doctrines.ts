import type { IncomeTier } from "./countries";

/**
 * Pricing doctrines — named, public, reasoned country-level decisions.
 *
 * The default pricing system is pure tier-driven: World Bank income
 * classification × tier multiplier × product base price. That covers
 * 95%+ of countries automatically with no per-country thinking.
 *
 * Two NAMED DOCTRINES override the default for specific countries.
 * Each doctrine carries an explicit reasoning that survives in code,
 * in the public marketing paper, and in the transparency page. These
 * are NOT arbitrary per-country overrides — they are operator-stated
 * pricing positions that have a NAME, a SCOPE, and a REASON.
 *
 * If a country needs different pricing, the question to answer first
 * is: which existing doctrine does this fall under, or does this
 * deserve a NEW NAMED DOCTRINE? Adding random per-country numbers
 * without a named doctrine is the failure mode this file exists to
 * prevent.
 */

// ─────────────────────────────────────────────────────────────────────
// DOCTRINE 1 · USA ADVANTAGE CLAUSE
// ─────────────────────────────────────────────────────────────────────
//
// Operator directive 2026-05-30: 'I do like US at a 10x global first
// world competition.'
//
// US buyers pay 1/10 of the Tier 1 anchor. Stated reasoning:
//   - The 44-million-displaced-workers frame is the lab's stated
//     mission anchor. Those workers live in the US.
//   - US is the lab's home market and the population the lab is
//     trying to reach first.
//   - The discount accepts ~$90 of per-buyer margin in exchange for
//     an order-of-magnitude more US adoption.
//
// Mechanism: when the resolver detects a US buyer, the tier
// multiplier is REPLACED by USA_ADVANTAGE_MULTIPLIER. The buyer is
// still Tier 1 (high-income); they just get the named-clause
// discount.
//
// This is published. A US buyer can read /legal/pricing and see
// exactly why they got the price they got. The clause is reviewable
// and revocable; if mission alignment changes, the clause is
// retired publicly via /changelog.

export const USA_ADVANTAGE_CLAUSE = {
  name: "USA Advantage Clause",
  countries: ["US"] as const,
  /** Multiplier applied to the Tier 1 anchor for US buyers. */
  multiplier: 0.1,
  reasoning:
    "Mission alignment with the 44M displaced-worker frame. US is the lab's home market and stated focus. The clause accepts ~$90/buyer margin in exchange for an order-of-magnitude more US adoption.",
  published: "/legal/pricing · /dynamic-world-pricing · /manifesto (clause 04 covenant compatible)",
} as const;

// ─────────────────────────────────────────────────────────────────────
// DOCTRINE 2 · STRATEGIC TIER LIFT
// ─────────────────────────────────────────────────────────────────────
//
// Operator directive 2026-05-30: 'China is 99.'
//
// Specific countries are lifted ABOVE their World Bank classification
// for stated strategic reasons. Currently the doctrine names exactly
// one country: China, lifted from World Bank Tier 2 (Upper-Middle-
// Income) to Tier 1 (High-Income) for pricing purposes.
//
// Stated reasoning: state-backed adversarial markets receive the
// full anchor price regardless of GNI per capita classification.
// The lab's pricing fairness mechanism is calibrated for INDIVIDUAL
// buyers in lower-income economies, not for buyers operating inside
// a state-backed economic posture that already has substantial
// access to capital and tooling. Tier-lift is the explicit
// adjustment.
//
// The doctrine is reviewable. If the operator wants to lift or
// drop a country in the future, the change is one entry below with
// a stated reason that survives in /changelog.

export const STRATEGIC_TIER_LIFT = {
  name: "Strategic Tier Lift",
  /**
   * country code → tier the country is LIFTED INTO (overrides the
   * World Bank classification in countries.ts).
   */
  lifts: {
    CN: 1, // China: WB Tier 2 → lifted to Tier 1 for pricing
  } as Record<string, IncomeTier>,
  reasoning:
    "State-backed adversarial markets pay the high-income anchor regardless of GNI per capita classification. The fairness mechanism is calibrated for individual buyers in lower-income economies, not for buyers operating inside a state-backed economic posture with substantial capital access. Lift is explicit, named, public, reviewable.",
  published: "/legal/pricing · /dynamic-world-pricing",
} as const;

// ─────────────────────────────────────────────────────────────────────
// DOCTRINE APPLICATION HELPERS
// ─────────────────────────────────────────────────────────────────────

/** Returns the tier to apply for pricing — may differ from World Bank tier. */
export function effectiveTierFor(
  countryCode: string | null | undefined,
  worldBankTier: IncomeTier,
): IncomeTier {
  if (!countryCode) return worldBankTier;
  const lifted = STRATEGIC_TIER_LIFT.lifts[countryCode.toUpperCase()];
  return lifted ?? worldBankTier;
}

/** Returns true if a country code is covered by the USA Advantage Clause. */
export function isUsaAdvantage(countryCode: string | null | undefined): boolean {
  if (!countryCode) return false;
  return (USA_ADVANTAGE_CLAUSE.countries as readonly string[]).includes(
    countryCode.toUpperCase(),
  );
}

/** All currently-active named doctrines. For diagnostics + transparency. */
export const ACTIVE_DOCTRINES = [
  USA_ADVANTAGE_CLAUSE,
  STRATEGIC_TIER_LIFT,
] as const;
