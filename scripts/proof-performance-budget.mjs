import fs from "node:fs";
import path from "node:path";

const assetsRoot = path.join("dist", "assets");
const limits = {
  totalBytes: 40 * 1024 * 1024,
  htmlBytes: 600 * 1024,
  cssBytes: 350 * 1024,
  jsBytes: 350 * 1024,
  imageBytes: 320 * 1024,
  videoBytes: 3 * 1024 * 1024,
  audioBytes: 20 * 1024 * 1024,
  pdfBytes: 2 * 1024 * 1024,
};

const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(filePath);
      continue;
    }

    const stat = fs.statSync(filePath);
    files.push({
      file: filePath.replaceAll("\\", "/"),
      ext: path.extname(entry.name).toLowerCase(),
      bytes: stat.size,
    });
  }
}

walk(assetsRoot);

function limitFor(file) {
  if (file.ext === ".html") return limits.htmlBytes;
  if (file.ext === ".css") return limits.cssBytes;
  if (file.ext === ".js") return limits.jsBytes;
  if ([".webp", ".png", ".jpg", ".jpeg", ".svg", ".ico"].includes(file.ext)) return limits.imageBytes;
  if ([".mp4", ".webm"].includes(file.ext)) return limits.videoBytes;
  if ([".mp3", ".wav", ".m4a"].includes(file.ext)) return limits.audioBytes;
  if (file.ext === ".pdf") return limits.pdfBytes;
  return null;
}

const totalBytes = files.reduce((sum, file) => sum + file.bytes, 0);
const oversizeFiles = files
  .map((file) => ({ ...file, limit: limitFor(file) }))
  .filter((file) => file.limit !== null && file.bytes > file.limit)
  .sort((a, b) => b.bytes - a.bytes);

const largest = [...files]
  .sort((a, b) => b.bytes - a.bytes)
  .slice(0, 12);

const result = {
  pass: totalBytes <= limits.totalBytes && oversizeFiles.length === 0,
  totalBytes,
  totalLimit: limits.totalBytes,
  fileCount: files.length,
  oversizeFiles,
  largest,
};

console.log(JSON.stringify(result, null, 2));

if (!result.pass) {
  process.exit(1);
}
