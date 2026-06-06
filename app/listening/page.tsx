import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Listening · studio music · what's on while the lab ships",
  description:
    "What plays in the studio at AtomEons. Albums on repeat, artists in rotation, the soundtrack to a one-operator AI lab. Honest list, with one-sentence notes.",
  alternates: { canonical: "https://atomeons.com/listening" },
};

type Album = {
  title: string;
  artist: string;
  year?: number;
  category: "ambient" | "electronic" | "classical" | "jazz" | "vocal" | "soundtrack" | "post-rock";
  note: string;
  url?: string;
};

const ALBUMS: Album[] = [
  { title: "Music for Airports", artist: "Brian Eno", year: 1978, category: "ambient", note: "The genre-naming record. Plays on the lab's speakers when the work needs space.", url: "https://en.wikipedia.org/wiki/Ambient_1:_Music_for_Airports" },
  { title: "Selected Ambient Works 85–92", artist: "Aphex Twin", year: 1992, category: "ambient", note: "Cold, deliberate, alien. The right music for late-night code passes.", url: "https://en.wikipedia.org/wiki/Selected_Ambient_Works_85%E2%80%9392" },
  { title: "Music for 18 Musicians", artist: "Steve Reich", year: 1976, category: "classical", note: "Phase music as machinery. The Lissajous-curve layer of the SacredCanvas owes Reich the rhythm.", url: "https://en.wikipedia.org/wiki/Music_for_18_Musicians" },
  { title: "Solo Piano · Volume I-III", artist: "Philip Glass", year: 1989, category: "classical", note: "The piano figures repeat, shift, persist. Perfect for sustained focus.", url: "https://en.wikipedia.org/wiki/Glassworks" },
  { title: "The Köln Concert", artist: "Keith Jarrett", year: 1975, category: "jazz", note: "The recording of a tired pianist on a broken piano improvising for 66 minutes. Inspiration.", url: "https://en.wikipedia.org/wiki/The_K%C3%B6ln_Concert" },
  { title: "Kind of Blue", artist: "Miles Davis", year: 1959, category: "jazz", note: "The most-played jazz record for a reason. Modal jazz at its most spacious.", url: "https://en.wikipedia.org/wiki/Kind_of_Blue" },
  { title: "A Love Supreme", artist: "John Coltrane", year: 1965, category: "jazz", note: "Devotional jazz. Plays on the lab speakers during the highest-stakes ship windows.", url: "https://en.wikipedia.org/wiki/A_Love_Supreme" },
  { title: "Bach · Goldberg Variations (Gould 1981)", artist: "J.S. Bach / Glenn Gould", year: 1981, category: "classical", note: "Gould's second recording. The variations as exhaustive study of a single bass line.", url: "https://en.wikipedia.org/wiki/Goldberg_Variations" },
  { title: "Bach · Cello Suites (Yo-Yo Ma 2018)", artist: "J.S. Bach / Yo-Yo Ma", year: 2018, category: "classical", note: "Yo-Yo Ma's third complete recording. Played quietly when the lab needs to slow down.", url: "https://en.wikipedia.org/wiki/Cello_Suites_(Bach)" },
  { title: "Substrata", artist: "Biosphere", year: 1997, category: "ambient", note: "Arctic ambient. The right music for editorial review passes that take all afternoon.", url: "https://en.wikipedia.org/wiki/Substrata_(album)" },
  { title: "Endtroducing.....", artist: "DJ Shadow", year: 1996, category: "electronic", note: "The instrumental hip-hop record that proved sampling could carry an entire album.", url: "https://en.wikipedia.org/wiki/Endtroducing....." },
  { title: "Discovery", artist: "Daft Punk", year: 2001, category: "electronic", note: "The lab's official 'something heavy is shipping today' record.", url: "https://en.wikipedia.org/wiki/Discovery_(Daft_Punk_album)" },
  { title: "Random Access Memories", artist: "Daft Punk", year: 2013, category: "electronic", note: "The follow-up. Bigger, lusher, more melancholy. Plays during longer build passes.", url: "https://en.wikipedia.org/wiki/Random_Access_Memories" },
  { title: "Slow, Deep and Hard", artist: "Type O Negative", year: 1991, category: "post-rock", note: "Not for everyone. Plays on the rare occasions the lab needs to think under pressure.", url: "https://en.wikipedia.org/wiki/Slow,_Deep_and_Hard" },
  { title: "Spirit of Eden", artist: "Talk Talk", year: 1988, category: "post-rock", note: "The album that ended pop and started post-rock. Patience demanded; rewards given.", url: "https://en.wikipedia.org/wiki/Spirit_of_Eden" },
  { title: "Laughing Stock", artist: "Talk Talk", year: 1991, category: "post-rock", note: "The follow-up to Spirit of Eden. Even more patient. Even more rewarding.", url: "https://en.wikipedia.org/wiki/Laughing_Stock" },
  { title: "OK Computer", artist: "Radiohead", year: 1997, category: "post-rock", note: "Still the best argument for what an album can do once you let it breathe.", url: "https://en.wikipedia.org/wiki/OK_Computer" },
  { title: "Blade Runner OST", artist: "Vangelis", year: 1982, category: "soundtrack", note: "The soundtrack to imagining the future. Plays during the lab's nightly Founder's View prep.", url: "https://en.wikipedia.org/wiki/Blade_Runner_(soundtrack)" },
  { title: "Solaris OST", artist: "Cliff Martinez", year: 2002, category: "soundtrack", note: "The Soderbergh remake's score. Glacial, gorgeous, perfect for empty-page sessions.", url: "https://en.wikipedia.org/wiki/Solaris_(2002_film)#Music" },
  { title: "Arrival OST", artist: "Jóhann Jóhannsson", year: 2016, category: "soundtrack", note: "Heptapod B as music. The score is the proof that the language alters cognition.", url: "https://en.wikipedia.org/wiki/Arrival_(2016_film)" },
];

const CATEGORIES: Array<Album["category"]> = ["ambient", "classical", "electronic", "jazz", "post-rock", "soundtrack", "vocal"];

export default function ListeningPage() {
  const byCategory = (c: Album["category"]) => ALBUMS.filter((a) => a.category === c);
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ listening · studio music</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            What plays while the work happens.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The lab plays music nearly all day. Mostly instrumental, mostly
            patient, mostly in the spaces around ambient and post-classical.
            One-sentence notes per album. No streaming-service affiliate
            links; you find these in any catalog.
          </p>
        </div>
      </section>

      {CATEGORIES.filter((c) => byCategory(c).length > 0).map((cat) => (
        <section key={cat} className="border-b border-[#1F242B]">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ {cat}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {byCategory(cat).map((a) => (
                <div key={a.title} className="border border-[#1F242B] bg-[#0F1114] p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    {a.url ? (
                      <a href={a.url} target="_blank" rel="noopener noreferrer" className="font-serif text-[17px] font-medium text-[#F4F4F2] hover:text-[#22F0D5]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                        {a.title}
                      </a>
                    ) : (
                      <p className="font-serif text-[17px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{a.title}</p>
                    )}
                    {a.year ? <p className="font-mono text-[11px] tabular-nums text-[#5A6068]">{a.year}</p> : null}
                  </div>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">{a.artist}</p>
                  <p className="mt-3 font-serif text-[14px] italic leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{a.note}</p>
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
              { href: "/library", label: "Library · physical books" },
              { href: "/watching", label: "Watching · films + shows" },
              { href: "/influences", label: "Influences · named people" },
              { href: "/lab", label: "The lab · workspace" },
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
