/**
 * Illustrations.tsx — programmatic SVG illustration library.
 *
 * Wave 36 · 2026-06-06 · operator: "image gen looks amazing · make 100
 * more all over the site · equal parts images and text."
 *
 * Pure deterministic SVG generators · no client JS · server-renderable ·
 * lazy-loadable · zero external dependencies. Each component takes a
 * `seed` and a `hue` (HSL degrees) and produces a unique visual every
 * call. 10 component families × 12 seeds × any hue ⇒ functionally
 * unlimited unique illustrations.
 *
 * GPU tier-aware:
 *   - tier-lite      → hidden via globals.css data-tier-gate="visual"
 *   - tier-standard  → static SVG (these · no JS)
 *   - tier-full      → static SVG (no animation here · the heavy stuff
 *                       lives in SacredSvg + AtomHeroCss already)
 */

import React from "react";

// =============================================================================
// 1. AbstractGlyph · concentric circles + radial spokes · 12 variants
// =============================================================================

export function AbstractGlyph({
  seed = 0,
  hue = 175,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const rings = 3 + (seed % 5); // 3-7 rings
  const spokes = 6 + ((seed * 3) % 18); // 6-23 spokes
  const innerR = 8 + (seed % 4) * 4;
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="abstract-glyph"
    >
      {/* Concentric rings */}
      {Array.from({ length: rings }).map((_, i) => (
        <circle
          key={`r-${i}`}
          cx={0}
          cy={0}
          r={innerR + i * 14}
          fill="none"
          stroke={`hsla(${hue + i * 8}, 65%, ${60 - i * 4}%, ${0.7 - i * 0.08})`}
          strokeWidth={0.8}
        />
      ))}
      {/* Radial spokes */}
      {Array.from({ length: spokes }).map((_, i) => {
        const a = (i / spokes) * Math.PI * 2;
        const x2 = Math.cos(a) * 88;
        const y2 = Math.sin(a) * 88;
        return (
          <line
            key={`s-${i}`}
            x1={0}
            y1={0}
            x2={x2}
            y2={y2}
            stroke={`hsla(${hue}, 70%, 60%, 0.15)`}
            strokeWidth={0.5}
          />
        );
      })}
      {/* Center dot */}
      <circle cx={0} cy={0} r={2} fill={`hsla(${hue}, 80%, 70%, 0.9)`} />
    </svg>
  );
}

// =============================================================================
// 2. OrbitGlyph · planets on offset orbits · 12 variants
// =============================================================================

export function OrbitGlyph({
  seed = 0,
  hue = 200,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const orbits = 3 + (seed % 4);
  const tilt = (seed * 17) % 60 - 30;
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="orbit-glyph"
    >
      <g transform={`rotate(${tilt})`}>
        {Array.from({ length: orbits }).map((_, i) => {
          const rx = 30 + i * 18;
          const ry = rx * (0.4 + (i * 0.15) % 0.6);
          const dotA = ((seed * (i + 1) * 47) % 360) * (Math.PI / 180);
          const dx = Math.cos(dotA) * rx;
          const dy = Math.sin(dotA) * ry;
          return (
            <g key={i}>
              <ellipse
                cx={0}
                cy={0}
                rx={rx}
                ry={ry}
                fill="none"
                stroke={`hsla(${hue + i * 15}, 60%, 55%, 0.5)`}
                strokeWidth={0.6}
              />
              <circle
                cx={dx}
                cy={dy}
                r={2.5 + i}
                fill={`hsla(${hue + i * 15}, 75%, 65%, 0.95)`}
              />
            </g>
          );
        })}
        <circle cx={0} cy={0} r={5} fill={`hsla(${hue}, 80%, 70%, 1)`} />
      </g>
    </svg>
  );
}

// =============================================================================
// 3. WaveformGlyph · sine wave stack · 12 variants
// =============================================================================

export function WaveformGlyph({
  seed = 0,
  hue = 35,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const lines = 6 + (seed % 6);
  const freq = 0.8 + (seed % 5) * 0.3;
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="waveform-glyph"
    >
      {Array.from({ length: lines }).map((_, i) => {
        const amp = 6 + i * 1.4;
        const phase = (i * Math.PI) / 4 + seed * 0.5;
        const y = 30 + (140 / lines) * i;
        const pts: string[] = [];
        for (let x = 0; x <= 200; x += 4) {
          const yy = y + Math.sin((x / 200) * Math.PI * 2 * freq + phase) * amp;
          pts.push(`${x},${yy.toFixed(1)}`);
        }
        return (
          <polyline
            key={i}
            points={pts.join(" ")}
            fill="none"
            stroke={`hsla(${hue + i * 6}, 70%, ${65 - i * 2}%, ${0.85 - i * 0.05})`}
            strokeWidth={1}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

// =============================================================================
// 4. LatticeGlyph · hex / square grid with selective fill · 12 variants
// =============================================================================

export function LatticeGlyph({
  seed = 0,
  hue = 270,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const cols = 8;
  const rows = 8;
  const cell = 24;
  const offset = -((cols * cell) / 2);
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="lattice-glyph"
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const x = offset + c * cell + cell / 2;
        const y = offset + r * cell + cell / 2;
        // Deterministic on (seed, c, r)
        const lit = (seed * 31 + c * 7 + r * 13) % 11 < 4;
        if (!lit) return null;
        return (
          <rect
            key={i}
            x={x - 4}
            y={y - 4}
            width={8}
            height={8}
            rx={1.5}
            fill={`hsla(${hue + ((c + r) * 4) % 30}, 65%, 60%, ${0.45 + (i % 5) * 0.1})`}
          />
        );
      })}
    </svg>
  );
}

// =============================================================================
// 5. MandalaGlyph · 12-fold radial petals · 12 variants
// =============================================================================

export function MandalaGlyph({
  seed = 0,
  hue = 165,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const folds = [6, 8, 10, 12, 14, 16][seed % 6];
  const petalR = 20 + (seed % 5) * 6;
  const innerOffset = 30 + (seed % 4) * 8;
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="mandala-glyph"
    >
      <g>
        {Array.from({ length: folds }).map((_, i) => {
          const a = (i / folds) * Math.PI * 2;
          const cx = Math.cos(a) * innerOffset;
          const cy = Math.sin(a) * innerOffset;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={petalR}
              fill="none"
              stroke={`hsla(${hue + i * 4}, 65%, 60%, 0.4)`}
              strokeWidth={0.8}
            />
          );
        })}
      </g>
      <circle
        cx={0}
        cy={0}
        r={innerOffset}
        fill="none"
        stroke={`hsla(${hue}, 70%, 70%, 0.55)`}
        strokeWidth={1}
      />
      <circle cx={0} cy={0} r={3} fill={`hsla(${hue}, 80%, 75%, 1)`} />
    </svg>
  );
}

// =============================================================================
// 6. NetworkGlyph · node-link graph · 12 variants
// =============================================================================

export function NetworkGlyph({
  seed = 0,
  hue = 195,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const n = 7 + (seed % 6);
  // Deterministic node positions via golden-angle
  const ga = Math.PI * (3 - Math.sqrt(5));
  const nodes = Array.from({ length: n }).map((_, i) => {
    const r = 30 + ((seed * 7 + i * 13) % 50);
    const a = i * ga + seed;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r, i };
  });
  // Edges · each node connects to ~2 others
  const edges: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    edges.push([i, (i + 1) % n]);
    if ((seed + i) % 3 === 0) edges.push([i, (i + 3) % n]);
  }
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="network-glyph"
    >
      {edges.map(([a, b], i) => (
        <line
          key={`e-${i}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={`hsla(${hue}, 55%, 55%, 0.45)`}
          strokeWidth={0.8}
        />
      ))}
      {nodes.map((nd) => (
        <circle
          key={nd.i}
          cx={nd.x}
          cy={nd.y}
          r={3.5}
          fill={`hsla(${hue + nd.i * 8}, 70%, 65%, 0.95)`}
          stroke={`hsla(${hue}, 50%, 25%, 0.5)`}
          strokeWidth={0.6}
        />
      ))}
    </svg>
  );
}

// =============================================================================
// 7. ParticleField · phyllotaxis dot scatter · 12 variants
// =============================================================================

export function ParticleField({
  seed = 0,
  hue = 220,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const n = 80 + (seed % 6) * 20;
  const ga = Math.PI * (3 - Math.sqrt(5)) + (seed * 0.001);
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="particle-field"
    >
      {Array.from({ length: n }).map((_, i) => {
        const r = Math.sqrt(i / n) * 90;
        const a = i * ga;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        const radius = 1 + (i % 5) * 0.4;
        const opacity = 0.3 + ((i * 7) % 10) * 0.07;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={radius}
            fill={`hsla(${hue + (i % 30)}, 70%, 65%, ${opacity})`}
          />
        );
      })}
    </svg>
  );
}

// =============================================================================
// 8. ChevronGlyph · directional arrow stack · 12 variants
// =============================================================================

export function ChevronGlyph({
  seed = 0,
  hue = 15,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const layers = 5 + (seed % 4);
  const rot = (seed * 11) % 360;
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="chevron-glyph"
    >
      <g transform={`rotate(${rot})`}>
        {Array.from({ length: layers }).map((_, i) => {
          const y = -60 + i * 24;
          const w = 30 + i * 12;
          return (
            <path
              key={i}
              d={`M ${-w} ${y} L 0 ${y + 16} L ${w} ${y} L 0 ${y + 8} Z`}
              fill={`hsla(${hue + i * 12}, 68%, 60%, ${0.7 - i * 0.07})`}
              stroke={`hsla(${hue}, 50%, 40%, 0.3)`}
              strokeWidth={0.4}
            />
          );
        })}
      </g>
    </svg>
  );
}

// =============================================================================
// 9. SpiralGlyph · logarithmic spiral · 12 variants
// =============================================================================

export function SpiralGlyph({
  seed = 0,
  hue = 285,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const turns = 2 + (seed % 4);
  const arms = 1 + (seed % 4);
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="spiral-glyph"
    >
      {Array.from({ length: arms }).map((_, arm) => {
        const offset = (arm / arms) * Math.PI * 2;
        const pts: string[] = [];
        for (let t = 0; t <= turns * Math.PI * 2; t += 0.08) {
          const r = 4 + t * 3.2;
          const x = Math.cos(t + offset) * r;
          const y = Math.sin(t + offset) * r;
          if (r > 92) break;
          pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        }
        return (
          <polyline
            key={arm}
            points={pts.join(" ")}
            fill="none"
            stroke={`hsla(${hue + arm * 30}, 70%, 65%, 0.7)`}
            strokeWidth={1.1}
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={0} cy={0} r={2.5} fill={`hsla(${hue}, 80%, 75%, 1)`} />
    </svg>
  );
}

// =============================================================================
// 10. PrismGlyph · refracted bar stack · 12 variants
// =============================================================================

export function PrismGlyph({
  seed = 0,
  hue = 0,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const bars = 9 + (seed % 6);
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="prism-glyph"
    >
      {Array.from({ length: bars }).map((_, i) => {
        const a = (i / bars) * Math.PI - Math.PI / 2;
        const x1 = 0;
        const y1 = 0;
        const x2 = Math.cos(a) * 90;
        const y2 = Math.sin(a) * 90;
        const h = (hue + i * (360 / bars)) % 360;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={`hsla(${h}, 75%, 60%, 0.85)`}
            strokeWidth={2 + (i % 3)}
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={0} cy={0} r={5} fill="#08090B" stroke="#1F242B" strokeWidth={1} />
    </svg>
  );
}

// =============================================================================
// Convenience · all 10 component refs in one array + a deterministic picker
// =============================================================================

const ALL = [
  AbstractGlyph,
  OrbitGlyph,
  WaveformGlyph,
  LatticeGlyph,
  MandalaGlyph,
  NetworkGlyph,
  ParticleField,
  ChevronGlyph,
  SpiralGlyph,
  PrismGlyph,
];

interface AutoGlyphProps {
  /** A stable string (e.g. route path) · deterministically picks family + variant */
  slug: string;
  hue?: number;
  size?: number;
}

/**
 * AutoGlyph · the convenience picker. Given a slug (any string), picks
 * one of the 10 illustration families + a variant seed in [0,11].
 * Different slug → different visual · same slug → same visual every render.
 * Use this at the header of any page that wants a unique decoration.
 */
export function AutoGlyph({ slug, hue, size = 200 }: AutoGlyphProps) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  const familyIdx = Math.abs(h) % ALL.length;
  const variant = Math.abs(h >> 8) % 12;
  const Family = ALL[familyIdx];
  const computedHue = hue !== undefined ? hue : Math.abs(h >> 16) % 360;
  return <Family seed={variant} hue={computedHue} size={size} />;
}
