/**
 * /workflow finish-redesign
 *
 * Saved workflow for the NEXT session. Closes out the remaining
 * trillion-dollar redesign work that was queued at session end on
 * 2026-06-02 after V3 noir-cinema promotion to /.
 *
 * Three phases (none depend on previous workflow output — all self-
 * contained):
 *
 *   1. RETROFIT INTERIOR HEROES — for each of ~200 interior pages,
 *      check whether it uses CyberHeroImage / LearnHeroImage / a
 *      one-off hero pattern, and propose a swap to V3/InteriorHero
 *      where it fits cleanly. Skip files that have custom
 *      compositions that wouldn't benefit. Returns a paste-ready
 *      ed-style patch per file.
 *
 *   2. WORLD-MODELS + SYNTHETIC-DATA ATLAS PAGES — author the two
 *      remaining atlas surfaces missing from the V3-era. Each as a
 *      ContentPage with citations, lab-grade voice, public sources.
 *
 *   3. CYBER DEEP-DIVES 30 — rerun the failed cyber-deep-dives-50
 *      workflow with v2-pattern flat schemas (single-key code field
 *      instead of nested ContentPage objects). Targets 30 NEW cyber
 *      pages on top of the existing 20 tracks. Materialization
 *      script .scripts/materialize-cyber-deep-dives.mjs is already
 *      pre-staged for it.
 *
 * Schemas are intentionally flat + single-key so they don't repeat
 * the v1-workflow failures (which hit 'subagent completed without
 * calling StructuredOutput' on nested ContentPage shapes).
 *
 * To invoke at next session start:
 *   /workflows finish-redesign
 *
 * Or directly via:
 *   Workflow({ name: "finish-redesign" })
 */

export const meta = {
  name: "finish-redesign",
  description: "Finish the trillion-dollar redesign: retrofit interior hero pattern, author 2 missing atlas pages (world-models + synthetic-data), author 30 cyber deep-dive pages.",
  whenToUse: "Next session after the 2026-06-02 V3 promotion. Closes out the queued retrofit + content work.",
  phases: [
    { title: "Retrofit · 12 interior hero swaps" },
    { title: "Atlas · 2 missing pages" },
    { title: "Cyber · 30 deep-dive pages" },
    { title: "Brief · operator-facing report" },
  ],
};

const BRAND = [
  "AtomEons Systems Laboratory · Atom McCree · Marco Island FL.",
  "Site is currently the V3 noir-cinema design (promoted 2026-06-02).",
  "Voice: lab-grade, anti-hype, sourced, technical, calm.",
  "Public info only on cyber content (operator constraint).",
  "Three-job role: cyber leader + AI college alternative + design inspiration.",
  "All claims sourced or qualified.",
].join("\n");

// =========================================================================
// PHASE 1 — INTERIOR HERO RETROFIT
// =========================================================================
phase("Retrofit · 12 interior hero swaps");

const INTERIOR_PAGES = [
  "app/learn/cyber/page.tsx",
  "app/learn/cyber/modern/page.tsx",
  "app/learn/cyber/llm-warfare/page.tsx",
  "app/learn/cyber/platforms/page.tsx",
  "app/learn/atlas/page.tsx",
  "app/learn/atlas/agents/page.tsx",
  "app/learn/career/page.tsx",
  "app/learn/career/pathways/page.tsx",
  "app/learn/trust/page.tsx",
  "app/learn/calc/page.tsx",
  "app/design-system/page.tsx",
  "app/now/page.tsx",
];

const RETROFIT_SCHEMA = {
  type: "object",
  required: ["patch"],
  properties: {
    patch: {
      type: "string",
      description: "An ed-style patch (--- old\\n+++ new\\n@@ block) that swaps the page's hero pattern for V3/InteriorHero, OR the literal string 'SKIP' if the file uses a one-off composition that wouldn't benefit.",
    },
  },
};

const retrofits = await parallel(
  INTERIOR_PAGES.map((path) => () =>
    agent(
      [
        BRAND,
        "",
        "Read " + path + " in full.",
        "",
        "If the file uses CyberHeroImage or LearnHeroImage with a known image slug,",
        "OR uses a one-off inline hero pattern that could be cleanly swapped to",
        "V3/InteriorHero (which exposes props: eyebrow, title, lede, primaryCta?,",
        "breadcrumb, heroImageSlug?, heroImageAlt?), produce a paste-ready ed-style",
        "patch that does the swap.",
        "",
        "If the file uses a composition that V3/InteriorHero can't replicate (custom",
        "interactive elements, multi-column hero, video embed), return 'SKIP' as the",
        "patch field.",
        "",
        "Return RETROFIT_SCHEMA.",
      ].join("\n"),
      {
        label: "retrofit:" + path.split("/").slice(-2).join("/"),
        phase: "Retrofit · 12 interior hero swaps",
        schema: RETROFIT_SCHEMA,
      }
    ).then((r) => ({ path, patch: r?.patch || "SKIP" }))
  )
);

const validRetrofits = retrofits.filter((r) => r.patch && r.patch !== "SKIP");
log("retrofit: " + validRetrofits.length + "/" + INTERIOR_PAGES.length + " patches generated");

// =========================================================================
// PHASE 2 — ATLAS · 2 MISSING PAGES
// =========================================================================
phase("Atlas · 2 missing pages");

const ATLAS_PAGE_SCHEMA = {
  type: "object",
  required: ["tsx"],
  properties: {
    tsx: {
      type: "string",
      description: "Complete app/learn/atlas/{slug}/page.tsx TSX file content. Includes imports, metadata export, default export. Uses LearnHeroImage with an appropriate existing slug from /learn-images/.",
    },
  },
};

const ATLAS_PAGES_TO_WRITE = [
  {
    slug: "world-models",
    brief: "Yann LeCun's JEPA architecture lineage. V-JEPA. Cosmos (NVIDIA). Genie (DeepMind). The case that LLMs aren't enough and we need world models for AGI. Pair with the LeCun camp's public statements + papers.",
  },
  {
    slug: "synthetic-data",
    brief: "Training-data generation via LLMs. Constitutional AI (Anthropic). Self-instruct. Phi-3/Phi-4 (Microsoft, trained on synthetic data). The 'model-collapse' concern (Shumailov 2023). When synthetic data helps + when it poisons. Cited.",
  },
];

const atlasPages = await parallel(
  ATLAS_PAGES_TO_WRITE.map((page, i) => () =>
    agent(
      [
        BRAND,
        "",
        "Write the complete TSX file for app/learn/atlas/" + page.slug + "/page.tsx.",
        "",
        "BRIEF: " + page.brief,
        "",
        "Pattern to follow: existing pages at /learn/atlas/agents, /scaling-laws, /benchmarks.",
        "Use LearnHeroImage with an appropriate slug from public/learn-images/* (atlas-*",
        "or tracker-*). Include metadata export with title + description + canonical.",
        "Include Schema.org Article JSON-LD via dangerouslySetInnerHTML.",
        "",
        "Sections: foundational papers/milestones (4-8 items), how-they-work mechanisms",
        "(4-8), practical implications + caveats, cited sources at the bottom.",
        "",
        "Public info only. Real authors + dates + arXiv URLs. No invented claims.",
        "Lab-grade voice. ~300-500 line file.",
        "",
        "Return ATLAS_PAGE_SCHEMA with the complete TSX in the 'tsx' field.",
      ].join("\n"),
      {
        label: "atlas:" + page.slug,
        phase: "Atlas · 2 missing pages",
        schema: ATLAS_PAGE_SCHEMA,
      }
    ).then((r) => ({ slug: page.slug, tsx: r?.tsx || null }))
  )
);

log("atlas: " + atlasPages.filter((p) => p.tsx).length + "/2 pages authored");

// =========================================================================
// PHASE 3 — CYBER · 30 DEEP-DIVE PAGES (single-key flat schema)
// =========================================================================
phase("Cyber · 30 deep-dive pages");

const CYBER_SLUGS = [
  "ransomware", "social-engineering", "phishing", "cve-explained",
  "zero-days", "insider-threat", "industrial-control-systems",
  "automotive", "medical-devices", "supply-chain-attacks",
  "cloud-security", "container-security", "iot-security",
  "mobile-security", "web-app-vuln-classes", "cryptography-applied",
  "network-protocols-attacks", "wireless-security", "physical-security",
  "osint-defensive", "forensics-digital", "blue-team-careers",
  "red-team-careers", "incident-response", "ctf-competitions",
  "scholarships-and-grants", "internships-and-co-ops",
  "academic-programs", "diversity-in-cyber", "ethics-and-disclosure",
];

const CYBER_PAGE_SCHEMA = {
  type: "object",
  required: ["tsx"],
  properties: {
    tsx: { type: "string", description: "Complete TSX file content for app/learn/cyber/{slug}/page.tsx" },
  },
};

const cyberPages = await parallel(
  CYBER_SLUGS.map((slug, i) => () =>
    agent(
      [
        BRAND,
        "",
        "Write the complete TSX file for app/learn/cyber/" + slug + "/page.tsx.",
        "",
        "TOPIC: " + slug.replace(/-/g, " "),
        "",
        "Pattern: existing pages at /learn/cyber/breaches, /threat-actors, /tools, /heroes.",
        "Use CyberHeroImage with an appropriate slug from public/cyber-images/*.",
        "Include metadata + Article JSON-LD.",
        "",
        "Voice: lab-grade, anti-hype, sourced. PUBLIC INFO ONLY.",
        "  - For threat content: post-disclosure case studies, named tools used",
        "    defensively, CISA/DOJ/FBI/journalism citations.",
        "  - NO operational tradecraft, NO exploit code, NO attack instruction.",
        "  - Defense-focused framing throughout.",
        "  - If the topic risks being too attacker-facing, reframe as defender",
        "    education (e.g. 'social-engineering' = how defenders recognize +",
        "    mitigate, not how attackers do it).",
        "",
        "Sections: brief intro (~200 words), 5-8 substantive sections with",
        "real cited examples + facts, sources list. ~300-500 lines.",
        "",
        "Return CYBER_PAGE_SCHEMA with complete TSX in the 'tsx' field.",
      ].join("\n"),
      {
        label: "cyber:" + slug,
        phase: "Cyber · 30 deep-dive pages",
        schema: CYBER_PAGE_SCHEMA,
      }
    ).then((r) => ({ slug, tsx: r?.tsx || null }))
  )
);

log("cyber: " + cyberPages.filter((p) => p.tsx).length + "/30 pages authored");

// =========================================================================
// PHASE 4 — BRIEF
// =========================================================================
phase("Brief · operator-facing report");

const BRIEF_SCHEMA = {
  type: "object",
  required: ["summary", "shipCommands"],
  properties: {
    summary: { type: "string" },
    shipCommands: {
      type: "string",
      description: "Bash + node commands to materialize the workflow output into the codebase",
    },
  },
};

const tally = {
  retrofitCount: validRetrofits.length,
  atlasPageCount: atlasPages.filter((p) => p.tsx).length,
  cyberPageCount: cyberPages.filter((p) => p.tsx).length,
};

const brief = await agent(
  [
    BRAND,
    "",
    "Workflow result tally:",
    JSON.stringify(tally, null, 2),
    "",
    "Produce a brief (per BRIEF_SCHEMA):",
    "  - 4-6 sentence summary of what landed",
    "  - shipCommands: the exact bash/node commands to materialize the output",
    "    into the codebase (write retrofits, write new pages, build, commit, push,",
    "    deploy).",
  ].join("\n"),
  {
    label: "brief:final",
    phase: "Brief · operator-facing report",
    schema: BRIEF_SCHEMA,
  }
);

return {
  retrofits: validRetrofits,
  atlasPages: atlasPages.filter((p) => p.tsx),
  cyberPages: cyberPages.filter((p) => p.tsx),
  brief,
};
