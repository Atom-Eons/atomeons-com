# AtomEons V26 release receipt

## Verdict

READY TO DEPLOY. The production package is a consumer-first, two-product AtomEons site with CableBox 2 live and Atomic Orange honestly marked incoming.

## Evidence

- Next.js 16.2.6 production build compiled, type-checked, and generated 55 static pages.
- Packaged deployment: 894 files / 145,207,205 bytes.
- CableBox 2 web edition mirrored on org-owned GitHub Pages: 354 files / 106,465,125 bytes; the site worker reverse-proxies the exact build under `/cablebox2-web/*` so visitors keep the `atomeons.com` origin.
- Desktop browser QA at 1440 x 1000: no horizontal overflow, Three.js canvas present, five-item primary navigation, correct GitHub download URL.
- Mobile browser QA at 390 x 844: no horizontal overflow; primary actions are 358 x 52 px; CableBox hero image loaded.
- CableBox web QA at 844 x 390 with touch emulation: iframe loaded, theme control changed the cabinet, channel control initiated the analog transition.
- Critical routes rendered: CableBox 2, Atomic Orange, Research, Contact, Technical Details, and AE Brawl.
- Contact routes point directly to `a.mccree@gmail.com`.
- AE Brawl remained untouched: blob `95daf9482a58348b7cc46dabca31defcbf1333df`.
- CableBox 2 Windows release: 443,039,825 bytes; SHA-256 `145FC8796C4E63F956A1588B39A581FAA2E3F443227FE40B6D3F3AD12B5FA384`.
- Social campaign image: SHA-256 `C2DEFEEA409DF6D3C6D477514A393E94212C9F5B4BF9522B7B4C6BD0AC9A8BE6`.

## Blockers

- None for production deployment.
- GitHub Pages is the static artifact origin; the public interactive edition is intentionally presented through the same-origin AtomEons proxy so the existing relay accepts `atomeons.com`.

## Rollback / recovery

- Restore Sites version 25: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_2bb6a26827388191988cd42c191b5426`.
- Previous source commit: `ac276585239bb1e3c5ebcfb6e91eb4ae6c147e88`.

## Next action

Push the exact source commit, save a Sites version from `dist`, deploy that saved version, and verify the custom domain plus all critical public URLs.
