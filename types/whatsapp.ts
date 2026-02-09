/**
 * WhatsApp Cloud API webhook payload types (Meta)
 * @see https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks
 */

export interface WhatsAppWebhookPayload {
  object?: string;
  entry?: WhatsAppWebhookEntry[];
}

export interface WhatsAppWebhookEntry {
  id: string;
  changes?: Array<{
    value: WhatsAppWebhookValue;
    field: string;
  }>;
}

export interface WhatsAppWebhookValue {
  messaging_product: string;
  metadata: {
    display_phone_number: string;
    phone_number_id: string;
  };
  contacts?: Array<{
    profile: { name: string };
    wa_id: string;
  }>;
  messages?: WhatsAppIncomingMessage[];
  statuses?: WhatsAppStatus[];
  errors?: unknown[];
}

export interface WhatsAppIncomingMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: { body: string };
  image?: { id: string; caption?: string };
  audio?: { id: string };
  video?: { id: string; caption?: string };
  document?: { id: string; filename?: string; caption?: string };
  location?: { latitude: number; longitude: number; name?: string };
  button?: { text: string };
  interactive?: { type: string; [key: string]: unknown };
  reaction?: { message_id: string; emoji: string };
  [key: string]: unknown;
}

export interface WhatsAppStatus {
  id: string;
  status: string;
  timestamp: string;
  recipient_id: string;
  [key: string]: unknown;
}

export interface ParsedIncomingMessage {
  waId: string;
  waMessageId: string;
  timestamp: string;
  messageType: string;
  text: string | null;
  caption?: string | null;
  raw: WhatsAppIncomingMessage;
}

export interface SendMessageRequestBody {
  to: string;
  text: string;
}

export interface WhatsAppSendMessagePayload {
  messaging_product: "whatsapp";
  recipient_type: "individual";
  to: string;
  type: "text";
  text: {
    preview_url: boolean;
    body: string;
  };
}

export interface WhatsAppSendMessageResponse {
  messaging_product: string;
  contacts: Array<{ input: string; wa_id: string }>;
  messages: Array<{ id: string }>;
}
