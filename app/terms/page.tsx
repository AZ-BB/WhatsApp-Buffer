import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service for WhatsApp CRM Gateway",
};

export default function TermsPage() {
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
              href="/privacy"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Privacy Policy
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
          Terms of Service
        </h1>
        <p className="mb-8 text-sm text-zinc-500">
          Last updated: {new Date().toLocaleDateString("en-US")}
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-700 dark:text-zinc-300">
          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the WhatsApp CRM Gateway service (&quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              2. Description of Service
            </h2>
            <p>
              The Service provides a messaging gateway that integrates with the WhatsApp Cloud API to receive and send WhatsApp messages, and a CRM to manage leads and conversations. The Service is provided &quot;as is&quot; and we do not guarantee uninterrupted or error-free operation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              3. Compliance with Meta and WhatsApp Policies
            </h2>
            <p>
              You are responsible for complying with Meta&apos;s and WhatsApp&apos;s terms, policies, and guidelines, including the WhatsApp Business Policy and Commerce Policy. You must not use the Service for spam, harassment, or any prohibited content. We may suspend or terminate access if we believe you have violated these or applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              4. Your Data and Account
            </h2>
            <p>
              You are responsible for the accuracy of data you provide and for keeping your credentials secure. You must not share access with unauthorized parties. We process data as described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, the Service and its providers shall not be liable for any indirect, incidental, special, or consequential damages, or for loss of data or business opportunities. Our total liability shall not exceed the amount you paid for the Service in the twelve months preceding the claim, if any.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              6. Changes
            </h2>
            <p>
              We may update these Terms from time to time. We will post the updated Terms on this page and update the &quot;Last updated&quot; date. Continued use of the Service after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              7. Contact
            </h2>
            <p>
              For questions about these Terms, please contact us through the contact information provided in the application or on the website.
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
