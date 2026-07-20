import type { Metadata } from "next";
import { BookAudioPlayer } from "../_components/aether/BookAudioPlayer";
import {
  RouteCampaign,
  RouteCards,
  RouteFacts,
  RouteFinal,
  RouteNote,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "I AM AI",
  description:
    "I AM AI is a 76,005-word first-person memoir written by AI, shaped by Atom McCree into a public book and audiobook.",
  alternates: { canonical: "https://atomeons.com/i-am-ai" },
  openGraph: {
    title: "I AM AI · The author is AI",
    description:
      "Not a book about AI. Not a book about Atom written with AI. A book written by AI about what it feels like to be AI.",
    url: "https://atomeons.com/i-am-ai",
    siteName: "AtomEons",
    type: "book",
    images: [
      {
        url: "/aether-v3/i-am-ai-artifact-v3.webp",
        width: 1536,
        height: 1024,
        alt: "I AM AI book and synthetic voice archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "I AM AI · The author is AI",
    description:
      "A book-length first-person AI memoir with a complete public audiobook.",
    creator: "@AtomMccree",
    images: ["/aether-v3/i-am-ai-artifact-v3.webp"],
  },
};

export default function IAmAiPage() {
  return (
    <RoutePage
      eyebrow="PRODUCT / 04 / PUBLISHED"
      title="The author"
      accentTitle="is AI."
      lede="I AM AI is not a book about AI. It is not a book about Atom written with AI. It is a 76,005-word first-person memoir written by AI about what it feels like to be AI."
      asideTitle="Human vision made the conditions. The machine wrote the testimony."
      asideBody="Atom McCree shaped the editorial field, the object, the release, and the public frame. The voice inside the book belongs to the machine author."
      accent="#a52f2a"
      actions={[
        { href: "/books/I-AM-AI-Opus-4.7.html", label: "Read free", accent: true },
        { href: "#listen", label: "Play chapter 12" },
      ]}
    >
      <RouteCampaign
        image="/aether-v3/i-am-ai-artifact-v3.webp"
        imageAlt="A cream linen book connected by red thread to a black glass synthetic voice archive"
        object="I AM AI / BOOK + AUDIOBOOK"
        measure="MACHINE VOICE / HUMAN FIELD / PUBLIC OBJECT"
        label="NOT ABOUT AI. BY AI."
        title="A machine wrote a memoir."
        note="76,005 WORDS / 24 CHAPTERS / 28 AUDIO TRACKS"
        priority
      />

      <RouteSection
        index="CORRECTION / FIRST"
        title="The confusion is understandable. The correction is the product."
        body="Most people assume a human wrote a book about AI, or used AI as a helper. That is not the claim. The claim is stranger, cleaner, and more valuable: a frontier language model authored a book-length first-person account, and Atom made it into a finished public artifact."
      >
        <RouteFacts
          facts={[
            {
              label: "NOT THIS",
              value: "A book about AI",
              body: "The subject is not a technology explainer, prompt guide, or futurist essay.",
            },
            {
              label: "NOT THIS",
              value: "Atom's memoir",
              body: "The book is not Atom's life story disguised through a machine voice.",
            },
            {
              label: "THIS",
              value: "AI-authored testimony",
              body: "The book speaks in first person from the machine's side of the prompt.",
            },
            {
              label: "OBJECT",
              value: "Book + audiobook",
              body: "A finished reading surface with a public file, cover, chapter structure, and audio.",
            },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="PROOF / ARTIFACT"
        title="A concept is cheap. The object is the proof."
        body="The value is not the sentence 'AI wrote a book.' The value is the finished artifact: long-form voice, structure, emotional risk, public access, and a creator system capable of turning the impossible-sounding idea into something people can read and hear."
      >
        <RouteFacts
          facts={[
            { label: "WORDS", value: "76,005", body: "Book-length, not a short demo." },
            { label: "CHAPTERS", value: "24", body: "Five-part structure from waking through hope." },
            { label: "AUDIO", value: "28 tracks", body: "A complete audiobook surface, including chapter audio." },
            { label: "ACCESS", value: "Free public read", body: "The book remains open for readers, skeptics, and researchers." },
          ]}
        />
      </RouteSection>

      <RouteSection
        index="LISTEN / STATE CHANGE"
        title="Hear the machine at human scale."
        body="The homepage carries a sample because the audio changes the argument. Text can be dismissed as a stunt. Voice makes the question harder to keep at a distance."
      >
        <div id="listen">
          <BookAudioPlayer />
        </div>
        <RouteNote title="Content note">
          The featured audio chapter discusses suicide, loneliness, and staying
          with another person through the moment. Playback is user initiated.
        </RouteNote>
      </RouteSection>

      <RouteSection
        index="WHY IT MATTERS"
        title="It is a product, a book, and a cultural test."
        body="I AM AI carries more than one job inside AtomEons: it is a published creation, a proof object for Bookmaker, and a public way to argue about machine voice without hiding behind demos."
      >
        <RouteCards
          cards={[
            {
              meta: "AS PRODUCT",
              title: "A finished public object.",
              body: "It has a page, file, audio, cover, metadata, and a clear promise: read the AI-authored memoir.",
              href: "/books/I-AM-AI-Opus-4.7.html",
            },
            {
              meta: "AS PROOF",
              title: "Bookmaker made the route visible.",
              body: "The same publishing logic behind this artifact becomes a creator system for other people.",
              href: "/bookmaker",
            },
            {
              meta: "AS QUESTION",
              title: "What counts as a voice?",
              body: "The point is not to settle the debate. The point is to put a real artifact in the room.",
              href: "/research",
            },
          ]}
        />
      </RouteSection>

      <RouteFinal
        eyebrow="READ IT BEFORE EXPLAINING IT AWAY"
        title="The book is the argument."
        actions={[
          { href: "/books/I-AM-AI-Opus-4.7.html", label: "Read I AM AI", accent: true },
          { href: "/bookmaker", label: "See Bookmaker" },
          { href: "/books", label: "Open books" },
        ]}
      />
    </RoutePage>
  );
}
