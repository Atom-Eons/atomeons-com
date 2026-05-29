/**
 * Five learning paths — one per persona.
 *
 * Each path is an ORDERED list of lesson slugs from the master lesson
 * library (lessons.ts). The order is what makes the path useful — same
 * lessons, different sequence depending on what you need first.
 *
 * The lesson library is curated, so most paths share most lessons.
 * That's intentional: the foundation is universal. The difference is
 * where the path emphasizes (a Worker should do verify-rule and
 * paid-tier early; a Builder should hit model-routing fast; a Student
 * needs document-handling early).
 */

import { LESSONS, type Lesson } from "./lessons";

export type PathId = "worker" | "builder" | "student" | "operator" | "curious";

export type LearningPath = {
  id: PathId;
  label: string;
  oneLine: string;
  fitFor: string[]; // bullet examples of who fits this path
  notFor: string[]; // honest exclusions
  totalMinutes: number; // computed
  weeks: number; // realistic span at honest cadence
  lessons: string[]; // ordered slug list
  accent: string;
};

const RAW_PATHS: Omit<LearningPath, "totalMinutes">[] = [
  {
    id: "worker",
    label: "Worker · keep your job and lead it",
    oneLine:
      "You work for a living. You're worried about being replaced. The job here is to make you noticeably harder to replace by month two.",
    fitFor: [
      "Anyone in a desk job — accounting, ops, marketing, sales, HR, customer success, project management",
      "Anyone who feels their job involves more typing and email than they signed up for",
      "Anyone whose company is starting to talk about AI in all-hands meetings",
    ],
    notFor: [
      "Builders trying to ship a product — you want the Builder path",
      "Anyone planning to quit and start something — that's Builder + Operator",
    ],
    weeks: 8,
    lessons: [
      "scared-or-skeptical",
      "what-ai-actually-does",
      "your-first-real-prompt",
      "system-prompts",
      "when-ai-gets-it-wrong",
      "the-verify-rule",
      "refusal-posture-mapping",
      "refine-not-restart",
      "your-saved-prompt-library",
      "multi-turn-conversations",
      "documents-in-chat",
      "image-in-chat",
      "voice-mode-when-speaking-beats-typing",
      "projects-and-custom-gpts",
      "first-paid-tier",
      "what-ai-cannot-replace",
      "senior-engineer-pattern",
    ],
    accent: "#FFB87A",
  },
  {
    id: "builder",
    label: "Builder · ship something real",
    oneLine:
      "You want to make something. Side project, business, app, art piece. The path here gets you from idea to shipped in ~6 weeks.",
    fitFor: [
      "Anyone with a half-built side project gathering dust",
      "Anyone who has tried to learn to code for the third time",
      "Anyone who has an idea they keep mentioning at dinner",
    ],
    notFor: [
      "Anyone who needs to keep their day job stable first — Worker path",
      "Anyone who already runs something — Operator path",
    ],
    weeks: 10,
    lessons: [
      "scared-or-skeptical",
      "what-ai-actually-does",
      "your-first-real-prompt",
      "system-prompts",
      "refine-not-restart",
      "when-ai-gets-it-wrong",
      "the-verify-rule",
      "few-shot-teach-by-example",
      "multi-turn-conversations",
      "documents-in-chat",
      "image-in-chat",
      "voice-mode-when-speaking-beats-typing",
      "projects-and-custom-gpts",
      "artifacts-canvas",
      "model-routing",
      "mcp-servers-plug-socket",
      "agent-mode-when-ai-takes-action",
      "computer-use-agents",
      "first-paid-tier",
      "senior-engineer-pattern",
      "outgrow-the-chatbox",
    ],
    accent: "#22F0D5",
  },
  {
    id: "student",
    label: "Student · learn faster, don't skip the learning",
    oneLine:
      "You're learning something — a language, a skill, a subject. AI used right is a tutor. AI used wrong is a cheating tool that hurts your future self.",
    fitFor: [
      "Anyone in school at any level (high school, college, grad school)",
      "Anyone learning a language",
      "Anyone learning a craft outside of school (drawing, music, coding, math)",
    ],
    notFor: [
      "Anyone whose goal is to finish school with the least effort — this path will make that worse",
      "Anyone who needs school over by Friday — this is a 30-90 day path",
    ],
    weeks: 9,
    lessons: [
      "scared-or-skeptical",
      "what-ai-actually-does",
      "when-ai-gets-it-wrong",
      "the-verify-rule",
      "refusal-posture-mapping",
      "your-first-real-prompt",
      "system-prompts",
      "refine-not-restart",
      "few-shot-teach-by-example",
      "multi-turn-conversations",
      "documents-in-chat",
      "image-in-chat",
      "projects-and-custom-gpts",
      "your-saved-prompt-library",
      "ai-for-kids-and-teachers",
    ],
    accent: "#22F0D5",
  },
  {
    id: "operator",
    label: "Operator · take back the hours",
    oneLine:
      "You already run something — a small business, a freelance practice, a side hustle. The job here is to reclaim 5-10 hours a week and reinvest them.",
    fitFor: [
      "Freelancers and solo consultants",
      "Small business owners (1-10 employees)",
      "Indie product founders",
      "Anyone who runs their own P&L",
    ],
    notFor: [
      "People still working W-2 — Worker path first",
      "Pre-revenue side projects — Builder path",
    ],
    weeks: 14,
    lessons: [
      "scared-or-skeptical",
      "what-ai-actually-does",
      "your-first-real-prompt",
      "system-prompts",
      "when-ai-gets-it-wrong",
      "the-verify-rule",
      "refusal-posture-mapping",
      "refine-not-restart",
      "few-shot-teach-by-example",
      "your-saved-prompt-library",
      "multi-turn-conversations",
      "documents-in-chat",
      "image-in-chat",
      "voice-mode-when-speaking-beats-typing",
      "projects-and-custom-gpts",
      "artifacts-canvas",
      "first-paid-tier",
      "local-ai-ollama",
      "model-routing",
      "mcp-servers-plug-socket",
      "agent-mode-when-ai-takes-action",
      "computer-use-agents",
      "what-ai-cannot-replace",
      "receipts-and-paper-trail",
      "senior-engineer-pattern",
      "outgrow-the-chatbox",
    ],
    accent: "#FF7A1A",
  },
  {
    id: "curious",
    label: "Curious · no goal yet, just want to understand",
    oneLine:
      "You don't have a job to protect or a business to scale. You just want to know what's going on. Lowest stakes, highest upside.",
    fitFor: [
      "Anyone who keeps reading AI headlines and feels behind",
      "Retired or semi-retired humans curious about the technology",
      "Parents of teenagers who use AI for school",
      "Skeptics who want to form their own opinion from doing, not reading",
    ],
    notFor: [
      "Anyone with a specific task in mind — pick the path that matches the task",
    ],
    weeks: 5,
    lessons: [
      "scared-or-skeptical",
      "what-ai-actually-does",
      "your-first-real-prompt",
      "when-ai-gets-it-wrong",
      "the-verify-rule",
      "refusal-posture-mapping",
      "what-ai-cannot-replace",
      "refine-not-restart",
    ],
    accent: "#9BA5A7",
  },
];

// Compute total minutes for each path by summing its lesson durations.
function computeTotal(lessons: string[]): number {
  return lessons.reduce((acc, slug) => {
    const lesson = LESSONS.find((l) => l.slug === slug);
    return acc + (lesson?.timeMinutes ?? 0);
  }, 0);
}

export const PATHS: LearningPath[] = RAW_PATHS.map((p) => ({
  ...p,
  totalMinutes: computeTotal(p.lessons),
}));

export function getPath(id: PathId): LearningPath | undefined {
  return PATHS.find((p) => p.id === id);
}

export function pathLessons(id: PathId): Lesson[] {
  const path = getPath(id);
  if (!path) return [];
  return path.lessons
    .map((slug) => LESSONS.find((l) => l.slug === slug))
    .filter((l): l is Lesson => Boolean(l));
}
