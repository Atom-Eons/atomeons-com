---
name: barber-sms-tcpa-compliant-opt-in-form
display_name: "TCPA-Compliant SMS Opt-In Form"
description: "Express written consent form for SMS marketing per 47 USC §227 + FCC TCPA rules. STOP/HELP keywords + frequency disclosure."
sector: small-business-barber
industry: "Small Business — Barber Shops + Booth Renters"
tier: pro
category: marketing-sms
product_line: "SkilSki Pro SKills"
skipak_membership: barber-marketing-pak
skilset_membership: barber-skilset
value_estimate_type: pak_member_no_per_skill_pricing
pak_pricing_note: "Consumed via Pro $99/mo (3 active Paks) or Elite $4,999/mo membership. No per-skill price."
mcp_tools:
  - render_barber_sms_tcpa_compliant_opt_in_form
  - capture_inputs_barber_sms_tcpa_compliant_opt_in_form
tools: Read, Write
research_status: wiki_composed
sale_readiness: ready_to_test_via_mcp
verified: true
verified_at: 2026-05-06T04:48:07.622Z
license: AtomEons-Verified-Original
source_wiki: small-business-barber.md
schema: agentskills.io@v1
---

# TCPA-Compliant SMS Opt-In Form

Product line: SkilSki Pro SKills — Small Business — Barber.

## What It Does

Express written consent form for SMS marketing per 47 USC §227 + FCC TCPA rules. STOP/HELP keywords + frequency disclosure.

## Required Inputs

- `shop_name`
- `sms_frequency_per_month`

## Outputs

- `opt_in_form.pdf`
- `opt_in_web_text.html`

## MCP Tools

- (defaults from slug)

## Workflow

1. Capture inputs via MCP tool `capture_inputs_barber_sms_tcpa_compliant_opt_in_form`
2. Validate inputs against schema (state-specific where applicable)
3. Render output documents via template + state-specific overlay
4. Return outputs to user with usage guidance
5. Record skill execution for usage analytics

## Knowledge Source

This skill is wiki-composed from `small-business-barber.md` (sha256:85978ab7edc4f5e3). All authority cites, fee values, deadline rules, and pricing are sourced from the wiki sector page. When the wiki updates, regenerate this skill.

## Pak Membership

- **SkiPak:** `barber-marketing-pak`
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