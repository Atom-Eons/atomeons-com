import type { Metadata } from "next";
import Link from "next/link";

/**
 * /orange5 · Wave 147b · 2026-07-02 · Preview page for Orange5.
 *
 * Orange5 is the sovereign AI operator OS · spec locked 2026-06-23 ·
 * BUILD UNDERWAY. Distinct from Orange³ (the agentic OS for Claude
 * at /orangebox). Orange5 is the new-generation four-pillar system:
 * Orange5 + Atomic Orange + OrangeLLM + Flow, over Hermes.
 */

export const metadata: Metadata = {
  title: "Orange5 · sovereign AI operator OS · spec locked · build underway",
  description:
    "Orange5 is the free, local-first, sovereign AI operator OS conducted by a trained OrangeLLM PM brain. One machine, 1000+ parts working, codeless at the operator surface, $0. Four pillars: Orange5, Atomic Orange, OrangeLLM, Flow — over Hermes bounded execution.",
  alternates: { canonical: "https://atomeons.com/orange5" },
  openGraph: {
    title: "Orange5 · sovereign AI operator OS",
    description: "Codeless. Local-first. One machine. 1000+ parts. $0.",
    url: "https://atomeons.com/orange5",
    type: "website",
  },
};

const H = {
  paper: "#F7F5F0",
  paperWarm: "#EFEBE2",
  ink: "#0A0A0A",
  inkSoft: "#3D3833",
  inkMuted: "#6B6560",
  inkWhisper: "#9B9490",
  hair: "#D9D3C7",
  orange: "#E36A18",
  orangeDeep: "#B94F0B",
};

const PILLARS = [
  { name: "Orange5", role: "The system", detail: "Free, local-first, sovereign AI operator OS. Runs on one machine. 1000+ parts working together. Codeless at the operator surface. $0. Conducted by a trained OrangeLLM PM brain." },
  { name: "Atomic Orange", role: "The UI face", detail: "Hosts swappable frontier models (BYO-key). Tauri shell. WebGL LivingCore molten sun cockpit. The interface layer humans touch." },
  { name: "OrangeLLM", role: "The PM brain", detail: "Fused light-model (N150 always-warm) + heavy-model (Codexa always-hot). Only path to the superstack. The gateway." },
  { name: "Flow", role: "Orchestration runtime", detail: "Currents, agents, deltas, governors. Where mission graphs actually execute." },
];

const LAWS = [
  { n: "1", name: "Frontier-Isolation", detail: "Frontier models touch only OrangeLLM, never Orange5 internals." },
  { n: "2", name: "LLM-Over-Agent", detail: "LLMs spawn agents under Hermes leases. Agents don't spawn LLMs." },
  { n: "3", name: "OrangeLLM-Is-The-Gateway", detail: "Only path to the superstack, tools, and Visual." },
  { n: "4", name: "Codeless", detail: "No IDE, no editor, no autocomplete at the operator surface." },
];

export default function Orange5Page() {
  return (
    <main style={{ background: H.paper, color: H.ink, minHeight: "100vh" }}>
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-16 sm:pt-32">
        <nav
          className="text-[11px] tracking-[0.16em] uppercase"
          style={{ color: H.inkWhisper }}
        >
          <Link href="/" style={{ color: H.inkMuted }} className="hover:underline">::atomeons</Link>{" · "}
          <span>orange5</span>
        </nav>

        <p
          className="mt-20 text-[11px] font-medium tracking-[0.32em] uppercase"
          style={{ color: H.orangeDeep }}
        >
          ::build underway · spec locked 2026-06-23 · Sovereign: Atom McCree
        </p>
        <h1
          className="mt-4 text-[clamp(56px,9vw,120px)] font-light leading-[0.96] tracking-[-0.035em] text-balance"
          style={{ color: H.ink, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif', maxWidth: "18ch" }}
        >
          Orange5.
        </h1>
        <p
          className="mt-2 text-[clamp(22px,3vw,36px)] font-light leading-[1.1]"
          style={{ color: H.inkSoft, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}
        >
          The sovereign AI operator OS.
        </p>

        <div className="mt-8 h-2 w-full max-w-md rounded-sm" style={{ background: `linear-gradient(90deg, ${H.orange}, ${H.orangeDeep})` }} />

        <p
          className="mt-10 max-w-[62ch] text-[19px] leading-[1.65]"
          style={{ color: H.inkMuted, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}
        >
          Free. Local-first. Sovereign. Runs on <strong style={{ color: H.ink }}>one machine</strong>. Has <strong style={{ color: H.ink }}>1000+ parts working</strong>. Codeless at the operator surface. Charges <strong style={{ color: H.ink }}>$0</strong>. Conducted by a trained <strong style={{ color: H.ink }}>OrangeLLM</strong> project-manager brain.
        </p>

        {/* Four pillars */}
        <section id="pillars" className="mt-20">
          <p className="text-[11px] font-medium tracking-[0.32em] uppercase" style={{ color: H.inkWhisper }}>
            ::the four pillars
          </p>
          <h2
            className="mt-3 text-[32px] font-light leading-tight tracking-[-0.02em]"
            style={{ color: H.ink, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}
          >
            What Orange5 is made of.
          </h2>
          <ul
            className="ae-stagger mt-8 grid gap-4 sm:grid-cols-2"
            style={{ ["--stagger-step" as string]: "80ms" } as React.CSSProperties}
          >
            {PILLARS.map((p, i) => (
              <li
                key={p.name}
                className="ae-reveal-up"
                style={{
                  background: H.paperWarm,
                  border: `1px solid ${H.hair}`,
                  borderRadius: 12,
                  padding: "22px 24px",
                  ["--stagger-index" as string]: i,
                } as React.CSSProperties}
              >
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: H.orangeDeep }}>
                  {p.role}
                </p>
                <h3
                  className="mt-2 text-[28px] font-light leading-tight tracking-[-0.015em]"
                  style={{ color: H.ink, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}
                >
                  {p.name}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.55]" style={{ color: H.inkMuted, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}>
                  {p.detail}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[62ch] text-[16px] leading-[1.6]" style={{ color: H.inkMuted, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}>
            Underneath: <strong style={{ color: H.ink }}>Hermes</strong> — the bounded agentic execution layer.
          </p>
        </section>

        {/* Four laws */}
        <section id="laws" className="mt-20">
          <p className="text-[11px] font-medium tracking-[0.32em] uppercase" style={{ color: H.inkWhisper }}>
            ::the four laws · non-negotiable
          </p>
          <h2
            className="mt-3 text-[32px] font-light leading-tight tracking-[-0.02em]"
            style={{ color: H.ink, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}
          >
            How Orange5 stays honest.
          </h2>
          <ul className="mt-8 space-y-4">
            {LAWS.map((law) => (
              <li key={law.n} className="flex gap-5 border-l-2 pl-5" style={{ borderColor: `${H.orange}55` }}>
                <span className="text-[24px] font-light" style={{ color: H.orangeDeep, fontFamily: 'Newsreader, Georgia, serif' }}>
                  {law.n}
                </span>
                <div>
                  <p className="text-[17px] font-medium" style={{ color: H.ink, fontFamily: 'Newsreader, Georgia, serif' }}>
                    {law.name}
                  </p>
                  <p className="mt-1 text-[15px] leading-[1.55]" style={{ color: H.inkMuted, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}>
                    {law.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Status */}
        <section id="status" className="mt-20 border-t pt-14" style={{ borderColor: H.hair }}>
          <p className="text-[11px] font-medium tracking-[0.32em] uppercase" style={{ color: H.orangeDeep }}>
            ::status · spec locked · build underway
          </p>
          <h2
            className="mt-3 text-[32px] font-light leading-tight tracking-[-0.02em]"
            style={{ color: H.ink, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}
          >
            Coming into public view.
          </h2>
          <p className="mt-4 max-w-[62ch] text-[17px] leading-[1.6]" style={{ color: H.inkMuted, fontFamily: 'Newsreader, "Source Serif Pro", Georgia, serif' }}>
            Spec locked 2026-06-23. 16 PRs in the build sequence. The <Link href="/orangebox" style={{ color: H.orangeDeep }} className="hover:underline">Orange³</Link> agentic OS is the current-generation predecessor — production-ready, deployed, and free today. Orange5 is the next-generation four-pillar system.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/orangebox"
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium"
              style={{ background: H.ink, color: H.paper, borderRadius: 10 }}
            >
              Get Orange³ today →
            </Link>
            <a
              href="mailto:a.mccree@gmail.com?subject=%5BOrange5%5D%20notify%20me%20on%20launch"
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium"
              style={{ color: H.ink, border: `1px solid ${H.hair}`, borderRadius: 10 }}
            >
              Notify me on Orange5 launch
            </a>
            <a
              href="https://discord.gg/4wx3AGga"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium"
              style={{ color: H.ink, border: `1px solid ${H.hair}`, borderRadius: 10 }}
            >
              Discord workshop
            </a>
          </div>
        </section>

        <div className="mt-24 border-t pt-8 text-[13px]" style={{ borderColor: H.hair, color: H.inkWhisper }}>
          <p>AtomEons Systems Laboratory · Naples · FL · 2026</p>
        </div>
      </div>
    </main>
  );
}
