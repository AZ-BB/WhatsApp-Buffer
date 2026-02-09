import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { updateLeadStatus } from "@/lib/db/leads";
import type { LeadStatus } from "@/types/database";

const VALID_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "interested",
  "not_interested",
  "unresponsive",
  "converted",
  "invalid",
];

/**
 * PATCH /api/leads/[id]/status
 * Body: { "status": "not_interested" | "unresponsive" | ... }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const status = body.status as string | undefined;

    if (!status || !VALID_STATUSES.includes(status as LeadStatus)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const lead = await updateLeadStatus(supabase, id, status as LeadStatus);
    return NextResponse.json(lead);
  } catch (e) {
    console.error("PATCH /api/leads/[id]/status", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to update status" },
      { status: 500 }
    );
  }
}
