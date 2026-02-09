import type { Message } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface InsertMessageInput {
  lead_id: string;
  direction: "inbound" | "outbound";
  wa_message_id?: string | null;
  message_type: string;
  content: string | null;
  raw_payload?: Record<string, unknown> | null;
  phone_number_id?: string | null;
}

export async function insertMessage(
  supabase: SupabaseClient,
  input: InsertMessageInput
): Promise<Message> {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      lead_id: input.lead_id,
      direction: input.direction,
      wa_message_id: input.wa_message_id ?? null,
      message_type: input.message_type,
      content: input.content,
      raw_payload: input.raw_payload ?? null,
      phone_number_id: input.phone_number_id ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Message;
}

export async function getMessagesByLeadId(
  supabase: SupabaseClient,
  leadId: string,
  options?: { limit?: number }
): Promise<Message[]> {
  let q = supabase
    .from("messages")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: true });

  if (options?.limit) q = q.limit(options.limit);

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Message[];
}
