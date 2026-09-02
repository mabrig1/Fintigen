"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getAuthSession } from "@/lib/auth-client";
import {
  businessRules,
  dailyOperatingProcedure,
  knowledgeBaseReviewedOn,
  officialSources,
  servicePlaybooks,
  startupChecklist,
  suggestedServicePricing,
} from "@/lib/ict-knowledge-base";

export default function IctKnowledgeBasePortal() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const session = getAuthSession();
    setAuthorized(Boolean(session?.token && session?.user?.role === "admin"));
  }, []);

  const filteredPlaybooks = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return servicePlaybooks;
    return servicePlaybooks.filter((item) =>
      [item.title, item.summary, ...item.whatWeSell, ...item.intake, ...item.workflow]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  if (authorized === null) {
    return <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Checking administrator access…</main>;
  }

  if (!authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
          <div className="text-4xl">🔐</div>
          <h1 className="mt-4 text-2xl font-black">Admin knowledge base</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">Sign in through the Fintigen Admin Portal to open the ICT business operating manual.</p>
          <Link href="/admin" className="mt-6 inline-block rounded-xl bg-emerald-500 px-6 py-3 font-black text-slate-950">Open Admin Login</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Fintigen · MABRIG Technologies</p>
              <h1 className="mt-3 text-4xl font-black sm:text-5xl">ICT Business Knowledge Base</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">A practical operating manual for running NYSC, NIN/NIMC, CAC, Remita and related ICT assistance services safely, professionally and profitably.</p>
              <p className="mt-3 text-xs font-semibold text-slate-500">Official-source review: {knowledgeBaseReviewedOn}. Always verify live official information before quoting a statutory fee or promising a process.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/admin/ict-business" className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-bold hover:bg-slate-900">← ICT Operations</Link>
              <Link href="/ict-services" className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-black text-slate-950">Public ICT Website</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-xl font-black text-amber-950">Golden rule: sell assistance, not government authority</h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-amber-900">Your revenue comes from professional ICT assistance, document preparation, convenience, case management and follow-up. Government/statutory money belongs to the authority or biller and must be shown separately.</p>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Before opening the desk</p>
            <h2 className="mt-2 text-2xl font-black">Startup Checklist</h2>
            <ol className="mt-5 space-y-3">
              {startupChecklist.map((item, index) => (
                <li key={item} className="flex gap-3 text-sm leading-6"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">{index + 1}</span><span>{item}</span></li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Non-negotiable</p>
            <h2 className="mt-2 text-2xl font-black">Business & Compliance Rules</h2>
            <ul className="mt-5 space-y-3">
              {businessRules.map((rule) => <li key={rule} className="flex gap-3 text-sm leading-6"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500"/><span>{rule}</span></li>)}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Standard operating procedure</p>
              <h2 className="mt-2 text-2xl font-black">The 10-Step Customer Workflow</h2>
            </div>
            <p className="max-w-xl text-sm text-slate-500">Use this flow for every service so no customer payment, document, query or official reference is lost.</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {dailyOperatingProcedure.map((item) => (
              <div key={item.step} className="rounded-2xl bg-slate-50 p-4">
                <h3 className="font-black">{item.step}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Internal guide</p>
            <h2 className="mt-2 text-2xl font-black">Suggested Fintigen Service-Fee Bands</h2>
            <p className="mt-2 text-sm text-slate-500">These are business guidance, not government fees. Adjust for location, complexity, urgency and staff time.</p>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500"><th className="py-3 pr-4">Service</th><th className="py-3 pr-4">Suggested service fee</th><th className="py-3">Rule</th></tr></thead>
              <tbody>{suggestedServicePricing.map((item) => <tr key={item.service} className="border-b border-slate-100"><td className="py-4 pr-4 font-bold">{item.service}</td><td className="py-4 pr-4 font-black text-emerald-700">{item.range}</td><td className="py-4 text-slate-600">{item.note}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Service manuals</p>
              <h2 className="mt-2 text-3xl font-black">NYSC · NIN · CAC · Remita</h2>
            </div>
            <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 lg:max-w-sm" placeholder="Search the knowledge base…" />
          </div>

          <div className="mt-6 space-y-6">
            {filteredPlaybooks.map((playbook) => (
              <article key={playbook.code} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-slate-950 p-6 text-white">
                  <h3 className="text-2xl font-black">{playbook.title}</h3>
                  <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-300">{playbook.summary}</p>
                </div>
                <div className="grid gap-6 p-6 xl:grid-cols-2">
                  <KbList title="What Fintigen sells" items={playbook.whatWeSell} />
                  <KbList title="Customer intake" items={playbook.intake} />
                  <KbList title="Step-by-step workflow" items={playbook.workflow} numbered />
                  <KbList title="Never do this" items={playbook.neverDo} danger />
                </div>
                <div className="border-t border-slate-200 bg-slate-50 p-6">
                  <h4 className="font-black">Close the case when</h4>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">{playbook.closeCaseWhen.map((item) => <li key={item}>✓ {item}</li>)}</ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {playbook.officialLinks.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold hover:border-emerald-500 hover:text-emerald-700">Official: {source.label} ↗</a>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-slate-950 p-6 text-white">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-400">Official-source library</p>
          <h2 className="mt-2 text-2xl font-black">Open the authority before you quote</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {officialSources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-800 bg-slate-900 p-4 hover:border-emerald-500"><p className="font-bold">{source.label}</p><p className="mt-1 text-xs text-slate-500">{source.owner}</p></a>)}
          </div>
        </section>
      </div>
    </main>
  );
}

function KbList({ title, items, numbered = false, danger = false }: { title: string; items: string[]; numbered?: boolean; danger?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 ${danger ? "bg-rose-50" : "bg-slate-50"}`}>
      <h4 className={`font-black ${danger ? "text-rose-900" : "text-slate-950"}`}>{title}</h4>
      <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item, index) => <li key={item} className="flex gap-2"><span className={`font-black ${danger ? "text-rose-600" : "text-emerald-700"}`}>{numbered ? `${index + 1}.` : danger ? "×" : "✓"}</span><span>{item}</span></li>)}
      </ol>
    </div>
  );
}
