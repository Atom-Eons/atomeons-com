import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://atomeons.com"),
  title: "ORANGEBOX — Private Command Cockpit | AtomEons",
  description:
    "ORANGEBOX is a private, local-first command cockpit for one operator running large projects through AI departments, worker rails, and proof gates. $49 one-time download.",
  openGraph: {
    title: "ORANGEBOX — Private Command Cockpit",
    description:
      "Local-first cockpit. Vision Rail, Party Line, Codexa workers, receipts. $49 one-time. No support.",
    url: "https://atomeons.com",
    siteName: "AtomEons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORANGEBOX — Private Command Cockpit",
    description:
      "Local-first cockpit for one operator. $49 one-time. No support.",
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
      <body className="min-h-full flex flex-col bg-[#04100d] text-[#f7f0e4]">
        {children}
      </body>
    </html>
  );
}
