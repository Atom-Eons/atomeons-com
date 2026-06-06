import type { Metadata } from "next";
import { Section, Table } from "../claude/page";
import { BackToHub } from "../cursor/page";

export const metadata: Metadata = {
  title: "Aider Best Practices · Cheat Sheet",
  description:
    "Aider CLI cheat sheet · the OG open-source pair-programmer · /add /drop /commit /diff /undo · architect mode · voice input · git integration · web scraping · model selection · CONVENTIONS.md · .aider.conf.yml. Sourced from aider.chat · verified 2026-06-06.",
  alternates: { canonical: "https://atomeons.com/best-practices/aider" },
  openGraph: {
    title: "Aider CLI Best Practices · Cheat Sheet",
    description:
      "The open-source AI pair programmer · git-native · BYO key · model agnostic.",
    url: "https://atomeons.com/best-practices/aider",
    type: "article",
  },
};

const SHORTCUTS = [
  { keys: "Ctrl+C", what: "Cancel current request (Ctrl+C twice to exit Aider)" },
  { keys: "Ctrl+D", what: "Exit Aider session" },
  { keys: "Ctrl+R", what: "Search through command history" },
  { keys: "Tab", what: "File name autocomplete after /add or /drop" },
  { keys: "Enter twice", what: "Multi-line submission mode · paste blocks then Enter twice" },
  { keys: "Up / Down arrows", what: "Cycle through prompt history" },
];

const SLASH = [
  { keys: "/add <file>", what: "Add a file (or glob) to Aider's editable context" },
  { keys: "/drop <file>", what: "Remove a file from editable context · keep it readable but not editable" },
  { keys: "/read-only <file>", what: "Add a file as read-only context · Aider won't propose edits to it" },
  { keys: "/ls", what: "List all files in the chat (editable + read-only)" },
  { keys: "/diff", what: "Show what changed since last commit" },
  { keys: "/commit", what: "Commit the current changes (Aider auto-commits by default · this is manual)" },
  { keys: "/undo", what: "Undo the last AI-made commit · the killer feature for safe iteration" },
  { keys: "/clear", what: "Clear conversation history · keeps the files in context" },
  { keys: "/reset", what: "Drop all files + clear history · fresh start" },
  { keys: "/test <cmd>", what: "Run a test command · Aider sees the failure + auto-fixes" },
  { keys: "/run <cmd>", what: "Run a shell command · output added to conversation" },
  { keys: "/lint", what: "Lint the modified files · Aider fixes lint errors automatically" },
  { keys: "/web <url>", what: "Fetch a URL · add its content as context (scraped to markdown)" },
  { keys: "/voice", what: "Enable voice input · talk instead of type (requires whisper)" },
  { keys: "/model <name>", what: "Switch model mid-session · gpt-5 / sonnet / haiku / etc" },
  { keys: "/tokens", what: "Show how many tokens are in the current context + recent costs" },
  { keys: "/architect", what: "Switch to architect mode · planning model + editing model split" },
  { keys: "/ask", what: "Ask a question without making any edits · pure Q&A mode" },
  { keys: "/help", what: "List all commands" },
  { keys: "/exit", what: "Quit Aider · same as Ctrl+D" },
];

const MODES = [
  {
    name: "Standard mode",
    detail:
      "Single model does both planning + editing. Default. Best for small/medium changes when the model is capable enough.",
  },
  {
    name: "Architect mode",
    detail:
      "Two models · a 'thinker' (o4-mini / Opus / gpt-5-thinking-high) writes the plan, an 'editor' (sonnet / gpt-5 / haiku) applies the edits. Best for hard problems · catches errors a single model misses.",
  },
  {
    name: "Voice mode",
    detail:
      "/voice activates Whisper microphone capture. Talk through the change · Aider transcribes and proceeds. Mac + Linux supported.",
  },
  {
    name: "Browse mode",
    detail:
      "/web <url> · Aider scrapes the URL to markdown · adds to context. Use for fetching API docs, blog posts, RFCs while coding.",
  },
];

const CONFIG = [
  {
    path: "<project>/.aider.conf.yml",
    role: "Project-level config · model defaults, auto-commit, dark-mode, env vars · committed to repo",
  },
  {
    path: "<project>/CONVENTIONS.md",
    role: "Coding conventions Aider reads as standing context · style guide, idioms, what NOT to do · the Aider equivalent of CLAUDE.md",
  },
  {
    path: "~/.aider.conf.yml",
    role: "Global user config · default model, API keys, default flags",
  },
  {
    path: "<project>/.aiderignore",
    role: "Files Aider should never touch · gitignore syntax",
  },
  {
    path: "<project>/.env",
    role: "Aider reads OPENAI_API_KEY, ANTHROPIC_API_KEY, etc from .env in cwd · ALWAYS gitignore this",
  },
];

const MODELS = [
  { keys: "--model gpt-5", what: "OpenAI frontier · strong general · pairs well with default architect mode" },
  { keys: "--model sonnet", what: "Anthropic Sonnet 4.5 · most-recommended Aider default for cost/quality balance" },
  { keys: "--model opus", what: "Anthropic Opus 4.7 · highest quality · pair as architect with sonnet editor" },
  { keys: "--model haiku", what: "Anthropic Haiku · cheap fast · good editor pairing in architect mode" },
  { keys: "--model deepseek/deepseek-chat", what: "DeepSeek V3+ · open-weights · very cheap · solid quality" },
  { keys: "--model ollama_chat/<model>", what: "Local LLM via Ollama · free · slower · privacy-preserving" },
  { keys: "--architect <thinker> --editor-model <editor>", what: "Explicit architect-mode pairing · e.g. o4-mini + sonnet" },
];

const OPTIMIZATION = [
  {
    title: "Write a CONVENTIONS.md the first day",
    detail:
      "Stack, idioms, library preferences, anti-patterns. Aider includes it as standing context. Equivalent of CLAUDE.md / AGENTS.md / .cursorrules.",
  },
  {
    title: "Use architect mode for any change spanning more than one file",
    detail:
      "Pair a reasoning model (o4-mini · opus · gpt-5-thinking-high) as architect with a cheap fast editor (sonnet · haiku · gpt-5). Better output + often cheaper.",
  },
  {
    title: "Only /add files you're editing · /read-only the rest",
    detail:
      "Aider includes editable files in every prompt. Read-only files included strategically. Cheaper + faster + the model stays focused.",
  },
  {
    title: "Use /test for the TDD loop",
    detail:
      "/test pytest · Aider runs · sees the failure · fixes the code · re-runs until green. Genuinely agentic and very fast for known-bounded changes.",
  },
  {
    title: "Auto-commit is good · don't disable it",
    detail:
      "Aider auto-commits each AI edit. Combined with /undo this is the safety net. Disabling it is the #1 mistake new users make.",
  },
  {
    title: "Use /undo immediately when something goes wrong",
    detail:
      "Don't try to talk Aider out of a bad change · /undo · then re-prompt. Cheaper + cleaner than back-and-forth.",
  },
  {
    title: "Local models via Ollama for sensitive code",
    detail:
      "--model ollama_chat/llama-3.3-70b or qwen-2.5-coder-32b · runs on your machine · no API calls · slower but private.",
  },
  {
    title: "Use /web to pull current API docs into context",
    detail:
      "Asking Aider to use a library? /web https://docs.example.com first · Aider scrapes the docs and uses the current API · not the version from its training cutoff.",
  },
  {
    title: "Pin --map-tokens 1024 for medium repos",
    detail:
      "Aider builds a 'repo map' of all files. Default size works for small repos. Bigger repos benefit from higher map-tokens · more files in the map · better retrieval.",
  },
  {
    title: "/ask before /add for exploratory questions",
    detail:
      "Aider in ask mode is a cheap pure-Q&A surface. Don't add files to context until you're ready to edit. Saves tokens + keeps the chat focused.",
  },
];

const MISTAKES = [
  "Disabling auto-commit because 'I want to commit manually' · then losing track of which changes are which · auto-commit + /undo is the safety net.",
  "Adding the whole repo with /add . · then complaining Aider is slow · /add only what you'll edit.",
  "Forgetting --architect mode exists · single-model edits often miss the planning step.",
  "Putting API keys in .aider.conf.yml · use .env (gitignored) instead.",
  "Running on a giant monorepo without /map-tokens tuned · default repo map gets noisy fast.",
  "Skipping CONVENTIONS.md · then watching Aider use the wrong style every prompt.",
  "Trying to talk Aider out of a bad commit instead of /undo · /undo is one keystroke · debate is many.",
  "Using GPT-5 default when DeepSeek V3+ or Sonnet would be 5x cheaper for the same quality.",
];

const RECENT = [
  { date: "2026 H1", what: "Voice mode improvements · Whisper Large v3 default · faster + more accurate" },
  { date: "2026 H1", what: "Architect mode default for major model pairings (Opus + Sonnet, o4 + GPT-5)" },
  { date: "2025 Q4", what: "DeepSeek V3 + Qwen 2.5 Coder native support · low-cost open-weights lane" },
  { date: "2025 Q4", what: "/lint command auto-fixes linter errors as part of every commit" },
  { date: "2025 Q3", what: "Repo map · automatic context retrieval based on what files matter" },
];

const SOURCES = [
  { label: "Aider · official site", url: "https://aider.chat" },
  { label: "Aider · GitHub", url: "https://github.com/Aider-AI/aider" },
  { label: "Aider · LLM leaderboard (for picking models)", url: "https://aider.chat/docs/leaderboards/" },
  { label: "Aider · usage guide", url: "https://aider.chat/docs/usage.html" },
];

export default function AiderBestPracticesPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF9F3F]">
          CHEAT SHEET · AIDER CLI · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(40px,7vw,80px)] font-light leading-[0.95]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          Aider · the OG open-source pair.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          Git-native · model-agnostic · auto-commit + /undo as safety net ·
          architect mode for hard changes · voice + web scraping built in ·
          BYO API key · runs anywhere. The open-source benchmark every
          commercial agent gets measured against.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#FF9F3F]">
          Last verified · 2026-06-06 · sources at bottom
        </p>
      </header>

      <Section title="§ Keyboard shortcuts">
        <Table rows={SHORTCUTS} headers={["Keys", "What"]} />
      </Section>

      <Section title="§ Slash commands · the full set">
        <Table rows={SLASH} headers={["Command", "What"]} mono="left" />
      </Section>

      <Section title="§ Four modes">
        <ul className="mt-4 space-y-4">
          {MODES.map((m) => (
            <li key={m.name} className="border-l-2 border-[#FF9F3F]/50 pl-5">
              <p className="text-[18px] font-light text-[#F4F4F2]">{m.name}</p>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {m.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="§ Config files + project layout">
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

      <Section title="§ Model selection">
        <Table rows={MODELS} headers={["Flag", "When"]} mono="left" />
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
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#FF9F3F] hover:underline">
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <BackToHub />

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          /best-practices/aider · Last verified 2026-06-06 · sources above
        </p>
      </footer>
    </main>
  );
}
