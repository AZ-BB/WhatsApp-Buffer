import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for WhatsApp CRM Gateway",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link
            href="/"
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
          >
            WhatsApp CRM
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/terms"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Terms of Service
            </Link>
            <Link
              href="/dashboard"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Privacy Policy
        </h1>
        <p className="mb-8 text-sm text-zinc-500">
          Last updated: {new Date().toLocaleDateString("en-US")}
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-700 dark:text-zinc-300">
          <p>
            WhatsApp CRM (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you interact with our WhatsApp messaging system.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Information We Collect
            </h2>
            <p>
              We collect messages sent through WhatsApp, phone numbers, timestamps, and metadata required to provide customer support and CRM services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              How We Use Information
            </h2>
            <p>We use collected data to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>respond to customer inquiries</li>
              <li>manage conversations</li>
              <li>improve service quality</li>
              <li>maintain communication records</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Data Storage and Security
            </h2>
            <p>
              Data is stored securely using encrypted infrastructure and access controls. We take reasonable steps to protect information from unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Third-Party Services
            </h2>
            <p>
              We use Meta&apos;s WhatsApp Business Platform to deliver messages. Your information may be processed by Meta in accordance with their policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              User Rights
            </h2>
            <p>
              You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Contact
            </h2>
            <p>
              For privacy concerns:{" "}
              <a
                href="mailto:support@yourdomain.com"
                className="text-green-600 underline hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              >
                support@whats-app-crm-gamma.vercel.app
              </a>
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
