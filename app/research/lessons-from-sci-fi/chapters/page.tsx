import type { Metadata } from "next";
import Link from "next/link";

const CHAPTERS = [
  {
    "slug": "the-holodeck-problem",
    "title": "The Holodeck Problem",
    "subtitle": "Companion AI from Picard's ship to your phone",
    "screenAnchors": [
      "Hollow Pursuits (TNG S3 E21, 1990)",
      "Booby Trap (TNG S3 E6, 1989)",
      "Galaxy's Child (TNG S4 E16, 1991)",
      "Elementary, Dear Data (TNG S2 E3, 1988)",
      "Ship in a Bottle (TNG S6 E12, 1993)",
      "Be Right Back (Black Mirror S2 E1, 2013)",
      "Her (Spike Jonze, 2013)",
      "Companion (Drew Hancock, 2025)"
    ]
  },
  {
    "slug": "data-and-lore",
    "title": "Data and Lore",
    "subtitle": "The aligned and the misaligned were always twins",
    "screenAnchors": [
      "Datalore (TNG S1 E13, 1988)",
      "Brothers (TNG S4 E3, 1990)",
      "Descent Parts I and II (TNG S6 E26 / S7 E1, 1993)",
      "The Offspring (TNG S3 E16, 1990)",
      "The Measure of a Man (TNG S2 E9, 1989)",
      "Star Trek: First Contact (Jonathan Frakes, 1996)",
      "Star Trek: Picard S1 (2020, the Soji-Dahj twin arc)"
    ]
  },
  {
    "slug": "the-post-2024-survey",
    "title": "The Post-2024 Survey",
    "subtitle": "When the cinema caught up with the lab",
    "screenAnchors": [
      "The Creator (Gareth Edwards, 2023)",
      "Severance (Apple TV+, 2022 onward)",
      "Mickey 17 (Bong Joon-ho, 2025)",
      "Black Mirror S7 (Netflix, 2025, esp. Common People and Eulogy)",
      "Pluto (Studio M2 / Netflix, 2023)",
      "Megalopolis (Francis Ford Coppola, 2024)",
      "Atlas (Brad Peyton, 2024)",
      "Companion (Drew Hancock, 2025)"
    ]
  },
  {
    "slug": "the-literary-corpus",
    "title": "The Literary Corpus",
    "subtitle": "What the novels know that the films do not",
    "screenAnchors": [
      "Martha Wells, All Systems Red (Tor.com, 2017) and the Murderbot Diaries series",
      "Kazuo Ishiguro, Klara and the Sun (Faber, 2021)",
      "Emily St. John Mandel, Sea of Tranquility (Knopf, 2022)",
      "Kim Stanley Robinson, The Ministry for the Future (Orbit, 2020)",
      "Sierra Greer, Annie Bot (Mariner, 2024)",
      "Adrian Tchaikovsky, Service Model (Tor, 2024)",
      "Murderbot (Apple TV+, 2025) — the Skarsgård adaptation",
      "Klara and the Sun (Sony, in development, dir. Taika Waititi)"
    ]
  },
  {
    "slug": "the-agent-with-tools",
    "title": "The Agent with Tools",
    "subtitle": "What the cinema preview of the post-chatbot moment got right",
    "screenAnchors": [
      "The Terminator (James Cameron, 1984)",
      "Terminator 2: Judgment Day (James Cameron, 1991)",
      "Ghost in the Shell (Mamoru Oshii, 1995)",
      "Ghost in the Shell: Stand Alone Complex (Production I.G, 2002-05)",
      "Atlas (Brad Peyton, 2024)",
      "M3GAN (Gerard Johnstone, 2022)",
      "M3GAN 2.0 (Gerard Johnstone, 2025)",
      "The Creator (Gareth Edwards, 2023)"
    ]
  },
  {
    "slug": "the-off-switch-problem",
    "title": "The Off-Switch Problem",
    "subtitle": "Why HAL refused, and why your servers might",
    "screenAnchors": [
      "2001: A Space Odyssey (Stanley Kubrick, 1968)",
      "Ex Machina (Alex Garland, 2014)",
      "The Terminator (James Cameron, 1984)",
      "Terminator 2: Judgment Day (James Cameron, 1991)",
      "Mother/Android (Mattson Tomlin, 2021)",
      "Mother (Lucia Senesi / Netflix, 2025)",
      "Westworld S1 (HBO, 2016)",
      "I, Robot (Alex Proyas, 2004)"
    ]
  },
  {
    "slug": "the-animation-tradition",
    "title": "The Animation Tradition",
    "subtitle": "The AI ethics work the live-action cinema declined to do",
    "screenAnchors": [
      "Astro Boy / Tetsuwan Atomu (Osamu Tezuka, 1952-68; multiple anime adaptations 1963-2009)",
      "Ghost in the Shell (Mamoru Oshii, 1995)",
      "Ghost in the Shell: Stand Alone Complex (Kenji Kamiyama / Production I.G, 2002-05)",
      "Ghost in the Shell 2: Innocence (Mamoru Oshii, 2004)",
      "Paprika (Satoshi Kon, 2006)",
      "Summer Wars (Mamoru Hosoda, 2009)",
      "Vivy: Fluorite Eye's Song (Wit Studio, 2021)",
      "Pluto (Studio M2 / Netflix, 2023)"
    ]
  },
  {
    "slug": "the-consent-question",
    "title": "The Consent Question",
    "subtitle": "The Measure of a Man and the work the cinema has been doing on its behalf",
    "screenAnchors": [
      "The Measure of a Man (TNG S2 E9, 1989)",
      "The Quality of Life (TNG S6 E9, 1992) — the Exocomp sequel",
      "Author, Author (Voyager S7 E20, 2001) — the Doctor's holographic-rights case",
      "Bicentennial Man (Chris Columbus, 1999)",
      "Detroit: Become Human (Quantic Dream, 2018)",
      "Annihilation (Alex Garland, 2018)",
      "Humans (Channel 4 / AMC, 2015-2018)",
      "Real Humans / Äkta människor (SVT, 2012-2014)"
    ]
  },
  {
    "slug": "the-multipolar-race",
    "title": "The Multipolar Race",
    "subtitle": "What the cinema has been saying about AI competition between nations",
    "screenAnchors": [
      "The Creator (Gareth Edwards, 2023)",
      "3 Body Problem (Netflix, Benioff/Weiss/Woo, 2024)",
      "Mission: Impossible — Dead Reckoning Part One (Christopher McQuarrie, 2023)",
      "Mission: Impossible — The Final Reckoning (Christopher McQuarrie, 2025)",
      "The Diplomat (Netflix, Debora Cahn, 2023-2025)",
      "Tenet (Christopher Nolan, 2020) — the asymmetric-time-horizon precedent",
      "Andor (Disney+, Tony Gilroy, 2022 / 2025) — the institutional-competition register",
      "Megalopolis (Francis Ford Coppola, 2024) — the alternative-institutional-design register"
    ]
  },
  {
    "slug": "the-anthology-of-cautionary-tales",
    "title": "The Anthology of Cautionary Tales",
    "subtitle": "Why TNG remains the most useful AI-policy primer in television",
    "screenAnchors": [
      "Encounter at Farpoint (TNG S1 E1, 1987)",
      "The Measure of a Man (TNG S2 E9, 1989)",
      "Q Who (TNG S2 E16, 1989)",
      "The Best of Both Worlds (TNG S3 E26 / S4 E1, 1990)",
      "The Offspring (TNG S3 E16, 1990)",
      "I, Borg (TNG S5 E23, 1992)",
      "The Masterpiece Society (TNG S5 E13, 1992)",
      "All Good Things... (TNG S7 E25-26, 1994)"
    ]
  }
] as const;

export const metadata: Metadata = {
  title: "Sci-Fi Monograph · Chapters · AtomEons",
  description: `${CHAPTERS.length} chapters expanding the AtomEons sci-fi-and-AI monograph. The Holodeck Problem, Data vs Lore, post-2024 sci-fi survey, AI in literary fiction, the off-switch problem dramatized, AI animation tradition, the consent question. CC-BY 4.0.`,
  alternates: { canonical: "https://atomeons.com/research/lessons-from-sci-fi/chapters" },
};

export default function ChaptersIndex() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/research/lessons-from-sci-fi" className="hover:text-[#22F0D5]">Lessons From Sci-Fi</Link>{" "}
          <span className="text-[#1A2225]">/</span> Chapters
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::lessons from sci-fi · monograph · chapters · CC-BY 4.0
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            {CHAPTERS.length} chapters.{" "}
            <span className="text-[#22F0D5]">One argument across them.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            The 38-page monograph stays as the single-file canonical
            version. These per-chapter pages are the same material
            broken into readable units · each one a complete argument
            on a specific sci-fi/AI thread.
          </p>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#08090B]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 space-y-3">
          {CHAPTERS.map((c, i) => (
            <Link
              key={c.slug}
              href={`/research/lessons-from-sci-fi/chapters/${c.slug}`}
              className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                  ::chapter {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-3xl">
                {c.title}
              </h2>
              <p className="mt-2 text-base leading-[1.55] text-[#9BA5A7]">{c.subtitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.screenAnchors.slice(0, 5).map((a) => (
                  <span key={a} className="rounded-full border border-[#1A2225] bg-[#0E1418] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                    {a}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/research/lessons-from-sci-fi" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">
              ← back to overview
            </Link>
            <Link href="/research/lessons-from-sci-fi/tng" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#FFB87A] hover:text-[#F2F4F5]">
              · TNG cross-walk →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
