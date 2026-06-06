import type { Metadata } from "next";
import Link from "next/link";
import {
  AbstractGlyph,
  OrbitGlyph,
  WaveformGlyph,
  LatticeGlyph,
  MandalaGlyph,
  NetworkGlyph,
  ParticleField,
  ChevronGlyph,
  SpiralGlyph,
  PrismGlyph,
} from "../_components/V3/Illustrations";
import {
  FlowerOfLife,
  MetatronCube,
  SriYantra,
  TruchetTiles,
  VoronoiCells,
  PenroseTiling,
  FractalTree,
  WaveInterference,
} from "../_components/V3/Illustrations2";
import {
  PythagorasTree,
  HilbertCurve,
  SierpinskiTriangle,
  KochSnowflake,
  LorenzAttractor,
} from "../_components/V3/Illustrations3";

/**
 * /art · the AtomEons generative-art gallery.
 *
 * Wave 43 · 2026-06-06 · operator: "go 100x deeper in the art."
 *
 * 18 illustration families × 8 variants each = 144 unique pieces.
 * All pure SVG · server-rendered · GPU-cheap · zero external deps.
 * Each piece is deterministic on (family, seed, hue) so reloads
 * produce the same image.
 *
 * The lab's procedural-art canon · Library of Alexandria for sacred
 * geometry meets TouchDesigner-style generative depth.
 */

export const metadata: Metadata = {
  title: "Art · 368 generative sacred-geometry pieces",
  description:
    "AtomEons procedural art gallery · 23 families × 16 variants = 368 unique pieces · Flower of Life · Metatron · Sri Yantra · Penrose tiling · Truchet · Voronoi · Pythagoras tree · Hilbert curve · Sierpinski · Koch · Lorenz attractor · fractal trees · wave interference · phyllotaxis · mandalas · all pure SVG · zero JavaScript · open-license CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/art" },
  openGraph: {
    title: "Art · 368 generative pieces · AtomEons",
    description:
      "TouchDesigner-grade sacred geometry + chaos + fractals · all SVG · all sourced · all open.",
    url: "https://atomeons.com/art",
    type: "article",
  },
};

interface FamilyEntry {
  name: string;
  family: string;
  component: React.ComponentType<{ seed: number; hue: number; size: number }>;
  hueBase: number;
  about: string;
}

const FAMILIES: FamilyEntry[] = [
  // Classics from Illustrations.tsx
  { name: "Abstract Glyph", family: "concentric", component: AbstractGlyph, hueBase: 175, about: "Concentric rings + radial spokes · the foundational lab sigil." },
  { name: "Orbit", family: "celestial", component: OrbitGlyph, hueBase: 220, about: "Planets on offset orbits · tilted plane · single anchor at center." },
  { name: "Waveform", family: "linear", component: WaveformGlyph, hueBase: 35, about: "Sine wave stack · seven lines at phase offsets · radio-spectrum analog." },
  { name: "Lattice", family: "grid", component: LatticeGlyph, hueBase: 270, about: "Selective hex-grid fill · stochastic but seeded · maze topology." },
  { name: "Mandala", family: "radial", component: MandalaGlyph, hueBase: 165, about: "Twelve-fold radial petals · the Tibetan thangka geometry." },
  { name: "Network", family: "graph", component: NetworkGlyph, hueBase: 195, about: "Node-link force diagram · golden-angle node placement." },
  { name: "Particle Field", family: "scatter", component: ParticleField, hueBase: 220, about: "Phyllotaxis dot scatter · the sunflower seed pattern." },
  { name: "Chevron", family: "directional", component: ChevronGlyph, hueBase: 15, about: "Arrow stack · directional indicator · five layers deep." },
  { name: "Spiral", family: "rotational", component: SpiralGlyph, hueBase: 285, about: "Logarithmic spiral · multi-armed · the galaxy form." },
  { name: "Prism", family: "spectral", component: PrismGlyph, hueBase: 0, about: "Refracted rainbow bars · light through a glass prism." },
  // New sacred-geom canon from Illustrations2.tsx
  { name: "Flower of Life", family: "sacred-classic", component: FlowerOfLife, hueBase: 175, about: "Nineteen interlocking circles · the oldest sacred-geom motif · ancient Egyptian to da Vinci." },
  { name: "Metatron's Cube", family: "sacred-classic", component: MetatronCube, hueBase: 200, about: "Thirteen circles + all-pairs edges · Platonic-solid generator · Kabbalistic Tree of Life root." },
  { name: "Sri Yantra", family: "sacred-classic", component: SriYantra, hueBase: 40, about: "Nine interlocking triangles · forty-three sub-triangles · ancient Hindu tantric diagram." },
  { name: "Truchet Tiles", family: "tessellation", component: TruchetTiles, hueBase: 290, about: "Quarter-arc maze field · Sébastien Truchet · 1704 · stochastic but deterministic on seed." },
  { name: "Voronoi Cells", family: "tessellation", component: VoronoiCells, hueBase: 100, about: "Cell diagram from sparse seeds · the cellular-tissue / dragonfly-wing pattern." },
  { name: "Penrose Tiling", family: "tessellation", component: PenroseTiling, hueBase: 320, about: "Kite + dart aperiodic tiles · Roger Penrose · 1974 · five-fold quasi-crystal symmetry." },
  { name: "Fractal Tree", family: "recursive", component: FractalTree, hueBase: 130, about: "L-system recursive branching · the Pythagoras tree · biological self-similarity." },
  { name: "Wave Interference", family: "physics", component: WaveInterference, hueBase: 195, about: "Two-source ripple field · the double-slit experiment visualized." },
  // Wave 45 · 5 new fractals + chaos
  { name: "Pythagoras Tree", family: "recursive", component: PythagorasTree, hueBase: 130, about: "Recursive squared branching · the right-triangle relation rendered as growth." },
  { name: "Hilbert Curve", family: "space-filling", component: HilbertCurve, hueBase: 195, about: "Space-filling fractal · maps a line to fill a square at the limit. The data-locality classic." },
  { name: "Sierpinski Triangle", family: "self-similar", component: SierpinskiTriangle, hueBase: 50, about: "Recursive triangle removal · 1915 Wacław Sierpiński · self-similarity made geometric." },
  { name: "Koch Snowflake", family: "self-similar", component: KochSnowflake, hueBase: 200, about: "Infinite perimeter, finite area · 1904 Helge von Koch · the first published fractal curve." },
  { name: "Lorenz Attractor", family: "chaos", component: LorenzAttractor, hueBase: 285, about: "Edward Lorenz 1963 · the butterfly · the equations that introduced chaos theory to the world." },
];

const VARIANTS_PER_FAMILY = 16;

export default function ArtPage() {
  const totalPieces = FAMILIES.length * VARIANTS_PER_FAMILY;

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ART · GENERATIVE GALLERY · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(56px,11vw,140px)] font-light leading-[0.88]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          Art.
        </h1>
        <p
          className="mt-4 text-[clamp(22px,2.6vw,32px)] font-light italic leading-[1.3] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          {totalPieces} generative pieces. All math. All open.
        </p>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          Eighteen procedural-illustration families · eight variants each.
          Pure SVG. Server-rendered. Deterministic per seed. No external
          dependency. Every piece is mathematics rendered honestly.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]">
          {FAMILIES.length} families · {VARIANTS_PER_FAMILY} variants each · {totalPieces} total · CC-BY 4.0
        </p>
      </header>

      {/* Family-by-family gallery */}
      {FAMILIES.map((fam) => (
        <section key={fam.name} className="mt-16 border-t border-[#1F242B] pt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2
              className="text-[28px] font-light leading-tight text-[#F4F4F2] md:text-[36px]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              {fam.name}
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              {fam.family} · {VARIANTS_PER_FAMILY} variants
            </p>
          </div>
          <p className="mt-3 max-w-[80ch] text-[14px] leading-[1.6] text-[#9CA3AF]">
            {fam.about}
          </p>
          <div className="mt-8 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {Array.from({ length: VARIANTS_PER_FAMILY }).map((_, i) => {
              const seed = i;
              const hue = (fam.hueBase + i * 22.5) % 360;
              const Family = fam.component;
              return (
                <div
                  key={i}
                  className="aspect-square border border-[#1F242B] bg-[#0B0C0F] p-2.5 transition hover:border-[#22F0D5]/60"
                >
                  <Family seed={seed} hue={hue} size={220} />
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#5A6068]">
                    {fam.name.toLowerCase().replace(/\s+/g, "-")}-{seed.toString().padStart(2, "0")} · hue {hue.toFixed(0)}°
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* What this is for */}
      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § What this gallery is for
        </h2>
        <p
          className="mt-4 text-[19px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Every illustration on atomeons.com — page sigils, hero glyphs,
          decoration on cheat sheets — comes from this library. Site-wide
          sacred-geometry backgrounds use the same math. The 144 pieces
          here are not assets · they are the seed values that produce
          everything you see across the lab. Take any one. The component
          source is in <code className="font-mono text-[#22F0D5]">app/_components/V3/Illustrations.tsx</code> and
          <code className="font-mono text-[#22F0D5]"> /Illustrations2.tsx</code>.
        </p>
      </section>

      {/* Cross-link */}
      <section className="mt-16 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Where the art lives across the site
        </h2>
        <ul className="mt-6 space-y-2 text-[14px] leading-[1.65] text-[#9CA3AF]">
          <li>· <Link href="/" className="text-[#22F0D5] hover:underline">/</Link> · site-wide SacredSvg background (10 layered families · GPU-cheap)</li>
          <li>· <Link href="/mindrest/experience" className="text-[#22F0D5] hover:underline">/mindrest/experience</Link> · ocean-wave SVG + 12-fold + 8-fold mandala</li>
          <li>· <Link href="/welcome" className="text-[#22F0D5] hover:underline">/welcome</Link> · each scene uses a parameterized SceneVisual</li>
          <li>· <Link href="/best-practices" className="text-[#22F0D5] hover:underline">/best-practices</Link> · every cheat-sheet card carries a unique AutoGlyph</li>
          <li>· <Link href="/soulkey" className="text-[#22F0D5] hover:underline">/soulkey</Link> · PrismGlyph anchors the header</li>
          <li>· <Link href="/innovations" className="text-[#22F0D5] hover:underline">/innovations</Link> · the brag page glyph</li>
          <li>· Every route ships a unique <code className="font-mono text-[#22F0D5]">RouteSigil</code> derived from the path hash</li>
        </ul>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          /art · {totalPieces} pieces · CC-BY 4.0 · last updated 2026-06-06
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          Source · app/_components/V3/Illustrations.tsx + /Illustrations2.tsx · open this in your editor
        </p>
      </footer>
    </main>
  );
}
