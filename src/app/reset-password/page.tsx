"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const token = useSearchParams().get("token") || "";
  const [password,setPassword]=useState(""); const [confirm,setConfirm]=useState("");
  const [loading,setLoading]=useState(false); const [message,setMessage]=useState(""); const [done,setDone]=useState(false);
  async function submit(e:FormEvent){e.preventDefault(); if(password!==confirm){setMessage("Passwords do not match.");return;} setLoading(true);setMessage("");
    try{const res=await fetch(`${apiBase}/auth/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token,password})}); const data=await res.json().catch(()=>({})); if(!res.ok) throw new Error(data.error||data.message||"Reset failed."); setDone(true);setMessage("Password updated. You can now sign in.");}
    catch(err){setMessage(err instanceof Error?err.message:"Reset failed.");} finally{setLoading(false);}
  }
  return <main className="min-h-screen bg-slate-950 px-4 py-16 text-white"><div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
    <p className="text-sm font-bold uppercase tracking-[.25em] text-emerald-400">Fintigen Security</p><h1 className="mt-3 text-3xl font-black">Create a new password</h1>
    {!token?<p className="mt-5 rounded-xl bg-red-500/10 p-4 text-sm text-red-200">This reset link is missing its security token. Request a new link.</p>:
    <form onSubmit={submit} className="mt-7 space-y-4"><input required minLength={8} maxLength={72} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="New password" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none focus:border-emerald-400"/><input required minLength={8} maxLength={72} type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm new password" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none focus:border-emerald-400"/><button disabled={loading||done} className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 disabled:opacity-60">{loading?"Updating…":done?"Password updated":"Reset password"}</button></form>}
    {message&&<p className="mt-4 rounded-xl bg-white/10 p-3 text-sm">{message}</p>}<Link href="/admin" className="mt-6 inline-block text-sm text-emerald-400 hover:underline">Go to admin sign in</Link>
  </div></main>;
}
