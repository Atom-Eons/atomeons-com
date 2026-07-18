import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";

if (!existsSync("out")) {
  throw new Error("Next static export is missing: out/");
}

if (existsSync("dist")) {
  rmSync("dist", { recursive: true, force: true });
}

mkdirSync("dist/assets", { recursive: true });
cpSync("out", "dist/assets", { recursive: true });
rmSync("out", { recursive: true, force: true });

function createSegmentAliases(directory) {
  const entries = readdirSync(directory, { withFileTypes: true });
  const pagePayloads = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith(".__PAGE__.txt"),
  );

  if (pagePayloads.length > 1) {
    throw new Error(`Multiple page segment payloads found in ${directory}`);
  }

  if (pagePayloads.length === 1) {
    copyFileSync(
      `${directory}/${pagePayloads[0].name}`,
      `${directory}/segment-page.txt`,
    );
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      createSegmentAliases(`${directory}/${entry.name}`);
    }
  }
}

createSegmentAliases("dist/assets");
mkdirSync("dist/server", { recursive: true });
mkdirSync("dist/.openai", { recursive: true });

writeFileSync(
  "dist/server/index.js",
  `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.endsWith(".__PAGE__.txt")) {
      const finalSlash = url.pathname.lastIndexOf("/");
      url.pathname = url.pathname.slice(0, finalSlash + 1) + "segment-page.txt";
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }
    return env.ASSETS.fetch(request);
  }
};
`,
  "utf8",
);

copyFileSync(".openai/hosting.json", "dist/.openai/hosting.json");
