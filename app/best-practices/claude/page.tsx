import type { Metadata } from "next";
import Link from "next/link";

/**
 * /best-practices/claude · Anthropic ecosystem cheat sheet.
 *
 * Covers both:
 *   - Claude Desktop (Claude.ai app · web + desktop)
 *   - Claude Code (CLI + IDE plugin)
 *
 * Sourced from docs.claude.com · last verified 2026-06-06.
 *
 * — Wave 34 · 2026-06-06
 */

export const metadata: Metadata = {
  title: "Claude Best Practices · Cheat Sheet",
  description:
    "Anthropic Claude cheat sheet · Claude Desktop + Claude Code · MCP servers · Projects · Artifacts · slash commands · keyboard shortcuts · CLAUDE.md · subagents · hooks · skills · settings.json · plan mode · context management. Sourced from docs.claude.com · verified 2026-06-06.",
  alternates: { canonical: "https://atomeons.com/best-practices/claude" },
  openGraph: {
    title: "Claude Best Practices · Cheat Sheet",
    description:
      "Anthropic Claude · keyboard shortcuts · slash commands · hooks · skills · MCP · Projects · Artifacts.",
    url: "https://atomeons.com/best-practices/claude",
    type: "article",
  },
};

const SHORTCUTS_CODE = [
  { keys: "Shift+Tab", what: "Cycle modes · plan → auto-accept → normal" },
  { keys: "Esc", what: "Interrupt the current generation · also exits modes" },
  { keys: "Esc Esc", what: "Rewind to your previous turn · undo Claude's last action" },
  { keys: "Ctrl+R", what: "Toggle transcript mode (show/hide reasoning + tool calls)" },
  { keys: "Ctrl+C", what: "Kill the current command · prompt-level interrupt" },
  { keys: "Ctrl+D", what: "Exit the session · also works mid-prompt to send EOF" },
  { keys: "Up / Down", what: "Cycle through previous prompts in this session" },
  { keys: "Ctrl+L", what: "Clear the terminal screen (does not clear context)" },
  { keys: "/", what: "Open the slash-command palette" },
  { keys: "Tab", what: "Autocomplete file paths in prompt input" },
  { keys: "@", what: "Reference a file with auto-complete (Claude reads it)" },
];

const SLASH_COMMANDS = [
  { cmd: "/help", what: "Help index · all slash commands listed" },
  { cmd: "/init", what: "Initialize a CLAUDE.md for the current repo · scaffolds project memory" },
  { cmd: "/clear", what: "Clear current conversation context · keeps session alive" },
  { cmd: "/compact", what: "Manually compact the conversation · summarizes everything older than this point" },
  { cmd: "/resume", what: "Resume the previous conversation in this directory" },
  { cmd: "/agents", what: "Browse / select / spawn a subagent from .claude/agents/" },
  { cmd: "/mcp", what: "Show MCP server status · list available MCP tools" },
  { cmd: "/context", what: "Print what's in context · tokens used + sources" },
  { cmd: "/memory", what: "Read / edit CLAUDE.md memory hierarchy" },
  { cmd: "/model", what: "Switch model · opus, sonnet, haiku · also tier-specific names" },
  { cmd: "/usage", what: "Show token usage for current session + day + month" },
  { cmd: "/cost", what: "Same as /usage but with $ cost estimates" },
  { cmd: "/export", what: "Export conversation as Markdown" },
  { cmd: "/hooks", what: "List / edit hooks · the lifecycle event handlers" },
  { cmd: "/permissions", what: "View / change tool permissions for this session" },
  { cmd: "/pr_comments", what: "Pull GitHub PR comments into context" },
  { cmd: "/add-dir", what: "Add a directory to Claude's allowed-access list" },
  { cmd: "/status", what: "Show session status · branch, dirty files, recent commits" },
];

const CONFIG_FILES = [
  {
    path: "~/.claude/CLAUDE.md",
    role: "Global user memory · read on every session across every project · keep this lean",
  },
  {
    path: "<project>/CLAUDE.md",
    role: "Project-specific memory · committed to repo · all collaborators see it · the standing brief for Claude on this codebase",
  },
  {
    path: "<project>/.claude/CLAUDE.md",
    role: "Local non-committed Claude notes · adds context without polluting the repo",
  },
  {
    path: "<project>/.claude/agents/<name>.md",
    role: "Custom subagent · YAML frontmatter (name, description, tools) + system prompt body",
  },
  {
    path: "<project>/.claude/skills/<slug>/SKILL.md",
    role: "Custom skill · YAML frontmatter + procedure body · invoked by /skill or trigger phrases",
  },
  {
    path: "<project>/.claude/commands/<name>.md",
    role: "Custom slash command · arguments via {ARG}, {ARG_N}, $ARGUMENTS",
  },
  {
    path: "<project>/.claude/settings.json",
    role: "Project settings · model, MCP servers, hooks, permissions, status line",
  },
  {
    path: "~/.claude/settings.json",
    role: "Global settings · default model, default permissions, MCP servers always available",
  },
  {
    path: "<project>/.mcp.json",
    role: "MCP server registry · the servers Claude can connect to in this project",
  },
];

const HOOKS = [
  { event: "PreToolUse", when: "Before any tool runs · can block the tool call or modify arguments" },
  { event: "PostToolUse", when: "After a tool runs · can post-process the result before Claude sees it" },
  { event: "UserPromptSubmit", when: "When user submits a prompt · can inject extra context" },
  { event: "Notification", when: "When Claude requests user attention · pipe to native notify" },
  { event: "Stop", when: "When Claude returns control to user · cleanup, save state" },
  { event: "SubagentStop", when: "When a subagent finishes · capture result" },
  { event: "PreCompact", when: "Before context is compacted · last-chance to extract key info" },
  { event: "SessionStart", when: "Session opens · auto-load project state, run health checks" },
  { event: "SessionEnd", when: "Session closes · auto-commit, send summary, etc" },
];

const MODES = [
  { name: "Normal mode", how: "Default · Claude asks before running tools" },
  { name: "Auto-accept mode", how: "Shift+Tab once · Claude runs read-only + edit tools without confirming" },
  { name: "Plan mode", how: "Shift+Tab twice · Claude writes a plan first · presents for approval before executing" },
];

const DESKTOP_FEATURES = [
  {
    name: "Projects",
    detail:
      "Persistent custom instructions + knowledge files (200K tokens) per project. Pin your team's brand guide, your codebase shape, your operating brief. Free + Pro accounts.",
  },
  {
    name: "Artifacts",
    detail:
      "Claude renders HTML / SVG / Mermaid / React / Markdown / CSV / docs in a side panel · you can iterate without copy-paste. Toggle via the artifact icon below the message.",
  },
  {
    name: "MCP connectors",
    detail:
      "Connect Claude.ai directly to Notion, Linear, Slack, Google Drive, Asana, GitHub, more. Read + write access scoped per connector. Pro tier required for most.",
  },
  {
    name: "Computer Use (Beta)",
    detail:
      "Claude controls a virtual desktop · clicks, types, opens browser. Use via API or limited Claude Desktop preview. Expensive · slow · genuinely agentic.",
  },
  {
    name: "Files (upload)",
    detail:
      "Up to 20 files per chat · 30MB each · PDF, DOCX, code, images, audio (Sonnet 4.5+). Claude reads them inline as context.",
  },
  {
    name: "Voice mode (mobile)",
    detail:
      "Speak to Claude · audio out via TTS. iOS + Android apps · Pro tier for unlimited.",
  },
  {
    name: "Citations",
    detail:
      "When Claude pulls from uploaded files or Projects knowledge, hover a sentence to see the exact source span. Reduces hallucination significantly.",
  },
  {
    name: "Custom Styles",
    detail:
      "Pre-prompt Claude into a persistent voice (Formal · Concise · Explanatory · or custom). Stored per account.",
  },
];

const OPTIMIZATION = [
  {
    title: "Start every project with /init",
    detail:
      "Generates a tailored CLAUDE.md from your repo structure. Then edit it to add your team's standing brief. Saves ~30% on every future prompt because Claude doesn't have to re-discover.",
  },
  {
    title: "Use plan mode for any change spanning more than 2 files",
    detail:
      "Shift+Tab twice. Claude writes the plan, you approve, then it executes. Catches scope errors before code is written.",
  },
  {
    title: "Pin frequently-referenced files with @",
    detail:
      "Typing @path/to/file in a prompt auto-includes that file. Cleaner than 'please read X' and Claude can compact other context.",
  },
  {
    title: "Run /compact before context hits 70%",
    detail:
      "Don't wait for the auto-compact at the limit. Manual /compact at 70% gives you a clean summary while you still know what's important.",
  },
  {
    title: "Write subagents for repeated patterns",
    detail:
      "If you keep asking Claude to 'review this PR like a security engineer' or 'find every TODO,' make it a subagent. .claude/agents/security-reviewer.md. Then /agents to spawn it.",
  },
  {
    title: "Use hooks to enforce your team's policy",
    detail:
      "PreToolUse hook can block git push to main, require tests before commit, enforce file-path scope. The hook fires before Claude can act.",
  },
  {
    title: "Switch to Haiku for grunt work",
    detail:
      "/model haiku for high-volume small tasks (renaming files, regex transforms, simple lookups). 60% cheaper, 5x faster, 0% quality drop for those tasks.",
  },
  {
    title: "Use /export to save the canonical session as Markdown",
    detail:
      "Every meaningful session should produce a receipts artifact. Export then commit it under /docs/sessions/ or whatever your team uses.",
  },
  {
    title: "MCP servers > custom integrations",
    detail:
      "If Notion or Linear has an MCP server, use that instead of writing your own API wrapper. Update once, every tool benefits.",
  },
  {
    title: "Keep CLAUDE.md under 500 lines",
    detail:
      "The whole file is included on every prompt. Long CLAUDE.md = slower + more expensive. Move detailed protocols to .claude/skills/ or .claude/agents/.",
  },
];

const COMMON_MISTAKES = [
  "Confusing Claude Desktop (chat) with Claude Code (CLI) · they share a model but have different feature sets.",
  "Putting secrets in CLAUDE.md · it gets committed. Use .env + .gitignore.",
  "Using /clear when you meant /compact · /clear loses everything · /compact preserves the summary.",
  "Trusting the auto-compact to choose what's important · always do manual /compact at logical breakpoints.",
  "Forgetting Shift+Tab cycles · users sit in Normal mode and confirm every action when plan mode would have saved 20 turns.",
  "Writing prose-style hooks · hooks are scripts · they read stdin, write stdout, return exit codes. Treat them like git hooks.",
  "Buying Pro for one project · Projects in Pro/Max scale way past one. Most operators underuse Projects.",
  "Pasting screenshots into Claude.ai for OCR · upload as Files · Files use Claude's vision properly and produce better extractions.",
];

const RECENT = [
  { date: "2026 H1", what: "Computer Use moved from beta to GA for Pro · still desktop-only · MCP-connected" },
  { date: "2026 H1", what: "Claude Code added @-mention file autocomplete inline in prompt input" },
  { date: "2026 H1", what: "Skills (`.claude/skills/`) added as third primitive alongside agents + commands" },
  { date: "2025 Q4", what: "Subagents (`.claude/agents/`) released · YAML frontmatter + system prompt" },
  { date: "2025 Q4", what: "MCP officially shipped · third-party connectors for Notion, Linear, Slack, Asana" },
  { date: "2025 Q3", what: "Plan mode + auto-accept mode added via Shift+Tab cycle" },
  { date: "2025 Q3", what: "Settings.json hierarchy (project + user + system) standardized" },
];

const SOURCES = [
  { label: "Claude Code · official docs", url: "https://docs.claude.com/en/docs/claude-code/overview" },
  { label: "Claude Code · settings reference", url: "https://docs.claude.com/en/docs/claude-code/settings" },
  { label: "Claude Code · hooks", url: "https://docs.claude.com/en/docs/claude-code/hooks" },
  { label: "Claude Code · sub-agents", url: "https://docs.claude.com/en/docs/claude-code/sub-agents" },
  { label: "Claude Code · slash commands", url: "https://docs.claude.com/en/docs/claude-code/slash-commands" },
  { label: "Model Context Protocol", url: "https://modelcontextprotocol.io" },
  { label: "Claude.ai Projects", url: "https://www.anthropic.com/news/projects" },
  { label: "Claude Desktop · Anthropic", url: "https://claude.ai/download" },
];

export default function ClaudeBestPracticesPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          CHEAT SHEET · ANTHROPIC CLAUDE · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(40px,7vw,80px)] font-light leading-[0.95]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          Claude · Desktop + Code.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          The Anthropic engineering stack · the chat app + the CLI. Keyboard
          shortcuts · slash commands · CLAUDE.md hierarchy · subagents ·
          hooks · skills · MCP. Dense like a reference card · sourced from
          docs.claude.com.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]">
          Last verified · 2026-06-06 · sources at bottom · open the docs for canonical answer
        </p>
      </header>

      <Section title="§ Keyboard shortcuts · Claude Code">
        <Table rows={SHORTCUTS_CODE} headers={["Keys", "What"]} />
      </Section>

      <Section title="§ Three modes · Shift+Tab cycles">
        <ul className="mt-4 space-y-3">
          {MODES.map((m) => (
            <li key={m.name} className="border-l-2 border-[#22F0D5]/40 pl-5">
              <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#F4F4F2]">
                {m.name}
              </p>
              <p className="mt-1 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {m.how}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="§ Slash commands · Claude Code">
        <Table
          rows={SLASH_COMMANDS.map((c) => ({ keys: c.cmd, what: c.what }))}
          headers={["Command", "What"]}
          mono="left"
        />
      </Section>

      <Section title="§ Config files · CLAUDE.md hierarchy + .claude/">
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

      <Section title="§ Hooks · the 9 lifecycle events">
        <Table
          rows={HOOKS.map((h) => ({ keys: h.event, what: h.when }))}
          headers={["Event", "When it fires"]}
          mono="left"
        />
      </Section>

      <Section title="§ Claude Desktop features worth knowing">
        <ul className="mt-4 space-y-4">
          {DESKTOP_FEATURES.map((f) => (
            <li key={f.name} className="border-l-2 border-[#22F0D5]/40 pl-5">
              <p className="text-[18px] font-light text-[#F4F4F2]">{f.name}</p>
              <p className="mt-1 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {f.detail}
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
          {COMMON_MISTAKES.map((m, i) => (
            <li key={i} className="flex gap-3 text-[14px] leading-[1.6] text-[#9CA3AF]">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4D4D]" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="§ Recent changes · what shipped lately">
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
                className="text-[14px] text-[#22F0D5] hover:underline"
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
            href="/best-practices/codex"
            className="block border border-[#1F242B] p-5 transition hover:border-[#C9A55C]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#C9A55C]">
              Next · Codex
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              The OpenAI Codex CLI cheat sheet.
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
          /best-practices/claude · Last verified 2026-06-06 · sources above
        </p>
      </footer>
    </main>
  );
}

// =============================================================================
// Shared rendering helpers
// =============================================================================

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Table({
  rows,
  headers,
  mono,
}: {
  rows: { keys: string; what: string }[];
  headers: [string, string];
  mono?: "left" | "right" | "both";
}) {
  return (
    <table className="mt-4 w-full border-collapse text-[14px]">
      <thead>
        <tr className="border-b border-[#1F242B] text-left">
          <th className="py-2 pr-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">
            {headers[0]}
          </th>
          <th className="py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">
            {headers[1]}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-[#0F1114]">
            <td
              className={`py-3 pr-6 align-top ${
                mono === "left" || mono === "both" || mono === undefined
                  ? "font-mono text-[#22F0D5]"
                  : ""
              }`}
            >
              {r.keys}
            </td>
            <td
              className={`py-3 align-top leading-[1.55] text-[#F4F4F2] ${
                mono === "right" || mono === "both" ? "font-mono" : ""
              }`}
            >
              {r.what}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
