"use client";

/**
 * FirstTimeChip · subtle invitation for first-time visitors.
 *
 * Wave 37 · 2026-06-06 · operator brief: "we need an introduction to
 * the site · it's so damn big they need to be trained."
 *
 * Mounts client-side · reads localStorage atomeons.trained · if absent
 * shows a small chip top-left that fades in after 2 seconds with the
 * link to /welcome. Dismissable. Once dismissed or once the visitor
 * goes through /welcome, never appears again.
 *
 * Designed to NOT add cognitive load:
 *   - top-left (out of the primary F-pattern reading lane)
 *   - small + monospaced (not a banner ad pattern)
 *   - 2-second delay (don't fight the first impression)
 *   - dismissable (Hick's Law respected · always one alternative)
 *   - skips on /welcome itself (no recursion)
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TRAINED_KEY = "atomeons.trained";
const DISMISSED_KEY = "atomeons.first-time-chip-dismissed";

export function FirstTimeChip() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname === "/welcome") return;
    let trained = false;
    let dismissed = false;
    try {
      trained = localStorage.getItem(TRAINED_KEY) === "true";
      dismissed = localStorage.getItem(DISMISSED_KEY) === "true";
    } catch {
      // localStorage unavailable
      return;
    }
    if (trained || dismissed) return;
    const t = window.setTimeout(() => setShow(true), 2000);
    return () => window.clearTimeout(t);
  }, [pathname]);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // ignore
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="region"
      aria-label="First-time visitor introduction"
      className="first-time-chip fixed left-4 top-20 z-40 flex max-w-xs items-stretch border bg-[#0F1114]/90 backdrop-blur-md"
      style={{ borderColor: "rgba(34, 240, 213, 0.4)" }}
    >
      <Link
        href="/welcome"
        className="flex-1 px-4 py-3 transition hover:bg-[#22F0D5]/5"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § first time?
        </p>
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F4F4F2]">
          Take the 90-second tour →
        </p>
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss first-time prompt"
        className="border-l px-3 font-mono text-[14px] text-[#5A6068] transition hover:bg-[#FF4D4D]/10 hover:text-[#FF4D4D]"
        style={{ borderColor: "rgba(34, 240, 213, 0.2)" }}
      >
        ×
      </button>
      <style jsx>{`
        .first-time-chip {
          animation: fadeIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .first-time-chip {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
