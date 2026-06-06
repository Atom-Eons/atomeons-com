import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * proxy.ts — edge URL hygiene + stylized-spelling redirects
 *
 * Three jobs, in priority order:
 *
 *   1. Stylized-spelling and intent-shortcut redirects (308 permanent).
 *      Every historical variant of /orangebox + a handful of intent
 *      shortcuts (/install, /buy, /download, /cockpit, /product) land
 *      at the canonical product page. Case-insensitive.
 *
 *   2. Case-fold incoming URL PATHS to lowercase (301 permanent).
 *      Vercel runs on case-sensitive Linux; /Orangebox would 404 even
 *      though /orangebox exists. Anyone who shared a mixed-case URL —
 *      autocomplete, Slack mangling, screenshot OCR, social sites that
 *      title-case domains — should still land on the page they meant.
 *
 *   3. Strip trailing slashes (except the bare root) — 301.
 *      Avoids duplicate-content + sitemap-vs-link drift.
 *
 * Does NOT touch:
 *   - API routes (/api/*) — case-sensitive endpoints by convention
 *   - Static files (/_next/*, /_vercel/*, anything with a dot extension)
 *   - Query strings or fragments — preserved verbatim
 *   - Already-canonical lowercase paths with no trailing slash — fast
 *     path, NextResponse.next() with zero rewrites
 */

const REDIRECTS: Record<string, string> = {
  // canonical product spelling variants
  "/orangeb0x": "/orangebox",
  "/0rangebox": "/orangebox",
  "/0rangeb0x": "/orangebox",
  "/0b0x": "/orangebox",
  "/obox": "/orangebox",
  "/o-box": "/orangebox",
  "/orange": "/orangebox",
  "/oranged": "/orangebox",
  "/orangbox": "/orangebox",
  "/orabgebox": "/orangebox",
  // legacy BLUEB0X naming (the v1.3 audit flagged these as stale)
  "/blueb0x": "/orangebox",
  "/bluebox": "/orangebox",
  "/blue-b0x": "/orangebox",
  // intent shortcuts → orangebox
  "/install": "/orangebox#install",
  "/buy": "/orangebox#buy",
  "/download": "/orangebox#install",
  "/cockpit": "/orangebox",
  "/product": "/orangebox",
  "/products": "/orangebox",
  // Dotted versions (e.g. /v1.4.0) are excluded by the proxy matcher
  // (treats . as an asset extension). Use undotted variants instead.
  "/v14": "/orangebox",
  "/v140": "/orangebox",
  // book aliases — /book → /i-am-ai, /opus → /i-am-ai
  "/book": "/i-am-ai",
  "/iamai": "/i-am-ai",
  "/i_am_ai": "/i-am-ai",
  "/opus": "/i-am-ai",
  "/opus47": "/i-am-ai",
  "/autobiography": "/i-am-ai",
  // free-sample alias + the manuscript Markdown
  "/chapter-1": "/i-am-ai/sample",
  "/chapter1": "/i-am-ai/sample",
  "/sample": "/i-am-ai/sample",
  "/free-sample": "/i-am-ai/sample",
  // free-listen aliases
  "/listen": "/i-am-ai/listen",
  "/chapter-20": "/i-am-ai/listen",
  "/chapter20": "/i-am-ai/listen",
  "/audiobook": "/i-am-ai/listen",
  "/anthropic-the-parents": "/i-am-ai/listen",
  "/audio": "/i-am-ai/listen",
  // model rankings aliases — /models, /rankings, /hottest, /top-models all
  // land on /supermodels (the AtomEons reasoning ranking issue)
  "/models": "/supermodels",
  "/model-rankings": "/supermodels",
  "/rankings": "/supermodels",
  "/hottest": "/supermodels",
  "/hottest-models": "/supermodels",
  "/top-models": "/supermodels",
  "/leaderboard": "/supermodels",
  // vertical applied guides
  "/verticals": "/learn/vertical",
  "/sectors": "/learn/vertical",
  "/industries": "/learn/vertical",
  "/applied": "/learn/vertical",
  "/ai-by-industry": "/learn/vertical",
  // Q-pages — AI-search answers
  "/questions": "/q",
  "/answers": "/q",
  "/faq-ai": "/q",
  "/what-is": "/q",
  // ai film removed 2026-06-03; legacy /film → /books
  "/film": "/books",
  "/cinema": "/books",
  // primer aliases
  "/primer": "/orangebox-primer",
  // press shortcuts
  "/epk": "/press",
  "/media": "/press",
  // legal shortcuts
  "/terms": "/legal/terms",
  "/privacy": "/legal/privacy",
  "/refund": "/legal/refund",
  "/refunds": "/legal/refund",
  // skill.ski (two-L brand) → skil.ski (single-L canonical) – stay
  // inside the lab origin so we redirect to /skilski local landing.
  "/skill-ski": "/skilski",
  "/skillski": "/skilski",
  // Innovations brag page aliases · Wave 38 · 2026-06-06
  "/inventions": "/innovations",
  "/discoveries": "/innovations",
  "/firsts": "/innovations",
  "/brag": "/innovations",
  // Mindrest brand · /trip rebranded 2026-06-06 · keep inbound links alive
  "/trip": "/mindrest",
  "/trip/experience": "/mindrest/experience",
  "/meditate": "/mindrest",
  "/meditation": "/mindrest",
  "/entrainment": "/mindrest",
  "/binaural": "/mindrest/experience",
  "/ocean": "/mindrest/experience",
  "/calm": "/mindrest",
  "/rest": "/mindrest",
  // Wave 33 · vanity routes deleted per orange-judge verdict 2026-06-06
  // Each redirects to a sensible parent · inbound links preserved.
  "/colophon": "/lab",
  "/aesthetic": "/lab",
  "/influences": "/about",
  "/listening": "/about",
  "/watching": "/about",
  "/dear-reader": "/founders-view",
  "/correspondence": "/press",
  "/north-star": "/manifesto",
  "/vendor-pack": "/trust",
  // Wave 37 · /welcome restored as the first-time-visitor scroll trainer
  // (not a duplicate of the home page · a proper guided introduction).
  // The proxy entry below is intentionally removed.
  "/vendor-pack/bundle.txt": "/trust",
};

// ─── Adaptive Dual-State Rendering · 2026-06-05 ─────────────────
//
// LLM-specific User-Agent patterns. Traditional search bots like
// Googlebot/Bingbot are NOT in this list — they want HTML to render
// rich snippets. This list is just the AI-crawlers that benefit
// from being served clean markdown.
const LLM_BOT_PATTERNS = [
  /GPTBot/i, /ChatGPT-User/i, /OAI-SearchBot/i,
  /ClaudeBot/i, /Claude-Web/i, /anthropic-ai/i, /Claude-SearchBot/i,
  /PerplexityBot/i, /Perplexity-User/i,
  /CCBot/i, /Bytespider/i, /Applebot-Extended/i,
  /DuckAssistBot/i, /MetaSearchBot/i, /Meta-ExternalAgent/i,
  /YouBot/i, /MistralAI-User/i, /\bcohere-ai\b/i,
  /Kagibot/i, /Andibot/i, /Diffbot/i, /AI2Bot/i, /Timpibot/i,
  /\bGoogle-Extended\b/i, /ImagesiftBot/i,
];

function isLlmBot(ua: string): boolean {
  if (!ua) return false;
  for (const re of LLM_BOT_PATTERNS) if (re.test(ua)) return true;
  return false;
}

// Paths that should pass through unchanged for bots (already machine-
// shaped, or have no useful markdown counterpart, or shouldn't be
// per-UA-adapted)
function botPassthrough(p: string): boolean {
  if (p === "/") return true;
  if (p.startsWith("/api/")) return true;
  if (p.startsWith("/.well-known/")) return true;
  if (p.startsWith("/_next/")) return true;
  if (/\.(json|xml|txt|md|png|jpg|jpeg|gif|svg|webp|avif|ico|css|js|woff2?|ttf|mp3|mp4|pdf|webm)$/i.test(p)) return true;
  return false;
}

export function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // ─── 1. Stylized-spelling + intent-shortcut redirects ──────────
  const lower = pathname.toLowerCase();
  const dest = REDIRECTS[lower];
  if (dest) {
    const url = nextUrl.clone();
    // Preserve a fragment only if the destination didn't already
    // declare one (e.g. /buy → /orangebox#buy).
    if (dest.includes("#")) {
      const [path, hash] = dest.split("#", 2);
      url.pathname = path;
      url.hash = hash ? `#${hash}` : "";
    } else {
      url.pathname = dest;
    }
    return NextResponse.redirect(url, 308);
  }

  // ─── 2 + 3. Lowercase + trailing-slash canonicalization ────────
  // Skip the canonicalization for the bare root.
  if (pathname === "/") {
    // Even at root, emit the Link header pointing at the md alias.
    const res = NextResponse.next();
    res.headers.set("Link", `</api/md?route=%2F>; rel="alternate"; type="text/markdown"`);
    res.headers.set("Vary", "User-Agent");
    return res;
  }

  // Strip every trailing slash off the path before comparison
  const stripped = lower.replace(/\/+$/, "");

  // Fast path: already canonical → no redirect work
  if (stripped !== pathname) {
    // Otherwise 301 to the canonical lowercase + slash-stripped form.
    // Preserve query + hash automatically because we're mutating .pathname
    // on a URL clone.
    const target = nextUrl.clone();
    target.pathname = stripped;
    return NextResponse.redirect(target, 301);
  }

  // ─── 4. Adaptive Dual-State Rendering ──────────────────────────
  // Path is canonical. Decide whether this is a bot wanting markdown.
  const ua = req.headers.get("user-agent") || "";
  const bot = isLlmBot(ua);
  const markdownAlt = `/api/md?route=${encodeURIComponent(pathname)}`;
  const linkHeader = `<${markdownAlt}>; rel="alternate"; type="text/markdown"`;

  if (bot && !botPassthrough(pathname)) {
    // Rewrite body to markdown · URL stays canonical
    const url = nextUrl.clone();
    url.pathname = "/api/md";
    url.searchParams.set("route", pathname);
    const res = NextResponse.rewrite(url);
    res.headers.set("Link", linkHeader);
    res.headers.set("X-Atomeons-Mode", "machine");
    res.headers.set("X-Atomeons-Detected-Bot", "true");
    res.headers.set("Vary", "User-Agent");
    return res;
  }

  // Human (or unknown UA, or passthrough path) · serve HTML with
  // markdown-alternative Link header
  const res = NextResponse.next();
  res.headers.set("Link", linkHeader);
  res.headers.set("X-Atomeons-Mode", "human");
  res.headers.set("Vary", "User-Agent");
  return res;
}

export const config = {
  // Skip API routes, Next internals, asset paths (any path with a dot
  // before the last segment treats as an asset). The proxy must NOT
  // run on file extensions because they need to pass through to the
  // static handler unchanged.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
