import Link from "next/link";

export const metadata = {
  title: "About — AtomEons",
  description:
    "AtomEons is Atom McCree, building command surfaces for operators shipping real projects through AI — software, books, apps, LLMs. Marco Island, Florida.",
  alternates: { canonical: "https://atomeons.com/about" },
  openGraph: {
    title: "About — AtomEons",
    description:
      "One operator. AI cockpits, frontier-science research, an indie-lab broadcast. Marco Island, FL.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — AtomEons",
    description: "One operator. AI cockpits + frontier-science research.",
  },
};

type Doctrine = { num: string; serial: string; title: string; body: string };

const DOCTRINE: Doctrine[] = [
  {
    num: "01",
    serial: "PILLAR-01-2026",
    title: "One organism, many lenses",
    body: "AtomEons is treated as one coherent system, not a pile of unrelated apps. Every surface respects every other.",
  },
  {
    num: "02",
    serial: "PILLAR-02-2026",
    title: "Truth over elegant fiction",
    body: "Observed, inferred, speculative, and desired are kept distinct. Claims need receipts. No fake green.",
  },
  {
    num: "03",
    serial: "PILLAR-03-2026",
    title: "Anti-sprawl",
    body: "Reject everything-app drift. One major objective at a time. Bounded execution beats swarm theater.",
  },
  {
    num: "04",
    serial: "PILLAR-04-2026",
    title: "Premium coherence",
    body: "Calm. Legible. Confident. The cockpit is an instrument panel, not a transcript dump.",
  },
  {
    num: "05",
    serial: "PILLAR-05-2026",
    title: "Full effort, every time",
    body: "Every output earns its place. No coasting on the quiet stuff. No padding on the loud stuff.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://atomeons.com/about" },
  ],
};

export default function About() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-16 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]">
        ::about the lab · software · books · apps · LLMs
      </p>
      {/* Wave 138 · about hero elevated. Former "About AtomEons." →
          real claim in the operator voice. Live signals nameplate below. */}
      <h1
        className="mt-6 max-w-[22ch] text-balance text-[clamp(48px,7vw,96px)] font-light leading-[1.02] tracking-[-0.025em] text-[#F4F4F2]"
        style={{ fontFamily: "Newsreader, Georgia, serif" }}
      >
        One operator. One lab. Marco Island.
      </h1>
      <div
        role="list"
        aria-label="Lab signals"
        className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em]"
      >
        <span role="listitem" className="inline-flex items-center gap-2">
          <span aria-hidden className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_8px_#22F0D5]" />
          <span className="text-[#22F0D5]">LIVE</span>
        </span>
        <span role="listitem" className="text-[#B5BBC0]">est. 2024</span>
        <span role="listitem" className="text-[#B5BBC0]">319 <span className="text-[#8E969D]">routes</span></span>
        <span role="listitem" className="text-[#B5BBC0]">12 <span className="text-[#8E969D]">CC-BY papers</span></span>
        <span role="listitem" className="text-[#B5BBC0]">3 <span className="text-[#8E969D]">free products</span></span>
        <span role="listitem" className="text-[#B5BBC0]">1 <span className="text-[#8E969D]">book · Opus 4.7</span></span>
        <span role="listitem" className="text-[#8E969D]">Marco Island · FL</span>
      </div>

      <p className="mt-10 max-w-[68ch] font-serif text-[19px] leading-[1.6] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
        Atom McCree built AtomEons Systems Laboratory in Marco Island,
        Florida, to solve one problem: no existing AI tool let the
        operator stay outside the model&apos;s context while still running
        a real project through it. The cockpit — Orange³ — is what came
        out of that gap.
      </p>

      <p className="mt-4 max-w-[68ch] font-serif text-[19px] leading-[1.6] text-[#B5BBC0]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
        The lab also publishes twelve research manuscripts under CC-BY 4.0,
        ranging from bioelectric oncology to a topological field theory of
        self-modifying systems, and broadcasts a nightly editorial at 8pm
        Eastern.
      </p>

      <p className="mt-4 max-w-[68ch] font-serif text-[19px] leading-[1.6] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
        One operator. No team. No deck. The receipts are the proof.
      </p>

      <hr className="my-12 border-[#1F242B]" />

      <section>
        <p className="text-xs uppercase tracking-widest text-[#22F0D5]">
          What the lab ships
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          The cockpit for operators who ship.
        </h2>
        <p className="mt-4 text-[#a7b8ad]">
          Most AI tooling is a chatbox or a dashboard. Neither survives
          contact with a real project across many AI workers, models, and
          machines. The operator gets drowned in context, terminal noise,
          and unverified claims.
        </p>
        <p className="mt-3 text-[#a7b8ad]">
          AtomEons builds the layer above. One mission thread per project.
          Structured department status. Real receipts. Model lane routing.
          Worker rails. Proof gates. The operator sees what is happening,
          what is verified, what is blocked, and what to do next — without
          losing control or clarity.
        </p>
      </section>

      <hr className="my-12 border-[#1F242B]" />

      <section>
        <p className="text-xs uppercase tracking-widest text-[#22F0D5]">
          Doctrine
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          Five rules. They run the build.
        </h2>
        <div
          className="ae-stagger mt-8 grid gap-4 md:grid-cols-2"
          style={{ ["--stagger-step" as string]: "80ms" }}
        >
          {DOCTRINE.map((d, i) => (
            <div
              key={d.serial}
              className="ae-reveal-up group relative overflow-hidden rounded-xl border border-[#1F242B] bg-[#0F1114] p-5 transition-colors hover:border-[#22F0D5]/40"
              style={{ ["--stagger-index" as string]: i }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-6 select-none font-mono text-[80px] font-black leading-none text-[#0F1114] transition-colors group-hover:text-[#1a3026]"
              >
                {d.num}
              </span>
              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
                  {d.serial}
                </p>
                <h3 className="mt-2 text-lg font-bold text-[#22F0D5]">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm text-[#a7b8ad]">{d.body}</p>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-[#1b8b75]">
                  ::filed 2026-05 · marco island
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-12 border-[#1F242B]" />

      <section>
        <p className="text-xs uppercase tracking-widest text-[#22F0D5]">
          Currently shipping
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          Orange³, v1.0.0.
        </h2>
        <p className="mt-4 text-[#a7b8ad]">
          The sovereign agentic operating system for Claude. v1.0.0 shipped
          2026-06-12 — persistent memory, 10-80× context compression,
          skill primers, tamper-evident receipts, 14-department routing.
          Free always. License §4A bans subscription. 30-day Material
          Failure Guarantee. Orange³.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/orangebox"
            className="rounded-md border border-[#22F0D5] bg-[#22F0D5] px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-[#ffc46b]"
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
          >
            See Orange³ →
          </Link>
          <Link
            href="/orangebox#download"
            className="rounded-md border border-[#1F242B] bg-[#0F1114] px-4 py-2 text-sm font-semibold text-[#f7f0e4]"
          >
            Download · free
          </Link>
        </div>
      </section>

      <hr className="my-12 border-[#1F242B]" />

      <section>
        <p className="text-xs uppercase tracking-widest text-[#22F0D5]">
          Æ Research
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          The lab also publishes papers.
        </h2>
        <p className="mt-4 text-[#a7b8ad]">
          ÆoNs Research is the publishing arm. Twelve manuscripts as of
          April 2026 covering bioelectric oncology, the gut-brain
          mislabel hypothesis, solar information transfer, the
          topological field theory of self-modifying systems, and
          quantum-classical unification through a sinusoidal light code
          substrate. Every paper carries an academic abstract AND a
          plain-language summary side by side. CC-BY 4.0.
        </p>
        <p className="mt-3 text-[#a7b8ad]">
          There is also a nightly broadcast, <span className="text-[#22F0D5]">The Founder&apos;s View</span>.
          Publishes at 8pm Eastern. Real events. Editorial is satire.
          No edits before publication — only retracts after, with the reason stated.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/research/about"
            className="rounded-md border border-[#22F0D5] bg-[#22F0D5] px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-[#5FF7E1]"
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
          >
            About the lab →
          </Link>
          <Link
            href="/research/papers"
            className="rounded-md border border-[#1F242B] bg-[#0F1114] px-4 py-2 text-sm font-semibold text-[#f7f0e4]"
          >
            12 papers
          </Link>
          <Link
            href="/founders-view"
            className="rounded-md border border-[#1F242B] bg-[#0F1114] px-4 py-2 text-sm font-semibold text-[#f7f0e4]"
          >
            The Founder&apos;s View · 8pm ET
          </Link>
        </div>
      </section>

      <hr className="my-12 border-[#1F242B]" />

      <section>
        <p className="text-xs uppercase tracking-widest text-[#22F0D5]">
          Contact
        </p>
        <p className="mt-3 text-[#f7f0e4]">
          For business:{" "}
          <a href="mailto:a.mccree@gmail.com">a.mccree@gmail.com</a>
        </p>
        <p className="mt-1 text-sm text-[#a7b8ad]">
          AtomEons does not run a support desk. I ship, then ship again.
          Read the manual that comes inside Orange³ before asking.
        </p>
        <p className="mt-3 text-sm text-[#f7f0e4]">
          If you have a real question about what Orange³ does or does
          not do, send it. I read every email. I do not promise to reply.
        </p>
      </section>
    </main>
  );
}
