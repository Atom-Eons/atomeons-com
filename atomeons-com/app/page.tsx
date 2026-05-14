import Link from "next/link";
import { BuyButton } from "./_components/BuyButton";
import { AtomMark } from "./_components/AtomMark";

export default function Home() {
  return (
    <main className="relative z-10">
      {/* HERO */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#204538] bg-[#071915] px-3 py-1 text-xs uppercase tracking-widest text-[#a7b8ad]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#75ff92]" />
              ÆoNs Research Lab · Marco Island · est. 2026
            </p>
            <p className="mb-3 text-sm text-[#a7b8ad]">
              Solo lab. One product. Shipping.
            </p>
            <h1 className="text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Build like a{" "}
              <span className="text-[#ff7a18]">serious laboratory</span>.
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
                href="/about"
                className="rounded-md px-5 py-2.5 text-sm text-[#a7b8ad] transition-colors hover:text-[#f7f0e4]"
              >
                About the lab
              </Link>
            </div>
          </div>

          <aside className="relative">
            {/* Large faint atom behind the card */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-16 opacity-30 blur-[1px]"
            >
              <AtomMark size={280} speed={14} />
            </div>
            <div className="relative rounded-2xl border border-[#204538] bg-gradient-to-br from-[#071915] to-[#0a211b] p-6 shadow-[0_0_60px_rgba(255,122,24,0.18)]">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
                Currently shipping
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

      {/* SHIP */}
      <section className="border-t border-[#204538]">
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
                    Claude Code. Single ZIP. Node 18+.
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
          </div>
        </div>
      </section>

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
          <p className="mt-3 text-xs text-[#a7b8ad]">
            $49 USD · one-time · no support · instant download
          </p>
        </div>
      </section>
    </main>
  );
}
