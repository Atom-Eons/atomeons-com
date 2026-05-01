#!/usr/bin/env node
/**
 * ingest-skipak.mjs
 *
 * Parses C:/Users/a/Downloads/SKIPAK.md (the operator's curated 10K-best
 * seed) into structured JSONL.
 *
 * Output: SKILSKI-SKILLS/_index/skipak-curated.jsonl
 *   one row per named skill, plus _index/skipak-phases.json (the 47 role
 *   tiers that become the role-based SkiPaks).
 *
 * Source format (per SKIPAK.md):
 *   ### **Phase N: Role Cluster (The "X" Tier)**
 *   **Target:** 100M+ Users. **Value:** ... Worth $20–$50/mo per seat.
 *   1. `slug-name.md` | **Method:** ... | **Value:** ... | **Users:** 150M+
 *
 * Run:
 *   node scripts/ingest-skipak.mjs --src "C:/Users/a/Downloads/SKIPAK.md" \
 *                                  --out _index/skipak-curated.jsonl
 *
 * Deterministic. Pure Node. Zero LLM cost.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

function arg(name, def) {
  const i = process.argv.indexOf('--' + name)
  return i > -1 ? process.argv[i + 1] : def
}

const SRC = arg('src', resolve('C:/Users/a/Downloads/SKIPAK.md'))
const OUT_JSONL = resolve(ROOT, arg('out', '_index/skipak-curated.jsonl'))
const OUT_PHASES = resolve(ROOT, '_index/skipak-phases.json')

const TIER_RE = /^###\s+\**(?:Phase\s+(\d+):\s*)?([^*]+?)(?:\s*\(The\s+"([^"]+)"\s+Tier\))?\**$/
const SKILL_RE =
  /^\s*\**\s*(\d+)\.\s+\**\s*`?([a-z0-9][a-z0-9-]+)\.md`?\s*\|\s*\**Method:\**\s*([^|]+?)\s*\|\s*\**Value:\**\s*([^|]+?)\s*\|\s*\**Users:\**\s*([^*]+?)\**\s*$/i

function parseUsers(s) {
  // "150M+", "5M \\- 15M Users", "500k+", "1M \\- 5M"
  const cleaned = String(s).replace(/\\/g, '').replace(/Users/i, '').trim()
  const m = cleaned.match(/([\d.]+)\s*([kKmMbB])/)
  if (!m) return null
  const num = parseFloat(m[1])
  const unit = m[2].toLowerCase()
  if (unit === 'k') return Math.round(num * 1_000)
  if (unit === 'm') return Math.round(num * 1_000_000)
  if (unit === 'b') return Math.round(num * 1_000_000_000)
  return null
}

function clean(s) {
  return String(s)
    .replace(/\*\*/g, '')
    .replace(/\\([_*-])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function ingest(srcPath) {
  const text = readFileSync(srcPath, 'utf-8')
  const lines = text.split(/\r?\n/)

  const phases = []
  const skills = []
  let curPhase = null

  for (const raw of lines) {
    const line = raw.replace(/\r$/, '')

    if (/^###\s+/.test(line)) {
      const m = line.match(TIER_RE)
      if (m) {
        const num = m[1] ? parseInt(m[1], 10) : phases.length + 1
        const label = clean(m[2])
        const tier = m[3] ? clean(m[3]) : null
        curPhase = {
          phase_number: num,
          label,
          tier_label: tier,
          slug: label
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 60),
          target: null,
          value_blurb: null,
          skill_count: 0,
        }
        phases.push(curPhase)
        continue
      }
    }

    // Capture target/value of phase
    if (curPhase && /^\s*\**\**Target:\**/i.test(line)) {
      const t = line.match(/Target:\**\s*([^.]+?)\.\s*\**Value:\**\s*([^*]+?)(?:Worth\s+([^.*]+))?\.?\s*\**\s*$/i)
      if (t) {
        curPhase.target = clean(t[1])
        curPhase.value_blurb = clean(t[2])
        if (t[3]) curPhase.pricing_band = clean(t[3])
      }
    }

    const sm = line.match(SKILL_RE)
    if (sm) {
      const [, n, slug, method, value, users] = sm
      const user_count = parseUsers(users)
      skills.push({
        seq: parseInt(n, 10),
        slug: clean(slug).toLowerCase(),
        method: clean(method),
        value: clean(value),
        users_raw: clean(users),
        user_count: user_count,
        phase_number: curPhase ? curPhase.phase_number : null,
        phase_label: curPhase ? curPhase.label : null,
        phase_slug: curPhase ? curPhase.slug : null,
        tier_label: curPhase ? curPhase.tier_label : null,
      })
      if (curPhase) curPhase.skill_count++
    }
  }

  return { phases, skills }
}

function main() {
  console.log(`[ingest-skipak] reading: ${SRC}`)
  const { phases, skills } = ingest(SRC)

  mkdirSync(dirname(OUT_JSONL), { recursive: true })

  const jsonl = skills.map((s) => JSON.stringify(s)).join('\n') + '\n'
  writeFileSync(OUT_JSONL, jsonl)
  writeFileSync(OUT_PHASES, JSON.stringify(phases, null, 2))

  console.log(`[ingest-skipak] phases:  ${phases.length}`)
  console.log(`[ingest-skipak] skills:  ${skills.length}`)
  console.log(`[ingest-skipak] output:  ${OUT_JSONL}`)
  console.log(`[ingest-skipak] phases:  ${OUT_PHASES}`)

  // Top-10 highest-utility (by user_count) — preview for Lifeskills curation
  const top = [...skills]
    .filter((s) => Number.isFinite(s.user_count))
    .sort((a, b) => (b.user_count || 0) - (a.user_count || 0))
    .slice(0, 12)
  console.log('\n[ingest-skipak] Top 12 by user_count (Lifeskills candidates):')
  for (const s of top) {
    console.log(
      `  ${s.user_count.toLocaleString().padStart(13)} · ${s.phase_slug} · ${s.slug}`,
    )
  }
}

main()
