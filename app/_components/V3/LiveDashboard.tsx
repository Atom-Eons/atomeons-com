"use client";

import { useEffect, useState } from "react";

/**
 * LiveDashboard — client component, polls public lab endpoints every 8s
 * and renders honest cells.
 *
 * If a fetch fails the cell switches to "offline" — no synthetic
 * keep-alive, no cached-as-if-live shenanigans.
 */

type Cell = {
  label: string;
  endpoint: string;
  format: (raw: unknown) => string;
  pulse?: boolean;
};

const CELLS: Cell[] = [
  {
    label: "Lab · server time",
    endpoint: "/api/sales-count",
    pulse: true,
    format: (raw: unknown) => {
      const r = raw as { ts?: string };
      if (!r?.ts) return "—";
      const d = new Date(r.ts);
      return d.toISOString().replace("T", " ").slice(11, 19) + " UTC";
    },
  },
  {
    label: "Net buyers",
    endpoint: "/api/sales-count",
    format: (raw: unknown) => {
      const r = raw as { net_buyers?: number };
      return r?.net_buyers !== undefined ? String(r.net_buyers) : "—";
    },
  },
  {
    label: "Current price · USD",
    endpoint: "/api/sales-count",
    format: (raw: unknown) => {
      const r = raw as { current_price_usd?: number; is_free_promo?: boolean };
      if (r?.is_free_promo) return "FREE PROMO";
      return r?.current_price_usd !== undefined ? `$${r.current_price_usd}` : "—";
    },
  },
  {
    label: "/ask index · routes",
    endpoint: "/api/ask",
    format: (raw: unknown) => {
      const r = raw as { fuzzy_index?: { count?: number }; index_count?: number };
      const n = r?.fuzzy_index?.count ?? r?.index_count;
      return n !== undefined ? String(n) : "—";
    },
  },
  {
    label: "/ask · retrieval mode",
    endpoint: "/api/ask",
    format: (raw: unknown) => {
      const r = raw as { mode?: string };
      return r?.mode ? r.mode.toUpperCase() : "—";
    },
  },
  {
    label: "/ask · generator",
    endpoint: "/api/ask",
    format: (raw: unknown) => {
      const r = raw as { generate_model?: string };
      return r?.generate_model || "—";
    },
  },
];

type Snapshot = { value: string; offline: boolean; ts: number };

export function LiveDashboard() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>(
    CELLS.map(() => ({ value: "loading…", offline: false, ts: 0 })),
  );

  useEffect(() => {
    let mounted = true;
    const cache = new Map<string, unknown>();

    async function poll() {
      // Group cells by endpoint to fetch each unique URL once per cycle
      const endpoints = new Set(CELLS.map((c) => c.endpoint));
      const results = await Promise.allSettled(
        Array.from(endpoints).map(async (ep) => {
          const res = await fetch(ep, { cache: "no-store" });
          if (!res.ok) throw new Error(`${ep} ${res.status}`);
          const j = (await res.json()) as unknown;
          return [ep, j] as const;
        }),
      );
      results.forEach((r) => {
        if (r.status === "fulfilled") {
          const [ep, j] = r.value;
          cache.set(ep, j);
        }
      });

      if (!mounted) return;
      setSnapshots(
        CELLS.map((c) => {
          const raw = cache.get(c.endpoint);
          if (raw === undefined) {
            return { value: "offline", offline: true, ts: Date.now() };
          }
          try {
            return { value: c.format(raw), offline: false, ts: Date.now() };
          } catch {
            return { value: "—", offline: true, ts: Date.now() };
          }
        }),
      );
    }

    poll();
    const id = window.setInterval(poll, 8000);
    return () => {
      mounted = false;
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {CELLS.map((c, i) => {
        const s = snapshots[i];
        return (
          <div key={i} className="border border-[#1F242B] bg-[#0F1114] p-5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">{c.label}</p>
              {c.pulse ? (
                <span className={s.offline ? "size-2 rounded-full bg-[#5A6068]" : "size-2 animate-pulse rounded-full bg-[#22F0D5]"} aria-hidden />
              ) : null}
            </div>
            <p
              className={
                s.offline
                  ? "mt-4 font-mono text-[14px] uppercase tracking-[0.22em] text-[#5A6068]"
                  : "mt-4 font-mono text-[20px] tabular-nums text-[#F4F4F2]"
              }
            >
              {s.value}
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
              {c.endpoint}
            </p>
          </div>
        );
      })}
    </div>
  );
}
