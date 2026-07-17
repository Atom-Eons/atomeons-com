# Aether Graphic System 02

## Target

Raise the new AtomEons front stage from a strong CSS-led V1 to a campaign-grade
visual system without reopening the locked information architecture or deleting
the sleeping archive.

## Art direction

- White ground, bright directional daylight, hard sculptural shadows.
- Hand-built experimental instruments rather than generic AI interfaces.
- Machined metal, optical glass, paper, graphite, tape, braided cable, and real screws.
- Cobalt for signal, burnt orange for operator systems, oxblood for publishing,
  blood red for frontier research, and acid yellow for live state.
- Product advertising carries the emotion; UI language is reserved for provenance,
  coordinates, status, and measurement.

## Generated assets

All five assets were generated with the built-in image generation path, inspected,
converted to high-quality WebP, and saved inside the canonical source tree.

| Asset | Final path | Role |
| --- | --- | --- |
| Invention Field | `public/aether-v2/hero-invention-field-v2.webp` | Homepage hero |
| CableBox Object | `public/aether-v2/cablebox-object-v2.webp` | CableBox flagship |
| Bookmaker Object | `public/aether-v2/bookmaker-object-v2.webp` | Bookmaker flagship |
| Orange5 Object | `public/aether-v2/orange5-object-v2.webp` | Orange5 flagship |
| Radiance Field | `public/aether-v2/research-radiance-field-v2.webp` | Research front door |

Total optimized image payload: 839,380 bytes.

## Final prompt set

1. **Invention Field:** premium editorial photograph of an original black-and-white
   hand-built command core surrounded by five experimental artifacts on a warm-white
   maker/aerospace workbench; negative space, practical miniature realism, cobalt,
   orange, acid, and blood-red micro-accents; no people, logos, readable text,
   generic AI orb, gamer RGB, or dark cyberpunk.
2. **CableBox:** campaign photograph of a repairable charcoal CRT object with smoked
   cobalt glass, physical tuning dial, jewel buttons, visible screws, and braided
   cable under hard Florida daylight; no kitsch, trademarks, text, or stock-render feel.
3. **Bookmaker:** art-book still life pairing a bone-cloth hardbound book with a
   machined independent publishing instrument, paper rollers, ivory keys, oxblood
   thread, and amber status light; no laptop, SaaS UI, readable text, or generic mockup.
4. **Orange5:** campaign photograph of a sovereign modular AI workstation made from
   translucent burnt-orange polycarbonate and bead-blasted aluminum, with four
   removable modules and one operator dial; no gaming PC, robot, RGB, or dark backdrop.
5. **Radiance Field:** scientific-editorial photograph of two different photonic-eye
   instruments exchanging blood-red and cobalt light paths on a white optical bench;
   plausible prototype realism without biological gore, fantasy eyes, or institutional cosplay.

## Integration

- `app/page.tsx` now uses the invention field as the hero object and the three
  product campaign images as first-class flagship graphics.
- `app/aether.module.css` adds the Aether Graphic System 02 overlays, telemetry,
  coordinate plates, object rails, responsive crops, and reduced-motion behavior.
- `app/research/page.tsx` now gives Radiance-Luminance Theory and Alpha Wolf Eyes
  a visual featured-paper stage.
- `app/editorial.module.css` adds the responsive research field and paper campaign plate.
- The slim Sites projection mirrors the same source and optimized assets.

## Rollback

The prior V1 remains in git history at commit `411c4b0`. Reverting this pass does
not affect the old main-site branch, sleeping archive, paper PDFs, routes, or product data.

## Validation

- Image inspection: passed for all five final WebP assets.
- `git diff --check`: passed.
- Slim production build: passed.
  - Turbopack compilation completed in 99 seconds.
  - TypeScript completed in 117 seconds.
  - Static generation completed for 28 of 28 routes.
  - Packaged Sites entrypoints exist at `dist/server/index.js`,
    `dist/.openai/hosting.json`, and `dist/assets/index.html`.
  - All five optimized V2 graphics are present in `dist/assets/aether-v2/`.
- Sites version 5 deployed successfully, then the live browser proof exposed a
  static-host mismatch: Next Image was requesting `/_next/image` optimization
  endpoints that do not exist on the static Sites projection.
- The five new campaign images now use direct static delivery with `unoptimized`.
  Sites version 6 deployed successfully from projection commit
  `c06193c7cf3154ee97a081f194a8813354f96fb2`.
- Final deployment:
  - URL: `https://atomeons-aether.a-mccree.chatgpt.site`
  - Version: 6
  - Version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_e93e01aade248191a46c74e511baadb6`
  - Deployment ID: `appgdep_6a59e9846ddc81918b0a2a214e045687`
- Browser proof after the correction confirmed direct `/aether-v2/*.webp` URLs.
  The hero and first product image both completed with natural dimensions
  `1536 × 1024`; below-fold product images remained correctly lazy-loaded.
