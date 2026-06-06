/**
 * HudFrame — corner brackets + scan-line overlay for "command HUD" feel.
 *
 * Server component · zero JS · pure SVG + CSS. Sits as an aria-hidden
 * positioning layer over its parent (must be position: relative).
 *
 * Components:
 *   - 4 corner brackets (cyan · 1px stroke · 16px each)
 *   - Optional scan-line overlay (~3% opacity diagonal lines)
 *   - Optional center crosshair
 *
 * Used to wrap the homepage hero + key panels for Jony-Ive-tier
 * command-HUD feel without sacrificing the noir restraint.
 */

type Props = {
  scanlines?: boolean;
  crosshair?: boolean;
  accent?: string;
  bracketSize?: number;       // px
  className?: string;
};

export function HudFrame({
  scanlines = false,
  crosshair = false,
  accent = "#22F0D5",
  bracketSize = 18,
  className = "",
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ zIndex: 2 }}
    >
      {/* Corner brackets · 4 corners */}
      <svg
        className="pointer-events-none absolute left-3 top-3"
        width={bracketSize}
        height={bracketSize}
        viewBox={`0 0 ${bracketSize} ${bracketSize}`}
        fill="none"
        stroke={accent}
        strokeWidth="1"
        opacity="0.55"
      >
        <path d={`M0 ${bracketSize * 0.5} V0 H${bracketSize * 0.5}`} />
      </svg>
      <svg
        className="pointer-events-none absolute right-3 top-3"
        width={bracketSize}
        height={bracketSize}
        viewBox={`0 0 ${bracketSize} ${bracketSize}`}
        fill="none"
        stroke={accent}
        strokeWidth="1"
        opacity="0.55"
      >
        <path d={`M${bracketSize * 0.5} 0 H${bracketSize} V${bracketSize * 0.5}`} />
      </svg>
      <svg
        className="pointer-events-none absolute left-3 bottom-3"
        width={bracketSize}
        height={bracketSize}
        viewBox={`0 0 ${bracketSize} ${bracketSize}`}
        fill="none"
        stroke={accent}
        strokeWidth="1"
        opacity="0.55"
      >
        <path d={`M0 ${bracketSize * 0.5} V${bracketSize} H${bracketSize * 0.5}`} />
      </svg>
      <svg
        className="pointer-events-none absolute right-3 bottom-3"
        width={bracketSize}
        height={bracketSize}
        viewBox={`0 0 ${bracketSize} ${bracketSize}`}
        fill="none"
        stroke={accent}
        strokeWidth="1"
        opacity="0.55"
      >
        <path d={`M${bracketSize * 0.5} ${bracketSize} H${bracketSize} V${bracketSize * 0.5}`} />
      </svg>

      {/* Scan-line overlay · very subtle */}
      {scanlines ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(34, 240, 213, 0.018) 3px, rgba(34, 240, 213, 0.018) 4px)",
            mixBlendMode: "screen",
          }}
        />
      ) : null}

      {/* Center crosshair · single hairline + dot */}
      {crosshair ? (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={accent} strokeWidth="1" opacity="0.4">
            <line x1="0" y1="16" x2="13" y2="16" />
            <line x1="19" y1="16" x2="32" y2="16" />
            <line x1="16" y1="0" x2="16" y2="13" />
            <line x1="16" y1="19" x2="16" y2="32" />
            <circle cx="16" cy="16" r="1" fill={accent} />
          </svg>
        </div>
      ) : null}
    </div>
  );
}
