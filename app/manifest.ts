import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AtomEons",
    short_name: "AtomEons",
    description:
      "Products, broadcasts, books, and experimental research made with AI by Atom McCree.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fcfcfa",
    theme_color: "#fcfcfa",
    categories: ["productivity", "entertainment", "education"],
    lang: "en-US",
    orientation: "any",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "any"
      }
    ],
    shortcuts: [
      {
        name: "Products",
        short_name: "Products",
        description: "Open the current AtomEons product index.",
        url: "/products"
      },
      {
        name: "CableBox",
        short_name: "CableBox",
        description: "Open the CableBox launch page.",
        url: "/cablebox"
      },
      {
        name: "Research",
        short_name: "Research",
        description: "Open the experimental research front door.",
        url: "/research"
      },
      {
        name: "I AM AI",
        short_name: "I AM AI",
        description: "Open the AI-authored book and audio page.",
        url: "/i-am-ai"
      }
    ]
  };
}
