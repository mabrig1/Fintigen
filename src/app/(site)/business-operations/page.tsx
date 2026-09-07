"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const services = [
  { title: "Business Operations Agent", description: "Create a guided action plan for registration, banking, payments, domains and international expansion.", action: "Launch Agent", href: "/business-operations/agent" },
  { title: "CAC Business Registration", description: "Guided business-name and company registration workflow: name check, document checklist, filing, payment and certificate/status tracking.", action: "Open CAC Portal", href: "https://icrp.cac.gov.ng/" },
  { title: "Domain & Digital Presence", description: "Move from a registered business to a credible online presence with domain search, DNS, website and professional email readiness.", action: "Open Agent", href: "/business-operations/agent" },
  { title: "NIN Readiness & Identity Guide", description: "A privacy-first checklist showing where identity information may be required. FINTIGEN does not collect or store your NIN here.", action: "View NIMC", href: "https://nimc.gov.ng/" },
  { title: "Remita Payments", description: "Guidance for government and institutional payments through Remita, including payment-reference preparation and receipt checklist.", action: "Open Remita", href: "https://www.remita.net/" },
  { title: "National & International Accounts", description: "Prepare documents for Nigerian corporate accounts and eligible international or multi-currency providers.", action: "Prepare with Agent", href: "/business-operations/agent" },
];

const prefixes = ["Prime", "Nova", "Apex", "Noble", "Bright", "Ever", "True", "Grand"];
const suffixes = ["Ventures", "Solutions", "Enterprises", "Global", "Services", "Hub", "Works", "Partners"];

export default function BusinessOperationsPage() {
  const [idea, setIdea] = useState("");
  const [seed, setSeed] = useState(0);
  const names = useMemo(() => {
    const cleaned = idea.trim().replace(/[^a-zA-Z0-9 ]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).join(" ");
    if (!cleaned) return [];
    return Array.from({ length: 6 }, (_, i) => `${prefixes[(i + seed) % prefixes.length]} ${cleaned} ${suffixes[(i * 3 + seed) % suffixes.length]}`);
  }, [idea, seed]);

  return <main>
    <section className="bg-slate-950 px-4 py-16 text-white sm:px-6"><div className="mx-auto max-w-7xl"><span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">FINTIGEN Business Operations</span><h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">Start, formalise and scale a Nigerian business.</h1><p className="mt-5 max-w-3xl text-lg text-slate-300">A dedicated business-services system, separate from FINTIGEN Academy digital-skills learning and testing.</p><Link href="/business-operations/agent" className="mt-7 inline-flex rounded-xl bg-emerald-500 px-5 py-3 font-bold text-slate-950">Launch Business Operations Agent →</Link></div></section>
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map(service => <article key={service.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h2 className="text-xl font-bold">{service.title}</h2><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{service.description}</p>{service.href.startsWith("/") ? <Link href={service.href} className="mt-5 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">{service.action}</Link> : <a href={service.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">{service.action}</a>}</article>)}</div></section>
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6"><div className="rounded-3xl border border-slate-200 p-6 sm:p-8 dark:border-slate-800"><p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Business Name Engine</p><h2 className="mt-2 text-3xl font-bold">Generate ideas, then verify with CAC</h2><p className="mt-3 text-slate-600 dark:text-slate-300">Suggestions are creative ideas only. CAC must confirm availability and approval.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><input value={idea} onChange={e => setIdea(e.target.value)} placeholder="e.g. agricultural technology" className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-slate-700"/><button onClick={() => setSeed(v => v + 1)} className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white">Generate Names</button></div>{names.length > 0 && <div className="mt-6 grid gap-3 sm:grid-cols-2">{names.map(name => <div key={name} className="rounded-xl bg-slate-50 p-4 font-semibold dark:bg-slate-800">{name}</div>)}</div>}<div className="mt-6 flex flex-wrap gap-4"><a href="https://icrp.cac.gov.ng/" target="_blank" rel="noreferrer" className="text-sm font-semibold text-brand-600">Verify with CAC →</a><Link href="/business-operations/agent" className="text-sm font-semibold text-brand-600">Continue with Business Agent →</Link></div></div></section>
    <section className="mx-auto max-w-5xl px-4 pb-16"><div className="rounded-3xl bg-brand-50 p-7 dark:bg-brand-950/30"><h2 className="text-3xl font-bold">Nigeria → Global Business Stack</h2><p className="mt-3 text-slate-600 dark:text-slate-300">Registration → identity/compliance → banking → payments → domain → website/email → market entry → cross-border operations.</p><Link href="/business-operations/agent" className="mt-6 inline-flex rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white">Build My Roadmap</Link></div></section>
    <section className="border-t border-slate-200 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-800">FINTIGEN orchestrates guidance and integrations. Government registration, banking, identity, payment and domain transactions are completed only when the relevant authorised provider confirms them.</section>
  </main>;
}
