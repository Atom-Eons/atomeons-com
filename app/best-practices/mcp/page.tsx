import type { Metadata } from "next";
import { Section, Table } from "../claude/page";
import { BackToHub } from "../cursor/page";
import { McpSequenceDiagram } from "../../_components/V3/TeachableGraphics";

export const metadata: Metadata = {
  title: "Model Context Protocol · Cheat Sheet",
  description:
    "MCP cross-tool cheat sheet · clients · servers · tools · resources · prompts · stdio + SSE + HTTP transport · claude_desktop_config.json · official servers (filesystem · github · postgres · slack · brave-search · sequential-thinking) · Python + TypeScript SDKs · debugging. Sourced from modelcontextprotocol.io · verified 2026-06-06.",
  alternates: { canonical: "https://atomeons.com/best-practices/mcp" },
  openGraph: {
    title: "MCP · Model Context Protocol Cheat Sheet",
    description:
      "The cross-tool protocol Claude · Cursor · Codex · Antigravity all speak. Servers, clients, tools, transport.",
    url: "https://atomeons.com/best-practices/mcp",
    type: "article",
  },
};

const PRIMITIVES = [
  {
    name: "Client",
    detail:
      "An app that hosts the AI model + connects to MCP servers. Examples: Claude Desktop, Claude Code, Cursor, Codex, Continue.dev, Cline, Zed. Reads ~/.mcp config or similar.",
  },
  {
    name: "Server",
    detail:
      "A program that exposes capabilities to the client. Examples: filesystem · github · postgres · slack · brave-search. Speaks the MCP protocol over stdio / SSE / HTTP.",
  },
  {
    name: "Tools",
    detail:
      "Callable functions a server exposes. Have name + description + JSON Schema for arguments. The AI model calls them like function-calling. Example: filesystem's read_file(path).",
  },
  {
    name: "Resources",
    detail:
      "Read-only data the server can provide · URIs that resolve to content. Example: postgres exposes table schemas as postgres://table-name resources.",
  },
  {
    name: "Prompts",
    detail:
      "Reusable templated workflows the server provides to the client. The user picks one from a UI · arguments are filled in · the prompt is sent to the model.",
  },
  {
    name: "Sampling",
    detail:
      "Server-initiated requests to the client's LLM. Server says 'I need a summary of this content' · client's LLM responds. Less common · powerful for agent-of-agent designs.",
  },
];

const TRANSPORTS = [
  {
    name: "stdio",
    detail:
      "Server runs as a local subprocess of the client · communicates over stdin/stdout. Simplest · most common. No network. Used for local servers (filesystem, sequential-thinking).",
  },
  {
    name: "SSE (Server-Sent Events)",
    detail:
      "Server runs as HTTP service · pushes events to client. Use for remote/hosted servers (cloud Notion · Slack workspace). Auth via standard HTTP headers / OAuth.",
  },
  {
    name: "Streamable HTTP",
    detail:
      "Bidirectional HTTP-based transport (2025+ spec). Newer alternative to SSE · easier to host behind a CDN. Now the recommended remote transport.",
  },
];

const OFFICIAL_SERVERS = [
  { keys: "filesystem", what: "Read + write files in a configured root directory · safest scope it tight" },
  { keys: "github", what: "Read repos, issues, PRs · branch + commit · write issues + PRs · OAuth or PAT auth" },
  { keys: "postgres", what: "Query Postgres databases · read-only by default · schemas exposed as resources" },
  { keys: "slack", what: "Read channels, post messages, list users · scoped to a workspace via OAuth" },
  { keys: "brave-search", what: "Web search via Brave Search API · API key required · good for citation-grounded answers" },
  { keys: "sequential-thinking", what: "Multi-step reasoning with branching · pure local · no external API · the 'thinking out loud' tool" },
  { keys: "memory", what: "Long-term key-value memory · persists across sessions · the cross-conversation note" },
  { keys: "puppeteer", what: "Headless Chrome control · take screenshots, fill forms, scrape pages" },
  { keys: "fetch", what: "Fetch a URL · convert to markdown · cleaner than puppeteer for read-only" },
  { keys: "google-drive", what: "Read + search Google Drive · OAuth required · file content + metadata" },
  { keys: "notion", what: "Notion workspace integration · read + write pages + databases" },
  { keys: "linear", what: "Linear issues + projects · OAuth · the project management lane" },
];

const CONFIG_FILES = [
  {
    path: "~/Library/Application Support/Claude/claude_desktop_config.json",
    role: "Claude Desktop MCP server registry (macOS). Defines which servers Claude Desktop spawns at launch.",
  },
  {
    path: "%APPDATA%\\Claude\\claude_desktop_config.json",
    role: "Same · Windows path",
  },
  {
    path: "<project>/.mcp.json",
    role: "Project-level MCP server config · used by Claude Code, Cursor, Continue.dev, others",
  },
  {
    path: "~/.codex/config.toml (mcp section)",
    role: "Codex CLI · MCP servers listed under [mcp.servers]",
  },
  {
    path: "~/.cursor/mcp.json",
    role: "Cursor IDE · MCP server registry (global)",
  },
];

const CONFIG_EXAMPLE = `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/projects"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..." }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres",
               "postgresql://user:pass@localhost/db"]
    }
  }
}`;

const SDK = [
  {
    name: "TypeScript SDK",
    detail:
      "@modelcontextprotocol/sdk · the canonical Node.js implementation · easiest to write a server in. npm install · server.tool() · server.resource() · server.connect(new StdioServerTransport()).",
  },
  {
    name: "Python SDK",
    detail:
      "mcp Python package · pip install mcp · FastMCP class is the high-level entry · same primitives. Use for data-science-flavored servers.",
  },
  {
    name: "Rust SDK",
    detail:
      "rust-mcp-sdk · for performance-critical servers (binary parsers, ML inference, etc).",
  },
  {
    name: "Java + Kotlin + C# SDK",
    detail:
      "Official ports · use where your runtime is already JVM or .NET-native.",
  },
];

const OPTIMIZATION = [
  {
    title: "Use official servers before writing your own",
    detail:
      "filesystem · github · postgres · brave-search · slack · puppeteer · memory · sequential-thinking · fetch · google-drive · notion · linear all exist. Most users never need to write a server.",
  },
  {
    title: "Scope filesystem servers tight",
    detail:
      "Don't expose your whole home directory · pass a specific project root as the argument. The principle-of-least-privilege applies to MCP.",
  },
  {
    title: "Use env section for secrets · never inline tokens",
    detail:
      "{ \"env\": { \"GITHUB_PERSONAL_ACCESS_TOKEN\": \"...\" } } · the env block is read at server spawn · keeps tokens out of config-file backups.",
  },
  {
    title: "Test servers with the MCP Inspector",
    detail:
      "npx @modelcontextprotocol/inspector · GUI for testing a server's tools + resources + prompts. Connect over stdio · click each tool · see the JSON response. Faster than blind integration.",
  },
  {
    title: "Use sequential-thinking for hard reasoning tasks",
    detail:
      "The sequential-thinking server is pure-local, free, and forces step-by-step reasoning. Pair it with any client when you need explicit chains.",
  },
  {
    title: "Memory server > re-uploading context",
    detail:
      "If you keep typing 'remember that X' to your AI · install the memory server. Persistent KV that the model writes to + reads from across sessions.",
  },
  {
    title: "Run servers as containers for remote / production use",
    detail:
      "Docker your server · expose via Streamable HTTP · auth at the gateway · client connects via URL. Standard pattern for team-wide servers.",
  },
  {
    title: "Limit tool count per client to 30-50",
    detail:
      "Too many tools and the model gets lost picking which to call. Scope clients to the servers they actually need.",
  },
  {
    title: "Watch the tool-name namespace",
    detail:
      "Two servers with a tool named 'search' will clash. Convention: prefix tool names with the server name (e.g., 'github_search' · 'brave_search').",
  },
  {
    title: "Version-pin your servers",
    detail:
      "@modelcontextprotocol/server-github@1.4.2 · not just @latest · breaking changes happen between minor versions still in the spec era.",
  },
];

const MISTAKES = [
  "Exposing /Users/you/ via filesystem server · scope to specific project directories only.",
  "Committing claude_desktop_config.json with embedded tokens · OS-level config files are not the right place for secrets.",
  "Installing 15 servers · the model gets lost in tool-picking · keep clients lean.",
  "Forgetting MCP servers run as subprocesses · they outlive your chat session unless you exit the client cleanly.",
  "Writing a server for what an existing server already does · check the official server list first.",
  "Using SSE transport where Streamable HTTP fits better · SSE is being deprecated in newer client versions.",
  "Skipping the Inspector during dev · debugging a stdio MCP server without it is painful.",
  "Naming tools generically (search, fetch, run) without a server prefix · namespace collisions across servers are common.",
];

const RECENT = [
  { date: "2026 H1", what: "Streamable HTTP transport now preferred over SSE for remote servers · cleaner CDN story" },
  { date: "2026 H1", what: "MCP Inspector v2 · richer debugging UI · resource browsing + prompt previews" },
  { date: "2025 Q4", what: "Cursor + Codex + Antigravity all shipped MCP support · cross-tool parity reached" },
  { date: "2025 Q4", what: "Memory server official release · cross-session persistence as a first-class server" },
  { date: "2025 Q3", what: "MCP 1.0 spec finalized · clients + servers can target a stable API surface" },
];

const SOURCES = [
  { label: "Model Context Protocol · spec + docs", url: "https://modelcontextprotocol.io" },
  { label: "MCP · server registry", url: "https://github.com/modelcontextprotocol/servers" },
  { label: "MCP · TypeScript SDK", url: "https://github.com/modelcontextprotocol/typescript-sdk" },
  { label: "MCP · Python SDK", url: "https://github.com/modelcontextprotocol/python-sdk" },
  { label: "MCP Inspector", url: "https://github.com/modelcontextprotocol/inspector" },
];

export default function McpBestPracticesPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          CHEAT SHEET · MODEL CONTEXT PROTOCOL · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(40px,7vw,80px)] font-light leading-[0.95]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          MCP · cross-tool.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          The open protocol Claude · Cursor · Codex · Continue · Cline ·
          Zed · Antigravity all speak. Servers expose tools + resources +
          prompts · clients call them. Write a server once · use it
          everywhere. Sourced from modelcontextprotocol.io.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]">
          Last verified · 2026-06-06 · sources at bottom
        </p>
      </header>

      <McpSequenceDiagram />

      <Section title="§ Six primitives">
        <ul className="mt-4 space-y-4">
          {PRIMITIVES.map((p) => (
            <li key={p.name} className="border-l-2 border-[#22F0D5]/50 pl-5">
              <p className="text-[18px] font-light text-[#F4F4F2]">{p.name}</p>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {p.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="§ Three transports">
        <ul className="mt-4 space-y-4">
          {TRANSPORTS.map((t) => (
            <li key={t.name} className="border-l-2 border-[#C9A55C]/40 pl-5">
              <p className="font-mono text-[14px] text-[#22F0D5]">{t.name}</p>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {t.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="§ Official servers · 12 most-used">
        <Table rows={OFFICIAL_SERVERS} headers={["Server", "What it exposes"]} mono="left" />
      </Section>

      <Section title="§ Where each client looks for MCP config">
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

      <Section title="§ Example config (claude_desktop_config.json)">
        <pre className="mt-4 overflow-x-auto rounded border border-[#1F242B] bg-[#0F1114] p-5 font-mono text-[12px] leading-[1.55] text-[#F4F4F2]">
          {CONFIG_EXAMPLE}
        </pre>
      </Section>

      <Section title="§ SDKs · build your own server">
        <ul className="mt-4 space-y-4">
          {SDK.map((s) => (
            <li key={s.name} className="border-l-2 border-[#22F0D5]/50 pl-5">
              <p className="text-[18px] font-light text-[#F4F4F2]">{s.name}</p>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#9CA3AF]">
                {s.detail}
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
        <Table rows={RECENT.map((r) => ({ keys: r.date, what: r.what }))} headers={["When", "What"]} />
      </Section>

      <Section title="§ Sources">
        <ul className="mt-4 space-y-2">
          {SOURCES.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#22F0D5] hover:underline">
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <BackToHub />

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          /best-practices/mcp · Last verified 2026-06-06 · sources above
        </p>
      </footer>
    </main>
  );
}
