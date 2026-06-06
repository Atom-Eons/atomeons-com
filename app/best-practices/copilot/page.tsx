import type { Metadata } from "next";
import { Section, Table } from "../claude/page";
import { BackToHub } from "../cursor/page";

export const metadata: Metadata = {
  title: "GitHub Copilot Best Practices · Cheat Sheet",
  description:
    "GitHub Copilot cheat sheet · inline suggestions · Copilot Chat · @workspace @terminal @vscode · /fix /explain /tests · Copilot Spaces · Copilot Workspace · custom instructions · model picker (GPT-5 · Claude Sonnet 4.5 · o4-mini). Sourced from docs.github.com/copilot · verified 2026-06-06.",
  alternates: { canonical: "https://atomeons.com/best-practices/copilot" },
  openGraph: {
    title: "GitHub Copilot Best Practices · Cheat Sheet",
    description:
      "Copilot Chat · Workspace · Spaces · @ mentions · slash commands · model picker.",
    url: "https://atomeons.com/best-practices/copilot",
    type: "article",
  },
};

const SHORTCUTS = [
  { keys: "Tab", what: "Accept inline suggestion (whole completion)" },
  { keys: "Cmd/Ctrl+→", what: "Accept next word of inline suggestion" },
  { keys: "Esc", what: "Dismiss inline suggestion" },
  { keys: "Alt+]", what: "Cycle to next inline suggestion" },
  { keys: "Alt+[", what: "Cycle to previous inline suggestion" },
  { keys: "Cmd/Ctrl+I", what: "Inline Chat · edit at cursor or selection" },
  { keys: "Cmd/Ctrl+Shift+I", what: "Open Copilot Chat side panel" },
  { keys: "Cmd/Ctrl+Shift+P → 'Copilot:'", what: "All Copilot commands via command palette" },
  { keys: "Cmd/Ctrl+Enter", what: "Open Copilot suggestions panel (multiple alternatives)" },
];

const MENTIONS = [
  { keys: "@workspace", what: "Reference your whole VS Code workspace · Copilot retrieves relevant files" },
  { keys: "@terminal", what: "Reference the active terminal output · ask Copilot to fix the error" },
  { keys: "@vscode", what: "Ask about VS Code itself · settings, extensions, commands" },
  { keys: "@github", what: "Reference issues, PRs, discussions from the linked GitHub repo" },
  { keys: "#file", what: "Pin a specific file as context (lowercase #, not @)" },
  { keys: "#selection", what: "Reference current editor selection" },
  { keys: "#editor", what: "Reference the full current open file" },
];

const SLASH = [
  { keys: "/explain", what: "Explain the selected code · best for understanding unfamiliar code" },
  { keys: "/fix", what: "Fix the bug in the selected code · uses recent errors as signal" },
  { keys: "/tests", what: "Generate tests for the selected function or file" },
  { keys: "/doc", what: "Generate documentation comments" },
  { keys: "/new", what: "Create a new file or project skeleton" },
  { keys: "/optimize", what: "Improve performance of the selected code" },
  { keys: "/clear", what: "Clear the chat history (still in the workspace context)" },
  { keys: "/help", what: "Show all Copilot Chat commands" },
];

const SURFACES = [
  {
    name: "Inline Suggestions (Tab)",
    detail:
      "The original Copilot · ghost text as you type · Tab to accept. Uses a fast small model. Works in 100+ editors including VS Code, JetBrains, Neovim, Visual Studio, Xcode.",
  },
  {
    name: "Copilot Chat",
    detail:
      "Side-panel + inline chat · uses GPT-5 or Claude Sonnet 4.5 (you pick) · scoped to your workspace. The everyday Q&A surface.",
  },
  {
    name: "Copilot Edits",
    detail:
      "Multi-file iterative edits with diff approval · the agent-lite surface. Cmd+Shift+I → Edits tab. Best for refactors spanning 2-10 files.",
  },
  {
    name: "Copilot Workspace",
    detail:
      "The agentic IDE · ships a full task plan + executes · runs from a GitHub Issue or a 'New Task' prompt. The most autonomous Copilot surface.",
  },
  {
    name: "Copilot Spaces",
    detail:
      "Persistent workspaces with pinned context · share with team. Replaces 'reference docs every time' with 'space remembers'. GitHub.com surface, not just IDE.",
  },
  {
    name: "Copilot CLI (gh copilot)",
    detail:
      "Terminal Copilot · `gh copilot suggest` · `gh copilot explain`. Pairs with the GitHub CLI · ships with `gh extension install github/gh-copilot`.",
  },
];

const CONFIG = [
  {
    path: "<project>/.github/copilot-instructions.md",
    role: "Repo-level custom instructions · committed to repo · always-on for everyone using Copilot Chat in this repo",
  },
  {
    path: "<project>/.github/instructions/<glob>.instructions.md",
    role: "Scoped custom instructions · attached when files matching the glob are touched (2025+ feature)",
  },
  {
    path: "<project>/.github/prompts/<name>.prompt.md",
    role: "Reusable prompt templates · invoke via /prompt or the chat command palette",
  },
  {
    path: "<user>/settings.json (VS Code)",
    role: "Personal Copilot settings · model picker, telemetry, suggestion behavior · 'github.copilot.*' keys",
  },
];

const MODELS = [
  { keys: "GPT-5", what: "Default frontier · best balance for everyday Copilot Chat work" },
  { keys: "GPT-5 mini", what: "Fast cheap · default for inline completions · explicit pick for chat saves cost on simple Q&A" },
  { keys: "Claude Sonnet 4.5", what: "Anthropic mid-tier · often preferred for code review + careful refactors" },
  { keys: "Claude Opus 4.7", what: "Highest quality on architecture + hardest debugging · slowest · Premium tier" },
  { keys: "o4-mini", what: "OpenAI reasoning-tuned small · cheap deep thinking · use for tricky logic problems" },
  { keys: "Gemini 2.5 Pro", what: "Google frontier · long context · use for sprawling codebases (1M+ tokens)" },
];

const OPTIMIZATION = [
  {
    title: "Write a .github/copilot-instructions.md the first day of any repo",
    detail:
      "Stack, conventions, what to never touch, test command, deploy command. 100-200 lines max. Every Copilot Chat session in this repo gets this for free.",
  },
  {
    title: "Use @workspace heavily · it's the killer feature",
    detail:
      "Without @workspace, Copilot only sees what you have open. With @workspace, it retrieves across the full repo. For any 'how does X work in this codebase' query.",
  },
  {
    title: "Match model to task",
    detail:
      "GPT-5 for default · Sonnet 4.5 for careful code review · Opus 4.7 for architecture · GPT-5 mini for grunt. Wrong model = bad output OR wasted cost.",
  },
  {
    title: "Use /explain on unfamiliar code before /fix",
    detail:
      "Asking /fix on code you don't understand often produces 'works locally · breaks invariants.' Read /explain first · then fix knowing what matters.",
  },
  {
    title: "Use Copilot Workspace for issue → PR loops",
    detail:
      "Open a GitHub issue · click 'Create with Copilot Workspace' · it plans + writes the PR. Best when the issue has a clear repro + acceptance criteria.",
  },
  {
    title: "Pin files into chat with #file: rather than retyping context",
    detail:
      "Three taps cheaper + more reliable than describing the file. #file:src/api/auth.ts beats 'the file where we handle auth.'",
  },
  {
    title: "Use Copilot Spaces for cross-repo + cross-doc context",
    detail:
      "Working across 3 repos + 2 internal docs? Make a Space, pin everything, share with team. Replaces the 'reset every conversation' tax.",
  },
  {
    title: "Use /tests on every new function before committing",
    detail:
      "Copilot generates passable tests in seconds. Even imperfect coverage > zero coverage. Reviewer time goes to logic, not 'where are the tests.'",
  },
  {
    title: "Custom prompts for repeated workflows",
    detail:
      ".github/prompts/release-notes.prompt.md once · then /prompt release-notes whenever you ship. Repeatable + version-controlled.",
  },
  {
    title: "Pair gh copilot suggest with your shell",
    detail:
      "gh copilot suggest 'one-liner to grep for TODO in all TS files'. Faster than Stack Overflow · works in any terminal.",
  },
];

const MISTAKES = [
  "Disabling inline Tab to 'save tokens' · inline uses a tiny model · negligible cost · big productivity loss.",
  "Asking Copilot Chat questions without @workspace · it can only see your open tabs · retrieval works only with the mention.",
  "Using GPT-5 for everything · GPT-5 mini handles 70% of chat needs at fraction of the cost.",
  "Forgetting Copilot Workspace exists · it's the agentic surface that turns issues into PRs without you typing the code.",
  "Letting copilot-instructions.md grow unbounded · keep it focused · move detailed protocols to scoped instructions/*.instructions.md.",
  "Confusing Copilot Spaces (persistent context on github.com) with Copilot Workspace (the agentic IDE) · different products.",
  "Not using #file: to pin specific files · the cleanest way to force exact context inclusion.",
  "Skipping /tests because 'I'll write them myself' · Copilot's first draft is your starting point · refine from there.",
];

const RECENT = [
  { date: "2026 H1", what: "Model picker GA · choose GPT-5 / Claude 4.5 Sonnet / Opus / Gemini 2.5 Pro / o4-mini per session" },
  { date: "2026 H1", what: "Copilot Spaces · persistent shared context surfaces on github.com" },
  { date: "2026 H1", what: ".github/instructions/<glob>.instructions.md · scoped custom instructions" },
  { date: "2025 Q4", what: "Copilot Workspace GA · issue-to-PR agentic loop" },
  { date: "2025 Q4", what: "Copilot Edits · multi-file iterative edits with diff approval" },
];

const SOURCES = [
  { label: "GitHub Copilot · docs", url: "https://docs.github.com/copilot" },
  { label: "Copilot Workspace · docs", url: "https://docs.github.com/en/copilot/copilot-workspace" },
  { label: "Copilot Chat cookbook", url: "https://docs.github.com/en/copilot/copilot-chat-cookbook" },
  { label: "Custom instructions guide", url: "https://docs.github.com/en/copilot/customizing-copilot" },
  { label: "GitHub blog · Copilot category", url: "https://github.blog/category/ai-ml/" },
];

export default function CopilotBestPracticesPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#3FB950]">
          CHEAT SHEET · GITHUB COPILOT · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(40px,7vw,80px)] font-light leading-[0.95]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          GitHub Copilot.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          The largest-deployed AI coding tool · inline Tab · Copilot Chat ·
          Copilot Edits · Copilot Workspace · Copilot Spaces · gh copilot
          CLI. Multi-model picker (GPT-5 · Claude 4.5 · Gemini · o4-mini).
          Sourced from docs.github.com.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#3FB950]">
          Last verified · 2026-06-06 · sources at bottom
        </p>
      </header>

      <Section title="§ Keyboard shortcuts (VS Code defaults)">
        <Table rows={SHORTCUTS} headers={["Keys", "What"]} />
      </Section>

      <Section title="§ @ and # mentions · context injection">
        <Table rows={MENTIONS} headers={["Mention", "What it pulls in"]} mono="left" />
      </Section>

      <Section title="§ Slash commands · Copilot Chat">
        <Table rows={SLASH} headers={["Command", "What"]} mono="left" />
      </Section>

      <Section title="§ Six surfaces · know which you're using">
        <ul className="mt-4 space-y-4">
          {SURFACES.map((s) => (
            <li key={s.name} className="border-l-2 border-[#3FB950]/50 pl-5">
              <p className="text-[18px] font-light text-[#F4F4F2]">{s.name}</p>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {s.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="§ Config files">
        <ul className="mt-4 space-y-4">
          {CONFIG.map((c) => (
            <li key={c.path} className="border-l-2 border-[#C9A55C]/40 pl-5">
              <p className="font-mono text-[12px] text-[#22F0D5]">{c.path}</p>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {c.role}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="§ Model picker">
        <Table rows={MODELS} headers={["Model", "When"]} mono="left" />
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
        <Table rows={RECENT.map((r) => ({ keys: r.date, what: r.what }))} headers={["When", "What"]} />
      </Section>

      <Section title="§ Sources">
        <ul className="mt-4 space-y-2">
          {SOURCES.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#3FB950] hover:underline">
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <BackToHub />

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          /best-practices/copilot · Last verified 2026-06-06 · sources above
        </p>
      </footer>
    </main>
  );
}
