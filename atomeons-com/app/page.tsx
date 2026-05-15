import Link from "next/link";
import { BuyButton } from "./_components/BuyButton";
import { AtomMark } from "./_components/AtomMark";
import { ProofRail } from "./_components/ProofRail";
import { RefusalStrip } from "./_components/RefusalStrip";
import { SpotlightBg } from "./_components/SpotlightBg";
import { CockpitMiniPanel } from "./_components/CockpitMiniPanel";
import { BuiltOnOrangebox } from "./_components/BuiltOnOrangebox";

export default function Home() {
  return (
    <main className="relative z-10">
      {/* RECURSIVE PROOF — really large, dominates above the fold */}
      <BuiltOnOrangebox />

      {/* HERO — wrapped in cursor-following spotlight */}
      <SpotlightBg>
        <section className="mx-auto w-full max-w-6xl px-6 pt-12 pb-20 md:pt-20 md:pb-28">
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <p className="mb-3 font-mono text-xs text-[#75ff92]">
                <span className="text-[#1b8b75]">$</span> atomeons --boot
              </p>
              <p className="mb-3 text-sm text-[#a7b8ad]">
                The model does not run your project. You do. The cockpit
                keeps both true.
              </p>
              <h1 className="glitch-hover text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-7xl">
                The AI cockpit for{" "}
                <span className="text-[#ff7a18]">Claude Code</span>.
                <span className="blink-cursor" aria-hidden />
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base text-[#a7b8ad] md:text-lg">
                ORANGEBOX Command turns Claude Code from a chat tool into a
                real project surface. 60+ MCP tools, 15 departments, mission-graph
                memory, receipt-backed gates. Local-first. Yours forever.
              </p>
              <p className="mt-3 max-w-xl text-base font-semibold text-[#75ff92]">
                $49 once, forever. No subscription, ever.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <BuyButton />
                <Link
                  href="/orangebox"
                  className="rounded-md border border-[#204538] bg-[#071915] px-5 py-2.5 text-sm font-semibold text-[#f7f0e4] transition-colors hover:border-[#ff7a18]/60"
                >
                  See what's in the box →
                </Link>
              </div>
            </div>

            <aside className="relative flex flex-col gap-4">
              {/* Hero glue — anchors the cockpit to the H1 narrative */}
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffc46b]">
                ↘ this is the instrument
              </p>
              {/* Cockpit demo — visible product, sample-labeled */}
              <CockpitMiniPanel />
              {/* Stats + buy zone */}
              <div className="vercel-glow mesh-gradient relative rounded-xl border border-[#204538] p-5 shadow-[0_0_60px_rgba(255,122,24,0.22)]">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-2xl font-bold tracking-tight text-[#f7f0e4]">
                    $49 <span className="text-sm font-normal text-[#a7b8ad]">one-time</span>
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
                    15 depts · 15 skills · 60+ mcp tools
                  </p>
                </div>
                <Link
                  href="/orangebox"
                  className="relative z-10 mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#ff7a18] bg-[#ff7a18] px-6 py-3 text-base font-bold text-black transition-colors hover:bg-[#ffc46b]"
                  style={{ color: "#000", WebkitTextFillColor: "#000" }}
                >
                  See ORANGEBOX →
                </Link>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[#a7b8ad]">
                  Read the prereqs · then buy.
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#75ff92]">
                  30-day workflow-fit refund · License §8A
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded border border-[#204538] bg-[#04100d] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#75ff92]">
                    stripe checkout
                  </span>
                  <span className="rounded border border-[#204538] bg-[#04100d] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#59d9ff]">
                    hmac signed
                  </span>
                  <span className="rounded border border-[#204538] bg-[#04100d] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#a7b8ad]">
                    vercel
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </SpotlightBg>

      {/* REFUSAL STRIP — what this product refuses to do (Misfits, v12) */}
      <RefusalStrip />

      {/* PROOF RAIL — infinite marquee bridging hero and CTA */}
      <ProofRail />

      {/* CTA */}
      <section className="border-t border-[#204538] bg-[#0a211b]">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
            Run a serious project. Keep your hands on the wheel.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#a7b8ad]">
            The manual is inside. The rest is your problem.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <BuyButton />
            <Link
              href="/orangebox"
              className="rounded-md border border-[#204538] bg-[#04100d] px-5 py-2.5 text-sm text-[#a7b8ad] transition-colors hover:text-[#f7f0e4]"
            >
              See what's in the box
            </Link>
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-[#a7b8ad]">
            $49 USD · one-time · 30-day support · download on payment confirmed
          </p>
        </div>
      </section>
    </main>
  );
}
