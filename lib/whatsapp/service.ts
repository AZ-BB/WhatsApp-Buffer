import type {
  WhatsAppSendMessagePayload,
  WhatsAppSendMessageResponse,
} from "@/types/whatsapp";

const META_GRAPH_API_VERSION = "v21.0";
const DEFAULT_MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

export class WhatsAppAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public raw?: unknown
  ) {
    super(message);
    this.name = "WhatsAppAPIError";
  }
}

function getConfig() {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    throw new WhatsAppAPIError(
      "Missing WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID",
      undefined,
      "CONFIG_ERROR"
    );
  }

  return { token, phoneNumberId };
}

/**
 * Normalize phone to digits only (no + or spaces).
 * WhatsApp API expects country code + number without leading 0.
 */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return digits.slice(1);
  return digits;
}

/**
 * Send a text message via WhatsApp Cloud API with retry logic.
 */
export async function sendTextMessage(
  to: string,
  text: string,
  options?: { maxRetries?: number }
): Promise<WhatsAppSendMessageResponse> {
  const { token, phoneNumberId } = getConfig();
  const recipient = normalizePhone(to);
  const maxRetries = options?.maxRetries ?? DEFAULT_MAX_RETRIES;

  const payload: WhatsAppSendMessagePayload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipient,
    type: "text",
    text: {
      preview_url: false,
      body: text,
    },
  };

  const url = `https://graph.facebook.com/${META_GRAPH_API_VERSION}/${phoneNumberId}/messages`;

  let lastError: unknown;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as
        | WhatsAppSendMessageResponse
        | { error?: { message?: string; code?: number; error_data?: unknown } };

      if (!res.ok) {
        const err = data as { error?: { message?: string; code?: number; error_data?: unknown } };
        throw new WhatsAppAPIError(
          err?.error?.message ?? `HTTP ${res.status}`,
          res.status,
          String(err?.error?.code ?? res.status),
          data
        );
      }

      return data as WhatsAppSendMessageResponse;
    } catch (e) {
      lastError = e;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
      }
    }
  }

  throw lastError instanceof WhatsAppAPIError
    ? lastError
    : new WhatsAppAPIError(
        lastError instanceof Error ? lastError.message : "Send message failed",
        undefined,
        "SEND_FAILED",
        lastError
      );
}
