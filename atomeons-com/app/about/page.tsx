import Link from "next/link";

export const metadata = {
  title: "About — ÆoNs Research Lab",
  description:
    "AtomEons Systems Laboratory is the solo lab of Atom McCree in Marco Island, Florida — building private, local-first execution surfaces for serious AI-assisted projects.",
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
      <p className="text-xs uppercase tracking-[0.18em] text-[#a7b8ad]">
        ÆoNs Research Lab
      </p>
      <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
        About AtomEons.
      </h1>

      <p className="mt-6 text-lg text-[#a7b8ad]">
        AtomEons Systems Laboratory is the solo lab of{" "}
        <span className="text-[#f7f0e4]">Atom McCree</span> — independent
        founder and researcher operating out of Marco Island, Florida.
      </p>

      <p className="mt-3 text-lg text-[#a7b8ad]">
        Every AI tool I tried put the operator inside the model&apos;s
        context. I wanted the operator outside it, with a real cockpit. So I
        built one.
      </p>

      <p className="mt-3 text-lg text-[#a7b8ad]">
        The lab now ships private, local-first execution surfaces for one
        operator running serious AI-assisted projects.
      </p>

      <hr className="my-12 border-[#204538]" />

      <section>
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          What we make
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          One execution surface. Built for the lab, not the market.
        </h2>
        <p className="mt-4 text-[#a7b8ad]">
          Most AI tooling is either a chatbox or a dashboard built for the
          demo, not the work. Neither is enough for someone actually running
          a serious project across many AI workers, models, and machines.
          The operator gets drowned in context, terminal noise, and
          unverified claims.
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
          Five rules. They run the lab.
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
          The full Opus system manual ships inside the box. $49 one-time,
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
            Buy · $49
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
          AtomEons does not run a support desk. The lab ships, then ships
          again. Read the manual that comes inside ORANGEBOX before
          asking.
        </p>
        <p className="mt-3 text-sm text-[#f7f0e4]">
          If you have a real question about what ORANGEBOX does or does
          not do, send it. I read every email. I do not promise to reply.
        </p>
      </section>
    </main>
  );
}
