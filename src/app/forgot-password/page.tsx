"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setMessage("");
    try {
      const res = await fetch(`${apiBase}/auth/forgot-password`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({email}) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || data.message || "Password recovery email could not be sent.");
      setMessage("If this email is registered, password reset instructions have been sent.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "We could not submit the request. Please try again.");
    }
    finally { setLoading(false); }
  }
  return <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
    <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
      <p className="text-sm font-bold uppercase tracking-[.25em] text-emerald-400">Fintigen Security</p>
      <h1 className="mt-3 text-3xl font-black">Forgot password?</h1>
      <p className="mt-3 text-sm text-slate-300">Enter your account email. If it exists, we will send a secure 15-minute reset link.</p>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none focus:border-emerald-400" />
        <button disabled={loading} className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 disabled:opacity-60">{loading?"Sending…":"Send reset link"}</button>
      </form>
      {message && <p className="mt-4 rounded-xl bg-white/10 p-3 text-sm">{message}</p>}
      <Link href="/admin" className="mt-6 inline-block text-sm text-emerald-400 hover:underline">Back to sign in</Link>
    </div>
  </main>;
}
