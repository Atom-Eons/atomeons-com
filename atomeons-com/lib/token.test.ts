/**
 * Unit tests for HMAC download token.
 *
 * Run: pnpm vitest run lib/token.test.ts
 *
 * The five cases below cover every failure mode of the token contract:
 *   1. Round-trip a valid claim
 *   2. Reject an expired token
 *   3. Reject a tampered signature
 *   4. Reject a tampered payload
 *   5. Reject malformed input
 *
 * These are pure crypto, no external deps. They do not need a live
 * server or any env wiring beyond DOWNLOAD_TOKEN_SECRET.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { mintDownloadToken, verifyDownloadToken } from "./token";

beforeAll(() => {
  process.env.DOWNLOAD_TOKEN_SECRET =
    "test-secret-do-not-use-in-prod-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
});

describe("download token", () => {
  it("round-trips a valid claim", () => {
    const exp = Math.floor(Date.now() / 1000) + 3600;
    const claim = { email: "buyer@example.com", sessionId: "cs_test_abc", exp };
    const token = mintDownloadToken(claim);
    expect(token.split(".").length).toBe(2);
    const out = verifyDownloadToken(token);
    expect(out).not.toBeNull();
    expect(out?.email).toBe("buyer@example.com");
    expect(out?.sessionId).toBe("cs_test_abc");
    expect(out?.exp).toBe(exp);
  });

  it("rejects an expired token", () => {
    const claim = {
      email: "buyer@example.com",
      sessionId: "cs_test_abc",
      exp: Math.floor(Date.now() / 1000) - 1,
    };
    const token = mintDownloadToken(claim);
    expect(verifyDownloadToken(token)).toBeNull();
  });

  it("rejects a tampered signature", () => {
    const claim = {
      email: "buyer@example.com",
      sessionId: "cs_test_abc",
      exp: Math.floor(Date.now() / 1000) + 3600,
    };
    const token = mintDownloadToken(claim);
    const [payload] = token.split(".");
    const tampered = `${payload}.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
    expect(verifyDownloadToken(tampered)).toBeNull();
  });

  it("rejects a tampered payload", () => {
    const claim = {
      email: "buyer@example.com",
      sessionId: "cs_test_abc",
      exp: Math.floor(Date.now() / 1000) + 3600,
    };
    const token = mintDownloadToken(claim);
    const [, sig] = token.split(".");
    // Replace payload with a different (valid base64url) string
    const fakePayload = Buffer.from(
      JSON.stringify({ email: "attacker@evil.com", sessionId: "x", exp: claim.exp }),
    )
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
    const tampered = `${fakePayload}.${sig}`;
    expect(verifyDownloadToken(tampered)).toBeNull();
  });

  it("rejects malformed input", () => {
    expect(verifyDownloadToken("")).toBeNull();
    expect(verifyDownloadToken("not-a-token")).toBeNull();
    expect(verifyDownloadToken("a.b.c")).toBeNull();
    // @ts-expect-error — runtime guard test
    expect(verifyDownloadToken(null)).toBeNull();
    // @ts-expect-error — runtime guard test
    expect(verifyDownloadToken(undefined)).toBeNull();
  });
});
