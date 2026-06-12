"use client";

import { useState, useRef } from "react";
import Link from "next/link";

/**
 * AskBar — natural-language Q&A surface backed by /api/ask.
 *
 * Sits inside the global ⌘K palette + the inline SearchBar. When the
 * user types a query that looks like a question (starts with "what"
 * "how" "why" "where" etc OR ends with "?") the surface offers an
 * "Ask the lab" button. Clicking it POSTs to /api/ask which:
 *   - embeds the query via Gemini gemini-embedding-001 (768-dim)
 *   - retrieves top-5 most-similar chunks from public/vector-index.json
 *   - bundles them into a Gemini Pro generative call
 *   - returns a synthesized answer + cited sources
 *
 * This component is the inline UI for that endpoint. Stand-alone use
 * is fine too — drop <AskBar /> on any page and it works.
 */

type AskSource = {
  route: string;
  title: string;
  section: string;
  similarity: number;
};

type AskResponse = {
  ok: boolean;
  query: string;
  answer: string;
  sources: AskSource[];
  index_built: string;
  index_count: number;
};

export function AskBar({
  initialQuery,
  compact,
}: {
  initialQuery?: string;
  compact?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<AskResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function ask(q: string) {
    if (!q.trim() || loading) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q.trim(), k: 5 }),
      });
      const data = (await res.json()) as AskResponse & { error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || `Server returned ${res.status}`);
      }
      setAnswer(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    ask(query);
  }

  return (
    <section
      data-component="ask-bar"
      className={
        compact
          ? "w-full"
          : "mx-auto w-full max-w-4xl border border-[#1F242B] bg-[#0F1114] p-6 md:p-8"
      }
    >
      <form onSubmit={onSubmit}>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
          Ask the lab · semantic search · Gemini-powered
        </p>
        <p
          className="mt-3 font-serif text-[15px] italic leading-[1.5] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Type any question about the lab's 256 routes. The site indexes
          itself with vector embeddings and Gemini synthesizes a cited
          answer from the closest passages.
        </p>

        <div className="mt-6 flex items-stretch gap-3 border border-[#1F242B] bg-[#08090B] px-4 py-2 focus-within:border-[#22F0D5] transition-colors">
          <span aria-hidden className="flex items-center text-[#7a818a]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. what does the lab say about prompt injection defenses"
            autoComplete="off"
            spellCheck={false}
            disabled={loading}
            aria-label="Ask the lab"
            className="flex-1 bg-transparent py-3 font-sans text-[15px] text-[#F4F4F2] placeholder:text-[#7a818a] focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="self-stretch border-l border-[#1F242B] pl-4 pr-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition-opacity disabled:opacity-40"
          >
            {loading ? "thinking…" : "ask →"}
          </button>
        </div>

        {/* example prompts shown only before first query */}
        {!answer && !loading && !error ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "what does the lab say about prompt injection",
              "how does ORANGEBOX compress context",
              "compare claude opus and gemini for reasoning",
              "what is mechanistic interpretability",
            ].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setQuery(s);
                  inputRef.current?.focus();
                }}
                className="border border-[#1F242B] bg-[#08090B] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
              >
                {s}
              </button>
            ))}
          </div>
        ) : null}
      </form>

      {error ? (
        <div className="mt-6 border-l-2 border-[#FF4D4D] bg-[#0B0C0F] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">
            Ask failed
          </p>
          <p className="mt-2 font-serif text-[15px] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            {error}
          </p>
        </div>
      ) : null}

      {answer ? (
        <div className="mt-6 border-l-2 border-[#22F0D5] bg-[#0B0C0F] p-5 md:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            Gemini answer · grounded in {answer.sources.length} of {answer.index_count} indexed chunks · built {answer.index_built}
          </p>
          <p
            className="mt-4 font-serif text-[17px] leading-[1.55] text-[#F4F4F2]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            {answer.answer}
          </p>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">Sources</p>
          <ul className="mt-3 space-y-2">
            {answer.sources.map((s, i) => (
              <li key={s.route + ":" + i} className="flex flex-wrap items-baseline justify-between gap-4 border-t border-[#1F242B] pt-2">
                <div className="flex flex-col gap-1">
                  <Link
                    href={s.route}
                    className="font-serif text-[15px] text-[#F4F4F2] hover:text-[#22F0D5]"
                    style={{ fontFamily: "Newsreader, Georgia, serif" }}
                  >
                    {s.title}
                  </Link>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                    atomeons.com{s.route}
                  </p>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]">
                  match {(s.similarity * 100).toFixed(1)}%
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[#1F242B] pt-4">
            <button
              type="button"
              onClick={() => {
                setAnswer(null);
                setQuery("");
                inputRef.current?.focus();
              }}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF] underline decoration-[#1F242B] underline-offset-4 transition-colors hover:text-[#22F0D5] hover:decoration-[#22F0D5]"
            >
              Ask another
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
              The model only saw the passages above. If an answer feels incomplete, follow a source for more context.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
