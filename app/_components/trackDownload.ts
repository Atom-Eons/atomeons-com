"use client";

import { track as vercelTrack } from "@vercel/analytics";

/**
 * trackDownload — fire-and-forget download click tracker.
 *
 * Used from every download CTA across the site (LaunchBanner ·
 * HomeLaunchTiles · /orangebox page · /b00kmakor/download). Fires two
 * signals in parallel without blocking the navigation:
 *
 *   1. Vercel Analytics custom event → live dashboard counts
 *      (no cookies, GDPR-friendly, instant visibility).
 *
 *   2. /api/track/download POST with keepalive:true → durable Supabase
 *      row for queryable history (count by product/platform/country/hour).
 *
 * keepalive:true tells the browser to send the request even if the page
 * is navigating away (e.g. user clicked Download and the browser starts
 * downloading the .exe immediately). The track call rides along with the
 * download. Zero latency impact on the actual download.
 *
 * No PII is sent. The endpoint hashes IP server-side and buckets UA.
 *
 * Signature mirrors the analytics event shape so the two surfaces stay
 * in step:
 *   trackDownload({ product, platform, surface })
 */

export type TrackProduct = "orangebox" | "b00kmakor";
export type TrackPlatform =
  | "windows"
  | "mac"
  | "manual-mac"
  | "manual-win"
  | "cert"
  | "unknown";
export type TrackSurface =
  | "launch-banner"
  | "home-tiles"
  | "product-page"
  | "download-page"
  | "press"
  | "other";

export function trackDownload(opts: {
  product: TrackProduct;
  platform: TrackPlatform;
  surface: TrackSurface;
}): void {
  if (typeof window === "undefined") return;

  // 1. Vercel Analytics · live dashboard counts.
  try {
    vercelTrack("download", {
      product: opts.product,
      platform: opts.platform,
      surface: opts.surface,
    });
  } catch {
    // Swallow · analytics failure must never affect download.
  }

  // 2. Supabase event · durable history. fire-and-forget with keepalive.
  try {
    void fetch("/api/track/download", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(opts),
      keepalive: true,
      // No await · no .then · the response is irrelevant to the click flow.
    }).catch(() => {
      // Network failure swallowed · the download is what matters.
    });
  } catch {
    // Same · never let tracking break the download.
  }
}
