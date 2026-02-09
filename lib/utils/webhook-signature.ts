import crypto from "crypto";

/**
 * Verify Meta webhook signature (X-Hub-Signature-256).
 * Uses HMAC-SHA256 with app secret.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  appSecret: string
): boolean {
  if (!signatureHeader || !appSecret) return false;
  const secret = appSecret.trim();
  const expected = signatureHeader.replace(/^sha256=/, "").trim();
  if (expected.length !== 64 || !/^[a-f0-9]+$/i.test(expected)) return false;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(rawBody);
  const digest = hmac.digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(digest, "hex"));
  } catch {
    return false;
  }
}
