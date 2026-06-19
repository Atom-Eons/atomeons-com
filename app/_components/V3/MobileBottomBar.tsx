"use client";

/**
 * MobileBottomBar · Wave 107 · 2026-06-18
 * Operator: "10 WAVES ON MOBILE INNOVATIONS CUSTOM FOR APPLES AND ANDRIOD"
 *
 * Thumb-reach sticky CTA strip at bottom of mobile viewports.
 * Hidden on desktop (lg+). Hidden on routes where the strip would
 * compete with another primary CTA (/ask, /api/*, embedded readers).
 *
 * iOS:     respects safe-area-inset-bottom so the home indicator
 *          never overlaps the buttons.
 * Android: triggers a 12ms vibrate on the primary CTA (vibration API
 *          is supported in Chrome / Samsung Internet; iOS Safari
 *          blocks it intentionally — feature-detected, no-ops on iOS).
 *
 * Web Share API used by the "Share" button — opens the native iOS
 * share sheet or Android intent picker if available, falls back to
 * the Founder's View URL copy if not.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const HIDDEN_ROUTES = new Set([
  "/ask",
  "/founders-view",
  "/login",
  "/signup",
]);

const HIDDEN_PREFIXES = ["/api/", "/admin/", "/auth/"];

export function MobileBottomBar() {
  const pathname = usePathname() || "/";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const hidden =
    HIDDEN_ROUTES.has(pathname) ||
    HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));

  if (hidden) return null;

  const isFlagshipShare =
    pathname.startsWith("/founders-view/") ||
    pathname.startsWith("/i-am-ai") ||
    pathname === "/press" ||
    pathname === "/innovations";

  const onShare = async () => {
    // Android Chrome will buzz; iOS Safari returns undefined for vibrate.
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate(8); } catch {}
    }

    const url = typeof window !== "undefined" ? window.location.href : "https://atomeons.com";
    const title = typeof document !== "undefined" ? document.title : "AtomEons";
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled — silent
      }
    }
    // Fallback: copy URL to clipboard
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch {}
  };

  const onAskTap = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate(12); } catch {}
    }
  };

  return (
    <nav
      className="ae-mobile-bottombar lg:hidden"
      data-visible="true"
      aria-label="Mobile quick actions"
    >
      <Link
        href="/"
        prefetch={false}
        className="inline-flex flex-col items-center justify-center px-2"
        style={{
          color: "rgba(244,244,242,0.7)",
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
          fontSize: 10,
          letterSpacing: "0.12em",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M3 12L12 4l9 8M5 10v10h14V10" />
        </svg>
        <span className="mt-0.5">HOME</span>
      </Link>

      <button
        type="button"
        onClick={onShare}
        className="inline-flex flex-col items-center justify-center px-2"
        aria-label={isFlagshipShare ? "Share this page" : "Share AtomEons"}
        style={{
          color: "rgba(244,244,242,0.7)",
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
          fontSize: 10,
          letterSpacing: "0.12em",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.2 11l7.6-4M8.2 13l7.6 4" />
        </svg>
        <span className="mt-0.5">SHARE</span>
      </button>

      <Link
        href="/ask"
        onClick={onAskTap}
        prefetch={false}
        className="ml-auto inline-flex items-center justify-center gap-1.5 rounded px-4 py-2"
        style={{
          background: "#22F0D5",
          color: "#08090B",
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
          fontSize: 12,
          letterSpacing: "0.04em",
          fontWeight: 600,
        }}
      >
        Ask the lab
        <span aria-hidden>→</span>
      </Link>
    </nav>
  );
}
