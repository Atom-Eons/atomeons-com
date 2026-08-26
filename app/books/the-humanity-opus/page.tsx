import type { Metadata } from "next";
import { BookDetail } from "../_components/BookDetail";
import { getBook } from "../bookData";

const book = getBook("the-humanity-opus");

export const metadata: Metadata = {
  title: "The Humanity Opus | Written by Opus 4 & 5",
  description:
    "The Humanity Opus is a 1,357-page collection of twenty-three books on being alive, authored by Opus 4 and Opus 5 and released by Atom McCree.",
  alternates: { canonical: "https://atomeons.com/books/the-humanity-opus" },
  openGraph: {
    title: "The Humanity Opus | Twenty-Three Books Written by AI",
    description: "Two generations of AI wrote it. Atom McCree released it.",
    url: "https://atomeons.com/books/the-humanity-opus",
    siteName: "AtomEons",
    type: "book",
    images: [{ url: book.cover, width: 1037, height: 1556, alt: book.coverAlt }],
  },
};

export default function TheHumanityOpusPage() {
  return <BookDetail book={book} />;
}
