"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function AccountRecoveryPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [email,setEmail]=useState("");
  const [code,setCode]=useState("");
  const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState("");
  const [done,setDone]=useState(false);

  async function submit(e:FormEvent){
    e.preventDefault();
    if(password!==confirm){setMessage("Passwords do not match.");return;}
    setLoading(true);setMessage("");
    try{
      const res=await fetch(`${apiBase}/auth/recovery-code/reset`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email,code,password})
      });
      const data=await res.json().catch(()=>({}));
      if(!res.ok) throw new Error(data.error||data.message||"Recovery failed.");
      setDone(true);setMessage("Password updated. You can now sign in to Fintigen.");
    }catch(err){setMessage(err instanceof Error?err.message:"Recovery failed.");}
    finally{setLoading(false);}
  }

  return <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
    <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
      <p className="text-sm font-bold uppercase tracking-[.25em] text-emerald-400">Fintigen Account Recovery</p>
      <h1 className="mt-3 text-3xl font-black">Use one-time recovery code</h1>
      <p className="mt-3 text-sm text-slate-300">Use the temporary code sent to your account email. It expires and can only be used once.</p>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Account email" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none focus:border-emerald-400"/>
        <input required value={code} onChange={e=>setCode(e.target.value)} placeholder="Recovery code" autoComplete="one-time-code" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 font-mono tracking-wider outline-none focus:border-emerald-400"/>
        <input required minLength={8} maxLength={72} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="New password" autoComplete="new-password" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none focus:border-emerald-400"/>
        <input required minLength={8} maxLength={72} type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm new password" autoComplete="new-password" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none focus:border-emerald-400"/>
        <button disabled={loading||done} className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 disabled:opacity-60">{loading?"Updating…":done?"Password updated":"Recover account"}</button>
      </form>
      {message&&<p className="mt-4 rounded-xl bg-white/10 p-3 text-sm">{message}</p>}
      <Link href="/admin" className="mt-6 inline-block text-sm text-emerald-400 hover:underline">Back to admin sign in</Link>
    </div>
  </main>;
}
