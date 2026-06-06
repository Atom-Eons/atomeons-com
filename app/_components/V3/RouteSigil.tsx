/**
 * RouteSigil — deterministic procedural SVG mark, unique per route.
 *
 * Each route gets a one-of-one geometric sigil derived from a stable
 * hash of its slug. The hash seeds:
 *   - polygon order (3-12 sides)
 *   - inner star order (3-7 points)
 *   - rotation offset
 *   - inner-ring presence / absence
 *
 * Same slug · same sigil every render (server-rendered, zero JS).
 * Different slug · different sigil. The lab's visual signature
 * applied at the page level, like a heraldic mark.
 *
 * Renders as an inline <svg> · ~600 bytes per sigil · no network cost.
 *
 * Use:
 *   <RouteSigil slug="/orangebox" size={28} />
 *   <RouteSigil slug="/learn/atlas/mech-interp" size={20} accent="#22F0D5" />
 */

function hash32(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return h >>> 0;
}

type Props = {
  slug: string;
  size?: number;
  accent?: string;
  className?: string;
  label?: string;
};

export function RouteSigil({
  slug,
  size = 24,
  accent = "#22F0D5",
  className,
  label,
}: Props) {
  const h = hash32(slug);
  const sides = 3 + (h % 10);                 // 3..12
  const starPoints = 3 + ((h >> 4) % 5);      // 3..7
  const rotOffset = ((h >> 8) % 360) * (Math.PI / 180);
  const hasRing = (h >> 12) % 3 !== 0;        // 2/3 of the time
  const hasCenterDot = (h >> 14) % 2 === 0;
  const innerScale = 0.42 + (((h >> 16) % 100) / 100) * 0.22;  // 0.42..0.64

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.42;
  const innerR = outerR * innerScale;
  const ringR = outerR * 0.82;

  // Outer polygon
  const outerPts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const a = rotOffset + (i / sides) * Math.PI * 2;
    outerPts.push(`${cx + Math.cos(a) * outerR},${cy + Math.sin(a) * outerR}`);
  }
  // Inner star (interlocking with opposite rotation)
  const starPts: string[] = [];
  for (let i = 0; i < starPoints * 2; i++) {
    const a = -rotOffset + (i / (starPoints * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? innerR : innerR * 0.55;
    starPts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`);
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
    >
      <title>{label ?? `Sigil for ${slug}`}</title>
      {/* Outer polygon */}
      <polygon
        points={outerPts.join(" ")}
        fill="none"
        stroke={accent}
        strokeWidth={size * 0.038}
        strokeOpacity={0.7}
        strokeLinejoin="miter"
      />
      {/* Optional ring */}
      {hasRing ? (
        <circle
          cx={cx}
          cy={cy}
          r={ringR}
          fill="none"
          stroke={accent}
          strokeWidth={size * 0.025}
          strokeOpacity={0.32}
        />
      ) : null}
      {/* Inner star */}
      <polygon
        points={starPts.join(" ")}
        fill="none"
        stroke={accent}
        strokeWidth={size * 0.04}
        strokeOpacity={0.55}
        strokeLinejoin="round"
      />
      {/* Optional center dot */}
      {hasCenterDot ? (
        <circle cx={cx} cy={cy} r={size * 0.045} fill={accent} fillOpacity={0.7} />
      ) : null}
    </svg>
  );
}
