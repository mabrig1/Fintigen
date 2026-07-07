import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enroll Now",
  description:
    "Create your free FINTIGEN Academy account and start learning today.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 p-8 shadow-sm dark:border-slate-800">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-xl font-bold text-white">
            F
          </span>
          <h1 className="mt-4 text-2xl font-bold">Create Your Free Account</h1>
          <p className="mt-1 text-sm text-slate-500">
            Join 5,000+ students building their tech careers
          </p>
        </div>
        <form className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Full name"
            aria-label="Full name"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            type="password"
            placeholder="Create a password"
            aria-label="Create a password"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            type="text"
            placeholder="Referral code (optional)"
            aria-label="Referral code (optional)"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Enroll Now — It&apos;s Free
          </button>
          <p className="text-center text-xs text-slate-500">
            By signing up you agree to our terms of service and privacy policy.
          </p>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand-600 dark:text-brand-400"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
