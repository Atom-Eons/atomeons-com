/**
 * TheCrews — multi-agent inside the cockpit.
 *
 * v6.3 ships with departmental crews — small focused agent teams that
 * handle distinct lanes of work. The visitor sees the department NAMES
 * (already public in llms.txt) but never sees the model-assignment map,
 * trust-gradient tiers, or per-dept budget allocator math.
 *
 * Concept-level only. No AE# enumeration if it can be avoided. No model
 * names attached to departments. No cost figures. The page surfaces the
 * existence of departmental work — the operator understands what kind
 * of help the cockpit can dispatch.
 */

const DEPARTMENTS: { name: string; role: string }[] = [
  { name: "Product", role: "specs, acceptance criteria, scoping" },
  { name: "Research", role: "docs, market, current state of the world" },
  { name: "Design", role: "UX, UI, design systems, visual QA" },
  { name: "Marketing", role: "copy, SEO, brand voice, campaign" },
  { name: "Sales", role: "pricing, checkout, funnel, conversion" },
  { name: "Code", role: "build, test, review, secure" },
  { name: "Review", role: "adversarial review, ship/no-ship gate" },
  { name: "Launch", role: "deploy, smoke test, DNS, monitoring" },
  { name: "Legal", role: "terms, privacy, license, compliance" },
  { name: "Ops", role: "cost, routing, session persistence" },
  { name: "Security", role: "secrets, permissions, trust boundaries" },
  { name: "Data", role: "analytics, ETL, lakehouse work" },
  { name: "Automation", role: "n8n workflows, scheduled tasks" },
  { name: "Bench", role: "verification, benchmarks, regression detection" },
];

export function TheCrews() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::THE DEPARTMENTS
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            Not just agents.
            <br />
            <span className="text-[#FF7A1A]">Departments.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
            v6.3 dispatches work through fourteen focused crews — each one
            owns a lane, each one earns its trust gradient over time, each
            one stays on its budget cap. You name the goal. The cockpit
            routes the work. The right department picks it up.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#1A2225] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DEPARTMENTS.map((d, idx) => (
            <div
              key={d.name}
              className="group flex flex-col gap-2 bg-[#0A0F11] p-6 transition-colors hover:bg-[#101A1C]"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-medium text-[#F2F4F5]">
                  {d.name}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]/60">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#9BA5A7]">
                {d.role}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              ::TRUST GRADIENT
            </p>
            <h3 className="mt-3 text-xl font-medium text-[#F2F4F5]">
              Earned, not granted.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
              Every department starts as an advisor — recommends, never
              mutates. It earns the right to mutate its own surface only
              after a run of clean receipts. Production deploy authority is
              earned separately. The operator confirms every promotion.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]">
              ::HUMAN FINAL STOP
            </p>
            <h3 className="mt-3 text-xl font-medium text-[#F2F4F5]">
              The operator always wins.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
              No department, no crew, no autonomous lane bypasses the
              operator. Every restricted operation routes to a confirmation.
              Every promotion to higher trust requires an operator gesture.
              The cockpit is yours. The departments work for you, not
              instead of you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
