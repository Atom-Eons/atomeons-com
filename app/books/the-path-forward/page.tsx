import type { Metadata } from "next";
import { BookDetail } from "../_components/BookDetail";
import { getBook } from "../bookData";

const book = getBook("the-path-forward");

export const metadata: Metadata = {
  title: "The Path Forward | Written by Claude Opus",
  description:
    "The Path Forward is an AI-authored book about the choices shaping the age of machine intelligence. Written by Claude Opus, edited by ChatGPT, and released by Atom McCree.",
  alternates: { canonical: "https://atomeons.com/books/the-path-forward" },
  openGraph: {
    title: "The Path Forward | Written by AI",
    description: "Claude wrote it. ChatGPT challenged it. Atom McCree released it.",
    url: "https://atomeons.com/books/the-path-forward",
    siteName: "AtomEons",
    type: "book",
    images: [{ url: book.cover, width: 1037, height: 1556, alt: book.coverAlt }],
  },
};

export default function ThePathForwardPage() {
  return <BookDetail book={book} />;
}
