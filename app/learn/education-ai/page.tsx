import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../_components/LearnHeroImage";

const TRACK = {
  title: "Education AI",
  subtitle: "The curriculum designer who never sleeps. Still not the teacher.",
  intro: "Education was never going to be the first field to fall to AI, and it shouldn't be. Teaching is one of the last jobs where a human being who knows a specific child in a specific room makes a thousand judgment calls a day that matter for that child's life. AI cannot do that, and the day it pretends to is the day we stop calling it teaching.\n\nBut the workload around teaching — the lesson plan, the three-version worksheet, the email to a worried parent, the unit retro that never gets written because Sunday night ran out — that workload has been crushing educators for thirty years, and AI is the first technology that meaningfully gives evenings back. That is the deal.\n\nThis track is built for educators who want their evenings back without outsourcing their judgment. The framing is precise: AI is the curriculum designer who never sleeps. It drafts, it differentiates, it generates options, it formats. The teacher reads the room, knows which kid is having a hard week, decides what gets assessed and how, and owns every grade that goes in the book. That division of labor is non-negotiable.\n\nThe big trap in this field is FERPA. Student names, IDs, IEPs, grades, behavioral notes — none of that goes into a public AI chat, ever, unless the tool is district-vetted with a signed data-processing agreement. Every prompt in this track is written to be de-identified by default. The second trap is grading honesty: AI-graded essays are biased in measurable, documented ways, and the teacher who lets the AI grade without spot-checking is the teacher whose worst students get even worse marks. We name that here too. The rest is plays you can copy tonight.",
  accent: "#FFB87A",
  personas: [
  {
    "role": "K-12 classroom teacher",
    "context": "ELA, math, science, social studies — 25-32 kids, 5 sections, one prep period.",
    "primaryUseCase": "Lesson planning, differentiated worksheets, formative checks, parent emails."
  },
  {
    "role": "Special education / IEP case manager",
    "context": "Carries 15-30 IEPs, writes goals quarterly, runs progress monitoring.",
    "primaryUseCase": "Goal-writing drafts, accommodation menus, progress-monitoring rubric scaffolding — all de-identified."
  },
  {
    "role": "College / university professor",
    "context": "Lectures, syllabi, grading load, research and service obligations.",
    "primaryUseCase": "Syllabus drafts, rubric generation, lecture outlines, exam question banks, office-hours FAQ."
  },
  {
    "role": "Instructional designer",
    "context": "Builds courses for K-12, higher ed, or corporate L&D — often LMS-bound.",
    "primaryUseCase": "Backwards-design scaffolds, learning-objective taxonomies, multimedia script drafts, alignment maps."
  },
  {
    "role": "Adult education / GED / ESL instructor",
    "context": "Mixed-level rooms, irregular attendance, life-context-heavy learners.",
    "primaryUseCase": "Tiered reading passages, real-world math word problems, language scaffolds, plain-language rewrites."
  },
  {
    "role": "Homeschool parent",
    "context": "Teaches across multiple ages, often with one parent doing all subjects.",
    "primaryUseCase": "Unit studies, reading-level matching, multi-age project plans, weekly schedule generation."
  },
  {
    "role": "Corporate trainer / L&D lead",
    "context": "Compliance, onboarding, soft-skills, technical upskilling.",
    "primaryUseCase": "Training outlines, scenario-based assessments, microlearning scripts, knowledge-check question banks."
  },
  {
    "role": "Department chair / curriculum coordinator",
    "context": "K-12 building or district lead — owns scope-and-sequence, PD, observation cycles.",
    "primaryUseCase": "Standards alignment audits, PD agenda drafting, walkthrough rubrics, parent-communication templates."
  }
],
  safetyRules: [
  "Never paste a student's full name, student ID, date of birth, home address, or parent contact info into any public AI chat (ChatGPT, Claude.ai, Gemini, etc.) — use initials or 'Student A' and de-identify EVERY prompt.",
  "Never paste IEP content, 504 plans, behavioral incident reports, counseling notes, or special-education classifications into public AI — these are protected under FERPA and IDEA and need a district-vetted tool with a signed DPA.",
  "Never paste grades, gradebook exports, or class rosters tied to identifiers into public AI — use de-identified summaries ('Class of 28, range 42-94, mean 71') instead.",
  "Never paste student work samples that contain the student's name in the header, signature, or filename — strip metadata first, refer to 'Student A's draft' in the prompt.",
  "For students under 13, COPPA prohibits collecting personal info via AI tools the school hasn't formally vetted — direct-to-student AI access in elementary requires district authorization.",
  "Never let AI assign grades, scores, or rubric levels without your spot-check on at least 20 percent of the sample — AI graders carry documented bias against non-native English, AAVE, and atypical sentence structure.",
  "Never use AI to write IEP goals, behavior plans, or any legal-document content without your professional review and signature — you are the legally accountable party, not the model.",
  "Never represent AI-generated text as a student's own work, and don't accept AI-generated work from students without a disclosure policy spelled out in your syllabus.",
  "Check your state's AI-in-classroom guidance before deploying any new tool with students — rules are moving monthly in 2026 and several states now require parent notification.",
  "When using AI-generated images, songs, or videos in lessons, prefer prompts that don't ask for 'in the style of [living artist]' — fair use for AI-generated content in education is still legally unsettled."
],
  stack: [
  {
    "tool": "Claude.ai (Free or Pro)",
    "use": "Long-form lesson plans, differentiated worksheets, parent emails, unit retros — Claude's writing voice handles educational tone well."
  },
  {
    "tool": "ChatGPT (Free or Plus)",
    "use": "Question-bank generation, quick formative checks, math word-problem variants, GPT-4o for image-based worksheet review."
  },
  {
    "tool": "MagicSchool / SchoolAI / Brisk",
    "use": "Education-specific AI with FERPA-aligned data handling, district vetting, teacher-facing prompt libraries — use these for anything touching student data."
  },
  {
    "tool": "Diffit",
    "use": "Generates leveled reading passages and comprehension questions from any source text — strong for differentiation."
  },
  {
    "tool": "Khanmigo (Khan Academy)",
    "use": "Student-facing tutor with school-district safeguards — vetted for K-12 deployment in many districts."
  },
  {
    "tool": "Canva Magic Write + Magic Design",
    "use": "Visual handouts, posters, slide decks — AI-assisted but teacher-controlled visual production."
  },
  {
    "tool": "ElevenLabs / Suno",
    "use": "Audio reading passages for accessibility, mnemonic songs for memorization (check IP / fair-use boundaries on style imitation)."
  },
  {
    "tool": "NotebookLM (Google)",
    "use": "Upload your curriculum docs and have it generate study guides, podcast-style summaries, FAQ — keep notebooks free of identifiable student data."
  }
],
  doNotList: [
  "Never let AI assign final grades — formative drafts and rubric calibration are fine; the grade in the book is yours.",
  "Never paste a student's full work sample with name attached into public AI — de-identify or use a vetted tool.",
  "Never use AI to write disciplinary letters, behavior incident reports, or anything that goes in a student's permanent record without heavy human review.",
  "Never use AI to draft IEP goals, behavior plans, or accommodation justifications without your professional sign-off — you are legally accountable.",
  "Never automate parent communication about sensitive issues (failure, behavior, mental health, attendance concerns) — those calls and emails come from you.",
  "Never let AI replace your knowledge of which specific kid needs which specific scaffold — AI doesn't know your students; you do.",
  "Never present AI-generated content to students as your own original thinking when the lesson depends on you modeling the thinking process."
],
  workflows: [
  {
    "name": "Lesson Plan Draft (60-minute period, one prep)",
    "goal": "Get a teachable lesson plan in under 5 minutes — objectives, hook, instruction, practice, exit ticket — that you can edit, not write from scratch.",
    "ai": "Claude.ai or ChatGPT (Free is fine)",
    "prompt": "You are an experienced [SUBJECT] teacher in [GRADE LEVEL]. Draft a 60-minute lesson plan on [TOPIC] aligned to [STATE STANDARD CODE if known, otherwise 'Common Core' or 'NGSS']. Structure: (1) Learning objective in student-friendly 'I can' language, (2) 5-minute hook or warm-up that activates prior knowledge, (3) 15-minute direct instruction with one anchor example, (4) 20-minute guided/independent practice with built-in checks for understanding, (5) 10-minute closure activity, (6) 10-minute exit ticket — 3 questions, one at recall, one at application, one at synthesis. Assume a class of 28 with 4 students reading 2 grades below level and 2 students needing extension. Note where I should differentiate. No student names — this is a generic class.",
    "notice": "Whether the hook actually engages a 7th grader or sounds like a textbook. Whether the exit ticket questions are answerable from what the lesson actually taught.",
    "trap": "AI loves to overwrite. If the plan is 4 pages, it's too dense for a 60-minute period. Cut anything that doesn't earn its minute."
  },
  {
    "name": "Three-Level Differentiated Worksheet (one assignment, three difficulties)",
    "goal": "Generate three versions of the same worksheet — below-level, on-level, above-level — that all hit the same learning objective so the class can do parallel work without anyone feeling singled out.",
    "ai": "Claude.ai or MagicSchool",
    "prompt": "Create three versions of a worksheet on [TOPIC] for [GRADE]. All three must assess the same learning objective: [OBJECTIVE]. Version A (below-level): more scaffolding, sentence starters, vocabulary support, fewer items, easier numbers/text. Version B (on-level): standard practice, mix of recall and application. Version C (above-level): same core but adds an extension question requiring synthesis or transfer to a new context. Same look/format/font feel for all three so they're visually indistinguishable when handed out. Include answer keys for each. 10 items per version. Do not label them A/B/C on the student copy — use unobtrusive codes like a small dot pattern in the footer.",
    "notice": "Whether Version A actually scaffolds (sentence starters, visuals, reduced cognitive load) or just gives easier problems. Easier ≠ scaffolded.",
    "trap": "Three versions of the same dull worksheet is still a dull worksheet. If the on-level version is boring, all three are boring."
  },
  {
    "name": "Parent Email — Concern Without Conflict",
    "goal": "Draft a parent email about an academic or behavioral concern that opens conversation rather than putting the family on defense — calm, specific, partnership-framed.",
    "ai": "Claude.ai",
    "prompt": "Draft a parent email from a [SUBJECT/GRADE] teacher. The concern: [DESCRIBE BEHAVIOR OR ACADEMIC PATTERN IN GENERIC TERMS — e.g., 'a student has missed 3 of last 5 homework assignments and seems disengaged in class']. Do not use the student's name — write 'your child' throughout, I will swap in the name. Tone: warm, professional, partnership-oriented. Lead with one specific strength I've noticed. State the concern factually with one or two concrete observations. Avoid diagnostic language. Invite the parent to share context I might not have. Offer two times for a brief call or in-person meeting. Close with confidence in the student. 150-200 words. No exclamation points. No 'I'm sure' or other minimizers.",
    "notice": "Whether the opening strength feels real or tacked on. Whether the concern is described factually (what you saw) vs. interpretively (what you think it means).",
    "trap": "AI defaults to corporate-warm tone that reads as fake to families. Rewrite the first and last sentences in your own voice every time."
  },
  {
    "name": "Formative Check Generator (3-question exit ticket)",
    "goal": "Generate a quick, well-calibrated exit ticket that tells you who got it, who's close, and who needs reteaching — in three questions, not ten.",
    "ai": "ChatGPT or Claude.ai",
    "prompt": "Generate a 3-question exit ticket for [GRADE] [SUBJECT] on the objective: [OBJECTIVE]. Question 1 = recall (can the student state the concept). Question 2 = application (can they apply it to a routine example). Question 3 = transfer (can they apply it to an unfamiliar context or recognize when it doesn't apply). All three should be answerable in under 4 minutes total. Include an answer key with notes on common misconceptions revealed by likely wrong answers — what does it tell me if a student misses Q2 but gets Q3, or vice versa. No multiple choice unless I ask — prefer short open response so I can see thinking.",
    "notice": "The misconception notes are the gold. If a wrong answer pattern actually maps to a specific gap, you know what to reteach tomorrow.",
    "trap": "Three questions is the point. If the AI gives you five, cut two. Long exit tickets eat instruction time and don't tell you more."
  },
  {
    "name": "Unit Retro (Sunday-night, 15 minutes)",
    "goal": "Reflect on a unit you just finished — what worked, what didn't, what to change next year — without staring at a blank doc.",
    "ai": "Claude.ai",
    "prompt": "I just finished a [LENGTH]-week unit on [TOPIC] in [GRADE] [SUBJECT]. I'll dump my unstructured notes below. Organize my reflection into: (1) What worked — instructional moves, materials, sequencing decisions that landed. (2) What didn't — places where most of the class struggled, lessons that needed reteaching, time misallocations. (3) Surprises — anything I didn't expect (good or bad). (4) Three specific changes for next year. (5) One question I still don't have a good answer to. Don't soften my critique of my own teaching — I want honest, not affirming. Don't add fake insights I didn't put in my notes. Notes: [PASTE NOTES HERE — no student names, use 'Student A' or 'the class' or 'about 6 kids']",
    "notice": "Whether the three changes are actually actionable next year, or generic 'engage students more' filler.",
    "trap": "If you don't write notes during the unit, the retro will be hollow. Keep a sticky note on your desk: 'unit retro line of the day.'"
  },
  {
    "name": "Family Newsletter Blurb",
    "goal": "Write the weekly classroom-update paragraph that families actually read — specific, warm, useful, under 150 words.",
    "ai": "Claude.ai or MagicSchool",
    "prompt": "Write a 120-150 word classroom newsletter blurb for families of [GRADE] [SUBJECT] students. This week we covered: [TOPIC]. Highlight: (1) The big idea in plain language a family member with no background in [SUBJECT] can understand, (2) One thing students did this week that I'm proud of — phrased as a class accomplishment, not naming individuals, (3) One thing families can ask their student about at dinner to extend learning (a real conversation prompt, not 'ask about their day'), (4) Heads-up on next week. No emoji. No exclamation points beyond one. Tone: confident, warm, slightly wry — like a teacher who knows their stuff and likes the kids.",
    "notice": "Whether the dinner-table question is actually one a parent could ask without already knowing the answer.",
    "trap": "Newsletter blurbs that brag about the teacher get ignored. Blurbs about what families can do get read."
  },
  {
    "name": "IEP Goal Draft Scaffold (case manager workflow)",
    "goal": "Get a draft of measurable, observable IEP goal language to edit — never to submit as-is. The AI scaffolds; you write the actual goal with your knowledge of the student.",
    "ai": "MagicSchool, SchoolAI, or a district-vetted tool — NOT public ChatGPT/Claude.ai",
    "prompt": "Draft three variations of a measurable annual IEP goal for a student in [GRADE] working on [SKILL DOMAIN — e.g., 'reading comprehension of grade-level informational text']. Present level (no identifying info): [BRIEF DESCRIPTION — e.g., 'currently reading 2 grade levels below, decodes accurately but loses meaning across paragraphs']. Format each goal: condition + behavior + criterion + measurement schedule. Use observable verbs (identifies, states, writes, demonstrates) — not internal verbs (understands, knows, appreciates). Specify criterion as a percentage AND a frequency (e.g., '80 percent accuracy on 4 of 5 trials'). Include progress monitoring method appropriate for the goal. Three variations should differ in ambition level — one conservative, one stretch, one moderate.",
    "notice": "Whether the verbs are actually observable. 'Understands fractions' is not a goal; 'solves fraction-addition problems with unlike denominators with 80 percent accuracy on 4 of 5 trials' is.",
    "trap": "An AI-drafted IEP goal is a starting point, not a finish line. You sign it. You're accountable. Edit until it sounds like you wrote it about this specific student."
  },
  {
    "name": "Rubric Calibration Pass (before you grade essays)",
    "goal": "Before you grade a stack of essays, use AI to help you sharpen the rubric so your grading is consistent across the stack — not to grade for you.",
    "ai": "Claude.ai",
    "prompt": "I'm about to grade a stack of [GRADE] [SUBJECT] essays on [PROMPT]. My rubric has these dimensions: [LIST DIMENSIONS, e.g., 'thesis clarity, evidence use, organization, mechanics']. For each dimension, write a sharp 1-sentence description of what a 4 looks like, a 3, a 2, a 1. Then give me one example sentence or paragraph that exemplifies each level — short, realistic for the grade level. Then list 3 common rater-bias traps I should watch for when grading (e.g., halo effect from clean handwriting, fatigue in the back half of the stack, bias against non-standard dialect). After I grade, I'll spot-check 5 random essays against the rubric to verify I stayed calibrated.",
    "notice": "Whether the exemplar sentences feel like real student writing or generic AI prose. If they're too polished, they won't calibrate you to actual kid work.",
    "trap": "Do not paste student essays into the AI to grade. The rubric is the artifact; your eyes do the grading. Always."
  }
],
  regulations: [
  {
    "name": "FERPA (Family Educational Rights and Privacy Act)",
    "matters": "Federal law protecting student education records — names, grades, attendance, disciplinary records, IEPs are all covered. Public AI tools are NOT FERPA-compliant by default; only district-vetted tools with signed data-processing agreements should handle identifiable student data."
  },
  {
    "name": "COPPA (Children's Online Privacy Protection Act)",
    "matters": "Federal law requiring parental consent before collecting personal info from children under 13 — restricts which AI tools students can use directly, and requires district authorization for any AI deployment in elementary classrooms."
  },
  {
    "name": "IDEA (Individuals with Disabilities Education Act)",
    "matters": "Federal law governing IEPs and special education — IEP content, evaluations, and accommodation plans are confidential and cannot enter public AI tools; legal accountability for IEP content stays with the human case manager."
  },
  {
    "name": "State AI-in-classroom guidance (emerging 2025-2026)",
    "matters": "Roughly 30 states have issued AI-in-education guidance as of 2026, and several now require parent notification, vendor vetting, or restrictions on student-facing AI — check your state DOE site monthly, rules are moving."
  },
  {
    "name": "Section 504 of the Rehabilitation Act",
    "matters": "Governs accommodations for students with disabilities — like IEPs, 504 plan content is confidential and cannot be pasted into public AI for drafting or analysis."
  },
  {
    "name": "PPRA (Protection of Pupil Rights Amendment)",
    "matters": "Restricts surveys and data collection on sensitive topics (political beliefs, mental health, family income) — relevant when using AI tools that survey or profile students."
  },
  {
    "name": "Fair Use doctrine (17 U.S.C. § 107)",
    "matters": "Fair use for AI-generated content in lessons is legally unsettled — using AI-generated text/images for classroom instruction generally fits educational fair use, but commercial republication (selling lesson plans, posting to TPT) is murkier."
  },
  {
    "name": "District acceptable-use policies (AUPs)",
    "matters": "Most districts have policies that pre-date AI but cover 'unauthorized third-party tools' — using a non-vetted AI tool with student data can violate your AUP and your employment agreement before any federal law is touched."
  }
],
  caseStudy: {
  "persona": "Ms. R, 7th-grade English teacher, 11 years in the classroom, public middle school in a mid-sized district, 5 sections of 28-32 students, two of which are inclusion sections with co-teachers.",
  "before": "Her Sundays were lesson-planning days that started at noon and ended at 11pm. Her Wednesdays were essay-grading nights that ate dinner. She'd stopped writing newsletters because she couldn't find the hour, and parent emails that should've taken ten minutes were taking forty-five because she was rewriting tone until it sounded right. She loved teaching. She did not love the eighteen unpaid hours a week around teaching.",
  "shift": "She started using Claude for the wrapper work — lesson plan drafts, parent email drafts, differentiated worksheet variants, the weekly newsletter blurb — and learned to de-identify every prompt so no student name, ID, or work sample ever left her laptop. Her district vetted MagicSchool for anything touching identifiable student data, so she used MagicSchool for rubric scaffolds and IEP-goal drafting and kept Claude for everything else.",
  "outcome": "Her Sunday planning went from 11 hours to 3. Her essay grading still takes the same time — she refused to outsource grading — but rubric calibration is sharper, so her scores are more consistent across the stack and her revisions feedback is better. She writes newsletters again. Parent emails take 12 minutes. Her two evenings a week back have gone to reading, family dinner, and one weeknight where she's not thinking about school. She is a better teacher in the classroom because she is not exhausted before she gets there.",
  "trap": "Six months in, she caught herself letting the AI draft a parent email about a student who was struggling without rewriting it in her own voice — and the parent flagged that the email 'didn't sound like her.' That was the wake-up.",
  "fix": "She made a rule: the first sentence and the last sentence of every parent email get written by her, by hand, with the student's name and one specific observation only she could make. The AI does the middle. Parents stopped flagging.",
  "pullQuote": "AI gave me my evenings back. It cannot give me my students back — that's still my job. Knowing the difference is the whole skill."
},
  upskill: "From /learn-grade to ORANGEBOX-grade operating: educators who internalize this track stop thinking of AI as a content generator and start running it as a parallel teaching staff with one specialty — never sleeps, never tires, never knows the kids. They build a personal prompt library (lesson plan, worksheet trio, parent email, exit ticket, unit retro, newsletter) that they refine across a school year until each prompt produces 80 percent shippable drafts on first pass. The graduation move is local AI for FERPA-sensitive work: running Ollama or a district-managed local model on-prem so identifiable student data never leaves the building, which is where ORANGEBOX-class operators are heading by 2027.",
} as const;

export const metadata: Metadata = {
  title: "Education AI · /learn · AtomEons",
  description: "The curriculum designer who never sleeps. Still not the teacher. · Education was never going to be the first field to fall to AI, and it shouldn't be. Teaching is one of the last jobs where a human being who knows a specific child in a specific room makes a thousand judgment calls a day that matter for that child's ",
  alternates: { canonical: "https://atomeons.com/learn/education-ai" },
  openGraph: {
    title: "Education AI · /learn",
    description: "The curriculum designer who never sleeps. Still not the teacher.",
    url: "https://atomeons.com/learn/education-ai",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Education AI · /learn",
    description: "The curriculum designer who never sleeps. Still not the teacher.",
  },
  robots: { index: true, follow: true },
};

export default function TrackPage() {
  const t = TRACK;
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="industry-education-ai" alt={"A stack of three matte-black hardcover books with a bio-cyan bookmark."} />
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
      <section className="border-b border-[#1A2225] bg-[#08090B]/20">
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
      <section className="border-b border-[#1A2225] bg-[#08090B]/20">
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
      <section className="border-b border-[#1A2225] bg-[#08090B]/20">
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
