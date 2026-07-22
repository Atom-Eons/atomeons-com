const RELEASE = "f1d6551b6930ae1270aa67d59bfcb44a9ad76ad3";
const RAW_ROOT = `https://raw.githubusercontent.com/AtomEons/ae-brawl/${RELEASE}`;
const CAMPAIGN_ROOT = `${RAW_ROOT}/public/campaign`;
const DOCS_ROOT = `${RAW_ROOT}/docs`;

const LIVE_APP = "https://atomeons.github.io/ae-brawl/";
const JUDGE_APP = `${LIVE_APP}?judge=1`;
const BUILD_PROOF = `${LIVE_APP}?proof=1`;
const SOURCE = "https://github.com/AtomEons/ae-brawl";

const DOCUMENTS = new Map([
  ["technical-manual.pdf", "AE-BRAWL-TECHNICAL-MANUAL.pdf"],
  ["about-atom-eons.pdf", "ABOUT-ATOM-EONS.pdf"],
  ["leadmcp-visual-story.pdf", "LEADMCP-VISUAL-STORY.pdf"],
]);

const CAMPAIGN_FILE = /^\d{2}-[a-z0-9-]+\.png$/;

let campaignPromise;

function featureMarkup() {
  return `
    <aside class="session-proof" aria-label="Codex build session">
      <span>CODEX SESSION ID / BUILD PROOF</span>
      <strong>019f71dd-0add-7fc2-bd06-67c95a5df77b</strong>
      <a href="${LIVE_APP}feedback/">Open public feedback record <span aria-hidden="true">↗</span></a>
    </aside>
    <div class="feature-actions" aria-label="AE BRAWL project actions">
      <a class="feature-action primary" href="${LIVE_APP}">Enter AE Brawl <span aria-hidden="true">↗</span></a>
      <a class="feature-action" href="${BUILD_PROOF}">See how LeadMCP works <span aria-hidden="true">↗</span></a>
      <a class="feature-action" href="/brawl/docs/technical-manual.pdf">Read technical manual <span aria-hidden="true">↓</span></a>
      <a class="feature-action" href="${SOURCE}">View source <span aria-hidden="true">↗</span></a>
    </div>
    <p class="feature-proof">7 MCP TOOLS <i>·</i> 0 ACCOUNTS <i>·</i> 1 REDEMPTION</p>`;
}

function enhanceCampaign(source) {
  const extraCss = `
    .session-proof{display:grid;max-width:58rem;margin-top:2.2rem;padding:1.2rem 1.35rem;gap:.42rem;border:1px solid rgba(81,200,255,.48);border-radius:1rem;background:linear-gradient(110deg,rgba(81,200,255,.13),rgba(255,157,47,.08));box-shadow:0 24px 80px rgba(0,0,0,.22)}
    .session-proof>span{color:#51c8ff;font:850 .68rem/1.3 "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.17em}
    .session-proof strong{overflow-wrap:anywhere;color:#f5f1e8;font:850 clamp(1.05rem,2.35vw,2rem)/1.12 "IBM Plex Mono",ui-monospace,monospace;letter-spacing:-.035em}
    .session-proof a{width:max-content;max-width:100%;margin-top:.28rem;color:#ffd29a;font:800 .68rem/1.4 "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.08em;text-decoration:none;text-transform:uppercase}
    .session-proof a:hover,.session-proof a:focus-visible{color:#ff9d2f}
    .feature-actions{display:flex;flex-wrap:wrap;gap:.72rem;margin-top:2rem}
    .feature-action{display:inline-flex;min-height:48px;padding:.82rem 1.05rem;align-items:center;justify-content:space-between;gap:1rem;border:1px solid rgba(255,255,255,.2);border-radius:999px;color:#f5f1e8;background:rgba(8,10,13,.44);font-size:.72rem;font-weight:850;letter-spacing:.08em;text-decoration:none;text-transform:uppercase;transition:transform 160ms ease,border-color 160ms ease,background 160ms ease}
    .feature-action:hover,.feature-action:focus-visible{border-color:#ff9d2f;background:rgba(255,157,47,.1);transform:translateY(-2px)}
    .feature-action.primary{border-color:#ff9d2f;color:#080a0d;background:#ff9d2f}
    .feature-proof{margin:1.1rem 0 0;color:#ffd29a;font:800 .72rem/1.5 "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.16em}
    .feature-proof i{padding:0 .45rem;color:#51c8ff;font-style:normal}
    .feature-disclaimer{width:min(calc(100% - 2rem),1440px);margin:0 auto 4rem;padding:1rem 1.2rem;border:1px solid rgba(255,255,255,.12);border-radius:.8rem;color:#aaa9a5;background:rgba(18,22,28,.72);font-size:.78rem;line-height:1.55}
    @media(max-width:600px){.feature-actions{display:grid}.feature-action{width:100%}.feature-proof{font-size:.62rem;letter-spacing:.1em}}
    @media(prefers-reduced-motion:reduce){.feature-action{transition:none}.feature-action:hover,.feature-action:focus-visible{transform:none}}
  `;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "AE BRAWL",
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        url: LIVE_APP,
        description:
          "A cinematic, accountless PWA for finding legitimate supervised combat-sport sessions tonight.",
        author: { "@type": "Organization", name: "Atom Eons", url: "https://atomeons.com" },
      },
      {
        "@type": "CreativeWork",
        name: "AE BRAWL — Tonight Has A Door",
        url: "https://atomeons.com/brawl",
        image: "https://atomeons.com/brawl/campaign/01-signal-leaves-home.png",
        creator: { "@type": "Organization", name: "Atom Eons" },
      },
    ],
  };

  let html = source
    .replace("AE BRAWL — Tonight Had a Door", "AE BRAWL — Tonight Has A Door | Atom Eons")
    .replace(
      "AE BRAWL campaign sequence: fifteen original cinematic frames tracing one supervised night from signal to proof.",
      "A cinematic, accountless PWA for finding legitimate supervised combat-sport sessions tonight, powered by the seven-tool LeadMCP referral protocol.",
    )
    .replace("Tonight had <em>a door.</em>", "Tonight has <em>a door.</em>")
    .replace(
      "Fifteen original frames trace one responsible night out—from the first signal, through coach-led fundamentals and private local technology, to a single-use DoorPass and its proof.",
      "AE BRAWL turns nearby supervised combat-sport trial sessions into a one-night cinematic experience—then uses LeadMCP to prove the private, single-use referral behind the ride.",
    )
    .replace("</style>", `${extraCss}</style>`)
    .replace(
      "</head>",
      `<link rel="canonical" href="https://atomeons.com/brawl" />
       <meta property="og:type" content="website" />
       <meta property="og:site_name" content="Atom Eons" />
       <meta property="og:title" content="AE BRAWL — Tonight Has A Door" />
       <meta property="og:description" content="No map. No membership. One supervised night." />
       <meta property="og:url" content="https://atomeons.com/brawl" />
       <meta property="og:image" content="https://atomeons.com/brawl/campaign/01-signal-leaves-home.png" />
       <meta name="twitter:card" content="summary_large_image" />
       <script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>
       </head>`,
    )
    .replace("</p>\n        </div>\n        <div class=\"hero-stats\"", `</p>${featureMarkup()}\n        </div>\n        <div class="hero-stats"`)
    .replaceAll('href="../?judge=1"', `href="${JUDGE_APP}"`)
    .replaceAll('src="./', 'src="/brawl/campaign/');

  html = html.replace(
    "<footer>",
    `<aside class="feature-disclaimer">AE BRAWL is a provisional competition name and demonstration. Judge-mode venues are fictional; availability and referral payment are simulated. Real training requires venue confirmation, coach supervision, informed consent, and personal assessment of medical suitability. No affiliation with any gym, league, celebrity, entertainment property, or payment provider is implied.</aside><footer>`,
  );

  return html;
}

async function loadCampaign() {
  if (!campaignPromise) {
    campaignPromise = fetch(`${CAMPAIGN_ROOT}/index.html`, {
      cf: { cacheEverything: true, cacheTtl: 300 },
    }).then(async (response) => {
      if (!response.ok) throw new Error(`Campaign source returned ${response.status}`);
      return enhanceCampaign(await response.text());
    });
  }
  return campaignPromise;
}

function secureHeaders(contentType, cacheControl) {
  return {
    "content-type": contentType,
    "cache-control": cacheControl,
    "referrer-policy": "strict-origin-when-cross-origin",
    "x-content-type-options": "nosniff",
    "x-frame-options": "SAMEORIGIN",
    "permissions-policy": "camera=(), microphone=(), geolocation=()",
    "x-atom-eons-release": `AE-BRAWL-${RELEASE.slice(0, 7)}`,
  };
}

async function proxyFile(url, contentType, cacheControl, disposition) {
  const upstream = await fetch(url, { cf: { cacheEverything: true, cacheTtl: 86400 } });
  if (!upstream.ok) return new Response("Asset unavailable", { status: upstream.status });
  const headers = secureHeaders(contentType, cacheControl);
  if (disposition) headers["content-disposition"] = disposition;
  return new Response(upstream.body, { status: 200, headers });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/ae-brawl")) {
      return Response.redirect(`${url.origin}/brawl${url.pathname.slice("/ae-brawl".length)}`, 301);
    }

    if (url.pathname === "/brawl" || url.pathname === "/brawl/") {
      try {
        return new Response(await loadCampaign(), {
          headers: secureHeaders("text/html; charset=UTF-8", "public, max-age=120, s-maxage=300"),
        });
      } catch (error) {
        campaignPromise = undefined;
        return new Response(
          `<!doctype html><meta charset="utf-8"><title>AE BRAWL</title><style>body{margin:0;display:grid;min-height:100vh;place-items:center;background:#080a0d;color:#f5f1e8;font:18px system-ui}.box{max-width:42rem;padding:2rem}a{color:#ff9d2f}</style><div class="box"><h1>Tonight still has a door.</h1><p>The campaign layer is warming up. The judge build is available now.</p><a href="${JUDGE_APP}">Enter AE BRAWL →</a></div>`,
          { status: 503, headers: secureHeaders("text/html; charset=UTF-8", "no-store") },
        );
      }
    }

    if (url.pathname.startsWith("/brawl/campaign/")) {
      const file = url.pathname.slice("/brawl/campaign/".length);
      if (!CAMPAIGN_FILE.test(file)) return new Response("Not found", { status: 404 });
      return proxyFile(`${CAMPAIGN_ROOT}/${file}`, "image/png", "public, max-age=31536000, immutable");
    }

    if (url.pathname.startsWith("/brawl/docs/")) {
      const slug = url.pathname.slice("/brawl/docs/".length);
      const file = DOCUMENTS.get(slug);
      if (!file) return new Response("Not found", { status: 404 });
      return proxyFile(
        `${DOCS_ROOT}/${file}`,
        "application/pdf",
        "public, max-age=31536000, immutable",
        `inline; filename="${file}"`,
      );
    }

    if (url.pathname === "/brawl/app") return Response.redirect(LIVE_APP, 302);
    if (url.pathname === "/brawl/proof") return Response.redirect(BUILD_PROOF, 302);
    if (url.pathname === "/brawl/source") return Response.redirect(SOURCE, 302);

    return new Response("Not found", { status: 404 });
  },
};
