"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * AuroraHero — neural-network constellation entry surface.
 *
 * What an LLM looks like from inside, rendered live in a canvas: 140
 * drifting nodes, proximity-graph edges, random firing events that
 * propagate to neighbours, mouse cursor as a gentle force field.
 * Headline lands word-by-word with a variable font-weight shimmer
 * (Inter Variable axis already loaded site-wide).
 *
 * The lab's answer to "intro animation is super lame" — this is a
 * thinking machine, drawn live, on the screen of someone who has
 * used ChatGPT under ten times. Premium without being noisy.
 * Reduced-motion users get a still constellation snapshot.
 *
 * Two canvas layers run inside this section:
 *   1. soft drifting colour blobs (back)
 *   2. node graph + edges + firing waves (front)
 * Plus a SVG/CSS scan-line + corner marks above.
 */

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseAlpha: number;
  pulse: number; // 0..1, decays over time
  hue: "cyan" | "peach" | "mint";
};

type FireEvent = {
  fromIndex: number;
  t: number; // frames since fire
  visitedFrame: Set<number>;
};

const NODE_COUNT = 140;
const EDGE_DIST = 110;
const CURSOR_RADIUS = 220;
const FIRE_INTERVAL_FRAMES = 70; // ~1.1s @ 60fps
const FIRE_LIFESPAN = 80;

const HUE_RGB: Record<Node["hue"], string> = {
  cyan: "34, 240, 213",
  peach: "255, 184, 122",
  mint: "117, 255, 196",
};

function rng(seed: number) {
  // tiny seeded RNG so the initial constellation looks intentional
  let x = seed;
  return () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
}

export function AuroraHero() {
  const constellationRef = useRef<HTMLCanvasElement | null>(null);
  const blobsRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const cursorRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    const constellation = constellationRef.current;
    const blobs = blobsRef.current;
    if (!constellation || !blobs) return;

    const cctx = constellation.getContext("2d");
    const bctx = blobs.getContext("2d");
    if (!cctx || !bctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = constellation.clientWidth;
    let h = constellation.clientHeight;

    const setSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = constellation.clientWidth;
      h = constellation.clientHeight;
      [constellation, blobs].forEach((c) => {
        c.width = Math.floor(w * dpr);
        c.height = Math.floor(h * dpr);
      });
      cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener("resize", setSize);

    // node init with seeded organic distribution
    const r = rng(1729);
    const nodes: Node[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      // bias slightly toward edges so the center reads as the headline
      const edgeBias = r() > 0.6 ? 0.85 : 0.5;
      const cx = 0.5 + (r() - 0.5) * edgeBias * 1.8;
      const cy = 0.5 + (r() - 0.5) * edgeBias * 1.8;
      const hueRoll = r();
      const hue: Node["hue"] =
        hueRoll < 0.78 ? "cyan" : hueRoll < 0.94 ? "peach" : "mint";
      nodes.push({
        x: Math.max(0.02, Math.min(0.98, cx)),
        y: Math.max(0.02, Math.min(0.98, cy)),
        vx: (r() - 0.5) * 0.00012,
        vy: (r() - 0.5) * 0.00012,
        r: 0.9 + r() * 1.8,
        baseAlpha: 0.35 + r() * 0.55,
        pulse: 0,
        hue,
      });
    }

    // adjacency cache — recomputed every 6 frames to stay performant
    let adjacency: number[][] = nodes.map(() => []);
    const recomputeAdjacency = () => {
      adjacency = nodes.map(() => []);
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          const dx = (ni.x - nj.x) * w;
          const dy = (ni.y - nj.y) * h;
          const d2 = dx * dx + dy * dy;
          if (d2 < EDGE_DIST * EDGE_DIST) {
            adjacency[i].push(j);
            adjacency[j].push(i);
          }
        }
      }
    };
    recomputeAdjacency();

    const fires: FireEvent[] = [];
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      const rect = constellation.getBoundingClientRect();
      cursorRef.current.x = e.clientX - rect.left;
      cursorRef.current.y = e.clientY - rect.top;
      cursorRef.current.active = true;
    };
    const onLeave = () => {
      cursorRef.current.active = false;
    };
    constellation.addEventListener("mousemove", onMove);
    constellation.addEventListener("mouseleave", onLeave);

    const drawBlobs = (t: number) => {
      bctx.clearRect(0, 0, w, h);
      const baseGrad = bctx.createLinearGradient(0, 0, w, h);
      baseGrad.addColorStop(0, "#0a1a17");
      baseGrad.addColorStop(0.5, "#0e2a25");
      baseGrad.addColorStop(1, "#102622");
      bctx.fillStyle = baseGrad;
      bctx.fillRect(0, 0, w, h);

      // 4 slow drifting blobs — same family as the body bg
      const blobsList = [
        {
          x: 0.18 + Math.sin(t * 0.00018) * 0.05,
          y: 0.3 + Math.cos(t * 0.00015) * 0.04,
          r: 0.55,
          c: "rgba(34, 240, 213, 0.38)",
        },
        {
          x: 0.78 + Math.cos(t * 0.0002) * 0.05,
          y: 0.62 + Math.sin(t * 0.00016) * 0.04,
          r: 0.6,
          c: "rgba(255, 184, 122, 0.28)",
        },
        {
          x: 0.45 + Math.sin(t * 0.00022) * 0.06,
          y: 0.18 + Math.cos(t * 0.00018) * 0.04,
          r: 0.45,
          c: "rgba(122, 156, 255, 0.18)",
        },
        {
          x: 0.85 + Math.cos(t * 0.0001) * 0.04,
          y: 0.85 + Math.sin(t * 0.00014) * 0.04,
          r: 0.42,
          c: "rgba(117, 255, 196, 0.18)",
        },
      ];
      for (const b of blobsList) {
        const cx = b.x * w;
        const cy = b.y * h;
        const rr = b.r * Math.min(w, h);
        const g = bctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        g.addColorStop(0, b.c);
        g.addColorStop(1, "rgba(0,0,0,0)");
        bctx.fillStyle = g;
        bctx.fillRect(0, 0, w, h);
      }
    };

    const drawConstellation = () => {
      cctx.clearRect(0, 0, w, h);

      // movement + cursor force
      const c = cursorRef.current;
      if (!reduced) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          // bounce gently
          if (n.x < 0.02 || n.x > 0.98) n.vx *= -1;
          if (n.y < 0.02 || n.y > 0.98) n.vy *= -1;

          // cursor force field — gentle pull
          if (c.active) {
            const px = n.x * w;
            const py = n.y * h;
            const dx = c.x - px;
            const dy = c.y - py;
            const d2 = dx * dx + dy * dy;
            if (d2 < CURSOR_RADIUS * CURSOR_RADIUS && d2 > 1) {
              const f = (1 - Math.sqrt(d2) / CURSOR_RADIUS) * 0.0008;
              n.x += (dx / w) * f;
              n.y += (dy / h) * f;
              // proximity to cursor also bumps the pulse subtly
              n.pulse = Math.max(n.pulse, 0.25);
            }
          }

          // pulse decay
          if (n.pulse > 0) n.pulse = Math.max(0, n.pulse - 0.012);
        }
      }

      // recompute adjacency every 6 frames
      if (frame % 6 === 0) recomputeAdjacency();

      // edges
      cctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        const ix = ni.x * w;
        const iy = ni.y * h;
        for (const j of adjacency[i]) {
          if (j <= i) continue;
          const nj = nodes[j];
          const jx = nj.x * w;
          const jy = nj.y * h;
          const dx = ix - jx;
          const dy = iy - jy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = 1 - dist / EDGE_DIST;
          if (t <= 0) continue;
          const pulseBoost = Math.max(ni.pulse, nj.pulse);
          const alpha = 0.06 * t + pulseBoost * 0.18 * t;
          cctx.strokeStyle = `rgba(34, 240, 213, ${alpha.toFixed(3)})`;
          cctx.beginPath();
          cctx.moveTo(ix, iy);
          cctx.lineTo(jx, jy);
          cctx.stroke();
        }
      }

      // fires
      if (!reduced && frame % FIRE_INTERVAL_FRAMES === 0) {
        // spawn a fire on a random node
        const idx = Math.floor(Math.random() * nodes.length);
        fires.push({
          fromIndex: idx,
          t: 0,
          visitedFrame: new Set([idx]),
        });
        nodes[idx].pulse = 1;
      }
      for (let k = fires.length - 1; k >= 0; k--) {
        const f = fires[k];
        f.t += 1;
        // every 4 frames the fire spreads to neighbours
        if (f.t % 4 === 0) {
          const wave = Array.from(f.visitedFrame);
          for (const idx of wave) {
            for (const next of adjacency[idx]) {
              if (!f.visitedFrame.has(next)) {
                f.visitedFrame.add(next);
                nodes[next].pulse = Math.max(
                  nodes[next].pulse,
                  Math.max(0, 1 - f.t / FIRE_LIFESPAN)
                );
              }
            }
          }
        }
        if (f.t > FIRE_LIFESPAN) fires.splice(k, 1);
      }

      // nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const cx = n.x * w;
        const cy = n.y * h;
        const rad = n.r + n.pulse * 4;
        const rgb = HUE_RGB[n.hue];
        // halo
        if (n.pulse > 0.05) {
          const halo = cctx.createRadialGradient(cx, cy, 0, cx, cy, rad * 4);
          halo.addColorStop(0, `rgba(${rgb}, ${(n.pulse * 0.5).toFixed(3)})`);
          halo.addColorStop(1, "rgba(0,0,0,0)");
          cctx.fillStyle = halo;
          cctx.beginPath();
          cctx.arc(cx, cy, rad * 4, 0, Math.PI * 2);
          cctx.fill();
        }
        // core dot
        const alpha = Math.min(1, n.baseAlpha + n.pulse * 0.6);
        cctx.fillStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
        cctx.beginPath();
        cctx.arc(cx, cy, rad, 0, Math.PI * 2);
        cctx.fill();
      }
    };

    const tick = (timestamp: number) => {
      frame++;
      drawBlobs(timestamp);
      drawConstellation();
      if (!reduced) rafRef.current = window.requestAnimationFrame(tick);
    };
    if (reduced) {
      // single static frame
      drawBlobs(0);
      drawConstellation();
    } else {
      rafRef.current = window.requestAnimationFrame(tick);
    }

    // staggered headline fade-in
    const bootTimer = window.setTimeout(() => setBootDone(true), 60);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", setSize);
      constellation.removeEventListener("mousemove", onMove);
      constellation.removeEventListener("mouseleave", onLeave);
      window.clearTimeout(bootTimer);
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      {/* layer 1 — drifting blobs (back) */}
      <canvas
        ref={blobsRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
      {/* layer 2 — neural constellation (front) */}
      <canvas
        ref={constellationRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
      {/* scan lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* corner marks */}
      <div className="pointer-events-none absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]/70 md:left-10 md:top-10">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#22F0D5] align-middle" />
        <span className="ml-2 align-middle">ÆoNs · start here</span>
      </div>
      <div className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]/80 md:right-10 md:top-10">
        11 min · novice-grade
      </div>

      <div className="relative mx-auto flex min-h-[92vh] w-full max-w-5xl flex-col items-start justify-center px-6 py-32 md:py-40">
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5] transition-all duration-700 ${
            bootDone ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          style={{ transitionDelay: "120ms" }}
        >
          ai · the actual on-ramp
        </p>

        <h1 className="relative mt-5 max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight text-[#F2F4F5] md:text-6xl lg:text-7xl">
          <span
            className={`block transition-all duration-700 ${
              bootDone ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "220ms", fontVariationSettings: '"wght" 520' }}
          >
            AI is changing your life
          </span>
          <span
            className={`mt-1 block bg-gradient-to-r from-[#22F0D5] via-[#7DDBC8] to-[#FFB87A] bg-clip-text text-transparent transition-all duration-700 ${
              bootDone ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "440ms", fontVariationSettings: '"wght" 720' }}
          >
            right now.
          </span>
          <span
            className={`mt-1 block transition-all duration-700 ${
              bootDone ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "660ms", fontVariationSettings: '"wght" 460' }}
          >
            Here&apos;s what it actually is.
          </span>
        </h1>

        <p
          className={`mt-7 max-w-2xl text-lg leading-[1.6] text-[#C8CCCE] transition-all duration-700 md:text-xl ${
            bootDone ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          style={{ transitionDelay: "880ms" }}
        >
          No jargon. No hype. Eleven minutes from confused to confident,
          written for someone who has used ChatGPT under ten times.
        </p>

        <div
          className={`mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 ${
            bootDone ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          style={{ transitionDelay: "1040ms" }}
        >
          <Link
            href="#what-is-it"
            className="group inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-6 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] shadow-[0_0_40px_rgba(34,240,213,0.35)] transition-all hover:bg-[#F2F4F5] hover:shadow-[0_0_60px_rgba(34,240,213,0.5)]"
          >
            start reading
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </Link>
          <Link
            href="#glossary"
            className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9BA5A7] transition-colors hover:text-[#FFB87A]"
          >
            skip to glossary →
          </Link>
        </div>

        <div className="mt-16 grid w-full gap-4 md:grid-cols-4">
          {[
            { k: "what is it", v: "3 min" },
            { k: "this week", v: "4 min" },
            { k: "what it can't", v: "2 min" },
            { k: "how to start", v: "2 min" },
          ].map((row, idx) => (
            <div
              key={row.k}
              className={`rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm transition-all duration-700 ${
                bootDone ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: `${1200 + idx * 90}ms` }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#22F0D5]">
                {row.k}
              </p>
              <p className="mt-1 font-mono text-sm text-[#C8CCCE]">{row.v}</p>
            </div>
          ))}
        </div>

        {/* live caption tying animation to copy */}
        <p
          className={`mt-12 font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B7779] transition-opacity duration-1000 ${
            bootDone ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1700ms" }}
        >
          ↑ the constellation behind this text is roughly what a language
          model looks like from inside. it fires. it connects. it drifts.
          that&apos;s the thing this page is about to explain.
        </p>
      </div>
    </section>
  );
}
