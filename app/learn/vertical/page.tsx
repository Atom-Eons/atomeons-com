import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI by sector — vertical applied guides · AtomEons /learn/vertical",
  description:
    "Twenty applied guides to AI in real industries: healthcare, finance, defense, education, government, retail, manufacturing, agriculture, energy, legal, logistics, real-estate, insurance, media, climate, biotech, materials, automotive, hospitality, public-safety. Real deployments. Real vendors. No hype.",
  alternates: { canonical: "https://atomeons.com/learn/vertical" },
  openGraph: {
    title: "AI by sector · AtomEons applied guides",
    description:
      "Twenty long-form guides to the real state of AI in twenty real industries. Named vendors. Named deployments. Honest limits.",
    url: "https://atomeons.com/learn/vertical",
    type: "website",
  },
};

/**
 * /learn/vertical — the sector index
 *
 * Generated alongside the warp-9 vertical workflow output. Lists 20
 * applied guides; each card lands on the corresponding deep-dive
 * page at /learn/vertical/<slug>. Voice + palette match /learn/atlas
 * and /learn/cyber index pages.
 */

type Sector = {
  slug: string;
  title: string;
  blurb: string;
  housekeeping: string;
};

const SECTORS: Sector[] = [
  { slug: "healthcare",     title: "Healthcare",                       blurb: "Clinical decision support, imaging diagnostics, claims, drug discovery.",                                housekeeping: "HIPAA · FDA · CMS" },
  { slug: "finance",        title: "Finance",                          blurb: "Trading, risk, KYC/AML, customer service, document processing.",                                        housekeeping: "SEC · FINRA · OCC" },
  { slug: "defense",        title: "Defense",                          blurb: "Autonomy, ISR, decision support, logistics, defensive cyber.",                                          housekeeping: "DoD · DARPA · DIU" },
  { slug: "education",      title: "Education",                        blurb: "Tutoring, grading, curriculum generation, accessibility, language.",                                    housekeeping: "FERPA · COPPA · Title I" },
  { slug: "government",     title: "Government",                       blurb: "Constituent services, document review, fraud detection, FOIA.",                                         housekeeping: "FedRAMP · NIST AI RMF · OMB" },
  { slug: "retail",         title: "Retail",                           blurb: "Demand forecasting, personalization, returns fraud, store ops.",                                        housekeeping: "PCI DSS · GDPR · CCPA" },
  { slug: "manufacturing",  title: "Manufacturing",                    blurb: "Predictive maintenance, CV quality control, generative design.",                                        housekeeping: "ISA/IEC 62443 · OSHA" },
  { slug: "agriculture",    title: "Agriculture",                      blurb: "Precision agriculture, crop disease detection, robotic harvest.",                                       housekeeping: "USDA · EPA · FDA" },
  { slug: "energy",         title: "Energy",                           blurb: "Grid optimization, exploration, renewables forecasting, demand response.",                              housekeeping: "FERC · NERC · DOE" },
  { slug: "legal",          title: "Legal",                            blurb: "Document review, contract analysis, e-discovery, brief drafting.",                                      housekeeping: "ABA · state bar UPL rules" },
  { slug: "logistics",      title: "Logistics",                        blurb: "Route optimization, warehouse robotics, last-mile, ETA.",                                                housekeeping: "FMCSA · DOT · USPS" },
  { slug: "real-estate",    title: "Real Estate",                      blurb: "Valuation, leasing automation, property management, transactions.",                                     housekeeping: "FHA · RESPA · state DRE" },
  { slug: "insurance",      title: "Insurance",                        blurb: "Underwriting, claims, fraud detection, dynamic pricing.",                                                housekeeping: "NAIC · state DOIs" },
  { slug: "media",          title: "Media + Publishing",               blurb: "Content generation, recommendation, copyright friction, monetization.",                                  housekeeping: "DMCA · NIST · FTC" },
  { slug: "climate",        title: "Climate + Carbon",                 blurb: "Weather + climate modeling, carbon accounting, MRV.",                                                   housekeeping: "SEC climate rule · ISSB · TCFD" },
  { slug: "biotech",        title: "Biotech + Drug Discovery",         blurb: "Target ID, molecular design, clinical trial optimization.",                                              housekeeping: "FDA · NIH · ICH GCP" },
  { slug: "materials",      title: "Materials Science",                blurb: "Inverse design, batteries, alloys, polymers.",                                                          housekeeping: "DOE · NIST · NREL" },
  { slug: "automotive",     title: "Automotive + Mobility",            blurb: "Driver assistance, full self-driving status, in-cabin assistant.",                                       housekeeping: "NHTSA · CA DMV · UNECE" },
  { slug: "hospitality",    title: "Hospitality + Travel",             blurb: "Booking, dynamic pricing, concierge, operations.",                                                       housekeeping: "DOT · FTC · GDPR" },
  { slug: "public-safety",  title: "Public Safety + Emergency",        blurb: "911 triage, fire prediction, search-and-rescue, mass-casualty.",                                         housekeeping: "FCC · NENA · CISA" },
];

export default function VerticalIndexPage() {
  return (
    <main className="bg-[#08090B] text-[#F4F4F2] antialiased">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:px-10 md:pt-32 md:pb-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
            <span className="text-[#9CA3AF]">§ Verticals</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#22F0D5]">AI in twenty real industries</span>
          </p>
          <h1 className="mt-10 max-w-[22ch] text-balance text-[clamp(44px,7vw,96px)] font-extralight leading-[1.02] tracking-[-0.03em] text-[#F4F4F2]">
            What AI actually does in twenty industries that ship.
          </h1>
          <p
            className="mt-10 max-w-[68ch] font-serif text-[19px] leading-[1.55] text-[#9CA3AF]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Each card is a long-form applied guide — what is deployed in
            production today, who is shipping, the five real use-cases
            that work, what the sector still cannot do, regulatory reality,
            and what a senior operator should do this quarter.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <ul role="list" className="grid grid-cols-1 gap-px border border-[#1F242B] bg-[#1F242B] md:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((s, i) => (
              <li key={s.slug} className="bg-[#0F1114]">
                <Link
                  href={`/learn/vertical/${s.slug}`}
                  className="group flex h-full flex-col gap-4 p-7 transition-colors hover:bg-[#08090B] md:p-9"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                    <span className="text-[#1F242B]">V/{String(i + 1).padStart(2, "0")}</span> · {s.housekeeping}
                  </p>
                  <h2
                    className="font-serif text-[24px] leading-[1.2] tracking-[-0.005em] text-[#F4F4F2] transition-colors group-hover:text-[#22F0D5] md:text-[28px]"
                    style={{ fontFamily: "Newsreader, Garamond, Georgia, serif" }}
                  >
                    {s.title}
                  </h2>
                  <p
                    className="font-serif text-[16px] leading-[1.55] text-[#9CA3AF]"
                    style={{ fontFamily: "Newsreader, Georgia, serif" }}
                  >
                    {s.blurb}
                  </p>
                  <p className="mt-auto pt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                    /learn/vertical/{s.slug}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p
            className="font-serif text-[17px] italic leading-[1.55] text-[#9CA3AF]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            All twenty guides are CC-BY 4.0. Each cites real deployed
            systems, named vendors, and current regulatory reality. None
            cite hype.
          </p>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 border border-[#1F242B] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
            >
              <span aria-hidden>←</span>
              <span>Back to /learn</span>
            </Link>
            <Link
              href="/learn/atlas"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
            >
              Atlas (foundations)
            </Link>
            <Link
              href="/learn/cyber"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
            >
              Cyber catalog
            </Link>
            <Link
              href="/research/decoded"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition-colors hover:text-[#22F0D5]"
            >
              Decoded papers
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
