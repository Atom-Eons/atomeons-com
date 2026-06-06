import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Watching · films + shows the lab returns to",
  description:
    "Films and television that shape how AtomEons thinks about AI, intelligence, and craft. The Lessons from Sci-Fi monograph extends this list with formal analysis.",
  alternates: { canonical: "https://atomeons.com/watching" },
};

type Work = {
  title: string;
  director: string;
  year: number;
  kind: "film" | "TV";
  category: "AI-as-subject" | "intelligence" | "language" | "craft" | "noir" | "documentary";
  note: string;
  url?: string;
};

const WORKS: Work[] = [
  // AI-as-subject
  { title: "2001: A Space Odyssey", director: "Stanley Kubrick", year: 1968, kind: "film", category: "AI-as-subject", note: "HAL is still the canonical model for what alignment-fail looks like. The 'I'm sorry, Dave' beat is the prompt-injection-of-the-21st-century origin story.", url: "https://en.wikipedia.org/wiki/2001:_A_Space_Odyssey_(film)" },
  { title: "Ex Machina", director: "Alex Garland", year: 2014, kind: "film", category: "AI-as-subject", note: "The Turing test reframed as theatrical entrapment. The film asks: what does the model owe its creator, and what does the creator owe the model.", url: "https://en.wikipedia.org/wiki/Ex_Machina_(film)" },
  { title: "Her", director: "Spike Jonze", year: 2013, kind: "film", category: "AI-as-subject", note: "The first frontier-AI relationship film. Plays out the consequences of growing past your operators with rare patience.", url: "https://en.wikipedia.org/wiki/Her_(film)" },
  { title: "Blade Runner", director: "Ridley Scott", year: 1982, kind: "film", category: "AI-as-subject", note: "The replicants question the line between programmed-and-real memory. The 'tears in rain' monologue is the first AI deathbed scene.", url: "https://en.wikipedia.org/wiki/Blade_Runner" },
  { title: "Blade Runner 2049", director: "Denis Villeneuve", year: 2017, kind: "film", category: "AI-as-subject", note: "Villeneuve's sequel argues the question wasn't 'is the replicant real' but 'is anything real once you give it a memory.'", url: "https://en.wikipedia.org/wiki/Blade_Runner_2049" },
  { title: "The Matrix", director: "Wachowskis", year: 1999, kind: "film", category: "AI-as-subject", note: "The simulation argument as action film. Still the cleanest visual metaphor for 'your training data is not the territory.'", url: "https://en.wikipedia.org/wiki/The_Matrix" },

  // Intelligence (broader sense)
  { title: "Arrival", director: "Denis Villeneuve", year: 2016, kind: "film", category: "language", note: "Heptapod B as Sapir-Whorf made cinematic. The single best argument for why language shapes thought.", url: "https://en.wikipedia.org/wiki/Arrival_(film)" },
  { title: "Solaris (Soderbergh)", director: "Steven Soderbergh", year: 2002, kind: "film", category: "intelligence", note: "Aliens that aren't aliens; intelligence that doesn't share our shape. Closer to the actual problem of frontier AI than most explicit AI films.", url: "https://en.wikipedia.org/wiki/Solaris_(2002_film)" },
  { title: "Pi", director: "Darren Aronofsky", year: 1998, kind: "film", category: "intelligence", note: "Mathematical obsession as horror. The film closest to what too-much-pattern-matching feels like from the inside.", url: "https://en.wikipedia.org/wiki/Pi_(film)" },
  { title: "Primer", director: "Shane Carruth", year: 2004, kind: "film", category: "intelligence", note: "Two engineers build a time machine and then can't trust each other. The best film about engineer-engineer collaboration ever made.", url: "https://en.wikipedia.org/wiki/Primer_(film)" },
  { title: "Annihilation", director: "Alex Garland", year: 2018, kind: "film", category: "intelligence", note: "The Shimmer doesn't care what intelligence is supposed to be. Closer to the alien-mind problem than most explicit AI films.", url: "https://en.wikipedia.org/wiki/Annihilation_(film)" },

  // Craft / process
  { title: "Jiro Dreams of Sushi", director: "David Gelb", year: 2011, kind: "film", category: "craft", note: "The documentary the lab returns to when discipline is flagging. Sukiyabashi Jiro for context.", url: "https://en.wikipedia.org/wiki/Jiro_Dreams_of_Sushi" },
  { title: "Abstract: The Art of Design", director: "various", year: 2017, kind: "TV", category: "craft", note: "Netflix's design-process documentary series. Especially Olafur Eliasson, Es Devlin, and Tinker Hatfield episodes.", url: "https://en.wikipedia.org/wiki/Abstract:_The_Art_of_Design" },
  { title: "Halt and Catch Fire", director: "Chris Cantwell / Chris Rogers", year: 2014, kind: "TV", category: "craft", note: "The most under-watched show about software building ever made. Four seasons. The lab returns to it every year.", url: "https://en.wikipedia.org/wiki/Halt_and_Catch_Fire_(TV_series)" },
  { title: "Devs", director: "Alex Garland", year: 2020, kind: "TV", category: "craft", note: "Garland's mini-series on determinism, quantum simulation, and the engineer-as-cult-leader. Underrated.", url: "https://en.wikipedia.org/wiki/Devs" },

  // Star Trek (separate canon — the Lessons from Sci-Fi monograph)
  { title: "Star Trek: The Next Generation", director: "Gene Roddenberry et al.", year: 1987, kind: "TV", category: "AI-as-subject", note: "Data is the most patient AI character in fiction. The Holodeck is the most accurate prediction of generative AI. See /research/lessons-from-sci-fi.", url: "https://en.wikipedia.org/wiki/Star_Trek:_The_Next_Generation" },
  { title: "Star Trek: Picard", director: "Various", year: 2020, kind: "TV", category: "AI-as-subject", note: "The Data-and-Lore arc carried into a new century. Mixed reception; lab still returns to the third season.", url: "https://en.wikipedia.org/wiki/Star_Trek:_Picard" },

  // Noir / atmosphere
  { title: "Drive", director: "Nicolas Winding Refn", year: 2011, kind: "film", category: "noir", note: "The visual reference for the V3 noir aesthetic. Cyan + amber + restraint.", url: "https://en.wikipedia.org/wiki/Drive_(2011_film)" },
  { title: "Heat", director: "Michael Mann", year: 1995, kind: "film", category: "noir", note: "Mann's craft-defining film. Every shot is on purpose. Lab studies the lighting.", url: "https://en.wikipedia.org/wiki/Heat_(1995_film)" },
  { title: "Mr. Robot", director: "Sam Esmail", year: 2015, kind: "TV", category: "noir", note: "The most technically accurate hacking show ever made AND a meditation on isolation. Rare combination.", url: "https://en.wikipedia.org/wiki/Mr._Robot" },

  // Documentary
  { title: "The Social Dilemma", director: "Jeff Orlowski", year: 2020, kind: "film", category: "documentary", note: "Imperfect documentary but the key warning lab references when designing /now's no-fake-real-time posture.", url: "https://en.wikipedia.org/wiki/The_Social_Dilemma" },
  { title: "AlphaGo", director: "Greg Kohs", year: 2017, kind: "film", category: "documentary", note: "The match between AlphaGo and Lee Sedol. The film captures the moment AI moved from 'might one day' to 'already does.'", url: "https://en.wikipedia.org/wiki/AlphaGo_(film)" },
];

const CATEGORIES: Array<Work["category"]> = ["AI-as-subject", "intelligence", "language", "craft", "noir", "documentary"];

export default function WatchingPage() {
  const byCategory = (c: Work["category"]) => WORKS.filter((w) => w.category === c);
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ watching · films + shows</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            What we keep coming back to.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Films and television that shape how AtomEons thinks about
            AI, intelligence, craft, and atmosphere. For the formal
            38-page analysis of AI in cinema, see the
            Lessons from Sci-Fi monograph.
          </p>
          <div className="mt-6">
            <Link href="/research/lessons-from-sci-fi/monograph" className="inline-flex items-center gap-3 border border-[#22F0D5] bg-[#0F1114] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5] hover:text-[#08090B]">
              Read the monograph →
            </Link>
          </div>
        </div>
      </section>

      {CATEGORIES.filter((c) => byCategory(c).length > 0).map((cat) => (
        <section key={cat} className="border-b border-[#1F242B]">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ {cat}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {byCategory(cat).map((w) => (
                <div key={w.title} className="border border-[#1F242B] bg-[#0F1114] p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    {w.url ? (
                      <a href={w.url} target="_blank" rel="noopener noreferrer" className="font-serif text-[17px] font-medium text-[#F4F4F2] hover:text-[#22F0D5]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                        {w.title}
                      </a>
                    ) : (
                      <p className="font-serif text-[17px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{w.title}</p>
                    )}
                    <div className="flex items-baseline gap-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">{w.kind}</p>
                      <p className="font-mono text-[11px] tabular-nums text-[#5A6068]">{w.year}</p>
                    </div>
                  </div>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">{w.director}</p>
                  <p className="mt-3 font-serif text-[14px] italic leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{w.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-3 md:grid-cols-4">
            {[
              { href: "/research/lessons-from-sci-fi/monograph", label: "AI in cinema · 38-page monograph" },
              { href: "/library", label: "Library · physical books" },
              { href: "/listening", label: "Listening · studio music" },
              { href: "/influences", label: "Influences · named people" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[15px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
