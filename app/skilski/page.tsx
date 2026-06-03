import Link from "next/link";

export const metadata = {
  title: "skil.ski — the universal skill registry for AI agents",
  description:
    "skil.ski hosts 2,127 verified skills across 13 sectors. One MCP endpoint serves Claude, GPT, Gemini, Cursor, Codex. Save = bookmark. Add to Lodge = make active on MCP. Operator-Verified flagships + free community Oskis. Built by AtomEons.",
  alternates: { canonical: "https://atomeons.com/skilski" },
  robots: { index: true, follow: true },
};

const SECTORS = [
  ["Business & Office", 72],
  ["Finance & Legal", 228],
  ["Tech & Software", 24],
  ["Health & Wellness", 72],
  ["Trades & Construction", 36],
  ["Food & Hospitality", 24],
  ["Retail & E-Commerce", 48],
  ["Education & Nonprofits", 48],
  ["Home & Personal", 72],
  ["Logistics & Transport", 60],
] as const;

const TIERS = [
  {
    name: "Self-Serve",
    range: "$1.2K – $5K",
    body: "Individual skills bought à la carte. Sole operators and indie pros buying one capability at a time.",
  },
  {
    name: "Enterprise",
    range: "$5K – $9.9K",
    body: "Mid-market teams licensing a domain bundle. Compliance, sales ops, customer success.",
  },
  {
    name: "Premium",
    range: "$15K – $50K",
    body: "Sector-deep stacks for verticalized companies — legal firms, regional banks, healthcare networks.",
  },
  {
    name: "Industrial",
    range: "$50K+",
    body: "Full registry access + bespoke skill builds + verification SLA. F500 / GSI / nation-state buyers.",
  },
];

const HOW = [
  {
    step: "1 · Browse",
    body: "Search 2,127+ skills by sector, agent, ROI tier, content depth.",
  },
  {
    step: "2 · Save",
    body: "Bookmark a skill for later. Save ≠ enable. Save = remember.",
  },
  {
    step: "3 · Add to Lodge",
    body: "Make a skill active on your MCP endpoint. Lodge = your live skill graph.",
  },
  {
    step: "4 · Bundle into SkiPak",
    body: "Group lodged skills into reusable packages for projects or clients.",
  },
  {
    step: "5 · Engage",
    body: "$99/mo unlocks full registry. Any agent (Claude / GPT / Gemini / Cursor / Codex) talks to your Lodge via one MCP endpoint.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "skil.ski", item: "https://atomeons.com/skilski" },
  ],
};

export default function Skilski() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="transition-colors hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> skil.ski
        </p>
      </div>

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(70% 55% at 70% 40%, rgba(34,240,213,0.20) 0%, transparent 60%), radial-gradient(50% 40% at 10% 90%, rgba(34, 240, 213,0.16) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::skil.ski · the universal skill registry
          </p>
          <h1 className="text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl">
            2,127 skills.
            <br />
            <span className="text-[#22F0D5]">One MCP endpoint.</span>
            <br />
            Every agent.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#9BA5A7]">
            skil.ski is the public registry where AI agents (Claude · GPT ·
            Gemini · Cursor · Codex) plug into 2,127+ operator-verified
            skills across legal, medical, ag, finance, construction, trades,
            and 7 more sectors.
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#F2F4F5]">
            Save what you need. Lodge what you use. Bundle what you ship.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="https://skil.ski/skills"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-[#22F0D5] bg-[#22F0D5] px-7 py-3.5 text-base font-semibold text-black shadow-[0_0_40px_rgba(34,240,213,0.4)] transition-colors hover:bg-[#0FB39E]"
            >
              browse 2,127 skills →
            </a>
            <a
              href="https://skil.ski/pricing"
              target="_blank"
              rel="noopener"
              className="font-mono text-sm uppercase tracking-[0.18em] text-[#22F0D5] hover:underline"
            >
              ::pricing · $99/mo
            </a>
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="bg-black py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::what it is
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            A skill is a buyer-grade workflow.
            <br />
            <span className="text-[#6B7779]">Not a prompt. Not a template.</span>
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#9BA5A7]">
            Each skil.ski is a verified procedure with statutes cited,
            jurisdictions named, and ROI quantified. "§170(h) qualified
            conservation contribution stack." "Davis-Bacon prevailing wage
            compliance plan." "ISO §422 AMT exposure model." Real workflows,
            citation-anchored, agent-callable.
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-3">
            {[
              {
                h: "Operator-Verified",
                b: "Bespoke verified · rich content depth · published flagship.",
                t: "rich",
              },
              {
                h: "Real-world workflow",
                b: "Built from a working SOP, not invented for a sales deck.",
                t: "rich",
              },
              {
                h: "Oski (community)",
                b: "Free imports from the community pool. Use what works.",
                t: "free",
              },
            ].map((it) => (
              <div
                key={it.h}
                className="bg-[#0A0F11] p-7 transition-colors hover:bg-[#101A1C]"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  ::{it.t}
                </p>
                <h3 className="mt-3 text-lg font-medium text-[#22F0D5]">
                  {it.h}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
                  {it.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="bg-black py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::13 sectors
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
            Skills indexed where the work happens.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-5">
            {SECTORS.map(([name, count]) => (
              <div
                key={name}
                className="flex items-baseline justify-between bg-[#0A0F11] px-5 py-4 transition-colors hover:bg-[#101A1C]"
              >
                <span className="text-sm text-[#F2F4F5]">{name}</span>
                <span className="font-mono text-base font-medium tabular-nums text-[#22F0D5]">
                  {count}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-[#6B7779]">
            Plus AI engineer specialty stack (409A, ISO, RSU sourcing, IP
            assignment carve-outs, non-compete redlines), 340B, ag-law,
            construction prime contracting, and more. Full catalog:{" "}
            <a
              href="https://skil.ski/skills"
              target="_blank"
              rel="noopener"
              className="text-[#22F0D5] hover:underline"
            >
              skil.ski/skills
            </a>
            .
          </p>
        </div>
      </section>

      {/* TIERS */}
      <section className="bg-black py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::four tiers
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
            Skill price tracks the value at stake.
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-4">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className="bg-[#0A0F11] p-7 transition-colors hover:bg-[#101A1C]"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  {t.range}
                </p>
                <h3 className="mt-3 text-lg font-medium text-[#22F0D5]">
                  {t.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-[#6B7779]">
            Individual skills run $50/pro · $99 retail. Bundle into a SkiPak
            or subscribe ($99/mo) for full registry access.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-black py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::the five-verb flow
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
            Browse → Save → Lodge → Pak → Engage.
          </h2>
          <ol className="mt-10 space-y-4">
            {HOW.map((s, i) => (
              <li
                key={i}
                className="grid grid-cols-[160px_1fr] items-baseline gap-6 rounded-2xl border border-[#1A2225] bg-[#0A0F11] px-7 py-5 transition-colors hover:border-[#22F0D5]/40"
              >
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
                  {s.step}
                </span>
                <span className="text-base text-[#F2F4F5]">{s.body}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-2xl border border-[#22F0D5]/30 bg-gradient-to-r from-[#1C0F08] to-[#0A0F11] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::critical distinction
            </p>
            <p className="mt-3 text-base text-[#F2F4F5]">
              <span className="text-[#22F0D5]">Saving ≠ enabling.</span> Save =
              bookmark. <span className="text-[#22F0D5]">Add to Lodge</span> =
              make active on MCP. Your agents can only call what's lodged.
            </p>
          </div>
        </div>
      </section>

      {/* AGENTS */}
      <section className="bg-black py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::works with
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
            Any agent.
            <br />
            <span className="text-[#22F0D5]">One MCP endpoint.</span>
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-5">
            {["Claude", "GPT", "Gemini", "Cursor", "Codex"].map((agent) => (
              <div
                key={agent}
                className="bg-[#0A0F11] px-5 py-6 text-center transition-colors hover:bg-[#101A1C]"
              >
                <span className="text-base font-medium text-[#F2F4F5]">
                  {agent}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-[#6B7779]">
            skil.ski exposes a single MCP endpoint. Any MCP-capable agent
            connects, sees the skills in your Lodge, and calls them like
            native tools. No per-agent integration. No skill duplication
            across vendors.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-black py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(34,240,213,0.20) 0%, transparent 60%), radial-gradient(40% 40% at 80% 20%, rgba(34, 240, 213,0.18) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::ready to lodge
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] md:text-6xl">
            Stop building skills.
            <br />
            <span className="text-[#22F0D5]">Start lodging them.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#9BA5A7]">
            2,127 operator-verified workflows already wired. One subscription.
            Every agent. No re-integration when you switch models.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="https://skil.ski/skills"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-[#22F0D5] bg-[#22F0D5] px-7 py-3.5 text-base font-semibold text-black shadow-[0_0_40px_rgba(34,240,213,0.4)] transition-colors hover:bg-[#0FB39E]"
            >
              browse the registry →
            </a>
            <a
              href="https://skil.ski/pricing"
              target="_blank"
              rel="noopener"
              className="font-mono text-sm uppercase tracking-[0.18em] text-[#22F0D5] hover:underline"
            >
              see pricing
            </a>
          </div>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B7779]">
            skil.ski · 2026 AtomEons Systems Laboratory · marco island, fl
          </p>
        </div>
      </section>
    </main>
  );
}
