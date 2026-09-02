"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const COURSE_ID = "mabrig-full-stack-founder-pro";

function cleanCode(value: string | null) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 64);
}

export default function FlagshipCheckoutPage() {
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
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!apiBase || loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${apiBase}/payments/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: COURSE_ID,
          email: email.trim(),
          referralCode: referralCode || undefined,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.authorizationUrl) throw new Error(data.error || data.message || "Unable to start payment.");
      window.location.href = data.authorizationUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start payment.");
      setLoading(false);
    }
  }

  return <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
      <section>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">FINTIGEN Flagship Program</span>
        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Mabrig Full-Stack Founder Pro</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">Build, deploy, secure and monetize a real full-stack application with a practical 12-week founder-engineer pathway.</p>
        <div className="mt-8 rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
          <h2 className="text-xl font-bold">What your one-time payment includes</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            <li>✓ Full 12-week implementation pathway</li>
            <li>✓ Premium founder toolkit and reusable templates</li>
            <li>✓ Practical labs, quizzes and capstone milestones</li>
            <li>✓ Verifiable completion certificate</li>
            <li>✓ Lifetime course access</li>
          </ul>
        </div>
      </section>

      <aside className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">Nigeria price</p>
        <p className="mt-3 text-5xl font-black">₦100,000</p>
        <p className="mt-2 text-sm text-slate-400">One payment • secure Paystack checkout</p>
        {referralCode && <div className="mt-5 rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">Promoter code applied: <strong>{referralCode}</strong></div>}
        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block text-sm font-semibold">Email for payment receipt<input type="email" required value={email} onChange={event => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none" placeholder="you@example.com" /></label>
          {error && <div className="rounded-xl border border-rose-300/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</div>}
          <button disabled={loading || !apiBase} className="w-full rounded-xl bg-amber-400 px-5 py-3.5 font-black text-slate-950 hover:bg-amber-300 disabled:opacity-60">{loading ? "Opening secure checkout…" : "Pay ₦100,000 & Enroll"}</button>
        </form>
        <p className="mt-5 text-xs leading-5 text-slate-400">Commission is credited only after Paystack confirms a successful payment. A referral click or free registration does not count as a paid sale.</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm"><Link href="/courses/mabrig-full-stack-founder-pro" className="text-emerald-300 hover:underline">Course details</Link><Link href="/contact" className="text-emerald-300 hover:underline">International / admissions enquiry</Link></div>
      </aside>
    </div>
  </main>;
}
