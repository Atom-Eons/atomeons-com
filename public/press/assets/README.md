# /public/press/assets — operator drop folder

Files the press media kit on `/press` references but the lab has not
yet produced. Drop these here and the kit cards flip from `tbd ↗` to
`open ↗` automatically.

## What this folder expects

| Slot | Suggested filename | Spec |
|---|---|---|
| Founder headshot | `atom-headshot.jpg` | 1024×1024+, JPG, neutral background, eye-level |
| Orange³ product shot | `orangebox-product.png` | 1920×1080+, PNG, cockpit on a real monitor |
| Press release v6 | `atomeons-press-release-v6.pdf` | Rendered from `CAMPAIGN/23-PRESS-RELEASE-V6.md` |
| Full media pack | `atomeons-media-pack.zip` | All of the above bundled |

## Optional but recommended

| Slot | Filename |
|---|---|
| Lab Æ logo (transparent SVG) | `aeons-logo.svg` |
| Orange³ wordmark (PNG) | `orangebox-wordmark.png` |
| Hero shot variant 16:9 | `hero-16x9.jpg` |
| Lab grid (process photo) | `lab-grid.jpg` |

## Wiring

The asset list lives in `app/press/PressMediaKit.tsx` → `ASSETS` array.
Add or rename slots there if you change the convention. Cards
automatically flip out of TBD state when the file exists (Next.js
serves anything in `/public/` directly).

## Coverage list

When real press lands, edit `app/press/PressMediaKit.tsx` → `COVERAGE`
array. Add `{ outlet, headline, date (YYYY-MM-DD), href }`. The empty
state renders the "Be the first" card automatically until the array
has at least one entry.
