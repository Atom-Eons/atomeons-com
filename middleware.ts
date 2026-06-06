import { NextResponse, type NextRequest } from "next/server";

/**
 * middleware.ts — Adaptive Dual-State Rendering · 2026-06-05
 *
 * Detects LLM crawler User-Agent headers (not traditional search bots
 * like Googlebot — only AI-specific crawlers). For those crawlers,
 * rewrites content-page requests to /api/md?route=<path> so the bot
 * receives a clean markdown response instead of the full HTML page.
 *
 * The URL the bot recorded stays the same (Next.js rewrite is a
 * server-side rewrite, not a redirect). So caches + citations point at
 * the canonical /route URL while the body served is markdown.
 *
 * Pattern:
 *   GPTBot/2.1 → request /orangebox
 *     middleware rewrites the body to /api/md?route=/orangebox
 *     bot's URL recorded: /orangebox
 *     bot's response: markdown
 *
 *   Mozilla/5.0 (browser) → request /orangebox
 *     middleware passes through · bot returns the full HTML page
 *
 * What this is NOT:
 *   - NOT a redirect (no 30x). Pure server-side rewrite.
 *   - NOT applied to traditional search bots (Googlebot, Bingbot).
 *     They want HTML to render rich snippets · we serve them HTML.
 *   - NOT applied to / · /api/* · /.well-known/* · /*.json · /*.xml
 *     /*.txt · /*.md — those are already machine-shaped or shouldn't
 *     change format per UA.
 *   - NOT applied if /api/md doesn't have the route indexed · bots
 *     in that case get a 404 markdown response with close-route hints.
 *
 * Every response (bot OR human) also gets a Link header pointing at
 * the markdown alternative · standard alternate-format hint that
 * well-behaved consumers honor without UA sniffing.
 */

const LLM_BOT_PATTERNS = [
  /GPTBot/i,
  /ChatGPT-User/i,
  /OAI-SearchBot/i,
  /ClaudeBot/i,
  /Claude-Web/i,
  /anthropic-ai/i,
  /Claude-SearchBot/i,
  /PerplexityBot/i,
  /Perplexity-User/i,
  /CCBot/i,                    // Common Crawl (feeds many AI corpora)
  /Bytespider/i,               // ByteDance / Doubao
  /Applebot-Extended/i,        // Apple AI features (not Applebot which is search)
  /DuckAssistBot/i,
  /MetaSearchBot/i,
  /Meta-ExternalAgent/i,
  /YouBot/i,
  /MistralAI-User/i,
  /\bcohere-ai\b/i,
  /Kagibot/i,
  /Andibot/i,
  /Diffbot/i,
  /AI2Bot/i,
  /Timpibot/i,
  /\bGoogle-Extended\b/i,      // Google AI Overview opt-in
  /ImagesiftBot/i,
];

// Paths the middleware does NOT rewrite (already machine-shaped or
// have no useful markdown counterpart)
const STATIC_EXTENSIONS = /\.(json|xml|txt|md|png|jpg|jpeg|gif|svg|webp|avif|ico|css|js|woff2?|ttf|mp3|mp4|pdf|webm)$/i;
const SKIP_PREFIXES = [
  "/_next/",
  "/api/",
  "/.well-known/",
];

function isLlmBot(ua: string): boolean {
  if (!ua) return false;
  for (const re of LLM_BOT_PATTERNS) {
    if (re.test(ua)) return true;
  }
  return false;
}

function shouldRewrite(pathname: string): boolean {
  if (pathname === "/") return false;
  if (STATIC_EXTENSIONS.test(pathname)) return false;
  for (const prefix of SKIP_PREFIXES) {
    if (pathname.startsWith(prefix)) return false;
  }
  return true;
}

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  const pathname = req.nextUrl.pathname;
  const botMatch = isLlmBot(ua);

  // Always emit a Link header pointing at the markdown alternative
  // for every content page (even for humans · standard hint).
  const markdownAlt = `/api/md?route=${encodeURIComponent(pathname)}`;
  const linkHeader =
    `<${markdownAlt}>; rel="alternate"; type="text/markdown"`;

  if (botMatch && shouldRewrite(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/api/md";
    url.searchParams.set("route", pathname);
    const res = NextResponse.rewrite(url);
    res.headers.set("Link", linkHeader);
    res.headers.set("X-Atomeons-Mode", "machine");
    res.headers.set("X-Atomeons-Detected-Bot", "true");
    res.headers.set("Vary", "User-Agent");
    return res;
  }

  // Humans + traditional bots · pass through with the Link header
  if (shouldRewrite(pathname)) {
    const res = NextResponse.next();
    res.headers.set("Link", linkHeader);
    res.headers.set("X-Atomeons-Mode", "human");
    res.headers.set("Vary", "User-Agent");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on everything except static assets · the middleware itself
    // gates further with shouldRewrite()
    "/((?!_next/static|_next/image|favicon.ico|opengraph-image|icon|apple-icon|manifest.webmanifest).*)",
  ],
};
