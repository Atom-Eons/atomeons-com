import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Influences · who shaped the operator's thinking",
  description:
    "Named with reasoning. The researchers, writers, builders, musicians, and operators whose work shaped how AtomEons thinks about software, research, ethics, and craft. No aggrandizing.",
  alternates: { canonical: "https://atomeons.com/influences" },
};

/**
 * /influences — who shaped the operator's thinking.
 *
 * Operator's rule: an honest lab names its influences. Borrowing is
 * disclosed, not hidden. This page lists, with one-sentence reasoning
 * per entry, the work that demonstrably shapes how AtomEons reasons,
 * writes, builds, and ships.
 *
 * Sections are not ranked. Each name is one piece of input. The output
 * is the operator's; the inputs were many and should be cited.
 */

type Influence = {
  name: string;
  domain: string;
  shaped: string;
  url?: string;
};

const SECTIONS: Array<{ heading: string; items: Influence[] }> = [
  {
    heading: "AI researchers + safety thinkers",
    items: [
      { name: "Anthropic interpretability team", domain: "mechanistic interpretability · scaling monosemanticity", shaped: "Reading sparse-autoencoder + feature-attribution work shaped how the lab thinks about LLM accountability — claims must be openable.", url: "https://transformer-circuits.pub/" },
      { name: "Chris Olah", domain: "circuits + visual interpretability", shaped: "The principle that you can show a model's internals via images, not just metrics. Influences how /research/decoded pages are written.", url: "https://colah.github.io/" },
      { name: "Andrej Karpathy", domain: "teaching by building", shaped: "His nanoGPT / micrograd / makemore series proved that the best way to teach AI is to rebuild the smallest working version. The /learn curriculum follows this principle.", url: "https://karpathy.ai/" },
      { name: "Dwarkesh Patel", domain: "long-form AI conversation", shaped: "Proved that the right interview is 3 hours, not 30 minutes, when the subject is hard. /founders-view aims for that tempo, on the lab's own register.", url: "https://www.dwarkeshpatel.com/" },
      { name: "Simon Willison", domain: "writing software in public · prompt injection coinage", shaped: "His blog-first development practice + naming prompt injection (2022) directly shape the lab's transparent-shipping habit and /q surface.", url: "https://simonwillison.net/" },
      { name: "Eliezer Yudkowsky", domain: "AI risk framing", shaped: "Adversarial honesty as the only acceptable safety stance. Lab's /trust + Human Final Stop authority echo this.", url: "https://www.yudkowsky.net/" },
    ],
  },
  {
    heading: "Writers + thinkers",
    items: [
      { name: "Naval Ravikant", domain: "leverage + writing", shaped: "Specific knowledge, accountability, leverage. Whole framework underlies the one-operator-lab decision.", url: "https://nav.al/" },
      { name: "Paul Graham", domain: "essays + startup advice", shaped: "Essay register · default-no on most things · founder-mode as default. Lab's voice owes a debt.", url: "https://paulgraham.com/" },
      { name: "Stewart Brand", domain: "Whole Earth Catalog · access to tools", shaped: "'Access to tools' as the highest service. Lab's free 256-route curriculum is downstream of this.", url: "https://en.wikipedia.org/wiki/Stewart_Brand" },
      { name: "Marshall McLuhan", domain: "media theory", shaped: "The medium is the message; what the medium does to perception. Influences how /aesthetic is authored.", url: "https://en.wikipedia.org/wiki/Marshall_McLuhan" },
      { name: "Jorge Luis Borges", domain: "labyrinths + recursive forms", shaped: "The lab's site map is intentionally interconnected, not hierarchical. Knowledge as garden of forking paths.", url: "https://en.wikipedia.org/wiki/Jorge_Luis_Borges" },
      { name: "Italo Calvino", domain: "lightness · precision · style", shaped: "Six Memos for the Next Millennium — lightness, quickness, exactitude, visibility, multiplicity, consistency. The V3 noir aesthetic owes him.", url: "https://en.wikipedia.org/wiki/Italo_Calvino" },
    ],
  },
  {
    heading: "Builders + operators",
    items: [
      { name: "Pieter Levels", domain: "indie maker · NomadList · public revenue", shaped: "Solo-builder economics in the open. Proved one operator can outship most companies.", url: "https://levels.io/" },
      { name: "DHH (David Heinemeier Hansson)", domain: "Rails · Once.com · no-VC ops", shaped: "Anti-SaaS doctrine before the term existed. ORANGEBOX's §4A no-SaaS covenant is downstream.", url: "https://world.hey.com/dhh" },
      { name: "37signals · Basecamp", domain: "rest-of-us software", shaped: "Calm software · one-time prices · sustainable pace. Lab inherits the calm.", url: "https://basecamp.com/" },
      { name: "Patrick Collison", domain: "engineering management · infrastructure", shaped: "How to write internal docs so they outlive the writer. Lab's CLAUDE.md + /rules/ echo this.", url: "https://patrickcollison.com/" },
      { name: "Vesa Tuominen + small Finnish design houses", domain: "minimal industrial design", shaped: "Premium restraint over decoration. The single-cyan-accent rule is downstream.", url: "https://kontra.fi/" },
    ],
  },
  {
    heading: "Visual + sonic",
    items: [
      { name: "Refik Anadol", domain: "data-as-fluid · large-scale immersive", shaped: "The SacredCanvas attempts the data-fluidity feel at zero-bandwidth scale.", url: "https://refikanadol.com/" },
      { name: "Raven Kwok", domain: "precise procedural minimalism", shaped: "Subdivision systems · Truchet tiles · Penrose. The Layer-1 sacred polygons are in his lineage.", url: "https://ravenkwok.com/" },
      { name: "GeoMusica (Derivative TouchDesigner community)", domain: "geometry-to-music mapping", shaped: "Mathematical art as runtime, not asset. Direct inspiration for the SacredCanvas runtime.", url: "https://derivative.ca/" },
      { name: "Brian Eno", domain: "generative music · ambient", shaped: "'Ambient' as a serious aesthetic position. The SacredCanvas behaves like ambient music — present, not demanding.", url: "https://en.wikipedia.org/wiki/Brian_Eno" },
      { name: "Steve Reich", domain: "phase music · slow tempo change", shaped: "Pattern that shifts so slowly the listener forgets when it started. Same physics as the SacredCanvas Lissajous layer.", url: "https://en.wikipedia.org/wiki/Steve_Reich" },
      { name: "Edward Tufte", domain: "information design", shaped: "Data-ink ratio, small multiples, sparklines. /receipts and /transparency owe him.", url: "https://www.edwardtufte.com/tufte/" },
      { name: "Dieter Rams", domain: "ten principles of good design", shaped: "Less, but better. Single-accent rule, hairline borders, sentence-case all flow from Rams.", url: "https://en.wikipedia.org/wiki/Dieter_Rams" },
    ],
  },
  {
    heading: "Methodology + practice",
    items: [
      { name: "Cal Newport", domain: "deep work · digital minimalism", shaped: "Working hours over working theatre. Lab's no-meeting + morning-walk rule comes from here.", url: "https://www.calnewport.com/" },
      { name: "Tim Ferriss", domain: "minimum-effective-dose method", shaped: "/learn/synthesis pages explicitly use his MED framing.", url: "https://tim.blog/" },
      { name: "Ryan Holiday", domain: "stoic operating principles", shaped: "Discipline over inspiration. Mom's-Law-grade effort as a standing posture.", url: "https://ryanholiday.net/" },
      { name: "Atom McCree's mother", domain: "Mom's Law", shaped: "Full effort every time. Sits above every rule in this project including this one.", url: "/" },
    ],
  },
];

export default function InfluencesPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ influences · named</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The inputs to the output.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            An honest lab names its influences. Borrowing is disclosed,
            not hidden. The work below shaped how the operator thinks
            about software, research, ethics, and craft. The output is
            the operator's. The inputs were many.
          </p>
        </div>
      </section>

      {SECTIONS.map((s) => (
        <section key={s.heading} className="border-b border-[#1F242B]">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ {s.heading}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {s.items.map((it) => (
                <div key={it.name} className="border border-[#1F242B] bg-[#0F1114] p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    {it.url ? (
                      <a href={it.url} target="_blank" rel="noopener noreferrer" className="font-serif text-[17px] font-medium text-[#F4F4F2] hover:text-[#22F0D5]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                        {it.name}
                      </a>
                    ) : (
                      <p className="font-serif text-[17px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                        {it.name}
                      </p>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">{it.domain}</p>
                  <p className="mt-3 font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{it.shaped}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ closer to the source</p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              { href: "/about", label: "About the operator" },
              { href: "/manifesto", label: "Operating manifesto" },
              { href: "/learn/cyber/heroes", label: "Cyber heroes (separate canon)" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">
                  atomeons.com{l.href}
                </p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
