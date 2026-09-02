"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { clearAuthSession, getAuthSession } from "@/lib/auth-client";

type Service = { code: string; name: string; category: string; description: string; defaultChecklist: string[] };
type ServiceCase = {
  _id: string; case_number: string; service_name: string; service_code: string;
  customer_name: string; phone: string; email?: string; state?: string; channel: string;
  status: string; payment_status: string; service_fee: number; government_fee: number;
  amount_paid: number; total_fee?: number; external_reference?: string; notes?: string; created_at?: string;
};
type Metrics = { totalCases: number; openCases: number; completedCases: number; paidCases: number; serviceFees: number; governmentFees: number; amountPaid: number };
type Envelope<T> = { data?: T; error?: string; message?: string };

const EMPTY_METRICS: Metrics = { totalCases: 0, openCases: 0, completedCases: 0, paidCases: 0, serviceFees: 0, governmentFees: 0, amountPaid: 0 };
const STATUS_OPTIONS = ["new", "documents_pending", "ready", "submitted", "processing", "query", "completed", "cancelled"];
const PAYMENT_OPTIONS = ["unpaid", "part_paid", "paid", "refunded"];
const CHANNELS = ["walk_in", "whatsapp", "phone", "online", "referral", "other"];

function money(value: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value || 0);
}
function label(value: string) { return value.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()); }
function tone(value: string) {
  if (["paid", "completed"].includes(value)) return "bg-emerald-100 text-emerald-800";
  if (["query", "cancelled", "refunded"].includes(value)) return "bg-rose-100 text-rose-800";
  if (["part_paid", "submitted", "processing"].includes(value)) return "bg-amber-100 text-amber-800";
  return "bg-slate-100 text-slate-700";
}

export default function IctBusinessPortalV2() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [token, setToken] = useState("");
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [cases, setCases] = useState<ServiceCase[]>([]);
  const [metrics, setMetrics] = useState<Metrics>(EMPTY_METRICS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    customerName: "", phone: "", email: "", state: "Enugu", serviceCode: "nysc-assistance",
    channel: "walk_in", serviceFee: "", governmentFee: "", amountPaid: "", externalReference: "", notes: "",
  });

  useEffect(() => {
    const session = getAuthSession();
    if (session?.user?.role === "admin" && session.token) {
      setToken(session.token);
      setAuthorized(true);
    } else setAuthorized(false);
  }, []);

  async function api<T>(path: string, init: RequestInit = {}) {
    if (!apiBase || !token) throw new Error("Admin API session is unavailable.");
    const response = await fetch(`${apiBase}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...(init.headers || {}) },
      cache: "no-store",
    });
    const payload = (await response.json().catch(() => ({}))) as Envelope<T>;
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) { clearAuthSession(); setAuthorized(false); }
      throw new Error(payload.error || payload.message || `Request failed (${response.status}).`);
    }
    if (!payload.data) throw new Error("The server returned an empty response.");
    return payload.data;
  }

  async function loadCatalog() {
    const data = await api<{ services: Service[] }>("/ict-services/catalog");
    setServices(data.services || []);
  }

  async function loadCases(filters?: { search?: string; status?: string; service?: string }) {
    const params = new URLSearchParams({ limit: "200" });
    if (filters?.search?.trim()) params.set("search", filters.search.trim());
    if (filters?.status) params.set("status", filters.status);
    if (filters?.service) params.set("service", filters.service);
    const data = await api<{ cases: ServiceCase[]; metrics: Metrics }>(`/ict-services/cases?${params.toString()}`);
    setCases(data.cases || []);
    setMetrics(data.metrics || EMPTY_METRICS);
  }

  useEffect(() => {
    if (!authorized || !token) return;
    setBusy(true);
    Promise.all([loadCatalog(), loadCases()])
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load ICT business data."))
      .finally(() => setBusy(false));
    // Initial admin load only. Filters are applied explicitly by the operator.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized, token]);

  const selectedService = useMemo(() => services.find((item) => item.code === form.serviceCode), [services, form.serviceCode]);
  const enteredTotal = Number(form.serviceFee || 0) + Number(form.governmentFee || 0);
  const enteredBalance = Math.max(enteredTotal - Number(form.amountPaid || 0), 0);

  async function createCase(event: FormEvent) {
    event.preventDefault();
    setBusy(true); setNotice(""); setError("");
    try {
      const data = await api<{ case: ServiceCase }>("/ict-services/cases", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          serviceFee: Number(form.serviceFee || 0), governmentFee: Number(form.governmentFee || 0), amountPaid: Number(form.amountPaid || 0),
          documentChecklist: selectedService?.defaultChecklist || [],
        }),
      });
      setNotice(`Created ${data.case.case_number} for ${data.case.customer_name}.`);
      setForm((current) => ({ customerName: "", phone: "", email: "", state: current.state, serviceCode: current.serviceCode, channel: "walk_in", serviceFee: "", governmentFee: "", amountPaid: "", externalReference: "", notes: "" }));
      await loadCases({ search, status: statusFilter, service: serviceFilter });
    } catch (err) { setError(err instanceof Error ? err.message : "Could not create case."); }
    finally { setBusy(false); }
  }

  async function patchCase(id: string, changes: Record<string, unknown>) {
    setBusy(true); setNotice(""); setError("");
    try {
      const data = await api<{ case: ServiceCase }>(`/ict-services/cases/${id}`, { method: "PATCH", body: JSON.stringify(changes) });
      setNotice(`${data.case.case_number} updated.`);
      await loadCases({ search, status: statusFilter, service: serviceFilter });
    } catch (err) { setError(err instanceof Error ? err.message : "Could not update case."); }
    finally { setBusy(false); }
  }

  async function applyFilters() {
    setBusy(true); setError("");
    try { await loadCases({ search, status: statusFilter, service: serviceFilter }); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not filter cases."); }
    finally { setBusy(false); }
  }

  if (authorized === null) return <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Checking administrator access…</main>;
  if (!authorized) return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
        <div className="text-4xl">🔐</div><h1 className="mt-4 text-2xl font-black">Admin access required</h1>
        <p className="mt-3 text-slate-400">Sign in through Fintigen Admin before opening ICT Business Services.</p>
        <Link href="/admin" className="mt-6 inline-block rounded-xl bg-emerald-500 px-6 py-3 font-black text-slate-950">Open Admin</Link>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-emerald-400">Fintigen Admin · MABRIG Technologies</p><h1 className="mt-2 text-3xl font-black">Nigeria ICT Business Portal</h1><p className="mt-2 text-sm text-slate-400">NYSC, NIN/NIMC, CAC business registration and other legitimate ICT support services.</p></div>
          <div className="flex gap-2"><Link href="/admin" className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-bold">← Admin</Link><a href="https://wa.me/2347065342818" target="_blank" rel="noreferrer" className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-black text-slate-950">WhatsApp</a></div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:py-8">
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <Metric title="Cases" value={metrics.totalCases} /><Metric title="Open" value={metrics.openCases} /><Metric title="Completed" value={metrics.completedCases} /><Metric title="Paid" value={metrics.paidCases} /><Metric title="Service fees" value={money(metrics.serviceFees)} /><Metric title="Received" value={money(metrics.amountPaid)} />
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
          <strong>Compliance:</strong> NIN enrolment itself is free; charge only for clearly disclosed ICT/assistance services. Never request customer passwords, OTPs or PINs. NYSC biometric capture must be done by the applicant. CAC registrations must be submitted through official CAC systems. Keep your service fee separate from statutory/government fees.
          <div className="mt-2 flex flex-wrap gap-3 font-bold"><a className="underline" href="https://nimc.gov.ng/" target="_blank" rel="noreferrer">NIMC</a><a className="underline" href="https://www.nysc.gov.ng/" target="_blank" rel="noreferrer">NYSC</a><a className="underline" href="https://www.cac.gov.ng/" target="_blank" rel="noreferrer">CAC</a></div>
        </section>

        {notice && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">{notice}</div>}
        {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-800">{error}</div>}

        <section className="grid gap-6 xl:grid-cols-[.85fr_1.15fr]">
          <form onSubmit={createCase} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Customer intake</p><h2 className="mt-1 text-2xl font-black">Register Service</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input label="Customer name *"><input required className="field" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} /></Input>
              <Input label="Phone / WhatsApp *"><input required className="field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Input>
              <Input label="Email"><input type="email" className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Input>
              <Input label="State / location"><input className="field" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} /></Input>
            </div>
            <Input label="Service *" className="mt-4"><select required className="field" value={form.serviceCode} onChange={(e) => setForm({ ...form, serviceCode: e.target.value })}>{services.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}</select></Input>
            {selectedService && <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm"><p className="font-black">{selectedService.category}</p><p className="mt-1 text-slate-600">{selectedService.description}</p><ul className="mt-2 list-disc pl-5 text-xs text-slate-500">{selectedService.defaultChecklist.map((x) => <li key={x}>{x}</li>)}</ul></div>}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input label="Channel"><select className="field" value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })}>{CHANNELS.map((x) => <option key={x} value={x}>{label(x)}</option>)}</select></Input>
              <Input label="Official reference"><input className="field" value={form.externalReference} onChange={(e) => setForm({ ...form, externalReference: e.target.value })} placeholder="Optional" /></Input>
              <Input label="Service fee (₦)"><input type="number" min="0" className="field" value={form.serviceFee} onChange={(e) => setForm({ ...form, serviceFee: e.target.value })} /></Input>
              <Input label="Govt/statutory fee (₦)"><input type="number" min="0" className="field" value={form.governmentFee} onChange={(e) => setForm({ ...form, governmentFee: e.target.value })} /></Input>
              <Input label="Amount paid (₦)"><input type="number" min="0" className="field" value={form.amountPaid} onChange={(e) => setForm({ ...form, amountPaid: e.target.value })} /></Input>
              <div className="rounded-xl bg-slate-950 p-4 text-white"><p className="text-xs text-slate-400">Total / Balance</p><p className="mt-1 text-xl font-black">{money(enteredTotal)}</p><p className="text-sm text-amber-300">Balance {money(enteredBalance)}</p></div>
            </div>
            <Input label="Notes" className="mt-4"><textarea rows={4} className="field resize-y" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Never paste passwords, OTPs, PINs or unnecessary identity numbers." /></Input>
            <button disabled={busy || !services.length} className="mt-5 w-full rounded-xl bg-emerald-600 px-5 py-3.5 font-black text-white disabled:opacity-50">{busy ? "Working…" : "Create Service Case"}</button>
          </form>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Case management</p><h2 className="mt-1 text-2xl font-black">Operations Queue</h2></div><button onClick={() => void applyFilters()} disabled={busy} className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white">Apply</button></div>
              <div className="mt-4 grid gap-3 md:grid-cols-3"><input className="field" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Case, customer, phone…" /><select className="field" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="">All statuses</option>{STATUS_OPTIONS.map((x) => <option key={x} value={x}>{label(x)}</option>)}</select><select className="field" value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}><option value="">All services</option>{services.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}</select></div>
            </div>

            {!busy && !cases.length && <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">No cases found.</div>}
            {cases.map((item) => {
              const total = item.total_fee ?? Number(item.service_fee || 0) + Number(item.government_fee || 0);
              const balance = Math.max(total - Number(item.amount_paid || 0), 0);
              return <article key={item._id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between"><div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">{item.case_number}</span><span className={`rounded-full px-3 py-1 text-xs font-bold ${tone(item.status)}`}>{label(item.status)}</span><span className={`rounded-full px-3 py-1 text-xs font-bold ${tone(item.payment_status)}`}>{label(item.payment_status)}</span></div><h3 className="mt-3 text-lg font-black">{item.service_name}</h3><p className="mt-1 font-semibold">{item.customer_name} · {item.phone}</p><p className="mt-1 text-sm text-slate-500">{item.email || "No email"} · {item.state || "No location"} · {label(item.channel)}</p>{item.external_reference && <p className="mt-2 text-xs font-bold text-slate-500">Official ref: {item.external_reference}</p>}</div><div className="rounded-xl bg-slate-950 p-4 text-white lg:min-w-52"><p className="text-xs text-slate-400">Case value</p><p className="text-xl font-black">{money(total)}</p><p className="mt-2 text-xs">Paid: {money(item.amount_paid)}</p><p className="text-xs text-amber-300">Balance: {money(balance)}</p></div></div>
                {item.notes && <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{item.notes}</p>}
                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4"><select className="field" value={item.status} onChange={(e) => void patchCase(item._id, { status: e.target.value })}>{STATUS_OPTIONS.map((x) => <option key={x} value={x}>{label(x)}</option>)}</select><select className="field" value={item.payment_status} onChange={(e) => void patchCase(item._id, { paymentStatus: e.target.value })}>{PAYMENT_OPTIONS.map((x) => <option key={x} value={x}>{label(x)}</option>)}</select><button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold" onClick={() => { const n = window.prompt("Amount paid to date (NGN)", String(item.amount_paid || 0)); if (n !== null) void patchCase(item._id, { amountPaid: Number(n || 0) }); }}>Update Paid</button><button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold" onClick={() => { const n = window.prompt("Official/application reference", item.external_reference || ""); if (n !== null) void patchCase(item._id, { externalReference: n }); }}>Official Ref</button></div>
              </article>;
            })}
          </div>
        </section>

        <footer className="rounded-2xl bg-slate-950 p-5 text-sm text-slate-400"><p className="font-black text-white">Fintigen.com · Nigeria ICT Business Services</p><p className="mt-1">A subsidiary of MABRIG Technologies · Developed by MABRIG Technologies · MABRIG Korie · WhatsApp 07065342818</p></footer>
      </div>
      <style jsx global>{`.field{width:100%;border:1px solid rgb(203 213 225);border-radius:.75rem;background:white;padding:.7rem .85rem;outline:none}.field:focus{border-color:rgb(16 185 129);box-shadow:0 0 0 3px rgb(16 185 129/.12)}`}</style>
    </main>
  );
}

function Metric({ title, value }: { title: string; value: string | number }) { return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{title}</p><p className="mt-2 text-2xl font-black">{typeof value === "number" ? value.toLocaleString() : value}</p></div>; }
function Input({ label: title, className = "", children }: { label: string; className?: string; children: React.ReactNode }) { return <label className={`block ${className}`}><span className="mb-2 block text-sm font-bold text-slate-700">{title}</span>{children}</label>; }
