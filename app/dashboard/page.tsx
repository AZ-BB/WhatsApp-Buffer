import { createServiceClient } from "@/lib/supabase/server";
import { getLeads } from "@/lib/db/leads";
import Link from "next/link";
import { LeadFilters } from "./lead-filters";

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  interested: "Interested",
  not_interested: "Not interested",
  unresponsive: "Unresponsive",
  converted: "Converted",
  invalid: "Invalid",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const supabase = createServiceClient();
  const leads = await getLeads(supabase, {
    status: params.status as never,
    limit: 100,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Leads
        </h1>
        <LeadFilters currentStatus={params.status} />
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
              <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                Contact
              </th>
              <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                Status
              </th>
              <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                Updated
              </th>
              <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                  No leads yet. Incoming WhatsApp messages will appear here.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-zinc-100 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/30"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/leads/${lead.id}`}
                      className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                    >
                      {lead.name || lead.phone}
                    </Link>
                    {lead.name && (
                      <div className="text-xs text-zinc-500">{lead.phone}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200"
                      title={lead.status}
                    >
                      {STATUS_LABELS[lead.status] ?? lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {new Date(lead.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/leads/${lead.id}`}
                      className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      View & message →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
