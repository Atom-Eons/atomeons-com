import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agent Harnesses — LangGraph, CrewAI, AutoGen, Claude Code · AtomEons",
  description:
    "An agent harness is the runtime that loops an LLM with tools and state. LangGraph for state machines, CrewAI for role-based teams, AutoGen for conversation graphs, Claude Code for terminal-native coding agents. What each is for, where each breaks.",
  alternates: { canonical: "https://atomeons.com/learn/atlas/agent-harnesses" },
  openGraph: {
    title: "Agent Harnesses · AtomEons Atlas",
    description:
      "The runtime that loops an LLM with tools and state. LangGraph · CrewAI · AutoGen · Claude Code — what they are, where they break.",
    url: "https://atomeons.com/learn/atlas/agent-harnesses",
    type: "article",
  },
};

export default function AgentHarnessesPage() {
  return (
    <main className="bg-[#08090B] text-[#F4F4F2] antialiased">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-12 md:px-10 md:pt-28 md:pb-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
            <Link href="/learn/atlas" className="hover:text-[#22F0D5] transition-colors">§ Atlas</Link>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#22F0D5]">Agentic systems · runtime</span>
          </p>
          <h1 className="mt-8 max-w-[26ch] text-balance text-[clamp(36px,6vw,72px)] font-extralight leading-[1.04] tracking-[-0.025em] text-[#F4F4F2]">
            Agent Harnesses — the loop, the tools, the state
          </h1>
          <p className="mt-8 max-w-[64ch] font-serif text-[19px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            An agent is not a model. An agent is a model inside a loop that
            invokes tools, persists state, and runs until a stop condition.
            The harness is the loop. What harness you pick decides what kind
            of agent you can build.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <section className="space-y-6">
          <h2 className="font-serif text-[28px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>What it is</h2>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            An agent harness is a piece of software that runs an LLM in a
            loop, parses its tool-use intentions, executes those tools,
            feeds the results back, and decides when to stop. The model is
            the brain; the harness is the body. The same model can act very
            differently in two different harnesses — a state machine
            constrains it differently than a free-form conversation graph.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Harnesses split roughly into four shapes. <em>State machines</em>{" "}
            (LangGraph) treat the agent as a finite graph of nodes connected
            by transitions; the LLM picks which edge to traverse next.{" "}
            <em>Role-based teams</em> (CrewAI) instantiate multiple agents
            with distinct prompts, hand work between them via a coordinator,
            and let each one specialize. <em>Conversation graphs</em>{" "}
            (AutoGen) treat agents as nodes that can send messages to each
            other in flexible topologies, including human-in-the-loop nodes.{" "}
            <em>Terminal-native</em> harnesses (Claude Code, Aider, Cursor
            agent) are built around shell execution and file editing as the
            primary tool surface, with everything else added on top.
          </p>
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>How each actually works</h2>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>LangGraph</em> (Harrison Chase / LangChain, open-source) is a
            Python library that compiles an agent into a directed graph with
            explicit nodes and edges. Each node is either a callable (a tool
            invocation, a sub-chain) or a model call. Edges can be{" "}
            <em>conditional</em> — the LLM emits a decision that selects the
            next edge. State is a typed dict (a Python TypedDict or Pydantic
            model) that the harness threads through every node. The win is
            determinism: you can statically inspect the graph, replay it,
            checkpoint it, branch from any node. The loss is rigidity:
            anything you didn't draw in the graph, the agent can't do.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>CrewAI</em> (João Moura, open-source) models a multi-agent
            system as a small team — researcher, writer, critic, manager —
            each with its own role prompt and tool set. A <em>Crew</em> object
            assigns tasks, routes outputs, and runs the team in sequential
            or hierarchical order. CrewAI is the easiest harness to get a
            multi-agent demo running in; the trade-off is that role prompts
            are brittle and the team coordination overhead is real (every
            handoff is another LLM call).
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>AutoGen</em> (Microsoft Research, open-source) treats agents
            as conversational entities that can send messages to one or
            many recipients, including user-proxy agents that represent the
            human. The runtime is a message-passing graph. AutoGen's design
            principle is that complex behaviors emerge from agents{" "}
            <em>talking</em>, not from explicit state transitions. This is
            the most flexible harness and also the hardest to debug — when
            a six-agent conversation goes off the rails, finding the bad
            message is an archaeology project.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>Claude Code</em> (Anthropic, MIT-licensed CLI) is a terminal-
            native harness built around bash execution, file read/edit/write,
            and a small set of agent tools (Task, Glob, Grep, WebFetch). It
            uses the Anthropic API tool-use loop directly. The state is the
            conversation history plus the file system. It is the canonical
            example of a coding-specific harness: the tools are the verbs a
            programmer uses; everything else is built on top.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>Aider</em> (Paul Gauthier, open-source) is the older
            terminal-native harness, focused on whole-file diff editing
            with explicit Git integration. It pioneered the "edit-format"
            patterns (whole, diff, diff-fenced, udiff, architect+editor)
            that most coding agents now use.
          </p>
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Receipts</h2>
          <ol className="space-y-4 font-serif text-[17px] leading-[1.6] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              LangGraph documentation and source — <span className="font-mono text-[12px] text-[#5A6068]">github.com/langchain-ai/langgraph</span> · MIT licensed · maintained by LangChain Inc.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              CrewAI documentation and source — <span className="font-mono text-[12px] text-[#5A6068]">github.com/crewAIInc/crewAI</span> · MIT licensed.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              AutoGen — Wu, Bansal, Zhang, et al., <em>AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation</em>, Microsoft Research, arXiv:2308.08155 (2023).
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Claude Code — Anthropic, <span className="font-mono text-[12px] text-[#5A6068]">docs.claude.com/en/docs/claude-code</span> · CLI agent harness.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Aider — Paul Gauthier, <span className="font-mono text-[12px] text-[#5A6068]">aider.chat</span> · publishes the Aider Polyglot leaderboard for code-edit benchmarks.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              ReAct — Yao, Zhao, Yu, et al., <em>ReAct: Synergizing Reasoning and Acting in Language Models</em>, arXiv:2210.03629 (2022). The first formalization of the reason-then-act tool loop that all modern harnesses inherit.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Voyager — Wang, Xie, Jiang, et al., <em>Voyager: An Open-Ended Embodied Agent with Large Language Models</em>, arXiv:2305.16291 (2023). Showed skill-library accumulation as an agent-harness pattern.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              SWE-bench — Jimenez, Yang, Wettig, et al., <em>SWE-bench: Can Language Models Resolve Real-World GitHub Issues?</em>, ICLR 2024. The canonical benchmark for evaluating coding-agent harnesses.
            </li>
          </ol>
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>What practitioners do with it</h2>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Pick by problem shape. If the work is{" "}
            <strong className="text-[#F4F4F2]">linear with branches</strong> —
            a customer-support flow, a research pipeline, a triage path —
            LangGraph wins. The state machine is the documentation. If the
            work is <strong className="text-[#F4F4F2]">collaborative across
            roles</strong> — a researcher generates, a critic reviews, a
            writer polishes — CrewAI is the fastest to ship. If the work is{" "}
            <strong className="text-[#F4F4F2]">open-ended exploration with
            human-in-the-loop</strong> — research, complex debugging, anything
            where the next step isn't predictable — AutoGen's free-form
            messaging fits. If the work is{" "}
            <strong className="text-[#F4F4F2]">code in a real repo</strong>,
            use a terminal-native harness — Claude Code or Aider or Cursor's
            agent mode. General-purpose Python harnesses are a poor fit for
            shell + Git work, and the gap widens with codebase size.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            For evaluation, all of these can be measured on the same public
            benchmarks. SWE-bench Verified (real GitHub issues), Aider
            Polyglot (multi-language code editing), GAIA (general
            assistant reasoning), and WebArena (browser tasks) are the
            canonical four. The published numbers tell you what model + harness
            combination beats which; the gap between harnesses on the same
            model can be larger than the gap between models on the same
            harness.
          </p>
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>What it is NOT</h2>
          <ul className="space-y-4 font-serif text-[17px] leading-[1.6] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <li className="border border-[#1F242B] bg-[#0F1114] p-5">
              <strong className="text-[#F4F4F2]">Not a model.</strong> The
              harness is the runtime; the model is the brain. Swap the model
              and the harness stays the same. Swap the harness and the same
              model behaves differently.
            </li>
            <li className="border border-[#1F242B] bg-[#0F1114] p-5">
              <strong className="text-[#F4F4F2]">Not the same as a chat
              UI.</strong> ChatGPT and Claude.ai are conversational front-
              ends with limited tool access. An agent harness can run for
              minutes or hours, invoke tools without asking, and persist
              state between turns. The shape of the work is different.
            </li>
            <li className="border border-[#1F242B] bg-[#0F1114] p-5">
              <strong className="text-[#F4F4F2]">Not Auto-GPT / BabyAGI
              redux.</strong> The 2023 generation of "autonomous agent"
              demos collapsed on real tasks. Modern harnesses inherited
              the loop-with-tools idea but add typed state, explicit
              graphs, deterministic checkpoints, and structured tool
              schemas — the things Auto-GPT lacked.
            </li>
            <li className="border border-[#1F242B] bg-[#0F1114] p-5">
              <strong className="text-[#F4F4F2]">Not "AGI in a
              wrapper."</strong> A capable model in a capable harness is
              still bounded by what the tools expose and what the model can
              reason about. Harnesses make agents possible; they don't
              make them omnipotent.
            </li>
          </ul>
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Further reading</h2>
          <ul className="space-y-3 font-serif text-[16px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <li>
              <a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">LangGraph (GitHub)</a> — source + tutorials.
            </li>
            <li>
              <a href="https://docs.crewai.com/" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">CrewAI docs</a> — quickstart + the Crew + Task + Agent abstractions.
            </li>
            <li>
              <a href="https://microsoft.github.io/autogen/" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">AutoGen documentation (Microsoft)</a> — conversational-agent framework.
            </li>
            <li>
              <a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">Claude Code docs</a> — Anthropic's terminal-native CLI agent.
            </li>
            <li>
              <a href="https://www.swebench.com/" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">SWE-bench leaderboard</a> — published numbers for coding-agent harness evaluations.
            </li>
            <li>
              <Link href="/q/what-is-an-llm-agent" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">AtomEons Q-page · What is an LLM agent?</Link>
            </li>
          </ul>
        </section>

        <section className="mt-20 border-t border-[#1F242B] pt-12">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/learn/atlas" className="inline-flex items-center gap-2 border border-[#1F242B] bg-[#0F1114] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] hover:border-[#22F0D5] hover:text-[#22F0D5]">
              <span aria-hidden>←</span><span>Back to Atlas</span>
            </Link>
            <Link href="/learn/atlas/mechanistic-interpretability" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] hover:text-[#22F0D5]">Mechanistic interpretability →</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
