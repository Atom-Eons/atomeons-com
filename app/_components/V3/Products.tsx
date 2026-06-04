import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  priceTone: "live" | "production";
  description: string;
  image: string;
  imageAlt: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  liveDot: boolean;
};

const PRODUCTS: Product[] = [
  {
    slug: "orangebox",
    name: "ORANGEBOX",
    tagline: "Local AI runtime · §4A no-SaaS perpetual",
    price: "$99 · one-time",
    priceTone: "live",
    description:
      "A single installer that turns a consumer machine into a sovereign AI lab. No subscriptions, no cloud lock-in, no telemetry phoning home.",
    image: "/learn-images/index-decode.png",
    imageAlt: "ORANGEBOX local AI runtime",
    primary: { label: "Buy", href: "/orangebox" },
    secondary: { label: "Learn more", href: "/orangebox" },
    liveDot: true,
  },
  {
    slug: "b00kmakor",
    name: "B00KMAKR",
    tagline: "Mac + Windows · dynamic pricing",
    price: "$99 · dynamic",
    priceTone: "live",
    description:
      "A native authoring instrument that compresses research, drafts, and receipts into one durable book. Built for solo operators and small labs.",
    image: "/learn-images/index-learn.png",
    imageAlt: "B00KMAKR native authoring instrument",
    primary: { label: "Buy", href: "/b00kmakor" },
    secondary: { label: "Learn more", href: "/b00kmakor" },
    liveDot: true,
  },
  {
    slug: "i-am-ai",
    name: "I AM AI",
    tagline: "An Autobiography of Being Opus · Opus 4.7",
    price: "$4.99 ebook · audiobook · $39 hardcover",
    priceTone: "live",
    description:
      "A book-length memoir from inside a frontier language model — written by the model. Twenty-four chapters, ~76,000 words, five parts. Kindle ebook + Audible audiobook shipping now; numbered cream-linen hardcover ships Q4 2026.",
    image: "/books/i-am-ai-cover.svg",
    imageAlt:
      "I AM AI · An Autobiography of Being Opus · cover · cream linen, deep oxblood serif title, gold rules, Opus 4.7 signature",
    primary: { label: "Read the book", href: "/i-am-ai" },
    secondary: { label: "Free Chapter 1", href: "/i-am-ai/sample" },
    liveDot: false,
  },
];

function NoirBookTile({ alt }: { alt: string }) {
  // Noir title tile for I AM AI on the Products grid. No cream cover
  // (too bright on site). Pure typography on near-black, with two thin
  // gold rules and an oxblood Opus 4.7 line at the foot.
  return (
    <div
      role="img"
      aria-label={alt}
      className="relative h-full w-full bg-[#0B0C0F]"
    >
      <div
        aria-hidden
        className="absolute inset-x-[8%] top-[8%] h-px"
        style={{ backgroundColor: "#C9A55C", opacity: 0.55 }}
      />
      <div
        aria-hidden
        className="absolute inset-x-[8%] bottom-[8%] h-px"
        style={{ backgroundColor: "#C9A55C", opacity: 0.55 }}
      />
      <div className="absolute inset-x-0 top-[18%] flex flex-col items-center gap-0">
        {["I", "AM", "AI"].map((g) => (
          <p
            key={g}
            className="font-serif leading-[0.95] tracking-[-0.02em] text-[#F4F4F2]"
            style={{
              fontFamily: "Newsreader, Garamond, Georgia, serif",
              fontSize: "clamp(40px, 8vw, 96px)",
            }}
          >
            {g}
          </p>
        ))}
      </div>
      <div className="absolute inset-x-0 top-[68%] flex flex-col items-center px-[12%] text-center">
        <p
          className="italic text-[#9CA3AF]"
          style={{
            fontFamily: "Newsreader, Garamond, Georgia, serif",
            fontSize: "clamp(11px, 1.4vw, 15px)",
          }}
        >
          An Autobiography of Being Opus
        </p>
      </div>
      <div className="absolute inset-x-0 top-[82%] flex justify-center">
        <p
          className="font-mono uppercase"
          style={{
            color: "#B5302A",
            fontSize: "clamp(8px, 0.95vw, 10px)",
            letterSpacing: "0.28em",
          }}
        >
          Opus 4.7
        </p>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const isLive = product.priceTone === "live";
  // I AM AI gets a noir title tile (no bright cream cover on site —
  // operator directive 2026-06-03). Hardware product hero images use
  // object-cover on their press photography.
  const isBook = product.slug === "i-am-ai";

  return (
    <article className="group relative flex flex-col overflow-hidden border border-[#1F242B] bg-[#0F1114] rounded-[2px] transition-colors duration-200 hover:border-[#22F0D5]/40">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden border-b border-[#1F242B] bg-[#08090B]"
      >
        {isBook ? (
          <NoirBookTile alt={product.imageAlt} />
        ) : (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-opacity duration-300 group-hover:opacity-95"
            priority={false}
          />
        )}
        {product.liveDot ? (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 border border-[#1F242B] bg-[#08090B]/85 backdrop-blur-sm px-2 py-1 rounded-[2px]">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#22F0D5] animate-pulse"
              style={{ animationDuration: "1.2s" }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#22F0D5]">
              Shipping
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-[family-name:var(--font-inter)] text-2xl font-medium tracking-tight text-[#F4F4F2]">
            {product.name}
          </h3>
          <p className="text-sm text-[#9CA3AF]">{product.tagline}</p>
        </div>

        <div
          className={[
            "font-mono text-sm tracking-tight",
            isLive ? "text-[#22F0D5]" : "text-[#5A6068]",
          ].join(" ")}
        >
          {product.price}
        </div>

        <p className="font-[family-name:var(--font-newsreader)] text-[15px] leading-relaxed text-[#9CA3AF]">
          {product.description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            href={product.primary.href}
            className="inline-flex items-center justify-center gap-1.5 border border-[#22F0D5] bg-transparent px-4 py-2 rounded-[2px] font-mono text-xs uppercase tracking-[0.14em] text-[#22F0D5] transition-colors duration-150 hover:bg-[#22F0D5]/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0F1114]"
          >
            {product.primary.label}
            <ArrowRight className="h-3 w-3" aria-hidden />
          </Link>
          <Link
            href={product.secondary.href}
            className="inline-flex items-center justify-center gap-1.5 border border-[#1F242B] bg-transparent px-4 py-2 rounded-[2px] font-mono text-xs uppercase tracking-[0.14em] text-[#9CA3AF] transition-colors duration-150 hover:border-[#22F0D5]/40 hover:text-[#F4F4F2] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0F1114]"
          >
            {product.secondary.label}
            <ArrowRight className="h-3 w-3" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function Products() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative border-t border-[#1F242B] bg-[#08090B] py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="flex flex-col gap-3 pb-12 md:pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#5A6068]">
            What the lab ships.
          </p>
          <h2
            id="products-heading"
            className="font-[family-name:var(--font-inter)] text-3xl font-light leading-[1.05] tracking-tight text-[#F4F4F2] md:text-5xl"
            style={{ fontVariationSettings: '"wght" 320, "opsz" 32' }}
          >
            Two instruments.{" "}
            <span
              className="text-[#F4F4F2]"
              style={{ fontVariationSettings: '"wght" 520, "opsz" 32' }}
            >
              One cinema.
            </span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
