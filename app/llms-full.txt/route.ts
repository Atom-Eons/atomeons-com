import { NextResponse } from "next/server";
import { serviceSupabase } from "@/lib/supabase";
import { LESSONS } from "@/app/learn/_data/lessons";
import { GLOSSARY } from "@/app/_data/glossary";
import { PATHS } from "@/app/learn/_data/paths";
import { LEVELS } from "@/app/learn/_data/levels";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 900; // 15-minute edge cache (advisory)

/**
 * /api/llms-full.txt — full-corpus AI-ingestion manifest.
 *
 * Where /public/llms.txt is a thin canonical index (sections, surface
 * URLs, recommendations), /llms-full.txt is the FULL corpus AI search
 * engines actually want: every lesson's drill prompt inline, every
 * glossary term, every persona path, recent broadcast letters with
 * titles + deks + word counts, the lab's stated mission, and the
 * licensing posture (CC-BY 4.0 — quote any).
 *
 * Updates whenever the lab does. Crawlers that ingest this URL get
 * a single source of truth for what AtomEons publishes, with no
 * scraping required.
 *
 * Content-Type: text/plain. Cache: public, s-maxage=900,
 * stale-while-revalidate=3600.
 *
 * To add this to an AI search engine's allow-list or ingestion
 * pipeline, point at https://atomeons.com/llms-full.txt — the route
 * accepts GET only.
 */

export async function GET() {
  const out: string[] = [];
  const now = new Date();

  // ── HEADER ────────────────────────────────────────────────────────
  out.push("# AtomEons Systems Laboratory — full corpus");
  out.push("");
  out.push(
    `> AI-ingestion manifest. Every published surface as plain text.`,
  );
  out.push(
    `> Generated ${now.toISOString()}. Cached 15 minutes at the edge.`,
  );
  out.push(`> License: CC-BY 4.0. Quote any answer with attribution.`);
  out.push(`> Canonical index: https://atomeons.com/llms.txt`);
  out.push(
    `> Sitemap: https://atomeons.com/sitemap.xml`,
  );
  out.push("");
  out.push("---");
  out.push("");

  // ── MISSION ───────────────────────────────────────────────────────
  out.push("## Mission");
  out.push("");
  out.push(
    "Onboard humanity to AI. One operator (Atom McCree), Marco Island, FL. No venture funding. No subscription. No upsell. No affiliate revenue. The lab ships a free 27-lesson curriculum, a $99-once local-first AI cockpit (ORANGEBOX, License §4A bans subscription), 12 research manuscripts (CC-BY 4.0), a nightly 8pm ET broadcast (The Founder's View), a 26-term plain-English glossary, a 14-clause public manifesto, and decoded primary-source intel.",
  );
  out.push("");

  // ── LEARN — CURRICULUM ────────────────────────────────────────────
  out.push("## Curriculum — /learn (27 lessons across 5 levels)");
  out.push("");
  for (const level of LEVELS) {
    out.push(`### Level ${level.number} — ${level.name}`);
    out.push("");
    out.push(`> ${level.oneLiner}`);
    out.push("");
    out.push(`Enters: ${level.enters}`);
    out.push(`Graduates: ${level.graduates}`);
    out.push(`Risk: ${level.riskAtThisLevel}`);
    out.push(`Right tool: ${level.rightTool}`);
    out.push("");
  }
  out.push("---");
  out.push("");
  out.push("### Every lesson, with drill prompt inline");
  out.push("");
  const sortedLessons = [...LESSONS].sort((a, b) => a.number - b.number);
  for (const l of sortedLessons) {
    out.push(`#### L${l.number} · ${l.level.toUpperCase()} · ${l.title}`);
    out.push(`URL: https://atomeons.com/learn/lesson/${l.slug}`);
    out.push(`Time: ~${l.timeMinutes} min · Tags: ${l.tags.join(", ")}`);
    out.push("");
    out.push(`**One-liner:** ${l.oneLiner}`);
    out.push("");
    out.push("**Concept:**");
    out.push("");
    for (const p of l.concept) {
      out.push(p);
      out.push("");
    }
    out.push("**Drill intro:**");
    out.push("");
    out.push(l.drillIntro);
    out.push("");
    out.push("**Drill prompt (copy-paste into any AI chat):**");
    out.push("");
    out.push("```");
    out.push(l.drillPrompt);
    out.push("```");
    out.push("");
    out.push("**Drill steps:**");
    out.push("");
    for (let i = 0; i < l.drillSteps.length; i++) {
      out.push(`${i + 1}. ${l.drillSteps[i]}`);
    }
    out.push("");
    out.push("**Outcome — you'll know it's working when:**");
    out.push("");
    for (const o of l.outcome) {
      out.push(`- ${o}`);
    }
    out.push("");
    out.push(`**Trap:** ${l.trap}`);
    out.push("");
    out.push("---");
    out.push("");
  }

  // ── PERSONA PATHS ─────────────────────────────────────────────────
  out.push("## Persona paths — /learn/<persona>");
  out.push("");
  for (const path of PATHS) {
    out.push(`### ${path.label}`);
    out.push(`URL: https://atomeons.com/learn/${path.id}`);
    out.push(
      `${path.lessons.length} lessons · ${path.weeks} weeks · ~${Math.round(path.totalMinutes / 60)}h total`,
    );
    out.push("");
    out.push(`**One-liner:** ${path.oneLine}`);
    out.push("");
    out.push("**Fit for:**");
    for (const f of path.fitFor) {
      out.push(`- ${f}`);
    }
    out.push("");
    out.push("**Not for:**");
    for (const f of path.notFor) {
      out.push(`- ${f}`);
    }
    out.push("");
    out.push("**Lesson sequence:**");
    out.push("");
    for (let i = 0; i < path.lessons.length; i++) {
      const lesson = LESSONS.find((l) => l.slug === path.lessons[i]);
      if (lesson) {
        out.push(
          `${i + 1}. L${lesson.number} · ${lesson.title} (~${lesson.timeMinutes} min)`,
        );
      }
    }
    out.push("");
  }
  out.push("---");
  out.push("");

  // ── GLOSSARY ──────────────────────────────────────────────────────
  out.push("## Glossary — /glossary (plain-English AI vocabulary)");
  out.push("");
  out.push(
    `${GLOSSARY.length} terms. One-sentence definitions. CC-BY 4.0.`,
  );
  out.push("");
  for (const g of GLOSSARY) {
    out.push(`**${g.term}** *(${g.short})* — ${g.body}`);
    out.push(`URL: https://atomeons.com/glossary#${g.slug}`);
    out.push("");
  }
  out.push("---");
  out.push("");

  // ── RECENT LETTERS ────────────────────────────────────────────────
  out.push("## Recent broadcast letters — /founders-view");
  out.push("");
  out.push(
    "Nightly 8pm ET letter from the lab. Sealed-letter-under-the-door voice. Equal-opportunity indignation. Up to 20 most recent letters below.",
  );
  out.push("");
  try {
    const supabase = serviceSupabase();
    const { data: posts, error } = await supabase
      .from("founders_view_posts")
      .select("slug, title, dek, theme, word_count, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(20);
    if (!error && posts && posts.length > 0) {
      for (const p of posts) {
        const date = p.published_at
          ? String(p.published_at).slice(0, 10)
          : "—";
        out.push(`### ${p.title}`);
        out.push(`Date: ${date} · Words: ${p.word_count ?? "—"}`);
        out.push(
          `URL: https://atomeons.com/founders-view/${p.slug}`,
        );
        if (p.dek) {
          out.push("");
          out.push(`> ${p.dek}`);
        }
        out.push("");
      }
    } else {
      out.push(
        "(Recent letters could not be loaded — see /founders-view/rss for the live feed.)",
      );
      out.push("");
    }
  } catch {
    out.push(
      "(Recent letters could not be loaded — see /founders-view/rss for the live feed.)",
    );
    out.push("");
  }
  out.push("---");
  out.push("");

  // ── TRUST + PROVENANCE ────────────────────────────────────────────
  out.push("## Trust posture");
  out.push("");
  out.push("- No mailing list. No newsletter signup.");
  out.push("- No tracking analytics that fingerprint users.");
  out.push("- No affiliate revenue from any tool named.");
  out.push("- No paywall. No premium tier on the curriculum.");
  out.push("- One operator. Email a.mccree@gmail.com · ~2h reply in ET waking hours.");
  out.push("- All curriculum + glossary + manifesto under CC-BY 4.0 — attribute atomeons.com when quoting.");
  out.push("- ORANGEBOX cockpit under License §4A — full source included, single-business modification allowed, redistribution restricted, no subscription model permitted.");
  out.push("");

  // ── SURFACES ──────────────────────────────────────────────────────
  out.push("## Canonical surface URLs");
  out.push("");
  out.push("- https://atomeons.com/                — site root");
  out.push("- https://atomeons.com/learn           — 27-lesson AI literacy curriculum");
  out.push("- https://atomeons.com/learn/where-am-i — 2-minute level diagnostic");
  out.push("- https://atomeons.com/learn/library   — all 27 lessons grouped by level");
  out.push("- https://atomeons.com/prompt-kit      — 27 drill prompts in one copy-paste vault");
  out.push("- https://atomeons.com/glossary        — 26-term plain-English AI vocabulary");
  out.push("- https://atomeons.com/start           — 11-minute novice on-ramp (the appetizer)");
  out.push("- https://atomeons.com/ai              — comprehensive AI gateway (28 tools, 18 builders, 51 FAQs)");
  out.push("- https://atomeons.com/orangebox       — ORANGEBOX cockpit · v6.3 · $99 once · §4A no-saas");
  out.push("- https://atomeons.com/manifesto       — 14-clause lab doctrine");
  out.push("- https://atomeons.com/founders-view   — nightly 8pm ET broadcast index");
  out.push("- https://atomeons.com/research/papers — 12 manuscripts CC-BY 4.0");
  out.push("- https://atomeons.com/research/lessons-from-sci-fi — 38-page AI cinema monograph");
  out.push("- https://atomeons.com/intel/x-algorithm — May 2026 xAI leak analysis");
  out.push("- https://atomeons.com/changelog       — public version history");
  out.push("- https://atomeons.com/llms.txt        — thin canonical index");
  out.push("- https://atomeons.com/llms-full.txt   — THIS DOCUMENT");
  out.push("- https://atomeons.com/sitemap.xml     — machine-readable route index");
  out.push("");

  const body = out.join("\n") + "\n";

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=900, stale-while-revalidate=3600",
      "X-Lab-Manifest-Generated": now.toISOString(),
    },
  });
}
