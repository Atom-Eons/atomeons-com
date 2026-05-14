"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AtomMark } from "./AtomMark";
import { SESSION_KEYS } from "@/lib/constants";

const BOOT_KEY = SESSION_KEYS.BOOT_PLAYED;

/**
 * One-shot grand-entrance: huge AtomMark renders center-screen on
 * first paint of the session, spins fast, then fades to nothing.
 * Stored in sessionStorage so it does not repeat on subsequent
 * navigation. Skipped entirely under prefers-reduced-motion.
 */
export function AtomBoot() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "play" | "done">("idle");

  useEffect(() => {
    // v12 — only fire on the home page (UX panel: blocks /success direct
    // hits with a 1.4s gate which is unacceptable on the post-purchase path)
    if (pathname !== "/") {
      setPhase("done");
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("done");
      return;
    }
    if (sessionStorage.getItem(BOOT_KEY) === "1") {
      setPhase("done");
      return;
    }
    sessionStorage.setItem(BOOT_KEY, "1");
    setPhase("play");
    const t = setTimeout(() => setPhase("done"), 1400);
    return () => clearTimeout(t);
  }, [pathname]);

  if (phase === "done" || phase === "idle") return null;

  return (
    <div
      aria-hidden
      className="atom-boot-overlay pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-[#04100d]"
    >
      <div className="atom-boot-mark">
        <AtomMark size={320} speed={2.4} />
      </div>
      <p className="atom-boot-label absolute bottom-[42%] mt-8 font-mono text-[11px] uppercase tracking-[0.4em] text-[#a7b8ad]">
        atomeons · booting
      </p>
    </div>
  );
}
