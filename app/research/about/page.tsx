import Link from "next/link";
import { AeMark } from "../../_components/AeMark";

export const metadata = {
  title: "About — Æ Research",
  description:
    "ÆoNs Research Laboratory / AtomEons Systems Laboratory. One independent researcher in Marco Island, FL, building unified field theories of cancer, economics, AI alignment, and astrophysics — and the cockpit that ships them.",
  alternates: { canonical: "https://atomeons.com/research/about" },
};

const PILLARS = [
  {
    n: "01",
    title: "One organism, many lenses",
    body: "Cancer, financial crises, AI misalignment, and the astrophysical pair-instability gap all look like the same topological defect once you pick the right field. The lab's first job is to find that field.",
  },
  {
    n: "02",
    title: "Truth over theater",
    body: "Receipts on every claim. Falsifiable predictions on every paper. If a hypothesis can't be killed, it isn't science — it's branding. We publish the conditions under which we'd retract.",
  },
  {
    n: "03",
    title: "Built through the cockpit",
    body: "Every paper, every product, every line of code in this lab passes through ORANGEBOX — the cockpit we sell. The lab eats its own work. The work survives the lab.",
  },
  {
    n: "04",
    title: "Solo, independent, fully open",
    body: "No university chair. No grant funding. No co-author obligations from any institution. The papers carry one human name, two or three AI collaborators (CRediT-tagged), and CC-BY 4.0 licensing.",
  },
];

export default function ResearchAbout() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/papers" className="hover:text-[#22F0D5]">
            Æ Research
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> About
        </p>
      </div>

      {/* HERO */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <AeMark size={22} glow />
          ::ÆoNs Research Laboratory · since 2026
        </p>
        <h1 className="text-balance text-[2.25rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] sm:text-5xl md:text-7xl">
          One operator. <span className="text-[#22F0D5]">One lab.</span>{" "}
          <span className="text-[#FF7A1A]">One unifying field.</span>
        </h1>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          ÆoNs Research is the publishing arm of AtomEons Systems Laboratory —
          a solo independent research lab run by Atom McCree out of Marco
          Island, Florida. The thesis: cancer, financial systemic risk, AI
          alignment failure, and the pair-instability mass gap are
          mathematically the same kind of failure in self-modifying dynamical
          systems. The diagnostic across all four domains is the spectral
          entropy of the flow-weighted graph Laplacian. The invariant is the
          topological winding number. The substrate is a sinusoidal Light
          Code.
        </p>
      </section>

      {/* PILLARS */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::lab pillars
        </p>
        <h2 className="text-balance text-3xl font-medium leading-tight tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
          What the lab insists on.
        </h2>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2">
          {PILLARS.map((p) => (
            <div
              key={p.n}
              className="bg-[#0A0F11] p-7 transition-colors hover:bg-[#101A1C]"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#FF7A1A]">
                  {p.n}
                </span>
                <h3 className="text-base font-medium text-[#F2F4F5]">
                  {p.title}
                </h3>
              </div>
              <p className="mt-3 pl-10 text-sm leading-relaxed text-[#9BA5A7]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OPERATOR CARD */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-[#1A2225] bg-gradient-to-br from-[#0A0F11] via-[#0A0F11] to-[#101A1C] p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::lab operator
          </p>
          <div className="mt-6 grid gap-8 md:grid-cols-[auto_1fr]">
            <div className="inline-flex h-32 w-32 items-center justify-center rounded-2xl border border-[#22F0D5]/40 bg-black shadow-[0_0_40px_-10px_rgba(34,240,213,0.5)]">
              <AeMark size={84} glow />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#F2F4F5]">
                Atom McCree
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-[#6B7779]">
                founder · ÆoNs Research / AtomEons Systems Laboratory · Marco Island, FL
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#9BA5A7] md:text-base">
                Independent researcher. Writes the papers, ships the cockpit
                they were drafted in, and answers his own email. No team. No
                co-founders. No deck. No roadmap theater. The work shipped
                this year unifies four scientific domains under one set of
                equations and is wired into a product you can download for $1.
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[#22F0D5]">
                <a
                  href="mailto:a.mccree@gmail.com"
                  className="hover:text-[#FFA45A]"
                >
                  a.mccree@gmail.com
                </a>
                {"  "}·{"  "}
                <a
                  href="https://x.com/AtomMccree"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-[#FFA45A]"
                >
                  @AtomMccree
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/research/papers"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5]">
              ::read the papers
            </p>
            <p className="mt-3 text-xl font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              12 manuscripts · April 2026 →
            </p>
            <p className="mt-2 text-sm text-[#9BA5A7]">
              Bioelectric oncology, gut-brain mislabeling, solar information
              transfer, topological field theory, light-code DNA version
              control.
            </p>
          </Link>
          <Link
            href="/founders-view"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 transition-colors hover:border-[#FF7A1A]/50"
          >
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#FF7A1A]">
              ::nightly broadcast
            </p>
            <p className="mt-3 text-xl font-medium text-[#F2F4F5] group-hover:text-[#FF7A1A]">
              The Founder&apos;s View → 8pm ET daily
            </p>
            <p className="mt-2 text-sm text-[#9BA5A7]">
              No-punches-pulled letter from the lab. Equal opportunity
              indignation. Subscribe by bookmark.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
