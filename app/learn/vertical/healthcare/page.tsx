import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI in Healthcare — AtomEons Lab Brief",
  description:
    "Ambient scribes shipped at scale, autonomous diagnosis still gated. A lab brief on what is actually deployed across US health systems, payers, and pharma in 2026.",
  openGraph: {
    title: "AI in Healthcare — AtomEons Lab Brief",
    description:
      "What is actually deployed in healthcare AI today — Epic, Abridge, DAX, Viz.ai, OpenEvidence, Tempus, Recursion, Insilico, Isomorphic — and what still does not work.",
    type: "article",
  },
};

export default function Page() {
  return (
    <main
      className="min-h-screen bg-[#0a0a0a] text-[#e6e6e6]"
      style={{ fontFamily: "Newsreader, ui-serif, Georgia, serif" }}
    >
      <article className="mx-auto max-w-3xl px-6 py-20">
        <header className="mb-16 border-b border-[#1f1f1f] pb-10">
          <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#7a7a7a]">
            <span>Vertical</span>
            <span className="text-[#3a3a3a]">/</span>
            <span>Lab Brief</span>
            <span className="text-[#3a3a3a]">/</span>
            <span className="text-[#c97a3a]">Healthcare</span>
          </div>
          <h1 className="text-5xl font-normal leading-[1.08] tracking-tight text-[#f5f1ea] md:text-6xl">
            AI in Healthcare
          </h1>
          <p className="mt-6 text-xl italic leading-snug text-[#a8a39a]">
            Ambient scribes shipped at scale, autonomous diagnosis still gated.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 text-[15px] leading-relaxed text-[#bdb8af] md:grid-cols-2">
            <div>
              <div className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#7a7a7a]">
                Summary
              </div>
              <p>
                Healthcare AI in 2026 has bifurcated into two distinct
                realities. Documentation, coding, and imaging-triage tools are
                deployed across hundreds of health systems with measurable
                physician adoption and revenue traction. Autonomous clinical
                decision-making, end-to-end drug discovery, and unsupervised
                patient-facing triage remain regulated, gated, and largely in
                pilot. The gap between what is being marketed and what is
                generating reimbursable workflow change is wide. This page
                documents what is actually shipping at named health systems,
                what the FDA has and has not cleared, where revenue is real,
                and the moves a senior operator should make this quarter.
              </p>
            </div>
            <div>
              <div className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#7a7a7a]">
                Lede
              </div>
              <p>
                Ambient scribes write notes for tens of thousands of US
                clinicians every day. Radiology AI reads triage queues at
                hundreds of hospitals. Meanwhile, no large language model has
                cleared FDA as an autonomous diagnostic device, and not a
                single AI-discovered drug has reached commercial approval. The
                sector is shipping where the liability surface is narrow and
                the human stays in the loop. That gap defines every honest
                investment decision in 2026.
              </p>
            </div>
          </div>
        </header>

        <Section title="The honest state of AI in this sector">
          <p>
            The most-deployed healthcare AI in 2026 is not a diagnostic. It is
            a stenographer. Ambient documentation tools — Microsoft DAX Copilot
            (Nuance), Abridge, Suki, and the Epic-integrated scribes — are now
            used by tens of thousands of physicians daily across the Mayo
            Clinic, Kaiser Permanente, Stanford Health, Sutter, Atrium, and
            most of the major US academic medical centers. Permanente Medical
            Group disclosed in 2024 that it had deployed Abridge to over
            10,000 physicians across The Permanente Medical Group region. Mass
            General Brigham, UPMC, and Emory have publicly named Abridge as
            their ambient scribe of record. This is the part of healthcare AI
            that is unambiguously working: it reduces documentation time, it
            bills cleanly through existing E/M workflow, and the physician
            signs the note.
          </p>
          <p>
            The second deployed category is imaging triage. Aidoc, Viz.ai, and
            RapidAI have FDA-cleared algorithms running in production at over
            a thousand US hospitals collectively, flagging suspected
            large-vessel occlusion strokes, pulmonary embolism, and
            intracranial hemorrhage on CT. These are narrow, FDA-cleared,
            time-to-treatment-shortening tools that route critical findings to
            the on-call specialist&apos;s phone. Viz.ai&apos;s LVO algorithm
            received the first New Technology Add-on Payment from CMS for AI
            software (NTAP, effective FY 2021), which created the first real
            reimbursement precedent for AI in radiology.
          </p>
          <p>
            The third category that ships: clinical search and evidence
            summarization. OpenEvidence, founded by Daniel Nadler, is used by
            a substantial share of US physicians by its own disclosures and
            Mayo Clinic partnership announcements, providing point-of-care
            medical literature retrieval grounded in NEJM and JAMA
            partnerships. UpToDate from Wolters Kluwer is integrating
            LLM-based summarization on top of its editorially curated base.
          </p>
          <p>
            Where the sector stalls: autonomous clinical decision-making.
            There is no FDA-cleared large language model authorized to
            diagnose without a physician sign-off. Hippocratic AI&apos;s
            &ldquo;safety-focused&rdquo; agents are deployed for outbound
            non-diagnostic patient outreach — appointment reminders,
            post-discharge check-ins, chronic care follow-up — explicitly
            avoiding the diagnostic decision surface. Drug discovery AI
            companies have generated candidates that have reached clinical
            trials (Insilico&apos;s INS018_055 in Phase II for IPF,
            Recursion&apos;s REC-994 in Phase II for cerebral cavernous
            malformations), but as of the current cycle no drug whose
            discovery was AI-led has reached FDA approval. The hype line and
            the deployment line are far apart, and a senior operator must
            hold them separate.
          </p>
        </Section>

        <Section title="Who is shipping (named)">
          <Entry name="Epic Systems">
            The EHR backbone for roughly 40% of US hospital patients.
            Epic&apos;s MyChart in-basket AI message drafter, built on Azure
            OpenAI, is deployed at Stanford, UC San Diego, UNC, and dozens of
            other Epic customers. Epic Cosmos and the Microsoft partnership
            is the most consequential AI distribution channel in US
            healthcare.
          </Entry>
          <Entry name="Microsoft / Nuance DAX Copilot">
            Acquired Nuance for $19.7B in 2022; DAX Copilot is the ambient
            scribe with the deepest Epic integration. Deployed at Atrium,
            WellSpan, Stanford, and many of the largest IDNs.
          </Entry>
          <Entry name="Abridge">
            Pittsburgh-based ambient scribe. Raised a $250M Series E in early
            2025 at a reported $2.75B valuation, with subsequent rounds
            reported in 2025. Named partnerships include Kaiser Permanente,
            Mass General Brigham, Emory, UPMC, Christus Health, Yale New
            Haven.
          </Entry>
          <Entry name="Suki AI">
            Voice-based ambient assistant, integrates with Epic, Oracle
            Health, Athenahealth. Deployed at MedStar, Texas Oncology, and
            dozens of independent practices.
          </Entry>
          <Entry name="Hippocratic AI">
            Founded by Munjal Shah. Builds &ldquo;safety-focused&rdquo;
            non-diagnostic agents for patient-facing roles (post-discharge
            calls, chronic care outreach). Raised a Series B at a reported
            $1.6B valuation in early 2025. Partners disclosed include
            Cincinnati Children&apos;s and WellSpan.
          </Entry>
          <Entry name="OpenEvidence">
            Clinical literature search and grounded Q&amp;A for physicians.
            Free at point of use, partnered with NEJM Group and the AMA.
            Sequoia-led Series A.
          </Entry>
          <Entry name="Tempus AI">
            Public (NASDAQ: TEM), IPO&apos;d June 2024. Genomic sequencing
            plus clinical AI for oncology, cardiology, and depression.
            Reported revenue of over $700M in 2024 with multiple Q reports
            filed with the SEC.
          </Entry>
          <Entry name="Recursion Pharmaceuticals">
            Public (NASDAQ: RXRX). Phenotypic drug discovery using
            high-content imaging plus ML. Merged with Exscientia in 2024.
            Multiple clinical-stage candidates, including REC-994.
          </Entry>
          <Entry name="Insilico Medicine">
            Generative chemistry and target discovery. INS018_055 (TNIK
            inhibitor for idiopathic pulmonary fibrosis) is in Phase IIa —
            the most-publicized AI-discovered candidate in human trials.
          </Entry>
          <Entry name="Isomorphic Labs">
            Alphabet/DeepMind spinout, building on AlphaFold for drug design.
            Multi-billion-dollar deals announced with Novartis and Eli Lilly
            in January 2024.
          </Entry>
          <Entry name="Iambic Therapeutics">
            Generative AI for small molecule drug design. IAM1363 (HER2) and
            IAM-H1 in clinical development.
          </Entry>
          <Entry name="Aidoc &middot; Viz.ai &middot; RapidAI">
            Radiology AI orchestration. Aidoc claims 1,500+ hospital sites
            globally with multiple FDA clearances. Viz.ai holds the first
            NTAP for AI software (FY 2021) for LVO triage.
          </Entry>
        </Section>

        <Section title="The five real use-cases that work">
          <NumberedUseCase n={1} title="Ambient clinical documentation">
            Deployed by Kaiser Permanente (Abridge across The Permanente
            Medical Group), Mass General Brigham (Abridge), Stanford Health
            Care, Atrium Health (DAX). The tool listens to the encounter,
            drafts the SOAP note, and routes it to the EHR for physician edit
            and sign. Replaced typed or dictated notes written after-hours —
            the largest single contributor to physician burnout per the AMA
            2023 burnout survey. The only category where adoption is
            unambiguous.
          </NumberedUseCase>
          <NumberedUseCase n={2} title="Stroke and LVO triage from CT angiography">
            Deployed by HCA Healthcare, Mount Sinai, and over a thousand US
            hospital sites collectively running Viz.ai or RapidAI. The
            algorithm processes CT angiograms in the ED, flags suspected
            large-vessel occlusion, and pages the interventional neurology
            team directly — compressing door-to-needle and door-to-puncture
            times. Reimbursement: Viz.ai&apos;s NTAP established the first
            AI-software reimbursement code in US hospitals.
          </NumberedUseCase>
          <NumberedUseCase n={3} title="In-basket message drafting for physicians">
            Deployed by UC San Diego Health, Stanford, UNC Health, and a
            growing list of Epic customers using the Epic-Microsoft
            GPT-powered MyChart message draft feature. Drafts replies to
            patient portal messages for physician review and edit before
            send. UCSD published in JAMA Network Open (2024) that AI-drafted
            messages were rated more empathetic than physician-only drafts.
          </NumberedUseCase>
          <NumberedUseCase n={4} title="Medical coding and revenue-cycle augmentation">
            Deployed by Epic (revenue cycle modules), 3M/Solventum CDI, and
            platforms used by major IDNs. AI extracts diagnostic codes from
            clinical documentation for coder review, reducing under-coding
            and accelerating bill submission. The clearest downstream
            economic case in healthcare AI — revenue cycle leakage is
            measurable in basis points of net patient revenue.
          </NumberedUseCase>
          <NumberedUseCase n={5} title="Point-of-care evidence retrieval">
            OpenEvidence deployed at hundreds of academic medical centers and
            via its free tier; UpToDate (Wolters Kluwer) with newer
            LLM-summarization layers. Answers clinical questions at the
            bedside, grounded in indexed peer-reviewed literature with
            citations. OpenEvidence&apos;s partnerships with NEJM Group and
            the AMA in 2024 are the source-of-truth grounding move that
            makes this category defensible against general-purpose LLM
            hallucination.
          </NumberedUseCase>
        </Section>

        <Section title="What the sector still cannot do">
          <p>
            <strong className="text-[#f5f1ea]">Autonomous diagnosis.</strong> No
            FDA-cleared LLM is authorized to deliver a final diagnosis without
            a clinician in the loop. The FDA SaMD pathway treats autonomous
            diagnostic LLMs as Class II or III devices requiring clinical
            evidence the field has not yet produced at scale.
          </p>
          <p>
            <strong className="text-[#f5f1ea]">End-to-end drug discovery.</strong>{" "}
            No drug whose discovery was AI-led has received FDA approval.
            Multiple candidates are in Phase I and II (Insilico INS018_055,
            Recursion REC-994, BenevolentAI and Exscientia candidates), with
            mixed Phase II readouts.
          </p>
          <p>
            <strong className="text-[#f5f1ea]">
              Hallucination-free open-domain clinical Q&amp;A.
            </strong>{" "}
            Even with retrieval-augmented generation, LLM medical Q&amp;A
            still produces confidently wrong citations and dosage errors at
            non-zero rates. Every shipping product in this space gates output
            behind a clinician edit step or restricts scope to non-diagnostic
            outreach.
          </p>
          <p>
            <strong className="text-[#f5f1ea]">
              Autonomous mental health therapy.
            </strong>{" "}
            No FDA-cleared autonomous psychotherapy LLM exists. Woebot Health
            and others operate as wellness, not medical devices, and the
            regulatory line is being actively redrawn.
          </p>
          <p>
            <strong className="text-[#f5f1ea]">
              Real-world data interoperability at scale.
            </strong>{" "}
            Health systems still struggle to extract structured data across
            Epic, Oracle Health (Cerner), and MEDITECH. TEFCA is rolling out
            but does not yet deliver the consistent training-data substrate
            AI vendors need.
          </p>
          <p>
            <strong className="text-[#f5f1ea]">
              Bias-audited deployment at scale.
            </strong>{" "}
            Published audits (Obermeyer et al. 2019 on a commercial risk
            algorithm) continue to find racial and socioeconomic bias in
            deployed algorithms. The ONC HTI-1 transparency rule is the first
            federal requirement that decision-support algorithms in certified
            EHRs disclose their training data and intended use.
          </p>
        </Section>

        <Section title="Regulatory + compliance reality">
          <p>
            <strong className="text-[#f5f1ea]">HIPAA</strong> governs PHI in
            all clinical AI. Any vendor processing patient data must execute a
            Business Associate Agreement. AWS, Azure, and GCP all offer
            HIPAA-eligible services; OpenAI offers HIPAA-eligible deployments
            through Azure OpenAI and via direct BAA arrangements disclosed in
            2024.
          </p>
          <p>
            <strong className="text-[#f5f1ea]">FDA SaMD pathway.</strong> The
            FDA&apos;s CDRH maintains a public list of over 1,000 AI/ML-enabled
            medical devices that have received clearance, the overwhelming
            majority being radiology and cardiology imaging. The Predetermined
            Change Control Plan guidance (draft 2023, finalized 2024) is the
            mechanism by which adaptive models can be updated post-clearance
            without a new 510(k). No standalone LLM has received SaMD
            clearance as a diagnostic device as of this writing.
          </p>
          <p>
            <strong className="text-[#f5f1ea]">ONC HTI-1.</strong> Finalized
            December 2023. Requires certified EHR developers to disclose
            information about predictive Decision Support Interventions —
            source data, intended use, fairness considerations. The first
            federal transparency requirement for AI inside the EHR.
          </p>
          <p>
            <strong className="text-[#f5f1ea]">CMS reimbursement.</strong>{" "}
            NTAPs for AI software (Viz.ai LVO as the precedent) and the FY
            2024 IPPS rule established the inpatient pathway. Outpatient AI
            reimbursement remains case-by-case via CPT category III codes.
          </p>
          <p>
            <strong className="text-[#f5f1ea]">FTC enforcement.</strong> The
            FTC&apos;s 2023 settlement with BetterHelp ($7.8M) and 2023 order
            against GoodRx ($1.5M) over health-data sharing with advertisers
            set the floor for health-adjacent AI on consumer data practices.
          </p>
          <p>
            <strong className="text-[#f5f1ea]">GDPR / EU AI Act.</strong> The
            EU AI Act (in force 2024, full applicability through 2026–2027)
            classifies most clinical decision support as high-risk AI with
            conformity assessment, data governance, and post-market
            monitoring obligations. EU-deployed healthcare AI now needs both
            MDR/IVDR and AI Act compliance.
          </p>
        </Section>

        <Section title="What a senior operator should do this quarter">
          <p>
            <strong className="text-[#f5f1ea]">
              For a provider CIO/CMIO:
            </strong>{" "}
            Pick one ambient scribe (Abridge, DAX Copilot, or Suki) and pilot
            in two specialties — ideally one primary care and one specialty
            with high after-hours documentation load (oncology, cardiology).
            Measure documentation time, after-hours EHR access, and patient
            throughput. Require HTI-1 disclosure, BAA, SOC 2 Type II, and a
            sample bias audit if the tool touches clinical decision content.
            Do not sign enterprise-wide before single-specialty data clears.
          </p>
          <p>
            <strong className="text-[#f5f1ea]">For a payer:</strong> Evaluate
            AI for prior authorization automation cautiously. The
            UnitedHealth nH Predict controversy and the Cigna PXDX class
            action are the regulatory backdrop. Any auto-denial pipeline
            carries real litigation surface. Focus AI investment instead on
            member outreach (Hippocratic-style non-diagnostic agents), call
            center augmentation, and claims adjudication where the human
            remains the decision-maker.
          </p>
          <p>
            <strong className="text-[#f5f1ea]">For a pharma operator:</strong>{" "}
            Run a discovery partnership with one of the named AI platforms
            (Isomorphic Labs, Recursion, Insilico, Iambic) on a narrow target
            where you control the chemistry validation. Do not outsource the
            full pipeline. AlphaFold is table stakes; the differentiated
            capability is in the proprietary chemistry and assay loop, not
            in the structure prediction itself.
          </p>
          <p>
            <strong className="text-[#f5f1ea]">For all three:</strong> Stand
            up an internal AI governance committee with clinical, legal, IT
            security, and compliance representation before deployment scales.
            The 2025 enforcement cycle will surface real penalties for
            vendors and deployers that ignored HTI-1, the AI Act, or HIPAA
            BAA discipline. The cheap move is to be the operator that
            already documented its governance when the audit arrives.
          </p>
        </Section>

        <Section title="Receipts">
          <ul className="list-none space-y-3 pl-0">
            {[
              "FDA's 'Artificial Intelligence and Machine Learning (AI/ML)-Enabled Medical Devices' public list (fda.gov) — over 1,000 cleared devices, overwhelmingly imaging and cardiology.",
              "ONC HTI-1 Final Rule, Federal Register, December 13, 2023, requiring DSI transparency in certified EHR technology.",
              "Permanente Medical Group public statements (2024) on Abridge deployment; Abridge press releases naming Kaiser, Mass General Brigham, Emory, UPMC, Christus, Yale New Haven.",
              "Tempus AI Form S-1 and subsequent 10-Q filings with the SEC following its June 2024 IPO (NASDAQ: TEM).",
              "Recursion Pharmaceuticals SEC filings (NASDAQ: RXRX) and the November 2024 closing of the Exscientia merger.",
              "Microsoft's 2022 closing of the Nuance acquisition ($19.7B, disclosed in Microsoft 10-K filings).",
              "Isomorphic Labs press releases (January 2024) announcing strategic research collaborations with Novartis and Eli Lilly.",
              "JAMA Network Open, Ayers et al. and UCSD AI-drafted patient message studies (2023–2024).",
              "CMS FY 2021 IPPS Final Rule establishing the first NTAP for AI software (Viz.ai LVO).",
              "FTC settlements with BetterHelp (2023, $7.8M) and GoodRx (2023, $1.5M) — Federal Register and FTC press releases.",
            ].map((r) => (
              <li
                key={r}
                className="border-l-2 border-[#c97a3a]/60 pl-4 text-[15px] leading-relaxed text-[#bdb8af]"
              >
                {r}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Further reading">
          <ul className="list-none space-y-2 pl-0">
            {[
              "FDA Center for Devices and Radiological Health, 'Artificial Intelligence and Machine Learning in Software as a Medical Device' guidance documents.",
              "ONC HTI-1 Final Rule, Federal Register, December 2023.",
              "Obermeyer, Powers, Vogeli, Mullainathan, 'Dissecting racial bias in an algorithm used to manage the health of populations,' Science 2019.",
              "Coalition for Health AI (CHAI) 'Blueprint for Trustworthy AI Implementation Guidance and Assurance for Healthcare,' 2023 and subsequent revisions.",
              "AMA 'Augmented Intelligence in Health Care' policy and physician-survey reports (2023–2024).",
              "The Permanente Medical Group and Kaiser Permanente published reports on ambient scribe deployment outcomes.",
              "DeepMind / Isomorphic Labs AlphaFold 3 paper in Nature, May 2024.",
              "EU AI Act, Regulation (EU) 2024/1689, Official Journal of the European Union.",
            ].map((r) => (
              <li
                key={r}
                className="pl-4 text-[15px] leading-relaxed text-[#a8a39a] before:mr-2 before:text-[#c97a3a] before:content-['→']"
              >
                {r}
              </li>
            ))}
          </ul>
        </Section>

        <footer className="mt-20 border-t border-[#1f1f1f] pt-8 text-[12px] uppercase tracking-[0.22em] text-[#5a5a5a]">
          <div className="flex items-center justify-between">
            <span>AtomEons Lab Brief · Vertical</span>
            <span className="text-[#c97a3a]">Healthcare</span>
          </div>
          <p className="mt-3 normal-case tracking-normal text-[13px] text-[#7a7a7a]">
            Public information only. Cited entities are real and verifiable
            through SEC filings, FDA databases, the Federal Register, and
            named-vendor press releases. No invented citations.
          </p>
        </footer>
      </article>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <h2 className="mb-6 text-[11px] uppercase tracking-[0.28em] text-[#c97a3a]">
        {title}
      </h2>
      <div className="space-y-5 text-[17px] leading-[1.7] text-[#cfc9bf]">
        {children}
      </div>
    </section>
  );
}

function Entry({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-[#1f1f1f] pl-5">
      <div className="mb-1 text-[15px] font-medium tracking-tight text-[#f5f1ea]">
        {name}
      </div>
      <p className="text-[15px] leading-relaxed text-[#bdb8af]">{children}</p>
    </div>
  );
}

function NumberedUseCase({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-5">
      <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-[#c97a3a]/40 text-[14px] text-[#c97a3a]">
        {n}
      </div>
      <div>
        <div className="mb-2 text-[17px] font-medium tracking-tight text-[#f5f1ea]">
          {title}
        </div>
        <p className="text-[15px] leading-relaxed text-[#bdb8af]">{children}</p>
      </div>
    </div>
  );
}