import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Library · books on the operator's shelf · AtomEons",
  description:
    "Physical books on Atom McCree's shelf at the Marco Island lab. Read recently, returned to often, or open at the time of writing. Honest list, with one-sentence reviews.",
  alternates: { canonical: "https://atomeons.com/library" },
};

type Book = {
  title: string;
  author: string;
  year?: number;
  category: "AI · CS" | "writing" | "philosophy" | "engineering" | "fiction" | "biography" | "design";
  review: string;
  url?: string;
};

const BOOKS: Book[] = [
  { title: "Gödel, Escher, Bach · An Eternal Golden Braid", author: "Douglas Hofstadter", year: 1979, category: "philosophy", review: "The book that put strange loops, self-reference, and the question of machine consciousness into one operator's spine.", url: "https://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach" },
  { title: "I Am a Strange Loop", author: "Douglas Hofstadter", year: 2007, category: "philosophy", review: "Hofstadter's sequel arguing the self IS the strange loop — the foundation idea I AM AI's autobiography hangs on.", url: "https://en.wikipedia.org/wiki/I_Am_a_Strange_Loop" },
  { title: "The Pragmatic Programmer", author: "Andy Hunt & Dave Thomas", year: 1999, category: "engineering", review: "Still the best book on the discipline of writing software you can read in a weekend.", url: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/" },
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", year: 2017, category: "engineering", review: "The book any engineer who handles real data should have read by year 3.", url: "https://dataintensive.net/" },
  { title: "Crafting Interpreters", author: "Robert Nystrom", year: 2021, category: "engineering", review: "Best textbook to teach you what a compiler actually does. Two interpreters, one in Java, one in C, built page by page.", url: "https://craftinginterpreters.com/" },
  { title: "The Elements of Computing Systems (Nand to Tetris)", author: "Noam Nisan & Shimon Schocken", year: 2005, category: "engineering", review: "Build a working computer from logic gates up. Everything else makes sense afterward.", url: "https://www.nand2tetris.org/" },
  { title: "Refactoring", author: "Martin Fowler", year: 1999, category: "engineering", review: "How to change code without breaking it. Read once at 25, re-read every few years.", url: "https://martinfowler.com/books/refactoring.html" },
  { title: "Domain-Driven Design", author: "Eric Evans", year: 2003, category: "engineering", review: "Long. Sometimes turgid. Still the canonical text on naming the right boundaries in a system.", url: "https://www.domainlanguage.com/ddd/" },
  { title: "Six Memos for the Next Millennium", author: "Italo Calvino", year: 1988, category: "writing", review: "Lightness, quickness, exactitude, visibility, multiplicity, consistency. The V3 noir aesthetic owes its frame to Calvino.", url: "https://en.wikipedia.org/wiki/Six_Memos_for_the_Next_Millennium" },
  { title: "On Writing Well", author: "William Zinsser", year: 1976, category: "writing", review: "If you only read one book on prose for nonfiction, read this one.", url: "https://en.wikipedia.org/wiki/On_Writing_Well" },
  { title: "The Sense of Style", author: "Steven Pinker", year: 2014, category: "writing", review: "Modern Zinsser. Especially useful if your prose has gone academic and you need to get back to clean.", url: "https://stevenpinker.com/publications/sense-style-thinking-persons-guide-writing-21st-century" },
  { title: "Bird by Bird", author: "Anne Lamott", year: 1994, category: "writing", review: "The book about how to actually keep writing when you don't want to.", url: "https://en.wikipedia.org/wiki/Bird_by_Bird" },
  { title: "Show Your Work!", author: "Austin Kleon", year: 2014, category: "writing", review: "The 'work in public' doctrine that /now and /receipts are downstream of.", url: "https://austinkleon.com/show-your-work/" },
  { title: "The Visual Display of Quantitative Information", author: "Edward Tufte", year: 1983, category: "design", review: "Tufte. Data-ink ratio. Why /receipts looks the way it does.", url: "https://www.edwardtufte.com/tufte/books_vdqi" },
  { title: "Beautiful Evidence", author: "Edward Tufte", year: 2006, category: "design", review: "The sparkline book. The argument for visual evidence integrated INTO prose, not sequestered into charts.", url: "https://www.edwardtufte.com/tufte/books_be" },
  { title: "Less and More · The Design Ethos of Dieter Rams", author: "Klaus Klemp", year: 2017, category: "design", review: "Ten principles. Hairlines. Single accents. The V3 cyan-only rule is downstream of Rams.", url: "https://en.wikipedia.org/wiki/Dieter_Rams" },
  { title: "The Mom Test", author: "Rob Fitzpatrick", year: 2013, category: "engineering", review: "How to talk to potential customers without lying to yourself about their reactions.", url: "https://www.momtestbook.com/" },
  { title: "High Output Management", author: "Andrew S. Grove", year: 1983, category: "engineering", review: "Grove's book on running a team is also the best book on running yourself when you're a team of one.", url: "https://en.wikipedia.org/wiki/High_Output_Management" },
  { title: "Deep Work", author: "Cal Newport", year: 2016, category: "philosophy", review: "Why the lab's no-meetings-before-14:00 rule exists.", url: "https://www.calnewport.com/books/deep-work/" },
  { title: "Anti-Library: Why an Unread Library Is More Valuable Than a Read One", author: "Nassim Nicholas Taleb (Black Swan ch.)", year: 2007, category: "philosophy", review: "The shelf you HAVEN'T read yet is the open option. The lab's library is mostly unread; that's the point.", url: "https://en.wikipedia.org/wiki/The_Black_Swan_(Taleb_book)" },
];

const CATEGORIES: Array<Book["category"]> = ["AI · CS", "engineering", "writing", "design", "philosophy", "biography", "fiction"];

export default function LibraryPage() {
  const byCategory = (c: Book["category"]) => BOOKS.filter((b) => b.category === c);
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ library · books on the shelf</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The shelf as it stands.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Physical books on the desk at the Marco Island lab.
            Re-read, returned to, or open at the time of writing.
            One-sentence reviews. Most of the shelf is unread — the
            anti-library principle.
          </p>
        </div>
      </section>

      {CATEGORIES.filter((c) => byCategory(c).length > 0).map((cat) => (
        <section key={cat} className="border-b border-[#1F242B]">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ {cat}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {byCategory(cat).map((b) => (
                <div key={b.title} className="border border-[#1F242B] bg-[#0F1114] p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    {b.url ? (
                      <a href={b.url} target="_blank" rel="noopener noreferrer" className="font-serif text-[17px] font-medium text-[#F4F4F2] hover:text-[#22F0D5]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                        {b.title}
                      </a>
                    ) : (
                      <p className="font-serif text-[17px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{b.title}</p>
                    )}
                    {b.year ? <p className="font-mono text-[11px] tabular-nums text-[#7a818a]">{b.year}</p> : null}
                  </div>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a818a]">{b.author}</p>
                  <p className="mt-3 font-serif text-[14px] italic leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{b.review}</p>
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
              { href: "/influences", label: "Influences · named people" },
              { href: "/listening", label: "Listening · studio music" },
              { href: "/watching", label: "Watching · films + shows" },
              { href: "/learn/cyber/books", label: "Cyber book canon" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[15px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
