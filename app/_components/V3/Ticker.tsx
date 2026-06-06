"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ticker — IntersectionObserver-driven number count-up.
 *
 * Drop-in replacement for static numbers. When the element scrolls
 * into the viewport, the value counts up from 0 (or `from`) to `to`
 * over `duration` ms with ease-out cubic timing.
 *
 * Properties:
 *   - Triggers once · subsequent scrolls don't re-animate
 *   - prefers-reduced-motion → renders the final value immediately
 *   - Supports integer or decimal (set `decimals`)
 *   - Optional prefix / suffix (e.g. "$", "K", "%")
 *   - tabular-nums to prevent layout shift during count
 */

type Props = {
  to: number;
  from?: number;
  duration?: number;       // ms
  decimals?: number;       // count of decimal places
  prefix?: string;
  suffix?: string;
  className?: string;
};

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function Ticker({
  to,
  from = 0,
  duration = 1400,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState<number>(from);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to); setDone(true); return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let observer: IntersectionObserver | null = null;
    let started = false;
    let startTime = 0;

    function tick(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const current = from + (to - from) * eased;
      setValue(current);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    }

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !started) {
          started = true;
          startTime = performance.now();
          raf = requestAnimationFrame(tick);
        }
      }
    }, { threshold: 0.4 });
    observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, from, duration, decimals]);

  const display = decimals === 0
    ? Math.round(value).toLocaleString()
    : value.toFixed(decimals);

  return (
    <span
      ref={ref}
      className={`tabular-nums ${className ?? ""}`}
      aria-label={`${prefix}${to.toLocaleString()}${suffix}`}
    >
      {prefix}{display}{suffix}
    </span>
  );
}
