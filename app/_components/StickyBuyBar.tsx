"use client";

import { useEffect, useState } from "react";
import { BuyButtonCompact } from "./BuyButtonCompact";
import { DynamicPrice } from "./DynamicPrice";
import { SESSION_KEYS } from "@/lib/constants";

/**
 * Bottom-pinned buy bar that appears once the user scrolls past
 * the in-page #buy zone. Dismissible. Mobile-safe: <72px tall, 44px tap
 * targets, single-row layout even at 320px, safe-area pad.
 *
 * Uses BuyButtonCompact (just the button, no badge / sub-copy) — the
 * full BuyButton would push this to 300px+ tall and bury the screen.
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
            ::v6.0 · ladder · live
          </p>
          <p className="truncate text-sm text-[#F2F4F5]">
            <span className="font-bold text-[#FF7A1A]">
              <DynamicPrice variant="button-label" />
            </span>
            <span className="ml-1 text-[#9BA5A7]">· +$1 / 100 sales</span>
          </p>
        </div>
        <BuyButtonCompact />
        <button
          onClick={() => {
            sessionStorage.setItem(SESSION_KEYS.STICKYBAR_DISMISSED, "1");
            setDismissed(true);
          }}
          aria-label="Dismiss buy bar"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-[#1A2225] bg-[#071915] font-mono text-sm text-[#6B7779] hover:text-[#F2F4F5]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
