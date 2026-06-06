"use client";

import { useEffect, useRef } from "react";

/**
 * LivingCursor — site-wide custom cursor.
 *
 * A small cyan ring follows the mouse, with a 5-dot phyllotaxis trail
 * that fades behind it. No external libs · pure Canvas2D · ~3 KB.
 *
 * Behavior:
 *   - Hidden on touch devices · falls back to native cursor
 *   - Hidden when prefers-reduced-motion → uses native cursor
 *   - Hidden over text inputs · uses native I-beam there
 *   - Grows + brightens over interactive elements (link / button)
 *   - Pulses cyan on click
 *
 * Z-index: fixed, very high (110), pointer-events: none always.
 * The underlying CSS cursor is hidden on the body via globals.css so
 * this custom cursor is the only one visible.
 */

const TRAIL_LEN = 6;

export function LivingCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Bail out: touch, reduced motion
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth, H = window.innerHeight;
    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas!.width = Math.floor(W * dpr);
      canvas!.height = Math.floor(H * dpr);
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Target (instant mouse position) + smoothed positions in a trail
    let targetX = -100, targetY = -100;
    let visible = false;
    let hovering = false;
    let clicked = 0;          // 0 → 1 on click, decays to 0
    const trail: Array<{ x: number; y: number }> = new Array(TRAIL_LEN)
      .fill(null)
      .map(() => ({ x: -100, y: -100 }));

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      visible = true;

      // Detect if hovering over an interactive element
      const el = e.target as HTMLElement | null;
      hovering = !!el?.closest('a, button, [role="button"], input, textarea');
    }
    function onLeave() { visible = false; }
    function onDown() { clicked = 1; }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);

    let raf = 0;
    let lastTs = performance.now();

    function frame(ts: number) {
      const dt = ts - lastTs;
      if (dt < 16) {
        raf = requestAnimationFrame(frame);
        return;
      }
      lastTs = ts;
      ctx!.clearRect(0, 0, W, H);

      // Smooth the head position toward target
      trail[0].x += (targetX - trail[0].x) * 0.32;
      trail[0].y += (targetY - trail[0].y) * 0.32;
      // Each trail dot lags behind the previous
      for (let i = 1; i < TRAIL_LEN; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.28;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.28;
      }

      if (!visible) {
        raf = requestAnimationFrame(frame);
        return;
      }

      clicked *= 0.9;
      if (clicked < 0.01) clicked = 0;

      // Trail dots · back-to-front
      for (let i = TRAIL_LEN - 1; i >= 1; i--) {
        const t = 1 - i / TRAIL_LEN;
        const size = 1 + t * 2;
        const alpha = 0.08 + t * 0.22;
        ctx!.fillStyle = `rgba(34, 240, 213, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(trail[i].x, trail[i].y, size, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Head ring
      const ringR = hovering ? 14 : 7;
      const ringW = hovering ? 1.5 : 1;
      ctx!.strokeStyle = `rgba(34, 240, 213, ${hovering ? 0.85 : 0.65})`;
      ctx!.lineWidth = ringW;
      ctx!.beginPath();
      ctx!.arc(trail[0].x, trail[0].y, ringR, 0, Math.PI * 2);
      ctx!.stroke();

      // Center dot
      ctx!.fillStyle = `rgba(34, 240, 213, ${hovering ? 0.95 : 0.7})`;
      ctx!.beginPath();
      ctx!.arc(trail[0].x, trail[0].y, hovering ? 2.5 : 1.6, 0, Math.PI * 2);
      ctx!.fill();

      // Click pulse · expanding cyan ring
      if (clicked > 0) {
        const pulseR = ringR + (1 - clicked) * 24;
        ctx!.strokeStyle = `rgba(34, 240, 213, ${clicked * 0.6})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(trail[0].x, trail[0].y, pulseR, 0, Math.PI * 2);
        ctx!.stroke();
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    // Hide native cursor
    document.documentElement.classList.add("custom-cursor");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-component="living-cursor"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 110,
        pointerEvents: "none",
        // mix-blend-mode lifts the cursor visually over any background
        mixBlendMode: "screen",
      }}
    />
  );
}
