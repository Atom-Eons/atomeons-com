export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * /api/badge/wave.svg · Wave 143d · 2026-07-02
 *
 * Public SVG badge showing the current wave tag. Designed to be
 * embedded via <img src="https://atomeons.com/api/badge/wave.svg">
 * anywhere - README files, blog posts, presentations, docs. GitHub,
 * npm, PyPI all render SVG images inline. Refreshes on every request
 * but is CDN-cached for 60s.
 *
 * Novel-ish: most solo labs pull badges from shields.io. Serving your
 * own means the badge stays coherent with your brand (bio-cyan #22F0D5,
 * mono type, pulse LED) and can pull from your OWN source of truth
 * without a third-party dependency in the middle.
 *
 * URL parameters:
 *   ?label=<string>   override the left label (default: "wave")
 *   ?value=<string>   override the right value (default: current wave)
 *   ?color=<hex6>     override the value background (default: 22F0D5)
 */

const CURRENT_WAVE = "wave-143-stable";
const BRAND_CYAN = "22F0D5";

function escXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Rough text-width heuristic (mono / condensed sans, 11px). Good enough
// for badge sizing; if we ever want pixel-perfect we can swap in a
// server-side canvas measurement.
function textWidth(s: string, px = 11): number {
  return Math.ceil(s.length * (px * 0.62));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const label = (url.searchParams.get("label") ?? "wave").slice(0, 24);
  const value = (url.searchParams.get("value") ?? CURRENT_WAVE).slice(0, 32);
  const colorParam = url.searchParams.get("color") ?? BRAND_CYAN;
  const color = /^[0-9a-fA-F]{6}$/.test(colorParam) ? colorParam : BRAND_CYAN;

  const padding = 10;
  const labelWidth = textWidth(label) + padding * 2;
  const valueWidth = textWidth(value) + padding * 2 + 10; // extra room for LED dot
  const totalWidth = labelWidth + valueWidth;
  const height = 24;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" role="img" aria-label="${escXml(label)}: ${escXml(value)}">
  <title>${escXml(label)}: ${escXml(value)}</title>
  <defs>
    <linearGradient id="left" x2="0" y2="100%">
      <stop offset="0" stop-color="#0F1417"/>
      <stop offset="1" stop-color="#050708"/>
    </linearGradient>
    <linearGradient id="right" x2="0" y2="100%">
      <stop offset="0" stop-color="#${color}"/>
      <stop offset="1" stop-color="#0DBFA8"/>
    </linearGradient>
  </defs>
  <mask id="round">
    <rect width="${totalWidth}" height="${height}" rx="4" fill="#fff"/>
  </mask>
  <g mask="url(#round)">
    <rect width="${labelWidth}" height="${height}" fill="url(#left)"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="${height}" fill="url(#right)"/>
    <rect width="${totalWidth}" height="${height}" fill="url(#right)" opacity="0"/>
  </g>
  <g fill="#F4F4F2" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" letter-spacing="0.08em">
    <text x="${labelWidth / 2}" y="16" fill="#B5BBC0">${escXml(label)}</text>
    <text x="${labelWidth + (valueWidth + 10) / 2}" y="16" fill="#050708" font-weight="600">${escXml(value)}</text>
  </g>
  <circle cx="${labelWidth + 8}" cy="12" r="2.5" fill="#050708">
    <animate attributeName="opacity" values="1;0.35;1" dur="1.8s" repeatCount="indefinite"/>
  </circle>
</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
