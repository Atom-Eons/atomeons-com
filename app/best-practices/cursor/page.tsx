import type { Metadata } from "next";
import Link from "next/link";
import { Section, Table } from "../claude/page";

/**
 * /best-practices/cursor · Cursor IDE cheat sheet.
 * Sourced from cursor.com/docs · last verified 2026-06-06.
 */

export const metadata: Metadata = {
  title: "Cursor Best Practices · Cheat Sheet",
  description:
    "Cursor IDE cheat sheet · Cmd+K inline edit · Cmd+L chat · Cmd+I composer · .cursorrules · @ mentions (file/folder/web/docs/git) · Agent mode · Background Agents · codebase indexing · MCP support · model selection. Sourced from cursor.com · verified 2026-06-06.",
  alternates: { canonical: "https://atomeons.com/best-practices/cursor" },
  openGraph: {
    title: "Cursor IDE Best Practices · Cheat Sheet",
    description:
      "Cursor IDE · the most popular AI IDE · keyboard shortcuts · .cursorrules · agent mode · MCP.",
    url: "https://atomeons.com/best-practices/cursor",
    type: "article",
  },
};

const SHORTCUTS = [
  { keys: "Cmd/Ctrl+K", what: "Inline edit · highlight code or place cursor · describe the change" },
  { keys: "Cmd/Ctrl+L", what: "Open the AI chat sidebar · ask questions about the codebase" },
  { keys: "Cmd/Ctrl+I", what: "Open the Composer · multi-file agent mode" },
  { keys: "Cmd/Ctrl+.", what: "Smart actions · suggest quick fixes inline" },
  { keys: "Cmd/Ctrl+Shift+L", what: "Add current selection to chat as context" },
  { keys: "Cmd/Ctrl+Enter", what: "Accept the AI suggestion / submit chat" },
  { keys: "Cmd/Ctrl+Backspace", what: "Reject the current AI suggestion" },
  { keys: "Cmd/Ctrl+Y", what: "Toggle Auto-mode (Cursor picks the model)" },
  { keys: "Cmd/Ctrl+J", what: "Toggle integrated terminal" },
  { keys: "Cmd/Ctrl+P", what: "File quick-open · also accepts @-mention syntax" },
  { keys: "Cmd/Ctrl+Shift+P", what: "Command palette · all VS Code-style commands" },
  { keys: "Tab", what: "Accept inline completion (Cursor Tab)" },
  { keys: "Esc", what: "Dismiss completion / stop agent run" },
];

const MENTIONS = [
  { keys: "@file", what: "Include a specific file as context · autocomplete by name" },
  { keys: "@folder", what: "Include all files in a directory" },
  { keys: "@code", what: "Include a code symbol (function, class) by name" },
  { keys: "@web", what: "Run a web search · agent fetches + cites" },
  { keys: "@docs", what: "Reference indexed external docs (added in settings)" },
  { keys: "@git", what: "Reference a commit, branch, or PR" },
  { keys: "@codebase", what: "Index-wide retrieval · agent picks relevant files" },
  { keys: "@past chats", what: "Reference an earlier conversation in this project" },
  { keys: "@cursor rules", what: "Reference your .cursorrules content" },
];

const MODES = [
  {
    name: "Tab (inline completion)",
    detail:
      "The default · multi-line completions appear as you type. Tab accepts. Cursor Tab uses a small fast model. Free even on Hobby tier.",
  },
  {
    name: "Cmd+K (inline edit)",
    detail:
      "Select code · describe the change · Cursor rewrites in place. Best for refactors + bug fixes inside a function.",
  },
  {
    name: "Cmd+L (chat)",
    detail:
      "Conversational with codebase access. Best for understanding code, asking questions, exploring tradeoffs.",
  },
  {
    name: "Cmd+I (Composer / Agent)",
    detail:
      "Multi-file agent mode · Cursor plans + edits across files autonomously. The most powerful mode · burns tokens fast · use for substantive changes.",
  },
  {
    name: "Background Agents",
    detail:
      "Spin up an agent that runs in the cloud · keeps working while you do other things. Returns when done. Pro tier feature · long tasks.",
  },
];

const CONFIG_FILES = [
  {
    path: "<project>/.cursorrules",
    role: "Project-level rules · always included as system prompt · keep concise (200-400 lines max). Legacy single-file format.",
  },
  {
    path: "<project>/.cursor/rules/<name>.mdc",
    role: "Modern multi-file rules (2025+) · scope per glob pattern · attach selectively to file types or paths. Replaces .cursorrules for new projects.",
  },
  {
    path: "<project>/.cursor/settings.json",
    role: "Project-local Cursor settings · model defaults, agent allow-lists, indexing options",
  },
  {
    path: "<project>/.cursorignore",
    role: "Files Cursor should never index or include · gitignore syntax",
  },
  {
    path: "~/Library/Application Support/Cursor/User/settings.json",
    role: "Global Cursor settings · user-wide model preferences, keybindings, themes (macOS path · Linux/Windows similar)",
  },
];

const MODELS = [
  { keys: "Auto", what: "Cursor picks per query · cheap models for simple completions, frontier for hard prompts. Default for Hobby + Pro." },
  { keys: "claude-sonnet-4.5", what: "Anthropic's mid-tier · best general agent performance · default Pro recommendation" },
  { keys: "claude-opus-4.7", what: "Anthropic frontier · slowest · highest quality on architecture + planning" },
  { keys: "gpt-5", what: "OpenAI frontier · strong general · best for verbose codegen" },
  { keys: "gpt-5-codex", what: "Code-tuned variant · better tool use + edit application" },
  { keys: "gemini-3-pro", what: "Google frontier · strongest at long-context retrieval (1M+ tokens)" },
  { keys: "cursor-small", what: "Cursor's own tab-completion model · free · runs fast inline" },
];

const OPTIMIZATION = [
  {
    title: "Write a .cursorrules file the first day",
    detail:
      "Should answer: what stack, what conventions, what to never touch, how to run tests, how to deploy. 200 lines tops. Cursor includes this every prompt.",
  },
  {
    title: "Use Cmd+K for in-function edits · Cmd+I for cross-file",
    detail:
      "Match the mode to the scope. Cmd+K is a scalpel · Composer is a workshop. Wrong mode = wasted tokens + worse output.",
  },
  {
    title: "Index your codebase early",
    detail:
      "Settings → Codebase → Index. Lets @codebase + retrieval work. Takes a few minutes once · saves hours.",
  },
  {
    title: "Add external docs via @docs",
    detail:
      "Settings → Features → Docs → Add. Point to a doc URL. Cursor crawls + indexes. Then @docs in any chat. Game-changer for library work.",
  },
  {
    title: "Pin specific files in Composer for big tasks",
    detail:
      "Drag files into the Composer context bar. Cursor weights them higher than codebase-retrieval picks. Use for tasks that span 5+ specific files.",
  },
  {
    title: "Use Auto mode unless you have a specific reason not to",
    detail:
      "Auto routes intelligently · cheap models for cheap tasks. Manually picking Opus for everything is the single biggest cost waster on Cursor.",
  },
  {
    title: "Use Background Agents for the long ones",
    detail:
      "When you'd otherwise stare at Composer for 20 minutes · spin a background agent and go do something else. Pro feature · worth it.",
  },
  {
    title: "Keep .cursorignore tight",
    detail:
      "Big lock files, dist directories, large binary fixtures shouldn't be indexed. Smaller index = faster + more relevant retrieval.",
  },
  {
    title: "Move to .cursor/rules/*.mdc for any project past 200 lines of rules",
    detail:
      "Multi-file rules let you scope by glob. 'auth rules for /app/api/auth/*' · 'styling rules for /app/_components/*.tsx'. Cleaner + the model gets only relevant rules per file.",
  },
  {
    title: "Use Cmd+Shift+L to manually add code to chat context",
    detail:
      "When Cursor's auto-retrieval misses · highlight the relevant section + Cmd+Shift+L. Forces inclusion. Faster than typing @file paths.",
  },
];

const MISTAKES = [
  "Treating Cursor like VS Code with autocomplete · the Composer + @-mention system is the real product.",
  "Massive .cursorrules with every possible convention · the model gets lost · keep it under 400 lines or migrate to scoped rules.",
  "Sitting on a single model · Auto mode + occasional manual override is cheaper than always-frontier.",
  "Committing secrets to .cursorrules · the file ships with the repo · use env vars instead.",
  "Forgetting to index after `git clone` · @codebase returns nothing useful until you re-index.",
  "Using Composer for 1-line tweaks · Cmd+K is faster and cheaper for inline edits.",
  "Disabling Cursor Tab to save tokens · Cursor Tab is a tiny fast model · negligible cost · big productivity loss.",
  "Letting agent context grow unbounded · /Clear or open a fresh Composer pane periodically.",
];

const RECENT = [
  { date: "2026 H1", what: "Background Agents GA · cloud-run agents that keep working after you close the laptop" },
  { date: "2026 H1", what: ".cursor/rules/*.mdc multi-file rules · replace single .cursorrules with scoped glob rules" },
  { date: "2025 Q4", what: "Composer 2.0 · multi-file agent mode with explicit plan + diff approval" },
  { date: "2025 Q4", what: "@docs custom indexing · point at any URL · Cursor crawls + makes it @-mentionable" },
  { date: "2025 Q3", what: "MCP support · Cursor now talks to Model Context Protocol servers" },
];

const SOURCES = [
  { label: "Cursor · official docs", url: "https://docs.cursor.com" },
  { label: "Cursor · changelog", url: "https://www.cursor.com/changelog" },
  { label: "Cursor · pricing + models", url: "https://www.cursor.com/pricing" },
  { label: "Cursor · forum", url: "https://forum.cursor.com" },
];

export default function CursorBestPracticesPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#9D7FFF]">
          CHEAT SHEET · CURSOR IDE · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(40px,7vw,80px)] font-light leading-[0.95]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          Cursor · AI IDE.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          The most-used AI IDE in 2026 · Cmd+K inline edit · Cmd+L chat ·
          Cmd+I Composer agent · @-mentions · .cursorrules · MCP · Background
          Agents · multi-model routing. Sourced from docs.cursor.com.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#9D7FFF]">
          Last verified · 2026-06-06 · sources at bottom
        </p>
      </header>

      <Section title="§ Keyboard shortcuts">
        <Table rows={SHORTCUTS} headers={["Keys", "What"]} />
      </Section>

      <Section title="§ @ mentions · context injection">
        <Table rows={MENTIONS} headers={["Mention", "What it pulls in"]} mono="left" />
      </Section>

      <Section title="§ Five modes · know when to use which">
        <ul className="mt-4 space-y-4">
          {MODES.map((m) => (
            <li key={m.name} className="border-l-2 border-[#9D7FFF]/50 pl-5">
              <p className="text-[18px] font-light text-[#F4F4F2]">{m.name}</p>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {m.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="§ Config files · .cursorrules + .cursor/">
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

      <Section title="§ Models · auto-routed or manual">
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
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#9D7FFF] hover:underline">
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <BackToHub />

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          /best-practices/cursor · Last verified 2026-06-06 · sources above
        </p>
      </footer>
    </main>
  );
}

export function BackToHub() {
  return (
    <section className="mt-20 border-t border-[#1F242B] pt-12">
      <Link
        href="/best-practices"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] hover:underline"
      >
        ← Back to all cheat sheets
      </Link>
    </section>
  );
}
