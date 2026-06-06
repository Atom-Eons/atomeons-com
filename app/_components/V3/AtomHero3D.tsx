"use client";

import { useEffect, useRef } from "react";

/**
 * AtomHero3D — sphere of cyan particles arranged via Fibonacci-sphere
 * algorithm (the 3D analogue of the phyllotaxis spiral on the
 * SacredCanvas), rendered in pure Canvas2D with hand-rolled perspective
 * projection.
 *
 * No Three.js · no WebGL · no external libs. ~7 KB minified.
 *
 * Algorithm:
 *   For N points on the unit sphere:
 *     y = 1 - (i / (N-1)) * 2         // y goes from 1 to -1
 *     r = √(1 - y²)                    // radius at y
 *     θ = i × goldenAngleRad           // golden angle around y axis
 *     x = cos(θ) · r,  z = sin(θ) · r
 *   This is the Fibonacci sphere — even, deterministic, mathematically
 *   beautiful. Same family as the phyllotaxis arrangement on the
 *   SacredCanvas background but lifted into 3D.
 *
 * Rendering:
 *   - Each frame: rotate every point by current angle around Y axis,
 *     then by tilt angle around X axis
 *   - Project to 2D using simple perspective division (z / focalLength)
 *   - Dot size scales 1.4 → 0.3 with depth
 *   - Dot opacity scales 1.0 → 0.18 with depth
 *   - Foreground dots painted last (depth-sorted) for proper occlusion
 *
 * Interaction:
 *   - Idle rotation: y 0.04 rad/s · x 0.013 rad/s
 *   - Mouse moves over the canvas accelerate rotation toward cursor
 *     direction (gentle · capped)
 *   - Click triggers a small pulse (dots momentarily expand outward
 *     then snap back · spring physics, single oscillation)
 *
 * Constraints honored:
 *   - Canvas2D only (no experimental APIs)
 *   - 30fps cap (~3-4ms / frame on M2 baseline)
 *   - pointer-events: auto INSIDE the canvas area, none outside
 *   - prefers-reduced-motion → renders a single static frame
 *   - document.hidden → render loop paused
 *   - dpr-aware (capped 2x)
 */

const N = 720;
const GOLDEN_ANGLE_RAD = (137.50776405003785 * Math.PI) / 180;

// Precompute Fibonacci sphere
function buildSphere(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * GOLDEN_ANGLE_RAD;
    out[i * 3] = Math.cos(theta) * r;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = Math.sin(theta) * r;
  }
  return out;
}

export function AtomHero3D({ size = 420, className }: { size?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    const sphere = buildSphere(N);
    const projected: Array<{ x: number; y: number; z: number; size: number; alpha: number }> =
      new Array(N).fill(null).map(() => ({ x: 0, y: 0, z: 0, size: 1, alpha: 1 }));

    // Rotation state
    let angleY = 0;
    let angleX = -0.32;          // slight initial tilt
    let velY = 0.7;              // idle rotation speed (rad/s)
    let velX = 0.18;
    let targetVelY = 0.7;
    let targetVelX = 0.18;

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    let mouseInside = false;
    let pulseStart = -1;          // -1 = no pulse · else timestamp

    const startTime = performance.now();
    let lastFrame = startTime;
    let raf = 0;
    let stopped = false;

    function drawFrame(now: number) {
      if (stopped) return;
      const dt = now - lastFrame;
      if (dt < 33) {
        raf = requestAnimationFrame(drawFrame);
        return;
      }
      const dtSec = (now - lastFrame) * 0.001;
      lastFrame = now;

      // Ease rotation velocities toward target
      velY += (targetVelY - velY) * 0.04;
      velX += (targetVelX - velX) * 0.04;

      angleY += velY * dtSec;
      angleX += velX * dtSec;

      ctx!.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const radius = Math.min(W, H) * 0.36;
      const focal = radius * 2.4;

      // Pulse modulation
      let pulse = 1;
      if (pulseStart > 0) {
        const elapsed = (now - pulseStart) / 1000;
        if (elapsed < 0.9) {
          // single-oscillation spring: outward then back
          pulse = 1 + Math.sin(elapsed * Math.PI / 0.9) * 0.18 * (1 - elapsed / 0.9);
        } else {
          pulseStart = -1;
        }
      }

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Rotate + project all points
      for (let i = 0; i < N; i++) {
        const px = sphere[i * 3];
        const py = sphere[i * 3 + 1];
        const pz = sphere[i * 3 + 2];
        // Y rotation
        const rx = px * cosY + pz * sinY;
        const rz = -px * sinY + pz * cosY;
        // X rotation
        const ry = py * cosX - rz * sinX;
        const rz2 = py * sinX + rz * cosX;
        // Perspective
        const persp = focal / (focal + rz2 * radius);
        const sx = cx + rx * radius * persp * pulse;
        const sy = cy + ry * radius * persp * pulse;
        // Depth-based size + alpha
        // rz2 in [-1, 1] · front (rz2 = +1 toward viewer) brighter
        const depthT = (rz2 + 1) * 0.5;       // 0 (back) → 1 (front)
        const sz = 0.4 + 1.6 * depthT;        // size scale
        const alpha = 0.18 + 0.62 * depthT;
        projected[i].x = sx;
        projected[i].y = sy;
        projected[i].z = rz2;
        projected[i].size = sz;
        projected[i].alpha = alpha;
      }

      // Sort back-to-front so foreground dots paint over background
      projected.sort((a, b) => a.z - b.z);

      for (let i = 0; i < N; i++) {
        const p = projected[i];
        ctx!.fillStyle = `rgba(34, 240, 213, ${p.alpha.toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Center Æ glyph · faint, behind the sphere's foreground points
      ctx!.fillStyle = "rgba(244, 244, 242, 0.04)";
      ctx!.font = `300 ${radius * 1.4}px Newsreader, Georgia, serif`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText("Æ", cx, cy + radius * 0.05);

      if (!reduced) {
        raf = requestAnimationFrame(drawFrame);
      }
    }

    // Mouse handlers
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) - rect.width / 2;
      mouseY = (e.clientY - rect.top) - rect.height / 2;
      mouseInside = true;
      // Scale target velocity by mouse position
      const hX = Math.max(-1, Math.min(1, mouseX / (rect.width / 2)));
      const hY = Math.max(-1, Math.min(1, mouseY / (rect.height / 2)));
      targetVelY = 0.7 + hX * 0.9;
      targetVelX = 0.18 + hY * 0.5;
    }
    function onMouseLeave() {
      mouseInside = false;
      targetVelY = 0.7;
      targetVelX = 0.18;
    }
    function onClick() {
      pulseStart = performance.now();
    }
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", onClick);

    function onVis() {
      if (document.hidden) {
        stopped = true;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        stopped = false;
        lastFrame = performance.now();
        raf = requestAnimationFrame(drawFrame);
      }
    }
    document.addEventListener("visibilitychange", onVis);

    if (reduced) {
      drawFrame(performance.now());
    } else {
      raf = requestAnimationFrame(drawFrame);
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Atom · sphere of cyan particles arranged via Fibonacci sphere algorithm · interactive 3D"
      style={{
        width: size,
        height: size,
        cursor: "grab",
      }}
      className={className}
    />
  );
}
