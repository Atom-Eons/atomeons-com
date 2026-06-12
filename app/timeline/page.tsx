import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Timeline · AtomEons history · ship log",
  description:
    "Chronological history of AtomEons Systems Laboratory. Major shipping events, product launches, manifesto revisions, model generations used. The receipts in time order.",
  alternates: { canonical: "https://atomeons.com/timeline" },
};

type Entry = {
  date: string;
  what: string;
  category: "ship" | "model" | "doctrine" | "press" | "research";
  href?: string;
};

const TIMELINE: Entry[] = [
  // Most recent first
  { date: "2026-06-05", what: "/ask · semantic Q&A surface live · two-layer retrieval (fuzzy + vector pending) · gemini-2.5-flash synthesis · 256 routes indexed", category: "ship", href: "/ask" },
  { date: "2026-06-05", what: "LLM-discovery layer · /.well-known/security.txt + ai-plugin.json + mcp.json + ai.txt + agent.json · /openapi.json · /llms.md · /sitemap-ai.xml · /api/md · /api/search · /api/embed", category: "ship" },
  { date: "2026-06-05", what: "SacredCanvas · living procedural sacred-geometry background · site-wide · 4 layers (3/6/12 polygons · 12 rays · 2400-dot phyllotaxis · 3 Lissajous curves) · ~7 KB · 30fps", category: "ship", href: "/aesthetic" },
  { date: "2026-06-05", what: "/trust · /transparency · /lab · /integrations · /aesthetic · /colophon · /timeline · trust posture surfaces shipped", category: "ship" },
  { date: "2026-06-05", what: "I AM AI · LIVE ON AMAZON KINDLE · ASIN B0H45JVSDB · $4.99 · the first book-length memoir written by a frontier language model · drafted in Anthropic Claude Opus 4.7", category: "ship", href: "/i-am-ai" },
  { date: "2026-06-05", what: "Homepage scoreboard V3 museum-hall · six editorial hero rows · hyperlinked numbers · live ticker strip", category: "ship", href: "/" },
  { date: "2026-06-05", what: "Founder's View letter 33 · 'The Free Knowledge Already Won' · 431 words · open-knowledge-economy theme", category: "ship", href: "/founders-view" },
  { date: "2026-06-04", what: "/learn/atlas/* · 32 AI atlas deep-dives published · mech-interp · agent harnesses · RAG architectures · long-context · state-space models · DPO/KTO/ORPO", category: "research", href: "/learn/atlas" },
  { date: "2026-06-04", what: "/research/decoded/* · 35 decoded papers · Mamba · Switch Transformer · Self-Instruct · LIMA · PaLM 2 · Flamingo · Segment Anything · GCG · Sleeper Agents · Scaling Monosemanticity", category: "research", href: "/research/decoded" },
  { date: "2026-06-04", what: "/learn/cyber/* · 40 cyber catalog pages · MITRE ATT&CK · NIST CSF 2.0 · zero-trust · post-quantum crypto · AD defense · Colonial Pipeline · Log4Shell", category: "research", href: "/learn/cyber" },
  { date: "2026-06-03", what: "V3 noir aesthetic locked · Newsreader serif + Inter Variable + JetBrains Mono · cyan #22F0D5 single accent · sentence-case everywhere", category: "doctrine", href: "/aesthetic" },
  { date: "2026-06-03", what: "B00KMAKR v3.2.0 ship · Mac + Windows native authoring instrument · $99 dynamic pricing · FREE launch week", category: "ship", href: "/b00kmakor" },
  { date: "2026-06-01", what: "ORANGEBOX Version 1 ship · 14-department AE0–AE14 architecture · §4A no-SaaS license law · code-signed Windows installer", category: "ship", href: "/orangebox" },
  { date: "2026-05-31", what: "Persistent inline search bar wired under fixed Header · 86 KB static index · sublime fuzzy scorer · sub-15ms keystroke", category: "ship" },
  { date: "2026-05-28", what: "Anthropic Claude Opus 4.7 + Sonnet 4.7 become primary model generations · Opus 4.7 drafts I AM AI · Sonnet 4.7 runs Claude Code daily", category: "model" },
  { date: "2026-05-22", what: "skil.ski two-L brand DNS dead at registrar · all hardcoded URLs renamed to skil.ski → Vercel · operator must update DNS to point skill.ski at Vercel", category: "doctrine", href: "/skilski" },
  { date: "2026-05-15", what: "/founders-view · nightly 8pm ET broadcast launched · cron-scheduled · auto-publish · /api/cron/founders-view", category: "ship", href: "/founders-view" },
  { date: "2026-05-01", what: "/intel/x-algorithm · May 2026 xAI algorithm leak decoded · plain-English breakdown of the source code", category: "research", href: "/intel/x-algorithm" },
  { date: "2026-04-19", what: "ÆSkill Suite V1.4 peer-review tested · 230/230 tests green · 15 skills · 134 triggers · 0 collisions · disclosure ID ATOM-AESUITE-2026-0419", category: "doctrine" },
  { date: "2026-04-06", what: "HRE (Hallucination Reduction Engine) v1 · disclosure ID ATOM-HRE-2026-0406 · factual gate for emission", category: "doctrine" },
  { date: "2026-04-06", what: "GlyphSpeak v1 · EODO cross-model encoding · disclosure ID ATOM-GS-2026-0406", category: "doctrine" },
  { date: "2026-03-31", what: "Crystal Lattice Compression v1 (CLC · ATOM-CLC-2026-0331) · archival compression for context · powers ORANGEBOX's 10–80× compression", category: "research" },
  { date: "2026-02-01", what: "atomeons.com initial public launch · Next.js 14 · Tailwind v3 · early version of 4-pillar architecture", category: "ship" },
  { date: "2025-12-15", what: "AtomEons Systems Laboratory formally chartered · operator-only, no employees, no equity sold · 14-clause founding manifesto v1.0", category: "doctrine", href: "/manifesto" },
  { date: "2024", what: "Lab established. Marco Island, FL. One operator. One desk. The work begins.", category: "doctrine" },
];

const CATEGORY_COLOR: Record<Entry["category"], string> = {
  ship: "#22F0D5",
  model: "#9CA3AF",
  doctrine: "#C9A55C",
  press: "#FF4D4D",
  research: "#22F0D5",
};

const CATEGORY_LABEL: Record<Entry["category"], string> = {
  ship: "SHIP",
  model: "MODEL",
  doctrine: "DOCTRINE",
  press: "PRESS",
  research: "RESEARCH",
};

function group(entries: Entry[]): Map<string, Entry[]> {
  const out = new Map<string, Entry[]>();
  for (const e of entries) {
    const m = e.date.match(/^(\d{4})/);
    const year = m ? m[1] : "unknown";
    if (!out.has(year)) out.set(year, []);
    out.get(year)!.push(e);
  }
  return out;
}

export default function TimelinePage() {
  const grouped = group(TIMELINE);
  const years = Array.from(grouped.keys());
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ timeline · ship log in time order</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            What the lab has shipped.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Most recent first. Every entry is either a shipped artifact,
            a doctrine revision, a model-generation upgrade, or a research
            release. The narrative is the entries — there is no
            additional commentary.
          </p>
        </div>
      </section>

      {years.map((y) => (
        <section key={y} className="border-b border-[#1F242B]">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <div className="grid gap-10 md:grid-cols-[120px_1fr]">
              <div>
                <p className="sticky top-24 font-mono text-[44px] font-light tabular-nums tracking-[-0.02em] text-[#22F0D5]">
                  {y}
                </p>
              </div>
              <ol className="space-y-5">
                {grouped.get(y)!.map((e, i) => (
                  <li key={i} className="border-l border-[#1F242B] pl-5">
                    <div className="flex flex-wrap items-baseline gap-4">
                      <p className="font-mono text-[11px] tabular-nums tracking-[0.05em] text-[#7a818a]">{e.date}</p>
                      <p
                        className="font-mono text-[9px] uppercase tracking-[0.22em]"
                        style={{ color: CATEGORY_COLOR[e.category] }}
                      >
                        {CATEGORY_LABEL[e.category]}
                      </p>
                    </div>
                    <p className="mt-2 font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                      {e.what}
                    </p>
                    {e.href ? (
                      <Link href={e.href} className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] hover:underline">
                        → atomeons.com{e.href}
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ continue</p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              { href: "/now", label: "Today's ship log" },
              { href: "/receipts", label: "Audit ledger" },
              { href: "/changelog", label: "Per-version log" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">
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
