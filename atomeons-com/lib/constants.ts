/**
 * Centralized constants. Anything used in more than one file lives here.
 * Architect concern v11: TOKEN_TTL_SECONDS was duplicated; sessionStorage
 * keys were bare strings scattered. Consolidated v12.
 */

export const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

export const SESSION_KEYS = {
  /** AtomBoot one-shot grand entrance overlay */
  BOOT_PLAYED: "atomeons-boot-played",
  /** StickyBuyBar user-dismissed flag */
  STICKYBAR_DISMISSED: "orangebox-stickybar-dismissed",
} as const;

export const PRODUCT = {
  NAME: "ORANGEBOX",
  VERSION: "v1-prototype",
  ZIP_FILENAME: "orangebox-v1.zip",
  DESCRIPTION:
    "Private command cockpit. Single-file prototype. Node 18+. No support.",
  PRICE_USD: 49,
  PRICE_USD_CENTS: 4900,
} as const;

export const SITE = {
  URL: "https://atomeons.com",
  EMAIL: "a.mccree@gmail.com",
  LOCATION: "Marco Island, FL",
} as const;
