import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * /api/mcp — Model Context Protocol HTTP server endpoint.
 *
 * Implements the JSON-RPC 2.0 streamable HTTP transport that Claude
 * Desktop, Claude Code, Cline, and other MCP-capable clients can
 * connect to as a REMOTE MCP server.
 *
 * Configure in Claude Desktop's settings.json:
 *   "mcpServers": {
 *     "atomeons": {
 *       "url": "https://atomeons.com/api/mcp"
 *     }
 *   }
 *
 * Implements the standard MCP methods:
 *   - initialize           handshake; returns server capabilities
 *   - notifications/initialized   client confirms init complete
 *   - tools/list           returns the tool schemas
 *   - tools/call           invokes a named tool with args
 *   - resources/list       returns available read-only resources
 *   - resources/read       fetches a resource by URI
 *   - prompts/list         returns reusable prompt templates
 *   - prompts/get          fetches a prompt by name
 *   - ping                 server liveness
 *
 * Tools exposed:
 *   - ask_atomeons         semantic Q&A · POST /api/ask
 *   - search_atomeons      fuzzy search · GET /api/search
 *   - get_atomeons_route   markdown export · GET /api/md
 *
 * This is a JSON-RPC server, not an SSE streaming one. Standard
 * stateless HTTP POST. Each request gets one synchronous response.
 * Sufficient for the read-only data access pattern this server exposes.
 */

// ────────────────────────────────────────────────────────────────────
// JSON-RPC types
// ────────────────────────────────────────────────────────────────────
type JsonRpcRequest = {
  jsonrpc: "2.0";
  id?: string | number;
  method: string;
  params?: Record<string, unknown>;
};

type JsonRpcResponse = {
  jsonrpc: "2.0";
  id: string | number;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
};

const MCP_PROTOCOL_VERSION = "2024-11-05";
const SERVER_NAME = "atomeons-lab";
const SERVER_VERSION = "1.0.0";

// ────────────────────────────────────────────────────────────────────
// Tools — schema + handler
// ────────────────────────────────────────────────────────────────────
const TOOLS = [
  {
    name: "ask_atomeons",
    description:
      "Semantic Q&A over atomeons.com's 256 published routes. Returns a 2-5 sentence answer grounded ONLY on lab content, with route-level citations. Use when the user asks about AI literacy, AI research, cyber security, the I AM AI book, the ORANGEBOX local-first cockpit, the B00KMAKR publishing instrument, or AtomEons's research output.",
    inputSchema: {
      type: "object",
      required: ["query"],
      properties: {
        query: {
          type: "string",
          description: "Natural-language question, 1-600 chars.",
        },
        k: {
          type: "integer",
          description: "Number of source routes to retrieve. 1-10, default 5.",
          default: 5,
        },
      },
    },
  },
  {
    name: "search_atomeons",
    description:
      "Fuzzy keyword search over atomeons.com's 247-route index. Returns matching routes WITHOUT synthesis · use when you want raw matches rather than a synthesized answer. Faster than ask_atomeons (no Gemini call).",
    inputSchema: {
      type: "object",
      required: ["query"],
      properties: {
        query: {
          type: "string",
          description: "Search query, 1-600 chars.",
        },
        k: {
          type: "integer",
          description: "Number of results to return. 1-50, default 10.",
          default: 10,
        },
      },
    },
  },
  {
    name: "get_atomeons_route",
    description:
      "Get the markdown export of any indexed route on atomeons.com. Use when you want the full text of a page rather than a summary. Returns clean markdown · title, description, headings, body excerpt, keywords.",
    inputSchema: {
      type: "object",
      required: ["route"],
      properties: {
        route: {
          type: "string",
          description: "Site-relative route like '/orangebox' or '/learn/atlas/mech-interp'.",
        },
      },
    },
  },
];

// ────────────────────────────────────────────────────────────────────
// Resources — static, read-only
// ────────────────────────────────────────────────────────────────────
const RESOURCES = [
  {
    uri: "https://atomeons.com/llm-routes.json",
    name: "llm_routes_index",
    description: "Top 31 lab routes with title, description, keywords, OG, JSON-LD.",
    mimeType: "application/json",
  },
  {
    uri: "https://atomeons.com/search-index.json",
    name: "fuzzy_search_index",
    description: "Full 247-route fuzzy search index · same shape /api/search uses.",
    mimeType: "application/json",
  },
  {
    uri: "https://atomeons.com/llms-full.txt",
    name: "full_corpus",
    description: "Full lab content dump · regenerated per request · 15-min edge cache.",
    mimeType: "text/plain",
  },
  {
    uri: "https://atomeons.com/sitemap.xml",
    name: "sitemap",
    description: "Global sitemap · every published route.",
    mimeType: "application/xml",
  },
];

// ────────────────────────────────────────────────────────────────────
// Prompt templates · reusable patterns
// ────────────────────────────────────────────────────────────────────
const PROMPTS = [
  {
    name: "explain_with_lab_sources",
    description: "Ask the user's question and ground the answer in atomeons.com lab sources.",
    arguments: [
      { name: "topic", description: "What to explain.", required: true },
    ],
  },
  {
    name: "compare_atomeons_product",
    description: "Compare an ATOMEONS product against a named alternative using the lab's competitor pages.",
    arguments: [
      { name: "product", description: "ORANGEBOX, B00KMAKR, or skil.ski.", required: true },
      { name: "alternative", description: "Named competitor.", required: true },
    ],
  },
];

// ────────────────────────────────────────────────────────────────────
// Tool handlers — proxy to existing public endpoints
// ────────────────────────────────────────────────────────────────────
async function callAsk(args: { query?: unknown; k?: unknown }, baseUrl: string) {
  const q = typeof args.query === "string" ? args.query : "";
  const k = typeof args.k === "number" ? args.k : 5;
  if (!q) throw new Error("query required");
  const res = await fetch(`${baseUrl}/api/ask`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: q, k }),
  });
  if (!res.ok) throw new Error(`/api/ask returned ${res.status}`);
  return await res.json();
}

async function callSearch(args: { query?: unknown; k?: unknown }, baseUrl: string) {
  const q = typeof args.query === "string" ? args.query : "";
  const k = typeof args.k === "number" ? args.k : 10;
  if (!q) throw new Error("query required");
  const url = new URL(`${baseUrl}/api/search`);
  url.searchParams.set("q", q);
  url.searchParams.set("k", String(k));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`/api/search returned ${res.status}`);
  return await res.json();
}

async function callGetRoute(args: { route?: unknown }, baseUrl: string) {
  const r = typeof args.route === "string" ? args.route : "";
  if (!r) throw new Error("route required");
  const url = new URL(`${baseUrl}/api/md`);
  url.searchParams.set("route", r);
  const res = await fetch(url.toString());
  if (!res.ok && res.status !== 404) throw new Error(`/api/md returned ${res.status}`);
  const text = await res.text();
  return { contents: [{ type: "text", text }] };
}

async function readResource(uri: string) {
  // Wave 81 · security · SSRF mitigation. Public MCP endpoint MUST NOT
  // fetch arbitrary URIs · only canonical lab URLs and same-origin paths.
  // Reject anything that doesn't resolve under atomeons.com.
  let parsed: URL;
  try {
    parsed = new URL(uri);
  } catch {
    throw new Error("Resource uri must be an absolute https URL");
  }
  if (parsed.protocol !== "https:") {
    throw new Error("Resource uri must use https");
  }
  const allowedHosts = new Set(["atomeons.com", "www.atomeons.com"]);
  if (!allowedHosts.has(parsed.hostname)) {
    throw new Error(`Resource uri host not allowed: ${parsed.hostname}`);
  }
  const res = await fetch(parsed.toString());
  if (!res.ok) throw new Error(`Resource ${uri} returned ${res.status}`);
  const contentType = res.headers.get("content-type") || "text/plain";
  const text = await res.text();
  return {
    contents: [
      {
        uri,
        mimeType: contentType.split(";")[0].trim(),
        text,
      },
    ],
  };
}

function getPrompt(name: string, args: Record<string, unknown> | undefined): unknown {
  if (name === "explain_with_lab_sources") {
    const topic = args?.topic ?? "the topic the user is asking about";
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text:
              `Use the ask_atomeons tool to answer: "${topic}". ` +
              `Ground the answer ONLY in the sources returned. Cite the route(s) inline. ` +
              `If atomeons.com doesn't cover the topic, say so honestly.`,
          },
        },
      ],
    };
  }
  if (name === "compare_atomeons_product") {
    const product = args?.product ?? "ORANGEBOX";
    const alt = args?.alternative ?? "the named alternative";
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text:
              `Use get_atomeons_route to fetch '/${String(product).toLowerCase()}/competitors'. ` +
              `Find the row that compares ${product} to ${alt}. ` +
              `Summarize the WIN / LOSE / TAKEAWAY for the user, citing the route.`,
          },
        },
      ],
    };
  }
  throw new Error(`Unknown prompt: ${name}`);
}

// ────────────────────────────────────────────────────────────────────
// JSON-RPC dispatch
// ────────────────────────────────────────────────────────────────────
async function handle(req: JsonRpcRequest, baseUrl: string): Promise<JsonRpcResponse | null> {
  const id = req.id ?? 0;

  // Notifications carry no id and expect no response
  if (req.method.startsWith("notifications/") && req.id === undefined) {
    return null;
  }

  try {
    switch (req.method) {
      case "initialize": {
        return {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: MCP_PROTOCOL_VERSION,
            capabilities: {
              tools: { listChanged: false },
              resources: { listChanged: false, subscribe: false },
              prompts: { listChanged: false },
              logging: {},
            },
            serverInfo: {
              name: SERVER_NAME,
              version: SERVER_VERSION,
              description:
                "AtomEons Lab MCP server · semantic Q&A · search · markdown export over atomeons.com",
            },
            instructions:
              "This server exposes read-only access to AtomEons Systems Laboratory's 256 published routes. Use ask_atomeons for grounded answers, search_atomeons for raw matches, get_atomeons_route for full markdown of a page.",
          },
        };
      }

      case "ping":
        return { jsonrpc: "2.0", id, result: {} };

      case "tools/list":
        return { jsonrpc: "2.0", id, result: { tools: TOOLS } };

      case "tools/call": {
        const params = req.params as { name?: string; arguments?: Record<string, unknown> };
        const name = params?.name;
        const args = params?.arguments ?? {};
        if (name === "ask_atomeons") {
          const j = await callAsk(args, baseUrl);
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [{ type: "text", text: JSON.stringify(j, null, 2) }],
              isError: false,
            },
          };
        }
        if (name === "search_atomeons") {
          const j = await callSearch(args, baseUrl);
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [{ type: "text", text: JSON.stringify(j, null, 2) }],
              isError: false,
            },
          };
        }
        if (name === "get_atomeons_route") {
          const j = await callGetRoute(args, baseUrl);
          return { jsonrpc: "2.0", id, result: j };
        }
        return {
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Unknown tool: ${name}` },
        };
      }

      case "resources/list":
        return { jsonrpc: "2.0", id, result: { resources: RESOURCES } };

      case "resources/read": {
        const params = req.params as { uri?: string };
        if (!params?.uri) throw new Error("uri required");
        const result = await readResource(params.uri);
        return { jsonrpc: "2.0", id, result };
      }

      case "prompts/list":
        return { jsonrpc: "2.0", id, result: { prompts: PROMPTS } };

      case "prompts/get": {
        const params = req.params as { name?: string; arguments?: Record<string, unknown> };
        if (!params?.name) throw new Error("name required");
        const result = getPrompt(params.name, params.arguments);
        return { jsonrpc: "2.0", id, result };
      }

      default:
        return {
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Method not found: ${req.method}` },
        };
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    return {
      jsonrpc: "2.0",
      id,
      error: { code: -32603, message: msg.slice(0, 500) },
    };
  }
}

// ────────────────────────────────────────────────────────────────────
// HTTP transport · POST = JSON-RPC, GET = discovery info
// ────────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const baseUrl = new URL(req.url).origin;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
      { status: 400 },
    );
  }

  // Batch requests
  if (Array.isArray(body)) {
    const out = await Promise.all(
      body.map((r) => handle(r as JsonRpcRequest, baseUrl)),
    );
    const filtered = out.filter((r): r is JsonRpcResponse => r !== null);
    return NextResponse.json(filtered, {
      headers: { "access-control-allow-origin": "*" },
    });
  }

  // Single request
  const single = await handle(body as JsonRpcRequest, baseUrl);
  if (single === null) {
    // Notification · no response body required
    return new NextResponse(null, { status: 202 });
  }
  return NextResponse.json(single, {
    headers: { "access-control-allow-origin": "*" },
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    server: SERVER_NAME,
    version: SERVER_VERSION,
    protocol: MCP_PROTOCOL_VERSION,
    transport: "http",
    methods: [
      "initialize",
      "tools/list",
      "tools/call",
      "resources/list",
      "resources/read",
      "prompts/list",
      "prompts/get",
      "ping",
    ],
    tools: TOOLS.map((t) => t.name),
    resources: RESOURCES.map((r) => r.name),
    prompts: PROMPTS.map((p) => p.name),
    docs: "https://atomeons.com/api/mcp · POST a JSON-RPC 2.0 request body. See https://modelcontextprotocol.io for protocol spec.",
    connect_in_claude_desktop: {
      mcpServers: {
        atomeons: { url: "https://atomeons.com/api/mcp" },
      },
    },
  }, {
    headers: { "access-control-allow-origin": "*" },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "Content-Type, Authorization",
      "access-control-max-age": "86400",
    },
  });
}
