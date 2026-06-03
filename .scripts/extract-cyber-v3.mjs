import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const PATH = "C:/Users/a/AppData/Local/Temp/claude/C--AtomEons--claude-worktrees-bold-leakey-4470e8/36c5895e-6dd9-41db-9f77-29d3975f016f/tasks/wcaa91nf1.output";

const raw = readFileSync(PATH, "utf8");
const outer = JSON.parse(raw);
const result = outer.result || outer;
const pages = result.pages || [];

console.log(`Total agent results: ${pages.length}`);

const valid = [];
const failed = [];
for (let i = 0; i < pages.length; i++) {
  const text = pages[i];
  if (typeof text !== "string") {
    failed.push({ index: i, reason: "non-string result" });
    continue;
  }
  if (text.startsWith("API Error") || text.startsWith("Error:")) {
    failed.push({ index: i, reason: text.slice(0, 80) });
    continue;
  }
  // Parse the markdown structure
  const slugMatch = text.match(/^#\s*SLUG:\s*(\S+)/m);
  const titleMatch = text.match(/^#\s*TITLE:\s*(.+)$/m);
  const subtitleMatch = text.match(/^#\s*SUBTITLE:\s*(.+)$/m);
  const ledeMatch = text.match(/^#\s*LEDE:\s*(.+)$/m);
  if (!slugMatch || !titleMatch) {
    failed.push({ index: i, reason: "missing SLUG or TITLE header" });
    continue;
  }
  // Find body — everything after the LEDE line or first ## header
  const bodyStart = text.indexOf("\n## ");
  const body = bodyStart >= 0 ? text.slice(bodyStart + 1) : "";
  valid.push({
    slug: slugMatch[1].trim(),
    title: titleMatch[1].trim(),
    subtitle: subtitleMatch ? subtitleMatch[1].trim() : "",
    lede: ledeMatch ? ledeMatch[1].trim() : "",
    body,
  });
}

console.log(`Valid pages: ${valid.length}`);
console.log(`Failed: ${failed.length}`);
for (const f of failed) console.log(`  [${f.index}] ${f.reason}`);
console.log("");
console.log("Valid slugs:");
for (const v of valid) console.log(`  - ${v.slug}: ${v.title}`);

const ACCENT = "#22F0D5";

function mdSectionsToJsx(body) {
  // Split on ## headers, render each as a section
  const parts = body.split(/\n## /).filter(Boolean);
  return parts.map((part, i) => {
    const lines = part.split("\n");
    const heading = i === 0 && !part.startsWith("##") ? lines[0].replace(/^##\s*/, "") : lines[0];
    const content = lines.slice(1).join("\n").trim();
    // Escape for JSX literal: backticks + ${
    const escapedHeading = heading.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    const escapedContent = content.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
    return { heading: escapedHeading, content: escapedContent };
  });
}

function buildTsx(page) {
  const sections = mdSectionsToJsx(page.body);
  const heroSlug = {
    "ot-ics": "platforms",
    "mobile-security": "labs",
    "ransomware": "cyberwar",
    "social-engineering": "hackerone",
    "incident-response": "ai-security",
    "zero-days": "modern",
    "blue-team": "serve",
    "red-team": "path",
    "supply-chain": "platforms",
    "cloud-security": "cyber-index",
    "iot-embedded": "modern",
    "open-source": "labs",
  }[page.slug] || "cyber-index";

  const heroAlt = page.subtitle.replace(/"/g, "\\\"");

  return `import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

export const metadata: Metadata = {
  title: ${JSON.stringify(page.title + " · /learn/cyber/" + page.slug + " · AtomEons")},
  description: ${JSON.stringify(page.lede || page.subtitle || page.title)},
  alternates: { canonical: ${JSON.stringify("https://atomeons.com/learn/cyber/" + page.slug)} },
  openGraph: {
    title: ${JSON.stringify(page.title)},
    description: ${JSON.stringify(page.subtitle)},
    url: ${JSON.stringify("https://atomeons.com/learn/cyber/" + page.slug)},
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

export default function Page() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug=${JSON.stringify(heroSlug)} alt=${JSON.stringify(heroAlt)} />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> ${page.title}
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            ${JSON.stringify(page.subtitle).slice(1, -1)}
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            ${JSON.stringify(page.title).slice(1, -1)}
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            ${JSON.stringify(page.lede).slice(1, -1)}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-14">
${sections
  .map(
    (s, i) => `          <article key={${i}}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {${JSON.stringify(String(i + 1).padStart(2, "0"))}}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {\`${s.heading}\`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {\`${s.content}\`}
            </div>
          </article>`,
  )
  .join("\n\n")}
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn/cyber" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
            ← cyber index
          </Link>
        </div>
      </section>
    </main>
  );
}
`;
}

const ROOT = resolve("app/learn/cyber");
let written = 0;
for (const page of valid) {
  const filePath = resolve(ROOT, page.slug, "page.tsx");
  if (existsSync(filePath)) {
    console.log(`  skip ${page.slug} — exists`);
    continue;
  }
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, buildTsx(page), "utf8");
  console.log(`  ok ${page.slug}`);
  written++;
}
console.log("");
console.log(`Wrote ${written} page(s).`);
