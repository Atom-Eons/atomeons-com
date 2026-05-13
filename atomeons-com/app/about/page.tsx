import Link from "next/link";

export const metadata = {
  title: "About — ÆoNs Research Lab",
  description:
    "AtomEons Systems Laboratory is the solo lab of Atom McCree in Marco Island, Florida — building private, local-first execution surfaces for serious AI-assisted projects.",
};

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
        The lab builds private, local-first execution surfaces for one
        operator running serious AI-assisted projects.
      </p>

      <hr className="my-12 border-[#204538]" />

      <section>
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          What we make
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          Cockpits, not chatbots.
        </h2>
        <p className="mt-4 text-[#a7b8ad]">
          Most AI tooling is either a chat box or a developer dashboard.
          Neither is enough for someone actually running a serious project
          across many AI workers, models, and machines. The operator gets
          drowned in context, terminal noise, and unverified claims.
        </p>
        <p className="mt-3 text-[#a7b8ad]">
          AtomEons builds the layer above. A real execution surface: one
          mission thread per project, structured department status, real
          receipts, model lane routing, worker rails, proof gates. The
          operator sees what is happening, what is verified, what is
          blocked, and what to do next — without losing control or
          clarity.
        </p>
      </section>

      <hr className="my-12 border-[#204538]" />

      <section>
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          Doctrine
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          The rules the lab actually runs by.
        </h2>
        <ul className="mt-6 space-y-5 text-[#f7f0e4]">
          <li>
            <p className="text-base font-semibold text-[#ff7a18]">
              One organism, many lenses.
            </p>
            <p className="mt-1 text-sm text-[#a7b8ad]">
              AtomEons is one system, not a pile of unrelated apps. Every
              surface respects every other. Rooms are views over shared
              primitives.
            </p>
          </li>
          <li>
            <p className="text-base font-semibold text-[#ff7a18]">
              Truth over elegant fiction.
            </p>
            <p className="mt-1 text-sm text-[#a7b8ad]">
              Observed, inferred, speculative, and desired are kept
              distinct. A claim is not verified unless there is a receipt,
              proof artifact, deterministic check, or explicit operator
              decision. No fake green.
            </p>
          </li>
          <li>
            <p className="text-base font-semibold text-[#ff7a18]">
              Anti-sprawl.
            </p>
            <p className="mt-1 text-sm text-[#a7b8ad]">
              Reject everything-app drift. One major objective at a time.
              Bounded execution beats swarm theater. Smaller, calmer,
              sharper.
            </p>
          </li>
          <li>
            <p className="text-base font-semibold text-[#ff7a18]">
              Premium coherence.
            </p>
            <p className="mt-1 text-sm text-[#a7b8ad]">
              Calm. Legible. Confident. The cockpit is an instrument
              panel, not a transcript dump. Proof is a first-class object.
            </p>
          </li>
          <li>
            <p className="text-base font-semibold text-[#ff7a18]">
              Full effort, every time.
            </p>
            <p className="mt-1 text-sm text-[#a7b8ad]">
              Every response, every line of code, every commit message
              earns its place. No coasting on the quiet stuff. No
              shortcuts hidden behind good prose.
            </p>
          </li>
        </ul>
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
            className="rounded-md border border-[#ff7a18] bg-[#ff7a18] px-4 py-2 text-sm font-semibold text-[#06110e] transition-colors hover:bg-[#ffc46b]"
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
          For business: <a href="mailto:a.mccree@gmail.com">a.mccree@gmail.com</a>
        </p>
        <p className="mt-1 text-sm text-[#a7b8ad]">
          AtomEons does not run a support desk. The lab ships, then ships
          again. Read the manual that comes inside ORANGEBOX before
          asking.
        </p>
      </section>
    </main>
  );
}
