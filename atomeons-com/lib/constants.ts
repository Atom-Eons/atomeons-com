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
  VERSION: "v1.4.0",
  ZIP_FILENAME: "ORANGEBOX-OS-AIO-v1.4.0.zip",
  ZIP_SHA256:
    "f244b973cb61dd47c85a5ce05a01c764785c746a6d56f5a5d20745310acb4f3e",
  ZIP_SIZE_BYTES: 26016312,
  GITHUB_RELEASE_URL:
    "https://github.com/AtomEons/orangebox-os/releases/tag/v1.4.0",
  DISCLOSURE_ID: "ATOM-ORANGEBOX-V1-4-CODEXA-LOCAL-2026-0514",
  DESCRIPTION:
    "ORANGEBOX OS All-In-One v1.4.0. Local-first command cockpit for one operator. Node 18+. No support.",
  PRICE_USD: 49,
  PRICE_USD_CENTS: 4900,
} as const;

export const SITE = {
  URL: "https://atomeons.com",
  EMAIL: "a.mccree@gmail.com",
  LOCATION: "Marco Island, FL",
} as const;
