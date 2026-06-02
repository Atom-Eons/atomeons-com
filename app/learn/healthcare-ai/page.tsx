import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../_components/LearnHeroImage";

const TRACK = {
  title: "Healthcare AI",
  subtitle: "Cut the paperwork. Never cut the judgment.",
  intro: "Healthcare is the field where AI hype is loudest and the danger is highest. The same tool that can save a nurse two hours of charting per shift can also get a license pulled, trigger a HIPAA breach letter, or — worst case — contribute to a patient death. So we start here with honesty: AI in healthcare today is a documentation engine, a translator, a research librarian, and a draft-writer. It is not a diagnostician, not a prescriber, not a co-signer on your clinical judgment, and not a defense in a malpractice deposition. The phrase \"the AI said so\" has zero standing with your malpractice carrier, your state board, or a plaintiff's attorney. Where AI earns its keep right now: drafting SBAR handoffs you then verify, translating discharge instructions into plain language a patient can actually use, synthesizing the last six months of literature on a niche diagnosis before your shift, auditing your own documentation patterns for missed billing codes, and rehearsing difficult family conversations. Where it does not belong: anywhere near a treatment decision, a med dose, an imaging read, a triage call, or a chart that contains identifiable patient data on a public cloud model. The rule that organizes this entire track is simple: PHI never leaves the room. Patient identifiers — name, MRN, DOB, room number, anything from the HIPAA 18 — do not go into ChatGPT, Claude.ai consumer, Gemini consumer, or any model your hospital has not signed a Business Associate Agreement with. Local Ollama on your laptop or a BAA-covered enterprise LLM is the entire universe of legal options. Everything else is a reportable breach.",
  accent: "#22F0D5",
  personas: [
  {
    "role": "Bedside RN (med-surg, ICU, ED)",
    "context": "12-hour shifts, 4-6 patients, 60-80% of time spent charting and coordinating rather than at the bedside. Burnout-adjacent.",
    "primaryUseCase": "Documentation drafting (SBAR, shift summary, incident notes), patient education translation, on-call handoff prep — all PHI-scrubbed before AI touches it."
  },
  {
    "role": "Nurse Practitioner / PA in primary care",
    "context": "Sees 20-30 patients/day in 15-minute slots. Owns prescribing within scope. Documentation backlog is the bottleneck.",
    "primaryUseCase": "After-visit summary drafting, plain-language patient instructions, literature synthesis for unfamiliar presentations, prior auth letter scaffolds."
  },
  {
    "role": "Attending physician (hospitalist / outpatient)",
    "context": "Higher liability surface. Higher documentation burden tied to billing. Needs speed without compromising defensibility.",
    "primaryUseCase": "Discharge summary drafts, family meeting prep, literature scan for atypical cases, peer-review prep — never diagnostic reasoning offloaded to AI."
  },
  {
    "role": "Medical assistant / patient care tech",
    "context": "Front-line non-licensed staff. Handles intake, vitals, scheduling, patient questions within scope.",
    "primaryUseCase": "Translating provider instructions for patients, drafting appointment reminders, scheduling logistics, patient FAQ responses — all scope-bound, all reviewed by licensed staff."
  },
  {
    "role": "Healthcare administrator / practice manager",
    "context": "Owns scheduling, billing, compliance, HR. Sits between clinical staff and the business side.",
    "primaryUseCase": "Policy drafting, training material generation, schedule optimization, vendor RFP responses, HIPAA training refreshes — non-clinical surface only."
  },
  {
    "role": "Clinical researcher / academic clinician",
    "context": "Runs studies, writes grants, publishes. Time-poor. Lit volume is overwhelming.",
    "primaryUseCase": "Literature synthesis, methods section drafting, grant narrative scaffolding, peer review prep, statistical-plan critique — never data analysis on identifiable subjects in cloud AI."
  },
  {
    "role": "Hospital IT / clinical informaticist",
    "context": "Owns EHR integration, security, AI vendor evaluation, BAA negotiation. The person who actually has to sign off.",
    "primaryUseCase": "Vendor evaluation rubrics, BAA review, integration architecture, audit log analysis, staff training on safe AI use."
  },
  {
    "role": "Hospital case manager / discharge planner",
    "context": "Coordinates transitions of care, insurance auth, post-acute placement. Drowning in phone calls and paperwork.",
    "primaryUseCase": "Discharge plan drafting, insurance appeal letters, family communication scripts, placement search summaries."
  }
],
  safetyRules: [
  "Never paste PHI into a consumer AI tool. The HIPAA 18 identifiers — name, address, dates more specific than year, phone, email, SSN, MRN, account numbers, license numbers, vehicle IDs, device IDs, URLs, IPs, biometric IDs, photos, any other unique identifier — must be stripped or replaced with placeholders before any prompt leaves the building.",
  "Local Ollama on your own laptop OR a hospital-procured LLM with a signed Business Associate Agreement are the only legal places PHI can go. Everything else is a reportable breach under 45 CFR 164.",
  "AI does not diagnose. AI does not prescribe. AI does not decide. If an AI suggests a clinical action, you re-derive that action from your own training, your protocols, and the chart — or you don't take it.",
  "Document what the AI did, not the AI doing it. Your note says 'patient educated on diabetic foot care,' not 'AI generated education sheet given to patient.' You own the content the moment you hand it to a patient.",
  "Never use AI to make a triage decision, a med reconciliation decision, a discharge-vs-admit decision, or an end-of-life decision. These are non-delegable clinical judgments.",
  "AI hallucinates drug doses, drug interactions, and dosing intervals. Always verify against Lexicomp, Micromedex, UpToDate, or your formulary. A wrong dose is not a typo — it's a med error with your license attached.",
  "AI-generated patient education must be reviewed by a licensed clinician before it leaves the building. The reading level should be 6th grade or below. Plain language is a regulated skill, not a stylistic preference.",
  "If your state has a scope-of-practice statute that says only an MD/DO can do X (e.g., diagnose), no amount of AI output makes it legal for non-physicians to do X. Scope is statutory; AI does not amend it.",
  "Photos of patients, photos of monitors, photos of the inside of a room, photos of paperwork — none of these go into cloud AI. The HIPAA 18 includes 'full-face photos and comparable images.'",
  "If a vendor cannot show you the signed BAA and the data-handling addendum, the tool does not touch a patient encounter. 'It says HIPAA-compliant on the website' is not a BAA."
],
  stack: [
  {
    "tool": "Ollama (local, on your own laptop)",
    "use": "PHI-safe local LLM for drafting any document that has to touch real patient data. Llama 3.1 8B or Mistral 7B run on most clinical laptops. Nothing leaves the device."
  },
  {
    "tool": "Claude Enterprise or ChatGPT Enterprise with signed BAA",
    "use": "For hospital-procured workflows where the institution has done the legal work. Verify the BAA covers your specific use case before using on PHI."
  },
  {
    "tool": "Claude.ai or ChatGPT consumer (PHI-scrubbed only)",
    "use": "Literature synthesis, plain-language drafting, policy scaffolds, training material — strictly with all patient identifiers removed and replaced with placeholders like [PATIENT] / [DOB] / [MRN]."
  },
  {
    "tool": "OpenEvidence / Glass Health / Abridge / Suki",
    "use": "Healthcare-specific AI tools with clinical guardrails and BAA infrastructure. Evaluate via your IT and compliance, not via the marketing site."
  },
  {
    "tool": "Lexicomp, Micromedex, UpToDate, DynaMed",
    "use": "Gold-standard clinical references. ALWAYS verify AI-generated drug, dosing, or treatment claims against these. AI does not replace them — it sits below them in the trust hierarchy."
  },
  {
    "tool": "PubMed + Connected Papers + Elicit.org",
    "use": "Literature search and synthesis. Elicit is built on academic corpus and traces citations — better than open chat AI for evidence work, though still requires verification."
  },
  {
    "tool": "Whisper (local) or BAA-covered transcription",
    "use": "Voice-to-text for clinical dictation. If using cloud (e.g., Otter, Rev), the BAA and PHI handling must be verified. Local Whisper on your machine is the safest path."
  },
  {
    "tool": "1Password or Bitwarden",
    "use": "Credential hygiene. Reusing your hospital EHR password on a consumer AI account is how breaches happen. Treat AI tool credentials like EHR credentials."
  }
],
  doNotList: [
  "Never let AI make a diagnostic call, a treatment decision, a triage decision, or a medication choice. These are non-delegable clinical judgments tied to your license.",
  "Never paste a chart note, MRN, patient name, DOB, or any HIPAA-18 identifier into a consumer AI tool — even for a 'quick question.'",
  "Never use AI to write a note about a patient encounter you didn't actually have, didn't actually witness, or didn't actually perform. That's fabrication, and it's fraud.",
  "Never accept an AI-generated drug dose, interaction warning, or dosing interval without verifying against a sanctioned clinical reference (Lexicomp, Micromedex, UpToDate).",
  "Never use AI to generate a death notification, a bad-news delivery script, or a grief response and read it verbatim. Use it to rehearse — never to recite.",
  "Never use AI to write a peer-review letter, a complaint response, or a risk-management statement without your own legal review.",
  "Never use AI to interpret an image — radiograph, ECG, photo, slide. FDA software-as-medical-device rules apply, and consumer chat AI is not cleared."
],
  workflows: [
  {
    "name": "SBAR handoff drafter (PHI-scrubbed)",
    "goal": "Draft a clean SBAR for shift change or on-call handoff in 60 seconds, then verify against the chart before saying it out loud.",
    "ai": "Local Ollama (Llama 3.1 8B or Mistral 7B) — keeps PHI on device. If using cloud, scrub all identifiers first.",
    "prompt": "You are drafting an SBAR handoff for a registered nurse. Use this raw shift information and produce a tight SBAR. Do NOT invent any clinical detail not provided. Flag anything missing in a 'GAPS' section at the end.\n\nSITUATION (one line): [age range, sex, primary admit reason, hospital day #]\nBACKGROUND: [relevant PMH, allergies, code status, baseline mental status, isolation precautions]\nASSESSMENT: [current vitals range, mental status, pain level, lines/drains/airway, last labs of note, last imaging of note, current concerns]\nRECOMMENDATION: [what needs done this shift, pending consults, pending results, family situation]\n\nDraft the SBAR. Use clinical shorthand a nurse would use. No fluff. End with 'GAPS:' listing what's missing from the above that would normally be in a handoff (e.g., 'no code status documented', 'no allergy info').",
    "notice": "The 'GAPS' section is the whole game. AI is best at noticing what you forgot to mention. Read the gaps list out loud before you give the handoff.",
    "trap": "Don't paste the actual chart. The prompt template uses placeholders for a reason — you fill in scrubbed data, AI structures it. If you cloud-paste real PHI, you've created a breach event. Use local Ollama or a BAA tool."
  },
  {
    "name": "Plain-language discharge instructions",
    "goal": "Convert clinical discharge instructions into 6th-grade reading level a patient can actually follow at home.",
    "ai": "Claude or ChatGPT (PHI-scrubbed) — this is general translation work, no identifiers needed in the prompt.",
    "prompt": "Rewrite the following discharge instructions for a patient at a 6th-grade reading level. Constraints:\n- Use short sentences, one idea per sentence.\n- Replace medical terms with plain words but include the medical term in parentheses the first time (e.g., 'blood thinner (anticoagulant)').\n- Group into sections: 'What you have', 'Medicines to take', 'Things to watch for', 'When to call us', 'When to go to the ER', 'Your follow-up'.\n- 'When to go to the ER' must use the exact red-flag symptoms I provide and nothing else.\n- Do NOT add medical advice I didn't give you. Do NOT invent symptoms, doses, or follow-up timing.\n- At the end, list any medical claim you weren't sure about under 'CLINICIAN REVIEW NEEDED'.\n\nORIGINAL INSTRUCTIONS: [paste clinical instructions here — no patient identifiers]\nRED FLAGS THAT MEAN GO TO ER: [list the specific symptoms]\nFOLLOW-UP: [appointment type and timing only — no scheduling specifics]",
    "notice": "Reading level matters. The average U.S. adult reads at 8th grade. Patients in stress or pain drop 2-3 grades below baseline. Sixth grade is the target.",
    "trap": "AI will helpfully add 'watch for signs of infection' even if you didn't say so. Read every line and delete any clinical claim you didn't author. The 'CLINICIAN REVIEW NEEDED' section is where it confesses what it guessed at."
  },
  {
    "name": "Family communication prep (difficult conversation)",
    "goal": "Rehearse a family meeting before you walk in. Goals of care, code status changes, bad news, transition to hospice — the conversations that go badly when you wing them.",
    "ai": "Claude or ChatGPT — this is rehearsal, no real patient data needed beyond a sanitized scenario.",
    "prompt": "I'm a [role: RN, NP, MD, etc.] preparing for a family meeting. Help me rehearse. Do NOT script me — give me a framework, anticipated questions, and language options.\n\nSCENARIO (sanitized, no identifiers): [e.g., '78-year-old admitted 6 days ago with sepsis from pneumonia, now intubated and on three pressors, family hasn't accepted prognosis']\nMEETING GOAL: [e.g., 'introduce hospice as next step', 'clarify code status', 'deliver new cancer diagnosis']\nFAMILY DYNAMIC (what I know): [e.g., 'spouse is primary, two adult kids disagree, one wants 'everything done'']\nMY ROLE: [bedside RN, primary nurse, attending, charge, palliative consult, etc.]\n\nGive me:\n1) A 4-step framework for opening the meeting.\n2) Three things I should NOT say (common landmines for this scenario).\n3) Five anticipated questions and language options for responding.\n4) Two scripts I can use to redirect if it goes sideways.\n5) A closing move that ends the meeting cleanly without forcing a decision the family isn't ready to make.\n\nUse VitalTalk and Ariadne Labs Serious Illness Conversation patterns if you know them. Cite the framework you're drawing from.",
    "notice": "Rehearse. Don't recite. The point is to be ready for the three things the family will say that you didn't anticipate. AI is a sparring partner, not a script.",
    "trap": "Do not paste real names, MRNs, or specific timeline detail. Sanitize. And never read AI output verbatim to a family — it sounds scripted, and grieving families notice."
  },
  {
    "name": "Evidence synthesis before shift",
    "goal": "Get a clean summary of the last 12 months of literature on a clinical question before you see the patient or write the note.",
    "ai": "Elicit.org (academic corpus, traceable citations) or Claude with web access — verify every citation.",
    "prompt": "Synthesize the recent peer-reviewed literature on: [specific clinical question, e.g., 'optimal duration of empiric antibiotics for ventilator-associated pneumonia in adults without immunocompromise'].\n\nConstraints:\n- Only use peer-reviewed sources from the last 5 years unless landmark older work is essential.\n- Cite every claim with author, year, journal, and DOI or PMID.\n- Structure: (1) Current standard of care per major guideline (IDSA, ATS, NICE — name which), (2) Areas of recent change or controversy, (3) Strength of evidence (RCT, meta-analysis, observational, expert opinion), (4) Open questions.\n- If a citation doesn't exist or you can't verify it, say 'UNVERIFIED' next to it. Do NOT fabricate DOIs.\n- End with 'PRACTICAL TAKEAWAY' — three bullets I can use at the bedside today.\n\nDo NOT include patient-specific advice. This is a literature scan, not a treatment plan.",
    "notice": "The 'UNVERIFIED' tag is your single best AI hygiene practice for research. Trust nothing without a working DOI or PMID. Hallucinated citations are the #1 way AI gets clinicians embarrassed in M&M.",
    "trap": "AI is famous for inventing journal articles that sound real. Author, year, journal — all fabricated. Always click the DOI before you cite it in anything that leaves your laptop."
  },
  {
    "name": "Documentation pattern audit (self-review)",
    "goal": "Find the patterns in your own charting that are hurting you — undercoded encounters, missed billing modifiers, vague language that triggers denials, omitted required elements.",
    "ai": "Local Ollama only (notes contain PHI). If using cloud, every identifier must be replaced before paste.",
    "prompt": "You are auditing my clinical documentation for completeness and billing optimization. I'm going to paste 5-10 of my recent notes (PHI scrubbed and replaced with placeholders).\n\nFor each note, identify:\n1) Missing required elements for the documented level of service (e.g., for a 99214, did I document 2/3 of: detailed history, detailed exam, moderate MDM?).\n2) Vague language that an auditor or payer would flag (e.g., 'doing well', 'unchanged', 'as previously').\n3) Documented work I didn't get credit for (procedures, time-based services, complexity not reflected in the code).\n4) Risk patterns (incomplete med reconciliation, missing allergy verification, absent code status, etc.).\n\nDo NOT add clinical detail I didn't document. Only flag what's missing. End with a 'PATTERN' section showing what shows up across multiple notes — that's the habit to fix.\n\nNOTES (all PHI replaced with [PATIENT], [DOB], etc.): [paste]",
    "notice": "The PATTERN section is gold. Individual notes can be sloppy; recurring sloppiness is what gets flagged in an audit or costs you money on every encounter.",
    "trap": "PHI in cloud AI for this workflow is a breach. Local Ollama is the only safe path unless your hospital has a BAA-covered tool. Don't shortcut this."
  },
  {
    "name": "On-call handoff prep (incoming shift)",
    "goal": "Get yourself oriented to a panel of 20-30 patients you've never seen, in 10 minutes, before you take call.",
    "ai": "Local Ollama only (handoff sheets are PHI-dense).",
    "prompt": "You are helping me prep for on-call coverage. I'm going to paste the outgoing handoff sheet (PHI scrubbed). For each patient, produce:\n1) A one-sentence 'why they're here' summary.\n2) The three things most likely to need a call overnight (based on the documented issues).\n3) The one thing I should verify before the outgoing team leaves (a gap, an ambiguity, a pending result).\n4) A risk tier (LOW / MED / HIGH) for overnight instability.\n\nGroup the HIGH-tier patients at the top. Be terse. This is for memorization, not narrative.\n\nDo NOT invent clinical detail. If the handoff sheet is incomplete, flag it. End with a 'CALL OUT' section listing the 3-5 patients I should physically lay eyes on within the first hour of the shift.\n\nHANDOFF SHEET (PHI scrubbed): [paste]",
    "notice": "The 'CALL OUT' section turns a 30-patient panel into a 5-patient priority list. That's the whole point of this workflow — directing your scarce attention.",
    "trap": "Don't trust the risk tier blindly. AI ranks based on documented complexity, not on clinical instinct. A patient that looks 'LOW' on paper but the outgoing nurse pulled you aside about — believe the nurse."
  },
  {
    "name": "Patient question triage (within scope)",
    "goal": "Draft responses to patient portal messages or callback questions, scope-bounded and reviewed before send.",
    "ai": "Claude or ChatGPT (PHI-scrubbed in prompt — replace patient identifiers with [PATIENT]).",
    "prompt": "Draft a response to a patient portal message. Constraints:\n- Stay strictly within the scope of [your role: RN, MA, NP, MD].\n- If the question requires a clinical decision outside my scope, the response should be 'I need to forward this to [provider role] — they'll respond within [timeframe].'\n- Use 6th-grade reading level.\n- Acknowledge the patient's concern in the first sentence.\n- Give one clear action step.\n- Include red-flag symptoms that mean call back or go to ER (only if clinically relevant).\n- Sign-off appropriate to my role.\n- Length: under 150 words.\n\nPATIENT MESSAGE (identifiers removed): [paste]\nKNOWN CONTEXT (from chart, identifiers removed): [paste relevant clinical context — diagnoses, current meds class only, recent visits, allergies]\nMY ROLE: [RN, MA, NP, etc.]\nMY SCOPE LIMITS HERE: [e.g., 'cannot adjust meds', 'cannot order labs', 'can advise on home care for existing conditions']",
    "notice": "The scope-limit section is what keeps you legal. AI will happily draft a response that exceeds your scope of practice. You enforce the scope; AI fills in the language.",
    "trap": "Never use this to draft a response to a symptom complaint that could be serious without escalation. 'Chest pain' is not a portal message — that's a phone call from a clinician. AI doesn't triage acuity."
  },
  {
    "name": "Insurance appeal letter scaffold",
    "goal": "Draft a denial appeal that cites the clinical basis, the policy, and the relevant evidence — in the format the payer expects.",
    "ai": "Claude or ChatGPT (PHI-scrubbed) — final letter is reviewed and signed by clinician.",
    "prompt": "Draft an insurance appeal letter for a denied [service: prior auth, claim, level of care, etc.]. Format per standard payer expectations.\n\nDENIAL REASON (from EOB or denial letter, identifiers removed): [paste]\nSERVICE BEING APPEALED: [e.g., 'inpatient admission days 4-7', 'MRI lumbar spine', 'GLP-1 agonist for T2DM']\nCLINICAL JUSTIFICATION (deidentified): [the actual clinical story]\nGUIDELINE OR EVIDENCE SUPPORTING: [name the guideline — e.g., MCG, InterQual, IDSA, ACC/AHA — and any relevant studies]\nPATIENT-SPECIFIC FACTORS: [comorbidities, failed prior treatments, contraindications — all deidentified]\n\nProduce:\n1) A formal appeal letter with: (a) policy citation if you have one, (b) clinical narrative, (c) evidence/guideline citation, (d) requested resolution.\n2) Flag any claim where the citation needs verification.\n3) Suggest the two strongest arguments to lead with based on the denial reason.\n\nTone: firm, factual, no hostility. Length: under one page.",
    "notice": "Lead with the strongest argument. Payers skim. The first paragraph either gets you reconsidered or gets you a second denial.",
    "trap": "Verify every guideline citation. AI invents guideline numbers and policy versions. A wrong cite torpedoes the whole appeal and damages your credibility on the next one."
  }
],
  regulations: [
  {
    "name": "HIPAA Privacy Rule (45 CFR 164.500-534)",
    "matters": "Defines PHI and prohibits disclosure without authorization or a Business Associate Agreement. Consumer AI tools without a BAA are unauthorized disclosure the moment PHI touches the prompt."
  },
  {
    "name": "HIPAA Security Rule (45 CFR 164.302-318)",
    "matters": "Requires administrative, physical, and technical safeguards on electronic PHI. Pasting PHI into a tool you don't control violates the technical safeguard requirement and creates personal liability."
  },
  {
    "name": "HITECH Act breach notification",
    "matters": "PHI disclosure to an unauthorized AI vendor is a reportable breach. Penalties scale with willfulness — 'I didn't know' is a tier, 'I should have known' is a higher tier, 'I knew and did it anyway' is the highest."
  },
  {
    "name": "FDA Software as a Medical Device (SaMD) framework",
    "matters": "Any AI that diagnoses, treats, prevents, or mitigates disease may require FDA clearance (510(k) or De Novo). Most consumer chat AI is NOT cleared — using it to interpret imaging, ECGs, or pathology is off-label clinical use of an unregulated device."
  },
  {
    "name": "State Nurse Practice Acts",
    "matters": "Scope of practice is defined by your state board, not by what AI can produce. AI generating a diagnosis does not authorize an RN to diagnose. AI generating a prescription does not authorize a non-prescriber to prescribe."
  },
  {
    "name": "State Medical Practice Acts",
    "matters": "Practicing medicine without a license is a criminal offense in every state. Letting AI 'make the call' on diagnosis or treatment, then acting on it without independent clinical judgment, is the textbook fact pattern."
  },
  {
    "name": "CMS Conditions of Participation",
    "matters": "Documentation, medication reconciliation, discharge planning, and care coordination requirements survive AI use. AI-drafted notes still need to meet CMS standards or the encounter is unbillable and the facility is out of compliance."
  },
  {
    "name": "Business Associate Agreement (BAA) requirements",
    "matters": "A BAA is a contract that makes an AI vendor legally accountable for HIPAA compliance. Without a signed BAA covering your specific use case, the vendor cannot lawfully receive PHI — regardless of what their marketing claims."
  }
],
  caseStudy: {
  "persona": "Maya Reyes, RN, BSN — composite of three med-surg nurses on a 30-bed unit in a regional hospital. 7 years bedside, charge nurse rotation, considering NP school but burned out on documentation.",
  "before": "Maya was clocking out 45-60 minutes past shift end nearly every day, finishing notes she couldn't get to during the shift. She was charting on the toilet, charting in the parking lot, charting from home. Her handoffs were rushed and she'd had two near-miss incidents tied to incomplete SBARs. She'd tried ChatGPT once on her phone during break, pasted in a chart, then panicked when she remembered HIPAA. She deleted the conversation and didn't tell anyone.",
  "shift": "After a colleague mentioned local Ollama, Maya installed it on her personal laptop in about an hour. She built a single workflow: at the start of shift, she opens her template, types in scrubbed shift data using initials and age-ranges instead of names, and Ollama drafts her SBAR structure. She verifies against the chart, fills in the actual identifiers manually in her shift card, and gives the handoff. She also started using Claude.ai (consumer) for plain-language discharge sheets — but only after replacing every patient identifier with placeholders.",
  "outcome": "Six months in: shift charting time down from ~70 minutes of post-shift work to ~15. Two patient complaints about confusing discharge instructions dropped to zero in that quarter. Her unit manager noticed the handoff quality improvement and asked her to teach the workflow at staff meeting. She's now writing a unit-level SOP for safe AI use with the clinical informaticist. She has not had a single HIPAA incident because the rule she set on day one — PHI never goes to cloud AI, ever — was non-negotiable.",
  "trap": "She almost screwed it up twice. Once she nearly pasted a real chart into Claude.ai when she was tired. Second time she copied an Ollama-generated note into the EHR without reading the 'GAPS' section, and missed that the patient's code status hadn't been verified. She caught it on her own chart review 20 minutes later.",
  "fix": "She made two rules for herself, written on a sticky note on her laptop. Rule 1: 'PHI stays in the building. No exceptions, no shortcuts, not even at 0300.' Rule 2: 'I read every word of every AI draft before it touches a chart or a patient. If I'm too tired to read it, I'm too tired to use it.' The second rule is the one she says has saved her license twice.",
  "pullQuote": "AI didn't make me a better nurse. It gave me back the time to actually be the nurse I already was."
},
  upskill: "A clinician graduating from /learn into ORANGEBOX-grade operation moves from 'AI as drafting helper' to 'AI as governed clinical operations layer.' That means: (1) local LLM infrastructure on every clinical laptop, with workflow templates per role and per task, audited monthly. (2) A documented PHI-handling protocol that every staff member can recite, with a real escalation path for near-misses — treated like a med error report, with a no-blame review. (3) Integration with the EHR for safe ambient documentation via a BAA-covered vendor, not consumer chat, and with measurable quality outcomes (note completeness, billing capture, time-to-chart-close) tracked over time. The graduation point is when AI is invisible — when it's just how documentation happens, how research happens, how family meeting prep happens, and the operator has stopped thinking about it as 'using AI' and started thinking about it as 'doing the job.'",
} as const;

export const metadata: Metadata = {
  title: "Healthcare AI · /learn · AtomEons",
  description: "Cut the paperwork. Never cut the judgment. · Healthcare is the field where AI hype is loudest and the danger is highest. The same tool that can save a nurse two hours of charting per shift can also get a license pulled, trigger a HIPAA breach letter, or — worst case — contribute to a patient de",
  alternates: { canonical: "https://atomeons.com/learn/healthcare-ai" },
  openGraph: {
    title: "Healthcare AI · /learn",
    description: "Cut the paperwork. Never cut the judgment.",
    url: "https://atomeons.com/learn/healthcare-ai",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare AI · /learn",
    description: "Cut the paperwork. Never cut the judgment.",
  },
  robots: { index: true, follow: true },
};

export default function TrackPage() {
  const t = TRACK;
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="industry-healthcare-ai" alt={"Polished matte-black medical precision instruments on dark surgical cloth — healthcare AI."} />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> {t.title}
        </p>
      </div>

      {/* HERO */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::industry track · {t.title.toLowerCase()}
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            {t.title}.{" "}
            <span style={{ color: t.accent }}>{t.subtitle}</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.7] text-[#C8CCCE] md:text-lg whitespace-pre-line">
            {t.intro}
          </p>
        </div>
      </section>

      {/* PERSONAS */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::who lands here
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            {t.personas.length} personas. One field. One discipline.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {t.personas.map((p, i) => (
              <div key={i} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>
                  ::{String(i + 1).padStart(2, "0")} · {p.role}
                </p>
                <p className="mt-3 text-sm leading-[1.6] text-[#C8CCCE]">{p.context}</p>
                <p className="mt-3 text-sm leading-[1.55] text-[#9BA5A7]">
                  <span style={{ color: t.accent }}>primary use:</span> {p.primaryUseCase}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY RULES */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::the safety rules · non-negotiable
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            What you never do.
          </h2>
          <ul className="mt-8 space-y-3">
            {t.safetyRules.map((r, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-[#FFB87A]/30 bg-[#1C1308]/30 p-4">
                <span className="font-mono text-sm font-bold text-[#FFB87A]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] leading-[1.65] text-[#C8CCCE]">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STACK + DO NOT */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-24">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>
                ::the stack
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight">Recommended tools.</h3>
              <ul className="mt-5 space-y-3">
                {t.stack.map((s, i) => (
                  <li key={i} className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
                    <p className="text-sm font-semibold" style={{ color: t.accent }}>{s.tool}</p>
                    <p className="mt-2 text-sm leading-[1.6] text-[#C8CCCE]">{s.use}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                ::do NOT automate
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight">Hands stay on these.</h3>
              <ul className="mt-5 space-y-3">
                {t.doNotList.map((d, i) => (
                  <li key={i} className="flex gap-3 rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
                    <span className="text-[#FFB87A]">○</span>
                    <span className="text-sm leading-[1.6] text-[#C8CCCE]">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOWS */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::the workflows · {t.workflows.length} named plays
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The plays. Each with the exact prompt.
          </h2>
          <div className="mt-10 space-y-6">
            {t.workflows.map((w, i) => (
              <article
                key={i}
                className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>
                    ::play {String(i + 1).padStart(2, "0")} · {w.name}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                    {w.ai}
                  </p>
                </div>
                <h3 className="mt-3 text-lg font-medium text-[#F2F4F5] md:text-xl">{w.goal}</h3>
                <pre className="mt-4 max-w-full overflow-x-auto whitespace-pre-wrap rounded-md bg-black/40 p-4 font-mono text-[12px] leading-[1.55] text-[#C8CCCE] md:text-[13px]">
                  {w.prompt}
                </pre>
                <p className="mt-3 text-sm leading-[1.6]">
                  <span style={{ color: t.accent }}>::what to notice</span>
                  <span className="text-[#9BA5A7]"> · {w.notice}</span>
                </p>
                <p className="mt-2 text-sm leading-[1.6] text-[#FFB87A]">
                  ::trap · {w.trap}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REGULATIONS */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::what governs your AI use
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The regulations that matter.
          </h2>
          <div className="mt-10 space-y-4">
            {t.regulations.map((r, i) => (
              <div key={i} className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <p className="font-mono text-sm font-bold" style={{ color: t.accent }}>{r.name}</p>
                <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{r.matters}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::case study · composite anonymized
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            One human. One year. The pattern.
          </h2>
          <div className="mt-10 space-y-6 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10">
            <p className="text-lg font-semibold" style={{ color: t.accent }}>{t.caseStudy.persona}</p>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>::before AI</p>
              <p className="mt-2 text-[15px] leading-[1.7] text-[#C8CCCE]">{t.caseStudy.before}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>::the shift</p>
              <p className="mt-2 text-[15px] leading-[1.7] text-[#C8CCCE]">{t.caseStudy.shift}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>::outcome</p>
              <p className="mt-2 text-[15px] leading-[1.7] text-[#C8CCCE]">{t.caseStudy.outcome}</p>
            </div>
            <div className="rounded-xl border border-[#FFB87A]/30 bg-[#1C1308]/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">::the trap they hit</p>
              <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{t.caseStudy.trap}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>::the fix</p>
              <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{t.caseStudy.fix}</p>
            </div>
            <blockquote className="border-l-4 pl-5 italic" style={{ borderColor: t.accent }}>
              <p className="text-lg leading-[1.55] text-[#F2F4F5] md:text-xl">
                &ldquo;{t.caseStudy.pullQuote}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* UPSKILL + CROSS-LINKS */}
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: t.accent }}>
            ::next level
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.7] text-[#C8CCCE] md:text-lg">
            {t.upskill}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/learn/playbooks"
              className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              the job-by-job playbooks →
            </Link>
            <Link
              href="/learn/cheatsheet"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              the AI cheatsheet →
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              ← back to /learn
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
