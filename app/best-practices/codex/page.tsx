import type { Metadata } from "next";
import Link from "next/link";
import { Section, Table } from "../claude/page";

/**
 * /best-practices/codex · OpenAI Codex CLI cheat sheet.
 * Sourced from platform.openai.com/docs/codex · last verified 2026-06-06.
 */

export const metadata: Metadata = {
  title: "Codex Best Practices · Cheat Sheet",
  description:
    "OpenAI Codex CLI cheat sheet · approval modes · AGENTS.md · gpt-5 tiers · slash commands · web search · image input · MCP support · sandbox modes. Sourced from platform.openai.com · verified 2026-06-06.",
  alternates: { canonical: "https://atomeons.com/best-practices/codex" },
  openGraph: {
    title: "Codex CLI Best Practices · Cheat Sheet",
    description:
      "OpenAI Codex CLI · approval modes · AGENTS.md · slash commands · the OpenAI agentic-coding stack.",
    url: "https://atomeons.com/best-practices/codex",
    type: "article",
  },
};

const SHORTCUTS = [
  { keys: "Ctrl+C", what: "Cancel the current generation · prompts for confirmation if running" },
  { keys: "Ctrl+D", what: "Exit the Codex session" },
  { keys: "Ctrl+L", what: "Clear terminal · context preserved" },
  { keys: "Up / Down", what: "Cycle through previous prompts in this session" },
  { keys: "Tab", what: "File-path autocomplete inline" },
  { keys: "Esc", what: "Abort current operation when prompted" },
  { keys: "Enter twice", what: "Submit multi-line prompt · single Enter inserts newline in paste-multi mode" },
];

const SLASH = [
  { cmd: "/help", what: "Help index · all slash commands" },
  { cmd: "/init", what: "Generate an AGENTS.md tailored to this repo" },
  { cmd: "/clear", what: "Reset conversation context" },
  { cmd: "/model", what: "Switch model · gpt-5, gpt-5-mini, gpt-5-thinking-high, o3-mini, etc" },
  { cmd: "/approval", what: "Change approval mode mid-session · suggest / auto-edit / full-auto" },
  { cmd: "/sandbox", what: "Change sandbox mode · read-only / workspace-write / danger-full-access" },
  { cmd: "/diff", what: "Show pending file changes before approval" },
  { cmd: "/compact", what: "Summarize older context to free room" },
  { cmd: "/exit", what: "Exit · same as Ctrl+D" },
  { cmd: "/login", what: "Authenticate via ChatGPT Plus/Pro or API key" },
  { cmd: "/status", what: "Show approval mode, sandbox mode, model, working dir" },
  { cmd: "/review", what: "Run a code review on the staged or last commit's changes" },
];

const APPROVAL_MODES = [
  {
    name: "Suggest mode (default)",
    detail:
      "Codex proposes a diff · you accept / reject / edit each file. Slowest but safest. Best for unfamiliar code.",
  },
  {
    name: "Auto-edit mode",
    detail:
      "Codex applies file edits automatically · still asks before shell commands. Good middle ground. Set with --approval auto-edit or /approval auto-edit.",
  },
  {
    name: "Full-auto mode",
    detail:
      "Codex applies edits AND runs commands without confirmation. Combined with the workspace-write sandbox this is the agentic loop · let it run + watch. Set with --approval full-auto.",
  },
];

const SANDBOX_MODES = [
  {
    name: "read-only",
    detail:
      "Codex can read files + run read-only commands · cannot edit. Safe for exploration / review work.",
  },
  {
    name: "workspace-write",
    detail:
      "Codex can edit files in the working directory + run commands · cannot reach outside. Default for full-auto.",
  },
  {
    name: "danger-full-access",
    detail:
      "Codex can do anything the shell user can do · including sudo, deletion, network. Use deliberately. Best in a container or VM.",
  },
];

const CONFIG_FILES = [
  {
    path: "<project>/AGENTS.md",
    role: "Project standing brief · the equivalent of CLAUDE.md · always-in-context for Codex on this repo",
  },
  {
    path: "~/.codex/config.toml",
    role: "Global Codex settings · default model, default approval, MCP servers, profile defaults",
  },
  {
    path: "~/.codex/auth.json",
    role: "Authentication state · ChatGPT login token or API key reference · do NOT commit",
  },
  {
    path: "<project>/.codex/config.toml",
    role: "Project-local Codex settings · overrides global · safer to commit minus secrets",
  },
  {
    path: "<project>/.codexignore",
    role: "Files Codex should never read · gitignore-style syntax",
  },
];

const MODELS = [
  { keys: "gpt-5", what: "Default frontier model · best general coding + reasoning · highest cost" },
  { keys: "gpt-5-mini", what: "60% cheaper · slightly less capable on hard reasoning · good for grunt work" },
  { keys: "gpt-5-thinking-high", what: "Slower · much deeper reasoning · best for architectural decisions" },
  { keys: "gpt-5-codex", what: "Codex-tuned variant · optimized for tool use + code edits" },
  { keys: "o3-mini", what: "Reasoning-tuned smaller model · cheaper than gpt-5-thinking · still strong on logic" },
  { keys: "o4-mini", what: "Newer reasoning small model · faster than o3 · check current docs for availability" },
];

const OPTIMIZATION = [
  {
    title: "Run /init in every new repo",
    detail:
      "Generates a tailored AGENTS.md with your repo's structure, key files, build commands, and tests. Saves 20-30% on every future prompt.",
  },
  {
    title: "Pick the approval mode per task, not per session",
    detail:
      "/approval full-auto for grunt refactors · suggest for unfamiliar codebases · auto-edit for known territory. Don't sit in suggest mode for everything.",
  },
  {
    title: "Use workspace-write sandbox + full-auto for agent loops",
    detail:
      "Combined: Codex can edit + run tests + iterate · without touching anything outside the working dir. The legitimate agent loop.",
  },
  {
    title: "Match model to task tier",
    detail:
      "Routine edits → gpt-5-mini. Tricky reasoning or architecture → gpt-5-thinking-high. Most sessions can stay on gpt-5 default · /model to switch mid-stream.",
  },
  {
    title: "Use --image flag for screenshots + diagrams",
    detail:
      "codex --image screenshot.png 'fix this layout bug'. Codex reads the image with vision · much better than describing visual problems in text.",
  },
  {
    title: "Enable web search for fresh-API questions",
    detail:
      "Codex has built-in web search · it'll cite sources when answers depend on docs/APIs that may have changed. Enable in config.toml or via /web-search.",
  },
  {
    title: "Use /diff before /approval-accepting big changes",
    detail:
      "Even in auto-edit · /diff before letting Codex commit gives you a final review. Catches whole-file rewrites it shouldn't have done.",
  },
  {
    title: "Keep AGENTS.md under 300 lines",
    detail:
      "Every prompt includes it. Long AGENTS.md = slower + more expensive. Move detailed protocols to per-task prompts or split into modules.",
  },
  {
    title: "MCP for cross-tool memory",
    detail:
      "If you also use Claude Code or other MCP clients, the same MCP servers (Notion, Linear, GitHub) work across both. Configure once in your home dir.",
  },
  {
    title: "Use /review on a feature branch before opening the PR",
    detail:
      "Codex reviews its own diff as a fresh reader · catches naming inconsistencies + missing tests + obvious bugs before a human sees the PR.",
  },
];

const MISTAKES = [
  "Confusing Codex CLI (the agent) with the GitHub Copilot extension (the editor companion) · they're different products.",
  "Running full-auto + danger-full-access in your home directory · containerize first or use workspace-write.",
  "Putting OPENAI_API_KEY in AGENTS.md · it gets sent to the model on every prompt. Use ~/.codex/auth.json or env vars.",
  "Sitting in suggest mode for every task · approve mode should be matched to your confidence + risk tolerance.",
  "Asking gpt-5-mini for hard architectural questions · upgrade to gpt-5-thinking-high for those moments.",
  "Forgetting Codex CAN read images · screenshot the bug instead of describing it.",
  "Letting AGENTS.md grow to 1000+ lines · the per-prompt cost compounds + the model gets lost in your own brief.",
  "Skipping /init in new repos · Codex without project context burns tokens re-discovering what AGENTS.md would have told it.",
];

const RECENT = [
  { date: "2026 H1", what: "gpt-5-codex variant · code-tuned model with better tool-use scoring" },
  { date: "2026 H1", what: "Codex IDE plugin · VS Code + JetBrains · pairs with the CLI for inline edits" },
  { date: "2025 Q4", what: "MCP support · Codex can connect to MCP servers (parity with Claude Code)" },
  { date: "2025 Q4", what: "Three sandbox modes (read-only / workspace-write / danger-full-access) released" },
  { date: "2025 Q3", what: "Codex CLI 1.0 GA · supersedes the original Codex from 2021" },
  { date: "2025 Q3", what: "AGENTS.md convention published · standard for project briefs" },
];

const SOURCES = [
  { label: "Codex CLI · OpenAI docs", url: "https://platform.openai.com/docs/codex" },
  { label: "Codex CLI · GitHub", url: "https://github.com/openai/codex" },
  { label: "AGENTS.md spec", url: "https://agents.md" },
  { label: "Model Context Protocol", url: "https://modelcontextprotocol.io" },
  { label: "OpenAI model overview", url: "https://platform.openai.com/docs/models" },
];

export default function CodexBestPracticesPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#C9A55C]">
          CHEAT SHEET · OPENAI CODEX · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(40px,7vw,80px)] font-light leading-[0.95]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          Codex · CLI + IDE.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          OpenAI&apos;s agentic coding CLI · approval modes · sandbox modes
          · AGENTS.md · model tiers · MCP · web search · vision input.
          Sourced from platform.openai.com.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C9A55C]">
          Last verified · 2026-06-06 · sources at bottom
        </p>
      </header>

      <Section title="§ Keyboard shortcuts">
        <Table rows={SHORTCUTS} headers={["Keys", "What"]} />
      </Section>

      <Section title="§ Slash commands">
        <Table
          rows={SLASH.map((c) => ({ keys: c.cmd, what: c.what }))}
          headers={["Command", "What"]}
          mono="left"
        />
      </Section>

      <Section title="§ Approval modes · three settings">
        <ul className="mt-4 space-y-4">
          {APPROVAL_MODES.map((m) => (
            <li key={m.name} className="border-l-2 border-[#C9A55C]/40 pl-5">
              <p className="text-[18px] font-light text-[#F4F4F2]">{m.name}</p>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {m.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="§ Sandbox modes · three settings">
        <ul className="mt-4 space-y-4">
          {SANDBOX_MODES.map((m) => (
            <li key={m.name} className="border-l-2 border-[#FF4D4D]/40 pl-5">
              <p className="font-mono text-[14px] text-[#22F0D5]">{m.name}</p>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {m.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="§ Config files · AGENTS.md hierarchy">
        <ul className="mt-4 space-y-4">
          {CONFIG_FILES.map((c) => (
            <li key={c.path} className="border-l-2 border-[#C9A55C]/40 pl-5">
              <p className="font-mono text-[12px] text-[#22F0D5]">{c.path}</p>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {c.role}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="§ Models · /model to switch">
        <Table rows={MODELS} headers={["Model", "When to use"]} mono="left" />
      </Section>

      <Section title="§ Optimization tips · ranked">
        <ol className="mt-4 space-y-5 list-decimal pl-6">
          {OPTIMIZATION.map((o) => (
            <li key={o.title} className="text-[15px] leading-[1.6] text-[#9CA3AF]">
              <p className="font-medium text-[#F4F4F2]">{o.title}</p>
              <p className="mt-1">{o.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="§ Common mistakes">
        <ul className="mt-4 space-y-3">
          {MISTAKES.map((m, i) => (
            <li key={i} className="flex gap-3 text-[14px] leading-[1.6] text-[#9CA3AF]">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4D4D]" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="§ Recent changes">
        <Table
          rows={RECENT.map((r) => ({ keys: r.date, what: r.what }))}
          headers={["When", "What"]}
        />
      </Section>

      <Section title="§ Sources">
        <ul className="mt-4 space-y-2">
          {SOURCES.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-[#C9A55C] hover:underline"
              >
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/best-practices/claude"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              ← Claude · Anthropic
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              Claude Desktop + Claude Code cheat sheet.
            </p>
          </Link>
          <Link
            href="/best-practices/antigravity"
            className="block border border-[#1F242B] p-5 transition hover:border-[#FF4D4D]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF4D4D]">
              Next · Antigravity
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              Google Antigravity IDE cheat sheet.
            </p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          /best-practices/codex · Last verified 2026-06-06 · sources above
        </p>
      </footer>
    </main>
  );
}
