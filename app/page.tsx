import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 px-4 dark:bg-zinc-950">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        WhatsApp CRM Gateway
      </h1>
      <p className="max-w-md text-center text-zinc-600 dark:text-zinc-400">
        Receive and send WhatsApp messages. Manage leads and conversations in one place.
      </p>
      <Link
        href="/dashboard"
        className="rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-green-700"
      >
        Open dashboard
      </Link>
      <footer className="mt-12 flex gap-6 text-sm text-zinc-500">
        <Link href="/terms" className="hover:text-zinc-700 dark:hover:text-zinc-300">
          Terms of Service
        </Link>
        <Link href="/privacy" className="hover:text-zinc-700 dark:hover:text-zinc-300">
          Privacy Policy
        </Link>
      </footer>
    </div>
  );
}
