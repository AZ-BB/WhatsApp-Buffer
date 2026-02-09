import type { SupabaseClient } from "@supabase/supabase-js";

export async function logWebhook(
  supabase: SupabaseClient,
  params: {
    eventType: string;
    payloadSummary: string | null;
    processed: boolean;
    errorMessage?: string | null;
  }
): Promise<void> {
  await supabase.from("webhook_logs").insert({
    event_type: params.eventType,
    payload_summary: params.payloadSummary,
    processed: params.processed,
    error_message: params.errorMessage ?? null,
  });
}
