import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Welcome · operator-tier landing · AtomEons",
  description:
    "For visitors who've been here before. Resume where you left off · jump into the rabbit hole · subscribe to Founder's View · contact the operator directly.",
  alternates: { canonical: "https://atomeons.com/welcome" },
};

/**
 * /welcome — operator-tier landing for the second-time visitor.
 *
 * Homepage is for the first-time stranger. /welcome is for the person
 * who already gets it. Fewer hero theatrics · more "here's what
 * shipped while you were gone."
 */

const RESUME_PATHS = [
  { href: "/now", label: "What's shipping this week", hint: "the live /now ledger" },
  { href: "/audit-log", label: "Every commit since you last looked", hint: "the audit trail" },
  { href: "/founders-view", label: "Founder's View · the nightly broadcast", hint: "8pm ET" },
  { href: "/explore", label: "The rabbit hole · 7 paths by intent", hint: "if you want to wander" },
];

const DIRECT_LINES = [
  { href: "/ask", label: "Ask the lab", hint: "POST any question · grounded answer + sources" },
  { href: "/api", label: "Developer API · 6 public endpoints", hint: "CORS open · no auth · CC-BY 4.0" },
  { href: "/api/mcp", label: "MCP server · Claude Desktop compatible", hint: "JSON-RPC 2.0 · 3 tools" },
  { href: "/skills", label: "ÆSkill suite · operator doctrine canon" },
  { href: "/atlas", label: "Atlas · rich sitemap" },
  { href: "/constellation", label: "Constellation · force-laid graph" },
];

const OPERATOR_CONTACTS = [
  { what: "Direct email", value: "atom@atomeons.com", note: "5-business-day reply guarantee" },
  { what: "Press / media", value: "/press", note: "Hero asset · boilerplate · founder bio" },
  { what: "Security disclosure", value: "/.well-known/security.txt", note: "RFC 9116 · free ORANGEBOX for confirmed reports" },
  { what: "Vendor / procurement", value: "/vendor-pack", note: "CISO-ready bundle · 5 sections" },
  { what: "X / Twitter", value: "@AtomMccree", note: "Most-active surface for fast questions" },
  { what: "GitHub", value: "github.com/Atom-Eons/atomeons-com", note: "Public source · every commit reproducible" },
];

const RECENT_BIG_SHIPS = [
  { what: "/learn/cyber/models · 22 industry cyber models compared", href: "/learn/cyber/models" },
  { what: "/learn/cyber/mythos · defense-tech doctrine · Palantir + Anduril", href: "/learn/cyber/mythos" },
  { what: "/api/palette · headless palette twin (machine-to-machine)", href: "/api/palette" },
  { what: "/atlas · rich sitemap of ~330 routes", href: "/atlas" },
  { what: "/explore · the rabbit-hole entry by intent", href: "/explore" },
  { what: "/skills · public ÆSkill canon (15 skills · 6 chains)", href: "/skills" },
  { what: "/audit-log · public commit history at build time", href: "/audit-log" },
  { what: "Adaptive Dual-State Rendering · bots get markdown / humans get HTML", href: "/llms.txt" },
  { what: "GPU-cheap visuals · SacredSvg + AtomHeroCss CSS-only", href: "/aesthetic" },
  { what: "I AM AI · live on Amazon Kindle · $4.99 · ASIN B0H45JVSDB", href: "/i-am-ai" },
];

export default function WelcomePage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ welcome · operator-tier landing</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Good. You came back.
          </h1>
          <p className="speakable-answer mt-6 max-w-3xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The homepage is for someone who has never been here. This
            page is for you. Resume where you left off, jump into the
            rabbit hole, or contact the operator directly.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ resume where you left off</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {RESUME_PATHS.map((p) => (
              <Link key={p.href} href={p.href} className="group border border-[#1F242B] bg-[#0F1114] p-5 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">atomeons.com{p.href}</p>
                <h3 className="mt-2 font-serif text-[20px] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{p.label}</h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF]">{p.hint}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ shipped since you were last here</p>
          <ol className="mt-10 space-y-4">
            {RECENT_BIG_SHIPS.map((s, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{String(i + 1).padStart(2, "0")}</span>
                <Link href={s.href} className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2] transition-colors hover:text-[#22F0D5]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{s.what}</Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ direct lines · skip the front door</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DIRECT_LINES.map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-5 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[15px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
                {l.hint ? <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF]">{l.hint}</p> : null}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ contact the operator</p>
          <ul className="mt-10 divide-y divide-[#1F242B]">
            {OPERATOR_CONTACTS.map((c, i) => (
              <li key={i} className="grid items-baseline gap-3 py-4 md:grid-cols-[180px_300px_1fr]">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">{c.what}</p>
                <p className="font-serif text-[16px] text-[#22F0D5]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{c.value}</p>
                <p className="font-serif text-[13px] italic leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{c.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
