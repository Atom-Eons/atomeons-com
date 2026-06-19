"use client";

/**
 * RevealOnScroll · Wave 113 · 2026-06-18
 *
 * Single global IntersectionObserver that flips data-revealed="true"
 * on any element that matches one of the reveal class selectors:
 *   .ae-reveal-up · .ae-reveal-fade · .ae-reveal-scale
 *
 * Design notes:
 *  - One observer for the whole document instead of per-component
 *    observers — fewer JS allocations on long pages
 *  - rootMargin -12% on the bottom edge so the reveal fires
 *    slightly before the element is fully in view (the perceived
 *    rhythm reads better than a strict on-enter trigger)
 *  - threshold: 0.05 so the trigger lands on a tiny corner sliver,
 *    not the whole element (matters for tall hero cards)
 *  - once: true — element keeps data-revealed forever after first
 *    intersection, so scroll-up doesn't reset the state
 *  - prefers-reduced-motion bypass: the CSS keyframe killswitch in
 *    globals.css already neutralizes the transition; we additionally
 *    immediately mark data-revealed="true" so reduced-motion users
 *    don't see opacity:0 stuck content
 *  - Late-arriving elements (lazy-rendered cards, async data) are
 *    picked up by a MutationObserver watching the body for new
 *    nodes that match the selector
 */

import { useEffect } from "react";

const SELECTOR = ".ae-reveal-up, .ae-reveal-fade, .ae-reveal-scale";

export function RevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        (el as HTMLElement).dataset.revealed = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -12% 0px" }
    );

    const armAll = (root: ParentNode) => {
      root.querySelectorAll(SELECTOR).forEach((el) => {
        const e = el as HTMLElement;
        if (e.dataset.revealed === "true") return;
        observer.observe(e);
      });
    };

    armAll(document);

    // Watch for late-arriving elements (lazy lists, async data).
    const mutationObserver = new MutationObserver((muts) => {
      for (const m of muts) {
        for (const node of Array.from(m.addedNodes)) {
          if (node.nodeType !== 1) continue;
          const el = node as HTMLElement;
          if (el.matches?.(SELECTOR)) {
            if (el.dataset.revealed !== "true") observer.observe(el);
          }
          armAll(el);
        }
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
