"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * AuroraHero — the lighter, warmer entry surface.
 *
 * Animated aurora gradient running in the background via a single canvas
 * + a CSS conic gradient overlay. No videos, no GIFs, no third-party libs.
 * Honors prefers-reduced-motion.
 *
 * Palette intent: deep slate base (#0B1014) lifted by drifting cyan and
 * peach blooms — the operator asked for "less black, more middle-ground
 * color motion." This is the calibrated answer: lab feel preserved,
 * austerity softened, motion present without being noisy.
 */
export function AuroraHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    const setSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const blobs = [
      { x: 0.25, y: 0.35, r: 0.55, c: "rgba(34, 240, 213, 0.42)", vx: 0.00018, vy: 0.00011 },
      { x: 0.7, y: 0.55, r: 0.6, c: "rgba(255, 184, 122, 0.32)", vx: -0.00014, vy: -0.00009 },
      { x: 0.5, y: 0.2, r: 0.5, c: "rgba(122, 156, 255, 0.22)", vx: 0.00011, vy: 0.0001 },
      { x: 0.85, y: 0.8, r: 0.45, c: "rgba(34, 240, 213, 0.22)", vx: -0.00012, vy: -0.00008 },
    ];

    let t = 0;
    const tick = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      // base wash
      const baseGrad = ctx.createLinearGradient(0, 0, 0, h);
      baseGrad.addColorStop(0, "#0B1014");
      baseGrad.addColorStop(1, "#0F151A");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, w, h);

      // blobs
      for (const b of blobs) {
        if (!reduced) {
          b.x += b.vx;
          b.y += b.vy;
          if (b.x < 0.1 || b.x > 0.9) b.vx *= -1;
          if (b.y < 0.1 || b.y > 0.9) b.vy *= -1;
        }
        const cx = b.x * w;
        const cy = b.y * h;
        const rr = b.r * Math.min(w, h);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        grad.addColorStop(0, b.c);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // grain — soft, very low alpha
      ctx.globalAlpha = 0.04;
      for (let i = 0; i < 240; i++) {
        ctx.fillStyle = i % 3 === 0 ? "#22F0D5" : "#FFB87A";
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
      }
      ctx.globalAlpha = 1;

      rafRef.current = window.requestAnimationFrame(tick);
    };
    tick();

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
      {/* subtle scanline overlay for lab feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* corner mark */}
      <div className="pointer-events-none absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]/70 md:left-10 md:top-10">
        ÆoNs · start here
      </div>
      <div className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]/70 md:right-10 md:top-10">
        11 min · novice-grade
      </div>

      <div className="relative mx-auto flex min-h-[88vh] w-full max-w-5xl flex-col items-start justify-center px-6 py-32 md:py-40">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ai · the actual on-ramp
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-[#F2F4F5] md:text-6xl lg:text-7xl">
          AI is changing your life
          <br />
          <span className="bg-gradient-to-r from-[#22F0D5] via-[#7DDBC8] to-[#FFB87A] bg-clip-text text-transparent">
            right now.
          </span>
          <br />
          Here&apos;s what it actually is.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-[1.6] text-[#C8CCCE] md:text-xl">
          No jargon. No hype. Eleven minutes from confused to confident,
          written for someone who has used ChatGPT under ten times.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="#what-is-it"
            className="group inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-6 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] transition-all hover:bg-[#F2F4F5]"
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
          ].map((row) => (
            <div
              key={row.k}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#22F0D5]">
                {row.k}
              </p>
              <p className="mt-1 font-mono text-sm text-[#C8CCCE]">{row.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
