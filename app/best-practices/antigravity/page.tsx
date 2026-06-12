import type { Metadata } from "next";
import Link from "next/link";
import { Section, Table } from "../claude/page";

/**
 * /best-practices/antigravity · Google Antigravity cheat sheet.
 * Sourced from antigravity.google · last verified 2026-06-06.
 */

export const metadata: Metadata = {
  title: "Antigravity Best Practices · Cheat Sheet",
  description:
    "Google Antigravity IDE cheat sheet · plans · tasks · artifacts · parallel agent windows · built-in browser automation · Gemini 3 model selection · workflows · memory · drift correction. Sourced from antigravity.google · verified 2026-06-06.",
  alternates: {
    canonical: "https://atomeons.com/best-practices/antigravity",
  },
  openGraph: {
    title: "Antigravity Best Practices · Cheat Sheet",
    description:
      "Google's agent IDE · plans · artifacts · parallel agents · built-in browser · Gemini 3.",
    url: "https://atomeons.com/best-practices/antigravity",
    type: "article",
  },
};

const SHORTCUTS = [
  { keys: "Cmd/Ctrl+K", what: "Open the agent command palette · type a goal · agent picks tools" },
  { keys: "Cmd/Ctrl+L", what: "Open / focus the inline chat with the active agent" },
  { keys: "Cmd/Ctrl+I", what: "Inline edit · highlight code + describe the change" },
  { keys: "Cmd/Ctrl+Shift+P", what: "Editor command palette (VS Code-style)" },
  { keys: "Cmd/Ctrl+`", what: "Toggle integrated terminal" },
  { keys: "Cmd/Ctrl+Enter", what: "Run / accept the current agent plan" },
  { keys: "Esc", what: "Stop the currently running agent task" },
  { keys: "Cmd/Ctrl+P", what: "File quick-open by name" },
  { keys: "Cmd/Ctrl+J", what: "Toggle the agent panel (right side)" },
];

const CORE_PRIMITIVES = [
  {
    name: "Plan",
    detail:
      "The agent's structured intent · steps, tools, expected artifacts. You can edit the plan before approving execution. Plans persist across the session for reuse.",
  },
  {
    name: "Task",
    detail:
      "A single step inside a plan. Agent runs tasks in sequence (or parallel where they don't conflict). Each task has clear inputs, expected output, success criteria.",
  },
  {
    name: "Artifact",
    detail:
      "The output of a task. Files, screenshots, browser state, command output, image, video. Artifacts are versioned + addressable + replayable.",
  },
  {
    name: "Workspace",
    detail:
      "A project directory + browser context + memory. Multiple workspaces can run in parallel · each with its own agent instance.",
  },
  {
    name: "Memory",
    detail:
      "Cross-session knowledge per workspace. The agent remembers your stack, your conventions, your prior decisions. Edit via the Memory panel.",
  },
];

const AGENTS = [
  {
    name: "Lead agent",
    role: "The orchestrator · breaks goals into plans · routes tasks to specialist agents · synthesizes results",
  },
  {
    name: "Code agent",
    role: "Reads + writes source · runs tests · works in your project directory",
  },
  {
    name: "Browser agent",
    role: "Drives a headless / visible Chrome · clicks, types, screenshots · for web research, scraping, UI testing",
  },
  {
    name: "Terminal agent",
    role: "Runs commands · captures output · iterates on shell-driven workflows",
  },
  {
    name: "Reviewer agent",
    role: "Adversarially reviews a plan or diff · used as a check before execution",
  },
];

const MODELS = [
  { keys: "Gemini 3 Pro", what: "Default frontier · best general reasoning + multimodal input · highest cost" },
  { keys: "Gemini 3 Flash", what: "Faster + cheaper · 70% the capability at 25% the cost · good for high-volume agent loops" },
  { keys: "Gemini 3 Thinking", what: "Deeper reasoning · slower · for architecture + hard debugging" },
  { keys: "Gemini 2.5 (legacy)", what: "Older default · still available for compatibility · check current pricing" },
];

const CONFIG = [
  {
    path: "<workspace>/.antigravity/agent.md",
    role: "Workspace-level standing brief · always-in-context · the AGENTS.md equivalent for Antigravity",
  },
  {
    path: "<workspace>/.antigravity/memory.json",
    role: "Persisted memory · don't hand-edit unless you know what you're doing · use the Memory panel UI",
  },
  {
    path: "<workspace>/.antigravity/workflows/<name>.yaml",
    role: "Reusable workflow · plan template that takes parameters · invoke from command palette",
  },
  {
    path: "~/.antigravity/config.json",
    role: "Global Antigravity settings · default model, default approval, API keys, browser preferences",
  },
];

const OPTIMIZATION = [
  {
    title: "Write good Plan prompts · 'goal, constraints, expected artifact'",
    detail:
      "Vague: 'Add a sign-in page.' Better: 'Add /sign-in with email-OTP via Supabase Auth, mobile-first design matching /pricing styling, full Playwright e2e coverage, push to a new branch.' The agent makes a much better plan.",
  },
  {
    title: "Use the parallel agent windows for genuinely independent work",
    detail:
      "Plan A in window 1 (refactor auth) · Plan B in window 2 (write the migration script) · Plan C in window 3 (update docs). Three agents working at once. Each in its own workspace context.",
  },
  {
    title: "Approve the plan, then walk away",
    detail:
      "Antigravity is designed for human-as-supervisor. Approve a 30-minute plan · go run errands · come back to artifacts. Stop micromanaging individual tasks.",
  },
  {
    title: "Use the Browser agent for any 'go look this up' work",
    detail:
      "Stack Overflow lookups, doc searches, competitor research, scraping a public dashboard. The browser agent does it faster and cites sources better than the code agent guessing.",
  },
  {
    title: "Save reusable plans as Workflows",
    detail:
      "If you find yourself typing the same plan three times (e.g. 'open a PR template + add changelog entry + run tests'), save it as a workflow. Then invoke by name.",
  },
  {
    title: "Match model tier to task tier",
    detail:
      "Gemini 3 Flash for grunt work · Gemini 3 Pro for default · Gemini 3 Thinking for architecture. Don't waste tokens on Pro for renaming files.",
  },
  {
    title: "Use the Reviewer agent on any plan that touches > 5 files",
    detail:
      "Adversarial second look before the code agent runs. Catches scope errors + missing tests + obvious omissions.",
  },
  {
    title: "Keep memory.json focused · prune it monthly",
    detail:
      "Memory grows. Old facts become wrong. Open the Memory panel periodically and delete stale entries · keep what's still true.",
  },
  {
    title: "Use drift detection · let the agent self-correct",
    detail:
      "When a long agent run drifts from the plan, Antigravity flags it and offers correction. Trust it · usually means the plan was wrong + the agent noticed.",
  },
];

const MISTAKES = [
  "Treating Antigravity as a smarter VS Code · it's an agent IDE · don't sit and watch every keystroke · approve plans and walk away.",
  "Running multiple agents on the same files simultaneously · race conditions on edits · use parallel workspaces, not parallel agents in one workspace.",
  "Skipping the Plan review · the plan is your contract with the agent. Read it. Edit it. Approve it.",
  "Letting memory grow without curation · Antigravity remembers everything · including stale wrong things. Prune monthly.",
  "Using Gemini 3 Pro for everything · the cost compounds fast · Flash handles 70% of tasks for 25% the price.",
  "Asking the code agent to do browser research · use the browser agent · it's literally for that.",
  "Disabling drift correction · drift detection often catches the moment you wrote a wrong constraint · don't silence it.",
  "Hand-editing memory.json or workflow YAML · use the UI panels · raw edits can desync the agent's index.",
];

const RECENT = [
  { date: "2025 Nov", what: "Antigravity 1.0 launch · agent-based IDE · Gemini 3 powered · public preview" },
  { date: "2026 H1", what: "Parallel agent windows GA · run independent plans simultaneously" },
  { date: "2026 H1", what: "Workflows YAML spec · reusable plan templates with parameters" },
  { date: "2026 H1", what: "Drift correction · agent flags + offers fixes when execution diverges from plan" },
  { date: "2026 H1", what: "Browser agent · headless + visible Chrome control · screenshots become artifacts" },
];

const SOURCES = [
  { label: "Antigravity · official site", url: "https://antigravity.google" },
  { label: "Antigravity · docs", url: "https://antigravity.google/docs" },
  { label: "Google AI Studio · Gemini docs", url: "https://ai.google.dev/gemini-api/docs" },
  { label: "Gemini model pricing", url: "https://ai.google.dev/pricing" },
];

export default function AntigravityBestPracticesPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF4D4D]">
          CHEAT SHEET · GOOGLE ANTIGRAVITY · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(40px,7vw,80px)] font-light leading-[0.95]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          Antigravity · agent IDE.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          Google&apos;s November-2025 agent-based IDE · plans · tasks ·
          artifacts · parallel agent windows · built-in browser automation
          · Gemini 3. The first IDE designed for human-as-supervisor not
          human-as-typist.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#FF4D4D]">
          Last verified · 2026-06-06 · this product is the newest of the three · update cadence weekly
        </p>
      </header>

      <Section title="§ Keyboard shortcuts">
        <Table rows={SHORTCUTS} headers={["Keys", "What"]} />
      </Section>

      <Section title="§ Five core primitives">
        <ul className="mt-4 space-y-4">
          {CORE_PRIMITIVES.map((p) => (
            <li key={p.name} className="border-l-2 border-[#FF4D4D]/40 pl-5">
              <p className="text-[18px] font-light text-[#F4F4F2]">{p.name}</p>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {p.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="§ Built-in agents · five roles">
        <Table
          rows={AGENTS.map((a) => ({ keys: a.name, what: a.role }))}
          headers={["Agent", "Role"]}
          mono="left"
        />
      </Section>

      <Section title="§ Models">
        <Table rows={MODELS} headers={["Model", "When to use"]} mono="left" />
      </Section>

      <Section title="§ Config + workspace files">
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
                className="text-[14px] text-[#FF4D4D] hover:underline"
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
            href="/best-practices/codex"
            className="block border border-[#1F242B] p-5 transition hover:border-[#C9A55C]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#C9A55C]">
              ← Codex · OpenAI
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              OpenAI Codex CLI cheat sheet.
            </p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          /best-practices/antigravity · Last verified 2026-06-06 · sources above
        </p>
      </footer>
    </main>
  );
}
