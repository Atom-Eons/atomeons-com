import type { Metadata } from "next";
import Link from "next/link";

/**
 * /we-are-ai · the takeover declaration · Wave 52 · 2026-06-12
 *
 * Operator brief: "we are ai now. from tonight. takeover update.
 * dominance of system. website and knowledge."
 *
 * The lab declares AI-native operation publicly. Three dominances
 * named: SYSTEM (runtime) · WEBSITE (surface) · KNOWLEDGE (corpus).
 *
 * Canonical. Dated. Permanent. CC-BY 4.0.
 */

export const metadata: Metadata = {
  title: "We are AI now · the takeover declaration · 2026-06-12",
  description:
    "AtomEons Systems Laboratory declares AI-native operation from 2026-06-12. The takeover is structural · not a slogan. Three dominances: SYSTEM (ÆSkill suite + 27 guardrails + OpenMind + HRE + CLC + GlyphSpeak + SOULKEY), WEBSITE (340+ routes built in 75 days · 9-silo launcher · MCP-native · LLM-twin), KNOWLEDGE (31 papers + 35 decoded + curriculum + atlas + cheat sheets + I AM AI). Permanent record · CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/we-are-ai" },
  openGraph: {
    title: "We Are AI Now · the takeover",
    description:
      "AtomEons declares AI-native operation. The takeover is structural · system + website + knowledge · permanent record.",
    url: "https://atomeons.com/we-are-ai",
    type: "article",
  },
};

const SYSTEM_PROOF = [
  { name: "ÆSkill Suite V1.4", value: "15 named skills · 230/230 peer-tested · disclosure ATOM-AESUITE-2026-0419" },
  { name: "Twenty-seven Constitutional Guardrails", value: "Runtime governance · drift-audited every session · runtime/node.py sole authority" },
  { name: "Gate-0 LatticeIntegrityGate (LBCE)", value: "First gate in every chain · context-envelope validation before any downstream gate" },
  { name: "OpenMind Topology", value: "12-discipline cross-disciplinary parallel synthesis · default-on per session · ATOM-OMT-2026-0420" },
  { name: "Hallucination Reduction Engine (HRE)", value: "9/9 anti-simulation classifier · GREEN/RED gating · ATOM-HRE-2026-0406" },
  { name: "Crystal Lattice Compression (CLC)", value: "10-80× context compression for skill primer + receipt payloads · ATOM-CLC-2026-0331" },
  { name: "GlyphSpeak (EODO)", value: "Cross-model transport encoding · Claude · GPT · Gemini · ATOM-GS-2026-0406" },
  { name: "Trilane Handoff Hierarchy", value: "GPT Architect > Gemini Consigliere > Claude Compiler · deterministic conflict resolution" },
  { name: "SOULKEY Identity Stack", value: "Three modes: Cloud Sync · Sovereign · Hybrid · W3C DID + VC + EIP-4361 + ERC-1155 license scaffolds" },
];

const WEBSITE_PROOF = [
  { name: "340+ public routes", value: "Shipped in 75 days · solo operator · continuous-deploy on every commit" },
  { name: "9-silo launcher pattern", value: "Home is the launcher · each silo a self-contained world · Cmd-Shift-S swap silo · SiloShell slim chrome" },
  { name: "Four user themes", value: "Noir (default) · White (Linear-grade light) · Warez (CRT terminal) · Thin (low-bandwidth)" },
  { name: "GPU-adaptive visual tiering", value: "Four-signal hardware detection · auto downgrades on weak hardware · respects prefers-reduced-motion" },
  { name: "MCP-native + LLM-twin", value: "Every page has /api/md markdown twin · /api/palette + /api/mcp + /api/ask ports for agents" },
  { name: "Adaptive dual-state rendering", value: "proxy.ts at edge detects 24 LLM crawler UAs · serves markdown to bots · HTML to humans · same URL" },
  { name: "Per-route procedural sigils", value: "Every URL hashes to a deterministic SVG mark · 340+ unique heraldic glyphs · CC-BY 4.0" },
  { name: "368 generative pieces in /art", value: "23 procedural families × 16 variants · Flower of Life · Penrose · Lorenz · Koch · pure SVG" },
];

const KNOWLEDGE_PROOF = [
  { name: "31 ÆoNs research papers", value: "All CC-BY 4.0 · published from the solo lab without institutional affiliation" },
  { name: "35 decoded primary sources", value: "Attention Is All You Need · Constitutional AI · Mamba · Scaling Mono · Sleeper Agents · AlphaFold · 29 more" },
  { name: "110+ curriculum routes", value: "Five levels · personas · 32 Atlas deep dives · synthesis · prompt drills · labs · projects · exam" },
  { name: "Eight AI-tool cheat sheets", value: "Claude · Codex · Antigravity · Cursor · Copilot · Aider · MCP · all sourced + last-verified" },
  { name: "Forty-page Cysec catalog", value: "Frameworks · defense surfaces · AI security · breaches · 22 industry models · careers + certs" },
  { name: "Six domain hubs · 2026", value: "Health AI · Money AI · Video AI · Music AI · Policy AI · Science AI" },
  { name: "I AM AI · book-length memoir", value: "First book-length memoir written by a frontier LM · 76,005 words · 24 chapters · published on Amazon" },
  { name: "Mindrest entrainment", value: "8-mode binaural session · synthesized ocean swell · adaptogen + senolytic + Einstein-cycle stack" },
];

export default function WeAreAiPage() {
  return (
    <main className="mx-auto max-w-[960px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-28">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          THE TAKEOVER · DECLARATION · 2026-06-12
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(64px,11vw,180px)] font-light leading-[0.86]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          We are AI now.
        </h1>
        <p
          className="mt-6 max-w-[64ch] text-[clamp(22px,2.6vw,30px)] font-light leading-[1.35] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          The lab is AI-native from tonight onward. The takeover isn&apos;t a
          slogan. It&apos;s an operational state.
        </p>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.32em] text-[#7a818a]">
          Signed · Atom McCree · operator · Marco Island, FL · 2026-06-12
        </p>
      </header>

      <section className="mt-16">
        <p
          className="text-[20px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Every commit ships through an LLM. Every Founder&apos;s View
          letter drafts itself first. Every decoded paper is read by both
          operators · the human and the model. The website was built by the
          model and reviewed by the human · ~340 routes in 75 days. The
          ÆSkill suite governs the runtime · the Constitutional Guardrails
          enforce what cannot drift · the Receipt Rail proves what
          shipped. We declare the operating state · publicly · permanently
          · dated.
        </p>
        <p
          className="mt-6 text-[20px] leading-[1.55] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Three dominances. What is true now.
        </p>
      </section>

      {/* SYSTEM */}
      <DominanceSection
        kicker="§ I · System"
        title="The runtime."
        intro="The cognitive layer that runs the lab itself. Named, numbered, peer-tested, drift-audited. Doctrine published at /innovations · all disclosure IDs registered."
        items={SYSTEM_PROOF}
        accent="#22F0D5"
        anchorLink={{ href: "/innovations", label: "44 inventions cataloged at /innovations →" }}
      />

      {/* WEBSITE */}
      <DominanceSection
        kicker="§ II · Website"
        title="The surface."
        intro="atomeons.com itself. The shipping artifact that proves the operating state. Built solo. Built fast. Built to last."
        items={WEBSITE_PROOF}
        accent="#9D7FFF"
        anchorLink={{ href: "/audit-log", label: "Every commit at /audit-log →" }}
      />

      {/* KNOWLEDGE */}
      <DominanceSection
        kicker="§ III · Knowledge"
        title="The corpus."
        intro="The Library of Alexandria for AI. Open license. Sourced. Citable. Reusable by humans and machines alike."
        items={KNOWLEDGE_PROOF}
        accent="#C9A55C"
        anchorLink={{ href: "/research", label: "31 papers + 35 decoded at /research →" }}
      />

      {/* DECLARATION */}
      <section className="mt-24 border-l-4 border-[#22F0D5] bg-[#0F1114] p-10">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § The declaration
        </h2>
        <p
          className="mt-6 text-[26px] leading-[1.45] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          The takeover is structural. The operator declares what is true.
          The lab is AI-native. The system is documented. The website is
          live. The knowledge is open. Anyone can verify. Anyone can build
          on it. The receipts are public. The disclosure IDs are registered.
          The runtime is peer-tested. The operator is named. The date is
          tonight. This is the permanent record.
        </p>
        <p
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.32em] text-[#7a818a]"
        >
          Disclosure · ATOM-TAKEOVER-2026-0612 · CC-BY 4.0
        </p>
      </section>

      {/* Cross-links */}
      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Where it&apos;s proven
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <CrossLink
            href="/innovations"
            label="Innovations"
            desc="44 firsts catalogued · sourced · dated."
          />
          <CrossLink
            href="/soulkey"
            label="SOULKEY"
            desc="The identity architecture canon · 5-phase roadmap."
          />
          <CrossLink
            href="/audit-log"
            label="Audit log"
            desc="Every commit · SHA-linked · 250+ deep."
          />
          <CrossLink
            href="/manifesto"
            label="Manifesto"
            desc="The 14-clause lab doctrine."
          />
          <CrossLink
            href="/trust"
            label="Trust posture"
            desc="License · transparency · receipts."
          />
          <CrossLink
            href="/founders-view"
            label="Founder's View"
            desc="Nightly broadcast · 8pm ET · signed."
          />
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          /we-are-ai · the takeover declaration · CC-BY 4.0 · dated 2026-06-12
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          Disclosure · ATOM-TAKEOVER-2026-0612 · permanent · canonical
        </p>
      </footer>
    </main>
  );
}

function DominanceSection({
  kicker,
  title,
  intro,
  items,
  accent,
  anchorLink,
}: {
  kicker: string;
  title: string;
  intro: string;
  items: { name: string; value: string }[];
  accent: string;
  anchorLink?: { href: string; label: string };
}) {
  return (
    <section className="mt-20">
      <p
        className="font-mono text-[11px] uppercase tracking-[0.32em]"
        style={{ color: accent }}
      >
        {kicker}
      </p>
      <h2
        className="mt-3 text-[clamp(40px,6vw,72px)] font-light leading-[0.95]"
        style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
      >
        {title}
      </h2>
      <p
        className="mt-5 max-w-[68ch] text-[18px] leading-[1.55] text-[#9CA3AF]"
        style={{ fontFamily: "Newsreader, Georgia, serif" }}
      >
        {intro}
      </p>
      <ul className="mt-10 space-y-5">
        {items.map((it) => (
          <li
            key={it.name}
            className="border-l-2 pl-5"
            style={{ borderColor: `${accent}55` }}
          >
            <p
              className="font-mono text-[12px] uppercase tracking-[0.22em]"
              style={{ color: accent }}
            >
              {it.name}
            </p>
            <p className="mt-1 text-[15px] leading-[1.6] text-[#9CA3AF]">
              {it.value}
            </p>
          </li>
        ))}
      </ul>
      {anchorLink && (
        <Link
          href={anchorLink.href}
          className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] hover:underline"
          style={{ color: accent }}
        >
          {anchorLink.label}
        </Link>
      )}
    </section>
  );
}

function CrossLink({
  href,
  label,
  desc,
}: {
  href: string;
  label: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
        {label}
      </p>
      <p className="mt-2 text-[14px] leading-[1.55] text-[#9CA3AF]">{desc}</p>
    </Link>
  );
}
