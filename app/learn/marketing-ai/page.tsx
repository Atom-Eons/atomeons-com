import type { Metadata } from "next";
import Link from "next/link";
import { LearnHeroImage } from "../../_components/LearnHeroImage";

const TRACK = {
  title: "Marketing AI",
  subtitle: "The variant engine — not the strategy oracle.",
  intro: "Marketing is the field where AI feels most useful and gets misused the fastest. You can spin twenty subject lines in a minute. You can A/B/C/D ad copy until you forget what you were testing. You can ghostwrite a newsletter that reads exactly like every other newsletter on the internet — which is the problem. Volume without voice is how brands quietly die.\n\nThe honest framing: AI is a variant engine. It is excellent at producing the seventh, eighth, and ninth version of an angle you already understand. It is terrible at deciding which angle matters, what your audience actually wants, when to spend, what to price, or how to position against a competitor. Those are operator decisions. They always will be.\n\nThe marketers winning with AI in 2026 share three habits. First, they keep a strict brand-voice primer — a documented rubric the model gets fed before every generation, so output sounds like them and not like beige LinkedIn. Second, they never cite an AI-generated statistic, study, or quote without independent verification — because the FTC is now actively enforcing against AI-fabricated marketing claims, and \"the AI made it up\" is not a defense. Third, they treat AI as a faster draft, not a smarter strategist. Decisions stay human. Variants get automated.\n\nThis track gives you the workflows, the do-not list, the regulatory context, and a real case study of an indie marketer who survived the brand-voice-dies-in-volume trap by building a Skill Primer she actually maintains.",
  accent: "#22F0D5",
  personas: [
  {
    "role": "B2B SaaS Marketer",
    "context": "1-5 person team at a Series A/B SaaS company, owns lifecycle email + paid + content + brand",
    "primaryUseCase": "Subject-line lab, funnel-stage retros, ad creative variants, brand consistency checks before campaigns ship"
  },
  {
    "role": "Indie Growth Operator",
    "context": "Solo or 2-person agency replacement inside a bootstrapped startup, full-stack marketer with no copywriter on staff",
    "primaryUseCase": "Brand-voice primer as a force multiplier, weekly content calendar, win/loss recap synthesis"
  },
  {
    "role": "In-House Communications Lead",
    "context": "PR, internal comms, exec ghostwriting at a mid-market company, brand voice is the deliverable",
    "primaryUseCase": "Voice consistency audits across exec content, statement drafting, crisis-response variant lab"
  },
  {
    "role": "Agency Strategist",
    "context": "Independent consultant or boutique agency, juggles 4-8 client voices simultaneously",
    "primaryUseCase": "Per-client Skill Primers, competitor positioning briefs, trend signal scans for monthly client decks"
  },
  {
    "role": "Creator-Founder Marketer",
    "context": "Founder who is also the face of the brand, audience expects their personal voice in every channel",
    "primaryUseCase": "Voice-locked drafts of newsletters/posts/replies, never published unedited, used to break blank-page paralysis"
  },
  {
    "role": "E-commerce Brand Owner",
    "context": "DTC operator running 3-15 SKUs, owns paid creative, product descriptions, lifecycle email",
    "primaryUseCase": "Ad creative variant batches, product description templates, win/loss buyer interview synthesis"
  },
  {
    "role": "Content Marketer",
    "context": "Owns blog, SEO, gated assets, podcast — needs to publish high-quality output 3-10x per week",
    "primaryUseCase": "Outline-to-draft acceleration, brief synthesis from research, repurposing one asset into seven channels"
  }
],
  safetyRules: [
  "Never publish an AI-generated statistic, study citation, or quote without independent verification from a primary source — the FTC actively enforces against fabricated marketing claims under Section 5 of the FTC Act.",
  "Never paste customer PII (emails, names, billing data, support tickets with identifying info) into a public AI chat — use anonymized excerpts or local/enterprise-tier AI only.",
  "Never paste unreleased pricing, product roadmap, or M&A-adjacent strategy into public AI chats — assume training data exposure risk.",
  "Never paste competitor confidential material (leaked decks, NDA'd interviews, scraped internal docs) — legal exposure plus model-poisoning risk.",
  "Never publish AI-generated testimonials, reviews, or fake user quotes — illegal under the FTC's 2024 endorsement rule revisions, fines start at five figures per instance.",
  "Never send to EU/UK audiences without verified GDPR consent, regardless of how the list was assembled — AI-generated lookalike lists do not bypass consent law.",
  "Never auto-publish AI output to live channels without a human editorial pass — every state-level AI disclosure law emerging in 2026 assumes human review.",
  "Never use AI to mimic a real person's voice (a real journalist, a real customer, a competitor's exec) in published marketing material — defamation and right-of-publicity exposure.",
  "Always disclose AI involvement in any context where a reasonable audience would assume human authorship and the deception would be material — FTC deceptive-practices standard.",
  "Never train your brand-voice primer on copyrighted material you do not own or have license to use — corpus contamination is a real legal risk."
],
  stack: [
  {
    "tool": "Claude (Pro or Team)",
    "use": "Brand-voice-locked drafting, long-context primer ingestion, nuanced editorial work — best when voice fidelity matters"
  },
  {
    "tool": "ChatGPT (Plus or Team)",
    "use": "Variant generation at volume, structured outputs, image generation for ad creative concepts, GPTs for repeated workflows"
  },
  {
    "tool": "Perplexity Pro",
    "use": "Verifying citations the other models produce — pull primary-source URLs before any stat ships"
  },
  {
    "tool": "Loops.so or Customer.io",
    "use": "Lifecycle email execution with subject-line A/B/C/D testing built in, AI-drafted but human-approved"
  },
  {
    "tool": "Notion AI or Coda",
    "use": "Brand-voice primer storage, campaign brief synthesis, version-controlled voice documentation"
  },
  {
    "tool": "Brandwell or Surfer",
    "use": "SEO content briefs with search-intent grounding — keeps AI drafts anchored to real queries, not hallucinated ones"
  },
  {
    "tool": "Descript or Riverside",
    "use": "Repurposing podcast/video into transcribed source material the AI can rewrite into newsletters, threads, blog posts"
  },
  {
    "tool": "Figma + Midjourney/Ideogram",
    "use": "Ad creative concept variants before handing to a designer or shipping — AI ideates, you curate, human finishes"
  }
],
  doNotList: [
  "Never let AI write the positioning. Positioning is who you are vs. who they are. That is operator work and stays operator work.",
  "Never let AI decide pricing. Pricing carries margin, signaling, and unit economics the model cannot see.",
  "Never let AI decide when to spend on paid. Budget timing requires cashflow context AI does not have.",
  "Never let AI run autonomous outreach (cold email, DMs, comment replies) without a human approval queue — deliverability and reputational risk.",
  "Never let AI write the crisis response. The first 90 minutes of a crisis is human judgment, voice control, and legal review only.",
  "Never publish an AI draft of a customer success story without the customer's written approval of the exact quote and framing.",
  "Never let AI auto-respond to negative reviews — every state attorney general office now treats this as deceptive endorsement under emerging 2026 rules."
],
  workflows: [
  {
    "name": "Subject-Line A/B/C/D Lab",
    "goal": "Generate four subject-line variants that test distinct psychological angles, not four versions of the same angle in different words",
    "ai": "Claude (voice fidelity) or ChatGPT (volume)",
    "prompt": "You are running a subject-line lab for [BRAND NAME]. Brand voice primer is attached. The email is going to [SEGMENT — e.g., active trial users on day 5 who have not yet imported data]. The email body is: [PASTE BODY]. The single goal of this email is [GOAL — e.g., get them to book a 15-min onboarding call]. Produce FOUR subject lines, each testing a distinct angle: (A) Curiosity gap — implies missing information. (B) Specific benefit — names the concrete outcome. (C) Loss framing — names the cost of inaction. (D) Pattern interrupt — unexpected phrasing or formatting. For each, give: subject line (under 50 chars), preview text (under 90 chars), the angle being tested, and one risk (e.g., 'might read as clickbait to enterprise buyers'). Do not produce four variations of the same angle. Use the brand voice primer strictly — no exclamation points unless the primer allows them, no emoji unless the primer allows them.",
    "notice": "Whether the four variants actually test different angles or whether the model collapsed into four variations of the same idea. If they collapsed, push back — that means the model is averaging, not generating.",
    "trap": "Letting the model pick the 'winner' — it cannot. Only your open and click data can. Ship all four to small cohorts, then scale the winner."
  },
  {
    "name": "Brand-Voice Consistency Check",
    "goal": "Audit a draft against your documented brand voice before it ships, flagging exact phrases that drift toward beige",
    "ai": "Claude (better at nuanced voice work)",
    "prompt": "Attached is the [BRAND NAME] brand voice primer (tone, banned phrases, signature rhythms, approved register). Below is a draft of [ASSET — e.g., a launch announcement, a Twitter thread, a sales page section]. Audit the draft against the primer. For each section, identify: (1) phrases that match the brand voice — quote them and say why. (2) phrases that drift toward generic/beige — quote them, say what's wrong, propose a voice-locked replacement. (3) banned phrases (per the primer) that appear — flag and replace. (4) signature rhythms (per the primer) that are missing where they should appear. Do not rewrite the whole draft. Surgical edits only. End with a one-sentence verdict: 'ship as edited' / 'one more pass needed' / 'voice is too far off, restart.' Draft: [PASTE DRAFT]",
    "notice": "Whether the model finds drift you missed. If it finds nothing, either your draft is genuinely tight or your primer is too vague to be useful — both are signals.",
    "trap": "Treating this as a green-light step. The check is diagnostic, not approving. You still ship the final call."
  },
  {
    "name": "Ad Creative Variant Batch",
    "goal": "Produce a batch of paid-social ad copy variants across distinct hook structures, each ready to pair with a creative",
    "ai": "ChatGPT (volume) or Claude (voice)",
    "prompt": "I'm running [PLATFORM — Meta/LinkedIn/TikTok] ads for [PRODUCT] targeting [AUDIENCE — be specific: role, company size, pain]. The single conversion event is [EVENT — free trial / demo book / lead magnet download]. Brand voice primer is attached. Produce 8 ad copy variants in 4 hook categories (2 per category): (1) Problem-aware — names the pain in their language. (2) Outcome-aware — names the after-state they want. (3) Mechanism-aware — explains the unique-how. (4) Social-proof — anchors on real customer evidence. For each variant: hook (first 125 chars — what shows above the fold), body (under 200 chars), CTA. Flag any variant that makes a quantitative claim (percentages, dollar amounts, timeframes) so I can verify before shipping. Do not invent customer names, stats, or testimonials. If a social-proof variant needs evidence, write '[INSERT REAL CUSTOMER QUOTE HERE]' as a placeholder.",
    "notice": "How the model handles the social-proof category. If it tries to invent testimonials, your primer needs a stronger anti-fabrication clause.",
    "trap": "Shipping any variant with an unverified stat. The FTC does not care that AI wrote it — you ran the ad."
  },
  {
    "name": "Funnel-Stage Retro Synthesis",
    "goal": "Synthesize a campaign retro across funnel stages using only your own data, producing learnings ready for the next sprint",
    "ai": "Claude (long-context, better at structured synthesis)",
    "prompt": "I'm running a retro on [CAMPAIGN NAME] which ran [DATE RANGE]. Below is the raw data from each funnel stage: (1) Top of funnel — impressions, CTR, CPC per channel: [PASTE]. (2) Mid-funnel — landing page conversions, asset downloads, demo books: [PASTE]. (3) Bottom of funnel — trial-to-paid, demo-to-close, deal size: [PASTE]. (4) Qualitative — sales team notes, support tickets from new users, NPS comments: [PASTE]. Produce a structured retro: (a) What worked — three claims, each grounded in a specific number from the data. (b) What did not work — three claims, same standard. (c) What surprised us — anomalies in the data, hypothesis for each. (d) What we still don't know — gaps where the data cannot tell us yes/no. (e) Three concrete bets for the next campaign, each with a hypothesis and a metric to test against. Do not invent numbers. Do not extrapolate beyond what the data shows. If a claim requires data I didn't paste, say so explicitly.",
    "notice": "Whether the model respects the data boundary. If it makes claims your data does not support, the synthesis is contaminated.",
    "trap": "Letting the retro feel like 'insight' when it's just restating the numbers. Push for the third question — what we still don't know."
  },
  {
    "name": "Trend Signal Scan",
    "goal": "Identify three trend signals relevant to your category from publicly available sources, each with a primary citation",
    "ai": "Perplexity Pro (citation-grounded) or ChatGPT with web search",
    "prompt": "Scan publicly available sources for trend signals in [CATEGORY — e.g., B2B vertical SaaS for the construction industry] from the last [TIMEFRAME — e.g., 30 days]. Produce three signals, each with: (1) The signal — one sentence, concrete and falsifiable. (2) Evidence — at least two primary sources (news article, public company filing, industry report, regulator filing) with URLs. I will verify every URL before using any of this. (3) Why it matters for [BRAND] specifically — one sentence. (4) Confidence — high/medium/low and what would lower the confidence. Do not pull from social media trend lists. Do not invent sources. If a signal only has one source, flag it as low confidence. If you cannot find evidence for a signal, do not include it. Three real signals beat ten speculative ones.",
    "notice": "Whether the URLs are real. Click every one before citing. Hallucinated URLs are the failure mode here.",
    "trap": "Treating signals as facts. A signal is a hypothesis worth watching, not a thing to put in a deck."
  },
  {
    "name": "Competitor Pricing Watch",
    "goal": "Track publicly visible competitor pricing and positioning changes without scraping or violating ToS",
    "ai": "Perplexity Pro or ChatGPT with web search",
    "prompt": "Track publicly visible pricing and positioning changes for these competitors: [LIST 3-5 COMPETITORS WITH URLs]. For each, produce: (1) Current published pricing — exact tiers, prices, what's included. Cite the pricing page URL with timestamp. (2) Positioning — the headline on their homepage and the first sentence of their about/manifesto page. Cite URLs. (3) Recent visible changes — anything that has changed in the last 90 days (new tier, removed tier, renamed plan, new positioning line). Only include changes you can evidence with a current page + a Wayback Machine archive showing the prior version. URL both. (4) What this might signal — one cautious sentence per competitor, framed as a question not a conclusion. Do not invent prices. Do not extrapolate from screenshots I have not seen. If you cannot verify a change with two sources, omit it.",
    "notice": "Whether the citations resolve. Wayback Machine links should load and show the dated prior version.",
    "trap": "Using this to copy competitor pricing. Pricing is yours — this scan informs, it does not decide."
  },
  {
    "name": "Win/Loss Recap Synthesis",
    "goal": "Synthesize patterns from a quarter of win/loss interviews into a sales-marketing alignment brief",
    "ai": "Claude (long-context, anonymized data)",
    "prompt": "Below are [N] anonymized win/loss interview notes from [QUARTER]. Each interview is tagged WIN or LOSS and includes: deal stage, ICP segment, primary competitor encountered, top-3 buyer concerns, why-we-won or why-we-lost in the buyer's own words. [PASTE NOTES]. Produce a synthesis: (1) Win patterns — three patterns that appear in WIN notes but not LOSS notes, each cited with interview IDs. (2) Loss patterns — three patterns that appear in LOSS notes but not WIN notes, same standard. (3) Mixed signals — patterns that appear in both, requiring deeper investigation. (4) Quotes — pull six exact quotes (three wins, three losses) that capture the strongest patterns. Do not paraphrase quotes. Do not invent quotes. If a quote needs editing for anonymity, mark the edit with brackets. (5) Three concrete recommendations — one for sales enablement, one for marketing messaging, one for product. Each recommendation must cite the pattern it addresses.",
    "notice": "Whether the model preserves the actual buyer language or sanitizes it into marketing-speak. The whole point is the buyer's words, not yours.",
    "trap": "Acting on a 'pattern' that appears in only 2-3 interviews. Patterns need volume to be real. Flag low-N patterns as hypotheses, not findings."
  },
  {
    "name": "Crisis Response Variant Lab",
    "goal": "Draft three distinct response postures for a brand-sensitive situation before legal/leadership decides which posture to take",
    "ai": "Claude (better at tonal nuance and restraint)",
    "prompt": "I am preparing a public response to [SITUATION — describe the facts neutrally, no spin]. Brand voice primer is attached. Produce THREE distinct response postures, each as a 2-3 sentence statement: (A) Accountability-forward — acknowledge directly, name the action, no hedging. (B) Information-forward — clarify the facts that may have been misrepresented, calm and specific. (C) Restraint-forward — minimal statement, decline to amplify, redirect to action. For each posture: the statement, what audience it serves best, the risk if we pick this one, what factual claims (if any) need legal review before shipping, what we'd need to verify before publishing. Do not pick a winner. Do not editorialize. This is a decision for me and legal — your job is to make the three options clearly distinct so the choice is real, not theatrical.",
    "notice": "Whether the three postures are actually distinct or whether the model converged on one default tone with surface-level variation. If the postures sound the same, the lab failed — push back and re-prompt with sharper differentiation.",
    "trap": "Treating any of the three drafts as ship-ready. Crisis response is human judgment with legal review. The variants exist to clarify the decision, not to remove it."
  }
],
  regulations: [
  {
    "name": "FTC Act Section 5 — Deceptive Practices",
    "matters": "AI-generated marketing claims (statistics, testimonials, endorsements, results) are subject to the same truthfulness standard as human-written claims. 'The AI made it up' is not a defense, and 2025 enforcement actions confirm this."
  },
  {
    "name": "FTC Endorsement Guides (2024 revision)",
    "matters": "AI-generated fake reviews, fabricated testimonials, and synthetic customer voices are explicitly prohibited. Fines start at five figures per instance and escalate. Disclosure of AI involvement is required when a reasonable consumer would assume human authorship."
  },
  {
    "name": "CAN-SPAM Act",
    "matters": "AI-drafted email still requires accurate sender info, working unsubscribe, no deceptive subject lines, and physical address. Volume from AI does not change the per-message compliance burden."
  },
  {
    "name": "GDPR (EU/UK audiences)",
    "matters": "AI-assembled lookalike audiences, scraped lists, and AI-personalized email still require lawful basis. Personalization derived from AI inference about a user can itself trigger consent requirements under Article 22 (automated decision-making)."
  },
  {
    "name": "CCPA / CPRA (California)",
    "matters": "Use of AI to profile or score consumers triggers disclosure and opt-out rights. AI-driven personalization touching California residents requires the standard privacy notice plus specific automated-decision disclosures."
  },
  {
    "name": "State-Level AI Disclosure Laws (2026)",
    "matters": "Colorado AI Act (effective 2026), California AB 2013 (training data transparency), and emerging Texas/NY/Illinois bills all require disclosure when AI is materially used in consumer-facing marketing. Track your state list quarterly."
  },
  {
    "name": "Right of Publicity (state-by-state)",
    "matters": "Using AI to mimic a real person's voice, likeness, or signature phrasing in marketing (a celebrity, a competitor's CEO, a customer without consent) triggers right-of-publicity liability in 30+ states."
  },
  {
    "name": "Lanham Act — False Advertising",
    "matters": "Federal cause of action that competitors can use against you for AI-generated comparative claims, fabricated competitor data, or misleading performance stats. Plaintiff bar is increasingly willing to sue here."
  }
],
  caseStudy: {
  "persona": "Maya R., solo growth marketer at a 12-person B2B SaaS in the construction-tech vertical. ~$2M ARR. She owns lifecycle email, paid social, content, and the brand. No copywriter, no designer, no agency.",
  "before": "Maya was using ChatGPT to draft everything — newsletters, ads, sales sequences, social posts. Output volume tripled in six weeks. Then her CEO forwarded her a customer email that said 'your newsletter feels different lately, it doesn't sound like you anymore.' She compared three months of her own writing against three months of AI-assisted writing and saw exactly what the customer saw: the AI-assisted work had averaged into competent-but-generic SaaS prose. The brand voice she had spent two years building was bleaching out.",
  "shift": "Maya stopped publishing AI drafts directly. She built a brand-voice primer — a documented rubric covering tone, banned phrases, signature rhythms, register shifts by channel, and 40 paired examples of 'voice-locked' vs. 'beige' versions of the same sentence. She fed the primer into every Claude session before generating anything, then ran every draft through a Brand-Voice Consistency Check workflow that flagged drift surgically. She also moved every quantitative claim through a verification step before any ad or email shipped.",
  "outcome": "Six months in, Maya is publishing at roughly 2.5x her pre-AI volume — substantially below the 3x she hit during the beige period, but with voice fidelity that her own audience verifies. Newsletter open rates recovered from a 6-point dip to baseline plus 4 points. She cut three hours of editing per week because the primer-led drafts need surgical edits, not rewrites. She also pulled two ads days before launch because the verification step caught fabricated statistics — exactly the FTC exposure the do-not list is designed to prevent.",
  "trap": "Treating volume as the only KPI. The first six weeks of Maya's AI use looked like a win on every metric except the one that mattered — whether she still sounded like herself.",
  "fix": "The brand-voice primer became the constraint that made AI useful again. Volume came back. Voice came with it. Verification became routine instead of optional.",
  "pullQuote": "AI gave me speed. The primer gave me back my voice. Both, or neither — one without the other is a trap."
},
  upskill: "A marketer graduates from /learn-grade AI use to ORANGEBOX-grade operating when three things become routine. First, the brand-voice primer is a living document — versioned, dated, owned, and fed into every generation. Second, verification of every quantitative claim is a workflow step, not an afterthought — the FTC exposure is now real enough that one fabricated stat can cost more than a year of AI tooling savings. Third, AI gets treated as the variant engine it actually is — positioning, pricing, timing, and crisis response stay human, and the operator owns the decision register where those calls get made and defended.",
} as const;

export const metadata: Metadata = {
  title: "Marketing AI · /learn · AtomEons",
  description: "The variant engine — not the strategy oracle. · Marketing is the field where AI feels most useful and gets misused the fastest. You can spin twenty subject lines in a minute. You can A/B/C/D ad copy until you forget what you were testing. You can ghostwrite a newsletter that reads exactly like eve",
  alternates: { canonical: "https://atomeons.com/learn/marketing-ai" },
  openGraph: {
    title: "Marketing AI · /learn",
    description: "The variant engine — not the strategy oracle.",
    url: "https://atomeons.com/learn/marketing-ai",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing AI · /learn",
    description: "The variant engine — not the strategy oracle.",
  },
  robots: { index: true, follow: true },
};

export default function TrackPage() {
  const t = TRACK;
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <LearnHeroImage slug="industry-marketing-ai" alt={"Three matte-black folded magazines in a precise stack with a bio-cyan light along the top edge."} />
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
