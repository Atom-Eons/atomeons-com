"use client";

/**
 * SiloShell · the in-silo top chrome.
 *
 * Wave 47 · 2026-06-07 · operator: "each section is a video game and
 * home is the launcher · with a smaller main nav up top like software ·
 * swap silo."
 *
 * When a user is inside a silo (e.g. /learn/* or /learn/cyber/*), the
 * global 9-mega MegaHeader makes way for this slim strip that carries:
 *   - silo identity wordmark (left) · with accent color tint
 *   - silo-local sub-nav (middle) · only routes within this silo
 *   - "Swap silo" button (right) · opens SiloSwitcher overlay
 *
 * This is the "software" feel · like running an app inside a launcher.
 * MegaHeader becomes context-aware via getSiloFromPath in silos.ts.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiloKey } from "../../_lib/silos";
import { getSilo, SILOS } from "../../_lib/silos";

export function SiloShell({ siloKey }: { siloKey: SiloKey }) {
  const pathname = usePathname() || "/";
  const silo = getSilo(siloKey);
  if (!silo) return null;

  const openSwitcher = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("atomeons:open-silo-switcher"));
    }
  };

  return (
    <div
      role="navigation"
      aria-label={`${silo.name} silo`}
      className="silo-shell sticky top-0 z-40 w-full border-b backdrop-blur-md"
      style={{
        background: `linear-gradient(180deg, ${silo.bgTint} 0%, rgba(8, 9, 11, 0.86) 100%)`,
        borderColor: "rgba(31, 36, 43, 0.6)",
      }}
      data-silo={silo.key}
    >
      <div className="mx-auto flex h-12 w-full max-w-[1480px] items-center justify-between gap-4 px-5 md:px-8">
        {/* Left: silo wordmark + home link */}
        <Link
          href={silo.home}
          className="flex shrink-0 items-center gap-3"
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: silo.accent, boxShadow: `0 0 8px ${silo.accent}` }}
          />
          <span
            className="font-mono text-[11px] uppercase tracking-[0.32em]"
            style={{ color: silo.accent }}
          >
            {silo.name}
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] md:inline">
            · {silo.tagline}
          </span>
        </Link>

        {/* Middle: silo-local sub-nav */}
        <nav
          aria-label={`${silo.name} sub-navigation`}
          className="hidden flex-wrap items-center gap-1 lg:flex"
        >
          {silo.subnav.map((s) => {
            const active = pathname === s.href || pathname.startsWith(s.href + "/");
            return (
              <Link
                key={s.href}
                href={s.href}
                title={s.hint}
                className="inline-flex items-center whitespace-nowrap px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors"
                style={{
                  color: active ? silo.accent : "#9CA3AF",
                  borderBottom: active ? `1px solid ${silo.accent}` : "1px solid transparent",
                }}
              >
                {s.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: swap silo + launcher */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/"
            className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF] transition hover:text-[#F4F4F2] md:inline"
            title="Return to launcher"
          >
            Æ launcher
          </Link>
          <button
            type="button"
            onClick={openSwitcher}
            className="inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition"
            style={{
              borderColor: silo.accent,
              color: silo.accent,
              background: `${silo.accent}10`,
            }}
            aria-label="Swap silo · Cmd-Shift-S"
            title="Swap silo · Cmd-Shift-S"
          >
            <span>Swap silo</span>
            <kbd className="hidden font-mono text-[9px] opacity-70 md:inline">⌘⇧S</kbd>
          </button>
        </div>
      </div>

      {/* Per-silo accent style · sets CSS variable usable by inner pages */}
      <style jsx global>{`
        html[data-silo="${silo.key}"] body {
          --silo-accent: ${silo.accent};
          --silo-bg-tint: ${silo.bgTint};
        }
      `}</style>
    </div>
  );
}

/**
 * SiloShellAuto · convenience · reads the pathname and picks the right
 * silo automatically. Used by the layouts that wrap silo trees.
 */
export function SiloShellAuto() {
  const pathname = usePathname() || "/";
  for (const silo of SILOS) {
    for (const prefix of silo.prefixes) {
      if (pathname === prefix || pathname.startsWith(prefix + "/")) {
        return <SiloShell siloKey={silo.key} />;
      }
    }
  }
  return null;
}
