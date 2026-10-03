"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { authHeaders, getAuthSession } from "@/lib/auth-client";

const COURSE_ID = "digital-skills-foundation";

function cleanCode(value: string | null) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 64);
}

export default function DigitalSkillsFoundationCheckoutPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const incoming = cleanCode(params.get("ref"));
    const stored = cleanCode(localStorage.getItem("mabrig-referral-code"));
    setReferralCode(incoming || stored);
    const session = getAuthSession();
    setEmail(session?.user?.email || "");
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!apiBase || loading) return;
    const session = getAuthSession();
    if (!session) {
      setError("Sign in to your Fintigen account before starting payment.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiBase}/payments/initialize`, {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          courseId: COURSE_ID,
          referralCode: referralCode || undefined,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.authorizationUrl) {
        throw new Error(data.error || data.message || "Unable to start payment.");
      }
      window.location.href = data.authorizationUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start payment.");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <section>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
            Paid Foundation Programme
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Digital Skills Foundation & Employability Bootcamp
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Build practical digital literacy, productivity, online safety, communication, content creation, responsible AI, portfolio, and employability skills.
          </p>

          <div className="mt-8 rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
            <h2 className="text-xl font-bold">Your one-time enrollment includes</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              <li>✓ Full 8-week Foundation programme</li>
              <li>✓ Practical labs and module quizzes</li>
              <li>✓ Digital portfolio capstone</li>
              <li>✓ Course progress tracking</li>
              <li>✓ Certificate eligibility</li>
              <li>✓ Lifetime course access</li>
            </ul>
          </div>
        </section>

        <aside className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">Foundation price</p>
          <p className="mt-3 text-5xl font-black">₦5,000</p>
          <p className="mt-2 text-sm text-slate-400">One payment • secure Paystack checkout</p>

          {referralCode && (
            <div className="mt-5 rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
              Promoter code applied: <strong>{referralCode}</strong>
            </div>
          )}

          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="block text-sm font-semibold">
              Email for payment receipt
              <input
                type="email"
                required
                value={email}
                readOnly
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none"
                placeholder="you@example.com"
              />
            </label>

            {!email && (
              <Link href={"/login?next=" + encodeURIComponent(window.location.pathname + window.location.search)} className="block rounded-xl border border-amber-300/30 bg-amber-400/10 px-4 py-3 text-center text-sm font-bold text-amber-200">
                Sign in before payment
              </Link>
            )}
            {error && (
              <div className="rounded-xl border border-rose-300/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </div>
            )}

            <button
              disabled={loading || !apiBase || !email}
              className="w-full rounded-xl bg-amber-400 px-5 py-3.5 font-black text-slate-950 hover:bg-amber-300 disabled:opacity-60"
            >
              {loading ? "Opening secure checkout…" : "Pay ₦5,000 & Enroll"}
            </button>
          </form>

          <p className="mt-5 text-xs leading-5 text-slate-400">
            Payment is securely bound to the signed-in FINTIGEN account shown above.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/courses" className="text-emerald-300 hover:underline">View all courses</Link>
            <Link href="/contact" className="text-emerald-300 hover:underline">Admissions support</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
