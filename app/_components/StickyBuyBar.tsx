"use client";

import { useEffect, useState } from "react";
import { OrangeBoxV63Buy } from "./OrangeBoxV63Buy";
import { SESSION_KEYS } from "@/lib/constants";

/**
 * Bottom-pinned buy bar that appears once the user scrolls past
 * the in-page #buy zone. Dismissible. Mobile-safe: <72px tall, 44px tap
 * targets, single-row layout even at 320px, safe-area pad.
 *
 * Wired to OrangeBoxV63Buy — the current $99 v6.3 SKU flow. The legacy
 * BuyButtonCompact + DynamicPrice + $1-ladder copy were retired on
 * 2026-05-23 in favor of the v6.3 single-price posture.
 *
 * Hard-disabled while sales are paused (NEXT_PUBLIC_ORANGEBOX_SALES_PAUSED).
 * In that window the StickyBuyBar would just confuse — the page already
 * has a notify-me CTA. Returns null at the top of render.
 */
const SALES_PAUSED =
  process.env.NEXT_PUBLIC_ORANGEBOX_SALES_PAUSED === "true";

export function StickyBuyBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEYS.STICKYBAR_DISMISSED) === "1") {
      setDismissed(true);
      return;
    }
    const sentinel = document.getElementById("buy");
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setVisible(!e.isIntersecting);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -120px 0px" },
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  if (SALES_PAUSED) return null;
  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#1A2225] bg-black/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]">
            ::Orange³ v1.0.0 · FREE always · §4A no-SaaS
          </p>
          <p className="truncate text-sm text-[#F2F4F5]">
            <span className="font-bold text-[#22F0D5]">Sovereign agentic OS for Claude</span>
            <span className="ml-1 text-[#9BA5A7]">
              · local-first · zero-telemetry
            </span>
          </p>
        </div>
        <OrangeBoxV63Buy
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#22F0D5] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-black transition-all hover:bg-[#FFA45A] disabled:opacity-60"
          label="grab free"
        />
        <button
          onClick={() => {
            sessionStorage.setItem(SESSION_KEYS.STICKYBAR_DISMISSED, "1");
            setDismissed(true);
          }}
          aria-label="Dismiss buy bar"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-[#1A2225] bg-[#0F1114] font-mono text-sm text-[#6B7779] hover:text-[#F2F4F5]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
