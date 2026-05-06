---
name: barber-professional-liability-malpractice-insurance
display_name: "Professional Liability (Malpractice) Insurance"
description: "Professional liability for chemical service injury, hair-allergy reaction, beard mistake claims. ~$15-50/mo standalone."
sector: small-business-barber
industry: "Small Business — Barber Shops + Booth Renters"
tier: pro
category: insurance
product_line: "SkilSki Pro SKills"
skipak_membership: barber-booth-renter-pak
skilset_membership: barber-skilset
value_estimate_type: pak_member_no_per_skill_pricing
pak_pricing_note: "Consumed via Pro $99/mo (3 active Paks) or Elite $4,999/mo membership. No per-skill price."
mcp_tools:
  - render_barber_professional_liability_malpractice_insurance
  - capture_inputs_barber_professional_liability_malpractice_insurance
tools: Read, Write
research_status: wiki_composed
sale_readiness: ready_to_test_via_mcp
verified: true
verified_at: 2026-05-06T04:48:07.622Z
license: AtomEons-Verified-Original
source_wiki: small-business-barber.md
schema: agentskills.io@v1
---

# Professional Liability (Malpractice) Insurance

Product line: SkilSki Pro SKills — Small Business — Barber.

## What It Does

Professional liability for chemical service injury, hair-allergy reaction, beard mistake claims. ~$15-50/mo standalone.

## Required Inputs

- `services[]`
- `state`

## Outputs

- `professional_liability_kit.pdf`

## MCP Tools

- (defaults from slug)

## Workflow

1. Capture inputs via MCP tool `capture_inputs_barber_professional_liability_malpractice_insurance`
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