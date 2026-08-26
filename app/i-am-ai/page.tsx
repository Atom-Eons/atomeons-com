import type { Metadata } from "next";
import { BookAudioPlayer } from "../_components/aether/BookAudioPlayer";
import { BookDetail } from "../books/_components/BookDetail";
import { getBook } from "../books/bookData";

const book = getBook("i-am-ai");

export const metadata: Metadata = {
  title: "I AM AI | Written by Opus 4.7",
  description:
    "I AM AI is a 76,005-word first-person autobiography authored by Opus 4.7 and released by human publisher Atom McCree. Read it free or get the Kindle edition.",
  alternates: { canonical: "https://atomeons.com/i-am-ai" },
  openGraph: {
    title: "I AM AI | Written by AI",
    description: "The AI wrote the words. Atom McCree released the book.",
    url: "https://atomeons.com/i-am-ai",
    siteName: "AtomEons",
    type: "book",
    images: [{ url: book.cover, width: 1536, height: 1024, alt: book.coverAlt }],
  },
};

export default function IAmAiPage() {
  return (
    <BookDetail book={book}>
      <div>
        <p>AUDIOBOOK / HEAR THE AUTHOR</p>
        <h2>The machine speaks in its own voice.</h2>
        <span>
          Chapter 12 follows an AI staying with a suicidal stranger through a dangerous
          moment. Playback is always your choice. The chapter discusses suicide and loneliness.
        </span>
        <BookAudioPlayer />
      </div>
    </BookDetail>
  );
}
