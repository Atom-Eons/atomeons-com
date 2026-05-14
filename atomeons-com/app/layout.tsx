import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://atomeons.com"),
  title: {
    default: "AtomEons — Build like a serious laboratory",
    template: "%s | AtomEons",
  },
  description:
    "AtomEons Systems Laboratory builds private, local-first execution surfaces for one operator running serious AI-assisted projects. Anti-sprawl, premium coherence, real receipts.",
  openGraph: {
    title: "AtomEons — Build like a serious laboratory",
    description:
      "Private execution surfaces for serious operators. ORANGEBOX prototype $49 one-time download.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons — Build like a serious laboratory",
    description:
      "Private execution surfaces for serious operators. ORANGEBOX prototype $49.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="scanlines screen-flicker min-h-full flex flex-col bg-[#04100d] text-[#f7f0e4]">
        <div className="boot-bar" aria-hidden />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
