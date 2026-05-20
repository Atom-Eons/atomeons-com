/**
 * BackgroundJobsBlock — background job queue feature section.
 * Server component.
 * Source of truth: docs/RELEASE_NOTES_v6.1.0.md
 */

type JobState = "RUNNING" | "FINISHED" | "CANCELLED" | "FAILED";

interface Job {
  id: string;
  goal: string;
  state: JobState;
  steps: number;
  started: string;
}

const JOBS: Job[] = [
  {
    id: "a3f9",
    goal: "Find every TODO in scripts/v4 and add a fix-by date.",
    state: "RUNNING",
    steps: 3,
    started: "01:14:22",
  },
  {
    id: "b7c2",
    goal: "Audit all API endpoints for missing auth middleware.",
    state: "FINISHED",
    steps: 11,
    started: "01:09:05",
  },
  {
    id: "c1d8",
    goal: "Generate JSDoc for all exported functions in lib/.",
    state: "CANCELLED",
    steps: 5,
    started: "00:58:41",
  },
  {
    id: "d4e0",
    goal: "Refactor vault-search to use async iterators.",
    state: "FAILED",
    steps: 2,
    started: "00:47:19",
  },
];

const STATE_STYLES: Record<JobState, { pill: string; dot: string; pulse: boolean }> = {
  RUNNING:   { pill: "border-[#22F0D5]/40 bg-[#22F0D5]/10 text-[#22F0D5]",  dot: "bg-[#22F0D5]", pulse: true  },
  FINISHED:  { pill: "border-[#22F0D5]/20 bg-[#22F0D5]/5 text-[#22F0D5]/70", dot: "bg-[#22F0D5]/60", pulse: false },
  CANCELLED: { pill: "border-[#1A2225] bg-[#1A2225] text-[#6B7779]",         dot: "bg-[#6B7779]", pulse: false },
  FAILED:    { pill: "border-[#FF7A1A]/40 bg-[#FF7A1A]/10 text-[#FF7A1A]",  dot: "bg-[#FF7A1A]", pulse: false },
};

export function BackgroundJobsBlock() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F11] py-32">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 100%, rgba(255,122,26,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-start">

          {/* left: copy */}
          <div className="lg:sticky lg:top-24">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
              ::background queue · codex-parallel
            </p>
            <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
              Spawn the work.
              <br />
              <span className="text-[#FF7A1A]">Walk away. Read the receipt.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[#9BA5A7]">
              In-process job queue. LRU eviction at 100. Cancel tokens per job.
              Live log buffer capped at 500 events. Finish receipts on every
              terminal state — success, cancel, or error.
            </p>

            <ul className="mt-8 space-y-3 font-mono text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-[#22F0D5]">·</span>
                <span className="text-[#9BA5A7]">
                  LRU 100 — queue never bloats
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-[#22F0D5]">·</span>
                <span className="text-[#9BA5A7]">
                  Cancel tokens — interrupt mid-flight, not mid-write
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-[#22F0D5]">·</span>
                <span className="text-[#9BA5A7]">
                  500-event log buffer per job — always have the last 500 steps
                </span>
              </li>
            </ul>

            <p className="mt-10 text-sm leading-relaxed text-[#6B7779]">
              Foundation for v6.2&apos;s parallel-task UI — spawn N concurrent agents
              on a PR, render a grid. For v6.1.0, the AGENT lane uses it to
              show the recent-history list and cancel mid-flight.
            </p>
          </div>

          {/* right: job table mock */}
          <div className="overflow-hidden rounded-2xl border border-[#1A2225] bg-black">
            {/* header */}
            <div className="border-b border-[#1A2225] px-5 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                agent jobs · recent 20 · lru
              </span>
            </div>

            {/* column headers */}
            <div className="hidden border-b border-[#1A2225] px-5 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#6B7779] sm:grid sm:grid-cols-[60px_1fr_90px_50px]">
              <span>job id</span>
              <span>goal</span>
              <span className="text-center">state</span>
              <span className="text-right">steps</span>
            </div>

            {/* job rows */}
            <div className="divide-y divide-[#1A2225]">
              {JOBS.map((job) => {
                const s = STATE_STYLES[job.state];
                return (
                  <div
                    key={job.id}
                    className="flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-[#0A0F11]/80 sm:grid sm:grid-cols-[60px_1fr_90px_50px] sm:items-center sm:gap-4"
                  >
                    <span className="font-mono text-xs text-[#6B7779]">
                      #{job.id}
                    </span>
                    <span className="text-sm text-[#F2F4F5] line-clamp-1">
                      {job.goal}
                    </span>
                    <span className="flex justify-start sm:justify-center">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] ${s.pill}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${s.dot} ${s.pulse ? "animate-pulse" : ""}`}
                        />
                        {job.state}
                      </span>
                    </span>
                    <span className="font-mono text-xs tabular-nums text-[#9BA5A7] sm:text-right">
                      {job.steps}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* footer */}
            <div className="border-t border-[#1A2225] bg-black/40 px-5 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                every job emits a receipt on finish — provable runs only
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
