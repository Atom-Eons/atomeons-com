"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Item = {
  href: string;
  label: ReactNode;
  hint?: string;
};

type Props = {
  label: ReactNode;
  items: Item[];
  /** Set true on the Products button to give it a faint orange chip frame. */
  accent?: "cyan" | "orange";
};

/**
 * Hover/focus-opening dropdown for the desktop header. Closes on Escape,
 * outside-click, route change, and pointer-leave with a 150ms grace period.
 *
 * Mobile uses MobileNav's collapsible sections instead (this component
 * is desktop-only — wrapped in `hidden md:inline-flex` by the parent).
 */
export function NavDropdown({ label, items, accent = "cyan" }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on outside click + Escape
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }
  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  const triggerClass =
    accent === "orange"
      ? "rounded-md border border-[#22F0D5]/40 px-3 py-1.5 text-sm text-[#22F0D5] hover:bg-[#22F0D5]/10"
      : "rounded-md px-3 py-1.5 text-sm text-[#9BA5A7] hover:bg-[#0A0F11] hover:text-[#22F0D5]";

  return (
    <div
      ref={containerRef}
      className="relative inline-flex"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        className={`inline-flex items-center gap-1.5 transition-colors ${triggerClass}`}
      >
        <span>{label}</span>
        <span
          aria-hidden
          className={`font-mono text-[10px] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={typeof label === "string" ? label : "dropdown"}
          className="absolute left-0 top-full z-40 mt-2 w-72 rounded-lg border border-[#1A2225] bg-black/95 p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md"
        >
          {items.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className={`group block rounded-md px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-[#0A0F11] text-[#F2F4F5]"
                    : "text-[#9BA5A7] hover:bg-[#0A0F11] hover:text-[#22F0D5]"
                }`}
                onClick={() => setOpen(false)}
              >
                <span className="block font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
                  {item.label}
                </span>
                {item.hint ? (
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                    {item.hint}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
