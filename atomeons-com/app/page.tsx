import Link from "next/link";
import { BuyButton } from "./_components/BuyButton";
import { AtomMark } from "./_components/AtomMark";

export default function Home() {
  return (
    <main className="relative z-10">
      {/* HERO */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div>
            {/* outlaw signature pills */}
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="rebel-pill">▲ Not a startup</span>
              <span className="rebel-pill">▲ No team</span>
              <span className="rebel-pill">▲ No roadmap</span>
              <span className="rebel-pill">▲ One operator</span>
            </div>

            <p className="mb-3 font-mono text-xs text-[#75ff92]">
              <span className="text-[#1b8b75]">$</span> atomeons --boot
            </p>
            <p className="mb-3 text-sm text-[#a7b8ad]">
              Solo lab. One product. Shipping.
            </p>
            <h1 className="glitch-hover text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Build like a{" "}
              <span className="text-[#ff7a18]">serious laboratory</span>.
              <span className="blink-cursor" aria-hidden />
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base text-[#a7b8ad] md:text-lg">
              AtomEons is a solo lab in Marco Island building one thing at a
              time. No teams. No roadmap theater. Real artifacts, real
              receipts, one operator.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/orangebox"
                className="rounded-md border border-[#204538] bg-[#071915] px-5 py-2.5 text-sm font-semibold text-[#f7f0e4] transition-colors hover:border-[#ff7a18]/60"
              >
                See ORANGEBOX →
              </Link>
              <Link
                href="/changelog"
                className="rounded-md border border-[#204538] bg-transparent px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-[#a7b8ad] transition-colors hover:text-[#f7f0e4]"
              >
                Changelog
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
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-16 opacity-30 blur-[1px]"
            >
              <AtomMark size={280} speed={14} />
            </div>
            <div className="vercel-glow mesh-gradient relative rounded-2xl border border-[#204538] p-6 shadow-[0_0_60px_rgba(255,122,24,0.22)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
                ::currently shipping
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#ff7a18]">
                ORANGEBOX
              </h2>
              <p className="mt-2 text-sm text-[#f7f0e4]">
                Private command cockpit for one operator.
              </p>
              <p className="mt-3 font-mono text-[11px] text-[#75ff92]">
                92 endpoints · 17 lanes · 12 MCP tools
              </p>
              <div className="mt-5 border-t border-[#204538] pt-5">
                <p className="text-2xl font-bold tracking-tight text-[#f7f0e4]">
                  $49 <span className="text-sm font-normal text-[#a7b8ad]">one-time</span>
                </p>
                <Link
                  href="/orangebox"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#ff7a18] bg-[#ff7a18] px-6 py-3 text-base font-semibold text-[#06110e] transition-colors hover:bg-[#ffc46b]"
                >
                  See ORANGEBOX →
                </Link>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[#a7b8ad]">
                  Read the prereqs · then buy.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ASCII DIVIDER */}
      <div aria-hidden className="mx-auto w-full max-w-6xl overflow-hidden px-6">
        <pre className="ascii-rule">
{`──[ what we ship ]───────────────────────────────────────────────────────────`}
        </pre>
      </div>

      {/* SHIP */}
      <section>
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            One product, real, finished enough to charge for.
          </h2>
          <div className="mt-10 grid gap-6">
            <Link
              href="/orangebox"
              className="vercel-glow group block rounded-2xl border border-[#204538] bg-[#071915] p-8 transition-colors hover:border-[#ff7a18]/40"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#a7b8ad]">
                    ::active
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-[#ff7a18] md:text-3xl">
                    ORANGEBOX
                  </h3>
                  <p className="mt-2 max-w-xl text-[#f7f0e4]">
                    Private command cockpit for one operator. Vision Rail,
                    Party Line, Codexa worker rail, receipts, MCP tools for
                    Claude Code. Single ZIP. Node 18+.
                  </p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[#a7b8ad]">
                    $49 USD · one-time · no support →{" "}
                    <span className="text-[#ff7a18] underline-offset-4 group-hover:underline">
                      enter
                    </span>
                  </p>
                </div>
                <span className="text-3xl font-black text-[#a7b8ad] transition-colors group-hover:text-[#ff7a18]">
                  →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ASCII DIVIDER */}
      <div aria-hidden className="mx-auto w-full max-w-6xl overflow-hidden px-6">
        <pre className="ascii-rule">
{`──[ EOF ]────────────────────────────────────────────────────────────────────`}
        </pre>
      </div>

      {/* CTA */}
      <section className="border-t border-[#204538] bg-[#0a211b]">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Run a serious project. Keep your hands on the wheel.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#a7b8ad]">
            The manual is inside the box. Everything else is on you.
          </p>
          <div className="mt-7 flex justify-center">
            <BuyButton />
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-[#a7b8ad]">
            $49 USD · one-time · no support · download on payment confirmed
          </p>
        </div>
      </section>
    </main>
  );
}
