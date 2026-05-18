import Link from "next/link";

export const metadata = {
  title: "About — AtomEons",
  description:
    "AtomEons is Atom McCree, building command surfaces for operators shipping real projects through AI — software, books, apps, LLMs. Marco Island, Florida.",
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

export default function About() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-16 pb-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#a7b8ad]">
        Software · Books · Apps · LLMs
      </p>
      <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
        About AtomEons.
      </h1>

      <p className="mt-6 text-lg text-[#a7b8ad]">
        <span className="text-[#f7f0e4]">Atom McCree</span>. AtomEons Systems
        Laboratory, Marco Island, FL. One operator. One cockpit. Built it
        because nothing else held the thread.
      </p>

      <p className="mt-3 text-lg text-[#a7b8ad]">
        Every AI tool I tried put the operator inside the model&apos;s
        context. I wanted the operator outside it, with a real cockpit. So
        I built one.
      </p>

      <p className="mt-3 text-lg text-[#a7b8ad]">
        I ship private, local-first command surfaces for builders who
        refuse to lose the thread.
      </p>

      <hr className="my-12 border-[#204538]" />

      <section>
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
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

      <hr className="my-12 border-[#204538]" />

      <section>
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          Doctrine
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          Five rules. They run the build.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {DOCTRINE.map((d) => (
            <div
              key={d.serial}
              className="group relative overflow-hidden rounded-xl border border-[#204538] bg-[#071915] p-5 transition-colors hover:border-[#ff7a18]/40"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-6 select-none font-mono text-[80px] font-black leading-none text-[#0a211b] transition-colors group-hover:text-[#1a3026]"
              >
                {d.num}
              </span>
              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
                  {d.serial}
                </p>
                <h3 className="mt-2 text-lg font-bold text-[#ff7a18]">
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

      <hr className="my-12 border-[#204538]" />

      <section>
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          Currently shipping
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          ORANGEBOX, prototype.
        </h2>
        <p className="mt-4 text-[#a7b8ad]">
          A private command cockpit for one operator. Single ZIP. Node
          18+. Runs locally on{" "}
          <span className="font-mono text-[#75ff92]">127.0.0.1:8787</span>.
          The full Opus system manual ships inside the box. $1 one-time,
          no support. You figure it out.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/orangebox"
            className="rounded-md border border-[#ff7a18] bg-[#ff7a18] px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-[#ffc46b]"
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
          >
            See ORANGEBOX →
          </Link>
          <Link
            href="/orangebox#buy"
            className="rounded-md border border-[#204538] bg-[#071915] px-4 py-2 text-sm font-semibold text-[#f7f0e4]"
          >
            Buy · $1
          </Link>
        </div>
      </section>

      <hr className="my-12 border-[#204538]" />

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
          There is also a nightly broadcast, <span className="text-[#FF7A1A]">The Founder&apos;s View</span>,
          that publishes at 8pm Eastern. Anthropic Sonnet writes it.
          No human edits before publication. Subscribe by RSS or bookmark.
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
            className="rounded-md border border-[#204538] bg-[#071915] px-4 py-2 text-sm font-semibold text-[#f7f0e4]"
          >
            12 papers
          </Link>
          <Link
            href="/founders-view"
            className="rounded-md border border-[#204538] bg-[#071915] px-4 py-2 text-sm font-semibold text-[#f7f0e4]"
          >
            The Founder&apos;s View · 8pm ET
          </Link>
        </div>
      </section>

      <hr className="my-12 border-[#204538]" />

      <section>
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          Contact
        </p>
        <p className="mt-3 text-[#f7f0e4]">
          For business:{" "}
          <a href="mailto:a.mccree@gmail.com">a.mccree@gmail.com</a>
        </p>
        <p className="mt-1 text-sm text-[#a7b8ad]">
          AtomEons does not run a support desk. I ship, then ship again.
          Read the manual that comes inside ORANGEBOX before asking.
        </p>
        <p className="mt-3 text-sm text-[#f7f0e4]">
          If you have a real question about what ORANGEBOX does or does
          not do, send it. I read every email. I do not promise to reply.
        </p>
      </section>
    </main>
  );
}
