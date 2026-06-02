import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

const ACCENT = "#22F0D5";
const WARN = "#FFB87A";

const OFFENSIVE_USE = [
  {
    title: "Triage acceleration on operator workflows",
    body: "LLMs ingest streams of cable-traffic-equivalent material, signals reports, intercepts, OSINT and produce ranked summaries faster than human analysts working alone. Public reporting through 2024-2025: Bloomberg disclosed CIA's Osiris generative-AI analysis tool in mid-2024; DoD's Task Force Lima (stood up 2023) coordinated LLM acceleration across the DoD enterprise; the UK MoD's Defence AI Centre stood up parallel capability.",
  },
  {
    title: "Code generation for offensive tooling",
    body: "Public security research (Microsoft + OpenAI joint disclosure February 2024) attributed observed use of OpenAI APIs by named threat actors (Forest Blizzard/APT28, Emerald Sleet, Crimson Sandstorm, Charcoal Typhoon, Salmon Typhoon) for code-generation tasks supporting offensive operations. None of the use was novel-capability-creating — it was acceleration of existing playbooks.",
  },
  {
    title: "Social engineering at scale",
    body: "Vishing (voice phishing) using voice clones, spear-phishing with LLM-generated personalized lures, fake personas at scale across social platforms. Public examples cited by CISA, the UK NCSC, and Microsoft in 2024-2025. The defensive countermove is identity verification + out-of-band confirmation, not better filters.",
  },
  {
    title: "Target acquisition and prioritization",
    body: "Public reporting by The Guardian and +972 Magazine (April 2024) on the IDF's reported use of AI systems named 'Lavender' and 'The Gospel' for identifying and prioritizing targets in Gaza. These systems are publicly reported but controversial; their accuracy claims, oversight, and rules-of-engagement have been heavily debated in subsequent reporting. Cited as the most consequential public example of ML in modern targeting decisions.",
  },
];

const DEFENSIVE_USE = [
  {
    title: "SOC AI is now production-grade",
    body: "Microsoft Security Copilot, Google Threat Intelligence powered by Gemini, CrowdStrike Charlotte AI, SentinelOne Purple AI, Palo Alto Networks AI Copilot — every major SOC platform shipped an LLM-augmented analyst assistant in 2023-2024. Tier-1 alert triage that took an analyst 4-15 minutes now takes 30-90 seconds with an LLM doing the first pass. The job didn't disappear · the throughput multiplied.",
  },
  {
    title: "Threat-intel synthesis got cheap",
    body: "Vannevar Labs (defense OSINT), Recorded Future, Mandiant Threat Intelligence — all integrated LLMs into the analyst loop for synthesizing multi-source intelligence into briefings. The throughput gain is on the analyst side · the same human reviews and signs.",
  },
  {
    title: "Reverse engineering and malware triage",
    body: "Public RE tools (Ghidra, IDA Pro) ship LLM-assistance plugins. Malware analysts now use LLMs to summarize disassembly, suggest function names, identify cryptographic primitives. The 80% that's deterministic is faster · the 20% that's hard is still the human's job.",
  },
  {
    title: "Vulnerability discovery (still controversial)",
    body: "Mixed public results. Google Project Zero published in late 2024 a real CVE found by LLM-augmented fuzzing (Big Sleep). Anthropic, DeepMind, OpenAI all published cyber-related capability evals through 2024-2025. The field consensus: LLMs accelerate certain narrow vuln-discovery workflows · they don't replace senior researchers. The capability is real, the hype is overcorrected, the trajectory is upward.",
  },
  {
    title: "Red-team automation",
    body: "Microsoft PyRIT (Python Risk Identification Toolkit), Anthropic's published red-team frameworks, Lakera and Mindgard commercial offerings — the tooling for automated LLM red-teaming matured rapidly through 2024-2025. The red team's job didn't go away · the surface they need to cover did.",
  },
];

const ETHICS = [
  "AI systems doing target prioritization in active conflict are publicly reported. Reasonable people disagree about whether existing oversight is adequate. Don't pretend that question is solved.",
  "The Microsoft + OpenAI February 2024 disclosure made it clear that named state actors are using commercial LLM APIs. The detection-and-disruption posture from the major labs is real but not infallible.",
  "Lavender / Gospel reporting raised the question of automation bias in lethal-targeting systems. The same question applies to any high-consequence ML system. The mitigation is human-in-the-loop discipline + auditability + the right to refuse.",
  "Cyber-defense AI generates fewer ethical hazards than cyber-offense AI. If you're a US student considering this field, the defensive lane has more job density, less ethical exposure, and equivalent technical depth.",
];

export const metadata: Metadata = {
  title: "How LLMs fight in modern warfare · /learn/cyber/llm-warfare · AtomEons",
  description:
    "LLMs in actual military and cyber operations as of mid-2026 — Microsoft+OpenAI threat-actor disclosure, CIA Osiris, DoD Task Force Lima, Lavender/Gospel, Microsoft Security Copilot, Charlotte AI, Big Sleep. Defensive + offensive use, ethical hazards. Public info only. CC-BY 4.0.",
  keywords: [
    "LLM warfare",
    "AI in cyber operations",
    "Task Force Lima",
    "CIA Osiris",
    "Microsoft Security Copilot",
    "CrowdStrike Charlotte AI",
    "Lavender Gospel IDF",
    "Big Sleep Google Project Zero",
    "Microsoft OpenAI threat actor disclosure",
    "Anthropic red team",
  ],
  alternates: { canonical: "https://atomeons.com/learn/cyber/llm-warfare" },
  robots: { index: true, follow: true },
};

export default function CyberLLMWarfarePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How LLMs fight in modern warfare",
    "description": "Public-info briefing on LLM deployment in defensive + offensive cyber and military operations as of mid-2026.",
    "datePublished": "2026-06-01",
    "author": { "@type": "Organization", "name": "AtomEons Systems Laboratory" },
    "publisher": { "@type": "Organization", "name": "AtomEons", "url": "https://atomeons.com" },
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "isAccessibleForFree": true,
  };

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="llm-warfare" alt={"Macro close-up of a black machined-aluminum server module with a single bio-cyan status LED against pure black."} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> LLM warfare
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            How AI{" "}
            <span style={{ color: ACCENT }}>is actually fighting</span>{" "}
            right now.
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            The most boring true thing about LLMs in warfare: they are doing the workflow tasks
            that humans were doing the day before. Summarizing intel. Sorting alerts. Reading
            disassembly. Drafting briefings. Cracking obfuscated strings. They are not running
            autonomous offensive operations · they are accelerating analysts.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-[1.7] text-[#C8CCCE]">
            That said: the acceleration matters. A SOC that triages 10× faster with the same
            headcount has different capability. A threat-intel team that synthesizes 20× faster
            has different capability. A red team that automates routine prep has more time for
            novelty.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-[1.7] text-[#C8CCCE]">
            Below is what is publicly known to be deployed as of mid-2026. Sourced. No speculation.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            What attackers and intelligence services use LLMs for.
          </h2>
          <div className="mt-8 space-y-5">
            {OFFENSIVE_USE.map((o) => (
              <article key={o.title} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
                <h3 className="text-xl font-semibold tracking-tight text-[#F2F4F5]">{o.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE]">{o.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            What defenders use LLMs for.
          </h2>
          <div className="mt-8 space-y-5">
            {DEFENSIVE_USE.map((d) => (
              <article key={d.title} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
                <h3 className="text-xl font-semibold tracking-tight text-[#F2F4F5]">{d.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE]">{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Ethics — the part the recruiting videos skip
          </h2>
          <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE]">
            If you&apos;re going to work in this field, you are going to face decisions that
            don&apos;t have clean answers. Some patterns worth sitting with before you sign
            anywhere:
          </p>
          <ul className="mt-7 space-y-4 text-base leading-[1.7] text-[#C8CCCE]">
            {ETHICS.map((e, i) => (
              <li key={i} className="flex gap-3">
                <span style={{ color: WARN }}>○</span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Cited public sources
          </h2>
          <ul className="mt-7 space-y-3 text-[15px] leading-[1.7] text-[#C8CCCE]">
            <li className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::source</span>
              <a href="https://blogs.microsoft.com/on-the-issues/2024/02/14/microsoft-openai-threat-intelligence/" target="_blank" rel="noopener" className="ml-2 text-[#F2F4F5] underline decoration-[#22F0D5]/30 underline-offset-4 hover:decoration-[#22F0D5]">Microsoft + OpenAI joint threat-actor disclosure (February 2024)</a>
            </li>
            <li className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::source</span>
              <a href="https://www.bloomberg.com/news/articles/2024-09-23/cia-built-its-own-ai-rival-to-chatgpt" target="_blank" rel="noopener" className="ml-2 text-[#F2F4F5] underline decoration-[#22F0D5]/30 underline-offset-4 hover:decoration-[#22F0D5]">Bloomberg: CIA Osiris generative AI tool (2024)</a>
            </li>
            <li className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::source</span>
              <a href="https://www.defense.gov/News/News-Stories/Article/Article/3489803/dods-task-force-lima-spearheads-generative-ai-initiatives/" target="_blank" rel="noopener" className="ml-2 text-[#F2F4F5] underline decoration-[#22F0D5]/30 underline-offset-4 hover:decoration-[#22F0D5]">DoD Task Force Lima press release</a>
            </li>
            <li className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::source</span>
              <a href="https://www.theguardian.com/world/2024/apr/03/israel-gaza-ai-database-hamas-airstrikes" target="_blank" rel="noopener" className="ml-2 text-[#F2F4F5] underline decoration-[#22F0D5]/30 underline-offset-4 hover:decoration-[#22F0D5]">The Guardian: Lavender / Gospel reporting (April 2024)</a>
            </li>
            <li className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::source</span>
              <a href="https://googleprojectzero.blogspot.com/2024/10/from-naptime-to-big-sleep.html" target="_blank" rel="noopener" className="ml-2 text-[#F2F4F5] underline decoration-[#22F0D5]/30 underline-offset-4 hover:decoration-[#22F0D5]">Google Project Zero: Big Sleep CVE finding</a>
            </li>
            <li className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::source</span>
              <a href="https://www.microsoft.com/en-us/security/business/ai-machine-learning/microsoft-security-copilot" target="_blank" rel="noopener" className="ml-2 text-[#F2F4F5] underline decoration-[#22F0D5]/30 underline-offset-4 hover:decoration-[#22F0D5]">Microsoft Security Copilot product page</a>
            </li>
            <li className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::source</span>
              <a href="https://github.com/Azure/PyRIT" target="_blank" rel="noopener" className="ml-2 text-[#F2F4F5] underline decoration-[#22F0D5]/30 underline-offset-4 hover:decoration-[#22F0D5]">Microsoft PyRIT (open-source LLM red-team toolkit)</a>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/platforms" className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">
              the platforms running ops →
            </Link>
            <Link href="/learn/cyber/ai-security" className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              attacking AI systems →
            </Link>
            <Link href="/learn/cyber" className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              ← cyber index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
