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
  // model rankings aliases — /models, /rankings, /hottest, /top-models all
  // land on /supermodels (the AtomEons reasoning ranking issue)
  "/models": "/supermodels",
  "/model-rankings": "/supermodels",
  "/rankings": "/supermodels",
  "/hottest": "/supermodels",
  "/hottest-models": "/supermodels",
  "/top-models": "/supermodels",
  "/leaderboard": "/supermodels",
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
};

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
  if (pathname === "/") return NextResponse.next();

  // Strip every trailing slash off the path before comparison
  const stripped = lower.replace(/\/+$/, "");

  // Fast path: already canonical → no redirect work
  if (stripped === pathname) return NextResponse.next();

  // Otherwise 301 to the canonical lowercase + slash-stripped form.
  // Preserve query + hash automatically because we're mutating .pathname
  // on a URL clone.
  const target = nextUrl.clone();
  target.pathname = stripped;
  return NextResponse.redirect(target, 301);
}

export const config = {
  // Skip API routes, Next internals, asset paths (any path with a dot
  // before the last segment treats as an asset). The proxy must NOT
  // run on file extensions because they need to pass through to the
  // static handler unchanged.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
