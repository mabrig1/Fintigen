"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { clearAuthSession, getAuthSession } from "@/lib/auth-client";

type Service = {
  code: string;
  name: string;
  category: string;
  description: string;
  defaultChecklist: string[];
};

type ServiceCase = {
  _id: string;
  case_number: string;
  service_code: string;
  service_name: string;
  customer_name: string;
  phone: string;
  email?: string;
  state?: string;
  channel: string;
  status: string;
  payment_status: string;
  service_fee: number;
  government_fee: number;
  amount_paid: number;
  total_fee?: number;
  external_reference?: string;
  document_checklist?: string[];
  notes?: string;
  created_at?: string;
  updated_at?: string;
};

type Metrics = {
  totalCases: number;
  openCases: number;
  completedCases: number;
  paidCases: number;
  serviceFees: number;
  governmentFees: number;
  amountPaid: number;
};

type ApiEnvelope<T> = {
  status?: string;
  data?: T;
  error?: string;
  message?: string;
};

const initialForm = {
  customerName: "",
  phone: "",
  email: "",
  state: "Enugu",
  serviceCode: "nysc-assistance",
  channel: "walk_in",
  serviceFee: "",
  governmentFee: "",
  amountPaid: "",
  externalReference: "",
  notes: "",
};

const caseStatuses = [
  ["new", "New"],
  ["documents_pending", "Documents Pending"],
  ["ready", "Ready to Submit"],
  ["submitted", "Submitted"],
  ["processing", "Processing"],
  ["query", "Query / Action Needed"],
  ["completed", "Completed"],
  ["cancelled", "Cancelled"],
] as const;

const paymentStatuses = [
  ["unpaid", "Unpaid"],
  ["part_paid", "Part Paid"],
  ["paid", "Paid"],
  ["refunded", "Refunded"],
] as const;

function money(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function dateLabel(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function statusTone(status: string) {
  if (status === "completed" || status === "paid") return "bg-emerald-100 text-emerald-800";
  if (status === "query" || status === "cancelled" || status === "refunded") return "bg-rose-100 text-rose-800";
  if (status === "submitted" || status === "processing" || status === "part_paid") return "bg-amber-100 text-amber-800";
  return "bg-slate-100 text-slate-700";
}

export default function IctBusinessPortal() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [token, setToken] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [cases, setCases] = useState<ServiceCase[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    totalCases: 0,
    openCases: 0,
    completedCases: 0,
    paidCases: 0,
    serviceFees: 0,
    governmentFees: 0,
    amountPaid: 0,
  });
  const [form, setForm] = useState(initialForm);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [actionId, setActionId] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const session = getAuthSession();
    if (session?.user?.role === "admin" && session.token) {
      setToken(session.token);
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  const request = useCallback(async <T,>(path: string, init: RequestInit = {}) => {
    if (!apiBase || !token) throw new Error("Admin API session is unavailable.");
    const response = await fetch(`${apiBase}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(init.headers || {}),
      },
      cache: "no-store",
    });
    const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        clearAuthSession();
        setAuthorized(false);
      }
      throw new Error(payload.error || payload.message || `Request failed (${response.status}).`);
    }
    if (!payload.data) throw new Error("The server returned an empty response.");
    return payload.data;
  }, [apiBase, token]);

  const load = useCallback(async () => {
    if (!authorized || !token) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (statusFilter) params.set("status", statusFilter);
      if (serviceFilter) params.set("service", serviceFilter);
      params.set("limit", "200");

      const [catalogData, caseData] = await Promise.all([
        request<{ services: Service[] }>("/ict-services/catalog"),
        request<{ cases: ServiceCase[]; metrics: Metrics }>(`/ict-services/cases?${params.toString()}`),
      ]);
      setServices(catalogData.services || []);
      setCases(caseData.cases || []);
      setMetrics(caseData.metrics || metrics);
      if (!form.serviceCode && catalogData.services?.[0]?.code) {
        setForm((current) => ({ ...current, serviceCode: catalogData.services[0].code }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load ICT business records.");
    } finally {
      setLoading(false);
    }
  }, [authorized, token, search, statusFilter, serviceFilter, request, form.serviceCode, metrics]);

  useEffect(() => {
    if (authorized) void load();
  }, [authorized, load]);

  const selectedService = useMemo(
    () => services.find((service) => service.code === form.serviceCode),
    [services, form.serviceCode],
  );

  const totalEntered = Number(form.serviceFee || 0) + Number(form.governmentFee || 0);
  const balanceEntered = Math.max(totalEntered - Number(form.amountPaid || 0), 0);

  async function createCase(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setNotice("");
    setError("");
    try {
      const data = await request<{ case: ServiceCase }>("/ict-services/cases", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          serviceFee: Number(form.serviceFee || 0),
          governmentFee: Number(form.governmentFee || 0),
          amountPaid: Number(form.amountPaid || 0),
          documentChecklist: selectedService?.defaultChecklist || [],
        }),
      });
      setNotice(`Case ${data.case.case_number} created for ${data.case.customer_name}.`);
      setForm((current) => ({ ...initialForm, serviceCode: current.serviceCode, state: current.state }));
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create ICT service case.");
    } finally {
      setSubmitting(false);
    }
  }

  async function updateCase(id: string, changes: Record<string, unknown>) {
    setActionId(id);
    setNotice("");
    setError("");
    try {
      const data = await request<{ case: ServiceCase }>(`/ict-services/cases/${id}`, {
        method: "PATCH",
        body: JSON.stringify(changes),
      });
      setCases((current) => current.map((item) => (item._id === id ? { ...item, ...data.case } : item)));
      setNotice(`${data.case.case_number} updated.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update ICT case.");
    } finally {
      setActionId("");
    }
  }

  if (authorized === null) {
    return <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Checking admin access…</main>;
  }

  if (!authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
          <div className="text-4xl">🔐</div>
          <h1 className="mt-4 text-2xl font-black">Administrator access required</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">Sign in through the Fintigen Admin Portal before opening ICT Business Services.</p>
          <Link href="/admin" className="mt-6 inline-block rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950">Open Admin Login</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">Fintigen Admin · MABRIG Technologies</p>
            <h1 className="mt-2 text-3xl font-black">Nigeria ICT Business Services</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-400">Register customers, manage service requests, fees, submissions, queries and completed cases from one operations desk.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin" className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-bold hover:bg-slate-900">← Admin Dashboard</Link>
            <a href="https://wa.me/2347065342818" target="_blank" rel="noreferrer" className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-black text-slate-950">WhatsApp Desk</a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:py-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <Metric label="Total cases" value={metrics.totalCases} />
          <Metric label="Open cases" value={metrics.openCases} />
          <Metric label="Completed" value={metrics.completedCases} />
          <Metric label="Paid cases" value={metrics.paidCases} />
          <Metric label="Service fees" value={money(metrics.serviceFees)} />
          <Metric label="Amount received" value={money(metrics.amountPaid)} />
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          <h2 className="font-black">Compliance & customer-protection rules</h2>
          <div className="mt-2 grid gap-2 lg:grid-cols-3">
            <p><strong>NIN/NIMC:</strong> NIN enrolment itself is free. Do not present Fintigen as NIMC and do not store customer passwords or unnecessary full NIN details.</p>
            <p><strong>NYSC:</strong> You may assist with forms, scanning, printing and portal navigation, but biometric capture must be done by the applicant.</p>
            <p><strong>CAC:</strong> Business/company registration submissions must go through the official CAC Company Registration Portal. Record your service fee separately from statutory/government fees.</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 font-bold">
            <a href="https://nimc.gov.ng/" target="_blank" rel="noreferrer" className="underline">NIMC official site</a>
            <a href="https://www.nysc.gov.ng/" target="_blank" rel="noreferrer" className="underline">NYSC official site</a>
            <a href="https://www.cac.gov.ng/" target="_blank" rel="noreferrer" className="underline">CAC official site</a>
          </div>
        </section>

        {notice && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{notice}</div>}
        {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">{error}</div>}

        <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <form onSubmit={createCase} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">New customer case</p>
                <h2 className="mt-1 text-2xl font-black">Register a Service</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">Nigeria · NGN</span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Customer full name" required>
                <input required value={form.customerName} onChange={(event) => setForm({ ...form, customerName: event.target.value })} className="input" placeholder="Customer name" />
              </Field>
              <Field label="Phone / WhatsApp" required>
                <input required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="input" placeholder="080..." />
              </Field>
              <Field label="Email">
                <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="input" placeholder="Optional" />
              </Field>
              <Field label="State / location">
                <input value={form.state} onChange={(event) => setForm({ ...form, state: event.target.value })} className="input" placeholder="Enugu" />
              </Field>
            </div>

            <Field label="Service" required className="mt-4">
              <select required value={form.serviceCode} onChange={(event) => setForm({ ...form, serviceCode: event.target.value })} className="input">
                {services.map((service) => <option key={service.code} value={service.code}>{service.name}</option>)}
              </select>
            </Field>

            {selectedService && (
              <div className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm">
                <p className="font-bold text-slate-900">{selectedService.category}</p>
                <p className="mt-1 leading-6 text-slate-600">{selectedService.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedService.defaultChecklist.map((item) => <span key={item} className="rounded-full bg-white px-3 py-1 text-xs text-slate-600 ring-1 ring-slate-200">{item}</span>)}
                </div>
              </div>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Channel">
                <select value={form.channel} onChange={(event) => setForm({ ...form, channel: event.target.value })} className="input">
                  <option value="walk_in">Walk-in</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="phone">Phone</option>
                  <option value="online">Online</option>
                  <option value="referral">Referral</option>
                  <option value="other">Other</option>
                </select>
              </Field>
              <Field label="Official/application reference">
                <input value={form.externalReference} onChange={(event) => setForm({ ...form, externalReference: event.target.value })} className="input" placeholder="Optional" />
              </Field>
              <Field label="Your service fee (₦)">
                <input type="number" min="0" value={form.serviceFee} onChange={(event) => setForm({ ...form, serviceFee: event.target.value })} className="input" placeholder="0" />
              </Field>
              <Field label="Government/statutory fee (₦)">
                <input type="number" min="0" value={form.governmentFee} onChange={(event) => setForm({ ...form, governmentFee: event.target.value })} className="input" placeholder="0" />
              </Field>
              <Field label="Amount paid now (₦)">
                <input type="number" min="0" value={form.amountPaid} onChange={(event) => setForm({ ...form, amountPaid: event.target.value })} className="input" placeholder="0" />
              </Field>
              <div className="rounded-2xl bg-slate-950 p-4 text-white">
                <p className="text-xs uppercase tracking-wide text-slate-400">Total / Balance</p>
                <p className="mt-1 text-xl font-black">{money(totalEntered)}</p>
                <p className="mt-1 text-sm text-amber-300">Balance: {money(balanceEntered)}</p>
              </div>
            </div>

            <Field label="Notes / customer instruction" className="mt-4">
              <textarea rows={4} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="input resize-y" placeholder="Do not paste passwords, OTPs, PINs or unnecessary identity numbers here." />
            </Field>

            <button disabled={submitting || !services.length} className="mt-5 w-full rounded-xl bg-emerald-600 px-5 py-3.5 font-black text-white transition hover:bg-emerald-700 disabled:opacity-50">
              {submitting ? "Creating case…" : "Create ICT Service Case"}
            </button>
          </form>

          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Operations queue</p>
                  <h2 className="mt-1 text-2xl font-black">Service Cases</h2>
                </div>
                <button onClick={() => void load()} disabled={loading} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold hover:bg-slate-50 disabled:opacity-50">{loading ? "Refreshing…" : "Refresh"}</button>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <input value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void load(); }} className="input" placeholder="Search case, name, phone…" />
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="input">
                  <option value="">All statuses</option>
                  {caseStatuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
                <select value={serviceFilter} onChange={(event) => setServiceFilter(event.target.value)} className="input">
                  <option value="">All services</option>
                  {services.map((service) => <option key={service.code} value={service.code}>{service.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {!loading && !cases.length && <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">No service cases match the current filters.</div>}
              {cases.map((item) => {
                const total = Number(item.total_fee ?? item.service_fee + item.government_fee);
                const balance = Math.max(total - Number(item.amount_paid || 0), 0);
                return (
                  <article key={item._id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">{item.case_number}</span>
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusTone(item.status)}`}>{item.status.replaceAll("_", " ")}</span>
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusTone(item.payment_status)}`}>{item.payment_status.replaceAll("_", " ")}</span>
                        </div>
                        <h3 className="mt-3 text-lg font-black">{item.service_name}</h3>
                        <p className="mt-1 font-semibold">{item.customer_name} · {item.phone}</p>
                        <p className="mt-1 text-sm text-slate-500">{item.email || "No email"} · {item.state || "Location not set"} · {item.channel.replaceAll("_", " ")}</p>
                        <p className="mt-2 text-xs text-slate-400">Opened {dateLabel(item.created_at)}{item.external_reference ? ` · Official ref: ${item.external_reference}` : ""}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-950 p-4 text-white lg:min-w-56">
                        <p className="text-xs text-slate-400">Total case value</p>
                        <p className="mt-1 text-xl font-black">{money(total)}</p>
                        <div className="mt-3 flex justify-between text-xs"><span className="text-slate-400">Paid</span><span>{money(item.amount_paid)}</span></div>
                        <div className="mt-1 flex justify-between text-xs"><span className="text-slate-400">Balance</span><span className={balance > 0 ? "text-amber-300" : "text-emerald-300"}>{money(balance)}</span></div>
                      </div>
                    </div>

                    {item.notes && <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">{item.notes}</div>}

                    <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                      <select disabled={actionId === item._id} value={item.status} onChange={(event) => void updateCase(item._id, { status: event.target.value })} className="input text-sm">
                        {caseStatuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                      </select>
                      <select disabled={actionId === item._id} value={item.payment_status} onChange={(event) => void updateCase(item._id, { paymentStatus: event.target.value })} className="input text-sm">
                        {paymentStatuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                      </select>
                      <button disabled={actionId === item._id} onClick={() => {
                        const next = window.prompt("Amount paid to date (NGN)", String(item.amount_paid || 0));
                        if (next !== null) void updateCase(item._id, { amountPaid: Number(next || 0) });
                      }} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold hover:bg-slate-50 disabled:opacity-50">Update payment</button>
                      <button disabled={actionId === item._id} onClick={() => {
                        const next = window.prompt("Official/external reference", item.external_reference || "");
                        if (next !== null) void updateCase(item._id, { externalReference: next });
                      }} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold hover:bg-slate-50 disabled:opacity-50">Official reference</button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="rounded-2xl bg-slate-950 p-5 text-sm text-slate-400 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-white">Fintigen.com · Nigeria ICT Business Services</p>
            <p className="mt-1">A subsidiary of MABRIG Technologies · Developed by MABRIG Technologies · MABRIG Korie</p>
          </div>
          <p className="mt-3 sm:mt-0">WhatsApp: 07065342818</p>
        </footer>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(203 213 225);
          background: white;
          padding: 0.7rem 0.85rem;
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }
        .input:focus {
          border-color: rgb(16 185 129);
          box-shadow: 0 0 0 3px rgb(16 185 129 / 0.12);
        }
      `}</style>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black">{typeof value === "number" ? value.toLocaleString() : value}</p>
    </div>
  );
}

function Field({ label, required, className = "", children }: { label: string; required?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-bold text-slate-700">{label}{required ? " *" : ""}</span>
      {children}
    </label>
  );
}
