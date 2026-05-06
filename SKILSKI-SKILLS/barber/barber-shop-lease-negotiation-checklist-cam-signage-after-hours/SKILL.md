---
name: barber-shop-lease-negotiation-checklist-cam-signage-after-hours
display_name: "Shop Lease Negotiation Checklist"
description: "Lease negotiation checklist: CAM, signage, after-hours access, build-out allowance, exclusivity."
sector: small-business-barber
industry: "Small Business — Barber Shops + Booth Renters"
tier: pro
category: business-legal
product_line: "SkilSki Pro SKills"
skipak_membership: barber-booth-renter-pak
skilset_membership: barber-skilset
value_estimate_type: pak_member_no_per_skill_pricing
pak_pricing_note: "Consumed via Pro $99/mo (3 active Paks) or Elite $4,999/mo membership. No per-skill price."
mcp_tools:
  - render_barber_shop_lease_negotiation_checklist_cam_signage_after_hours
  - capture_inputs_barber_shop_lease_negotiation_checklist_cam_signage_after_hours
tools: Read, Write
research_status: wiki_composed
sale_readiness: ready_to_test_via_mcp
verified: true
verified_at: 2026-05-06T04:48:07.622Z
license: AtomEons-Verified-Original
source_wiki: small-business-barber.md
schema: agentskills.io@v1
---

# Shop Lease Negotiation Checklist

Product line: SkilSki Pro SKills — Small Business — Barber.

## What It Does

Lease negotiation checklist: CAM, signage, after-hours access, build-out allowance, exclusivity.

## Required Inputs

- `lease_term`
- `rent`
- `shop_size`

## Outputs

- `lease_negotiation_checklist.pdf`

## MCP Tools

- (defaults from slug)

## Workflow

1. Capture inputs via MCP tool `capture_inputs_barber_shop_lease_negotiation_checklist_cam_signage_after_hours`
2. Validate inputs against schema (state-specific where applicable)
3. Render output documents via template + state-specific overlay
4. Return outputs to user with usage guidance
5. Record skill execution for usage analytics

## Knowledge Source

This skill is wiki-composed from `small-business-barber.md` (sha256:85978ab7edc4f5e3). All authority cites, fee values, deadline rules, and pricing are sourced from the wiki sector page. When the wiki updates, regenerate this skill.

## Pak Membership

- **SkiPak:** `barber-booth-renter-pak`
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