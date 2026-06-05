import type { Metadata } from "next";

const QUESTION = "What is the EU AI Act?";
const SHORT_ANSWER =
  "The EU AI Act (Regulation (EU) 2024/1689) is the European Union's horizontal regulation on artificial intelligence, adopted on 13 March 2024 and in force from 1 August 2024. It classifies AI systems into four risk tiers — unacceptable, high, limited, and minimal — bans practices like social scoring and untargeted facial image scraping, and imposes conformity assessments on high-risk systems. Maximum fines reach EUR 35 million or 7% of global annual turnover.";
const CANONICAL = "https://atomeons.com/q/what-is-the-eu-ai-act";

export const metadata: Metadata = {
  title: QUESTION,
  description: SHORT_ANSWER,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: QUESTION,
    description: SHORT_ANSWER,
    url: CANONICAL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: QUESTION,
    description: SHORT_ANSWER,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: QUESTION,
      acceptedAnswer: {
        "@type": "Answer",
        text: SHORT_ANSWER,
      },
    },
  ],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <nav className="mb-10 text-xs uppercase tracking-[0.18em] text-[#7a7a7a]">
          <a href="/" className="hover:text-[#ff7a00]">atomeons</a>
          <span className="mx-2 text-[#3a3a3a]">/</span>
          <a href="/q" className="hover:text-[#ff7a00]">q</a>
          <span className="mx-2 text-[#3a3a3a]">/</span>
          <span className="text-[#a8a8a8]">what-is-the-eu-ai-act</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.08]">
          {QUESTION}
        </h1>

        <section className="mt-10 border-l-2 border-[#ff7a00] pl-5">
          <h2 className="text-xs uppercase tracking-[0.22em] text-[#ff7a00] mb-3">
            The short answer
          </h2>
          <p className="text-lg leading-relaxed text-[#e8e8e8]">
            The EU AI Act (<strong>Regulation (EU) 2024/1689</strong>) is the European
            Union's horizontal regulation on artificial intelligence, adopted by the
            European Parliament on <strong>13 March 2024</strong> and entered into force
            on <strong>1 August 2024</strong>. It classifies AI systems into four risk
            tiers — unacceptable, high, limited, and minimal — and bans certain practices
            (such as social scoring and real-time biometric identification in public
            spaces) while imposing conformity assessments on high-risk systems. Maximum
            fines reach <strong>EUR 35 million or 7% of global annual turnover</strong>,
            whichever is higher.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-xs uppercase tracking-[0.22em] text-[#7a7a7a] mb-4">
            The longer answer
          </h2>
          <div className="space-y-5 text-[#cfcfcf] leading-relaxed">
            <p>
              The EU AI Act is the first comprehensive cross-sectoral statute regulating
              artificial intelligence in any major jurisdiction. Its formal title is{" "}
              <em>
                Regulation (EU) 2024/1689 of the European Parliament and of the Council of
                13 June 2024 laying down harmonised rules on artificial intelligence
              </em>
              . It was published in the Official Journal of the European Union on 12 July
              2024 and entered into force twenty days later, on 1 August 2024.
            </p>
            <p>
              The regulation takes a risk-based approach. It bans a short list of
              "unacceptable risk" practices under Article 5 — including untargeted
              scraping of facial images to build recognition databases, social scoring by
              public authorities, emotion recognition in workplaces and schools (with
              narrow exceptions), and real-time remote biometric identification in
              publicly accessible spaces for law enforcement. These prohibitions became
              applicable on 2 February 2025.
            </p>
            <p>
              "High-risk" AI systems — defined in Annex III and including systems used in
              biometric identification, critical infrastructure, education, employment,
              essential services, law enforcement, migration, and administration of
              justice — must undergo conformity assessment, maintain risk management
              systems, ensure data governance, keep technical documentation, log
              automatically, provide transparency to deployers, allow human oversight, and
              meet accuracy, robustness, and cybersecurity requirements (Articles 8
              through 15). Providers must register them in an EU database before placing
              them on the market (Article 71).
            </p>
            <p>
              The Act regulates general-purpose AI (GPAI) models under Chapter V. All GPAI
              providers must publish a sufficiently detailed summary of training content
              and respect EU copyright law. GPAI models classified as having "systemic
              risk" — initially those trained with more than 10^25 floating-point
              operations of compute — face additional obligations including model
              evaluation, adversarial testing, serious-incident reporting, and
              cybersecurity protection (Article 51, Article 55). Obligations for GPAI
              providers became applicable on 2 August 2025.
            </p>
            <p>
              Enforcement is layered. The European AI Office, established within the
              European Commission's DG CNECT in February 2024, supervises GPAI providers
              directly. National competent authorities supervise high-risk systems in
              each member state. The European Artificial Intelligence Board coordinates
              across member states. Maximum administrative fines under Article 99 are EUR
              35 million or 7% of total worldwide annual turnover for prohibited
              practices, EUR 15 million or 3% for most other violations, and EUR 7.5
              million or 1% for supplying incorrect information.
            </p>
            <p>
              The application timeline is staggered: prohibitions and AI literacy
              obligations from 2 February 2025; GPAI rules and governance from 2 August
              2025; the bulk of high-risk obligations from 2 August 2026; and remaining
              high-risk obligations covering AI embedded in regulated products (Annex I)
              from 2 August 2027. The Act applies extraterritorially to providers placing
              AI systems on the EU market and to deployers and providers outside the EU
              whose system outputs are used in the EU (Article 2).
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xs uppercase tracking-[0.22em] text-[#7a7a7a] mb-4">
            Key facts
          </h2>
          <ul className="space-y-3 text-[#cfcfcf]">
            <li className="flex gap-3">
              <span className="text-[#ff7a00] mt-1.5">▸</span>
              <span>
                Formal citation: Regulation (EU) 2024/1689, published in the Official
                Journal of the European Union, L series, 12 July 2024 (OJ L, 2024/1689).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#ff7a00] mt-1.5">▸</span>
              <span>
                The Act entered into force on 1 August 2024, twenty days after publication
                (Article 113).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#ff7a00] mt-1.5">▸</span>
              <span>
                Article 5 prohibitions on unacceptable-risk practices applied from 2
                February 2025 (Article 113(a)).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#ff7a00] mt-1.5">▸</span>
              <span>
                GPAI model obligations under Chapter V applied from 2 August 2025; the
                bulk of high-risk obligations apply from 2 August 2026 (Article 113).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#ff7a00] mt-1.5">▸</span>
              <span>
                Maximum fines under Article 99: EUR 35 million or 7% of global annual
                turnover for Article 5 violations; EUR 15 million or 3% for other
                obligations.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#ff7a00] mt-1.5">▸</span>
              <span>
                The systemic-risk GPAI threshold is set at 10^25 cumulative training
                FLOPs (Article 51(2)).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#ff7a00] mt-1.5">▸</span>
              <span>
                The European AI Office was established by Commission Decision C(2024) 390
                of 24 January 2024 and began operations in February 2024.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#ff7a00] mt-1.5">▸</span>
              <span>
                The Act amends nine prior EU laws including Regulation (EU) 2018/858 on
                motor vehicle type-approval and Regulation (EU) 2019/2144 on vehicle
                safety.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#ff7a00] mt-1.5">▸</span>
              <span>
                Annex III lists eight categories of high-risk AI systems including
                biometrics, critical infrastructure, and law enforcement.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#ff7a00] mt-1.5">▸</span>
              <span>
                The Act applies to providers and deployers outside the EU if system
                output is used inside the EU (Article 2(1)(c)).
              </span>
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xs uppercase tracking-[0.22em] text-[#7a7a7a] mb-4">
            Related questions
          </h2>
          <ul className="space-y-2.5">
            <li>
              <a
                href="/q/what-is-a-high-risk-ai-system"
                className="text-[#e8e8e8] hover:text-[#ff7a00] underline decoration-[#3a3a3a] underline-offset-4 hover:decoration-[#ff7a00]"
              >
                What is a high-risk AI system under the EU AI Act?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-the-nist-ai-rmf"
                className="text-[#e8e8e8] hover:text-[#ff7a00] underline decoration-[#3a3a3a] underline-offset-4 hover:decoration-[#ff7a00]"
              >
                What is the NIST AI Risk Management Framework?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-general-purpose-ai"
                className="text-[#e8e8e8] hover:text-[#ff7a00] underline decoration-[#3a3a3a] underline-offset-4 hover:decoration-[#ff7a00]"
              >
                What is general-purpose AI under EU law?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-iso-iec-42001"
                className="text-[#e8e8e8] hover:text-[#ff7a00] underline decoration-[#3a3a3a] underline-offset-4 hover:decoration-[#ff7a00]"
              >
                What is ISO/IEC 42001?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-the-eu-ai-liability-directive"
                className="text-[#e8e8e8] hover:text-[#ff7a00] underline decoration-[#3a3a3a] underline-offset-4 hover:decoration-[#ff7a00]"
              >
                What is the EU AI Liability Directive?
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-14 pb-10">
          <h2 className="text-xs uppercase tracking-[0.22em] text-[#7a7a7a] mb-4">
            Sources
          </h2>
          <ul className="space-y-2.5 text-sm text-[#a8a8a8]">
            <li>
              <a
                href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
                className="hover:text-[#ff7a00] break-all"
                rel="noopener noreferrer"
                target="_blank"
              >
                Regulation (EU) 2024/1689 — Official Journal of the European Union
              </a>
            </li>
            <li>
              <a
                href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
                className="hover:text-[#ff7a00] break-all"
                rel="noopener noreferrer"
                target="_blank"
              >
                European Commission — AI Act overview
              </a>
            </li>
            <li>
              <a
                href="https://digital-strategy.ec.europa.eu/en/policies/ai-office"
                className="hover:text-[#ff7a00] break-all"
                rel="noopener noreferrer"
                target="_blank"
              >
                European AI Office (DG CNECT)
              </a>
            </li>
            <li>
              <a
                href="https://digital-strategy.ec.europa.eu/en/library/commission-decision-establishing-european-ai-office"
                className="hover:text-[#ff7a00] break-all"
                rel="noopener noreferrer"
                target="_blank"
              >
                Commission Decision C(2024) 390 — establishing the European AI Office
              </a>
            </li>
            <li>
              <a
                href="https://www.europarl.europa.eu/news/en/press-room/20240308IPR19015/artificial-intelligence-act-meps-adopt-landmark-law"
                className="hover:text-[#ff7a00] break-all"
                rel="noopener noreferrer"
                target="_blank"
              >
                European Parliament — AI Act adoption press release (13 March 2024)
              </a>
            </li>
            <li>
              <a
                href="https://artificialintelligenceact.eu/"
                className="hover:text-[#ff7a00] break-all"
                rel="noopener noreferrer"
                target="_blank"
              >
                EU AI Act Explorer — Future of Life Institute
              </a>
            </li>
            <li>
              <a
                href="https://www.nist.gov/itl/ai-risk-management-framework"
                className="hover:text-[#ff7a00] break-all"
                rel="noopener noreferrer"
                target="_blank"
              >
                NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1)
              </a>
            </li>
            <li>
              <a
                href="https://www.iso.org/standard/81230.html"
                className="hover:text-[#ff7a00] break-all"
                rel="noopener noreferrer"
                target="_blank"
              >
                ISO/IEC 42001:2023 — Artificial intelligence management system
              </a>
            </li>
          </ul>
        </section>

        <footer className="mt-10 pt-8 border-t border-[#1a1a1a] text-xs text-[#5a5a5a]">
          <p>
            Published by{" "}
            <a href="/" className="text-[#7a7a7a] hover:text-[#ff7a00]">
              AtomEons
            </a>{" "}
            · Last reviewed 2026-06-05 · Not legal advice.
          </p>
        </footer>
      </article>
    </main>
  );
}