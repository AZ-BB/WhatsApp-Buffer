"use client";

import { useState } from "react";

const STATUSES = [
  "new",
  "contacted",
  "interested",
  "not_interested",
  "unresponsive",
  "converted",
  "invalid",
] as const;

export function LeadStatusSelect({
  leadId,
  currentStatus,
  options,
}: {
  leadId: string;
  currentStatus: string;
  options: Record<string, string>;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function handleChange(value: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: value }),
      });
      if (res.ok) setStatus(value);
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={loading}
      className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {options[s] ?? s}
        </option>
      ))}
    </select>
  );
}
