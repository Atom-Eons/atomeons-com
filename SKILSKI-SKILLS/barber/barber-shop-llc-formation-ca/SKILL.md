---
name: barber-shop-llc-formation-ca
display_name: "CA Shop LLC Formation"
description: "Form CA LLC for barber shop: Articles of Organization (LLC-1), $70 filing, $800 minimum tax, biennial Statement of Information."
sector: small-business-barber
industry: "Small Business — Barber Shops + Booth Renters"
tier: pro
category: shop-ops
product_line: "SkilSki Pro SKills"
skipak_membership: barber-shop-compliance-pak
skilset_membership: barber-skilset
value_estimate_type: pak_member_no_per_skill_pricing
pak_pricing_note: "Consumed via Pro $99/mo (3 active Paks) or Elite $4,999/mo membership. No per-skill price."
state: CA
mcp_tools:
  - render_barber_shop_llc_formation_ca
  - capture_inputs_barber_shop_llc_formation_ca
tools: Read, Write
research_status: wiki_composed
sale_readiness: ready_to_test_via_mcp
verified: true
verified_at: 2026-05-06T04:48:07.622Z
license: AtomEons-Verified-Original
source_wiki: small-business-barber.md
schema: agentskills.io@v1
---

# CA Shop LLC Formation

Product line: SkilSki Pro SKills — Small Business — Barber.

## What It Does

Form CA LLC for barber shop: Articles of Organization (LLC-1), $70 filing, $800 minimum tax, biennial Statement of Information.

## Required Inputs

- `shop_legal_name`
- `shop_address`
- `manager_or_member_managed`
- `organizers`

## Outputs

- `llc1_prefilled.pdf`
- `operating_agreement_template.pdf`
- `soi_calendar.ics`

## MCP Tools

- (defaults from slug)

## Workflow

1. Capture inputs via MCP tool `capture_inputs_barber_shop_llc_formation_ca`
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