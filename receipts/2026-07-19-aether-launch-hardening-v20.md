# Aether Version 20 - Launch Hardening Receipt

Date: 2026-07-19 EDT
Verdict: PASS - corrected production release is live

## Released change

- Replaced the homepage machine's visually empty center orb with a legible `ATOM` command core labeled `HUMAN / FINAL AUTHORITY`.
- Made the command core and all five surrounding product/research nodes real navigation links.
- Added or corrected canonical metadata across every public surface.
- Removed duplicate browser titles for the Universal Defect working draft and the About page.
- Tightened research-paper title and description metadata for search and sharing.
- Re-verified all public contact routes and updated the Contact page with the current delivery state.
- Corrected mobile editorial typography after the responsive audit exposed horizontal overflow on About, AtomSmasher, and the Papers index.
- Preserved all legacy resources and product assets.
- Kept the CableBox online demo, Atomic Orange proof, orange-theme proof, and inaccurate favorite-star proof hidden.
- Kept the CableBox Windows download locked behind the separately verified final archive and SHA-256 gate.

## Source evidence

- Public GitHub repository: `https://github.com/Atom-Eons/atomeons-com`.
- Public source commit: `28bb088bac2cba409ca6eb7d2511aa75a018945b`.
- Public branch: `aecdex/aether-live-production`.
- GitHub `main` and the production branch were pushed to the public commit.
- Lightweight Sites source commit: `b9e1623b082bae25611fca7ddfdfe1850f192950`.
- Lightweight branch: `aecdex/sites-source-v16`.
- Public and lightweight source tree hash: `88d80cb074d426baa25531825f06ff60c28c6e30`.
- The exact lightweight source commit was pushed to the Sites source repository before the version was saved.

## Build and package evidence

- Standalone TypeScript check: PASS with exit code 0.
- Next.js 16.2.6 optimized compilation: PASS in 24.5 seconds.
- Next.js internal TypeScript phase: PASS in 46 seconds.
- Static generation: 49 of 49 pages in 12.4 seconds.
- Generated HTML files: 48.
- Generated CSS files: 4.
- Internal references: 102.
- Missing internal references: 0.
- CableBox source and build assets: 14 of 14, with zero asset problems.
- Public sitemap routes: 45.
- Missing titles: 0.
- Missing descriptions: 0.
- Missing canonicals: 0.
- Incorrect canonicals: 0.
- Incorrect H1 counts: 0.
- Duplicate browser titles: 0.
- Packaged responsive audit: 90 of 90 checks passed across all 45 routes at 1440 x 1000 and 390 x 844.

## Live evidence

- Custom domain: 45 of 45 routes returned HTTP 200.
- Provider domain: 45 of 45 routes returned HTTP 200.
- Custom-domain referenced assets: 53 of 53 returned HTTP 200 after edge propagation completed.
- Custom-domain static navigation payloads: 45 of 45 passed.
- Provider-domain static navigation payloads: 45 of 45 passed.
- Live responsive audit: 90 of 90 checks passed across all 45 routes at desktop and mobile widths.
- Homepage command core, About link, and all five product/research links were present in the rendered production HTML.
- Contact verification copy was present in the rendered production HTML.
- CableBox production HTML:
  - contains the Windows security notice;
  - contains `DOWNLOAD OPENS ON GREEN`;
  - contains no online CableBox demo promise;
  - contains no Atomic Orange proof;
  - contains no inaccurate favorite-star proof reference.
- Final homepage screenshot: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\live-aether-v20-home-core.png`.
- Final CableBox hero screenshot: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\live-cablebox-v20-hero.png`.
- Final CableBox release-gate screenshot: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\live-cablebox-v20-release.png`.
- Corrected mobile About screenshot: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\live-v20-fixed-about-mobile.png`.
- Corrected mobile AtomSmasher screenshot: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\live-v20-fixed-atomsmasher-mobile.png`.
- Corrected mobile Papers screenshot: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\live-v20-fixed-papers-mobile.png`.
- Reusable responsive audit tool: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\audit-responsive-cdp.mjs`.

## Contact evidence

- Verified destination: `a.mccree@gmail.com`.
- Enabled literal routes: `hello`, `support`, `press`, `research`, `contact`, `atom`, `privacy`, and `legal` at `@atomeons.com`.
- Catch-all forwarding: enabled.
- Direct-route Gmail test subject: `AE ROUTE TEST V19 2026-07-19 1324 EDT`.
- Direct-route Gmail message ID: `19f7cd3a2377de6a`.
- Catch-all Gmail test subject: `AE CATCH-ALL TEST V19 2026-07-19 1325 EDT`.
- Catch-all Gmail message ID: `19f7cd3dc4a4f80f`.
- Both test messages reached Gmail and carried the `INBOX` label.

## Deployment

- Custom URL: `https://atomeons.com`.
- CableBox URL: `https://atomeons.com/cablebox`.
- Provider URL: `https://atomeons-aether.a-mccree.chatgpt.site`.
- Active Sites version: 20.
- Version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_b27ae5ee45f4819184668a851ce7b6e6`.
- Deployment ID: `appgdep_6a5d74d59de08191b4219b5cf041f9e5`.
- Deployment status: succeeded.
- Sites content hash: `sha256:f187c7cd9de32c3bc3c56eeebbbb3ddea9b7f230a6103d110bc4d189cd5438ab`.
- Sites artifact: 31,846,400 bytes and 482 files.
- Local archive: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\aether-sites-v20.tar`.
- Local archive bytes: 31,909,888.
- Local archive SHA-256: `0D2ADE8810CD63ED013E0D832A9D56FC8C79B8D0403CA78A0A7EF6ED75641C4F`.

## Version 19 disposition

- Version 19 was deployed briefly during the audit.
- The live responsive sweep found three mobile overflow defects.
- Version 19 was immediately superseded by corrected Version 20.
- Version 19 is not the recommended rollback target.

## Blockers

- None for the website release.
- The separate CableBox Windows product download remains intentionally locked.
- Product release green still requires the final self-contained archive, a verified SHA-256 checksum, and public verification URLs.

## Rollback

- Previous stable version: 18.
- Version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_9cef4b0e3f98819184d4df895419fe8b`.
- Deployment ID: `appgdep_6a5d04bc5a208191b943ec270b9fac2a`.
- Public source commit: `f8e3efdda9996aabf9cdd1917a6950989c818e43`.
- Lightweight source commit: `f2c21acf5a751d7760ad17fc8d65f02d4a51bcdc`.
- Recovery action: redeploy saved Version 18.

## Next action

- When the CableBox archive and checksum are independently verified, replace the assembly gate with the real Windows download and public verification links, then run the same build, package, responsive, asset, and live-route gauntlet before announcing release green.
