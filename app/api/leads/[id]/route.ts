import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getLeadById } from "@/lib/db/leads";

/**
 * GET /api/leads/[id]
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createServiceClient();
    const lead = await getLeadById(supabase, id);
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    return NextResponse.json(lead);
  } catch (e) {
    console.error("GET /api/leads/[id]", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch lead" },
      { status: 500 }
    );
  }
}
