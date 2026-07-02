export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * /api/stars · Wave 143g · 2026-07-02
 *
 * Aggregate GitHub star count across every public AtomEons repo. One
 * cheap client-side call for a "how much traction does this lab have"
 * signal without letting each visitor hit the GitHub API themselves.
 * Cached at the edge for 5 minutes so we stay well under GitHub's
 * unauth rate limit (60/hr per IP for the origin edge; 5000/hr if a
 * PAT is set as GITHUB_TOKEN env var).
 *
 * Response format:
 *   {
 *     ok: true,
 *     total: 12,
 *     generated_at: "2026-07-02T...",
 *     repos: [{ full_name, url, stars, description, tag }, ...],
 *     next_refresh_after: "2026-07-02T..."
 *   }
 */

const REPOS = [
  "Atom-Eons/atomeons-com",
  "Atom-Eons/Orange3",
  "AtomEons/i-am-ai",
  "AtomEons/i-am-ai-audiobook",
  "AtomEons/BookMaker",
  "AtomEons/ORANGEBOX",
  "AtomEons/heretic",
  "AtomEons/multica",
  "AtomEons/osiris",
  "AtomEons/arc-agi-3-misfit-agent",
  "AtomEons/colab",
];

type RepoResult = {
  full_name: string;
  url: string;
  stars: number;
  description: string | null;
  forks: number;
  open_issues: number;
  updated_at: string | null;
  ok: boolean;
};

async function fetchRepo(fullName: string): Promise<RepoResult> {
  const url = `https://api.github.com/repos/${fullName}`;
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "atomeons-stars-aggregator/1.0",
    };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(url, {
      headers,
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      return {
        full_name: fullName,
        url: `https://github.com/${fullName}`,
        stars: 0,
        description: null,
        forks: 0,
        open_issues: 0,
        updated_at: null,
        ok: false,
      };
    }
    const data = (await res.json()) as Record<string, unknown>;
    return {
      full_name: fullName,
      url: `https://github.com/${fullName}`,
      stars: typeof data.stargazers_count === "number" ? data.stargazers_count : 0,
      description: typeof data.description === "string" ? data.description : null,
      forks: typeof data.forks_count === "number" ? data.forks_count : 0,
      open_issues: typeof data.open_issues_count === "number" ? data.open_issues_count : 0,
      updated_at: typeof data.updated_at === "string" ? data.updated_at : null,
      ok: true,
    };
  } catch {
    return {
      full_name: fullName,
      url: `https://github.com/${fullName}`,
      stars: 0,
      description: null,
      forks: 0,
      open_issues: 0,
      updated_at: null,
      ok: false,
    };
  }
}

export async function GET() {
  const results = await Promise.all(REPOS.map(fetchRepo));
  const total = results.reduce((n, r) => n + r.stars, 0);
  const now = new Date();
  const nextRefresh = new Date(now.getTime() + 300 * 1000);

  const payload = {
    ok: true,
    total,
    total_forks: results.reduce((n, r) => n + r.forks, 0),
    total_open_issues: results.reduce((n, r) => n + r.open_issues, 0),
    repo_count: results.length,
    generated_at: now.toISOString(),
    next_refresh_after: nextRefresh.toISOString(),
    repos: results.sort((a, b) => b.stars - a.stars),
    notes: {
      cache: "public, s-maxage=300, stale-while-revalidate=1800",
      source: "GitHub REST v2022-11-28",
      auth: process.env.GITHUB_TOKEN ? "authenticated (higher rate limit)" : "unauthenticated (60/hr per edge IP)",
    },
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800",
    },
  });
}
