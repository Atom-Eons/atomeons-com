"use client";

/**
 * SiloSwitcher · the swap-silo overlay.
 *
 * Wave 47 · 2026-06-07 · operator: "swap silo, its so big it needs to
 * run like software almost."
 *
 * Triggered by:
 *   - Clicking the "Swap Silo" button in SiloShell top strip
 *   - Cmd/Ctrl+Shift+S keyboard shortcut from anywhere
 *
 * UX:
 *   - Full-screen overlay · dim backdrop · centered grid of 9 silo tiles
 *   - ESC closes · click outside closes · click a tile navigates
 *   - Each tile shows silo identity + accent + tagline + inventory line
 *   - Cmd-K stays reserved for search · Cmd-Shift-S = silo switcher
 */

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { SILOS } from "../../_lib/silos";

export function SiloSwitcher() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onKey = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Shift + S → open switcher
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "S" || e.key === "s")) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      // Esc → close
      if (e.key === "Escape" && open) {
        close();
      }
    };
    // Listen for custom event so external buttons can open it
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("atomeons:open-silo-switcher", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("atomeons:open-silo-switcher", onOpen as EventListener);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Swap silo"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md"
      onClick={close}
    >
      <div
        className="relative max-w-[1200px] w-full px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
            § Swap silo · Cmd-Shift-S · Esc closes
          </p>
          <button
            type="button"
            onClick={close}
            className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#9CA3AF] transition hover:text-[#FF4D4D]"
          >
            × Close
          </button>
        </div>
        <h2
          className="mt-4 text-[40px] font-light leading-tight text-[#F4F4F2] md:text-[56px]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Pick a silo.
        </h2>

        <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {SILOS.map((s) => (
            <Link
              key={s.key}
              href={s.home}
              onClick={close}
              className="group block border bg-[#0F1114] p-5 transition hover:translate-y-[-2px]"
              style={{
                borderColor: "#1F242B",
                background: `linear-gradient(180deg, ${s.bgTint} 0%, rgba(8, 9, 11, 0.95) 100%)`,
              }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.32em]"
                  style={{ color: s.accent }}
                >
                  {s.name}
                </p>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60 group-hover:opacity-100"
                  style={{ color: s.accent }}
                >
                  enter →
                </span>
              </div>
              <p
                className="mt-3 text-[20px] font-light leading-tight text-[#F4F4F2]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                {s.tagline}
              </p>
              <p className="mt-3 text-[13px] leading-[1.55] text-[#9CA3AF]">
                {s.description}
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          / · launcher home  ·  Cmd-K · search  ·  Cmd-Shift-S · swap silo
        </p>
      </div>
    </div>
  );
}
