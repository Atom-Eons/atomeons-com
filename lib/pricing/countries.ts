/**
 * Country → World Bank income tier mapping.
 *
 * Source: World Bank country classifications by income level for FY26
 * (July 2025 – June 2026). GNI per capita thresholds (2024 Atlas):
 *
 *   Tier 1 — High-income       (> $13,935 GNI/capita) · 93 countries
 *   Tier 2 — Upper-middle      ($4,496 – $13,935)     · 55 countries
 *   Tier 3 — Lower-middle      ($1,136 – $4,495)      · 50 countries
 *   Tier 4 — Low-income        (≤ $1,135)             · 25 countries
 *
 * Unknown country codes default to Tier 1 (full price — better to
 * over-charge marginally than to leak revenue on misclassification).
 *
 * Updated annually each July when the World Bank revises tiers.
 *
 * Public source: https://blogs.worldbank.org/en/opendata/world-bank-country-classifications-by-income-level-for-2024-2025
 */

export type IncomeTier = 1 | 2 | 3 | 4;

const COUNTRY_TIERS: Record<string, IncomeTier> = {
  // ── TIER 1 · HIGH-INCOME ─────────────────────────────────────────
  // North America
  US: 1, CA: 1,
  // Western Europe
  GB: 1, IE: 1, FR: 1, DE: 1, NL: 1, BE: 1, LU: 1, AT: 1, CH: 1,
  IT: 1, ES: 1, PT: 1, GR: 1, CY: 1, MT: 1, AD: 1, MC: 1, SM: 1,
  VA: 1, LI: 1,
  // Northern Europe
  SE: 1, NO: 1, FI: 1, DK: 1, IS: 1, EE: 1, LV: 1, LT: 1,
  // Central / Eastern Europe high-income
  CZ: 1, SK: 1, SI: 1, HU: 1, PL: 1, HR: 1,
  // Asia high-income
  JP: 1, KR: 1, SG: 1, HK: 1, TW: 1, MO: 1, IL: 1,
  // Middle East high-income
  AE: 1, QA: 1, KW: 1, BH: 1, OM: 1, SA: 1,
  // Oceania
  AU: 1, NZ: 1, NC: 1, PF: 1, GU: 1,
  // Caribbean / Latin America high-income
  PR: 1, BS: 1, BB: 1, TT: 1, AG: 1, AW: 1, BM: 1, KY: 1, KN: 1,
  VG: 1, VI: 1, CW: 1, SX: 1, TC: 1,
  // Other high-income
  PA: 1, UY: 1, CL: 1, RO: 1,
  // Small high-income island states
  SC: 1,

  // ── TIER 2 · UPPER-MIDDLE-INCOME ─────────────────────────────────
  CN: 2, RU: 2, BR: 2, MX: 2, AR: 2, TR: 2, ZA: 2, MY: 2, TH: 2,
  KZ: 2, BG: 2, RS: 2, BA: 2, ME: 2, MK: 2, AL: 2, BY: 2, MD: 2,
  GE: 2, AM: 2, AZ: 2, TM: 2,
  CO: 2, PE: 2, EC: 2, PY: 2, DO: 2, JM: 2, CR: 2, CU: 2,
  BZ: 2, SR: 2,
  // GT (Guatemala) is Lower-middle per FY26 — see Tier 3 below.
  IR: 2, IQ: 2, JO: 2, LB: 2, LY: 2, DZ: 2, TN: 2,
  NA: 2, BW: 2, GA: 2, MU: 2, FJ: 2, MV: 2,
  // Pacific upper-middle
  TO: 2, TV: 2, MH: 2, FM: 2, PW: 2,

  // ── TIER 3 · LOWER-MIDDLE-INCOME ─────────────────────────────────
  IN: 3, ID: 3, PH: 3, VN: 3, BD: 3, PK: 3,
  EG: 3, MA: 3, GH: 3, KE: 3, NG: 3, SN: 3, CI: 3, CM: 3, AO: 3,
  ZM: 3, ZW: 3, TZ: 3, // some sources list TZ as low; per FY26 lower-middle
  ML: 3,
  UA: 3, KG: 3, UZ: 3, TJ: 3, MN: 3,
  BO: 3, HN: 3, SV: 3, NI: 3, GT: 3, VE: 3,
  LK: 3, NP: 3, BT: 3, KH: 3, LA: 3, MM: 3, TL: 3, PG: 3,
  DJ: 3, MR: 3, CV: 3, SZ: 3, LS: 3, ST: 3,
  HT: 3, PS: 3, SB: 3, VU: 3, KI: 3, WS: 3,

  // ── TIER 4 · LOW-INCOME ──────────────────────────────────────────
  AF: 4, YE: 4, SY: 4,
  ET: 4, UG: 4, RW: 4, BI: 4, MZ: 4, MW: 4, MG: 4, SD: 4, SS: 4,
  SO: 4, ER: 4, CD: 4, CF: 4, TD: 4, NE: 4, BF: 4, GN: 4, GW: 4,
  SL: 4, LR: 4, TG: 4, BJ: 4, GM: 4, KP: 4,
};

export function tierFor(countryCode: string | null | undefined): IncomeTier {
  if (!countryCode) return 1;
  const cc = countryCode.toUpperCase();
  return COUNTRY_TIERS[cc] ?? 1; // default to high-income if unknown
}

export function countryCodeIsKnown(countryCode: string | null | undefined): boolean {
  if (!countryCode) return false;
  return Boolean(COUNTRY_TIERS[countryCode.toUpperCase()]);
}

/** All country codes the system explicitly recognizes. For diagnostics. */
export const KNOWN_COUNTRIES: readonly string[] = Object.keys(COUNTRY_TIERS);

/** Tier counts for transparency. */
export const TIER_COUNTS = {
  tier1: KNOWN_COUNTRIES.filter((c) => COUNTRY_TIERS[c] === 1).length,
  tier2: KNOWN_COUNTRIES.filter((c) => COUNTRY_TIERS[c] === 2).length,
  tier3: KNOWN_COUNTRIES.filter((c) => COUNTRY_TIERS[c] === 3).length,
  tier4: KNOWN_COUNTRIES.filter((c) => COUNTRY_TIERS[c] === 4).length,
  total: KNOWN_COUNTRIES.length,
} as const;

/**
 * Human-readable country name for diagnostics and transparency UI.
 * Only the most-traffic 50 are named here; everything else falls back
 * to the raw ISO code. Adding more is a one-line edit.
 */
const COUNTRY_NAMES: Record<string, string> = {
  US: "United States", CA: "Canada", GB: "United Kingdom", FR: "France",
  DE: "Germany", IT: "Italy", ES: "Spain", NL: "Netherlands", SE: "Sweden",
  NO: "Norway", FI: "Finland", DK: "Denmark", IE: "Ireland", CH: "Switzerland",
  AT: "Austria", BE: "Belgium", PT: "Portugal", PL: "Poland", GR: "Greece",
  JP: "Japan", KR: "South Korea", SG: "Singapore", AU: "Australia",
  NZ: "New Zealand", IL: "Israel", AE: "United Arab Emirates", SA: "Saudi Arabia",
  HK: "Hong Kong", TW: "Taiwan",
  CN: "China", RU: "Russia", BR: "Brazil", MX: "Mexico", AR: "Argentina",
  TR: "Türkiye", ZA: "South Africa", MY: "Malaysia", TH: "Thailand",
  IN: "India", ID: "Indonesia", PH: "Philippines", VN: "Vietnam",
  BD: "Bangladesh", PK: "Pakistan", EG: "Egypt", NG: "Nigeria", KE: "Kenya",
  UA: "Ukraine",
  AF: "Afghanistan", YE: "Yemen", ET: "Ethiopia", SO: "Somalia", SD: "Sudan",
  SS: "South Sudan", CD: "DR Congo", RW: "Rwanda", BI: "Burundi", MW: "Malawi",
  MZ: "Mozambique", UG: "Uganda", KP: "North Korea",
};

export function countryNameFor(countryCode: string | null | undefined): string {
  if (!countryCode) return "Unknown";
  const cc = countryCode.toUpperCase();
  return COUNTRY_NAMES[cc] ?? cc;
}
