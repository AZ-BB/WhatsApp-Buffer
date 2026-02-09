import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getLeads } from "@/lib/db/leads";
import type { LeadStatus } from "@/types/database";

/**
 * GET /api/leads?status=&limit=50&offset=0
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status") as LeadStatus | null;
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);
    const offset = Math.max(0, Number(searchParams.get("offset")) || 0);

    const supabase = createServiceClient();
    const leads = await getLeads(supabase, {
      status: status ?? undefined,
      limit,
      offset,
    });

    return NextResponse.json({ leads });
  } catch (e) {
    console.error("GET /api/leads", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
