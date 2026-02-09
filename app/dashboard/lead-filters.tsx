"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  { value: "", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "interested", label: "Interested" },
  { value: "not_interested", label: "Not interested" },
  { value: "unresponsive", label: "Unresponsive" },
  { value: "converted", label: "Converted" },
  { value: "invalid", label: "Invalid" },
];

export function LeadFilters({ currentStatus }: { currentStatus?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onChange(value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set("status", value);
    else next.delete("status");
    router.push(`/dashboard?${next.toString()}`);
  }

  return (
    <select
      value={currentStatus ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
    >
      {OPTIONS.map((o) => (
        <option key={o.value || "all"} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
