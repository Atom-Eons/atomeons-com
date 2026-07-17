import {
  copyFileSync,
  existsSync,
  mkdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";

if (!existsSync("out")) {
  throw new Error("Next static export is missing: out/");
}

if (existsSync("dist")) {
  rmSync("dist", { recursive: true, force: true });
}

renameSync("out", "dist");
mkdirSync("dist/server", { recursive: true });
mkdirSync("dist/.openai", { recursive: true });

writeFileSync(
  "dist/server/index.js",
  `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
`,
  "utf8",
);

copyFileSync(".openai/hosting.json", "dist/.openai/hosting.json");
