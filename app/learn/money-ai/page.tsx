import type { Metadata } from "next";
import Link from "next/link";

/**
 * /learn/money-ai · domain hub.
 *
 * AI in finance · trading · fintech · fraud · personal finance.
 * Public-info only. No personalized financial advice. The lab is not
 * a licensed financial advisor. Read the disclaimer.
 *
 * — 2026-06-06
 */

export const metadata: Metadata = {
  title: "Money AI · Domain Hub",
  description:
    "AI in finance, trading, fintech, fraud, personal finance. Players (Renaissance · Citadel · Two Sigma · Bridgewater · Plaid · Stripe Radar · BlackRock Aladdin) · tools you can use today (Wealthfront · Betterment · Magnific · Plaid · Mercury) · key papers · risks (deepfake-driven fraud · model collapse · regulatory) · what the lab thinks. Public-information primer · not financial advice.",
  alternates: { canonical: "https://atomeons.com/learn/money-ai" },
  openGraph: {
    title: "Money AI · A primer from AtomEons",
    description:
      "AI in finance · trading · fintech · fraud · personal finance · who's building · what works · what to watch · public-info only.",
    url: "https://atomeons.com/learn/money-ai",
    type: "article",
  },
};

const PLAYERS = [
  {
    name: "Renaissance Technologies · Medallion Fund",
    what:
      "The original quant. 35-year track record of ~66% gross / 39% net annualized returns. Mostly closed to outside money. Co-founder Jim Simons died 2024 · the lab's culture of pure mathematical pattern recognition shaped the entire industry.",
    where: "East Setauket, NY · founded 1982",
  },
  {
    name: "Citadel · Two Sigma · DE Shaw · Millennium",
    what:
      "The Big Four multi-strat hedge funds. ML drives an increasing share of book. Two Sigma in particular pioneered modern deep-RL trading.",
    where: "Chicago · NY · NY · NY",
  },
  {
    name: "Bridgewater Associates",
    what:
      "World's largest hedge fund (~$170B AUM). 'Principles-based' systematic investing. Founder Ray Dalio stepped back from day-to-day in 2022 · the firm is now heavily ML-driven.",
    where: "Westport, CT",
  },
  {
    name: "BlackRock Aladdin",
    what:
      "Portfolio management software that runs ~10% of the world's investable assets ($21T+). Increasingly ML-augmented · the platform is leasing AI capability to institutional clients now.",
    where: "NY · invisible giant",
  },
  {
    name: "Stripe Radar",
    what:
      "Real-time fraud detection in card payments. Trained on the full Stripe transaction stream (~$1T processed annually) · ~99.97% precision claimed on confirmed fraud.",
    where: "SF · embedded in every Stripe integration",
  },
  {
    name: "Plaid · Synctera · Unit · Mercury",
    what:
      "Bank-data + banking-as-a-service infrastructure. AI-augmented categorization, fraud detection, and underwriting now run through these rails.",
    where: "Various US fintech",
  },
  {
    name: "Anthropic + OpenAI Finance lanes",
    what:
      "Anthropic announced a financial-services vertical 2024 (with BNY Mellon, S&P Global, Norges Bank). OpenAI partnered with Stripe + Plaid earlier. The frontier labs are now embedded in regulated finance.",
    where: "SF · regulated-finance lane",
  },
  {
    name: "Magnific · Lendable · Numerai",
    what:
      "ML-native lending and consumer credit. Numerai in particular runs an open data-science tournament where the world's best alpha-hunters submit predictions and Numerai trades on the consensus.",
    where: "Various",
  },
];

const TOOLS = [
  {
    name: "Wealthfront · Betterment",
    url: "https://www.wealthfront.com",
    detail:
      "Robo-advisors · ML-optimized rebalancing + tax-loss harvesting. ~$50B AUM combined. The boring-and-it-works application of AI to retail money.",
  },
  {
    name: "Mercury (mercury.com)",
    url: "https://mercury.com",
    detail:
      "Startup banking with AI categorization · fraud detection · cash-flow forecasting · increasingly the lane founders pick over legacy banks. Free for most use cases.",
  },
  {
    name: "Plaid Identity Verification",
    url: "https://plaid.com",
    detail:
      "If you build anything in fintech: Plaid is the easiest path to KYC, account linking, and bank-data fraud signals. The de facto rail.",
  },
  {
    name: "Magnific · Frec",
    url: "https://frec.com",
    detail:
      "Direct indexing + tax-loss harvesting at retail scale. Frec uses ML to harvest losses inside a custom index.",
  },
  {
    name: "Bloomberg GPT (institutional)",
    url: "https://www.bloomberg.com",
    detail:
      "50B-parameter LLM trained on Bloomberg's financial corpus. Available only via Bloomberg Terminal · $2,500/month · the institutional standard reference for finance-grounded LLM tasks.",
  },
  {
    name: "Open-source alternatives",
    url: "https://github.com/FinGPT",
    detail:
      "FinGPT, FinLlama, BloombergGPT clones · all openly available, all weaker than the proprietary versions, but usable for research + signal extraction.",
  },
];

const PAPERS = [
  {
    title: "Deep Reinforcement Learning for Portfolio Management",
    authors: "Various · DeepMind · Two Sigma · academic",
    journal: "JP Morgan AI Research · ongoing series",
    why: "The institutional research lane on RL applied to portfolio construction. Most live capital is still rule-based · the gap is closing.",
  },
  {
    title: "BloombergGPT · A Large Language Model for Finance",
    authors: "Wu et al · Bloomberg",
    journal: "Preprint · 2023",
    why: "First LLM specifically trained on a high-quality finance corpus · benchmark for what finance-domain LLM ingestion looks like at scale.",
  },
  {
    title: "FinGPT · Open-Source Financial Large Language Models",
    authors: "Yang et al · Columbia + AI4Finance",
    journal: "FinLLM benchmark · 2023-2024",
    why: "Open-source response to BloombergGPT · let researchers benchmark against a public baseline.",
  },
  {
    title: "Deepfake-driven CFO scam · 2024 case studies",
    authors: "FBI IC3 · 2024 annual report",
    journal: "FBI",
    why: "$25M one-shot transfer at Arup (Hong Kong) · CFO deepfaked on a video call. Most-cited case of AI-driven fraud at enterprise scale.",
  },
  {
    title: "Numerai · Crowdsourced Machine Learning for Hedge Funds",
    authors: "Numerai",
    journal: "Numerai whitepaper",
    why: "The crowdsourced-quant experiment. ~10K data scientists submit weekly predictions on encrypted data; Numerai stakes capital on the meta-ensemble.",
  },
];

const PEOPLE = [
  "Jim Simons (1938-2024) · Renaissance founder · the mathematical foundation",
  "Cliff Asness · AQR founder · public voice for factor investing + ML",
  "Marcos López de Prado · 'Advances in Financial Machine Learning' · the textbook",
  "Ernie Chan · Quantinsti · ML-trading educator with real receipts",
  "Igor Tulchinsky · WorldQuant founder · BRAIN platform",
  "Richard Craib · Numerai founder · crowdsourced quant",
  "John Hull · Toronto · derivatives + ML applied",
  "Stephen Boyd · Stanford · convex optimization applied to finance",
];

const RISKS = [
  "Deepfake-driven fraud · $25M loss at Arup (2024) from a CFO deepfaked on video. Every wire approval workflow needs out-of-band verification now.",
  "Model collapse in retail roboadvisor herding · if every robo follows the same loss-harvesting + factor rebalance, the meta-strategy becomes the market and crowds itself.",
  "Regulatory ambiguity · SEC Rule 17a-4 + FINRA recordkeeping + EU MiCA all touch AI in finance with little clarity. Enforcement is still being written.",
  "Backtest overfitting · papers and pitches that show 30% backtested returns are usually overfitted to a single regime. Production-deployed alpha is closer to 2-8% net of costs.",
  "Privacy of training data · Bloomberg GPT trained on proprietary terminal data. FinGPT clones use scraped public data. Both carry attribution / IP risk.",
  "The 'flash crash' problem · ML-driven liquidity providers can withdraw simultaneously. May 2010 cost ~$1T of market cap in 36 minutes; an AI-driven repeat is the regulator's nightmare scenario.",
];

const SELF_USE = [
  "If you want a hands-off long-term portfolio: Wealthfront or Betterment. ML doing what it should do · tax-loss harvest, rebalance, hold cheap index funds.",
  "If you're a founder needing banking that doesn't fight you: Mercury. AI-augmented categorization makes your taxes 10x easier.",
  "If you need to underwrite a customer for credit: Plaid + a basic XGBoost on the bank-feed features. Open-source is fine here · the data is the moat.",
  "If you want to learn quant: López de Prado's 'Advances in Financial Machine Learning' + the Numerai tournament. Real money on real predictions teaches faster than any course.",
  "If you're scared of AI scam calls: set a family password and use it whenever someone asks for money over the phone or video. Costs nothing · works against current and next-gen deepfakes.",
  "If you operate finance for a company: subscribe to FBI IC3 alerts and require out-of-band verification on every wire over $10K. Treat any video-call-driven transfer request as suspicious by default.",
];

export default function MoneyAiPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#7a818a]">
          DOMAIN HUB · MONEY · AI · 2026
        </p>
        <h1
          className="mt-6 text-balance text-[clamp(48px,8vw,96px)] font-light leading-[0.92]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          AI in finance.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
          Hedge funds · roboadvisors · fraud detection · KYC · fintech rails
          · deepfake-driven scams. Who&apos;s actually moving money with AI ·
          what works in production · what the regulators are still drafting
          · what the lab thinks.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#FF4D4D]">
          NOT FINANCIAL ADVICE · This is a public-information primer · See a licensed financial advisor for personal recommendations
        </p>
      </header>

      <section className="mt-16">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Key players
        </h2>
        <ul className="mt-8 space-y-6">
          {PLAYERS.map((p) => (
            <li key={p.name} className="border-l-2 border-[#22F0D5]/40 pl-6">
              <h3 className="text-[20px] font-light text-[#F4F4F2]">{p.name}</h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {p.what}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">
                {p.where}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Tools you can use today
        </h2>
        <ul className="mt-8 space-y-6">
          {TOOLS.map((t) => (
            <li key={t.name} className="border-l-2 border-[#C9A55C]/40 pl-6">
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[20px] font-light text-[#F4F4F2] hover:text-[#22F0D5]"
              >
                {t.name} ↗
              </a>
              <p className="mt-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {t.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Papers + cases that mattered
        </h2>
        <ul className="mt-8 space-y-6">
          {PAPERS.map((p) => (
            <li key={p.title} className="border-l-2 border-[#22F0D5]/40 pl-6">
              <h3 className="text-[18px] font-light leading-tight text-[#F4F4F2]">
                {p.title}
              </h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF]">
                {p.authors} · {p.journal}
              </p>
              <p className="mt-2 text-[15px] leading-[1.65] text-[#9CA3AF]">
                {p.why}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § People to follow
        </h2>
        <ul className="mt-6 list-disc space-y-2 pl-6 text-[15px] leading-[1.65] text-[#9CA3AF]">
          {PEOPLE.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Risks the lab takes seriously
        </h2>
        <ul className="mt-6 space-y-3">
          {RISKS.map((r, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-[1.65] text-[#9CA3AF]">
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4D4D]" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § How to use this for yourself
        </h2>
        <ol className="mt-6 list-decimal space-y-3 pl-6 text-[15px] leading-[1.65] text-[#9CA3AF]">
          {SELF_USE.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="mt-20 border-l-4 border-[#22F0D5] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § What the lab thinks
        </h2>
        <p
          className="mt-4 text-[20px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Finance is the most ML-saturated industry by capital deployed and
          the most ML-resistant by surface-level retail experience. The
          alpha-extraction battle has been ML-versus-ML since 2010 ·
          shoreline of that has now reached your phone&apos;s banking app.
          The real near-term shift is in fraud and identity: deepfake-driven
          theft is already a billion-dollar industry. The lab&apos;s bet:
          out-of-band verification (a family password, a hardware key) goes
          from optional to standard within three years, the way two-factor
          did between 2012 and 2018. Run your own life accordingly.
        </p>
      </section>

      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § Where to go deeper on AtomEons
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Link
            href="/learn/cyber/models"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Cyber models
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              FAIR, OCTAVE, DREAD for financial-risk threat modeling.
            </p>
          </Link>
          <Link
            href="/learn/health-ai"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Health AI
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              The sibling domain hub. AlphaFold, Med-PaLM, AMIE.
            </p>
          </Link>
          <Link
            href="/learn/video-ai"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Video AI
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              How deepfakes are made · how to defend against them.
            </p>
          </Link>
          <Link
            href="/ask?q=which+robo+advisor+is+best"
            className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Ask the lab
            </p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">
              Free grounded answers with citations.
            </p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          Domain hub · /learn/money-ai · Public information only · Updated 2026-06-06
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          Sources: SEC filings · papers cited · FBI IC3 reports · company press · public AUM disclosures
        </p>
      </footer>
    </main>
  );
}
