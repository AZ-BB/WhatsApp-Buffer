import type { Message } from "@/types/database";

export function MessagesList({ messages }: { messages: Message[] }) {
  if (messages.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-zinc-500">
        No messages yet. Send one below.
      </div>
    );
  }

  return (
    <div className="max-h-[400px] overflow-y-auto p-4 space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
              msg.direction === "outbound"
                ? "bg-green-600 text-white"
                : "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100"
            }`}
          >
            <p className="whitespace-pre-wrap break-words">
              {msg.content || `[${msg.message_type}]`}
            </p>
            <p
              className={`mt-1 text-xs ${
                msg.direction === "outbound"
                  ? "text-green-100"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {new Date(msg.created_at).toLocaleString()}
              {msg.direction === "outbound" ? " · Sent" : ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
