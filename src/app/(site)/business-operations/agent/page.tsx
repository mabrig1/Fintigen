"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Stage = { title: string; detail: string; status: "ready" | "action" | "external" };

const workflows: Record<string, Stage[]> = {
  launch: [
    { title: "Business profile", detail: "Define activity, ownership, location and target customers.", status: "action" },
    { title: "CAC readiness", detail: "Prepare proposed names and the documents required for the selected entity type.", status: "external" },
    { title: "Tax & payments", detail: "Prepare tax, invoicing and regulated payment onboarding requirements.", status: "ready" },
    { title: "Domain & email", detail: "Check a matching domain and prepare professional business email.", status: "ready" },
  ],
  formalise: [
    { title: "CAC registration", detail: "Name reservation, filing checklist and application tracking.", status: "external" },
    { title: "Identity readiness", detail: "Prepare required identity information without storing NIN in this workspace.", status: "ready" },
    { title: "Business banking", detail: "Generate a corporate-account document checklist.", status: "ready" },
    { title: "Records", detail: "Set up invoices, receipts, bookkeeping and compliance reminders.", status: "ready" },
  ],
  global: [
    { title: "Exportability test", detail: "Assess whether the product or service can serve customers outside Nigeria.", status: "action" },
    { title: "International presence", detail: "Domain, website, professional email, policies and sales materials.", status: "ready" },
    { title: "Cross-border payments", detail: "Prepare provider-specific KYC and business evidence.", status: "external" },
    { title: "Market entry", detail: "Choose target country, channel, pricing, contracts and operational controls.", status: "action" },
  ],
};

export default function BusinessOperationsAgentPage() {
  const [business, setBusiness] = useState("");
  const [goal, setGoal] = useState("launch");
  const [domain, setDomain] = useState("");
  const stages = workflows[goal];
  const domainSuggestion = useMemo(() => {
    const seed = (domain || business).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 40);
    return seed ? `${seed}.com` : "";
  }, [domain, business]);

  return <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <Link href="/business-operations" className="text-sm font-semibold text-brand-600">← Business Operations</Link>
    <div className="mt-5 rounded-3xl bg-slate-950 p-7 text-white sm:p-10">
      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">FINTIGEN Business Operations Agent</span>
      <h1 className="mt-4 text-4xl font-bold">From Nigerian idea to operating business.</h1>
      <p className="mt-3 max-w-3xl text-slate-300">Build a guided action plan across registration, payments, banking, domain infrastructure and international expansion. External regulated actions remain with the authorised provider.</p>
    </div>

    <section className="mt-8 grid gap-5 rounded-2xl border border-slate-200 p-6 dark:border-slate-800 md:grid-cols-2">
      <label className="text-sm font-semibold">Business or idea<input value={business} onChange={e => setBusiness(e.target.value)} placeholder="e.g. Korie Agro Technologies" className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700" /></label>
      <label className="text-sm font-semibold">What do you want to achieve?<select value={goal} onChange={e => setGoal(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700"><option value="launch">Launch a new business</option><option value="formalise">Formalise an existing business</option><option value="global">Scale internationally</option></select></label>
    </section>

    <section className="mt-8"><h2 className="text-2xl font-bold">Agent action plan</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{stages.map((stage, i) => <article key={stage.title} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"><div className="flex items-center justify-between"><span className="font-bold text-brand-600">Step {i + 1}</span><span className="rounded-full bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">{stage.status === "external" ? "Official provider" : stage.status === "action" ? "Needs input" : "Ready"}</span></div><h3 className="mt-3 text-lg font-bold">{stage.title}</h3><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{stage.detail}</p></article>)}</div></section>

    <section className="mt-10 grid gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"><p className="text-sm font-bold uppercase tracking-wide text-brand-600">CAC Connector</p><h2 className="mt-2 text-2xl font-bold">Registration gateway</h2><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Designed for an authorised CAC/VAS connector: name availability, application hand-off and status tracking. Until credentials and an approved integration are configured, use the official CAC portal.</p><a href="https://icrp.cac.gov.ng/" target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">Continue with CAC</a></div>
      <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"><p className="text-sm font-bold uppercase tracking-wide text-brand-600">Namecheap Connector</p><h2 className="mt-2 text-2xl font-bold">Domain launch desk</h2><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">The production connector can check domain availability, register domains and manage DNS after server-side API credentials are configured.</p><input value={domain} onChange={e => setDomain(e.target.value)} placeholder="Business or desired domain" className="mt-4 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-slate-700" />{domainSuggestion && <p className="mt-3 rounded-xl bg-slate-50 p-3 font-semibold dark:bg-slate-900">Suggested: {domainSuggestion}</p>}<a href={`https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(domainSuggestion || domain)}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">Check at Namecheap</a></div>
    </section>

    <section className="mt-10 rounded-2xl bg-slate-50 p-6 dark:bg-slate-900"><h2 className="text-2xl font-bold">Connector roadmap</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{["CAC / authorised VAS", "Namecheap domains & DNS", "Remita payments", "Nigerian bank onboarding hand-off", "International payment providers", "Email & notification provider", "Document storage", "Tax/compliance reminders", "Website/deployment hand-off"].map(x => <div key={x} className="rounded-xl bg-white p-4 font-semibold dark:bg-slate-800">{x}</div>)}</div><p className="mt-5 text-sm text-slate-500">Secrets must remain server-side. No CAC, Namecheap, banking or payment transaction is represented as completed until its provider confirms it.</p></section>
  </main>;
}
