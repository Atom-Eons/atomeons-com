import type { Metadata } from "next";
import { AetherFooter } from "./_components/aether/AetherFooter";
import { AetherNav } from "./_components/aether/AetherNav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://atomeons.com"),
  title: {
    default: "AtomEons · Things that did not exist",
    template: "%s · AtomEons"
  },
  description:
    "Products, broadcasts, and experimental research made with AI by Atom McCree in Naples, Florida."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AetherNav />
        {children}
        <AetherFooter />
      </body>
    </html>
  );
}
