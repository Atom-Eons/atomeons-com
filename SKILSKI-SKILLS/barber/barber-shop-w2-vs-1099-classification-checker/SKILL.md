---
name: barber-shop-w2-vs-1099-classification-checker
display_name: "W-2 vs 1099 Worker Classification Check"
description: "IRS 20-factor test + state ABC test (CA, MA, NJ, IL etc.). Decision tree screening + risk assessment."
sector: small-business-barber
industry: "Small Business — Barber Shops + Booth Renters"
tier: pro
category: shop-ops
product_line: "SkilSki Pro SKills"
skipak_membership: barber-shop-compliance-pak
skilset_membership: barber-skilset
value_estimate_type: pak_member_no_per_skill_pricing
pak_pricing_note: "Consumed via Pro $99/mo (3 active Paks) or Elite $4,999/mo membership. No per-skill price."
mcp_tools:
  - render_barber_shop_w2_vs_1099_classification_checker
  - capture_inputs_barber_shop_w2_vs_1099_classification_checker
tools: Read, Write
research_status: wiki_composed
sale_readiness: ready_to_test_via_mcp
verified: true
verified_at: 2026-05-06T04:48:07.622Z
license: AtomEons-Verified-Original
source_wiki: small-business-barber.md
schema: agentskills.io@v1
---

# W-2 vs 1099 Worker Classification Check

Product line: SkilSki Pro SKills — Small Business — Barber.

## What It Does

IRS 20-factor test + state ABC test (CA, MA, NJ, IL etc.). Decision tree screening + risk assessment.

## Required Inputs

- `workplace_arrangements[]`
- `state`

## Outputs

- `classification_screen.pdf`

## MCP Tools

- (defaults from slug)

## Workflow

1. Capture inputs via MCP tool `capture_inputs_barber_shop_w2_vs_1099_classification_checker`
2. Validate inputs against schema (state-specific where applicable)
3. Render output documents via template + state-specific overlay
4. Return outputs to user with usage guidance
5. Record skill execution for usage analytics

## Knowledge Source

This skill is wiki-composed from `small-business-barber.md` (sha256:85978ab7edc4f5e3). All authority cites, fee values, deadline rules, and pricing are sourced from the wiki sector page. When the wiki updates, regenerate this skill.

## Pak Membership

- **SkiPak:** `barber-shop-compliance-pak`
- **SkilSet:** `barber-skilset` (full barber stack of 6 SkiPaks)
- **Access via:** Pro $99/mo membership (pick this Pak as one of 3 active Paks) OR Elite $4,999/mo (more capacity).
- No per-skill price. No standalone purchase.

## Risks

- See sector wiki section "Risks" for sector-wide patterns
- This skill drafts; the user signs and submits
- Authority drift: state board / state law / IRS rules update; sector wiki must be re-verified ≤90 days before composing related skills

---

Verified: 2026-05-06T04:48:07.622Z
Source: skil.ski Wiki Sector `small-business-barber`
License: AtomEons-Verified-Original