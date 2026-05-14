"use client";

import { useEffect, useState } from "react";
import { BuyButton } from "./BuyButton";

/**
 * Bottom-pinned buy bar that appears once the user scrolls past
 * a sentinel element (typically the in-page #buy zone). Dismissible.
 * Hides on scroll-up to reduce nag.
 */
export function StickyBuyBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("orangebox-stickybar-dismissed") === "1") {
      setDismissed(true);
      return;
    }
    const sentinel = document.getElementById("buy");
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Show the sticky bar only AFTER the in-hero buy zone has scrolled out of view.
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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#204538] bg-[#04100d]/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <div className="flex items-baseline gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
            ::orangebox v1
          </p>
          <p className="text-sm text-[#f7f0e4]">
            <span className="font-bold text-[#ff7a18]">$49</span>
            <span className="text-[#a7b8ad]"> · one-time · no support</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BuyButton />
          <button
            onClick={() => {
              sessionStorage.setItem("orangebox-stickybar-dismissed", "1");
              setDismissed(true);
            }}
            aria-label="Dismiss buy bar"
            className="rounded border border-[#204538] bg-[#071915] px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#a7b8ad] hover:text-[#f7f0e4]"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
