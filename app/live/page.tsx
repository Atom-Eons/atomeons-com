import type { Metadata } from "next";
import Link from "next/link";
import { LiveDashboard } from "../_components/V3/LiveDashboard";

export const metadata: Metadata = {
  title: "Live · AtomEons real-time dashboard",
  description:
    "What the lab is doing right now. Last deploy time, /ask query count, /api/sales-count counters, recent /now entry, current Founder's View letter. Polled live, no fake data.",
  alternates: { canonical: "https://atomeons.com/live" },
};

/**
 * /live — real-time lab dashboard.
 *
 * Polls public endpoints already on the site (/api/heartbeat,
 * /api/sales-count, /api/ask GET health-check, etc) every 8s and
 * renders a calm dashboard. Everything visible here is independently
 * verifiable by curling the same endpoints.
 *
 * No fake-real-time. No synthetic numbers. If a counter is at zero,
 * it shows zero. If an endpoint is down, the cell shows offline state.
 */

export default function LivePage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="flex items-baseline gap-4">
            <span className="inline-block size-2 animate-pulse rounded-full bg-[#FF4D4D]" aria-hidden />
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">live · polling every 8s</p>
          </div>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            What the lab is doing right now.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Polled from public endpoints already on the site. Curl
            anything below to reproduce it. No fake-real-time, no
            synthetic numbers — if a counter is at zero, it shows zero.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <LiveDashboard />
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ how this surface works</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { step: "01", title: "Polls public endpoints", body: "Same endpoints any AI agent or curl user can hit. /api/heartbeat, /api/sales-count, /api/ask GET, /sitemap.xml lastmod." },
              { step: "02", title: "Renders cells", body: "Each panel is a single value from one endpoint. No aggregation, no derivative metrics, no projection — just the number the API returned." },
              { step: "03", title: "Honest offline", body: "If an endpoint times out or returns 5xx, the cell shows offline. No cached-as-if-live, no fake heartbeat." },
            ].map((s) => (
              <div key={s.step} className="border-l-2 border-[#1F242B] pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">{s.step}</p>
                <h3 className="mt-3 font-serif text-[22px] font-light leading-[1.2] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{s.title}</h3>
                <p className="mt-3 font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ verify any cell</p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {[
              { ep: "/api/sales-count", what: "live · net buyers · revenue · current price · server time" },
              { ep: "/api/ask (GET)", what: "live · index size · retrieval mode · generator model" },
              { ep: "/api/search?q=…", what: "fuzzy search over 247 routes · JSON" },
              { ep: "/api/embed (GET)", what: "embedding model + 768-dim spec" },
              { ep: "/sitemap.xml", what: "global route map" },
              { ep: "/.well-known/mcp.json", what: "MCP tool + resource manifest" },
            ].map((row) => (
              <div key={row.ep} className="border border-[#1F242B] bg-[#0F1114] p-4">
                <p className="font-mono text-[12px] tabular-nums text-[#22F0D5]">curl https://atomeons.com{row.ep}</p>
                <p className="mt-2 font-serif text-[14px] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{row.what}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {[
              { href: "/now", label: "/now · ship log" },
              { href: "/receipts", label: "/receipts · audit ledger" },
              { href: "/ask", label: "/ask · semantic Q&A" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">
                  atomeons.com{l.href}
                </p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
