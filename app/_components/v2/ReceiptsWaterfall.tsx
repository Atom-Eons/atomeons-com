"use client";

import { useEffect, useRef } from "react";

const RECEIPTS = [
  {
    date: "2026-05-18",
    label: "DEPLOY",
    color: "cyan",
    text: "atomeons.com homepage rebuilt — lab-first architecture, 11 sections, voice purge, P0 security.",
    detail: "commit 40d9a92",
  },
  {
    date: "2026-05-17",
    label: "SHIP",
    color: "orange",
    text: "ORANGEBOX v6.0.0 — native Rust binary. 4.46 MB. One file, double-click, 2s launch.",
    detail: "SHA-256: 8ecc770f…",
  },
  {
    date: "2026-05-15",
    label: "INTEL",
    color: "cyan",
    text: "X Algorithm leak decoded — 31-section breakdown of xAI's open-sourced ranking pipeline.",
    detail: "/intel/x-algorithm",
  },
  {
    date: "2026-05-01",
    label: "PAPER",
    color: "cyan",
    text: "ÆoNs paper #12 — twelve manuscripts now CC-BY 4.0 across cancer, topology, cognition, cosmology.",
    detail: "/research/papers",
  },
  {
    date: "2026-04-19",
    label: "SUITE",
    color: "cyan",
    text: "ÆSkill Suite V1.4 — 230 / 230 tests green. Peer-review certified.",
    detail: "ATOM-AESUITE-2026-0419",
  },
  {
    date: "2026-03-31",
    label: "DOCTRINE",
    color: "orange",
    text: "Crystal Lattice Compression v1 disclosed. 282× compression on dense source.",
    detail: "ATOM-CLC-2026-0331",
  },
] as const;

const CHIP_STYLES: Record<string, string> = {
  cyan: "text-[#22F0D5] border-[#22F0D5]/30",
  orange: "text-[#22F0D5] border-[#22F0D5]/30",
};

export function ReceiptsWaterfall() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fired = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = rowRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && idx !== -1 && !fired.has(idx)) {
            fired.add(idx);
            // stagger reveal
            setTimeout(() => {
              const el = rowRefs.current[idx];
              if (el) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }
            }, idx * 80);
          }
        });
      },
      { threshold: 0.1 },
    );

    rowRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-[#0A0F11] py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* section label */}
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::BUILD RECEIPTS · LAB OUTPUT LOG
        </p>

        <h2 className="mb-12 text-3xl font-medium leading-tight tracking-[-0.02em] text-[#F2F4F5] md:text-4xl">
          The lab ships. Here&apos;s the log.
        </h2>

        {/* desktop header row */}
        <div className="mb-2 hidden grid-cols-[100px_90px_1fr_180px] gap-4 px-5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#6B7779] md:grid">
          <span>Date</span>
          <span>Type</span>
          <span>Event</span>
          <span className="text-right">Ref</span>
        </div>

        <div className="divide-y divide-[#1A2225] border-t border-[#1A2225]">
          {RECEIPTS.map((r, idx) => (
            <div
              key={r.date + r.label}
              ref={(el) => { rowRefs.current[idx] = el; }}
              style={{
                opacity: 0,
                transform: "translateY(16px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {/* desktop layout */}
              <div className="hidden grid-cols-[100px_90px_1fr_180px] gap-4 px-5 py-4 md:grid">
                <span className="font-mono text-[11px] text-[#6B7779]">
                  {r.date}
                </span>

                <span
                  className={`inline-block self-start rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] ${CHIP_STYLES[r.color]}`}
                >
                  {r.label}
                </span>

                <p className="text-sm leading-relaxed text-[#F2F4F5]">
                  {r.text}
                </p>

                <p className="self-start text-right font-mono text-[10px] text-[#6B7779]">
                  {r.detail}
                </p>
              </div>

              {/* mobile layout */}
              <div className="flex flex-col gap-1 px-2 py-4 md:hidden">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] ${CHIP_STYLES[r.color]}`}
                  >
                    {r.label}
                  </span>
                  <span className="font-mono text-[10px] text-[#6B7779]">
                    {r.date}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#F2F4F5]">
                  {r.text}
                </p>
                <p className="font-mono text-[10px] text-[#6B7779]">
                  {r.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
