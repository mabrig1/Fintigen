import Link from "next/link";
import { statusLabels } from "@/lib/business-cases";

const demoCases = [
  { id: "FIN-2026-DEMO01", client: "Demo Client", business: "Sample Agro Ventures", service: "CAC Business Name", status: "documents_checked" as const },
  { id: "FIN-2026-DEMO02", client: "Demo Client", business: "Sample Global Services", service: "Domain & Global Setup", status: "needs_client_action" as const },
];

export default function BusinessOperationsAdminPage() {
  return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <Link href="/business-operations/agent" className="text-sm font-semibold text-brand-600">← Business Operations Agent</Link>
    <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-wide text-brand-600">Admin workspace prototype</p><h1 className="mt-2 text-4xl font-bold">Business Operations Cases</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Operations queue for registration, payments, domains, banking readiness and international expansion.</p></div><Link href="/business-operations/cases" className="rounded-xl bg-brand-600 px-5 py-3 text-center font-semibold text-white">New client case</Link></div>

    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Open cases","2"],["Needs client action","1"],["With provider","0"],["Completed","0"]].map(([label,value])=><div key={label} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>)}</section>

    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"><div className="border-b border-slate-200 p-5 dark:border-slate-800"><h2 className="text-xl font-bold">Operations queue</h2></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 dark:bg-slate-900"><tr>{["Case","Client","Business","Service","Status","Next action"].map(x=><th key={x} className="px-5 py-3">{x}</th>)}</tr></thead><tbody>{demoCases.map(c=><tr key={c.id} className="border-t border-slate-100 dark:border-slate-800"><td className="px-5 py-4 font-semibold">{c.id}</td><td className="px-5 py-4">{c.client}</td><td className="px-5 py-4">{c.business}</td><td className="px-5 py-4">{c.service}</td><td className="px-5 py-4"><span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{statusLabels[c.status]}</span></td><td className="px-5 py-4"><button className="font-semibold text-brand-600">Open case</button></td></tr>)}</tbody></table></div></section>

    <section className="mt-8 rounded-2xl bg-amber-50 p-5 text-sm text-amber-900 dark:bg-amber-950/30 dark:text-amber-200"><strong>Production gate:</strong> this admin screen currently contains demonstration records only. Before accepting clients, add authentication/roles, database persistence, encrypted document storage, audit logs, payment verification, notification adapters and provider webhook/status reconciliation.</section>
  </main>;
}
