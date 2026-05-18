import { createHmac, timingSafeEqual } from "node:crypto";

function getSecret(): string {
  const s = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!s) {
    throw new Error(
      "DOWNLOAD_TOKEN_SECRET is not set. Refusing to sign tokens with a known fallback. Set it in Vercel env.",
    );
  }
  return s;
}

export type DownloadClaim = {
  email: string;
  sessionId: string;
  /** unix seconds */
  exp: number;
};

function b64urlEncode(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function b64urlDecode(s: string): Buffer {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function sign(payload: string): string {
  return b64urlEncode(createHmac("sha256", getSecret()).update(payload).digest());
}

export function mintDownloadToken(claim: DownloadClaim): string {
  const payload = b64urlEncode(Buffer.from(JSON.stringify(claim), "utf8"));
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

export function verifyDownloadToken(token: string): DownloadClaim | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = sign(payload);
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return null;
  if (!timingSafeEqual(a, b)) return null;
  let claim: DownloadClaim;
  try {
    claim = JSON.parse(b64urlDecode(payload).toString("utf8"));
  } catch {
    return null;
  }
  if (typeof claim.exp !== "number" || claim.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }
  if (typeof claim.email !== "string" || typeof claim.sessionId !== "string") {
    return null;
  }
  return claim;
}
