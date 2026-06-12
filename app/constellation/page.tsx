import type { Metadata } from "next";
import Link from "next/link";
import { ConstellationCanvas } from "../_components/V3/ConstellationCanvas";

export const metadata: Metadata = {
  title: "Constellation · the lab as a graph · AtomEons",
  description:
    "Every public route on atomeons.com rendered as an interactive force-laid graph. 278 nodes · 648 edges. Drag to pan, wheel to zoom, click any node to navigate.",
  alternates: { canonical: "https://atomeons.com/constellation" },
  openGraph: {
    title: "Constellation · the lab as a graph",
    description: "278 routes · 648 edges · interactive · click to navigate",
    url: "https://atomeons.com/constellation",
    type: "website",
  },
};

/**
 * /constellation — the masterwork.
 *
 * The lab as a graph. Every public route is a node sized by inbound
 * link count, every cross-route link an edge. Force-laid with a
 * lightweight relaxation pass on mount. Drag, zoom, click to navigate.
 *
 * The visualization tells a story words can't: which surfaces are
 * central · which are leaves · which clusters of writing belong
 * together · how dense the lab's cross-linking really is.
 */

export default function ConstellationPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            § constellation · the lab as a graph
          </p>
          <h1
            className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Every route, every edge.
          </h1>
          <p
            className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            The lab as a force-laid graph. Each star is a route. Each
            thread is a link from one route to another. Size by inbound
            edge count · position by category. Drag to pan, wheel to
            zoom, click any star to travel there.
          </p>
        </div>
      </section>

      {/* Canvas viewport · fills viewport height for immersion */}
      <section
        className="border-b border-[#1F242B]"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <ConstellationCanvas />
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            § what you&rsquo;re looking at
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              { step: "01", title: "Nodes", body: "Every public route on atomeons.com is one star. The star's size is the route's inbound-link count from the rest of the site. Bigger star = more cross-referenced." },
              { step: "02", title: "Edges", body: "Every site-relative <Link> in the source is one thread. The lab cross-links its own thinking heavily; that density is the actual shape of the graph." },
              { step: "03", title: "Layout", body: "Categories sit at fixed angles around the clock face. Within a category, weight pulls a node toward center. ~120 rounds of force relaxation soften the cluster into legibility." },
            ].map((s) => (
              <div key={s.step} className="border-l-2 border-[#1F242B] pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">{s.step}</p>
                <h3 className="mt-3 font-serif text-[24px] font-light leading-[1.2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{s.title}</h3>
                <p className="mt-3 font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            § how it&rsquo;s built
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              { what: "Edge extraction", body: ".scripts/build-graph-index.mjs walks every app/page.tsx, greps for href=\"/...\" + Link references, dedupes, writes public/graph-index.json (~62 KB)." },
              { what: "Layout", body: "Deterministic radial seed by category + hash · ~120 rounds of light-weight force relaxation (repulsion + spring + center pull + damping)." },
              { what: "Render", body: "Canvas2D · ~12 KB minified component · honors prefers-reduced-motion (skip relaxation; render seed layout)." },
              { what: "Interaction", body: "Drag to pan · wheel to zoom · hover for label · click to navigate · stable cursor states throughout." },
              { what: "Data source", body: "/graph-index.json is a public asset. Anyone with it can render their own visualization of our connectivity." },
              { what: "Source of truth", body: "Rebuilt on every deploy from the actual source tree. Edge list cannot drift from the routes that exist." },
            ].map((r) => (
              <div key={r.what} className="border border-[#1F242B] bg-[#0F1114] p-5">
                <p className="font-serif text-[17px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{r.what}</p>
                <p className="mt-3 font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-3 md:grid-cols-4">
            {[
              { href: "/ask", label: "Ask the lab" },
              { href: "/datasets", label: "Public datasets" },
              { href: "/sitemap.xml", label: "Global sitemap" },
              { href: "/graph-index.json", label: "Download the raw graph" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[15px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
