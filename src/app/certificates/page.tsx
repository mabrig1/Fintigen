import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "FINTIGEN Academy verified certificates — sample certificates, the verification process, and the employer verification portal.",
};

const verificationSteps = [
  {
    step: "1",
    title: "Complete Your Course",
    text: "Finish all lessons, assignments, and pass the final assessment with at least 70%.",
  },
  {
    step: "2",
    title: "Receive Your Certificate",
    text: "Your certificate is issued instantly with a unique verification ID and QR code.",
  },
  {
    step: "3",
    title: "Share Anywhere",
    text: "Add it to LinkedIn, your CV, or portfolio. Anyone can verify it in seconds.",
  },
];

export default function CertificatesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Certification"
        title="Certificates Employers Can Trust"
        description="Every FINTIGEN Academy certificate carries a unique ID and QR code that can be verified instantly online."
      />

      {/* Sample certificate */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold">Sample Certificate</h2>
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border-4 border-double border-brand-600 bg-white p-8 text-center shadow-xl sm:p-12 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-600 text-xl font-bold text-white">
            F
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-slate-500">
            FINTIGEN Academy
          </p>
          <h3 className="mt-2 text-2xl font-bold text-brand-700 dark:text-brand-300">
            Certificate of Completion
          </h3>
          <p className="mt-6 text-sm text-slate-500">This certifies that</p>
          <p className="mt-1 text-2xl font-semibold italic">Ada Obi</p>
          <p className="mt-4 text-sm text-slate-500">
            has successfully completed the course
          </p>
          <p className="mt-1 text-lg font-semibold">Web Development</p>
          <div className="mt-8 flex items-end justify-between text-left text-xs text-slate-500">
            <div>
              <p className="font-semibold">Verification ID</p>
              <p>FTG-2026-08421</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Issued</p>
              <p>July 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Verification process */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold">
            How Certificate Verification Works
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {verificationSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer verification portal */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-slate-200 p-8 dark:border-slate-800">
          <h2 className="text-2xl font-bold">Employer Verification Portal</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Hiring? Enter a candidate&apos;s certificate verification ID to
            confirm its authenticity instantly.
          </p>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="e.g. FTG-2026-08421"
              aria-label="Certificate verification ID"
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              Verify Certificate
            </button>
          </form>
          <p className="mt-4 text-sm text-slate-500">
            Need bulk verification for your organization?{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand-600 dark:text-brand-400"
            >
              Contact our team
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
