import Link from "next/link";
import { BuyButton } from "./_components/BuyButton";

export default function Home() {
  return (
    <main className="relative z-10">
      {/* HERO */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#204538] bg-[#071915] px-3 py-1 text-xs uppercase tracking-widest text-[#a7b8ad]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#75ff92]" />
              ÆoNs Research Lab · est. 2026 · Marco Island
            </p>
            <h1 className="text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Build like a{" "}
              <span className="text-[#ff7a18]">serious laboratory</span>.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base text-[#a7b8ad] md:text-lg">
              AtomEons makes private execution surfaces for one operator
              running serious AI-assisted projects. Anti-sprawl. Premium
              coherence. Truth over theater. Real receipts.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/orangebox"
                className="rounded-md border border-[#204538] bg-[#071915] px-5 py-2.5 text-sm font-semibold text-[#f7f0e4] transition-colors hover:border-[#ff7a18]/60"
              >
                See ORANGEBOX →
              </Link>
              <Link
                href="/about"
                className="rounded-md px-5 py-2.5 text-sm text-[#a7b8ad] transition-colors hover:text-[#f7f0e4]"
              >
                About the lab
              </Link>
            </div>
          </div>

          <aside className="relative">
            <div className="rounded-2xl border border-[#204538] bg-gradient-to-br from-[#071915] to-[#0a211b] p-6 shadow-[0_0_60px_rgba(255,122,24,0.05)]">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
                Currently shipping
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#ff7a18]">
                ORANGEBOX
              </h2>
              <p className="mt-2 text-sm text-[#f7f0e4]">
                Private command cockpit for one operator.
              </p>
              <p className="mt-3 text-xs text-[#a7b8ad]">
                Single ZIP · Node 18+ · runs on{" "}
                <span className="font-mono text-[#75ff92]">
                  127.0.0.1:8787
                </span>
              </p>
              <div className="mt-5 border-t border-[#204538] pt-5">
                <p className="text-xs text-[#a7b8ad]">v1 prototype</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-[#f7f0e4]">
                  $49 <span className="text-sm font-normal text-[#a7b8ad]">one-time</span>
                </p>
                <div className="mt-4">
                  <BuyButton />
                </div>
                <p className="mt-2 text-[11px] text-[#a7b8ad]">
                  No support. You figure it out.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* DOCTRINE */}
      <section className="border-t border-[#204538] bg-[#04100d]/60">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
            Doctrine
          </p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            Five rules. They run the lab.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-[#204538] bg-[#071915] p-5"
              >
                <p className="text-sm font-semibold text-[#ff7a18]">
                  {p.tag}
                </p>
                <h3 className="mt-1 text-base font-semibold text-[#f7f0e4]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-[#a7b8ad]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHIP */}
      <section>
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
            What we ship
          </p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            One product, real, finished enough to charge for.
          </h2>
          <div className="mt-10 grid gap-6">
            <Link
              href="/orangebox"
              className="group block rounded-2xl border border-[#204538] bg-[#071915] p-8 transition-colors hover:border-[#ff7a18]/40"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#a7b8ad]">
                    Active
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-[#ff7a18] md:text-3xl">
                    ORANGEBOX
                  </h3>
                  <p className="mt-2 max-w-xl text-[#f7f0e4]">
                    Private command cockpit for one operator. Vision Rail,
                    Party Line, Codexa worker rail, receipts, MCP tools for
                    Claude Code. Single-file prototype. Node 18+.
                  </p>
                  <p className="mt-4 text-sm text-[#a7b8ad]">
                    $49 USD · one-time · no support →{" "}
                    <span className="text-[#ff7a18] underline-offset-4 group-hover:underline">
                      learn more
                    </span>
                  </p>
                </div>
                <span className="text-3xl font-black text-[#a7b8ad] transition-colors group-hover:text-[#ff7a18]">
                  →
                </span>
              </div>
            </Link>

            <div className="rounded-2xl border border-dashed border-[#204538] bg-transparent p-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#a7b8ad]">
                    In progress
                  </p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-[#a7b8ad]">
                    Modular ORANGEBOX production version
                  </h3>
                  <p className="mt-2 max-w-xl text-sm text-[#a7b8ad]">
                    Resilient luxury architecture. Trinity layout. Local-first
                    vault. Ghost workers. Adaptive throttling. Time scrubber.
                  </p>
                </div>
                <span className="text-xs text-[#a7b8ad]">soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#204538] bg-[#0a211b]">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Want maximum leverage without losing control?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#a7b8ad]">
            Buy the cockpit. Run it on your own machine. Read the manual that
            ships inside the box. Ship.
          </p>
          <div className="mt-7 flex justify-center">
            <BuyButton />
          </div>
          <p className="mt-3 text-xs text-[#a7b8ad]">
            $49 USD · one-time · no support · instant download
          </p>
        </div>
      </section>
    </main>
  );
}

const pillars: { tag: string; title: string; body: string }[] = [
  {
    tag: "01",
    title: "One organism, many lenses",
    body: "AtomEons is treated as a single coherent system, not a pile of disconnected apps. Every surface respects the others.",
  },
  {
    tag: "02",
    title: "Truth over theater",
    body: "We separate observed, inferred, speculative, and desired states. Claims need receipts. Memory notes are not proof.",
  },
  {
    tag: "03",
    title: "Anti-sprawl",
    body: "Reject everything-app drift. One major objective at a time. Bounded execution beats swarm theater.",
  },
  {
    tag: "04",
    title: "Premium coherence",
    body: "Calm. Legible. Confident. Cockpit-grade surfaces, not developer noise. Proof is a first-class object.",
  },
  {
    tag: "05",
    title: "Full effort, every time",
    body: "Every output earns its place. No coasting on the quiet stuff, no padding on the loud stuff. Mom is watching.",
  },
];
