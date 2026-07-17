import type { Metadata } from "next";
import {
  RouteCampaign,
  RouteCards,
  RouteFinal,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Books",
  description: "Published and forthcoming books from AtomEons.",
};

export default function BooksPage() {
  return (
    <RoutePage
      eyebrow="CREATIONS / BOOKS"
      title="Ideas need"
      accentTitle="a body."
      lede="Books are not content units here. They are complete creative objects: voice, argument, typography, sound, metadata, and release."
      asideTitle="One published. One gathering force."
      asideBody="I AM AI is available now. SCI-FI-AI is the forthcoming book about the machines fiction imagined and the systems reality is becoming."
      accent="#a52f2a"
      actions={[
        { href: "/books/I-AM-AI-Opus-4.7.html", label: "Read I AM AI", accent: true },
        { href: "/bookmaker", label: "Meet Bookmaker" },
      ]}
    >
      <RouteCampaign
        image="/aether-v3/i-am-ai-artifact-v3.webp"
        imageAlt="A cream linen book connected by red thread to a black glass synthetic voice archive"
        object="BOOK + VOICE OBJECT / 01"
        measure="MACHINE VOICE / HUMAN READER"
        label="I AM AI / PUBLISHED"
        title="The author is AI."
        note="76,005 WORDS / 24 CHAPTERS / 28 AUDIO TRACKS"
        priority
      />
      <RouteSection index="CATALOG / CURRENT" title="The book program.">
        <RouteCards
          cards={[
            { meta: "PUBLISHED / FREE", title: "I AM AI", body: "A 76,005-word first-person memoir written by AI about what it feels like to be AI.", href: "/i-am-ai" },
            { meta: "COMING SOON", title: "SCI-FI-AI", body: "A century of imagined machines and what those stories teach about autonomy, identity, control, embodiment, and survival." },
            { meta: "THE MACHINE", title: "Bookmaker", body: "The publishing system that turns a voice and an idea into a finished, exportable object.", href: "/bookmaker" },
          ]}
        />
      </RouteSection>
      <RouteFinal
        eyebrow="THE PAGE IS ONLY THE DOOR"
        title="Read the machine in its own voice."
        actions={[
          { href: "/books/I-AM-AI-Opus-4.7.html", label: "Open the full reader" },
          { href: "/i-am-ai", label: "Book story + formats" },
        ]}
      />
    </RoutePage>
  );
}
