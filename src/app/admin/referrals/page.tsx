"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getAuthSession, clearAuthSession } from "@/lib/auth-client";

type Referral = {
  id?: string;
  referrer?: { name?: string; email?: string };
  customer?: { name?: string; email?: string };
  paymentReference?: string;
  amount?: number;
  currency?: string;
  commission?: number;
  status?: string;
  createdAt?: string;
};

type Summary = {
  totalReferrers?: number;
  paidReferrals?: number;
  pendingCommission?: number;
  availableCommission?: number;
  totalCommission?: number;
};

const RATE = 15;

function money(value=0,currency="NGN"){try{return new Intl.NumberFormat("en-NG",{style:"currency",currency,maximumFractionDigits:0}).format(value)}catch{return currency+" "+value.toLocaleString()}}

export default function AdminReferralsPage(){
  const apiBase=process.env.NEXT_PUBLIC_API_URL||"";
  const [rows,setRows]=useState<Referral[]>([]);
  const [summary,setSummary]=useState<Summary>({});
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  useEffect(()=>{
    const session=getAuthSession();
    if(!session?.token||session.user?.role!=="admin"){setError("Administrator sign-in is required. Open /admin first.");setLoading(false);return}
    (async()=>{
      try{
        const res=await fetch(apiBase+"/admin/referrals?limit=100",{headers:{Authorization:"Bearer "+session.token}});
        const payload=await res.json().catch(()=>({}));
        if(res.status===401||res.status===403){clearAuthSession();throw new Error("Your administrator session expired. Sign in again.")}
        if(!res.ok) throw new Error(payload.error||payload.message||"Referral API is not available yet.");
        const data=payload.data||payload;
        setRows(data.referrals||[]);
        setSummary(data.summary||{});
      }catch(e){setError(e instanceof Error?e.message:"Could not load referral data.")}
      finally{setLoading(false)}
    })();
  },[apiBase]);

  const computed=useMemo(()=>rows.reduce((s,r)=>s+(r.commission??((r.amount||0)*RATE/100)),0),[rows]);

  return <main className="min-h-screen bg-slate-100 text-slate-900">
    <header className="border-b border-slate-200 bg-slate-950 px-4 py-5 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-400">Fintigen Admin</p><h1 className="mt-1 text-2xl font-black">Referral & Commission Center</h1></div>
        <div className="flex gap-2"><Link href="/admin" className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-bold">← Admin Dashboard</Link><Link href="/pricing" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-black text-slate-950">Public offer</Link></div>
      </div>
    </header>
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-bold text-emerald-900">Commission policy</p>
        <p className="mt-1 text-sm text-emerald-800">Referrers earn <strong>{RATE}%</strong> of each eligible successful client payment. Refunded or reversed payments must not create withdrawable commission.</p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Card label="Commission rate" value={RATE+"%"} />
        <Card label="Referrers" value={summary.totalReferrers||0} />
        <Card label="Paid referrals" value={summary.paidReferrals||0} />
        <Card label="Pending" value={money(summary.pendingCommission||0)} />
        <Card label="Total commission" value={money(summary.totalCommission??computed)} />
      </section>
      {error&&<div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900"><strong>Backend connection:</strong> {error}<p className="mt-2">The dashboard UI is installed. The API must expose <code>/admin/referrals</code> before live referral records can appear.</p></div>}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5"><h2 className="font-black">Referral transactions</h2><p className="mt-1 text-sm text-slate-500">Referrer → customer → payment → 15% commission audit trail.</p></div>
        <div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Referrer</th><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Payment</th><th className="px-5 py-3">Commission</th><th className="px-5 py-3">Status</th></tr></thead>
        <tbody className="divide-y divide-slate-100">{rows.map((r,i)=><tr key={r.id||i}><td className="px-5 py-4"><b>{r.referrer?.name||"—"}</b><div className="text-xs text-slate-500">{r.referrer?.email}</div></td><td className="px-5 py-4">{r.customer?.name||r.customer?.email||"—"}</td><td className="px-5 py-4">{money(r.amount||0,r.currency||"NGN")}<div className="text-xs text-slate-500">{r.paymentReference}</div></td><td className="px-5 py-4 font-black text-emerald-700">{money(r.commission??((r.amount||0)*RATE/100),r.currency||"NGN")}</td><td className="px-5 py-4"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold">{r.status||"pending"}</span></td></tr>)}</tbody></table>
        {!rows.length&&!loading&&<p className="p-6 text-sm text-slate-500">No referral transactions available yet.</p>}{loading&&<p className="p-6 text-sm text-slate-500">Loading referral records…</p>}</div>
      </section>
    </div>
  </main>
}
function Card({label,value}:{label:string;value:string|number}){return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></div>}
