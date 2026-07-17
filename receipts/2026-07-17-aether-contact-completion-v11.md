# Aether V11 — Contact Completion and Full-Site Verification

Date: 2026-07-17 17:35:40 -04:00  
Operator: Codex  
Release: Aether Version 11  
Production: https://atomeons.com  

## Outcome

Aether V11 completes the public contact layer, removes the private Gmail
address from the site, adds a full `/contact` destination, and gives the
homepage a second editorial contact moment for collaboration, press, and
research. The release was built, mirrored to GitHub, pushed to the Sites
source repository, saved as an immutable version, deployed, and crawled on
the custom domain.

## Source provenance

- Public repository: `https://github.com/Atom-Eons/atomeons-com`
- Branch: `aecdex/aether-live-production`
- Exact release commit: `e7a7c98e87748adb3245ecab4b7c07ef681fbc98`
- Commit subject: `Complete public contact system and site routes`
- Sites source branch: `main`
- Sites source push: `2a42427..e7a7c98`
- Local build archive: `aether-sites-v11.tar.gz`
- Local archive SHA-256: `B671BA30C3E90933D2640E5F05C8F572794F0977B91C17617DD7CBF094B55ABD`

The unrelated preserved `aether-sites-v10.tar.gz` file remained untracked and
was not included in the Git commit.

## Deployment

- Sites project: `appgprj_6a59c864592c8191a8f2158cfe05af20`
- Saved version: `11`
- Version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_2298f892328c81919a665a9f2989d4ee`
- Deployment ID: `appgdep_6a5a9f69acf48191bb881bd8a99cb895`
- Deployment state: `succeeded`
- Provider URL: `https://atomeons-aether.a-mccree.chatgpt.site`
- Custom domains verified: `https://atomeons.com`, `https://www.atomeons.com`
- Sites archive content hash: `sha256:11af508b5063e3842c57d87ad4b5e988b9ff4d8b52e5c1f33c2e5b08a701530e`

The first V11 archive upload was rejected before a version was saved because
the archive root omitted the required `dist/` directory. The same verified
commit was repackaged with `dist/server/index.js` at the expected path. No
production state changed during the rejected attempt.

## Site changes

- Added a complete `/contact` page with eight visible branded routes.
- Added copy-address controls and direct `mailto:` actions.
- Added Contact to the desktop nav, mobile nav, footer, search index, sitemap,
  atlas, and explore surfaces.
- Changed the top-right navigation action from “See the work” to “Contact.”
- Added a homepage contact campaign for collaboration, press, and research.
- Replaced every public `a.mccree@gmail.com` reference with the appropriate
  `@atomeons.com` address.
- Updated `llms.txt` with the branded public contact and `/contact` route.
- Kept the site static: no contact database, account, tracker, or fragile form.

## Public email system

Cloudflare Email Routing zone:
`3643e50196d47a552963e9726be1641a`

Destination:
`a.mccree@gmail.com`

Current provider state:

- Email Routing: enabled
- Status: ready
- DNS state: synced
- Destination: verified
- Subaddressing: enabled
- Explicit rules: eight active
- Catch-all: active
- Catch-all action: forward to the verified Gmail destination

Active public routes:

1. `hello@atomeons.com`
2. `contact@atomeons.com`
3. `support@atomeons.com`
4. `press@atomeons.com`
5. `research@atomeons.com`
6. `privacy@atomeons.com`
7. `legal@atomeons.com`
8. `atom@atomeons.com`

Live DNS through resolver `1.1.1.1` returned Cloudflare Email Routing MX
records and the SPF record
`v=spf1 include:_spf.mx.cloudflare.net ~all`. The pre-existing Google site
verification TXT record remained present.

Email delivery evidence:

- A first message sent before DNS synchronization received a truthful
  `550 5.1.1 Address does not exist` bounce.
- After the zone reported `ready` and `synced`, a second message to the
  subaddressed route `hello+ae2@atomeons.com` was accepted without a bounce
  and appeared in the Gmail inbox.
- Provider state, DNS, rule reads, destination verification, and the
  post-synchronization no-bounce result all agree.
- The available end-to-end test used the same Gmail account as sender and
  destination. A future independent-mailbox test would add stronger
  cross-provider proof but is not required for the routing configuration to
  be live.

## Verification

Build:

- Next.js production build: passed
- TypeScript: passed
- Static page generation: `49/49`
- Generated HTML files: `48`

Local artifact crawl:

- Unique internal targets inspected: `71`
- Missing internal targets: `0`
- Public mail routes found: `8`
- Direct Gmail references found: `0`

Production crawl:

- `https://atomeons.com`: HTTP 200 and V11 contact marker present
- `https://atomeons.com/contact`: HTTP 200
- `https://www.atomeons.com/contact`: HTTP 200 and V11 marker present
- Sitemap: HTTP 200
- Sitemap URLs crawled: `45`
- HTTP 200: `45`
- Failures: `0`
- Branded addresses on `/contact`: `8`
- Direct Gmail references on production: `0`

## Rollback

Version 10 remains the immediate rollback target:

- Version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_1741edbb9c1881918352db45ad51092f`
- Source commit: `2a42427ae9227ae6f7c01895f740f7d578b0d213`
- Deployment ID: `appgdep_6a5a92c3db5c81919a796aac104be101`

Email routing is independent of the website deployment. Rolling the site back
does not disable the branded addresses or forwarding rules.
