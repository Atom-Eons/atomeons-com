#!/usr/bin/env node
/**
 * generate-role-skipaks.mjs
 *
 * For every SKIPAK.md phase, emit a SkiPak JSON config containing the
 * top-N highest-utility skills in that phase. Each Pak then runs through
 * `build-skipak-skillmd.mjs` to produce its runnable SKILL.md.
 *
 * The result: 42 role-based SkiPaks (Front Office, Sales, Logistics,
 * Finance, DevOps, Healthcare, Trades, ...) ready for buyers in their
 * SkiLodge, plus a Lifeskills always-on tier.
 *
 * Usage:
 *   node scripts/generate-role-skipaks.mjs \
 *     --src _index/skipak-curated.jsonl \
 *     --phases _index/skipak-phases.json \
 *     --out _index/paks \
 *     --top 12
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'

function arg(name, def) {
  const i = process.argv.indexOf('--' + name)
  return i > -1 ? process.argv[i + 1] : def
}

const SRC = arg('src', '_index/skipak-curated.jsonl')
const PHASES = arg('phases', '_index/skipak-phases.json')
const OUT = arg('out', '_index/paks')
const TOP = parseInt(arg('top', '12'), 10)

function tierForPhase(phase) {
  // Heuristic — high-target consumer = pro; specialized enterprise = elite
  // Phase 1 (Admin & Comm) = pro (free Lifeskills covers core)
  // Phase 4 (Finance/Legal/Compliance) = elite
  // Phase 6 (Data Science / Niche Eng) = elite
  // Phase 11 (Cybersecurity), 16 (ML Ops), 17 (Banking/Fintech), 18 (Manufacturing/IoT) = elite
  // Phase 22 (Smartest Tier), 26 (Clinical) = elite
  // Default = pro
  const eliteSet = new Set([4, 6, 11, 16, 17, 18, 22, 26, 27])
  return eliteSet.has(phase.phase_number) ? 'elite' : 'pro'
}

function modeForPhase(phase) {
  // Most role packs are parallel (user asks one thing, multiple skills can serve it).
  // Workflow-pipeline phases (Phase 4 Finance/Legal multi-step compliance, Phase 12
  // Healthcare admin pipelines) are sequential_pipe.
  const pipeSet = new Set([4, 12, 14, 15])
  return pipeSet.has(phase.phase_number) ? 'sequential_pipe' : 'parallel'
}

function paklabelForPhase(phase) {
  // Use the friendly Tier label if present, else the phase label.
  if (phase.tier_label) return `${phase.tier_label} Pak`
  return `${phase.label} Pak`
}

function packSlugForPhase(phase) {
  const base = phase.tier_label
    ? phase.tier_label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : phase.slug
  return base.replace(/^-|-$/g, '').slice(0, 60) || phase.slug
}

function deriveTriggers(skills) {
  // Promote each skill's `value` line into 1-2 short trigger phrases.
  const triggers = []
  for (const s of skills) {
    const v = (s.value || '').replace(/\s+/g, ' ').trim()
    if (v.length > 12 && v.length < 90) triggers.push(v.toLowerCase().replace(/\.$/, ''))
    if (triggers.length >= 8) break
  }
  return triggers
}

function buildPak(phase, skills) {
  const tier = tierForPhase(phase)
  const mode = modeForPhase(phase)

  // Top-N by user_count (proxy for "helps most people").
  const ranked = [...skills]
    .filter((s) => s.phase_number === phase.phase_number)
    .sort((a, b) => (b.user_count || 0) - (a.user_count || 0))
    .slice(0, TOP)

  if (ranked.length < 3) return null

  const slug = packSlugForPhase(phase)
  const label = paklabelForPhase(phase)
  const blurb = phase.value_blurb
    ? `${phase.label}. ${phase.value_blurb}`.replace(/\s+/g, ' ').trim()
    : `${phase.label} role pack — ${ranked.length} curated Skilskis.`

  return {
    slug,
    label,
    blurb,
    mode,
    tier,
    phase_provenance: [phase.slug],
    skills: ranked.map((s) => ({
      slug: s.slug,
      label: s.slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      method: s.method,
      trigger_examples: deriveTriggers([s]).slice(0, 3),
    })),
  }
}

function main() {
  const skills = readFileSync(SRC, 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map((l) => JSON.parse(l))
  const phases = JSON.parse(readFileSync(PHASES, 'utf-8'))

  mkdirSync(OUT, { recursive: true })

  const summary = []
  let made = 0
  for (const p of phases) {
    const pak = buildPak(p, skills)
    if (!pak) {
      summary.push({ phase: p.phase_number, slug: p.slug, status: 'SKIPPED (<3 skills)' })
      continue
    }
    const fp = join(OUT, `${pak.slug}.json`)
    writeFileSync(fp, JSON.stringify(pak, null, 2))
    summary.push({
      phase: p.phase_number,
      slug: pak.slug,
      tier: pak.tier,
      mode: pak.mode,
      members: pak.skills.length,
      file: fp,
    })
    made++
  }

  // Manifest
  const manifestPath = resolve(OUT, '_manifest.json')
  writeFileSync(manifestPath, JSON.stringify(summary, null, 2))

  console.log(`[generate-role-skipaks] phases:        ${phases.length}`)
  console.log(`[generate-role-skipaks] paks emitted:  ${made}`)
  console.log(`[generate-role-skipaks] top-N members: ${TOP}`)
  console.log(`[generate-role-skipaks] manifest:      ${manifestPath}`)
}

main()
