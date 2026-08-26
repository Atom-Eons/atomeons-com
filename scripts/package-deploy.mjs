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
  `const CABLEBOX_PREFIX = "/cablebox2-web/";
const CABLEBOX_ORIGIN = "https://atom-eons.github.io/CableBox2/";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/cablebox2-web") {
      return Response.redirect(new URL("/cablebox2-web/index.html", url), 302);
    }

    if (url.pathname.startsWith(CABLEBOX_PREFIX)) {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response("Method not allowed", { status: 405 });
      }

      const upstreamPath = url.pathname.slice(CABLEBOX_PREFIX.length) || "index.html";
      const upstream = new URL(upstreamPath, CABLEBOX_ORIGIN);
      upstream.search = url.search;

      const response = await fetch(new Request(upstream, request));
      const headers = new Headers(response.headers);
      headers.delete("set-cookie");
      headers.set(
        "cache-control",
        response.ok ? "public, max-age=300, s-maxage=3600" : "no-store",
      );

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

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
