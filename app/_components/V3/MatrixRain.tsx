"use client";

/**
 * MatrixRain · canvas-based falling-character cascade.
 *
 * Wave 45 · 2026-06-06 · operator: "crazy glitch like hacker look on
 * cysec tab" + "warez for a hackathon."
 *
 * Activates ONLY when html.theme-warez OR html.cysec-active is set.
 * Otherwise dormant · zero CPU. Honors prefers-reduced-motion + tier-lite
 * by not mounting the render loop at all.
 *
 * GPU-cheap design:
 *   - Single canvas · fixed inset 0 · z-index behind content
 *   - 30 FPS cap (not 60) · minimal CPU
 *   - Columns of ~22px width · one char per column per tick
 *   - Trailing fade via fillRect with alpha · the classic technique
 *   - Halts when tab is hidden (Page Visibility API)
 *   - Uses katakana + numerics + symbols · canonical Matrix charset
 */

import { useEffect, useRef } from "react";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*()_+-=[]{}|;:,.<>?/\\!~`^";

interface Column {
  y: number;
  speed: number;
  jitter: number;
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const colsRef = useRef<Column[]>([]);
  const activeRef = useRef(false);
  const lastTickRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Honor reduced motion · don't mount the loop at all
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const html = document.documentElement;
    const FONT_SIZE = 16;
    const COL_WIDTH = 20;

    function isActive() {
      return (
        html.classList.contains("theme-warez") ||
        html.classList.contains("cysec-active")
      );
    }

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(window.innerWidth / COL_WIDTH);
      colsRef.current = Array.from({ length: cols }, () => ({
        y: Math.random() * window.innerHeight,
        speed: 0.5 + Math.random() * 1.2,
        jitter: Math.random() * 100,
      }));
    }

    function tick(now: number) {
      if (!activeRef.current) {
        rafRef.current = null;
        return;
      }
      // Throttle to ~30 FPS
      if (now - lastTickRef.current < 33) {
        rafRef.current = window.requestAnimationFrame(tick);
        return;
      }
      lastTickRef.current = now;

      const c = ctx;
      if (!c || !canvas) return;
      const W = window.innerWidth;
      const H = window.innerHeight;

      // Fade trail · the Matrix signature
      c.fillStyle = "rgba(0, 0, 0, 0.08)";
      c.fillRect(0, 0, W, H);

      c.font = `${FONT_SIZE}px "JetBrains Mono", "IBM Plex Mono", monospace`;
      c.textBaseline = "top";

      const cols = colsRef.current;
      const onCysec = html.classList.contains("cysec-active");
      const fg = onCysec ? "#22F0D5" : "#00FF7F";

      for (let i = 0; i < cols.length; i++) {
        const col = cols[i];
        const x = i * COL_WIDTH;
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];

        // Head character · brightest
        c.fillStyle = "#FFFFFF";
        c.fillText(ch, x, col.y);

        // Trailing characters · color and dimmer
        c.fillStyle = fg;
        for (let t = 1; t < 8; t++) {
          const ty = col.y - t * FONT_SIZE * 1.2;
          if (ty < -FONT_SIZE) continue;
          const tch = CHARS[Math.floor(Math.random() * CHARS.length)];
          c.globalAlpha = Math.max(0.04, 0.8 - t * 0.1);
          c.fillText(tch, x, ty);
        }
        c.globalAlpha = 1;

        col.y += col.speed * FONT_SIZE * 0.95;

        // Reset column when it falls off
        if (col.y > H + FONT_SIZE * 8 && Math.random() > 0.975) {
          col.y = -FONT_SIZE * 8;
          col.speed = 0.5 + Math.random() * 1.2;
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    }

    function start() {
      if (activeRef.current) return;
      activeRef.current = true;
      lastTickRef.current = 0;
      rafRef.current = window.requestAnimationFrame(tick);
    }
    function stop() {
      activeRef.current = false;
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      // Clear canvas
      const c = ctx;
      if (c && canvas) {
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    }

    function update() {
      if (isActive() && !document.hidden) start();
      else stop();
    }

    // Initial setup
    resize();
    update();

    // Listen for class changes on html (theme/cysec toggles)
    const observer = new MutationObserver(update);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", update);
      stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-component="matrix-rain"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.55,
        mixBlendMode: "screen",
      }}
    />
  );
}
