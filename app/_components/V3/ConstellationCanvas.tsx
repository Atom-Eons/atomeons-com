"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ConstellationCanvas — interactive force-laid knowledge graph of the
 * lab's 319 routes and 943 cross-route links (Wave 118 count refresh
 * from graph-index.json snapshot 2026-06-18; previously documented as
 * 278/648 which was a stale build).
 *
 * Loads /graph-index.json on mount. Lays out nodes via a deterministic
 * radial seed (categories around the clock face, weight pulls nodes
 * inward), then runs a lightweight force-directed relaxation for N
 * rounds to settle the cluster shape. Renders to a single Canvas2D
 * surface with pan + zoom + node hover + click-to-navigate.
 *
 * Performance budget: ~319 × 6 force-update operations per relaxation
 * round × ~150 rounds = ~250K ops on mount, then static unless the
 * user drags. ~12 KB minified.
 *
 * Visual language:
 *   nodes  · cyan dot · size √(weight + 2) × 1.4
 *   edges  · 0.5px line · opacity 0.06
 *   hover  · cyan glow + route label in mono caps
 *   focus  · cyan ring · click navigates
 */

type Node = { r: string; t: string; c: string; w: number; x: number; y: number; vx: number; vy: number };
type Edge = { from: string; to: string };

type Index = {
  v: number;
  built: string;
  nodes: Array<{ r: string; t: string; c: string; w: number }>;
  edges: Edge[];
};

// Stable hash for a string · used to seed deterministic angular position
function hash32(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return h >>> 0;
}

const CATEGORY_ORDER = [
  "home", "learn", "research", "orangebox", "b00kmakor", "skilski",
  "i-am-ai", "q", "founders-view", "intel", "press", "now",
  "lab", "trust", "transparency", "aesthetic", "colophon", "timeline",
  "influences", "library", "listening", "watching", "ask", "live",
  "use-cases", "compare", "integrations", "manifesto", "receipts", "api",
  "teach", "dear-reader", "correspondence", "constellation",
];

function categoryAngle(c: string, _seed: string): number {
  const idx = CATEGORY_ORDER.indexOf(c);
  const base = idx >= 0 ? idx / CATEGORY_ORDER.length : (hash32(c) % 360) / 360;
  return base * Math.PI * 2;
}

export function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hover, setHover] = useState<{ x: number; y: number; node: Node } | null>(null);
  const [stats, setStats] = useState<{ nodes: number; edges: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Bail out for lite-mode (low-end-device toggle).
    if (document.documentElement.classList.contains("lite-mode")) {
      setStats({ nodes: 0, edges: 0 });
      return;
    }

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let nodeMap = new Map<string, Node>();
    let raf = 0;

    // Camera state
    let cx = 0, cy = 0;       // pan offset (world units · 0,0 = center)
    let zoom = 1;
    let dragStart: { x: number; y: number; cx: number; cy: number } | null = null;
    let hoverNode: Node | null = null;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;

    function resize() {
      W = canvas!.clientWidth;
      H = canvas!.clientHeight;
      canvas!.width = Math.floor(W * dpr);
      canvas!.height = Math.floor(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // Initial deterministic radial layout
    function seedLayout(idx: Index) {
      const ns: Node[] = idx.nodes.map((n) => {
        const a = categoryAngle(n.c, n.r) +
          ((hash32(n.r) % 1000) / 1000 - 0.5) * 0.45;
        // Higher-weight nodes start closer to center
        const r = 80 + (40 - Math.min(n.w, 40)) * 5 + (hash32(n.r) % 60);
        return {
          ...n,
          x: Math.cos(a) * r,
          y: Math.sin(a) * r,
          vx: 0, vy: 0,
        };
      });
      return ns;
    }

    // Lightweight force relaxation · O(N²) but N=319 so manageable
    function relax(rounds: number) {
      const REPULSION = 380;
      const SPRING = 0.012;
      const SPRING_LEN = 38;
      const CENTER_PULL = 0.0008;
      const DAMP = 0.78;
      for (let r = 0; r < rounds; r++) {
        // Repulsion between all nodes
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const d2 = dx * dx + dy * dy + 0.01;
            const f = REPULSION / d2;
            const d = Math.sqrt(d2);
            const fx = (dx / d) * f;
            const fy = (dy / d) * f;
            a.vx -= fx; a.vy -= fy;
            b.vx += fx; b.vy += fy;
          }
        }
        // Spring along edges
        for (const e of edges) {
          const a = nodeMap.get(e.from);
          const b = nodeMap.get(e.to);
          if (!a || !b) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
          const f = (d - SPRING_LEN) * SPRING;
          const fx = (dx / d) * f;
          const fy = (dy / d) * f;
          a.vx += fx; a.vy += fy;
          b.vx -= fx; b.vy -= fy;
        }
        // Centering force + integrate
        for (const n of nodes) {
          n.vx += -n.x * CENTER_PULL;
          n.vy += -n.y * CENTER_PULL;
          n.vx *= DAMP;
          n.vy *= DAMP;
          n.x += n.vx;
          n.y += n.vy;
        }
      }
    }

    function project(p: { x: number; y: number }) {
      return {
        x: W * 0.5 + (p.x + cx) * zoom,
        y: H * 0.5 + (p.y + cy) * zoom,
      };
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // Edges first (behind nodes)
      ctx!.lineWidth = 0.5;
      ctx!.strokeStyle = "rgba(34, 240, 213, 0.05)";
      ctx!.beginPath();
      for (const e of edges) {
        const a = nodeMap.get(e.from);
        const b = nodeMap.get(e.to);
        if (!a || !b) continue;
        const pa = project(a);
        const pb = project(b);
        // Cull edges fully off-screen
        if ((pa.x < -20 && pb.x < -20) || (pa.x > W + 20 && pb.x > W + 20)) continue;
        if ((pa.y < -20 && pb.y < -20) || (pa.y > H + 20 && pb.y > H + 20)) continue;
        ctx!.moveTo(pa.x, pa.y);
        ctx!.lineTo(pb.x, pb.y);
      }
      ctx!.stroke();

      // Highlight edges adjacent to hover
      if (hoverNode) {
        ctx!.lineWidth = 1;
        ctx!.strokeStyle = "rgba(34, 240, 213, 0.45)";
        ctx!.beginPath();
        for (const e of edges) {
          if (e.from !== hoverNode.r && e.to !== hoverNode.r) continue;
          const a = nodeMap.get(e.from);
          const b = nodeMap.get(e.to);
          if (!a || !b) continue;
          const pa = project(a);
          const pb = project(b);
          ctx!.moveTo(pa.x, pa.y);
          ctx!.lineTo(pb.x, pb.y);
        }
        ctx!.stroke();
      }

      // Nodes
      for (const n of nodes) {
        const p = project(n);
        if (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) continue;
        const size = Math.max(1.4, Math.sqrt(n.w + 2) * 1.6 * Math.min(zoom, 2));
        const isHover = hoverNode === n;
        ctx!.fillStyle = isHover ? "#22F0D5" : "rgba(34, 240, 213, 0.7)";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx!.fill();
        if (isHover) {
          ctx!.strokeStyle = "rgba(34, 240, 213, 0.5)";
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, size + 6, 0, Math.PI * 2);
          ctx!.stroke();
        }
      }
    }

    function loop() {
      draw();
      raf = requestAnimationFrame(loop);
    }

    // ────────────────────────────────────────────────────────────
    // Interaction
    // ────────────────────────────────────────────────────────────
    function screenToWorld(sx: number, sy: number) {
      return {
        x: (sx - W * 0.5) / zoom - cx,
        y: (sy - H * 0.5) / zoom - cy,
      };
    }

    function findNodeAt(sx: number, sy: number): Node | null {
      const w = screenToWorld(sx, sy);
      let best: Node | null = null;
      let bestD = Infinity;
      const threshold = 12 / zoom;
      for (const n of nodes) {
        const dx = n.x - w.x;
        const dy = n.y - w.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < threshold && d < bestD) {
          bestD = d;
          best = n;
        }
      }
      return best;
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      if (dragStart) {
        const dx = (sx - dragStart.x) / zoom;
        const dy = (sy - dragStart.y) / zoom;
        cx = dragStart.cx + dx;
        cy = dragStart.cy + dy;
        return;
      }
      const n = findNodeAt(sx, sy);
      hoverNode = n;
      if (n) {
        setHover({ x: e.clientX, y: e.clientY, node: n });
        canvas!.style.cursor = "pointer";
      } else {
        setHover(null);
        canvas!.style.cursor = "grab";
      }
    }

    function onMouseDown(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      dragStart = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        cx, cy,
      };
      canvas!.style.cursor = "grabbing";
    }

    function onMouseUp(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const moved = dragStart && Math.hypot(sx - dragStart.x, sy - dragStart.y) > 3;
      dragStart = null;
      canvas!.style.cursor = hoverNode ? "pointer" : "grab";
      if (!moved) {
        const n = findNodeAt(sx, sy);
        if (n) window.location.href = n.r;
      }
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.001);
      zoom = Math.max(0.2, Math.min(4, zoom * factor));
    }

    function onMouseLeave() {
      hoverNode = null;
      setHover(null);
      dragStart = null;
      canvas!.style.cursor = "default";
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.style.cursor = "grab";

    // ────────────────────────────────────────────────────────────
    // Boot
    // ────────────────────────────────────────────────────────────
    (async () => {
      const res = await fetch("/graph-index.json");
      const idx = (await res.json()) as Index;
      nodes = seedLayout(idx);
      edges = idx.edges;
      nodeMap = new Map(nodes.map((n) => [n.r, n]));
      // Relax in bursts so the page isn't blocked
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const totalRounds = reduced ? 0 : 120;
      const batchSize = 12;
      for (let i = 0; i < totalRounds; i += batchSize) {
        relax(batchSize);
        await new Promise((r) => setTimeout(r, 0));
      }
      setStats({ nodes: nodes.length, edges: edges.length });
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Stats overlay */}
      {stats ? (
        <div className="pointer-events-none absolute left-4 top-4 select-none border border-[#1F242B] bg-[#0B0C0F]/90 p-3 backdrop-blur-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            constellation · live
          </p>
          <p className="mt-1 font-mono text-[11px] tabular-nums text-[#9CA3AF]">
            {stats.nodes} routes · {stats.edges} edges
          </p>
        </div>
      ) : (
        <div className="pointer-events-none absolute left-4 top-4 select-none">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">
            relaxing graph…
          </p>
        </div>
      )}

      {/* Controls overlay */}
      <div className="pointer-events-none absolute bottom-4 left-4 select-none">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
          drag · pan · wheel · zoom · click · navigate
        </p>
      </div>

      {/* Hover tooltip */}
      {hover ? (
        <div
          className="pointer-events-none fixed z-50 border border-[#22F0D5] bg-[#0B0C0F]/95 px-3 py-2 backdrop-blur-sm"
          style={{
            left: Math.min(hover.x + 16, window.innerWidth - 280),
            top: Math.min(hover.y + 16, window.innerHeight - 100),
          }}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#7a818a]">
            atomeons.com{hover.node.r}
          </p>
          <p
            className="mt-1 max-w-[260px] font-serif text-[14px] leading-[1.35] text-[#F4F4F2]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            {hover.node.t}
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#22F0D5]">
            {hover.node.c} · weight {hover.node.w}
          </p>
        </div>
      ) : null}
    </div>
  );
}
