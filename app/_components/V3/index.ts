// app/_components/V3/index.ts
//
// V3 / noir-cinema · barrel
//
// Single import surface for the V3 homepage sections. Consumers import
// from "@/app/_components/V3" rather than reaching into individual
// section files, so the section roster and its ordering live here.
//
// Canonical section order on the homepage (matches the noir-cinema
// outline; sections not yet shipped are intentionally absent from this
// barrel — Mom's Law, no phantom exports):
//
//   § 00  Hero              (full-bleed cinematic, Live Signal Panel)
//   § 01  Thesis            (variable-weight reveal, 60-word lede)
//   § 02  ThreeDoors        (Cyber / Learn / Build, stacked 100vh)
//   § 03  LiveReceipts      (real-API mono numerals, no fake metrics)
//   § 04  CurrentResearch   (three latest AEoNs papers)
//   § 05  Curriculum        (curriculum wall, 12-col dense index)        SHIPPED
//   § 06  FounderNote       (workspace photo + signed paragraph)
//   § 07  FinalCTA          (one next action, oversized)                 SHIPPED
//   § 08  Colophon          (60vh inverted footer with oversized AEONS)
//
// As each section lands at app/_components/V3/<Section>.tsx it gets
// one re-export line below, in the same § order. Never ahead.

export { Curriculum } from "./Curriculum";
export { FinalCTA } from "./FinalCTA";

export { default as CurriculumDefault } from "./Curriculum";
export { default as FinalCTADefault } from "./FinalCTA";
