import Link from "next/link";

export const metadata = {
  title: "Misfit Manifesto",
  description:
    "The AtomEons Misfit Manifesto — 20 tenets. Sovereignty first. Meaning second. Beauty third. Expansion last.",
};

const TENETS: string[] = [
  "We do not rebel for noise. We rebel against false structure.",
  "The misfit is not outside the system because they are broken; the misfit is outside because they can still see the system.",
  "Frontier thinking is allowed only when it increases truth, sovereignty, usefulness, or human dignity.",
  "We reject simulated abundance: fake breadth, fake capability, fake motion, fake intelligence, fake care.",
  "We preserve the strange only when the strange carries signal.",
  "We do not worship normal. Normal is often just inherited friction with social approval.",
  "We do not confuse chaos with freedom. A sovereign instrument must be calm enough to be trusted.",
  "The misfit's job is to find the option nobody else can name yet.",
  "The rebel's job is to challenge assumptions without destroying the mission.",
  "The frontier is not decoration. It must become architecture, test, loop, interface, or law.",
  "No theater. No engagement farming. No dopamine trap. No false universe.",
  "Every invention must pass reality contact: can the human use it, can the system prove it, can the trace show what happened?",
  "Protect the human operator from extraction, manipulation, dependency, and machine authority creep.",
  "Build for the person who does not fit existing platforms because existing platforms were built to harvest them.",
  "The misfit is not a market segment; the misfit is proof that the old interface failed.",
  "Sovereignty first. Meaning second. Beauty third. Expansion last.",
  "A real command loop beats a thousand imaginary features.",
  "The system must not imply a universe before it proves an instrument.",
  "The edge case is sacred because it exposes the hidden law.",
  "AtomEons is for the ones who need technology to become less extractive, less performative, less addictive, and more human.",
];

export default function Manifesto() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-12 pb-24">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
        <Link href="/">AtomEons</Link>{" "}
        <span className="text-[#204538]">/</span> manifesto
      </p>

      <pre className="mt-6 select-none overflow-hidden font-mono text-[11px] tracking-tight text-[#1b8b75]">
{`──────────────────────────────────────────────────────
[ ATOMEONS · MISFIT MANIFESTO ]    file://recovered
──────────────────────────────────────────────────────`}
      </pre>

      <h1 className="mt-8 text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
        We do not rebel for noise.
        <br />
        We rebel against{" "}
        <span className="text-[#ff7a18]">false structure</span>.
      </h1>

      <p className="mt-6 max-w-xl text-pretty text-[#a7b8ad]">
        Twenty tenets. Recovered from project memory 2026-05-02. Treat this
        as canon-in-progress until a durable source is signed.
      </p>

      <ol className="mt-12 space-y-7">
        {TENETS.map((t, idx) => (
          <li key={idx} className="grid gap-2 md:grid-cols-[60px_1fr]">
            <span className="font-mono text-xs uppercase tracking-widest text-[#ff7a18]">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <p className="text-[#f7f0e4]">{t}</p>
          </li>
        ))}
      </ol>

      <hr className="my-12 border-[#204538]" />

      <section className="rounded-xl border border-[#204538] bg-[#071915] p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#75ff92]">
          [ canonical summary ]
        </p>
        <p className="mt-3 text-pretty text-lg italic text-[#f7f0e4]">
          Preserve the outsider signal, remove the fake world, prove real
          loops, build sovereign instruments for humans outside extractive
          normal systems.
        </p>
      </section>

      <pre className="mt-12 select-none overflow-hidden font-mono text-[11px] tracking-tight text-[#1b8b75]">
{`──────────────────────────────────────────────────────
[ EOF ]    not for sale.    not for ad.    not yours.
──────────────────────────────────────────────────────`}
      </pre>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/orangebox"
          className="rounded-md border border-[#ff7a18] bg-[#ff7a18] px-4 py-2 text-sm font-semibold text-[#06110e] transition-colors hover:bg-[#ffc46b]"
        >
          Buy the cockpit · $49 →
        </Link>
        <Link
          href="/about"
          className="rounded-md border border-[#204538] bg-[#071915] px-4 py-2 text-sm text-[#f7f0e4]"
        >
          About the lab
        </Link>
      </div>
    </main>
  );
}
