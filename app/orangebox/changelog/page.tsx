import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ORANGEBOX · changelog · version history",
  description:
    "Every version of ORANGEBOX, in time order. SHA-256 manifest per release. Code-signed Windows installer. License §4A no-SaaS covenant preserved across every release.",
  alternates: { canonical: "https://atomeons.com/orangebox/changelog" },
};

/**
 * /orangebox/changelog — per-product version log.
 *
 * Sister to the global /changelog but ORANGEBOX-specific. Every entry
 * includes the version tag, ship date, SHA-256 manifest URL, and the
 * Headline ship items. Operator-stated rule: a row exists for every
 * version including failed or unshipped tagged versions, marked clearly.
 */

type Release = {
  version: string;
  date: string;
  status: "shipped" | "skipped" | "withdrawn";
  highlights: string[];
  sha256ManifestUrl?: string;
  binarySize?: string;
};

const RELEASES: Release[] = [
  {
    version: "v1.0.0",
    date: "2026-06-01",
    status: "shipped",
    highlights: [
      "Public 1.0 ship · 14-department AE0-AE14 architecture",
      "Code-signed via Azure Trusted Signing certificate",
      "License §4A no-SaaS covenant locked in installer EULA",
      "BYO-key multi-LLM: Claude · GPT · Gemini · Ollama · OpenRouter · Groq · Cohere · Mistral · Perplexity",
      "AECode contracts as first-class file format",
      "30-day Material Failure Guarantee · Stripe-backed refund",
    ],
    binarySize: "~84 MB Win64",
  },
  {
    version: "v1.0.0-beta",
    date: "2026-05-30",
    status: "shipped",
    highlights: [
      "Free preview week launch · gated to GitHub Releases",
      "Crystal Lattice Compression (CLC) v1 integration · 10-80× context shrink",
      "Skill primers system · /skills/<slug>/SKILL.md format finalized",
      "Tamper-evident JSON receipts on every action",
      "First end-to-end ORANGEBOX cockpit shipped to operator's Windows machine",
    ],
    binarySize: "~78 MB Win64",
  },
  {
    version: "v0.9.0-rc",
    date: "2026-05-22",
    status: "shipped",
    highlights: [
      "Release candidate · operator-internal verification only",
      "AtomSmasher backend pack landed · doctor + tool-merge proof commands",
      "Hidden behind a feature gate · not announced",
      "Validated by operator daily-use for 8 days before promotion to beta",
    ],
  },
  {
    version: "v0.8.x",
    date: "2026-04-19",
    status: "shipped",
    highlights: [
      "ÆSkill Suite V1.4 peer-review test pass · 230/230 green",
      "Skill registry hardened · 134 triggers · 0 collisions",
      "HRE (Hallucination Reduction Engine) v1 integrated",
      "GlyphSpeak v1 cross-model encoding shipped (ATOM-GS-2026-0406)",
    ],
  },
  {
    version: "v0.7.x",
    date: "2026-03-31",
    status: "shipped",
    highlights: [
      "Crystal Lattice Compression (CLC) v1 disclosed · ATOM-CLC-2026-0331",
      "27 constitutional guardrails enumerated and enforced",
      "Gate 0 (LatticeIntegrityGate / LBCE) wired into every gate chain",
      "Human Final Stop Authority reachable from every autonomous-action path",
    ],
  },
  {
    version: "v0.6.x",
    date: "2026-02-15",
    status: "shipped",
    highlights: [
      "FOUNDER_SALARY_PER_INSTALL_CENTS invariant locked",
      "Runtime cognitive center consolidated into runtime/node.py (sole authority)",
      "ATOMEONS_IDENTITY_SECRET environment-read, never hardcoded",
    ],
  },
  {
    version: "v0.5.0",
    date: "2025-12-15",
    status: "shipped",
    highlights: [
      "First public-doctrine release · 14-clause founding manifesto v1.0",
      "Operator-only · no employees · no equity sold",
      "ORANGEBOX brand name finalized; replaces earlier internal codenames",
    ],
  },
];

const STATUS_STYLES: Record<Release["status"], { color: string; label: string }> = {
  shipped: { color: "#22F0D5", label: "SHIPPED" },
  skipped: { color: "#5A6068", label: "SKIPPED" },
  withdrawn: { color: "#FF4D4D", label: "WITHDRAWN" },
};

export default function OrangeboxChangelogPage() {
  return (
    <main className="min-h-screen bg-[#1A1410] text-[#F4F4F2]">
      <section className="border-b border-[#3D2F22]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF8B3D]">
            § ORANGEBOX · changelog
          </p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Every release on file.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#C9B19A] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Most recent first. Each release has a SHA-256 manifest stamped
            into the installer; the §4A no-SaaS covenant survives every
            upgrade.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <ol className="space-y-10">
            {RELEASES.map((r) => (
              <li key={r.version} className="border border-[#3D2F22] bg-[#221A14] p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#3D2F22] pb-4">
                  <div className="flex items-baseline gap-4">
                    <h2 className="font-mono text-[24px] font-medium text-[#FF8B3D]">{r.version}</h2>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.22em]"
                      style={{ color: STATUS_STYLES[r.status].color }}
                    >
                      {STATUS_STYLES[r.status].label}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <p className="font-mono text-[12px] tabular-nums text-[#C9B19A]">{r.date}</p>
                    {r.binarySize ? (
                      <p className="font-mono text-[11px] text-[#7A5C42]">{r.binarySize}</p>
                    ) : null}
                  </div>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {r.highlights.map((h, i) => (
                    <li key={i} className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7A5C42]">·</span>
                      <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                        {h}
                      </p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-3 md:grid-cols-3">
            {[
              { href: "/orangebox", label: "Back to ORANGEBOX" },
              { href: "/orangebox/roadmap", label: "Roadmap (and anti-roadmap)" },
              { href: "/orangebox/competitors", label: "Competitor comparison" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#3D2F22] bg-[#221A14] p-4 transition-colors hover:border-[#FF8B3D]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7A5C42] transition-colors group-hover:text-[#FF8B3D]">
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
