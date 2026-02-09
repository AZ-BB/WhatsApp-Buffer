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
          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              1. Introduction
            </h2>
            <p>
              This Privacy Policy describes how we collect, use, and protect information in connection with the WhatsApp CRM Gateway service. By using the Service, you agree to the practices described here.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              2. Information We Process
            </h2>
            <p>
              The Service processes data necessary to operate the messaging gateway and CRM, including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Phone numbers and contact names of persons who communicate via WhatsApp</li>
              <li>Message content (text and metadata) sent and received through the integration</li>
              <li>Lead status and notes you set in the CRM</li>
              <li>Webhook and API request logs for operation and debugging</li>
            </ul>
            <p>
              This data is received from the WhatsApp Cloud API (Meta) when messages are sent or received, and is stored in our database to provide the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              3. How We Use Information
            </h2>
            <p>
              We use the information to deliver the Service (receiving and sending messages, storing conversations, and displaying the CRM), to maintain security and prevent abuse, and to improve the Service. We do not sell personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              4. Third-Party Services
            </h2>
            <p>
              The Service integrates with Meta&apos;s WhatsApp Cloud API and may use other third-party services (e.g. hosting and databases). Data is processed in accordance with their respective privacy and data processing terms. Meta&apos;s policies apply to WhatsApp data; we encourage you to review Meta&apos;s Privacy Policy and WhatsApp&apos;s relevant documentation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              5. Data Retention and Security
            </h2>
            <p>
              We retain data for as long as needed to provide the Service and as required by law. We implement reasonable technical and organizational measures to protect data against unauthorized access, loss, or alteration.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              6. Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of your personal data. To exercise these rights or ask questions about our practices, please contact us using the contact information provided in the application.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              7. Changes
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will post the updated policy on this page and update the &quot;Last updated&quot; date. Continued use of the Service after changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              8. Contact
            </h2>
            <p>
              For privacy-related questions or requests, please contact us through the contact information provided in the application or on the website.
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
