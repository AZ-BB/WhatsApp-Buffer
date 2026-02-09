import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendTextMessage, WhatsAppAPIError, normalizePhone } from "@/lib/whatsapp/service";
import { getOrCreateLead } from "@/lib/db/leads";
import { insertMessage } from "@/lib/db/messages";
import type { SendMessageRequestBody } from "@/types/whatsapp";

/**
 * POST /api/send-message
 * Body: { "to": "phone_number", "text": "message" }
 * Calls WhatsApp Cloud API, stores outgoing message, returns success JSON.
 */
export async function POST(request: NextRequest) {
  try {
    let body: SendMessageRequestBody;
    try {
      body = (await request.json()) as SendMessageRequestBody;
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { to, text } = body;
    if (!to || typeof to !== "string" || !text || typeof text !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid 'to' or 'text'" },
        { status: 400 }
      );
    }

    const trimmedText = text.slice(0, 4096);
    const supabase = createServiceClient();

    const response = await sendTextMessage(to, trimmedText);

    const messageId = response.messages?.[0]?.id ?? null;
    const recipientId = response.contacts?.[0]?.wa_id ?? normalizePhone(to);

    const lead = await getOrCreateLead(supabase, recipientId, null);
    await insertMessage(supabase, {
      lead_id: lead.id,
      direction: "outbound",
      wa_message_id: messageId,
      message_type: "text",
      content: trimmedText,
      raw_payload: response as unknown as Record<string, unknown>,
      phone_number_id: process.env.WHATSAPP_PHONE_NUMBER_ID ?? null,
    });

    return NextResponse.json({
      success: true,
      message_id: messageId,
      to: recipientId,
    });
  } catch (e) {
    if (e instanceof WhatsAppAPIError) {
      const status = e.statusCode && e.statusCode >= 400 && e.statusCode < 600
        ? e.statusCode
        : 502;
      return NextResponse.json(
        {
          success: false,
          error: e.message,
          code: e.code,
        },
        { status }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: e instanceof Error ? e.message : "Send message failed",
      },
      { status: 500 }
    );
  }
}
