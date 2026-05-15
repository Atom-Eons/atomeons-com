"use client";

import { useEffect, useState } from "react";
import { BuyButton } from "./BuyButton";
import { SESSION_KEYS } from "@/lib/constants";

/**
 * Bottom-pinned buy bar that appears once the user scrolls past
 * the in-page #buy zone. Dismissible. Mobile-safe: 44px tap targets,
 * grid layout that does not push to two rows on 375px, safe-area pad.
 */
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

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#204538] bg-[#04100d]/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
            ::orangebox v1.4.0 · shop ready
          </p>
          <p className="text-sm text-[#f7f0e4]">
            <span className="font-bold text-[#ff7a18]">$49</span>
            <span className="text-[#a7b8ad]"> · one-time · 30-day support</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BuyButton />
          <button
            onClick={() => {
              sessionStorage.setItem(SESSION_KEYS.STICKYBAR_DISMISSED, "1");
              setDismissed(true);
            }}
            aria-label="Dismiss buy bar"
            className="flex h-11 w-11 items-center justify-center rounded border border-[#204538] bg-[#071915] font-mono text-sm text-[#a7b8ad] hover:text-[#f7f0e4]"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
