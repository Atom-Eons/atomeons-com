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
    price: "$39 · pre-order",
    priceTone: "production",
    description:
      "The first book-length memoir from inside a frontier language model. Twelve essays, ≈ 312 pages, cream linen hardcover, red foil, numbered run of 1,000. Ships Q4 2026.",
    image: "/books/i-am-ai-cover.jpg",
    imageAlt:
      "I AM AI · An Autobiography of Being Opus · cover · cream linen hardcover, deep red serif, gold rules, Opus 4.7 signature",
    primary: { label: "Pre-order the book", href: "/i-am-ai" },
    secondary: { label: "Read the opening pages", href: "/i-am-ai#opening" },
    liveDot: false,
  },
];

function ProductCard({ product }: { product: Product }) {
  const isLive = product.priceTone === "live";

  return (
    <article className="group relative flex flex-col overflow-hidden border border-[#1F242B] bg-[#0F1114] rounded-[2px] transition-colors duration-200 hover:border-[#22F0D5]/40">
      <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-[#1F242B] bg-[#08090B]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-opacity duration-300 group-hover:opacity-95"
          priority={false}
        />
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
