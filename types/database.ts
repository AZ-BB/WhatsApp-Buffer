export type LeadStatus =
  | "new"
  | "contacted"
  | "interested"
  | "not_interested"
  | "unresponsive"
  | "converted"
  | "invalid";

export interface Lead {
  id: string;
  phone: string;
  name: string | null;
  status: LeadStatus;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  lead_id: string;
  direction: "inbound" | "outbound";
  wa_message_id: string | null;
  message_type: string;
  content: string | null;
  raw_payload: Record<string, unknown> | null;
  phone_number_id: string | null;
  created_at: string;
}

export interface WebhookLog {
  id: string;
  event_type: string;
  payload_summary: string | null;
  processed: boolean;
  error_message: string | null;
  created_at: string;
}
