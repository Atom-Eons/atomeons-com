/**
 * Illustrations3.tsx · Wave 45 expansion · 5 more procedural families.
 *
 * Pythagoras Tree · Hilbert Curve · Sierpinski Triangle · Koch Snowflake
 * · Lorenz Attractor projection. Pure server-renderable SVG · seeded
 * deterministic · joining the existing 18 families to reach 23.
 */

import React from "react";

const TAU = Math.PI * 2;

// =============================================================================
// 19. PythagorasTree · classic recursive squared branching
// =============================================================================

interface Square {
  x: number;
  y: number;
  size: number;
  angle: number;
  depth: number;
}

function buildPythagorasTree(
  x: number,
  y: number,
  size: number,
  angle: number,
  depth: number,
  maxDepth: number,
  branchAngle: number,
  squares: Square[],
) {
  if (depth > maxDepth || size < 1) return;
  squares.push({ x, y, size, angle, depth });
  // Compute the two child square positions atop this one
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  // Top-left corner of this square
  const tx = x - sin * size;
  const ty = y - cos * size;
  // Left child
  const leftSize = size * Math.cos(branchAngle);
  const leftAngle = angle - branchAngle;
  buildPythagorasTree(
    tx,
    ty,
    leftSize,
    leftAngle,
    depth + 1,
    maxDepth,
    branchAngle,
    squares,
  );
  // Right child
  const rightSize = size * Math.sin(branchAngle);
  const rightAngle = angle + (Math.PI / 2 - branchAngle);
  const rx = tx + Math.cos(leftAngle) * leftSize;
  const ry = ty + Math.sin(leftAngle) * leftSize;
  buildPythagorasTree(
    rx,
    ry,
    rightSize,
    rightAngle,
    depth + 1,
    maxDepth,
    branchAngle,
    squares,
  );
}

export function PythagorasTree({
  seed = 0,
  hue = 130,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const maxDepth = 8 + (seed % 3);
  const branchAngle = (35 + (seed % 4) * 8) * (Math.PI / 180);
  const squares: Square[] = [];
  buildPythagorasTree(-15, 80, 30, -Math.PI / 2, 0, maxDepth, branchAngle, squares);
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="pythagoras-tree"
    >
      {squares.map((s, i) => {
        const cos = Math.cos(s.angle);
        const sin = Math.sin(s.angle);
        const corners = [
          { x: s.x, y: s.y },
          { x: s.x + cos * s.size, y: s.y + sin * s.size },
          { x: s.x + cos * s.size - sin * s.size, y: s.y + sin * s.size + cos * s.size },
          { x: s.x - sin * s.size, y: s.y + cos * s.size },
        ];
        const pts = corners.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
        return (
          <polygon
            key={i}
            points={pts}
            fill={`hsla(${hue + s.depth * 8}, 65%, ${Math.max(30, 60 - s.depth * 4)}%, ${Math.max(0.12, 0.5 - s.depth * 0.04)})`}
            stroke={`hsla(${hue + s.depth * 8}, 70%, 60%, 0.5)`}
            strokeWidth={0.4}
          />
        );
      })}
    </svg>
  );
}

// =============================================================================
// 20. HilbertCurve · space-filling fractal
// =============================================================================

// Iterative Hilbert d-to-(x,y) (from Wikipedia · public domain)
function hilbertD2XY(n: number, d: number): [number, number] {
  let rx: number, ry: number;
  let x = 0, y = 0;
  let t = d;
  for (let s = 1; s < n; s *= 2) {
    rx = 1 & (t / 2);
    ry = 1 & (t ^ rx);
    if (ry === 0) {
      if (rx === 1) {
        x = s - 1 - x;
        y = s - 1 - y;
      }
      [x, y] = [y, x];
    }
    x += s * rx;
    y += s * ry;
    t = Math.floor(t / 4);
  }
  return [x, y];
}

export function HilbertCurve({
  seed = 0,
  hue = 195,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const order = 4 + (seed % 3); // 2^4 = 16 to 2^6 = 64 grid
  const n = Math.pow(2, order);
  const cell = 180 / n;
  const offset = -90 + cell / 2;
  const pts: string[] = [];
  for (let d = 0; d < n * n; d++) {
    const [x, y] = hilbertD2XY(n, d);
    pts.push(`${(offset + x * cell).toFixed(2)},${(offset + y * cell).toFixed(2)}`);
  }
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="hilbert-curve"
    >
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={`hsla(${hue}, 70%, 60%, 0.7)`}
        strokeWidth={0.8}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// =============================================================================
// 21. Sierpinski Triangle · classic fractal
// =============================================================================

interface Tri {
  x: number;
  y: number;
  size: number;
  depth: number;
}

function buildSierpinski(
  x: number,
  y: number,
  size: number,
  depth: number,
  maxDepth: number,
  out: Tri[],
) {
  if (depth >= maxDepth) {
    out.push({ x, y, size, depth });
    return;
  }
  const half = size / 2;
  const h = (half * Math.sqrt(3)) / 2;
  buildSierpinski(x, y - h / 2, half, depth + 1, maxDepth, out);
  buildSierpinski(x - half / 2, y + h / 2, half, depth + 1, maxDepth, out);
  buildSierpinski(x + half / 2, y + h / 2, half, depth + 1, maxDepth, out);
}

export function SierpinskiTriangle({
  seed = 0,
  hue = 50,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const maxDepth = 5 + (seed % 3);
  const out: Tri[] = [];
  buildSierpinski(0, 0, 170, 0, maxDepth, out);
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="sierpinski-triangle"
    >
      {out.map((t, i) => {
        const half = t.size / 2;
        const h = (t.size * Math.sqrt(3)) / 2;
        const pts = `${t.x},${t.y - h / 2} ${t.x - half},${t.y + h / 2} ${t.x + half},${t.y + h / 2}`;
        return (
          <polygon
            key={i}
            points={pts}
            fill={`hsla(${hue + (i % 18) * 5}, 70%, 55%, 0.35)`}
            stroke={`hsla(${hue}, 70%, 60%, 0.5)`}
            strokeWidth={0.4}
          />
        );
      })}
    </svg>
  );
}

// =============================================================================
// 22. Koch Snowflake · classic fractal
// =============================================================================

function kochIterate(points: Array<[number, number]>): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const ax = x1 + dx / 3;
    const ay = y1 + dy / 3;
    const bx = x1 + (2 * dx) / 3;
    const by = y1 + (2 * dy) / 3;
    // peak point · 60° turn
    const cos60 = 0.5;
    const sin60 = Math.sqrt(3) / 2;
    const mx = ax + (bx - ax) * cos60 - (by - ay) * sin60;
    const my = ay + (bx - ax) * sin60 + (by - ay) * cos60;
    out.push([x1, y1], [ax, ay], [mx, my], [bx, by]);
  }
  out.push(points[points.length - 1]);
  return out;
}

export function KochSnowflake({
  seed = 0,
  hue = 200,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  const iterations = 3 + (seed % 3);
  // Start with equilateral triangle
  const r = 70;
  let points: Array<[number, number]> = [
    [0, -r],
    [r * Math.sin(TAU / 3), r * Math.cos(TAU / 3)],
    [r * Math.sin((2 * TAU) / 3), r * Math.cos((2 * TAU) / 3)],
    [0, -r],
  ];
  for (let i = 0; i < iterations; i++) {
    points = kochIterate(points);
  }
  const d = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="koch-snowflake"
    >
      <path
        d={d}
        fill={`hsla(${hue}, 70%, 55%, 0.12)`}
        stroke={`hsla(${hue}, 75%, 65%, 0.85)`}
        strokeWidth={0.8}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// =============================================================================
// 23. Lorenz Attractor · 2D projection of the chaotic 3D system
// =============================================================================

export function LorenzAttractor({
  seed = 0,
  hue = 285,
  size = 200,
}: {
  seed?: number;
  hue?: number;
  size?: number;
}) {
  // Standard Lorenz parameters · σ = 10 · ρ = 28 · β = 8/3
  const sigma = 10;
  const rho = 28;
  const beta = 8 / 3;
  const dt = 0.005;
  const steps = 4000 + (seed % 4) * 1000;
  // Start near attractor with small seed offset
  let x = 0.1 + seed * 0.013;
  let y = 0 + (seed % 5) * 0.05;
  let z = 0;
  const pts: string[] = [];
  for (let i = 0; i < steps; i++) {
    const dx = sigma * (y - x);
    const dy = x * (rho - z) - y;
    const dz = x * y - beta * z;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;
    // Project (x, z) plane · z is the up axis · scale to viewBox
    const px = x * 2.5;
    const py = -(z - 25) * 2.5;
    if (i === 0) pts.push(`M ${px.toFixed(2)} ${py.toFixed(2)}`);
    else pts.push(`L ${px.toFixed(2)} ${py.toFixed(2)}`);
  }
  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      aria-hidden="true"
      data-illustration="lorenz-attractor"
    >
      <path
        d={pts.join(" ")}
        fill="none"
        stroke={`hsla(${hue}, 70%, 65%, 0.4)`}
        strokeWidth={0.4}
        strokeLinecap="round"
      />
    </svg>
  );
}
