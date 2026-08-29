"use client";

import { useMemo, useState } from "react";

const services = [
  {
    title: "CAC Business Registration",
    description: "Guided business-name and company registration workflow: name check, document checklist, filing, payment and certificate/status tracking.",
    action: "Open CAC Portal",
    href: "https://icrp.cac.gov.ng/",
  },
  {
    title: "NIN Readiness & Identity Guide",
    description: "A privacy-first checklist showing where NIN may be required for Nigerian business and financial onboarding. FINTIGEN does not collect or store your NIN here.",
    action: "View NIMC",
    href: "https://nimc.gov.ng/",
  },
  {
    title: "Remita Payments",
    description: "Guidance for government and institutional payments through Remita, including payment-reference preparation and receipt checklist.",
    action: "Open Remita",
    href: "https://www.remita.net/",
  },
  {
    title: "National Business Accounts",
    description: "Prepare the documents commonly requested for Nigerian corporate accounts: CAC documents, identification, address, tax/compliance records and business profile.",
    action: "Prepare Checklist",
    href: "#account-checklist",
  },
  {
    title: "International Business Accounts",
    description: "Get your business ready for compliant international payments and multi-currency account applications. Provider availability and eligibility vary by country and business type.",
    action: "See Global Readiness",
    href: "#global-readiness",
  },
  {
    title: "Nigeria → Global Scale Engine",
    description: "A practical expansion path covering market selection, export readiness, contracts, international payments, digital presence, compliance and cross-border operations.",
    action: "Build Expansion Plan",
    href: "#global-readiness",
  },
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

  return (
    <main>
      <section className="bg-slate-950 px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">FINTIGEN Business Operations</span>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">Start, formalise and scale a Nigerian business.</h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">A dedicated business-services hub, separate from FINTIGEN Academy digital-skills learning and testing.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-bold">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{service.description}</p>
              <a href={service.href} target={service.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="mt-5 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{service.action}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-slate-200 p-6 sm:p-8 dark:border-slate-800">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Business Name Engine</p>
          <h2 className="mt-2 text-3xl font-bold">Generate ideas, then verify with CAC</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Enter what your business does. Suggestions are creative ideas only; availability and approval must be confirmed on the official CAC portal.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="e.g. agricultural technology" className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-brand-600 dark:border-slate-700" />
            <button onClick={() => setSeed((v) => v + 1)} className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white">Generate Names</button>
          </div>
          {names.length > 0 && <div className="mt-6 grid gap-3 sm:grid-cols-2">{names.map((name) => <div key={name} className="rounded-xl bg-slate-50 p-4 font-semibold dark:bg-slate-800">{name}</div>)}</div>}
          <a href="https://icrp.cac.gov.ng/" target="_blank" rel="noreferrer" className="mt-6 inline-block text-sm font-semibold text-brand-600">Verify name on official CAC portal →</a>
        </div>
      </section>

      <section id="account-checklist" className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="text-3xl font-bold">Business account readiness</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-900"><h3 className="font-bold">Nigeria</h3><p className="mt-2 text-slate-600 dark:text-slate-300">Prepare CAC certificate/status documents, owners/directors identification, business address, contact details, tax/compliance information and a clear description of business activity. Confirm exact requirements with your chosen regulated bank or provider.</p></div>
          <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-900"><h3 className="font-bold">International</h3><p className="mt-2 text-slate-600 dark:text-slate-300">Prepare incorporation records, beneficial-owner information, proof of address, website/business evidence, expected transaction profile, source-of-funds information and target currencies. Eligibility differs across providers and jurisdictions.</p></div>
        </div>
      </section>

      <section id="global-readiness" className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6">
        <div className="rounded-3xl bg-brand-50 p-7 dark:bg-brand-950/30">
          <h2 className="text-3xl font-bold">Nigeria → International Scale Roadmap</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {["Formalise CAC registration and compliance", "Build bankable records and bookkeeping", "Choose one exportable product or service", "Validate one target international market", "Set up compliant cross-border payment capability", "Prepare contracts, invoices and data/privacy terms", "Build a credible website and international sales funnel", "Track revenue, tax, FX and operational risk"].map((step, i) => <li key={step} className="rounded-xl bg-white p-4 dark:bg-slate-900"><span className="mr-2 font-bold text-brand-600">{i + 1}.</span>{step}</li>)}
          </ol>
        </div>
      </section>

      <section className="border-t border-slate-200 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-800 sm:px-6">FINTIGEN provides guidance and workflow tools, not government registration, identity issuance, banking or legal/tax approval. Official applications remain with the relevant government agency, bank or regulated provider.</section>
    </main>
  );
}
