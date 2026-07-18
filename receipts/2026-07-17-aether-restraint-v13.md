# Aether V13 — Show the Work

Date: 2026-07-17 20:42:00 -04:00
Operator: Codex
Release: Aether Version 13
Production: https://atomeons.com

## Intent

Make the website demonstrate ambition through finished work instead of adding
another claim, page, campaign, or visual effect. Version 13 is a restraint and
conversion pass over the Version 12 system.

## Source provenance

- Public repository: `https://github.com/Atom-Eons/atomeons-com`
- Branch: `aecdex/aether-live-production`
- Exact release commit: `b38584313706e9a11a8b67c69b08a564fef36c37`
- Commit subject: `Sharpen Aether proof and reduce homepage noise`
- Sites source branch: `main`
- Sites source push: `dfb01b1..b385843`
- Local archive: `aether-sites-v13.tar.gz`
- Local archive SHA-256:
  `63DB19F3B579673E2650CFEDFD0CE497F66CD917C4710C22AC6225FC0A95429A`

## Changes

- Kept the creator positioning and made the following sentence more direct:
  the AI workforce is named, then the visitor is sent to the finished objects.
- Changed the homepage primary action from “Enter the product constellation”
  to “See what exists.”
- Changed the archive action to “Explore every public object.”
- Changed the cold “human operator” metric to “artist directing it.”
- Replaced “one human / many minds” variants with
  “artist directed / machine amplified.”
- Removed the oversized three-card homepage contact campaign.
- Reduced the final homepage action set from four choices to two:
  Explore the full archive or Contact Atom.
- Removed the unused contact-campaign CSS after the component was removed.
- Net change: 8 lines added and 166 lines removed.

No route, contact address, product, paper, discovery, resource, or legal page
was deleted. `/contact`, `/random`, and `/who-are-you` remain live and indexed.

## Verification

- Next.js production compile: passed
- TypeScript: passed
- Static generation: `49/49`
- Generated HTML files: `48`
- Local internal targets: `71`
- Missing local targets: `0`
- Contact route preserved: yes
- Production homepage marker: present
- Production sitemap URLs: `45`
- Production HTTP 200 results: `45`
- Production failures: `0`
- Public Gmail leaks: `0`

The in-app visual browser could not initialize in this pass and returned
`Cannot redefine property: process`. No screenshot claim is made. Verification
used the production HTML, compiled CSS, live assets, route inventory, and custom
domain crawl.

## Deployment

- Sites project: `appgprj_6a59c864592c8191a8f2158cfe05af20`
- Saved version: `13`
- Version ID:
  `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_c587f8ff7220819181e06af53ccaf46a`
- Deployment ID: `appgdep_6a5acbb850fc8191be01d9678370d5dc`
- Deployment state: `succeeded`
- Provider URL: `https://atomeons-aether.a-mccree.chatgpt.site`
- Sites content hash:
  `sha256:89c344892b2c4fa60a354cd8cad48e52286d7b027480ffee5e8086b101db0c67`

## Rollback

Version 12 remains the immediate rollback target:

- Version ID:
  `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_0bdb24af95048191a0b10be181b30a7a`
- Source commit: `dfb01b1a267b5954ef72ab658724b11f4d210d1b`
- Deployment ID: `appgdep_6a5aac41cfd08191a6bd5640ada7f881`

Cloudflare Email Routing is independent of this release and remains unchanged.
