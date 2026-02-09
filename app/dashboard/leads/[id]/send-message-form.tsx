"use client";

import { useState } from "react";

export function SendMessageForm({ leadId, to }: { leadId: string; to: string }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, text: text.trim() }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (data.success) {
        setText("");
        setSuccess(true);
        setTimeout(() => window.location.reload(), 800);
      } else {
        setError(data.error ?? "Failed to send");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        rows={3}
        maxLength={4096}
        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        disabled={loading}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {success && (
        <p className="text-sm text-green-600 dark:text-green-400">Sent.</p>
      )}
      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="self-end rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Sending…" : "Send via WhatsApp"}
      </button>
    </form>
  );
}
