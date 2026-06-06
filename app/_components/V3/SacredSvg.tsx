/**
 * SacredSvg · TouchDesigner-grade procedural geometry · GPU-only.
 *
 * Wave 41 · 2026-06-06 · operator: "do more of that touchdesigner sacred
 * geom." Added 5 new layer families on top of the original 8:
 *
 *   Layer family               · count of elements          · rotation
 *   ─────────────────────────────────────────────────────────────────
 *   1. Phyllotaxis spiral       · 1800 dots · golden angle    · 480s →
 *   2. Hex lattice points       · 271 dots · q-r hex coords   · 900s →
 *   3. 12 radial rays            · static lines                · 720s →
 *   4. Polygon 3 / 6 / 12        · counter-rotating            · 180-360s
 *   5. Mandala 5 / 7 / 11        · 3 prime-fold rings          · 800-1100s
 *   6. Reuleaux triangles        · 6-position fixed field      · 450s ←
 *   7. Inscribed arcs            · 4 concentric · 1/4 each     · 660s →
 *   8. Lissajous π/e/φ           · 3 aperiodic curves          · 540-720s
 *   9. Tessellation dots         · 6 outer-ring orbiting       · 200s
 *  10. Center radiance            · 5 concentric pulses         · breathe
 *
 * All rendered as a single static SVG · animated only via CSS @keyframes
 * on the parent <g> elements · zero JS per frame · GPU-composited.
 * Honors prefers-reduced-motion · tier-aware via globals.css.
 */

const GOLDEN_ANGLE_RAD = (137.50776405003785 * Math.PI) / 180;
const TAU = Math.PI * 2;

// --- One-time geometry generators ----------------------------------------

function buildPhyllotaxis(count: number, scale: number) {
  const out: Array<{ x: number; y: number; r: number; op: number }> = [];
  for (let i = 0; i < count; i++) {
    const a = i * GOLDEN_ANGLE_RAD;
    const r = Math.sqrt(i);
    out.push({
      x: Math.cos(a) * r * scale,
      y: Math.sin(a) * r * scale,
      r: 0.8 + (i / count) * 0.6,
      op: 0.18 + (((i * 7919) % 100) / 100) * 0.32,
    });
  }
  return out;
}

function buildHexLattice(rings: number, cellSize: number) {
  // Axial hex coordinates · q-r system
  const pts: Array<{ x: number; y: number; op: number }> = [];
  for (let q = -rings; q <= rings; q++) {
    for (let r = Math.max(-rings, -q - rings); r <= Math.min(rings, -q + rings); r++) {
      const x = cellSize * (1.5 * q);
      const y = cellSize * (Math.sqrt(3) * (r + q / 2));
      const dist = Math.sqrt(q * q + r * r + q * r);
      pts.push({ x, y, op: Math.max(0.04, 0.22 - dist * 0.014) });
    }
  }
  return pts;
}

function buildPolygon(sides: number, radius: number, rot = 0) {
  const pts: string[] = [];
  for (let i = 0; i <= sides; i++) {
    const a = (i / sides) * TAU + rot;
    pts.push(`${Math.cos(a) * radius},${Math.sin(a) * radius}`);
  }
  return pts.join(" ");
}

function buildLissajous(a: number, b: number, scale: number, steps = 240) {
  const pts: string[] = [];
  for (let s = 0; s <= steps; s++) {
    const u = (s / steps) * TAU;
    const x = Math.sin(a * u) * scale;
    const y = Math.sin(b * u) * scale;
    pts.push(`${s === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

// Build a mandala "petal ring" · n petals · each petal is a circle at
// offset radius, of given size · returns SVG-ready circle params.
function buildMandalaRing(petals: number, offset: number, petalSize: number) {
  const out: Array<{ cx: number; cy: number; r: number }> = [];
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * TAU;
    out.push({
      cx: Math.cos(a) * offset,
      cy: Math.sin(a) * offset,
      r: petalSize,
    });
  }
  return out;
}

// A Reuleaux triangle is the intersection of three circles whose centers
// are the vertices of an equilateral triangle and whose radius equals
// the triangle's side length. We approximate via 3 circular arcs.
function buildReuleauxPath(cx: number, cy: number, size: number, rot = 0) {
  // Vertices of an equilateral triangle inscribed in a circle of radius `size`
  const v = (i: number) => {
    const a = rot + (i / 3) * TAU - Math.PI / 2;
    return { x: cx + Math.cos(a) * size, y: cy + Math.sin(a) * size };
  };
  const v0 = v(0);
  const v1 = v(1);
  const v2 = v(2);
  // Reuleaux uses circular arcs of radius = triangle side length
  // For our 3-vertex triangle inscribed in a circle of radius `size`,
  // the side length is size * sqrt(3).
  const arcR = size * Math.sqrt(3);
  return `M ${v0.x.toFixed(2)} ${v0.y.toFixed(2)} A ${arcR.toFixed(2)} ${arcR.toFixed(2)} 0 0 1 ${v1.x.toFixed(2)} ${v1.y.toFixed(2)} A ${arcR.toFixed(2)} ${arcR.toFixed(2)} 0 0 1 ${v2.x.toFixed(2)} ${v2.y.toFixed(2)} A ${arcR.toFixed(2)} ${arcR.toFixed(2)} 0 0 1 ${v0.x.toFixed(2)} ${v0.y.toFixed(2)} Z`;
}

// --- Component ----------------------------------------------------------

export function SacredSvg() {
  const dots = buildPhyllotaxis(1800, 7);
  const hex = buildHexLattice(8, 38);

  // Three mandala rings at prime-fold symmetries
  const mandala5 = buildMandalaRing(5, 270, 26);
  const mandala7 = buildMandalaRing(7, 200, 18);
  const mandala11 = buildMandalaRing(11, 320, 14);

  // 6 Reuleaux triangles positioned around a hexagonal lattice
  const reuleauxPositions = buildMandalaRing(6, 240, 0).map((p) => ({
    cx: p.cx,
    cy: p.cy,
  }));

  // 6 small orbiting circles · outer-ring tessellation
  const tessellation = buildMandalaRing(6, 440, 8);

  return (
    <div
      aria-hidden="true"
      data-component="sacred-svg"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    >
      <style>{`
        /* Wave 41 · TouchDesigner amplification · 10 layer families ·
           every layer rotates independently at a different speed +
           direction · all pure CSS @keyframes · GPU compositor only. */
        @keyframes sg-cw     { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
        @keyframes sg-ccw    { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
        @keyframes sg-pulse  { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes sg-breathe { 0%,100% { opacity: 0.9; transform: scale(1); } 50% { opacity: 1; transform: scale(1.04); } }

        .sg-root { width: 100vw; height: 100vh; will-change: contents; }
        .sg-root g {
          transform-origin: 50% 50%;
          will-change: transform;
        }
        .sg-layer-1  { animation: sg-cw   480s linear infinite; }
        .sg-layer-2  { animation: sg-cw   900s linear infinite; }
        .sg-layer-3  { animation: sg-cw   720s linear infinite; }
        .sg-layer-4a { animation: sg-cw   180s linear infinite; }
        .sg-layer-4b { animation: sg-ccw  240s linear infinite; }
        .sg-layer-4c { animation: sg-cw   360s linear infinite; }
        .sg-layer-5a { animation: sg-cw   800s linear infinite; }
        .sg-layer-5b { animation: sg-ccw  640s linear infinite; }
        .sg-layer-5c { animation: sg-cw  1100s linear infinite; }
        .sg-layer-6  { animation: sg-ccw  450s linear infinite; }
        .sg-layer-7a { animation: sg-cw   660s linear infinite; }
        .sg-layer-7b { animation: sg-ccw  820s linear infinite; }
        .sg-layer-8a { animation: sg-cw   540s linear infinite; }
        .sg-layer-8b { animation: sg-ccw  600s linear infinite; }
        .sg-layer-8c { animation: sg-cw   720s linear infinite; }
        .sg-layer-9  { animation: sg-ccw  200s linear infinite; }
        .sg-layer-10 { animation: sg-breathe 22s ease-in-out infinite; transform-origin: 50% 50%; }

        @media (prefers-reduced-motion: reduce) {
          .sg-root g { animation: none !important; }
        }
        html.lite-mode .sg-root,
        html.tier-lite .sg-root,
        html.visuals-off .sg-root,
        html.theme-thin .sg-root { display: none; }
      `}</style>
      <svg
        className="sg-root"
        viewBox="-500 -500 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1 · Phyllotaxis spiral · 1800 dots */}
        <g className="sg-layer-1">
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#22F0D5" opacity={d.op.toFixed(3)} />
          ))}
        </g>

        {/* Layer 2 · Hex lattice points · 8-ring hexagonal field */}
        <g className="sg-layer-2">
          {hex.map((h, i) => (
            <circle key={i} cx={h.x} cy={h.y} r={0.7} fill="#22F0D5" opacity={h.op.toFixed(3)} />
          ))}
        </g>

        {/* Layer 3 · 12 radial rays */}
        <g className="sg-layer-3" stroke="#22F0D5" strokeOpacity="0.05" strokeWidth="1">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * TAU;
            const x = Math.cos(a) * 460;
            const y = Math.sin(a) * 460;
            const x1 = Math.cos(a) * 140;
            const y1 = Math.sin(a) * 140;
            return <line key={i} x1={x1} y1={y1} x2={x} y2={y} />;
          })}
        </g>

        {/* Layer 4 · Counter-rotating polygons 3/6/12 */}
        <g className="sg-layer-4a" stroke="#22F0D5" strokeOpacity="0.05" strokeWidth="1" fill="none">
          <polygon points={buildPolygon(3, 470)} />
        </g>
        <g className="sg-layer-4b" stroke="#22F0D5" strokeOpacity="0.06" strokeWidth="1" fill="none">
          <polygon points={buildPolygon(6, 410)} />
        </g>
        <g className="sg-layer-4c" stroke="#22F0D5" strokeOpacity="0.045" strokeWidth="1" fill="none">
          <polygon points={buildPolygon(12, 350)} />
        </g>

        {/* Layer 5 · Prime-fold mandalas 5/7/11 */}
        <g className="sg-layer-5a" stroke="#22F0D5" strokeOpacity="0.07" strokeWidth="0.8" fill="none">
          {mandala5.map((m, i) => (
            <circle key={i} cx={m.cx} cy={m.cy} r={m.r} />
          ))}
        </g>
        <g className="sg-layer-5b" stroke="#22F0D5" strokeOpacity="0.055" strokeWidth="0.8" fill="none">
          {mandala7.map((m, i) => (
            <circle key={i} cx={m.cx} cy={m.cy} r={m.r} />
          ))}
        </g>
        <g className="sg-layer-5c" stroke="#22F0D5" strokeOpacity="0.04" strokeWidth="0.7" fill="none">
          {mandala11.map((m, i) => (
            <circle key={i} cx={m.cx} cy={m.cy} r={m.r} />
          ))}
        </g>

        {/* Layer 6 · Reuleaux triangle field · 6 positions */}
        <g className="sg-layer-6" stroke="#22F0D5" strokeOpacity="0.04" strokeWidth="0.7" fill="none">
          {reuleauxPositions.map((p, i) => (
            <path key={i} d={buildReuleauxPath(p.cx, p.cy, 32, (i / 6) * TAU)} />
          ))}
        </g>

        {/* Layer 7 · Inscribed concentric arcs · two counter-rotating */}
        <g className="sg-layer-7a" stroke="#22F0D5" strokeOpacity="0.05" strokeWidth="0.8" fill="none">
          <circle cx={0} cy={0} r={180} strokeDasharray="20 8" />
          <circle cx={0} cy={0} r={280} strokeDasharray="32 12" />
        </g>
        <g className="sg-layer-7b" stroke="#22F0D5" strokeOpacity="0.045" strokeWidth="0.8" fill="none">
          <circle cx={0} cy={0} r={220} strokeDasharray="14 6" />
          <circle cx={0} cy={0} r={380} strokeDasharray="40 20" />
        </g>

        {/* Layer 8 · Three Lissajous curves at π/e/φ ratios */}
        <g className="sg-layer-8a" stroke="#22F0D5" strokeOpacity="0.035" strokeWidth="1" fill="none">
          <path d={buildLissajous(Math.PI, Math.E, 220)} />
        </g>
        <g className="sg-layer-8b" stroke="#22F0D5" strokeOpacity="0.035" strokeWidth="1" fill="none">
          <path d={buildLissajous(1.618, Math.PI, 250)} />
        </g>
        <g className="sg-layer-8c" stroke="#22F0D5" strokeOpacity="0.03" strokeWidth="1" fill="none">
          <path d={buildLissajous(Math.E, 1.618, 275)} />
        </g>

        {/* Layer 9 · Tessellation outer-ring dots */}
        <g className="sg-layer-9" fill="#22F0D5">
          {tessellation.map((t, i) => (
            <circle key={i} cx={t.cx} cy={t.cy} r={t.r} opacity={0.18} />
          ))}
        </g>

        {/* Layer 10 · Center radiance · concentric pulses */}
        <g className="sg-layer-10" stroke="#22F0D5" fill="none" strokeWidth="0.6">
          <circle cx={0} cy={0} r={6} opacity={0.5} />
          <circle cx={0} cy={0} r={20} opacity={0.35} />
          <circle cx={0} cy={0} r={48} opacity={0.22} />
          <circle cx={0} cy={0} r={96} opacity={0.14} />
          <circle cx={0} cy={0} r={140} opacity={0.08} />
        </g>
      </svg>
    </div>
  );
}
