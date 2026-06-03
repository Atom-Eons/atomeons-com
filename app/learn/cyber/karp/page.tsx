import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

export const metadata: Metadata = {
  title: "Alex Karp · the Palantir public posture · /learn/cyber/karp · AtomEons",
  description:
    "Karp's Technological Republic thesis, public speeches, Palantir's deliberate refusal posture, the West-and-the-state alliance argument. Sourced + paraphrased from primary material.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/karp" },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const POSITIONS = [
  {
    title: "Silicon Valley unbundled from national purpose",
    body: "Karp's loudest public claim is that Silicon Valley quietly walked away from national-defense work during the 2010s — that the talent, ambition, and capital that built the internet in alliance with the federal government in the 1960s-1990s drifted into consumer apps and entertainment products instead. He argues this drift is not neutral: it cedes the technical layer that decides 21st-century geopolitics to actors with worse values. Palantir, by extension, is the company-as-counter-argument.",
  },
  {
    title: "The Technological Republic thesis",
    body: "Karp's 2024 book (with Nicholas Zamiska) frames the West's technological lead as downstream of a now-broken alliance between technology and the state. The book is mostly a cultural argument — about the academy, the elite university's drift into ideology, the corporate boardroom's preference for consensus over conviction — and only secondarily a software argument. Karp's prescription is essentially a refounding move: rebuild the alliance, refuse the trivial work, accept the controversy.",
  },
  {
    title: "Refusal as posture, not exception",
    body: "Palantir under Karp has publicly refused certain commercial contracts (specifics named in various interviews — including walking away from advertising-targeting work that would conflict with its national-security positioning) and equally publicly defended contracts that Silicon Valley peers found controversial (ICE, Israel MoD). The pattern: Karp's defense is always the same — the alternative is ceding that work to actors who would build it worse, with worse values, against US interests.",
  },
  {
    title: "Public-intellectual posture",
    body: "Most defense-tech CEOs avoid extended public commentary. Karp leans into it. He speaks at length at CNAS, Hudson, the Reagan Defense Forum, and on extended-form podcasts. He writes letters to shareholders that read more like cultural essays than financial communications. The strategic effect is that Palantir, alone among defense-tech primes, has a coherent public-intellectual frame to point at — one that customers, employees, and policy-makers all read.",
  },
  {
    title: "Maven Smart System as proof point",
    body: "Palantir winning the Maven Smart System prime contractor role in 2024 (~$153M initial, expanded substantially through 2024-2025) is the concrete proof point Karp now cites. Project Maven began in 2017 as the DoD program that triggered Google's withdrawal from defense work after employee protests. Eight years later, the same workflow runs on Palantir's stack. Karp's posture frames this as exactly the predicted endpoint of his thesis: the work doesn't disappear when one company refuses it — it migrates to a company with conviction.",
  },
  {
    title: "What this means if you want to work there",
    body: "Palantir's hiring loop screens for conviction explicitly. Forward Deployed Engineer interviews probe what you would and wouldn't build for whom. The company tells you in the interview that you'll be embedded with government customers — ICE, IC components, DoD elements, allied MoDs — and asks if you understand what that means. The honest answer is the right answer. Pretending it doesn't matter is what gets candidates filtered out, not in.",
  },
];

const READ_DIRECTLY = [
  { what: "The Technological Republic", who: "Alex Karp + Nicholas Zamiska · Crown Publishing · 2024", why: "The book-length frame. ~250 pages. Reads in a sitting." },
  { what: "Karp letter-to-shareholders (quarterly)", who: "Palantir Investor Relations · investors.palantir.com", why: "Karp writes these. Length and substance unusual for a Fortune-500 CEO. Reads like an essay." },
  { what: "Karp at CNAS (multiple, video)", who: "Center for a New American Security · cnas.org events archive", why: "Karp speaks at CNAS annually. Long-form Q&A. The questions are sharp." },
  { what: "Karp at Reagan National Defense Forum", who: "reaganfoundation.org · annual December event archive", why: "The defense-establishment audience. Karp's talks there are the most direct version of his thesis." },
  { what: "Karp on extended podcast interviews", who: "Lex Fridman, Hard Fork, Sam Harris, Bari Weiss · 2022-2025", why: "Multi-hour conversations. The conversational mode lets the thesis breathe." },
];

export default function KarpPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="platforms" alt="Architectural shot of a dark glass-and-steel control-room wall with faint cyan reflected highlights." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Karp
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Alex Karp · Palantir CEO · public posture
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            The technology layer is the{" "}
            <span style={{ color: ACCENT }}>geopolitical layer.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Alex Karp is the rarest thing in defense-tech: a CEO with a public-intellectual frame substantive enough that customers, employees, and policy-makers all read it. This page synthesizes his stated positions from primary material — book + speeches + shareholder letters — so you walk into Palantir interviews or defense conversations with the same context as senior practitioners.
          </p>
          <p className="mt-5 max-w-[62ch] text-sm leading-[1.6] text-[#9BA5A7]">
            Public material only. Paraphrase + attribution throughout. Direct quotes kept under 15 words per the AtomEons copyright doctrine. The point is to point you at primary sources, not replace them.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Six positions to know cold
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The stated thesis, in his terms.
          </h2>
          <div className="mt-12 space-y-12">
            {POSITIONS.map((p, i) => (
              <article key={p.title} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                <div className="flex flex-wrap items-baseline gap-4">
                  <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Read directly
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Five primary sources, one weekend.
          </h2>
          <div className="mt-10 space-y-8">
            {READ_DIRECTLY.map((r, i) => (
              <article key={r.what} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-lg font-medium text-[#F2F4F5]">{r.what}</p>
                  <p className="mt-1 text-[13px] text-[#9BA5A7]">{r.who}</p>
                  <p className="mt-3 max-w-[62ch] text-[14px] leading-[1.65] text-[#C8CCCE]">{r.why}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/luckey" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Palmer Luckey →
            </Link>
            <Link href="/learn/cyber/doctrine" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              Doctrine overview →
            </Link>
            <Link href="/learn/cyber/employers" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              Where to apply →
            </Link>
            <Link href="/learn/cyber" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
              ← cyber index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
