"use client";

/**
 * NotificationBar · operator-pushable top strip.
 *
 * Wave 39 · 2026-06-06 · operator brief: "have founders view be a top
 * bar notification bar I can push anything to · not an ad · founders
 * message shortform · two sentences."
 *
 * Reads /api/notification on mount · displays content if present and
 * not yet dismissed (localStorage). Operator updates the JSON file or
 * writes to a Supabase row to push a new notice. Two-sentence max
 * enforced visually + by char limit.
 *
 * Design:
 *   - 36px thin strip · above the MegaHeader
 *   - mono caption · single accent dot · short body
 *   - dismissable × · per-notification ID stored in localStorage
 *   - never autoplays · never overlays content · pushes everything down
 *
 * Storage shape (public/notification.json):
 *   {
 *     "id": "2026-06-06-launch",
 *     "kind": "shipping" | "live" | "alert" | "broadcast",
 *     "body": "two-sentence message max.",
 *     "href": "/founders-view"   // optional · clicking the bar follows it
 *   }
 *
 * To push: edit /public/notification.json · bump the id · deploy.
 * Future: /api/notification endpoint backed by Supabase (operator-wired).
 */

import { useEffect, useState } from "react";
import Link from "next/link";

const DISMISSED_KEY_PREFIX = "atomeons.notif.dismissed.";

interface Notification {
  id: string;
  kind: "shipping" | "live" | "alert" | "broadcast";
  body: string;
  href?: string;
}

const KIND_ACCENT: Record<Notification["kind"], string> = {
  shipping: "#22F0D5",
  live: "#FF4D4D",
  alert: "#C9A55C",
  broadcast: "#9D7FFF",
};

const KIND_LABEL: Record<Notification["kind"], string> = {
  shipping: "SHIPPING",
  live: "LIVE",
  alert: "ALERT",
  broadcast: "BROADCAST",
};

export function NotificationBar() {
  const [notif, setNotif] = useState<Notification | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch("/notification.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: Notification | null) => {
        if (!j || !j.id || !j.body) return;
        try {
          if (localStorage.getItem(DISMISSED_KEY_PREFIX + j.id) === "true") {
            setDismissed(true);
          }
        } catch {
          /* ignore */
        }
        setNotif(j);
      })
      .catch(() => {
        // Silent · no notification = no bar
      });
  }, []);

  if (!notif || dismissed) return null;

  const accent = KIND_ACCENT[notif.kind] || "#22F0D5";
  const label = KIND_LABEL[notif.kind] || "BROADCAST";

  const Inner = (
    <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between gap-4 px-4 py-1.5">
      <div className="flex items-center gap-3 overflow-hidden">
        <span
          aria-hidden
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
        />
        <span
          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em]"
          style={{ color: accent }}
        >
          {label}
        </span>
        <span className="truncate font-mono text-[11px] text-[#F4F4F2]">
          {notif.body}
        </span>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          try {
            localStorage.setItem(DISMISSED_KEY_PREFIX + notif.id, "true");
          } catch {
            /* ignore */
          }
          setDismissed(true);
        }}
        aria-label="Dismiss notification"
        // Wave 50 · 2026-06-12 · target-size · was 14px (failed WCAG 2.5.5).
        // Now 32px hit area · still visually tiny · meets minimum touch target.
        className="shrink-0 inline-flex items-center justify-center h-[28px] w-[28px] -mr-1 font-mono text-[14px] leading-none text-[#7a818a] transition hover:text-[#FF4D4D]"
      >
        ×
      </button>
    </div>
  );

  return (
    <div
      role="region"
      aria-label="Site notification"
      className="border-b bg-[#08090B]/95 backdrop-blur-sm"
      style={{ borderColor: "rgba(31, 36, 43, 0.6)" }}
    >
      {notif.href ? (
        <Link
          href={notif.href}
          className="block transition hover:bg-[#0F1114]"
          onClick={(e) => {
            // Allow normal click navigation but dismiss after click
            try {
              localStorage.setItem(DISMISSED_KEY_PREFIX + notif.id, "true");
            } catch {
              /* ignore */
            }
            // Use setTimeout to dismiss after navigation
            window.setTimeout(() => setDismissed(true), 100);
            // Let the click propagate to the Link itself
            void e;
          }}
        >
          {Inner}
        </Link>
      ) : (
        Inner
      )}
    </div>
  );
}
