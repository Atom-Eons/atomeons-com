import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

const OWASP_LLM = [
  { id: "LLM01", name: "Prompt Injection", body: "Direct or indirect manipulation of model instructions via user input. Indirect injection (model reads tainted external content — webpage, PDF, email, RAG corpus) is the harder variant. Most-cited LLM-specific vulnerability in 2026 deployments." },
  { id: "LLM02", name: "Insecure Output Handling", body: "Treating LLM output as trusted before sanitization. Classic example: LLM generates SQL or shell that a downstream system executes. Always treat LLM output as untrusted user input · validate / escape / sandbox." },
  { id: "LLM03", name: "Training Data Poisoning", body: "Adversary contaminates fine-tuning or RAG-corpus data with content designed to manipulate model behavior. Detection requires data-provenance discipline most teams don't have." },
  { id: "LLM04", name: "Model Denial of Service", body: "Crafted prompts that cause runaway token consumption, exhaust context windows, trigger expensive tool-use loops. Cost-bomb attacks on token-billed apps." },
  { id: "LLM05", name: "Supply Chain Vulnerabilities", body: "Compromised model weights from Hugging Face, poisoned third-party datasets, malicious dependencies in agent frameworks." },
  { id: "LLM06", name: "Sensitive Information Disclosure", body: "Model leaks training data, system prompts, prior-conversation context, or API keys it was given access to. Membership-inference attacks. Training-data extraction." },
  { id: "LLM07", name: "Insecure Plugin Design", body: "Agent / tool-use plugins that take input without validation, execute privileged actions without authorization, or expose secrets through tool definitions." },
  { id: "LLM08", name: "Excessive Agency", body: "Giving an agent more permissions, tool access, or autonomy than the use case requires. Classic example: file-system write access for a 'summarize my emails' agent." },
  { id: "LLM09", name: "Overreliance", body: "Humans treating LLM output as authoritative when it's wrong. Includes downstream automation that doesn't verify before acting. The Air Canada chatbot ruling is the canonical case." },
  { id: "LLM10", name: "Model Theft", body: "Extraction of proprietary model weights or capabilities via output querying, distillation attacks, or supply-chain compromise of training infrastructure." },
];

const MITRE_ATLAS = [
  { tactic: "Reconnaissance", body: "Adversary gathers information on the target AI system. Includes searching for publicly-available model details, querying the model to characterize behavior, identifying the system prompt." },
  { tactic: "Resource Development", body: "Adversary builds capability — crafts adversarial inputs, develops poisoning datasets, acquires victim-model access for distillation." },
  { tactic: "Initial Access", body: "Adversary obtains the foothold — through prompt injection in tainted web content the AI reads, through compromised plugins/tools, through legitimate user access misused." },
  { tactic: "ML Model Access", body: "Adversary gains access to query the model in ways that enable downstream attacks (extraction, evasion)." },
  { tactic: "Execution", body: "Adversary causes the model to execute attacker-supplied logic — via prompt injection, plugin abuse, or agentic tool misuse." },
  { tactic: "Persistence", body: "Adversary maintains foothold. Includes poisoning persistent memory / vector stores so subsequent sessions exhibit the manipulated behavior." },
  { tactic: "Defense Evasion", body: "Adversary bypasses safety guardrails. Jailbreaks, multi-turn social engineering, encoded payloads." },
  { tactic: "Discovery", body: "Adversary learns about the system from inside — what tools are available, what data the model can see, what other systems it integrates with." },
  { tactic: "Exfiltration", body: "Adversary extracts data through the model — training data, system prompts, RAG-indexed sensitive content, API keys exposed to tools." },
  { tactic: "Impact", body: "Adversary achieves the goal — financial harm, reputation damage, denial of service, manipulated decisions in downstream systems." },
];

export const metadata: Metadata = {
  title: "AI security · the new attack surface · /learn/cyber · AtomEons",
  description:
    "OWASP LLM Top 10. MITRE ATLAS adversarial-ML framework. Prompt injection direct + indirect. Adversarial machine learning. Training data poisoning. Where AI-specific cyber jobs live in 2026. Public info only. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/ai-security" },
};

export default function CyberAISecurityPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="ai-security" alt={"Layered translucent dark panels backlit by a single bio-cyan glow source, suggesting a defensive barrier."} />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> AI security
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            The new attack surface{" "}
            <span className="text-[#22F0D5]">cyber teams are missing.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            Every Fortune 500 deployed an LLM into a customer-facing product between 2023 and
            2026. Almost none of them did so with a threat model that accounts for
            LLM-specific risks. This is the rarest cyber skill set in the market right now and
            it pays a premium because of it.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-[1.7] text-[#C8CCCE]">
            Two public frameworks define the field: <strong className="text-[#F2F4F5]">OWASP&apos;s
            LLM Top 10</strong> (the canonical vuln catalog) and{" "}
            <strong className="text-[#F2F4F5]">MITRE ATLAS</strong> (the adversarial-ML attack
            framework, analog to MITRE ATT&CK for traditional cyber). Learn both and you have
            the vocabulary the field uses.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            What can go wrong in an LLM application.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.7] text-[#C8CCCE]">
            Maintained by the OWASP foundation. Updated 2023 and 2024. Read the full project at{" "}
            <a href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">
              owasp.org
            </a>
            .
          </p>
          <div className="mt-8 space-y-3">
            {OWASP_LLM.map((o) => (
              <div key={o.id} className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-[#F2F4F5]"><span className="font-mono text-[#22F0D5]">{o.id}</span> · {o.name}</h3>
                </div>
                <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The attack lifecycle, mapped.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-[1.7] text-[#C8CCCE]">
            MITRE ATLAS (Adversarial Threat Landscape for AI Systems) is the AI-specific
            analog of MITRE ATT&CK. Same 10-tactic structure (Recon → Impact) with
            ML-specific techniques. Maintained by MITRE at{" "}
            <a href="https://atlas.mitre.org" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">
              atlas.mitre.org
            </a>
            . Used by defenders to think about kill-chain disruption + by red teams to
            structure adversarial-ML engagement plans.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {MITRE_ATLAS.map((a, i) => (
              <div key={i} className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <h3 className="mt-2 text-base font-semibold text-[#F2F4F5]">{a.tactic}</h3>
                <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            How to skill into AI security specifically
          </h2>
          <ol className="mt-7 space-y-5 text-base leading-[1.75] text-[#C8CCCE]">
            <li className="flex gap-4">
              <span className="font-mono text-2xl font-bold text-[#22F0D5]">01</span>
              <span>
                <strong className="text-[#F2F4F5]">Master traditional appsec first.</strong>{" "}
                AI security is appsec + ML. Without solid web/app/API security fundamentals,
                AI-security depth is brittle. OSCP-level offensive + OWASP-Top-10-fluent
                defensive is the floor.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-2xl font-bold text-[#22F0D5]">02</span>
              <span>
                <strong className="text-[#F2F4F5]">Read both frameworks end-to-end.</strong>{" "}
                OWASP LLM Top 10 and MITRE ATLAS. The vocabulary alone separates AI-security
                practitioners from generalists.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-2xl font-bold text-[#22F0D5]">03</span>
              <span>
                <strong className="text-[#F2F4F5]">Do hands-on adversarial ML.</strong> The
                free practice resources: <a href="https://gandalf.lakera.ai" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">Lakera Gandalf</a>{" "}
                (prompt-injection game, 7 levels of escalating difficulty), the HackAPrompt
                competition archives, the PortSwigger Web Security Academy LLM-attacks labs,
                Anthropic&apos;s and OpenAI&apos;s published red-team write-ups.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-2xl font-bold text-[#22F0D5]">04</span>
              <span>
                <strong className="text-[#F2F4F5]">Build a benchmark or red-team a real model.</strong>{" "}
                Pick an open-weights model. Build a curated prompt-injection benchmark. Test
                publicly available frontier APIs against it (within their published terms of
                service · do not violate API rules). Publish your results. Public work in this
                area gets read fast and lands interviews.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-2xl font-bold text-[#22F0D5]">05</span>
              <span>
                <strong className="text-[#F2F4F5]">Join the AI-security community.</strong>{" "}
                Follow practitioners on Twitter/X (Simon Willison&apos;s blog and feed is the
                canonical English-language source · NIST AI Safety Institute reports · UK AI
                Safety Institute publications · Anthropic Trust + Safety + Alignment team
                writing · Apollo Research evals). The community is small enough that quality
                public work gets noticed within weeks.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-2xl font-bold text-[#22F0D5]">06</span>
              <span>
                <strong className="text-[#F2F4F5]">Apply for AI-security-specific roles.</strong>{" "}
                Anthropic, OpenAI, Google DeepMind, Meta FAIR, xAI, NVIDIA, every major lab now
                has AI Trust + Safety / Red Team / Alignment Security teams. Apollo Research,
                METR (Model Evaluation and Threat Research), UK AISI, US NIST AI Safety
                Institute. Public AI-security consultancies (Robust Intelligence, HiddenLayer,
                Lakera, Mindgard).
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The bug bounty programs paying for AI security
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-[1.7] text-[#C8CCCE]">
            Every major AI lab now runs a bug bounty program with explicit AI-security scope.
            Most are on HackerOne or Bugcrowd. Bounty ranges are higher than general appsec
            because the field is undersupplied. As of 2026 best-effort:
          </p>
          <ul className="mt-7 space-y-3 text-base leading-[1.7] text-[#C8CCCE]">
            <li>· <strong className="text-[#F2F4F5]">Anthropic</strong> · bug bounty + prior research programs on AI safety. Published payouts ranged $1K-$25K+ in 2024-2025.</li>
            <li>· <strong className="text-[#F2F4F5]">OpenAI</strong> · public bug bounty on Bugcrowd. AI Cybersecurity Grant Program for research.</li>
            <li>· <strong className="text-[#F2F4F5]">Google</strong> · expanded Vulnerability Reward Program to cover generative AI specifically in 2023+. Up to $30K+ for highest-impact AI-specific findings.</li>
            <li>· <strong className="text-[#F2F4F5]">Microsoft</strong> · added AI Bounty Program covering Copilot and Azure AI in 2023+. Up to $15K+.</li>
            <li>· <strong className="text-[#F2F4F5]">Hugging Face</strong> · model-hub security bounty.</li>
            <li>· <strong className="text-[#F2F4F5]">DEF CON AI Village</strong> · annual public red-teaming events with cash prizes. The 2023 generative red team at DEF CON 31 was the largest public AI red team in history.</li>
          </ul>
          <p className="mt-6 text-sm leading-[1.6] text-[#9BA5A7]">
            Always verify program scope and payout amounts on the provider&apos;s official
            program page before testing. Amounts change.
          </p>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/cyberwar" className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">
              cyberwar context →
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
