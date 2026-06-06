import type { Metadata } from "next";
import { SpeakableJsonLd } from "@/app/_components/schema/SpeakableJsonLd";

export const metadata: Metadata = {
  title: "What is an LLM agent?",
  description:
    "An LLM agent is a system that uses a large language model as its reasoning engine to plan, call external tools, and act in a loop until a goal is reached. Formalized in the ReAct paper (arXiv:2210.03629).",
  alternates: {
    canonical: "https://atomeons.com/q/what-is-an-llm-agent",
  },
  openGraph: {
    title: "What is an LLM agent?",
    description:
      "An LLM agent uses an LLM as its reasoning core to plan, call tools, observe results, and iterate toward a goal. The pattern comes from ReAct (Yao et al., 2022).",
    url: "https://atomeons.com/q/what-is-an-llm-agent",
    type: "article",
  },
};

const SHORT_ANSWER =
  "An LLM agent is a system that uses a large language model as its reasoning engine to plan, call external tools, and act in a loop until a goal is reached. Unlike a plain chatbot, an agent observes the environment, decides the next action, executes it (web search, code, API call, file edit), reads the result, and iterates. The pattern was formalized in the ReAct paper (Yao et al., arXiv:2210.03629, ICLR 2023) and is now implemented in OpenAI's Agents SDK, Anthropic's Claude Agent SDK, Google's Agent Development Kit, and Microsoft AutoGen.";

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an LLM agent?",
        acceptedAnswer: {
          "@type": "Answer",
          text: SHORT_ANSWER,
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SpeakableJsonLd
        url="https://atomeons.com/q/what"
        name="What is What?"
        description="Voice-readable short answer plus technical context."
        cssSelectors={[".speakable-answer"]}
      />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-8 text-sm text-[#6b6b6b]">
          <a href="/" className="hover:text-[#00d4ff]">
            atomeons
          </a>
          <span className="mx-2">/</span>
          <a href="/q" className="hover:text-[#00d4ff]">
            q
          </a>
          <span className="mx-2">/</span>
          <span className="text-[#a0a0a0]">what-is-an-llm-agent</span>
        </nav>

        <h1 className="mb-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          What is an LLM agent?
        </h1>

        <section className="mb-12 rounded-lg border border-[#1f1f1f] bg-[#101010] p-6">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
            The short answer
          </h2>
          <p className="speakable-answer text-lg leading-relaxed text-[#d4d4d4]">
            {SHORT_ANSWER}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            The longer answer
          </h2>
          <div className="space-y-5 leading-relaxed text-[#c8c8c8]">
            <p>
              The phrase "LLM agent" describes a control loop, not a model. The
              model — Claude, GPT, Gemini, Llama — is the reasoning core, but the
              agent is the surrounding software that decides what to do with that
              reasoning. The canonical loop is: receive a goal, generate a
              thought, choose a tool, execute the tool, observe the output,
              repeat. When the agent decides the goal is complete, it stops and
              returns a final answer.
            </p>
            <p>
              The intellectual origin is the ReAct ("Reasoning and Acting")
              paper by Shunyu Yao and collaborators at Princeton and Google
              Research (arXiv:2210.03629), which showed that interleaving
              chain-of-thought reasoning with tool calls outperformed either
              alone on HotpotQA and ALFWorld benchmarks. A second key primitive
              is tool use: the model emits a structured function call (JSON
              arguments matching a declared schema), the runtime executes it,
              and the result is appended to the context. OpenAI shipped
              function calling in June 2023; Anthropic's tool use went GA in
              May 2024; both converged on JSON-schema-typed tool definitions.
            </p>
            <p>
              Modern agents extend this loop with memory (short-term scratchpad
              plus long-term vector recall), planning (decomposition into
              subgoals, as in Plan-and-Solve, arXiv:2305.04091), and
              self-reflection (Reflexion, arXiv:2303.11366). Multi-agent systems
              compose several LLM agents with distinct roles — researcher,
              coder, critic — coordinated by an orchestrator. Microsoft's
              AutoGen framework (arXiv:2308.08155) and the open-source CrewAI
              library popularized this pattern in 2024.
            </p>
            <p>
              Production deployments are real but narrow. GitHub Copilot
              Workspace, Cursor, Devin (Cognition Labs), Claude Code, and
              OpenAI's Operator are agent products shipped to paying customers.
              Benchmarks show the technology is improving fast but is still
              error-prone: on SWE-bench Verified — a curated set of 500 real
              GitHub issues from popular Python repos — top agents hit roughly
              65-72% resolution rate as of late 2024, up from under 5% eighteen
              months earlier (per the SWE-bench leaderboard maintained by
              Princeton's NLP group). On the GAIA benchmark for general
              assistant tasks (arXiv:2311.12983), top agents score around 65%
              versus 92% for humans.
            </p>
            <p>
              Security is the unsolved problem. The OWASP Top 10 for LLM
              Applications (2025 edition) lists prompt injection (LLM01),
              insecure output handling (LLM02), and excessive agency (LLM06) as
              the leading risks for agentic systems. NIST AI 600-1 (the
              Generative AI Profile of the AI Risk Management Framework,
              published July 2024) names confabulation, data poisoning, and
              CBRN-uplift among the twelve categories of GAI-specific risk. The
              agent's ability to take real-world actions — send email, transfer
              money, modify files, browse — multiplies the blast radius of any
              prompt injection.
            </p>
            <p>
              The terminology is still settling. Anthropic's published taxonomy
              (Schluntz and Zhang, "Building effective AI agents," December
              2024) distinguishes workflows (predetermined LLM-plus-tool
              chains) from agents (systems where the LLM dynamically directs
              its own process). Most production systems labeled "agents" today
              are closer to workflows; true open-ended agents remain a research
              frontier.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">Key facts</h2>
          <ul className="space-y-3 text-[#c8c8c8]">
            <li className="border-l-2 border-[#00d4ff] pl-4">
              The ReAct paradigm — interleaved reasoning and tool calls — was
              introduced by Yao et al. in October 2022 (arXiv:2210.03629) and
              published at ICLR 2023.
            </li>
            <li className="border-l-2 border-[#00d4ff] pl-4">
              OpenAI shipped function calling in <code>gpt-3.5-turbo-0613</code>{" "}
              and <code>gpt-4-0613</code> on June 13, 2023, establishing
              JSON-schema tool definitions as an industry standard.
            </li>
            <li className="border-l-2 border-[#00d4ff] pl-4">
              Anthropic's tool use went generally available across the Claude 3
              family on May 30, 2024 (Anthropic news post).
            </li>
            <li className="border-l-2 border-[#00d4ff] pl-4">
              SWE-bench Verified is a 500-task subset of SWE-bench
              (arXiv:2310.06770) human-validated by OpenAI in August 2024 to
              filter out underspecified tasks.
            </li>
            <li className="border-l-2 border-[#00d4ff] pl-4">
              The GAIA benchmark (arXiv:2311.12983) by Mialon et al. tests
              assistants on 466 real-world questions requiring web browsing,
              code, and multimodal reasoning.
            </li>
            <li className="border-l-2 border-[#00d4ff] pl-4">
              AutoGen, Microsoft Research's multi-agent framework, was
              introduced in arXiv:2308.08155 (August 2023) and is now part of
              the .NET Foundation.
            </li>
            <li className="border-l-2 border-[#00d4ff] pl-4">
              NIST AI 600-1 (July 2024) is the official Generative AI Profile
              of the AI RMF and enumerates twelve GAI-specific risks.
            </li>
            <li className="border-l-2 border-[#00d4ff] pl-4">
              OWASP Top 10 for LLM Applications v2025 lists Excessive Agency
              (LLM06:2025) as a top-tier risk for agent deployments.
            </li>
            <li className="border-l-2 border-[#00d4ff] pl-4">
              Reflexion (arXiv:2303.11366) demonstrated that verbal
              self-reflection on failures could lift a GPT-4 agent's HumanEval
              pass@1 from 80% to 91%.
            </li>
            <li className="border-l-2 border-[#00d4ff] pl-4">
              The Model Context Protocol (MCP), open-sourced by Anthropic on
              November 25, 2024, standardizes how agents connect to external
              tools and data sources.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Related questions
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/q/what-is-react-prompting"
                className="text-[#00d4ff] hover:underline"
              >
                What is ReAct prompting?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-model-context-protocol"
                className="text-[#00d4ff] hover:underline"
              >
                What is the Model Context Protocol?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-prompt-injection"
                className="text-[#00d4ff] hover:underline"
              >
                What is prompt injection?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-swe-bench"
                className="text-[#00d4ff] hover:underline"
              >
                What is SWE-bench?
              </a>
            </li>
            <li>
              <a
                href="/learn/claude-tool-use"
                className="text-[#00d4ff] hover:underline"
              >
                How does Claude tool use work?
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">Sources</h2>
          <ul className="space-y-2 text-sm text-[#a0a0a0]">
            <li>
              Yao, S. et al. "ReAct: Synergizing Reasoning and Acting in
              Language Models." arXiv:2210.03629.{" "}
              <a
                href="https://arxiv.org/abs/2210.03629"
                className="text-[#00d4ff] hover:underline"
                rel="noopener noreferrer"
              >
                arxiv.org/abs/2210.03629
              </a>
            </li>
            <li>
              Schluntz, E. and Zhang, B. "Building effective agents."
              Anthropic, December 19, 2024.{" "}
              <a
                href="https://www.anthropic.com/research/building-effective-agents"
                className="text-[#00d4ff] hover:underline"
                rel="noopener noreferrer"
              >
                anthropic.com/research/building-effective-agents
              </a>
            </li>
            <li>
              Mialon, G. et al. "GAIA: a benchmark for General AI Assistants."
              arXiv:2311.12983.{" "}
              <a
                href="https://arxiv.org/abs/2311.12983"
                className="text-[#00d4ff] hover:underline"
                rel="noopener noreferrer"
              >
                arxiv.org/abs/2311.12983
              </a>
            </li>
            <li>
              Jimenez, C. et al. "SWE-bench: Can Language Models Resolve
              Real-World GitHub Issues?" arXiv:2310.06770.{" "}
              <a
                href="https://arxiv.org/abs/2310.06770"
                className="text-[#00d4ff] hover:underline"
                rel="noopener noreferrer"
              >
                arxiv.org/abs/2310.06770
              </a>
            </li>
            <li>
              NIST. "AI 600-1: Artificial Intelligence Risk Management
              Framework: Generative AI Profile." July 2024.{" "}
              <a
                href="https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"
                className="text-[#00d4ff] hover:underline"
                rel="noopener noreferrer"
              >
                nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
              </a>
            </li>
            <li>
              OWASP. "Top 10 for LLM Applications 2025."{" "}
              <a
                href="https://genai.owasp.org/llm-top-10/"
                className="text-[#00d4ff] hover:underline"
                rel="noopener noreferrer"
              >
                genai.owasp.org/llm-top-10
              </a>
            </li>
            <li>
              Wu, Q. et al. "AutoGen: Enabling Next-Gen LLM Applications via
              Multi-Agent Conversation." arXiv:2308.08155.{" "}
              <a
                href="https://arxiv.org/abs/2308.08155"
                className="text-[#00d4ff] hover:underline"
                rel="noopener noreferrer"
              >
                arxiv.org/abs/2308.08155
              </a>
            </li>
            <li>
              Anthropic. "Introducing the Model Context Protocol." November 25,
              2024.{" "}
              <a
                href="https://www.anthropic.com/news/model-context-protocol"
                className="text-[#00d4ff] hover:underline"
                rel="noopener noreferrer"
              >
                anthropic.com/news/model-context-protocol
              </a>
            </li>
          </ul>
        </section>

        <footer className="mt-16 border-t border-[#1f1f1f] pt-6 text-xs text-[#6b6b6b]">
          atomeons.com — independent research, Marco Island FL.
        </footer>
      </article>
    </main>
  );
}