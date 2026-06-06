"use client";

/**
 * TierToggle — GPU-adaptive visual tier control.
 *
 * Replaces LiteToggle. A small monospace pill that shows the current
 * tier (LITE · STANDARD · FULL · AUTO) and cycles through them on click.
 * Persists to localStorage via the useGpuTier hook.
 *
 * Default position: bottom-right floating, same slot the old LiteToggle
 * occupied. Operator can lift this into the header toolbar in a later
 * wave (per UX-product recommendation) without changing the underlying
 * hook contract.
 *
 * — Wave 30 · JUNE ROCKET · 2026-06-06
 */

import { useGpuTier, type GpuChoice } from "./useGpuTier";

const ORDER: GpuChoice[] = ["auto", "lite", "standard", "full"];

const LABELS: Record<GpuChoice, string> = {
  auto: "AUTO",
  lite: "LITE",
  standard: "MID",
  full: "FULL",
};

const HINTS: Record<GpuChoice, string> = {
  auto: "Auto-detect hardware",
  lite: "Visuals off · text-only",
  standard: "Static visuals · no 3D",
  full: "Cinematic · all motion",
};

export function TierToggle() {
  const { tier, choice, setChoice, detecting } = useGpuTier();

  // Cycle: auto → lite → standard → full → auto
  const cycle = () => {
    const idx = ORDER.indexOf(choice);
    const next = ORDER[(idx + 1) % ORDER.length];
    setChoice(next);
  };

  const displayLabel =
    choice === "auto" ? `AUTO · ${LABELS[tier]}` : LABELS[choice];

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Visual tier · currently ${displayLabel}. Click to cycle. ${HINTS[choice]}`}
      title={HINTS[choice]}
      className="tier-toggle"
      data-tier={tier}
      data-choice={choice}
      data-detecting={detecting ? "1" : "0"}
    >
      <span aria-hidden="true" className="tier-toggle-dot" />
      <span className="tier-toggle-label">{displayLabel}</span>
      <style jsx>{`
        .tier-toggle {
          position: fixed;
          right: 16px;
          bottom: 16px;
          z-index: 60;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: rgba(15, 17, 20, 0.78);
          border: 1px solid rgba(34, 240, 213, 0.32);
          color: #f4f4f2;
          font-family: ui-monospace, "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition:
            border-color 0.18s ease,
            color 0.18s ease,
            background 0.18s ease;
        }
        .tier-toggle:hover {
          border-color: #22f0d5;
          color: #22f0d5;
        }
        .tier-toggle-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #22f0d5;
          box-shadow: 0 0 8px rgba(34, 240, 213, 0.7);
        }
        .tier-toggle[data-tier="lite"] .tier-toggle-dot {
          background: #5a6068;
          box-shadow: none;
        }
        .tier-toggle[data-tier="standard"] .tier-toggle-dot {
          background: #c9a55c;
          box-shadow: 0 0 6px rgba(201, 165, 92, 0.6);
        }
        .tier-toggle[data-detecting="1"] .tier-toggle-dot {
          animation: tier-pulse 1.4s ease-in-out infinite;
        }
        @keyframes tier-pulse {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        /* On lite tier, the toggle itself stays visible · it's the user's
           only way out of degraded mode */
        :global(html.tier-lite) .tier-toggle {
          background: rgba(15, 17, 20, 0.92);
        }
        @media print {
          .tier-toggle {
            display: none;
          }
        }
      `}</style>
    </button>
  );
}
