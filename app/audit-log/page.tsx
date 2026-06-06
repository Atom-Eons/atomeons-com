import type { Metadata } from "next";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

export const metadata: Metadata = {
  title: "Audit log · every commit · every deploy · AtomEons",
  description:
    "Public git history of atomeons.com. Every shipped commit · every author · every change. The audit trail behind /receipts.",
  alternates: { canonical: "https://atomeons.com/audit-log" },
};

export const dynamic = "force-static";
export const revalidate = 3600;

/**
 * /audit-log — public commit history.
 *
 * Reads the most recent git log at build time and renders it as the
 * audit trail. No external auth · no GitHub roundtrip. The commit
 * SHA is the receipt; the message is the operator's note.
 *
 * Per operator brief: "we need a big dog update." This is the
 * audit-log surface that makes /receipts independently verifiable
 * by anyone with a git client.
 */

type Commit = {
  sha: string;
  shortSha: string;
  date: string;
  subject: string;
  author: string;
};

function loadCommits(): Commit[] {
  // First try a pre-built JSON file (in case build env can't run git)
  try {
    const p = path.join(process.cwd(), "public", "audit-log.json");
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, "utf8");
      return JSON.parse(raw) as Commit[];
    }
  } catch {}
  // Fall back to live `git log` at build time
  try {
    const out = execSync(
      `git log -n 200 --pretty=format:"%H|%cI|%s|%an" --date=iso-strict`,
      { encoding: "utf8", cwd: process.cwd() },
    );
    return out
      .split("\n")
      .filter((l) => l.trim().length > 0)
      .map((l) => {
        const [sha, date, subject, author] = l.split("|");
        return {
          sha: sha ?? "",
          shortSha: (sha ?? "").slice(0, 8),
          date: date ?? "",
          subject: subject ?? "",
          author: author ?? "",
        };
      });
  } catch {
    return [];
  }
}

function groupByDay(commits: Commit[]): Map<string, Commit[]> {
  const out = new Map<string, Commit[]>();
  for (const c of commits) {
    const day = (c.date || "").slice(0, 10);
    if (!day) continue;
    if (!out.has(day)) out.set(day, []);
    out.get(day)!.push(c);
  }
  return out;
}

export default function AuditLogPage() {
  const commits = loadCommits();
  const grouped = groupByDay(commits);
  const days = Array.from(grouped.keys()).sort().reverse();
  const repo = "github.com/Atom-Eons/atomeons-com";

  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ audit log · every commit · build-time fresh</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The audit trail behind every claim.
          </h1>
          <p className="speakable-answer mt-6 max-w-3xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The lab's git history made public. Every commit · every
            author · every subject line. Cross-reference with
            /receipts to verify any claim. The repository is
            <a href={`https://${repo}`} target="_blank" rel="noopener" className="mx-1 font-mono text-[16px] text-[#22F0D5] hover:underline">{repo}</a>
            · any clone reproduces exactly this list.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">commits indexed · {commits.length}</p>
            <span className="text-[#1F242B]">·</span>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">days · {days.length}</p>
            <span className="text-[#1F242B]">·</span>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">latest · {commits[0]?.date.slice(0, 10) ?? "—"}</p>
          </div>
        </div>
      </section>

      {commits.length === 0 ? (
        <section>
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <p className="font-serif text-[15px] italic text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              No commits indexed at build time. Either the build environment
              has no git history available, or the audit-log.json pre-build
              step hasn't run yet. Try the source repository directly:{" "}
              <a href={`https://${repo}`} target="_blank" rel="noopener" className="text-[#22F0D5] hover:underline">{repo}</a>
            </p>
          </div>
        </section>
      ) : (
        days.map((day) => {
          const items = grouped.get(day)!;
          return (
            <section key={day} className="border-b border-[#1F242B]">
              <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
                <div className="grid gap-8 md:grid-cols-[140px_1fr]">
                  <div>
                    <p className="sticky top-24 font-mono text-[22px] tabular-nums text-[#22F0D5]">{day}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">{items.length} commit{items.length > 1 ? "s" : ""}</p>
                  </div>
                  <ol className="space-y-4">
                    {items.map((c) => (
                      <li key={c.sha} className="border-l border-[#1F242B] pl-5">
                        <div className="flex flex-wrap items-baseline gap-3">
                          <a
                            href={`https://${repo}/commit/${c.sha}`}
                            target="_blank"
                            rel="noopener"
                            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#22F0D5] hover:underline"
                          >
                            {c.shortSha}
                          </a>
                          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
                            {c.date.slice(11, 19) || ""}
                          </p>
                          {c.author && c.author !== "Atom McCree" ? (
                            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">{c.author}</p>
                          ) : null}
                        </div>
                        <p className="mt-2 font-serif text-[15px] leading-[1.5] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                          {c.subject}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>
          );
        })
      )}

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="border-l-2 border-[#22F0D5] bg-[#0B0C0F] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ how to verify any commit yourself</p>
            <pre className="mt-4 overflow-x-auto border border-[#1F242B] bg-[#08090B] p-4 font-mono text-[12px] leading-[1.6] text-[#F4F4F2]">{`git clone https://${repo}
cd atomeons-com
git log --oneline -n 50

# Verify a specific commit's diff:
git show <shortSha>`}</pre>
            <p className="mt-4 font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              The commit SHA on this page is the same SHA on GitHub.
              The diffs are the same. The audit trail is reproducible
              by anyone with a git client. No special access required.
            </p>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-4">
            {[
              { href: "/receipts", label: "Receipts ledger" },
              { href: "/transparency", label: "Financial transparency" },
              { href: "/trust", label: "Trust posture" },
              { href: "/timeline", label: "Ship timeline · narrative" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[15px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
