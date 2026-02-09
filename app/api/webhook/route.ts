import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { logWebhook } from "@/lib/db/webhook-logs";
import { getOrCreateLead } from "@/lib/db/leads";
import { insertMessage } from "@/lib/db/messages";
import { parseIncomingMessage, getContactName } from "@/lib/utils/parse-whatsapp-message";
import { verifyWebhookSignature } from "@/lib/utils/webhook-signature";
import type { WhatsAppWebhookPayload } from "@/types/whatsapp";

const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN ?? "whatsapp-verify-token";

/**
 * GET /api/webhook — Meta webhook subscription verification.
 * Query: hub.mode, hub.verify_token, hub.challenge
 */
export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("hub.mode");
  const token = request.nextUrl.searchParams.get("hub.verify_token");
  const challenge = request.nextUrl.searchParams.get("hub.challenge");

  if (mode !== "subscribe" || token !== VERIFY_TOKEN || !challenge) {
    return NextResponse.json({ error: "Invalid verification" }, { status: 403 });
  }

  return new NextResponse(challenge, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

/**
 * POST /api/webhook — Receive incoming WhatsApp webhook events.
 * Parses payload, stores messages, logs metadata, returns 200.
 */
export async function POST(request: NextRequest) {
  const appSecret = process.env.META_APP_SECRET;
  const rawBody = await request.text();
  const signature = request.headers.get("x-hub-signature-256");

  if (appSecret && signature && !verifyWebhookSignature(rawBody, signature, appSecret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: WhatsAppWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WhatsAppWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (payload.object !== "whatsapp_business_account") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const supabase = createServiceClient();
  const entries = payload.entry ?? [];

  for (const entry of entries) {
    const changes = entry.changes ?? [];
    for (const change of changes) {
      const value = change.value;
      const field = change.field;
      const payloadSummary = `entry=${entry.id} field=${field} phone_number_id=${value.metadata?.phone_number_id ?? "?"}`;

      try {
        await logWebhook(supabase, {
          eventType: field,
          payloadSummary,
          processed: false,
        });

        if (field === "messages" && value.messages) {
          const phoneNumberId = value.metadata?.phone_number_id ?? null;
          const contacts = value.contacts;

          for (const msg of value.messages) {
            const parsed = parseIncomingMessage(msg);
            if (!parsed) continue;

            const name = getContactName(contacts) ?? null;
            const lead = await getOrCreateLead(supabase, parsed.waId, name);

            await insertMessage(supabase, {
              lead_id: lead.id,
              direction: "inbound",
              wa_message_id: parsed.waMessageId,
              message_type: parsed.messageType,
              content: parsed.text,
              raw_payload: parsed.raw as unknown as Record<string, unknown>,
              phone_number_id: phoneNumberId,
            });
          }
        }

        await logWebhook(supabase, {
          eventType: field,
          payloadSummary,
          processed: true,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        await logWebhook(supabase, {
          eventType: field,
          payloadSummary,
          processed: false,
          errorMessage: message,
        });
        // Still return 200 so Meta doesn't retry indefinitely; we've logged the error
      }
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
