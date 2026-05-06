---
name: barber-renter-square-vs-stripe-cost-comparison
display_name: "Square vs Stripe Cost Comparison"
description: "Processing fee comparison: Square (2.6%+10c card present), Stripe (2.9%+30c online), other options. ROI per monthly volume."
sector: small-business-barber
industry: "Small Business — Barber Shops + Booth Renters"
tier: pro
category: business-ops
product_line: "SkilSki Pro SKills"
skipak_membership: barber-pricing-pak
skilset_membership: barber-skilset
value_estimate_type: pak_member_no_per_skill_pricing
pak_pricing_note: "Consumed via Pro $99/mo (3 active Paks) or Elite $4,999/mo membership. No per-skill price."
mcp_tools:
  - render_barber_renter_square_vs_stripe_cost_comparison
  - capture_inputs_barber_renter_square_vs_stripe_cost_comparison
tools: Read, Write
research_status: wiki_composed
sale_readiness: ready_to_test_via_mcp
verified: true
verified_at: 2026-05-06T04:48:07.622Z
license: AtomEons-Verified-Original
source_wiki: small-business-barber.md
schema: agentskills.io@v1
---

# Square vs Stripe Cost Comparison

Product line: SkilSki Pro SKills — Small Business — Barber.

## What It Does

Processing fee comparison: Square (2.6%+10c card present), Stripe (2.9%+30c online), other options. ROI per monthly volume.

## Required Inputs

- `monthly_card_volume`
- `in_person_or_online_split`

## Outputs

- `payment_processor_comparison.pdf`

## MCP Tools

- (defaults from slug)

## Workflow

1. Capture inputs via MCP tool `capture_inputs_barber_renter_square_vs_stripe_cost_comparison`
2. Validate inputs against schema (state-specific where applicable)
3. Render output documents via template + state-specific overlay
4. Return outputs to user with usage guidance
5. Record skill execution for usage analytics

## Knowledge Source

This skill is wiki-composed from `small-business-barber.md` (sha256:85978ab7edc4f5e3). All authority cites, fee values, deadline rules, and pricing are sourced from the wiki sector page. When the wiki updates, regenerate this skill.

## Pak Membership

- **SkiPak:** `barber-pricing-pak`
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