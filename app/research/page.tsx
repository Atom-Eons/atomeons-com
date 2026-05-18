import { redirect } from "next/navigation";

export const metadata = {
  title: "Æ Research",
  alternates: { canonical: "https://atomeons.com/research/about" },
};

/**
 * /research is a section root with two children:
 *   /research/about
 *   /research/papers
 *
 * Default landing goes to /about (the intro card). Operator can flip the
 * default by changing the redirect target.
 */
export default function ResearchIndex() {
  redirect("/research/about");
}
