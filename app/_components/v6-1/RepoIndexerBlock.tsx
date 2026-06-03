/**
 * RepoIndexerBlock — local repo indexer feature section.
 * Server component.
 * Source of truth: docs/RELEASE_NOTES_v6.1.0.md
 */

const STATS = [
  { value: "303",    unit: "files",   caption: "indexed" },
  { value: "1,533",  unit: "symbols", caption: "captured" },
  { value: "6.7s",   unit: "build",   caption: "to index" },
];

const LANGUAGES = [
  { lang: "TypeScript / JS", glyph: "TS" },
  { lang: "Rust",             glyph: "RS" },
  { lang: "Python",           glyph: "PY" },
  { lang: "Go",               glyph: "GO" },
];

const SKIP = ["node_modules", "target", ".git", "binary extensions"];

export function RepoIndexerBlock() {
  return (
    <section className="relative overflow-hidden bg-black py-32">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(45% 45% at 100% 50%, rgba(34,240,213,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-start">

          {/* left: copy */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
              ::repo indexer · local
            </p>
            <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
              Know your codebase.
              <br />
              <span className="text-[#22F0D5]">No vector cloud.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[#9BA5A7]">
              Walks your workspace and captures top-level symbols by language —
              functions, classes, structs, traits, types, impls. Prefix search
              and exact-symbol lookup land in milliseconds. Nothing leaves your
              machine.
            </p>

            {/* big-number stat panel */}
            <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-[#1A2225]">
              {STATS.map((s) => (
                <div key={s.unit} className="bg-[#0A0F11] px-5 py-6 text-center">
                  <p className="font-mono text-3xl font-semibold tabular-nums text-[#22F0D5] md:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-[#22F0D5]">
                    {s.unit}
                  </p>
                  <p className="mt-1 text-xs text-[#6B7779]">{s.caption}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#6B7779]">
              Live benchmark on operator&apos;s NVMe workspace — scripts/ directory.
            </p>

            {/* languages */}
            <div className="mt-8 flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <span
                  key={l.glyph}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5"
                >
                  <span className="font-mono text-[10px] font-semibold text-[#22F0D5]">
                    {l.glyph}
                  </span>
                  <span className="text-xs text-[#9BA5A7]">{l.lang}</span>
                </span>
              ))}
            </div>
          </div>

          {/* right: skip list + v6.2 note */}
          <div className="flex flex-col gap-6 lg:mt-20">
            <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.26em] text-[#6B7779]">
                what it skips
              </p>
              <div className="space-y-2">
                {SKIP.map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#22F0D5]">✗</span>
                    <span className="font-mono text-sm text-[#F2F4F5]">{s}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-[#9BA5A7]">
                Fast keyword and symbol index — covers 80% of what Cursor&apos;s cloud
                index does for navigation and file-relevance ranking.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.26em] text-[#6B7779]">
                v6.2 roadmap
              </p>
              <p className="text-sm leading-relaxed text-[#9BA5A7]">
                Vector embeddings land in v6.2 — sqlite-vec store with
                Voyage/Cohere embeddings. Semantic search, not just keyword.
                This is the foundation layer; it is named, not hidden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
