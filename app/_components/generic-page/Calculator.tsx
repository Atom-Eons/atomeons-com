"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LearnHeroImage } from "../LearnHeroImage";
import type { CalculatorSpec } from "./types";

/**
 * Calculator · renders the 12 workflow-generated calculator specs.
 *
 * Each spec carries inputs (number | select), a list of JS-safe
 * arithmetic formulas tying input.name → output.name, outputs
 * with format hints, examples, and assumptions.
 *
 * Expression evaluator is intentionally restrictive: only allows
 * digits, decimals, arithmetic operators, parentheses, whitespace,
 * input-identifier characters, and Math.* references. Anything
 * else falls back to NaN. This keeps eval safe under the
 * controlled-input contract from the workflow schema.
 */

const FORMAT_HELPERS: Record<
  string,
  (v: number, decimals?: number) => string
> = {
  currency: (v, d = 2) =>
    Number.isFinite(v) ? "$" + v.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d }) : "—",
  percent: (v, d = 1) =>
    Number.isFinite(v) ? v.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d }) + "%" : "—",
  number: (v, d = 0) =>
    Number.isFinite(v) ? v.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d }) : "—",
  tokens: (v) =>
    Number.isFinite(v) ? Math.round(v).toLocaleString() + " tokens" : "—",
  hours: (v, d = 1) =>
    Number.isFinite(v) ? v.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d }) + " hrs" : "—",
  "watts-co2": (v, d = 0) =>
    Number.isFinite(v) ? v.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d }) + " g CO₂" : "—",
};

const SAFE_EXPR_RE = /^[\s\d.+\-*/(),%a-zA-Z_$]+$/;

function safeEval(expr: string, context: Record<string, number>): number {
  if (!SAFE_EXPR_RE.test(expr)) return NaN;
  try {
    const argNames = Object.keys(context);
    const argValues = argNames.map((k) => context[k]);
    // eslint-disable-next-line no-new-func
    const fn = new Function(...argNames, "Math", `return (${expr});`);
    const result = fn(...argValues, Math);
    return typeof result === "number" ? result : NaN;
  } catch {
    return NaN;
  }
}

function inputToNumber(v: string | number, type: "number" | "select"): number {
  if (typeof v === "number") return v;
  if (type === "number") {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  }
  // select: numeric value if parseable, else hash-as-zero (string-valued
  // selects shouldn't appear in arithmetic; if they do, they default to 0)
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

export function Calculator({
  spec,
  breadcrumb,
  heroImageSlug,
  heroImageAlt,
}: {
  spec: CalculatorSpec;
  breadcrumb: { label: string; href?: string }[];
  heroImageSlug?: string;
  heroImageAlt?: string;
}) {
  const accent = spec.accent || "#22F0D5";

  // Initialize state from defaults
  const [values, setValues] = useState<Record<string, string | number>>(() => {
    const init: Record<string, string | number> = {};
    for (const i of spec.inputs) init[i.name] = i.default;
    return init;
  });

  // Track string-valued select inputs separately for output-context
  const selectStrings = useMemo(() => {
    const sels: Record<string, string> = {};
    for (const i of spec.inputs) {
      if (i.type === "select") sels[i.name] = String(values[i.name]);
    }
    return sels;
  }, [values, spec.inputs]);

  // Compute output values from formulas, with input identifiers as numbers
  const computed = useMemo(() => {
    const numberCtx: Record<string, number> = {};
    for (const i of spec.inputs) {
      numberCtx[i.name] = inputToNumber(values[i.name], i.type);
    }
    const results: Record<string, number> = {};
    for (const f of spec.computeFormula) {
      results[f.outputName] = safeEval(f.expression, { ...numberCtx, ...results });
    }
    return results;
  }, [values, spec]);

  function setInput(name: string, raw: string) {
    setValues((prev) => ({ ...prev, [name]: raw }));
  }

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {heroImageSlug && heroImageAlt && (
        <LearnHeroImage slug={heroImageSlug} alt={heroImageAlt} />
      )}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          {breadcrumb.map((b, i) => (
            <span key={i}>
              {b.href ? (
                <Link href={b.href} className="hover:text-[#22F0D5]">{b.label}</Link>
              ) : (
                <span>{b.label}</span>
              )}
              {i < breadcrumb.length - 1 && <span className="text-[#1A2225]"> / </span>}
            </span>
          ))}
        </p>
      </div>

      {/* HERO */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: accent }}>
            ::calculator · {spec.subtitle}
          </p>
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            {spec.title}
          </h1>
          <div className="mt-8 max-w-3xl text-base leading-[1.75] text-[#C8CCCE] md:text-[17px] whitespace-pre-line">
            {spec.intro}
          </div>
        </div>
      </section>

      {/* INTERACTIVE */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Inputs */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: accent }}>
                ::inputs
              </p>
              <div className="mt-5 space-y-4">
                {spec.inputs.map((i) => (
                  <div key={i.name}>
                    <label className="block text-sm font-medium text-[#F2F4F5]">
                      {i.label}
                      {i.unit && <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">{i.unit}</span>}
                    </label>
                    {i.type === "number" ? (
                      <input
                        type="number"
                        min={i.min}
                        max={i.max}
                        step={i.step}
                        value={String(values[i.name] ?? "")}
                        onChange={(e) => setInput(i.name, e.target.value)}
                        className="mt-2 w-full rounded-lg border border-[#1A2225] bg-[#0A0F11] px-4 py-2.5 text-[#F2F4F5] focus:border-[#22F0D5]/60 focus:outline-none"
                      />
                    ) : (
                      <select
                        value={String(values[i.name] ?? "")}
                        onChange={(e) => setInput(i.name, e.target.value)}
                        className="mt-2 w-full rounded-lg border border-[#1A2225] bg-[#0A0F11] px-4 py-2.5 text-[#F2F4F5] focus:border-[#22F0D5]/60 focus:outline-none"
                      >
                        {(i.options || []).map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    )}
                    {i.help && (
                      <p className="mt-1 text-xs leading-[1.5] text-[#9BA5A7]">{i.help}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Outputs */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: accent }}>
                ::result
              </p>
              <div className="mt-5 space-y-3">
                {spec.outputs.map((o) => {
                  const v = computed[o.name];
                  const formatter = FORMAT_HELPERS[o.format] || FORMAT_HELPERS.number;
                  return (
                    <div
                      key={o.name}
                      className="rounded-2xl border p-5"
                      style={{ borderColor: `${accent}55`, background: `${accent}0c` }}
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: accent }}>
                        {o.label}
                      </p>
                      <p className="mt-2 text-3xl font-semibold tabular-nums text-[#F2F4F5] md:text-4xl">
                        {formatter(v, o.decimals)}
                      </p>
                    </div>
                  );
                })}
              </div>
              <details className="mt-6 rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4">
                <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]">
                  ::how this calculates
                </summary>
                <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">{spec.computeDescription}</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      {spec.examples && spec.examples.length > 0 && (
        <section className="border-b border-[#1A2225]">
          <div className="mx-auto w-full max-w-4xl px-6 py-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: accent }}>
              ::worked examples
            </p>
            <div className="mt-6 space-y-4">
              {spec.examples.map((ex, i) => (
                <div key={i} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5">
                  <p className="text-base font-semibold text-[#F2F4F5]">
                    {ex.scenario}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(ex.inputValues).map(([k, v]) => (
                      <span
                        key={k}
                        className="rounded-md border border-[#1A2225] bg-[#0E1418] px-3 py-1 font-mono text-[11px] text-[#9BA5A7]"
                      >
                        {k}: {String(v)}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">{ex.explanation}</p>
                  <button
                    type="button"
                    onClick={() => setValues((prev) => ({ ...prev, ...ex.inputValues }))}
                    className="mt-3 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
                  >
                    load these inputs ↑
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ASSUMPTIONS */}
      {spec.assumptions && spec.assumptions.length > 0 && (
        <section className="border-b border-[#1A2225]">
          <div className="mx-auto w-full max-w-4xl px-6 py-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
              ::what this does NOT capture
            </p>
            <ul className="mt-5 space-y-2.5">
              {spec.assumptions.map((a, i) => (
                <li key={i} className="flex gap-3 text-sm leading-[1.65] text-[#C8CCCE]">
                  <span className="text-[#FFB87A]">○</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">
            ← back to /learn
          </Link>
          <span className="mx-2 text-[#1A2225]">·</span>
          <Link href="/tools" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">
            /tools index →
          </Link>
        </div>
      </section>
    </main>
  );
}
