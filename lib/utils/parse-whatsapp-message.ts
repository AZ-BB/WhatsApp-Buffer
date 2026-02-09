import type { WhatsAppIncomingMessage, ParsedIncomingMessage } from "@/types/whatsapp";

/**
 * Safely extracts message content from WhatsApp webhook payload.
 * Handles text, media (image, audio, video, document), and unknown types gracefully.
 */
export function parseIncomingMessage(msg: unknown): ParsedIncomingMessage | null {
  if (!msg || typeof msg !== "object") return null;

  const m = msg as Record<string, unknown>;
  const from = m.from;
  const id = m.id;
  const timestamp = m.timestamp;

  if (typeof from !== "string" || !from) return null;
  if (typeof id !== "string" || !id) return null;
  if (typeof timestamp !== "string" && typeof timestamp !== "number") return null;

  const ts = String(timestamp);
  const type = typeof m.type === "string" ? m.type : "unknown";

  let text: string | null = null;
  let caption: string | null = null;

  switch (type) {
    case "text": {
      const textObj = m.text as { body?: string } | undefined;
      text = textObj && typeof textObj.body === "string" ? textObj.body : null;
      break;
    }
    case "image":
    case "video":
    case "document": {
      const media = m[type] as { caption?: string } | undefined;
      caption = media && typeof media.caption === "string" ? media.caption : null;
      text = caption;
      break;
    }
    case "audio": {
      text = "[Audio message]";
      break;
    }
    case "button": {
      const button = m.button as { text?: string } | undefined;
      text = button && typeof button.text === "string" ? button.text : null;
      break;
    }
    case "location": {
      const loc = m.location as { name?: string; latitude?: number; longitude?: number } | undefined;
      if (loc?.name) text = `Location: ${loc.name}`;
      else if (loc && typeof loc.latitude === "number" && typeof loc.longitude === "number")
        text = `Location: ${loc.latitude}, ${loc.longitude}`;
      else text = "[Location]";
      break;
    }
    case "reaction": {
      const reaction = m.reaction as { emoji?: string } | undefined;
      text = reaction?.emoji ? `Reaction: ${reaction.emoji}` : "[Reaction]";
      break;
    }
    case "interactive": {
      const interactive = m.interactive as Record<string, unknown> | undefined;
      if (interactive?.type === "button_reply") {
        const buttonReply = interactive.button_reply as { title?: string } | undefined;
        text = buttonReply?.title ?? "[Button reply]";
      } else if (interactive?.type === "list_reply") {
        const listReply = interactive.list_reply as { title?: string } | undefined;
        text = listReply?.title ?? "[List reply]";
      } else {
        text = "[Interactive message]";
      }
      break;
    }
    default:
      text = type !== "unknown" ? `[${type}]` : "[Unsupported message type]";
  }

  return {
    waId: from,
    waMessageId: id,
    timestamp: ts,
    messageType: type,
    text,
    caption: caption ?? undefined,
    raw: m as WhatsAppIncomingMessage,
  };
}

/**
 * Extract display name from webhook contact array.
 */
export function getContactName(contacts: unknown): string | null {
  if (!Array.isArray(contacts) || contacts.length === 0) return null;
  const first = contacts[0] as { profile?: { name?: string } } | undefined;
  return first?.profile?.name ?? null;
}
