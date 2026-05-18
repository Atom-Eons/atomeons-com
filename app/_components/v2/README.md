# v2/ — Lab Homepage Components

These 9 components compose the v2 homepage for atomeons.com.
The v2 homepage is lab-first, not product-first. It replaces the 16-section
OrangeBox product page as the root experience.

## Architect's intended render order

```
1. HeroLabManifest      — lab identity hero, stat strip, no CTAs
2. OrganismRail         — 4 cards: RESEARCH / ORANGEBOX / SKIL.SKI / B00KMAKOR
3. ResearchSnapshot     — 3 featured papers, CC-BY 4.0 surface
4. OrangeBoxBlock       — condensed product sell block, live price + buy
5. SkilSkiBlock         — skil.ski registry surface, stat pair
6. FoundersViewTeaser   — nightly broadcast, countdown island, RSS link
7. IntelDrop            — featured intel card, alpha drop
8. FounderCard          — operator bio, AeMark, links
9. LabFooterCTA         — 5-tile closing navigation grid
```

## Activation

The swap into `app/page.tsx` happens in a separate step — do not modify
`app/page.tsx` here. When ready, replace the v5 Hero + section imports
with the v2 imports in the order above.

## Component types

All 9 are server components by default.
- `FoundersViewTeaser` — server wrapper; renders `FoundersViewCountdown`
  (client) as a child island.
- `OrangeBoxBlock` — server wrapper; renders `BuyButton`, `DynamicPrice`,
  `SalesCounterV5` (all client) as children.
- All others: pure server, no client boundary needed.

## Palette

```
bg:          #0A0F11 / #000
text:        #F2F4F5
muted:       #6B7779  / #9BA5A7
border:      #1A2225
orange:      #FF7A1A
cyan:        #22F0D5
```

## Voice law

- Terse, declarative, numbers naked, names naked.
- No "we" (one operator). No "actually". No generic CTAs.
- ALL CAPS for the line that has to land (used sparingly).
- Eyebrow pattern: `::LABEL · SUBLABEL` in `font-mono text-[10px] uppercase tracking-[0.32em]`.
