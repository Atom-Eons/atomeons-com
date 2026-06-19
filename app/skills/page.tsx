import type { Metadata } from "next";
import Link from "next/link";
import { DiscordCTA } from "../_components/V3/DiscordCTA";

export const metadata: Metadata = {
  title: "ÆSkill Suite V1.4 · the operator doctrine · public canon",
  description:
    "The 15-skill operating doctrine that runs every session at AtomEons. T1 session · T2 execution · T3 quality gates · T4 compression · T5 emission. Peer-review tested 230/230 green. Public canon · disclosure IDs included.",
  alternates: { canonical: "https://atomeons.com/skills" },
  openGraph: {
    title: "ÆSkill Suite V1.4 · public operating canon",
    description:
      "15 skills · 6 canonical chains · 230/230 peer-review pass · the operator's runtime doctrine.",
    url: "https://atomeons.com/skills",
    type: "article",
  },
};

/**
 * /skills — public ÆSkill suite canon.
 *
 * The 15 skills (T1-T5) that run every lab session, surfaced from the
 * operator's private CLAUDE.md doctrine into a public reference page.
 * Includes disclosure IDs, canonical chains, peer-review state.
 *
 * What is NOT published here (per operator IP boundary):
 *   - AE0-AE14 internal cognitive-architecture model assignments
 *   - Trust gradient thresholds
 *   - Phase map day counts
 *   - Trilane authority hierarchy (model-vendor precedence on conflict)
 *   - 17th HSMP mutation kind
 *   - MD5 cache key construction
 *   - Relevance Controller spec
 *
 * What IS public · the 15 skill names, their broad function, their
 * disclosure IDs, the canonical chains they participate in.
 */

type Skill = {
  name: string;
  tier: "T1" | "T2" | "T3" | "T4" | "T5";
  role: string;
  what: string;
  disclosure?: string;
};

const SKILLS: Skill[] = [
  // T1 · Session
  { name: "atomeons-prime",     tier: "T1", role: "session boot",       what: "Emits the deploy grid on first substantive turn · time / location / recent context / uploads / skills / memory invariants. No cold boots." },
  { name: "atomeons-verifier",  tier: "T1", role: "session close",      what: "12-gate top-of-model health check. Runs before ending any work session." },
  // T2 · Execution
  { name: "pizza",              tier: "T2", role: "max-capacity flag",  what: "Auto-fires on build/ship/deliver verbs. Flips the model to full-effort mode. Mom's-Law trigger." },
  { name: "octolane",           tier: "T2", role: "8-engine audit",     what: "Parallel sweep across 8 review lanes. Used for substantial deliverables before emission." },
  { name: "atomeons-generator", tier: "T2", role: "N-generator",        what: "Doctrine default: always 10. Variant generation across the design space for any decision." },
  { name: "atomeons-openmind",  tier: "T2", role: "cross-disciplinary", what: "Default-on. Surfaces parallel paths across 12 disciplines instead of collapsing to one dominant frame.", disclosure: "ATOM-OMT-2026-0420" },
  // T3 · Quality gates
  { name: "atomeons-hre",       tier: "T3", role: "hallucination gate", what: "Hallucination Reduction Engine. Factual gate · blocks emission on any RED finding. Interleaved into OpenMind passes.", disclosure: "ATOM-HRE-2026-0406" },
  { name: "atomeons-security-audit", tier: "T3", role: "security",     what: "Deterministic grep suite for code · runs before any production push." },
  { name: "atomeons-drift",     tier: "T3", role: "invariant guard",    what: "Enforces 27 constitutional guardrails · sole cognitive center authority · founder-salary law · Human Final Stop reachability." },
  { name: "atomeons-bench",     tier: "T3", role: "honest measurement", what: "Performance bench discipline · corpus + N≥30 + confidence interval + p-value. No vibe-checked benchmarks." },
  // T4 · Compression
  { name: "atomeons-clc",       tier: "T4", role: "archive compression",what: "Crystal Lattice Compression · 10-80× context shrink for archival + transport. Powers Orange³ compression layer.", disclosure: "ATOM-CLC-2026-0331" },
  { name: "atomeons-glyphspeak",tier: "T4", role: "cross-model encoding",what: "EODO cross-model encoding for transport between Claude / GPT / Gemini · preserves semantic content under tokenizer drift.", disclosure: "ATOM-GS-2026-0406" },
  // T5 · Emission
  { name: "atomeons-ledger",    tier: "T5", role: "delivery law",       what: "Universal terminal for non-trivial deliverables: zip + SHA-256 + ledger row + present_files. No exceptions." },
  { name: "atomeons-paper",     tier: "T5", role: "paper pipeline",     what: "ÆoNs Research paper emission pipeline. From prime → openmind → hre → bench → paper → ledger → verifier." },
  { name: "atomeons-trilane",   tier: "T5", role: "model handoff",      what: "Multi-vendor handoff bundler. Packages context for handoff across Claude · GPT · Gemini sessions." },
];

const CHAINS = [
  { name: "A_boot",     formula: "atomeons-prime",                                                                                                                description: "Single-skill session boot. Sets time + location + skills + memory invariants for the working session." },
  { name: "B_build",    formula: "prime → pizza → openmind → generator → security-audit + drift + hre → ledger → verifier",                                       description: "Standard build chain. Max capacity · cross-disciplinary · 10-variant generation · three parallel quality gates · ledger emission · session-close health check." },
  { name: "C_paper",    formula: "prime → pizza → openmind → hre → bench → paper → ledger → verifier",                                                            description: "Research paper emission chain. Adds the bench measurement step + paper pipeline before ledger." },
  { name: "D_handoff",  formula: "prime → openmind → glyphspeak → trilane → ledger",                                                                              description: "Cross-model handoff chain. Encodes the context once · packages for downstream vendor." },
  { name: "E_archive",  formula: "atomeons-clc",                                                                                                                  description: "Compression-only chain. Archives a working context at 10-80× density for later resume." },
  { name: "F_close",    formula: "atomeons-verifier",                                                                                                             description: "Session close. 12-gate top-of-model check before terminating the work window." },
];

const STANDING_ORDERS = [
  "Prime the session — fire atomeons-prime on first substantive turn. No cold boots.",
  "Pizza default — build/theory/ship verbs auto-flip to max capacity.",
  "OpenMind default-on — every substantive turn lets cross-disciplinary parallelism surface. No collapsing to single-dominant-discipline.",
  "No simulation — never write 'as X would say…' for a real person. Cite frameworks, results, techniques · not personifications. HRE blocks emission on any RED finding.",
  "Ledger is law — every non-trivial deliverable: zip + SHA-256 + ledger row + present_files. No exceptions.",
  "Search before claim — present-day facts require web_search, never priors.",
  "Session close — fire atomeons-verifier before ending a work session.",
];

const VERIFIED_STATE = [
  { what: "Skill count",                  value: "15", note: "all YAML-valid" },
  { what: "Triggers",                     value: "134", note: "0 collisions" },
  { what: "Aliases (æ.*)",                value: "15", note: "0 collisions" },
  { what: "Canonical chains",             value: "6", note: "structurally correct" },
  { what: "Registry SHA-256",             value: "2629d5af…6347f356a", note: "26 hex chars truncated · full hash in test corpus" },
  { what: "Peer-review test battery",     value: "230 / 230 passing", note: "pytest 9.0.3 · Python 3.12.3" },
  { what: "Dispatcher benchmark",         value: "1.0000 accuracy · 0.247ms mean", note: "HONEST verdict · N=100 · 95% CI [1.0, 1.0]" },
  { what: "HRE classifier",               value: "9 / 9 anti-simulation cases", note: "correctly classified" },
];

const TIER_COLOR: Record<Skill["tier"], string> = {
  T1: "#9CA3AF",
  T2: "#22F0D5",
  T3: "#FF4D4D",
  T4: "#C9A55C",
  T5: "#22F0D5",
};

const TIER_LABEL: Record<Skill["tier"], string> = {
  T1: "SESSION",
  T2: "EXECUTION",
  T3: "QUALITY GATES",
  T4: "COMPRESSION",
  T5: "EMISSION",
};

export default function SkillsPage() {
  const tiers: Skill["tier"][] = ["T1", "T2", "T3", "T4", "T5"];
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ ÆSkill Suite V1.4 · public canon</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The 15 skills that run every session.
          </h1>
          <p className="speakable-answer mt-6 max-w-3xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The lab's runtime doctrine. Five tiers · fifteen skills ·
            six canonical chains. Peer-review tested at 230/230 green.
            Disclosure IDs included for the named research artifacts.
            Suite ID · <span className="font-mono text-[14px] text-[#22F0D5]">ATOM-AESUITE-2026-0419</span>.
          </p>
        </div>
      </section>

      {tiers.map((tier) => {
        const list = SKILLS.filter((s) => s.tier === tier);
        return (
          <section key={tier} className="border-b border-[#1F242B]">
            <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: TIER_COLOR[tier] }}>
                  § {tier} · {TIER_LABEL[tier]}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a818a]">{list.length} skill{list.length > 1 ? "s" : ""}</p>
              </div>
              <ol className="mt-10 space-y-7">
                {list.map((s) => (
                  <li key={s.name} className="border-l-2 border-[#1F242B] pl-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h2 className="font-mono text-[18px] text-[#22F0D5]">{s.name}</h2>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">{s.role}</p>
                    </div>
                    <p className="mt-3 font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{s.what}</p>
                    {s.disclosure ? (
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">disclosure · {s.disclosure}</p>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        );
      })}

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ canonical chains · how the skills compose</p>
          <ol className="mt-10 space-y-7">
            {CHAINS.map((c) => (
              <li key={c.name} className="border-l-2 border-[#1F242B] pl-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="font-mono text-[14px] text-[#22F0D5]">{c.name}</p>
                </div>
                <p className="mt-2 break-all font-mono text-[12px] text-[#9CA3AF]">{c.formula}</p>
                <p className="mt-3 font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{c.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ standing orders</p>
          <ol className="mt-10 space-y-5">
            {STANDING_ORDERS.map((o, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{o}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ verified state · peer-review pass</p>
          <ul className="mt-10 divide-y divide-[#1F242B]">
            {VERIFIED_STATE.map((v, i) => (
              <li key={i} className="grid items-baseline gap-4 py-4 md:grid-cols-[260px_200px_1fr]">
                <p className="font-serif text-[16px] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{v.what}</p>
                <p className="font-mono text-[13px] text-[#22F0D5]">{v.value}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7a818a]">{v.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
            test battery anchor · ATOM-AESUITE-TEST-2026-0420
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="border-l-2 border-[#C9A55C] bg-[#0B0C0F] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A55C]">§ what is NOT on this page</p>
            <p className="mt-4 font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              The internal cognitive-architecture details that power
              Orange³ are not published here per operator IP boundary.
              Specifically · the AE# model assignments · trust gradient
              thresholds · phase map day counts · Trilane authority
              hierarchy on conflict · the 17th HSMP mutation kind · and
              the MD5 cache key construction remain operator-owned.
              The 15 skills + 6 chains documented above are sufficient
              to understand the lab's operating discipline without
              compromising the IP that makes the cockpit competitive.
            </p>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-4">
            {[
              { href: "/orangebox", label: "Orange³ · the cockpit" },
              { href: "/orangebox-primer", label: "Vendor security primer" },
              { href: "/manifesto", label: "14-clause manifesto" },
              { href: "/trust", label: "Trust posture" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[15px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 pb-16">
        <DiscordCTA context="general" />
      </div>
    </main>
  );
}
