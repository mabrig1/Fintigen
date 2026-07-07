import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your FINTIGEN Academy student account.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 p-8 shadow-sm dark:border-slate-800">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-xl font-bold text-white">
            F
          </span>
          <h1 className="mt-4 text-2xl font-bold">Welcome Back</h1>
          <p className="mt-1 text-sm text-slate-500">
            Log in to continue learning
          </p>
        </div>
        <form className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            type="password"
            placeholder="Password"
            aria-label="Password"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900"
          />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-brand-600" />
              Remember me
            </label>
            <a
              href="#"
              className="font-semibold text-brand-600 dark:text-brand-400"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          New to FINTIGEN Academy?{" "}
          <Link
            href="/register"
            className="font-semibold text-brand-600 dark:text-brand-400"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
