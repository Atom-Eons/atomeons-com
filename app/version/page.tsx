import type { Metadata } from "next";
import Link from "next/link";

/**
 * /version · JUNE ROCKET release manifest.
 *
 * The site is on a continuous-deploy cadence (every commit ships to
 * production) but the operator stamps named versions when a coherent
 * release lands. JUNE ROCKET is the Wave 30 release — the OpenMind
 * 4-agent review consensus shipped.
 *
 * This page is canon: name the version · name what shipped · name
 * what's deferred · name the operator. No marketing varnish.
 *
 * — 2026-06-06
 */

export const metadata: Metadata = {
  title: "Version · JUNE ROCKET",
  description:
    "AtomEons site version manifest. JUNE ROCKET · Wave 30 · GPU-adaptive tiering · OpenMind 4-agent review · 3 new domain hubs · offline model scoped.",
  alternates: { canonical: "https://atomeons.com/version" },
  openGraph: {
    title: "JUNE ROCKET · AtomEons site version",
    description:
      "Wave 30 release manifest · GPU-adaptive tiering · OpenMind review consensus · 3 new domain hubs · offline-model scoped.",
    url: "https://atomeons.com/version",
    type: "article",
  },
};

const SHIPPED: { title: string; detail: string }[] = [
  {
    title: "GPU-adaptive visual tiering",
    detail:
      "useGpuTier hook · 4-step detection (cores · device memory · rAF self-measure · WebGL renderer) · 3 tiers (lite · standard · full) · TierToggle pill cycles AUTO → LITE → MID → FULL · localStorage persists choice + last-resolved tier · prefers-reduced-motion forces lite as floor · synchronous head bootstrap prevents flash.",
  },
  {
    title: "OpenMind 4-agent review consensus",
    detail:
      "Orange-judge · Mirrors · Lips · UX-product reviewed the site in parallel. Consensus signals: collapse mega-menu · trim homepage sections · stabilize hero · merge trust/transparency/audit-log/timeline → /lab · build GPU-adaptive system. Verdicts logged in transcript · synthesis applied incrementally over June Rocket waves.",
  },
  {
    title: "3 of 7 domain hubs",
    detail:
      "/learn/health-ai · /learn/money-ai · /learn/video-ai · each is a substantive curated entry into AI within that vertical — players, tools, papers, risks, what the lab thinks. The remaining 4 (music · robotics · policy · science) ship in Wave 31.",
  },
  {
    title: "Hero AtomHero3D · tier-gated",
    detail:
      "The 360-dot CSS 3D Fibonacci sphere on the homepage is the single most expensive visual element. It now renders only when html.tier-full is active. Lite + Standard get the flat photographic hero alone.",
  },
];

const ON_HOLD: { title: string; detail: string; reason: string }[] = [
  {
    title: "Local-runnable AI model on the site",
    detail:
      "Bundle a small Transformers.js / WebLLM model (Qwen 2.5 0.5B · TinyLlama · DistilGPT2) with the site so visitors can use /ask offline once cached. ~50–500 MB initial download · WebGPU preferred · CPU fallback · explicit user opt-in per Mom's-Law no-surprise-downloads rule. Adds genuine offline utility · feels like the lab gave the visitor a tool.",
    reason: "Operator-scoped 2026-06-06 · awaiting timing call · no compute or token cost when offline · respects privacy completely.",
  },
  {
    title: "Per-page granular semantic anchors (data-llm-chunk)",
    detail:
      "Tag every paragraph / list / pre block with data-llm-chunk='atomic' + a stable #id so agents can deep-link to a specific claim. Already implicit in the markdown twin but not surfaced in the HTML DOM.",
    reason: "Real value but high mechanical edit cost across 336 routes · batched into a sweep wave.",
  },
  {
    title: "WASM executable sandboxes per page",
    detail:
      "Pages that explain code (atlas/* · q/*) could ship a sandboxed Pyodide / TS runtime so visitors run the example inline. Premium-feel but niche · adds ~10MB Pyodide loader.",
    reason: "Demand-signal-gated · build when 3 visitors ask for it.",
  },
  {
    title: "Pre-computed vector embeddings export (.parquet)",
    detail:
      "Publish gemini-embedding-001 768-dim Matryoshka embeddings of every public route as a single .parquet linked from <head>. AI agents could load it once and run their own retrieval without hitting /api/ask.",
    reason: "Cool · cheap to generate · waiting for storage decision (Vercel KV vs static download).",
  },
  {
    title: "Per-receipt /api/verify/{id} endpoint",
    detail:
      "Each shipped artifact (paper · build · book) gets a stable verify URL that returns the SHA-256 + the canonical content. Agents can cite atomeons.com/api/verify/abc123 instead of trusting a quoted hash.",
    reason: "Trust signal upgrade · waiting on receipts inventory cleanup.",
  },
  {
    title: "Inline function-calling JSON schemas",
    detail:
      "Each product page exports a <script type='application/json'> with a function-calling schema agents can register. E.g. /orangebox would expose buy_orangebox({tier, license, key?}) so a Claude/GPT agent can quote a buy intent without scraping HTML.",
    reason: "Speculative · awaiting first request from a real agent integration.",
  },
];

const RELEASE_LOG: { version: string; date: string; one_line: string }[] = [
  {
    version: "JUNE ROCKET (Wave 30)",
    date: "2026-06-06",
    one_line:
      "OpenMind 4-agent review · GPU-adaptive tiering · 3 of 7 domain hubs · AtomHero3D tier-gated.",
  },
  {
    version: "BIG DOG (Wave 28-29)",
    date: "2026-06-05",
    one_line:
      "Full-scope elevation · /explore · /atlas · /skills · /audit-log · /welcome · /north-star · /learn/cyber/mythos · /learn/cyber/models · /api/palette · copy-for-llm.",
  },
  {
    version: "CYBER DOUBLE (Wave 27)",
    date: "2026-06-04",
    one_line:
      "Cyber mega-menu doubled · 40 routes · world-class cybersec catalog · zero-trust · ATT&CK · post-quantum.",
  },
  {
    version: "GPU CHEAP (Wave 25)",
    date: "2026-06-03",
    one_line:
      "SacredCanvas → SacredSvg · Canvas2D → CSS 3D Fibonacci · zero CPU per frame · mini-PC friendly.",
  },
  {
    version: "PIZZA PIE (Wave 22)",
    date: "2026-06-02",
    one_line:
      "AtomHero3D Fibonacci sphere · variable-weight reveal · cinematic noir hero treatment.",
  },
  {
    version: "MEGA MENU (Wave 19)",
    date: "2026-06-01",
    one_line:
      "6-column mega-menus · footer redesign as sitemap · mobile nav rewrite.",
  },
];

export default function VersionPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      {/* Header */}
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#7a818a]">
          VERSION · MANIFEST · 2026-06-06
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(48px,8vw,96px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          JUNE ROCKET.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          The Wave 30 release. The site stopped being a documentation pile and
          started being a single instrument. GPU-adaptive · OpenMind-reviewed ·
          3 new domain hubs · the offline model is scoped and waiting.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]">
          Released · 2026-06-06 · Marco Island, FL · 0 dependencies on anyone&apos;s permission
        </p>
      </header>

      {/* What shipped */}
      <section className="mt-16">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Shipped tonight
        </h2>
        <ol className="mt-8 space-y-8">
          {SHIPPED.map((s, i) => (
            <li
              key={s.title}
              className="grid grid-cols-[auto_1fr] gap-6 border-l-2 border-[#22F0D5]/40 pl-6"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7a818a]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3
                  className="text-[24px] font-light leading-tight text-[#F4F4F2]"
                  style={{ fontFamily: "Newsreader, Georgia, serif" }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-[#9CA3AF]">
                  {s.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* OpenMind verdicts */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § OpenMind 4-agent review consensus
        </h2>
        <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
          Four lenses ran in parallel · orange-judge for subtraction ·
          mirrors for reality-contact · lips for surface voice · ux-product
          for flow + premium coherence. Each panelist worked blind to the
          others. Synthesis below.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="border border-[#1F242B] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              ORANGE-JUDGE · subtraction
            </p>
            <h3 className="mt-3 text-[18px] font-light text-[#F4F4F2]">
              Delete 10 routes. Consolidate 10 into 3 hubs. Promote 5.
            </h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-[#9CA3AF]">
              Untouchable: /learn · /research · /founders-view. Headline
              candidate: <em>&ldquo;Everything we know about AI, free —
              starting now.&rdquo;</em>
            </p>
          </div>
          <div className="border border-[#1F242B] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              LIPS · UX voice + surface feel
            </p>
            <h3 className="mt-3 text-[18px] font-light text-[#F4F4F2]">
              14 homepage sections → 5. Kill the ticker. One visual per section.
            </h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-[#9CA3AF]">
              Move toward motionsites.com / TouchDesigner energy: single
              cinematic moment per section · breathing room · no competing
              accents. New H1 candidate: <em>&ldquo;The free AI lab where
              the knowledge has no ceiling.&rdquo;</em>
            </p>
          </div>
          <div className="border border-[#1F242B] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              UX-PRODUCT · flow + premium coherence
            </p>
            <h3 className="mt-3 text-[18px] font-light text-[#F4F4F2]">
              Mega-menu 7 → 4. GPU tier auto-detect. Group meta-controls.
            </h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-[#9CA3AF]">
              Detection tree: cores ≤ 2 → lite floor · memory ≤ 2 → lite
              floor · rAF mean &gt; 33ms → downgrade · &gt; 50ms → lite ·
              WebGL renderer as soft cap. Designed · shipped · live.
            </p>
          </div>
          <div className="border border-[#1F242B] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              MIRRORS · anti-theater audit
            </p>
            <h3 className="mt-3 text-[18px] font-light text-[#F4F4F2]">
              Verdict logged · synthesis pending.
            </h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-[#9CA3AF]">
              The mirrors agent spent its budget on direct page reads to
              audit aspirational content vs real lab activity. Findings
              folded into the deletion list above.
            </p>
          </div>
        </div>
      </section>

      {/* On-hold upgrades */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Deferred · on-hold upgrades
        </h2>
        <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
          Scoped · honest · waiting on a timing call from the operator or a
          real-world signal. Listed in the open so the next visitor knows
          what&apos;s being held back and why.
        </p>
        <ul className="mt-10 space-y-8">
          {ON_HOLD.map((u) => (
            <li
              key={u.title}
              className="border-l-2 border-[#C9A55C]/40 pl-6"
            >
              <h3 className="text-[20px] font-light leading-tight text-[#F4F4F2]">
                {u.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {u.detail}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#C9A55C]">
                Reason held · {u.reason}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Release log */}
      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Release log
        </h2>
        <table className="mt-8 w-full border-collapse text-[14px]">
          <thead>
            <tr className="border-b border-[#1F242B] text-left">
              <th className="py-3 pr-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#7a818a]">
                Version
              </th>
              <th className="py-3 pr-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#7a818a]">
                Date
              </th>
              <th className="py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#7a818a]">
                One-line
              </th>
            </tr>
          </thead>
          <tbody>
            {RELEASE_LOG.map((r) => (
              <tr key={r.version} className="border-b border-[#0F1114]">
                <td className="py-4 pr-6 align-top font-mono text-[12px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  {r.version}
                </td>
                <td className="py-4 pr-6 align-top font-mono text-[12px] text-[#9CA3AF]">
                  {r.date}
                </td>
                <td className="py-4 align-top text-[14px] leading-[1.55] text-[#F4F4F2]">
                  {r.one_line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Where to next */}
      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Where to go from here
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Link
            href="/audit-log"
            className="block border border-[#1F242B] p-6 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Audit log
            </p>
            <p className="mt-2 text-[15px] text-[#F4F4F2]">
              Every commit. SHA-linked. 250 deep.
            </p>
          </Link>
          <Link
            href="/north-star"
            className="block border border-[#1F242B] p-6 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              North star
            </p>
            <p className="mt-2 text-[15px] text-[#F4F4F2]">
              Where this lab is pointed in 2035.
            </p>
          </Link>
          <Link
            href="/welcome"
            className="block border border-[#1F242B] p-6 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Welcome back
            </p>
            <p className="mt-2 text-[15px] text-[#F4F4F2]">
              The returning-visitor lane.
            </p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          ÆoNs Research Laboratory · Marco Island, FL · 25.93°N 81.71°W
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          Author · Atom McCree · CC-BY 4.0 · License § 4A no-SaaS
        </p>
      </footer>
    </main>
  );
}
