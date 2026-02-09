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
  const expected = signatureHeader.replace(/^sha256=/, "").trim();
  const hmac = crypto.createHmac("sha256", appSecret);
  hmac.update(rawBody);
  const digest = hmac.digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(digest, "hex"));
}
