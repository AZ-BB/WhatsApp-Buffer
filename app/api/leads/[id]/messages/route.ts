import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getMessagesByLeadId } from "@/lib/db/messages";

/**
 * GET /api/leads/[id]/messages?limit=100
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const limit = Math.min(Number(request.nextUrl.searchParams.get("limit")) || 100, 200);
    const supabase = createServiceClient();
    const messages = await getMessagesByLeadId(supabase, id, { limit });
    return NextResponse.json({ messages });
  } catch (e) {
    console.error("GET /api/leads/[id]/messages", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
