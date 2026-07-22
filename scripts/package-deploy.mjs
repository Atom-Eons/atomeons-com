import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
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
mkdirSync("dist/server", { recursive: true });
mkdirSync("dist/.openai", { recursive: true });

writeFileSync(
  "dist/server/index.js",
  `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.endsWith(".__PAGE__.txt")) {
      url.pathname =
        url.pathname.slice(0, -".__PAGE__.txt".length) + "/__PAGE__.txt";
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }
    return env.ASSETS.fetch(request);
  }
};
`,
  "utf8",
);

copyFileSync(".openai/hosting.json", "dist/.openai/hosting.json");
