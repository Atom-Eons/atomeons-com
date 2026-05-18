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
  VERSION: "v6.0.0",
  // Default download = NSIS setup.exe (one file, double-click, 2-second launch).
  // Source: receipts/BUILD_v6.0.0.json
  FILENAME: "orangebox-v6.0.0-setup.exe",
  FILE_SHA256:
    "8ecc770f4fab50cedecfa3a98eca2f18e0603762fab41adb8355ffedf87eeaf9",
  FILE_SIZE_BYTES: 24830668, // ~23.68 MB
  // Back-compat aliases — legacy code paths still reach for ZIP_*.
  ZIP_FILENAME: "orangebox-v6.0.0-setup.exe",
  ZIP_SHA256:
    "8ecc770f4fab50cedecfa3a98eca2f18e0603762fab41adb8355ffedf87eeaf9",
  ZIP_SIZE_BYTES: 24830668,
  GITHUB_RELEASE_URL:
    "https://github.com/AtomEons/orangebox-os/releases/tag/v6.0.0",
  DISCLOSURE_ID: "ATOM-OBX-V6-SITE-HANDOFF-2026-0517",
  TAGLINE: "One file. Double-click. 2 seconds.",
  DESCRIPTION:
    "ORANGEBOX Command v6.0.0 — native 4.46 MB Rust + egui binary. No webview. No chromium. 11 lanes. Claude + GPT + Gemini + Groq LPUs + Ollama + OpenRouter. $1 once, forever.",
  // PRICING LAW: $1 perpetual. See lib/stripe.ts for the binding source.
  PRICE_USD: 1,
  PRICE_USD_CENTS: 100,
} as const;

export const SITE = {
  URL: "https://atomeons.com",
  EMAIL: "a.mccree@gmail.com",
  LOCATION: "Marco Island, FL",
} as const;
