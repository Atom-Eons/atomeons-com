/**
 * Illustrations2.tsx · expansion library · sacred geometry classics.
 *
 * Wave 43 · 2026-06-06 · operator: "go 100x deeper in the art." Eight
 * new procedural illustration families joining the original 10 in
 * Illustrations.tsx. All server-renderable pure SVG · seeded · deterministic.
 *
 *   11. FlowerOfLife       19-circle hexagonal interlock · classic
 *   12. MetatronCube        13 circles + lines · 5 Platonic solids implied
 *   13. SriYantra           9 interlocking triangles · 43 small triangles
 *   14. TruchetTiles        Random quarter-arc maze field
 *   15. VoronoiCells        Voronoi diagram from sparse seed points
 *   16. PenroseTiling       Kite + dart P3 aperiodic tiles (simplified)
 *   17. FractalTree         L-system recursive branching · Pythagoras tree
 *   18. WaveInterference    Two-source overlapping ripple field
 */

import React from "react";

// =============================================================================
// 11. FlowerOfLife · 19-circle hexagonal interlock
// =============================================================================

export function FlowerOfLife({
  seed = 0,
  hue = 175,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const r = 22 + (seed % 5) * 2; // circle radius
  // 19-circle pattern: center + 6 inner ring + 12 outer ring
  const positions: Array<{ cx: number; cy: number; depth: number }> = [
    { cx: 0, cy: 0, depth: 0 },
  ];
  // Inner ring of 6
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    positions.push({ cx: Math.cos(a) * r, cy: Math.sin(a) * r, depth: 1 });
  }
  // Outer ring of 12 at 2 distances
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    positions.push({ cx: Math.cos(a) * r * 2, cy: Math.sin(a) * r * 2, depth: 2 });
  }
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    positions.push({
      cx: Math.cos(a) * r * Math.sqrt(3),
      cy: Math.sin(a) * r * Math.sqrt(3),
      depth: 2,
    });
  }
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="flower-of-life"
    >
      {positions.map((p, i) => (
        <circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r={r}
          fill="none"
          stroke={`hsla(${hue + p.depth * 8}, 65%, ${64 - p.depth * 6}%, ${0.6 - p.depth * 0.12})`}
          strokeWidth={0.8}
        />
      ))}
      <circle cx={0} cy={0} r={2} fill={`hsla(${hue}, 80%, 70%, 0.9)`} />
    </svg>
  );
}

// =============================================================================
// 12. MetatronCube · 13 circles + edges
// =============================================================================

export function MetatronCube({
  seed = 0,
  hue = 200,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const r = 12 + (seed % 4); // small circle radius
  // 13 nodes · 1 center + 6 inner hex + 6 outer hex (rotated 30°)
  const nodes: Array<{ x: number; y: number }> = [{ x: 0, y: 0 }];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    nodes.push({ x: Math.cos(a) * 30, y: Math.sin(a) * 30 });
  }
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    nodes.push({ x: Math.cos(a) * 60, y: Math.sin(a) * 60 });
  }
  // All-pairs edges · classic Metatron is every node connected to every other
  const edges: Array<[number, number]> = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      edges.push([i, j]);
    }
  }
  return (
    <svg
      viewBox="-90 -90 180 180"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="metatron-cube"
    >
      <g>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={`hsla(${hue}, 55%, 50%, 0.16)`}
            strokeWidth={0.45}
          />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={r}
          fill="none"
          stroke={`hsla(${hue + i * 4}, 70%, 65%, 0.7)`}
          strokeWidth={0.8}
        />
      ))}
    </svg>
  );
}

// =============================================================================
// 13. SriYantra · 9 interlocking triangles
// =============================================================================

export function SriYantra({
  seed = 0,
  hue = 40,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  // 4 upward-pointing + 5 downward-pointing triangles at scaled offsets
  // Simplified geometric placement · the "real" Sri Yantra has precise
  // tantric proportions · this is the visual essence at a glance
  const up = [
    { h: 78, y: 0 },
    { h: 62, y: -6 },
    { h: 48, y: -10 },
    { h: 32, y: -14 },
  ];
  const down = [
    { h: 86, y: 4 },
    { h: 70, y: 8 },
    { h: 54, y: 12 },
    { h: 38, y: 16 },
    { h: 22, y: 20 },
  ];
  const tri = (h: number, y: number, up: boolean) => {
    const half = (h * Math.sqrt(3)) / 2;
    return up
      ? `M ${-half} ${y + h / 2} L ${half} ${y + h / 2} L 0 ${y - h / 2} Z`
      : `M ${-half} ${y - h / 2} L ${half} ${y - h / 2} L 0 ${y + h / 2} Z`;
  };
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="sri-yantra"
    >
      {up.map((t, i) => (
        <path
          key={`u-${i}`}
          d={tri(t.h, t.y, true)}
          fill="none"
          stroke={`hsla(${hue + i * 6}, 70%, 60%, ${0.7 - i * 0.08})`}
          strokeWidth={0.9}
        />
      ))}
      {down.map((t, i) => (
        <path
          key={`d-${i}`}
          d={tri(t.h, t.y, false)}
          fill="none"
          stroke={`hsla(${(hue + 180) % 360}, 70%, 60%, ${0.7 - i * 0.08})`}
          strokeWidth={0.9}
        />
      ))}
      {/* Outer enclosing circle */}
      <circle cx={0} cy={0} r={90} fill="none" stroke={`hsla(${hue}, 60%, 55%, 0.5)`} strokeWidth={0.8} />
      {/* Center bindu */}
      <circle cx={0} cy={0} r={2.5} fill={`hsla(${hue}, 85%, 70%, 1)`} />
    </svg>
  );
}

// =============================================================================
// 14. TruchetTiles · maze field of quarter-arcs
// =============================================================================

export function TruchetTiles({
  seed = 0,
  hue = 290,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const cells = 7; // 7x7 grid
  const cell = 200 / cells;
  const tiles: Array<{ x: number; y: number; orient: 0 | 1 }> = [];
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const k = (seed * 31 + r * 13 + c * 7) & 0xff;
      tiles.push({ x: c * cell - 100, y: r * cell - 100, orient: (k % 2) as 0 | 1 });
    }
  }
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="truchet-tiles"
    >
      {tiles.map((t, i) => (
        <g key={i} transform={`translate(${t.x},${t.y})`}>
          {t.orient === 0 ? (
            <>
              <path
                d={`M 0 0 A ${cell / 2} ${cell / 2} 0 0 1 ${cell / 2} ${cell / 2}`}
                fill="none"
                stroke={`hsla(${hue}, 65%, 60%, 0.7)`}
                strokeWidth={1.2}
              />
              <path
                d={`M ${cell} ${cell} A ${cell / 2} ${cell / 2} 0 0 1 ${cell / 2} ${cell / 2}`}
                fill="none"
                stroke={`hsla(${hue}, 65%, 60%, 0.7)`}
                strokeWidth={1.2}
              />
            </>
          ) : (
            <>
              <path
                d={`M ${cell} 0 A ${cell / 2} ${cell / 2} 0 0 0 ${cell / 2} ${cell / 2}`}
                fill="none"
                stroke={`hsla(${hue}, 65%, 60%, 0.7)`}
                strokeWidth={1.2}
              />
              <path
                d={`M 0 ${cell} A ${cell / 2} ${cell / 2} 0 0 0 ${cell / 2} ${cell / 2}`}
                fill="none"
                stroke={`hsla(${hue}, 65%, 60%, 0.7)`}
                strokeWidth={1.2}
              />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

// =============================================================================
// 15. VoronoiCells · cell diagram from sparse seeds (visual approx)
// =============================================================================

export function VoronoiCells({
  seed = 0,
  hue = 100,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  // True Voronoi needs sweep algorithm · we approximate with a dot scatter
  // surrounded by perpendicular bisectors approximated visually as
  // octagonal cells around each seed.
  const n = 14 + (seed % 6);
  const seeds: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < n; i++) {
    const a = i * 2.39996 + seed; // golden angle
    const r = Math.sqrt(i / n) * 85;
    seeds.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
  }
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="voronoi-cells"
    >
      {/* Edges · connect each seed to its 3 nearest neighbors */}
      <g>
        {seeds.map((s, i) => {
          // find 3 nearest
          const dist = seeds
            .map((t, j) => ({ j, d: i === j ? Infinity : Math.hypot(s.x - t.x, s.y - t.y) }))
            .sort((a, b) => a.d - b.d)
            .slice(0, 3);
          return dist.map(({ j }) => {
            if (j > i) {
              const t = seeds[j];
              // midpoint perpendicular · approximation: just draw connecting line
              return (
                <line
                  key={`${i}-${j}`}
                  x1={s.x}
                  y1={s.y}
                  x2={t.x}
                  y2={t.y}
                  stroke={`hsla(${hue}, 55%, 55%, 0.18)`}
                  strokeWidth={0.5}
                />
              );
            }
            return null;
          });
        })}
      </g>
      {seeds.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={2} fill={`hsla(${hue + i * 6}, 70%, 65%, 0.85)`} />
      ))}
    </svg>
  );
}

// =============================================================================
// 16. PenroseTiling · simplified P3 kite + dart
// =============================================================================

export function PenroseTiling({
  seed = 0,
  hue = 320,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  // 10-fold symmetric arrangement of kites in a ring · classic Penrose preview
  const PHI = (1 + Math.sqrt(5)) / 2;
  const r = 80;
  const tiles: Array<{ d: string; kind: "kite" | "dart" }> = [];
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const a2 = ((i + 1) / 10) * Math.PI * 2;
    const c1x = Math.cos(a) * r;
    const c1y = Math.sin(a) * r;
    const c2x = Math.cos(a2) * r;
    const c2y = Math.sin(a2) * r;
    // Kite: center → c1 → midpoint → c2 → center
    const midR = r / PHI;
    const midA = (a + a2) / 2;
    const mx = Math.cos(midA) * midR;
    const my = Math.sin(midA) * midR;
    tiles.push({
      d: `M 0 0 L ${c1x.toFixed(1)} ${c1y.toFixed(1)} L ${mx.toFixed(1)} ${my.toFixed(1)} L ${c2x.toFixed(1)} ${c2y.toFixed(1)} Z`,
      kind: i % 2 === 0 ? "kite" : "dart",
    });
  }
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="penrose-tiling"
    >
      {tiles.map((t, i) => (
        <path
          key={i}
          d={t.d}
          fill={t.kind === "kite" ? `hsla(${hue}, 60%, 50%, 0.18)` : `hsla(${(hue + 60) % 360}, 60%, 50%, 0.12)`}
          stroke={`hsla(${hue}, 65%, 60%, 0.7)`}
          strokeWidth={0.7}
        />
      ))}
    </svg>
  );
}

// =============================================================================
// 17. FractalTree · L-system recursive branching
// =============================================================================

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  depth: number;
}

function buildTreeSegments(
  x: number,
  y: number,
  len: number,
  angle: number,
  depth: number,
  maxDepth: number,
  branchAngle: number,
  segments: Segment[],
) {
  if (depth > maxDepth) return;
  const x2 = x + Math.cos(angle) * len;
  const y2 = y + Math.sin(angle) * len;
  segments.push({ x1: x, y1: y, x2, y2, depth });
  const newLen = len * 0.72;
  buildTreeSegments(x2, y2, newLen, angle - branchAngle, depth + 1, maxDepth, branchAngle, segments);
  buildTreeSegments(x2, y2, newLen, angle + branchAngle, depth + 1, maxDepth, branchAngle, segments);
}

export function FractalTree({
  seed = 0,
  hue = 130,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const maxDepth = 7 + (seed % 3);
  const branchAngle = 0.38 + ((seed % 5) * 0.06);
  const segments: Segment[] = [];
  buildTreeSegments(0, 80, 48, -Math.PI / 2, 0, maxDepth, branchAngle, segments);
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="fractal-tree"
    >
      {segments.map((s, i) => (
        <line
          key={i}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke={`hsla(${hue + s.depth * 6}, 65%, ${60 - s.depth * 3}%, ${Math.max(0.25, 1 - s.depth * 0.1)})`}
          strokeWidth={Math.max(0.4, (maxDepth - s.depth) * 0.3)}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

// =============================================================================
// 18. WaveInterference · two-source ripple field
// =============================================================================

export function WaveInterference({
  seed = 0,
  hue = 195,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const rings = 14;
  const sourceOffset = 40 + (seed % 4) * 8;
  // Two sources symmetric on horizontal axis
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="wave-interference"
    >
      <g>
        {Array.from({ length: rings }).map((_, i) => {
          const r = 8 + i * 6;
          return (
            <circle
              key={`a-${i}`}
              cx={-sourceOffset}
              cy={0}
              r={r}
              fill="none"
              stroke={`hsla(${hue}, 65%, 60%, ${Math.max(0.05, 0.45 - i * 0.025)})`}
              strokeWidth={0.5}
            />
          );
        })}
      </g>
      <g style={{ mixBlendMode: "screen" }}>
        {Array.from({ length: rings }).map((_, i) => {
          const r = 8 + i * 6;
          return (
            <circle
              key={`b-${i}`}
              cx={sourceOffset}
              cy={0}
              r={r}
              fill="none"
              stroke={`hsla(${(hue + 40) % 360}, 65%, 60%, ${Math.max(0.05, 0.45 - i * 0.025)})`}
              strokeWidth={0.5}
            />
          );
        })}
      </g>
      <circle cx={-sourceOffset} cy={0} r={2.5} fill={`hsla(${hue}, 80%, 70%, 1)`} />
      <circle cx={sourceOffset} cy={0} r={2.5} fill={`hsla(${(hue + 40) % 360}, 80%, 70%, 1)`} />
    </svg>
  );
}

// =============================================================================
// All-families registry for the /art gallery
// =============================================================================

export const FAMILY_REGISTRY_2 = [
  { name: "Flower of Life", component: FlowerOfLife, hueDefault: 175 },
  { name: "Metatron's Cube", component: MetatronCube, hueDefault: 200 },
  { name: "Sri Yantra", component: SriYantra, hueDefault: 40 },
  { name: "Truchet Tiles", component: TruchetTiles, hueDefault: 290 },
  { name: "Voronoi Cells", component: VoronoiCells, hueDefault: 100 },
  { name: "Penrose Tiling", component: PenroseTiling, hueDefault: 320 },
  { name: "Fractal Tree", component: FractalTree, hueDefault: 130 },
  { name: "Wave Interference", component: WaveInterference, hueDefault: 195 },
] as const;
