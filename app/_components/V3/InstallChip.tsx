"use client";

/**
 * InstallChip · Wave 107 · 2026-06-18
 *
 * Captures the Android Chrome `beforeinstallprompt` event and surfaces
 * a custom "Install AtomEons" chip in the mobile bottom-bar area when
 * the PWA is installable.
 *
 * Behavior:
 *  - iOS Safari does NOT fire this event (Apple gates PWA install
 *    behind their Share → "Add to Home Screen" flow). On iOS the chip
 *    is invisible, which is correct.
 *  - Android Chrome / Edge / Samsung Internet fire the event when the
 *    manifest + service worker (or manifest-only on modern Chromium)
 *    qualifies.
 *  - One-tap dismiss persists in localStorage for 30 days so we never
 *    nag returning users.
 */

import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "aeInstallDismissed";
const DISMISS_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function InstallChip() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (raw) {
        const dismissedAt = parseInt(raw, 10);
        if (!Number.isNaN(dismissedAt) && Date.now() - dismissedAt < DISMISS_TTL_MS) {
          return;
        }
      }
    } catch {}

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    const onInstalled = () => {
      setVisible(false);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const onInstall = useCallback(async () => {
    if (!deferred) return;
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try { navigator.vibrate(10); } catch {}
    }
    try {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "dismissed") {
        try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch {}
      }
    } catch {}
    setVisible(false);
    setDeferred(null);
  }, [deferred]);

  const onDismiss = useCallback(() => {
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch {}
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Install AtomEons as a home-screen app"
      className="fixed bottom-[72px] left-1/2 z-40 -translate-x-1/2 rounded-full border lg:hidden"
      style={{
        background: "rgba(15,17,20,0.92)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderColor: "rgba(34,240,213,0.4)",
        boxShadow: "0 8px 28px rgba(0,0,0,0.5), 0 0 12px rgba(34,240,213,0.2)",
        animation: "ae-pop-inline 200ms cubic-bezier(0.16,1,0.3,1)",
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22F0D5"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M12 3v12M6 9l6 6 6-6M4 19h16" />
        </svg>
        <button
          type="button"
          onClick={onInstall}
          style={{
            color: "#F4F4F2",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            fontSize: 12,
            letterSpacing: "0.04em",
          }}
        >
          Install AtomEons
        </button>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss install prompt"
          className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full"
          style={{ color: "rgba(244,244,242,0.6)" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
