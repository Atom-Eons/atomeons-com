"use client";

import { useEffect, useRef, useState } from "react";

/**
 * NewBehaviors — six named features shipping in v6.3 / alpha.7.
 *
 * Per mirrors IP audit: each card is a USER-FACING BEHAVIOR (what the
 * operator will see). None describe the underlying mechanism. Solidify
 * does not name the schema validator. Z-Axis Rewind does not name the
 * snapshot store. Pulse Ring does not name the timeout primitive.
 * Living Canvas does not name the heatmap data source. Freeze All does
 * not name the substrate signal path. Multi-Canvas Tabs does not name
 * the per-tab projector.
 *
 * Per misfits visual treatment: IntersectionObserver staggered reveal,
 * 120ms per card. prefers-reduced-motion respected (reveals all at once).
 */

type Feature = {
  name: string;
  binding: string; // keybind or visual cue
  one_liner: string;
  body: string;
  accent: string;
};

const FEATURES: Feature[] = [
  {
    name: "Solidify",
    binding: "obx silent-canvas solidify",
    one_liner: "One command. Production. Done.",
    body: "Describe the end state once. The canvas resolves it to a shippable artifact without negotiating the steps back to you. A glowing red button on the canvas when the state is ready to ship.",
    accent: "#FF7A1A",
  },
  {
    name: "Z-Axis Rewind",
    binding: "Ctrl + Shift + Z (temporal slider)",
    one_liner: "Every build state, still alive.",
    body: "Visual time-travel across the full build arc. Not a diff. Not a log. The canvas morphs backward or forward through any prior state. Operator trust gate — you can always see the version before the move.",
    accent: "#22F0D5",
  },
  {
    name: "Pulse Ring",
    binding: "2.5s · visual feedback",
    one_liner: "Every action confirmed. In 2.5 seconds.",
    body: "A concentric expanding ring that fires when an action commits. If the canvas is still working at 2.5s, the ring stays. If it finishes, the ring dissolves. No more wondering whether your input landed.",
    accent: "#22F0D5",
  },
  {
    name: "Living Canvas",
    binding: "always-on · idle behavior",
    one_liner: "The cockpit breathes when idle.",
    body: "Usage heatmap. Idle pulses. The canvas reflects where the work lives, where it hasn't been touched, where heat is accumulating. The cockpit is an organism — it tells you what it sees about itself.",
    accent: "#FF7A1A",
  },
  {
    name: "Freeze All",
    binding: "Ctrl + . · global kill",
    one_liner: "Stop everything. Now.",
    body: "One keystroke kills every active process, agent call, pending mutation, and stream. The canvas freezes mid-move. No confirmation modal. No graceful shutdown. The OFF switch the consumer-grade product manufacturers deleted in 1990.",
    accent: "#FF7A1A",
  },
  {
    name: "Multi-Canvas Tabs",
    binding: "Ctrl + 1..5 · tab switch",
    one_liner: "Up to five canvases. One cockpit.",
    body: "Parallel projects without parallel applications. Each canvas is isolated by default — no cross-tab pollution, no shared state surprises. Suggestions can cross tabs, but only when you ask.",
    accent: "#22F0D5",
  },
];

export function NewBehaviors() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealedIdx, setRevealedIdx] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setRevealedIdx(new Set(FEATURES.map((_, i) => i)));
      return;
    }
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(
      "[data-feature-idx]",
    );
    if (!cards || cards.length === 0) return;
    const seen = new Set<number>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = Number(
            (e.target as HTMLElement).dataset.featureIdx ?? "0",
          );
          if (seen.has(idx)) return;
          seen.add(idx);
          window.setTimeout(() => {
            setRevealedIdx((prev) => {
              const next = new Set(prev);
              next.add(idx);
              return next;
            });
          }, idx * 120);
        });
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.2 },
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::six new behaviors
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            What v6.3 adds.
            <br />
            <span className="text-[#FF7A1A]">Visible. Measurable. Yours.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {FEATURES.map((f, idx) => {
            const revealed = revealedIdx.has(idx);
            return (
              <div
                key={f.name}
                data-feature-idx={idx}
                className="group relative overflow-hidden rounded-2xl border bg-[#0A0F11] p-6 transition-all duration-700 ease-out"
                style={{
                  borderColor: revealed
                    ? `${f.accent}66`
                    : "rgba(26, 34, 37, 1)",
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(16px)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ background: f.accent }}
                />
                <div className="flex items-start justify-between gap-3">
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.32em]"
                    style={{ color: f.accent }}
                  >
                    {f.name}
                  </p>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#6B7779]">
                    {f.binding}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-medium leading-snug text-[#F2F4F5]">
                  {f.one_liner}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
                  {f.body}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-12 max-w-3xl font-mono text-xs uppercase tracking-[0.18em] text-[#6B7779]">
          alpha.7 ships these behaviors first. v6.3 GA bundles them into one
          release. Existing buyers get both — license §4A.
        </p>
      </div>
    </section>
  );
}
