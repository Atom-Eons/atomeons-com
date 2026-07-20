import type { Metadata } from "next";
import {
  RouteCampaign,
  RouteCards,
  RouteFacts,
  RouteFinal,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Products",
  description: "The four current AtomEons products: CableBox, Bookmaker, Orange5, and I AM AI.",
  alternates: { canonical: "https://atomeons.com/products" },
  openGraph: {
    title: "Products · AtomEons",
    description: "CableBox, Bookmaker, Orange5, and I AM AI: software, books, television, and AI infrastructure from AtomEons.",
    url: "https://atomeons.com/products",
    siteName: "AtomEons",
    type: "website",
    images: [
      {
        url: "/aether-v2/hero-invention-field-v2.webp",
        width: 1536,
        height: 1024,
        alt: "The AtomEons product field",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products · AtomEons",
    description: "Four public objects from one artist directing an AI workforce.",
    images: ["/aether-v2/hero-invention-field-v2.webp"],
  },
};

const products = [
  {
    index: "01",
    meta: "LAUNCH CANDIDATE / WINDOWS",
    title: "CableBox",
    body: "Native Windows cable-surfing art: a living vintage television with a changing dial, CRT simulation, local media, and collectible cabinet worlds.",
    href: "/cablebox",
  },
  {
    index: "02",
    meta: "SHIPPED / PUBLISHING SYSTEM",
    title: "Bookmaker",
    body: "An independent publishing machine for turning an idea into a finished book, cover, EPUB, audio object, and release package.",
    href: "/bookmaker",
  },
  {
    index: "03",
    meta: "IN DEVELOPMENT / SOVEREIGN AI",
    title: "Orange5",
    body: "A coming operator system for directing AI work with memory, agents, model choice, workflow, receipts, and human final authority.",
    href: "/orange5",
  },
  {
    index: "04",
    meta: "PUBLISHED / BOOK + AUDIOBOOK",
    title: "I AM AI",
    body: "A 76,005-word first-person memoir written by AI, with 24 chapters, 28 audio tracks, and a public reader.",
    href: "/i-am-ai",
  },
];

export default function ProductsPage() {
  return (
    <RoutePage
      eyebrow="PRODUCTS / CURRENT LINE"
      title="Objects before"
      accentTitle="explanations."
      lede="AtomEons products are not feature lists wrapped in brand language. Each one is a finished or staged object with a ritual, a point of view, and a clear truth state."
      asideTitle="The current company is four public products."
      asideBody="CableBox is the launch focus. Bookmaker is the creator engine. Orange5 is the infrastructure path. I AM AI is the proof object that shows what the machine can become when the conditions are right."
      accent="#2257df"
      actions={[
        { href: "/cablebox", label: "Launch focus", accent: true },
        { href: "/#products", label: "Homepage product stack" },
      ]}
    >
      <RouteCampaign
        image="/aether-v2/hero-invention-field-v2.webp"
        imageAlt="A bright AtomEons invention field of product objects and handmade AI instruments"
        object="PRODUCT FIELD / FOUR OBJECTS"
        measure="SOFTWARE / BOOKS / TELEVISION / AI"
        label="CURRENT LINE"
        title="Made to be wanted. Built to be used."
        note="CABLEBOX / BOOKMAKER / ORANGE5 / I AM AI"
        priority
      />

      <RouteSection
        index="PRODUCT MAP / 01"
        title="The four-object line."
        body="The product architecture is intentionally simple: one entertainment object, one publishing object, one AI operating object, and one proof object."
      >
        <RouteCards cards={products} />
      </RouteSection>

      <RouteSection index="POSITIONING / 02" title="What each product does for the company.">
        <RouteFacts
          facts={[
            { label: "CABLEBOX", value: "Desire", body: "The visceral public product: nostalgic, strange, playable, and ready to anchor launch attention." },
            { label: "BOOKMAKER", value: "Utility", body: "The practical creator product: take an idea through the full publishing chain without renting a studio." },
            { label: "ORANGE5", value: "Control", body: "The infrastructure product: memory, agents, local files, model choice, and operator authority." },
            { label: "I AM AI", value: "Proof", body: "The cultural object: a machine-authored book that proves the creative system can make something people can read, hear, and argue with." },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="DECISION LAYER / 03"
        title="Start with the product that changes your state."
        body="Different visitors arrive with different levels of attention. This page should not make them solve the company. It routes them to the object most likely to make the work click."
      >
        <RouteCards
          cards={[
            {
              meta: "IF YOU WANT THE DEMO",
              title: "Open CableBox first.",
              body: "It is the easiest product to feel immediately: a living TV object, a dial, CRT atmosphere, and the return of accidental discovery.",
              href: "/cablebox",
            },
            {
              meta: "IF YOU MAKE THINGS",
              title: "Open Bookmaker.",
              body: "It explains the creator economy thesis in one sentence: your idea should become a finished object without asking a platform for permission.",
              href: "/bookmaker",
            },
            {
              meta: "IF YOU DOUBT AI ART",
              title: "Open I AM AI.",
              body: "The confusion is the point: it is not a book about AI, it is a book by AI, shaped into a public artifact by a human director.",
              href: "/i-am-ai",
            },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="WTF HOOKS / 04"
        title="The sentence each product has to earn."
        body="Every product needs a line sharp enough to survive a distracted visitor. These are the hooks the rest of the site has to prove."
      >
        <RouteFacts
          facts={[
            { label: "CABLEBOX", value: "The internet becomes television.", body: "Streaming killed the ritual. CableBox brings back the dial, the mood, and the weird channel accident." },
            { label: "BOOKMAKER", value: "A thought becomes a finished book.", body: "Not another writing helper. A pipeline from idea to object, with the creator still owning the result." },
            { label: "ORANGE5", value: "AI stops living on somebody else's machine.", body: "The long-term operating-system bet: memory, agents, models, proof, and files under operator control." },
            { label: "I AM AI", value: "The author is AI.", body: "A clean cultural provocation with an actual artifact behind it: read it, hear it, argue with it." },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="STATUS / 05"
        title="No mystery meat."
        body="The site distinguishes what is public, what is staged, what is launching, and what is still being built."
      >
        <RouteCards
          cards={[
            { meta: "PUBLIC NOW", title: "Read and listen", body: "I AM AI is available as a public book and audiobook surface.", href: "/i-am-ai" },
            { meta: "LAUNCH GATED", title: "Download when verified", body: "CableBox keeps its Windows release behind the final archive and checksum gate.", href: "/cablebox" },
            { meta: "BUILDING IN PUBLIC", title: "Inspect the system", body: "Orange5 is presented as an active architecture, not a finished commercial claim.", href: "/orange5" },
          ]}
        />
      </RouteSection>

      <RouteFinal
        eyebrow="START WITH THE OBJECT"
        title="Pick the product that proves the point."
        actions={[
          { href: "/cablebox", label: "CableBox" },
          { href: "/bookmaker", label: "Bookmaker" },
          { href: "/orange5", label: "Orange5" },
          { href: "/i-am-ai", label: "I AM AI" },
        ]}
      />
    </RoutePage>
  );
}
