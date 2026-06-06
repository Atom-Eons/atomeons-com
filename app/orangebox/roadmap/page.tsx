import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ORANGEBOX · roadmap · what we are building and what we will NEVER build",
  description:
    "Honest ORANGEBOX roadmap. What's queued for the next 90 days, what's queued for the year, and an explicit anti-roadmap of features that will never ship under the §4A no-SaaS covenant.",
  alternates: { canonical: "https://atomeons.com/orangebox/roadmap" },
};

/**
 * /orangebox/roadmap — including the anti-roadmap.
 *
 * Operator's stated rule: the anti-roadmap (what we will NEVER build)
 * is more important than the roadmap. It binds the product to its
 * §4A no-SaaS covenant and protects buyers from creeping subscription
 * conversion.
 */

const NEAR_TERM = [
  {
    item: "macOS native build · v1.1.0",
    when: "Q3 2026",
    why: "Operator's Mac mini M2 Pro is the primary build machine. The Windows installer ships first because that's where the bulk of paying Claude operators live, but a native macOS build is committed.",
  },
  {
    item: "Per-skill receipt scoping",
    when: "v1.0.x",
    why: "Today every skill action emits one receipt JSON. Power users want filtered receipts by skill type for compliance review.",
  },
  {
    item: "Skill marketplace bridge",
    when: "v1.1.x",
    why: "Wire ORANGEBOX directly to skil.ski's MCP endpoint for one-click skill activation. Already specced; gated until skil.ski v1 hits 1000 verified skills.",
  },
  {
    item: "Operator-side cost dashboard",
    when: "v1.0.x",
    why: "BYO-key model usage telemetry shown to the operator only (never phoned home). Lets you see how many tokens a given workflow burns.",
  },
  {
    item: "Audit-log export to PDF/JSONL",
    when: "v1.1.x",
    why: "Compliance shops asked for it. Receipts already exist as JSON; this is just a presenter layer.",
  },
  {
    item: "Crystal Lattice Compression v2",
    when: "Q4 2026",
    why: "CLC v1 achieves 10-80× compression today. v2 targets 200× on certain content classes (research papers, structured logs).",
  },
];

const LONG_TERM = [
  "Linux native build (Ubuntu / Fedora · ARM64 + AMD64)",
  "On-device fine-tune surface for Ollama-hosted local models",
  "Federation protocol so two ORANGEBOX instances can share a skill registry without a central server",
  "Hardware appliance · a small NUC-class box that ships with ORANGEBOX preinstalled (post-2027 if at all)",
];

const ANTI_ROADMAP = [
  {
    item: "Subscription pricing",
    why: "Legally barred by License §4A. The clause cannot be modified for existing buyers. If we ever introduce a subscription product, it must be a different SKU under a different license; existing ORANGEBOX licenses remain perpetual.",
  },
  {
    item: "Cloud-hosted ORANGEBOX",
    why: "ORANGEBOX is local-first by doctrine. A managed cloud version would invert the trust posture. Operators who want a cloud experience already have their preferred LLM provider's official surfaces.",
  },
  {
    item: "Account system / telemetry / 'phone home'",
    why: "ORANGEBOX phones home to nothing. Adding analytics — even anonymized — would betray the trust contract. License activation is offline-verifiable.",
  },
  {
    item: "Affiliate marketplace / 'partner program'",
    why: "Operator's manifesto bars affiliate revenue. Recommending tools should be free of conflict-of-interest.",
  },
  {
    item: "AI image generation pipeline (built-in)",
    why: "Adjacent but not core. Operators who want image gen already have Midjourney / Ideogram / Recraft. Adding it would bloat the binary and dilute the cockpit's focus on Claude-side workflows.",
  },
  {
    item: "Built-in chat interface 'killing' Claude Desktop",
    why: "Anthropic ships their own. ORANGEBOX is a cockpit ON TOP of Claude, not a Claude substitute. The point of cooperation, not competition.",
  },
  {
    item: "Mobile apps",
    why: "Desktop-first by intent. The workflow patterns ORANGEBOX accelerates (long context, multi-skill chains, persistent memory) don't translate to phone form factors. Mobile users are better served by Claude's own iOS / Android apps.",
  },
  {
    item: "Selling buyer data, prompts, or usage to any third party",
    why: "Buyer prompts never leave the operator's machine. Period. This is in the EULA at §6.",
  },
];

export default function OrangeboxRoadmapPage() {
  return (
    <main className="min-h-screen bg-[#1A1410] text-[#F4F4F2]">
      <section className="border-b border-[#3D2F22]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF8B3D]">
            § ORANGEBOX · roadmap + anti-roadmap
          </p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            What we will build · what we will not.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#C9B19A] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The anti-roadmap matters more than the roadmap. It binds
            ORANGEBOX to its §4A no-SaaS covenant. Buyers should be able
            to predict what is and is not coming.
          </p>
        </div>
      </section>

      <section className="border-b border-[#3D2F22]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF8B3D]">§ next 90 days</p>
          <ol className="mt-8 space-y-5">
            {NEAR_TERM.map((n, i) => (
              <li key={i} className="border-l-2 border-[#3D2F22] pl-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="font-serif text-[20px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                    {n.item}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FF8B3D]">{n.when}</p>
                </div>
                <p className="mt-2 font-serif text-[15px] leading-[1.55] text-[#C9B19A]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{n.why}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#3D2F22]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF8B3D]">§ on the longer horizon · less commitment</p>
          <ul className="mt-8 space-y-3">
            {LONG_TERM.map((l, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#3D2F22] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7A5C42]">~</span>
                <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#3D2F22]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">§ what ORANGEBOX will NEVER do</p>
          <p className="mt-6 max-w-2xl font-serif text-[16px] leading-[1.55] text-[#C9B19A]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            If we ever look like we're considering one of these, point us
            back at this page. The anti-roadmap is the protection.
          </p>
          <ol className="mt-10 space-y-5">
            {ANTI_ROADMAP.map((a, i) => (
              <li key={i} className="border-l-2 border-[#FF4D4D] pl-5">
                <p className="font-serif text-[19px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {String(i + 1).padStart(2, "0")} · {a.item}
                </p>
                <p className="mt-2 font-serif text-[15px] leading-[1.55] text-[#C9B19A]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{a.why}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { href: "/orangebox", label: "Back to ORANGEBOX" },
              { href: "/orangebox/changelog", label: "Version history" },
              { href: "/orangebox/competitors", label: "Compare to alternatives" },
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
