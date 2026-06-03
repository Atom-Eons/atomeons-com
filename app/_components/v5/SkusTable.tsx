/**
 * 4 SKUs from SITE_HANDOFF_v5.md.
 * Command = the default, perpetual. Other 3 are optional.
 * "Zero markup on tokens" is the headline.
 */

import { BuyButton } from "../BuyButton";
import { DynamicPrice } from "../DynamicPrice";

const SKUS = [
  {
    id: "command",
    label: "ORANGEBOX Command",
    price: "$1",
    term: "perpetual · one-time",
    desc: "Full cockpit. BYO keys. v1.x–v5.x updates free. Source included.",
    default: true,
  },
  {
    id: "codexa",
    label: "Codexa Cloud",
    price: "$19",
    term: "/ month · optional",
    desc: "Hosted worker rail. Skip the second computer. Same Codexa doctrine, our hardware.",
    default: false,
  },
  {
    id: "pool",
    label: "Pooled Keys",
    price: "$99",
    term: "/ month · optional",
    desc: "We supply provider tokens at pooled rate. Zero key management. Cancel anytime.",
    default: false,
  },
  {
    id: "team",
    label: "Team",
    price: "$499",
    term: "/ year · 5 seats",
    desc: "Shared vault + receipts + DAG across 5 operators. $99.80 per seat per year.",
    default: false,
  },
];

export function SkusTable() {
  return (
    <section className="relative bg-black py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ::pricing
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-6xl">
            One default SKU.
            <br />
            <span className="text-[#22F0D5]">Three optional rails.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[#9BA5A7]">
            Buy{" "}
            <span className="font-medium text-[#F2F4F5]">Command</span> once. It
            never expires. Token costs go straight to your provider — we
            don&apos;t see them. The other three SKUs exist only if you
            explicitly want them.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2">
          {SKUS.map((s) => (
            <div
              key={s.id}
              className={`relative bg-[#0A0F11] p-8 ${
                s.default
                  ? "md:col-span-2 md:bg-gradient-to-br md:from-[#22F0D5]/8 md:via-[#0A0F11] md:to-[#22F0D5]/5"
                  : ""
              }`}
            >
              {s.default ? (
                <span className="absolute right-6 top-6 rounded border border-[#22F0D5]/60 bg-[#22F0D5]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]">
                  default · buy this
                </span>
              ) : null}
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                sku · {s.id}
              </p>
              <h3 className="mt-3 text-2xl font-medium text-[#F2F4F5]">
                {s.label}
              </h3>
              <div className="mt-5 flex items-baseline gap-2">
                <span
                  className={`font-medium ${
                    s.default
                      ? "text-5xl text-[#22F0D5]"
                      : "text-3xl text-[#F2F4F5]"
                  }`}
                >
                  {s.default && "dynamic" in s && s.dynamic ? (
                    <DynamicPrice variant="button-label" />
                  ) : (
                    s.price
                  )}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#6B7779]">
                  {s.term}
                </span>
              </div>
              {s.default ? (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]">
                  ::ladder · forward buyers only · jumps $1 per 100 sales
                </p>
              ) : null}
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#9BA5A7]">
                {s.desc}
              </p>
              {s.default ? (
                <div className="mt-6">
                  <BuyButton />
                </div>
              ) : (
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[#6B7779]">
                  rolling availability · email{" "}
                  <a
                    href="mailto:a.mccree@gmail.com"
                    className="text-[#22F0D5] transition-colors hover:text-[#FFA45A]"
                  >
                    a.mccree@gmail.com
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-sm text-[#6B7779]">
          <span className="font-medium text-[#22F0D5]">
            Zero markup on tokens.
          </span>{" "}
          The Privacy lane shows every Anthropic / OpenAI / Google / OpenRouter
          charge as it happens. Your money, your keys, your audit.
        </p>
      </div>
    </section>
  );
}
