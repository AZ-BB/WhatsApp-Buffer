import { createServiceClient } from "@/lib/supabase/server";
import { getLeadById } from "@/lib/db/leads";
import { getMessagesByLeadId } from "@/lib/db/messages";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadStatusSelect } from "./lead-status-select";
import { SendMessageForm } from "./send-message-form";
import { MessagesList } from "./messages-list";

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  interested: "Interested",
  not_interested: "Not interested",
  unresponsive: "Unresponsive",
  converted: "Converted",
  invalid: "Invalid",
};

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServiceClient();
  const lead = await getLeadById(supabase, id);
  if (!lead) notFound();

  const messages = await getMessagesByLeadId(supabase, id, { limit: 200 });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/dashboard"
          className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← Leads
        </Link>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {lead.name || lead.phone}
          </h1>
          {lead.name && (
            <p className="text-sm text-zinc-500">{lead.phone}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-500">Status:</span>
          <LeadStatusSelect
            leadId={lead.id}
            currentStatus={lead.status}
            options={STATUS_LABELS}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Conversation
              </h2>
            </div>
            <MessagesList messages={messages} />
            <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
              <SendMessageForm leadId={lead.id} to={lead.phone} />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Contact
            </h3>
            <p className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
              {lead.phone}
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Status
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {STATUS_LABELS[lead.status] ?? lead.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
