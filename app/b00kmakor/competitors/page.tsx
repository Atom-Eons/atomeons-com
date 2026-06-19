import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Bookmaker vs Vellum · Atticus · Scrivener · Reedsy · honest comparison",
  description:
    "How B00KMAKR stacks against named indie-publishing tools. Where it wins, where it loses, and which buyer should pick which tool.",
  alternates: { canonical: "https://atomeons.com/b00kmakor/competitors" },
};

type Comparison = {
  competitor: string;
  url: string;
  category: string;
  pricing: string;
  b00kmakorWins: string[];
  competitorWins: string[];
  takeaway: string;
};

const COMPARISONS: Comparison[] = [
  {
    competitor: "Vellum",
    url: "https://vellum.pub",
    category: "Premium Mac-only book formatting",
    pricing: "$199 unlimited ebooks · $249 ebooks + paperback",
    b00kmakorWins: [
      "Mac AND Windows · Vellum is Mac-only.",
      "Free vs $250 · AI Bookmaker is free always; Vellum is paid.",
      "Audiobook pipeline built-in · Vellum has none.",
      "AI-disclosure ledger as a first-class deliverable.",
    ],
    competitorWins: [
      "Vellum's typography presets are industry-best · 10 years of refinement.",
      "Click-through preview rendering is faster.",
      "Brand recognition · agents recommend it more often.",
      "More built-in style templates out of the gate.",
    ],
    takeaway:
      "If you're a Mac-only literary fiction author who cares more about polish than range of formats, Vellum is still the gold standard. If you publish across ebook + audiobook + multiple platforms and run Windows OR Mac, B00KMAKR is the broader instrument.",
  },
  {
    competitor: "Atticus",
    url: "https://atticus.io",
    category: "Cross-platform book formatting + writing",
    pricing: "$147 one-time",
    b00kmakorWins: [
      "Native Mac + Windows · Atticus is web-only (Electron-shell desktop).",
      "Native binary · runs without internet after install.",
      "Built-in audiobook generation · Atticus has none.",
      "BSR estimator + royalty calculator for KDP financial modeling.",
    ],
    competitorWins: [
      "Stronger writing/drafting interface · B00KMAKR is formatting-focused, not drafting.",
      "Larger template library.",
      "More tutorials / YouTube ecosystem · brand is older.",
      "Cloud sync between devices.",
    ],
    takeaway:
      "Atticus is the better writing environment. B00KMAKR is the better ship-it environment. Many operators use both: Atticus to draft, B00KMAKR to produce.",
  },
  {
    competitor: "Scrivener",
    url: "https://www.literatureandlatte.com/scrivener/",
    category: "Long-form writing project IDE",
    pricing: "$60 Mac · $52 Windows",
    b00kmakorWins: [
      "Output formatting · Scrivener's compile is notoriously rough; B00KMAKR's EPUB output is clean.",
      "Audiobook pipeline.",
      "Built-in KDP/IngramSpark/cover specs.",
      "AI-disclosure ledger.",
    ],
    competitorWins: [
      "Scrivener IS the industry-standard novel-drafting tool.",
      "Decades of refinement on the long-form writing surface.",
      "Lower price ($52-60).",
      "Larger community / more plug-ins.",
    ],
    takeaway:
      "Scrivener is for drafting. B00KMAKR is for publishing. Many indie authors use both: Scrivener to write the book, B00KMAKR to ship every format.",
  },
  {
    competitor: "Reedsy Book Editor",
    url: "https://reedsy.com/write-a-book",
    category: "Free web-based book formatter",
    pricing: "Free",
    b00kmakorWins: [
      "Native desktop · Reedsy is browser-only.",
      "Offline-capable · Reedsy needs internet.",
      "Audiobook pipeline · Reedsy has none.",
      "BSR/royalty financial tooling.",
    ],
    competitorWins: [
      "FREE.",
      "Zero install friction · open a browser tab.",
      "Generates clean EPUB and PDF from day one.",
      "Strong community of paid Reedsy professionals (editors, designers).",
    ],
    takeaway:
      "For an author publishing one book in plain typography for free, Reedsy is the right pick. For an operator publishing 3+ books a year across multiple formats with audiobooks, AI Bookmaker is the stronger instrument — and free.",
  },
  {
    competitor: "Adobe InDesign",
    url: "https://www.adobe.com/products/indesign.html",
    category: "Professional desktop publishing software",
    pricing: "$23.99/mo subscription",
    b00kmakorWins: [
      "Perpetual license · InDesign is subscription-only forever.",
      "Book-format-specific · InDesign is general DTP, requires expertise to use for books.",
      "Audiobook pipeline.",
      "Direct KDP / IngramSpark exporters.",
    ],
    competitorWins: [
      "InDesign is the professional typography world standard.",
      "Infinite typographic control over layout (B00KMAKR uses presets).",
      "Output quality at the print-shop level.",
      "Cross-publication consistency (mag, book, marketing collateral).",
    ],
    takeaway:
      "InDesign is for professional designers laying out illustrated/complex books. B00KMAKR is for indie authors who want a clean ebook + audiobook + paperback without learning a 1000-page reference manual.",
  },
];

export default function B00kmakrCompetitorsPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ AI Bookmaker vs alternatives · honest comparison</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Different instruments for different stages.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Most authors use 2-3 tools across the lifecycle of a book.
            B00KMAKR is one of them. Each row below names where the
            competitor beats B00KMAKR outright and tells you which
            buyer should pick which tool.
          </p>
        </div>
      </section>

      {COMPARISONS.map((c) => (
        <section key={c.competitor} className="border-b border-[#1F242B]">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-serif text-[32px] font-light leading-[1.1] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                B00KMAKR vs <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] hover:underline">{c.competitor}</a>
              </h2>
              <div className="text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{c.category}</p>
                <p className="mt-1 font-mono text-[11px] tabular-nums text-[#9CA3AF]">{c.pricing}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="border-l-2 border-[#22F0D5] pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">where B00KMAKR wins</p>
                <ul className="mt-4 space-y-2">
                  {c.b00kmakorWins.map((w, i) => (
                    <li key={i} className="font-serif text-[14px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>+ {w}</li>
                  ))}
                </ul>
              </div>
              <div className="border-l-2 border-[#FF4D4D] pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">where {c.competitor} wins</p>
                <ul className="mt-4 space-y-2">
                  {c.competitorWins.map((w, i) => (
                    <li key={i} className="font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>− {w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 border-l-2 border-[#C9A55C] bg-[#0B0C0F] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A55C]">§ takeaway</p>
              <p className="mt-3 font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{c.takeaway}</p>
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { href: "/b00kmakor", label: "Back to AI Bookmaker" },
              { href: "/b00kmakor/changelog", label: "Version history" },
              { href: "/b00kmakor/roadmap", label: "Roadmap + anti-roadmap" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
