/**
 * TeachableGraphics.tsx — diagrams that replace paragraphs.
 *
 * Wave 36 · 2026-06-06 · operator: "teachable graphics to help people
 * understand · make those wherever we need them."
 *
 * Five educational SVG diagrams, each ~5 seconds of read, each
 * captioned in mono so an LLM can also extract the meaning.
 */

import React from "react";

const COLORS = {
  base: "#08090B",
  ink: "#0F1114",
  paper: "#F4F4F2",
  dim: "#9CA3AF",
  mute: "#7a818a",
  hair: "#1F242B",
  cyan: "#22F0D5",
  amber: "#C9A55C",
  red: "#FF4D4D",
} as const;

interface DiagramFrameProps {
  title: string;
  caption: string;
  children: React.ReactNode;
}

export function DiagramFrame({ title, caption, children }: DiagramFrameProps) {
  return (
    <figure className="my-10 border border-[#1F242B] bg-[#0B0C0F] p-6">
      <figcaption className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
        § Diagram · {title}
      </figcaption>
      <div className="flex justify-center">{children}</div>
      <p className="mt-4 max-w-[64ch] text-center text-[13px] leading-[1.55] text-[#9CA3AF]">
        {caption}
      </p>
    </figure>
  );
}

// =============================================================================
// RAG pipeline · 4-stage flow · for /learn/atlas/rag-architectures
// =============================================================================

export function RAGPipelineDiagram() {
  const stages = [
    { label: "Documents", sub: "PDFs · code · pages" },
    { label: "Chunk + embed", sub: "vectors · 768 - 1536 dim" },
    { label: "Retrieve", sub: "top-k · cosine sim" },
    { label: "Generate", sub: "LLM with context" },
  ];
  return (
    <DiagramFrame
      title="RAG · 4-stage retrieval-augmented generation"
      caption="Documents are chunked + embedded once. At query time, the user's question is embedded too, the top-K most similar chunks are retrieved, and the LLM generates an answer grounded in those chunks."
    >
      <svg
        viewBox="0 0 720 200"
        width="100%"
        style={{ maxWidth: 720, height: "auto" }}
        aria-label="RAG 4-stage flow diagram"
      >
        {stages.map((s, i) => {
          const x = 30 + i * 170;
          return (
            <g key={i}>
              <rect
                x={x}
                y={70}
                width={140}
                height={60}
                rx={4}
                fill="none"
                stroke={COLORS.cyan}
                strokeWidth={1.2}
              />
              <text
                x={x + 70}
                y={94}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="12"
                fill={COLORS.paper}
                letterSpacing="0.5"
              >
                {s.label}
              </text>
              <text
                x={x + 70}
                y={112}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="9"
                fill={COLORS.dim}
              >
                {s.sub}
              </text>
              {i < stages.length - 1 && (
                <line
                  x1={x + 142}
                  y1={100}
                  x2={x + 168}
                  y2={100}
                  stroke={COLORS.cyan}
                  strokeWidth={1.2}
                  markerEnd="url(#arrow-cyan)"
                />
              )}
            </g>
          );
        })}
        <text x={360} y={30} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill={COLORS.mute} letterSpacing="2">
          BUILD-TIME ── ── ── ── ── ── ── ── ── ── QUERY-TIME
        </text>
        <text x={170} y={170} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill={COLORS.amber}>
          done once
        </text>
        <text x={530} y={170} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill={COLORS.amber}>
          done every query
        </text>
        <defs>
          <marker id="arrow-cyan" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill={COLORS.cyan} />
          </marker>
        </defs>
      </svg>
    </DiagramFrame>
  );
}

// =============================================================================
// MCP sequence diagram · client/server/tool · for /best-practices/mcp
// =============================================================================

export function McpSequenceDiagram() {
  return (
    <DiagramFrame
      title="MCP · client/server message flow"
      caption="The client (Claude / Cursor / Codex) talks JSON-RPC to one or more MCP servers. Each server exposes Tools, Resources, and Prompts. When the LLM wants to use a tool, the client routes the call to the right server and returns the result to the model."
    >
      <svg
        viewBox="0 0 720 320"
        width="100%"
        style={{ maxWidth: 720, height: "auto" }}
        aria-label="MCP client-server sequence diagram"
      >
        {/* Lanes */}
        {[
          { label: "Client (Claude / Cursor)", x: 100 },
          { label: "MCP Server (filesystem)", x: 360 },
          { label: "Tool · read_file", x: 620 },
        ].map((lane, i) => (
          <g key={i}>
            <rect
              x={lane.x - 90}
              y={20}
              width={180}
              height={36}
              fill="none"
              stroke={COLORS.cyan}
              strokeWidth={1}
            />
            <text
              x={lane.x}
              y={43}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="11"
              fill={COLORS.paper}
            >
              {lane.label}
            </text>
            <line x1={lane.x} y1={56} x2={lane.x} y2={300} stroke={COLORS.hair} strokeDasharray="4 4" />
          </g>
        ))}
        {/* Sequence arrows */}
        {[
          { from: 100, to: 360, y: 90, label: "1. initialize ↔ negotiate" },
          { from: 100, to: 360, y: 130, label: "2. tools/list" },
          { from: 360, to: 100, y: 160, label: "3. ['read_file', 'write_file', ...]" },
          { from: 100, to: 360, y: 210, label: "4. tools/call read_file('/path/foo.ts')" },
          { from: 360, to: 620, y: 240, label: "5. server reads file" },
          { from: 620, to: 360, y: 270, label: "6. content" },
          { from: 360, to: 100, y: 290, label: "7. {content: '...'}" },
        ].map((arr, i) => (
          <g key={i}>
            <line
              x1={arr.from + (arr.from < arr.to ? 90 : -90)}
              y1={arr.y}
              x2={arr.to - (arr.from < arr.to ? 90 : -90)}
              y2={arr.y}
              stroke={COLORS.cyan}
              strokeWidth={1}
              markerEnd="url(#arrow-cyan2)"
            />
            <text
              x={(arr.from + arr.to) / 2}
              y={arr.y - 6}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="9"
              fill={COLORS.dim}
            >
              {arr.label}
            </text>
          </g>
        ))}
        <defs>
          <marker id="arrow-cyan2" markerWidth="8" markerHeight="8" refX="7" refY="2.5" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,5 L7,2.5 z" fill={COLORS.cyan} />
          </marker>
        </defs>
      </svg>
    </DiagramFrame>
  );
}

// =============================================================================
// Context window · token budget viz · for /q/what-is-a-context-window
// =============================================================================

export function ContextWindowDiagram({
  totalTokens = 200_000,
  budgets = [
    { label: "System prompt", tokens: 8_000, color: COLORS.amber },
    { label: "Tool definitions", tokens: 12_000, color: COLORS.cyan },
    { label: "CLAUDE.md / AGENTS.md", tokens: 4_000, color: "#9D7FFF" },
    { label: "Conversation so far", tokens: 60_000, color: "#3FB950" },
    { label: "Files in context", tokens: 35_000, color: "#FF9F3F" },
    { label: "Available for response", tokens: 81_000, color: COLORS.mute },
  ],
}: {
  totalTokens?: number;
  budgets?: { label: string; tokens: number; color: string }[];
}) {
  const totalUsed = budgets.reduce((s, b) => s + b.tokens, 0);
  const W = 680;
  return (
    <DiagramFrame
      title="Context window · token budget"
      caption={`A 200K-token context window doesn't mean 200K tokens for your conversation. System prompt, tool schemas, project memory, and history all eat into the budget before your message lands. Plan accordingly.`}
    >
      <svg
        viewBox="0 0 720 220"
        width="100%"
        style={{ maxWidth: 720, height: "auto" }}
        aria-label="Context window token budget diagram"
      >
        <text x={20} y={30} fontFamily="ui-monospace, monospace" fontSize="11" fill={COLORS.paper}>
          {totalTokens.toLocaleString()} token context window
        </text>
        <text x={20} y={50} fontFamily="ui-monospace, monospace" fontSize="9" fill={COLORS.mute}>
          showing typical allocation in an active Claude Code session
        </text>
        {/* The bar */}
        <g transform="translate(20, 70)">
          <rect x={0} y={0} width={W} height={36} fill={COLORS.ink} stroke={COLORS.hair} strokeWidth={1} />
          {(() => {
            let cursor = 0;
            return budgets.map((b, i) => {
              const w = (b.tokens / totalUsed) * W;
              const x = cursor;
              cursor += w;
              return (
                <rect
                  key={i}
                  x={x}
                  y={0}
                  width={w}
                  height={36}
                  fill={b.color}
                  opacity={b.label.includes("Available") ? 0.18 : 0.78}
                />
              );
            });
          })()}
          <rect x={0} y={0} width={W} height={36} fill="none" stroke={COLORS.paper} strokeWidth={0.4} />
        </g>
        {/* Legend */}
        <g transform="translate(20, 130)">
          {budgets.map((b, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const x = col * 240;
            const y = row * 22;
            return (
              <g key={i} transform={`translate(${x}, ${y})`}>
                <rect x={0} y={0} width={12} height={12} fill={b.color} opacity={0.78} />
                <text x={18} y={10} fontFamily="ui-monospace, monospace" fontSize="10" fill={COLORS.dim}>
                  {b.label} · {b.tokens.toLocaleString()}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </DiagramFrame>
  );
}

// =============================================================================
// Cyber Kill Chain · 7 stages · for /learn/cyber/cyber-kill-chain
// =============================================================================

export function KillChainDiagram() {
  const stages = [
    "Reconnaissance",
    "Weaponization",
    "Delivery",
    "Exploitation",
    "Installation",
    "C2",
    "Actions",
  ];
  return (
    <DiagramFrame
      title="Cyber Kill Chain · Lockheed Martin · 7 stages"
      caption="Originally drafted by Lockheed Martin in 2011. An attacker moves through these 7 stages in order. Disrupting any one stage breaks the chain. Defenders map controls to each stage."
    >
      <svg
        viewBox="0 0 720 160"
        width="100%"
        style={{ maxWidth: 720, height: "auto" }}
        aria-label="Cyber Kill Chain 7-stage diagram"
      >
        {stages.map((s, i) => {
          const x = 30 + i * 95;
          return (
            <g key={i}>
              <path
                d={`M ${x} 50 L ${x + 75} 50 L ${x + 90} 75 L ${x + 75} 100 L ${x} 100 L ${x + 15} 75 Z`}
                fill={`hsla(${10 + i * 12}, 60%, 50%, 0.25)`}
                stroke={`hsla(${10 + i * 12}, 70%, 60%, 1)`}
                strokeWidth={1}
              />
              <text
                x={x + 45}
                y={70}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="9"
                fontWeight="bold"
                fill={COLORS.paper}
              >
                {i + 1}
              </text>
              <text
                x={x + 45}
                y={85}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="9"
                fill={COLORS.dim}
              >
                {s}
              </text>
            </g>
          );
        })}
        <text x={360} y={130} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill={COLORS.mute}>
          attacker movement → break the chain at any stage to defend
        </text>
      </svg>
    </DiagramFrame>
  );
}

// =============================================================================
// Brainwave bands · for /mindrest
// =============================================================================

export function BrainwaveBandsDiagram() {
  const bands = [
    { name: "Delta", range: "0.5–4 Hz", state: "Deep sleep · trance · healing", x: 30, color: "#1B3D7C" },
    { name: "Theta", range: "4–8 Hz", state: "Meditation · imagery · creativity", x: 170, color: "#6B3DA3" },
    { name: "Alpha", range: "8–12 Hz", state: "Relaxed alert · soft focus", x: 310, color: "#22A88A" },
    { name: "Beta", range: "12–30 Hz", state: "Active thinking · problem solving", x: 450, color: "#D69B40" },
    { name: "Gamma", range: "30–100 Hz", state: "Peak cognition · insight", x: 590, color: "#FF4D4D" },
  ];
  return (
    <DiagramFrame
      title="Brainwave bands · EEG frequency families"
      caption="Five canonical frequency bands measured by EEG. Audiovisual entrainment targets a specific band by playing a binaural-beat frequency that the auditory cortex 'follows'. Mindrest uses alpha (10 Hz), theta (6 Hz), beta (15 Hz), and delta (3 Hz)."
    >
      <svg
        viewBox="0 0 720 200"
        width="100%"
        style={{ maxWidth: 720, height: "auto" }}
        aria-label="Brainwave bands frequency diagram"
      >
        {bands.map((b) => (
          <g key={b.name}>
            <rect
              x={b.x}
              y={40}
              width={120}
              height={120}
              fill={b.color}
              opacity={0.18}
              stroke={b.color}
              strokeWidth={1}
            />
            <text
              x={b.x + 60}
              y={68}
              textAnchor="middle"
              fontFamily="Newsreader, Georgia, serif"
              fontSize="20"
              fontWeight="300"
              fill={COLORS.paper}
            >
              {b.name}
            </text>
            <text
              x={b.x + 60}
              y={92}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="10"
              fill={b.color}
              letterSpacing="0.5"
            >
              {b.range}
            </text>
            <foreignObject x={b.x + 8} y={104} width={104} height={50}>
              <p
                style={{
                  margin: 0,
                  textAlign: "center",
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 9,
                  lineHeight: 1.35,
                  color: COLORS.dim,
                }}
              >
                {b.state}
              </p>
            </foreignObject>
          </g>
        ))}
      </svg>
    </DiagramFrame>
  );
}
