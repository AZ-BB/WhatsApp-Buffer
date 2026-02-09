import type { Lead, LeadStatus } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getOrCreateLead(
  supabase: SupabaseClient,
  phone: string,
  name: string | null
): Promise<Lead> {
  const normalized = phone.replace(/\D/g, "");
  const { data: existing } = await supabase
    .from("leads")
    .select("*")
    .eq("phone", normalized)
    .single();

  if (existing) {
    if (name && name !== existing.name) {
      const { data: updated } = await supabase
        .from("leads")
        .update({ name, updated_at: new Date().toISOString() })
        .eq("id", existing.id)
        .select()
        .single();
      return updated as Lead;
    }
    return existing as Lead;
  }

  const { data: inserted, error } = await supabase
    .from("leads")
    .insert({
      phone: normalized,
      name: name ?? null,
      status: "new",
    })
    .select()
    .single();

  if (error) throw error;
  return inserted as Lead;
}

export async function getLeads(
  supabase: SupabaseClient,
  options?: { status?: LeadStatus; limit?: number; offset?: number }
): Promise<Lead[]> {
  let q = supabase
    .from("leads")
    .select("*")
    .order("updated_at", { ascending: false });

  if (options?.status) q = q.eq("status", options.status);
  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;
  q = q.range(offset, offset + limit - 1);

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Lead[];
}

export async function updateLeadStatus(
  supabase: SupabaseClient,
  leadId: string,
  status: LeadStatus
): Promise<Lead> {
  const { data, error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", leadId)
    .select()
    .single();

  if (error) throw error;
  return data as Lead;
}

export async function getLeadById(
  supabase: SupabaseClient,
  leadId: string
): Promise<Lead | null> {
  const { data, error } = await supabase.from("leads").select("*").eq("id", leadId).single();
  if (error && error.code !== "PGRST116") throw error;
  return data as Lead | null;
}
