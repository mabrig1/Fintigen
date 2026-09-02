"use client";

import { FormEvent, useEffect, useState } from "react";

type Service = {
  code: string;
  name: string;
  category: string;
  description: string;
  officialUrl?: string;
  portalUrl?: string;
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
  notes: "",
  consent: false,
};

export default function IctServiceRequestForm() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [caseNumber, setCaseNumber] = useState("");

  useEffect(() => {
    async function loadServices() {
      if (!apiBase) {
        setError("The ICT service API is not configured.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${apiBase}/ict-services/catalog`, { cache: "no-store" });
        const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<{ services: Service[] }>;
        if (!response.ok) throw new Error(payload.error || payload.message || "Could not load ICT services.");
        const nextServices = payload.data?.services || [];
        setServices(nextServices);
        if (nextServices.length && !nextServices.some((item) => item.code === form.serviceCode)) {
          setForm((current) => ({ ...current, serviceCode: nextServices[0].code }));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load ICT services.");
      } finally {
        setLoading(false);
      }
    }
    void loadServices();
  }, [apiBase, form.serviceCode]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!apiBase) return;
    setSubmitting(true);
    setError("");
    setCaseNumber("");
    try {
      const response = await fetch(`${apiBase}/ict-services/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<{ case: { case_number: string; service_name: string } }>;
      if (!response.ok) throw new Error(payload.error || payload.message || "Could not submit your request.");
      const reference = payload.data?.case?.case_number;
      if (!reference) throw new Error("The service request was created without a reference number.");
      setCaseNumber(reference);
      setForm((current) => ({ ...initialForm, state: current.state, serviceCode: current.serviceCode }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit your request.");
    } finally {
      setSubmitting(false);
    }
  }

  if (caseNumber) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 text-emerald-950 shadow-sm">
        <div className="text-4xl">✓</div>
        <h3 className="mt-4 text-2xl font-black">Request received</h3>
        <p className="mt-2 text-sm leading-6">Your Fintigen case reference is:</p>
        <p className="mt-3 rounded-xl bg-slate-950 px-4 py-3 text-center text-xl font-black tracking-wide text-white">{caseNumber}</p>
        <p className="mt-4 text-sm leading-6">Keep this reference. Our ICT desk can use it to find your request. No government application has been submitted merely by creating this Fintigen case.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={`https://wa.me/2347065342818?text=${encodeURIComponent(`Hello Fintigen, I submitted ICT service request ${caseNumber}.`)}`} target="_blank" rel="noreferrer" className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white">Continue on WhatsApp</a>
          <button onClick={() => setCaseNumber("")} className="rounded-xl border border-emerald-300 px-5 py-3 text-sm font-bold">Submit another request</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Online intake</p>
      <h2 className="mt-2 text-2xl font-black">Request ICT Assistance</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">Submit only the basic information needed for us to contact you. Do not enter passwords, OTPs, PINs, full card details or unnecessary identity numbers.</p>

      {error && <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">{error}</div>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input required value={form.customerName} onChange={(event) => setForm({ ...form, customerName: event.target.value })} className="field" placeholder="Your name" />
        </Field>
        <Field label="Phone / WhatsApp">
          <input required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="field" placeholder="080..." />
        </Field>
        <Field label="Email (optional)">
          <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="field" placeholder="you@example.com" />
        </Field>
        <Field label="State / location">
          <input value={form.state} onChange={(event) => setForm({ ...form, state: event.target.value })} className="field" placeholder="Enugu" />
        </Field>
      </div>

      <Field label="Service" className="mt-4">
        <select required disabled={loading || !services.length} value={form.serviceCode} onChange={(event) => setForm({ ...form, serviceCode: event.target.value })} className="field">
          {services.map((service) => <option key={service.code} value={service.code}>{service.name}</option>)}
        </select>
      </Field>

      <Field label="What do you need help with?" className="mt-4">
        <textarea rows={4} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="field resize-y" placeholder="Example: I need help preparing for NYSC online registration. Do not include passwords or sensitive identity numbers." />
      </Field>

      <label className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
        <input required type="checkbox" checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} className="mt-1 h-4 w-4" />
        <span>I agree that Fintigen/MABRIG Technologies may contact me about this service request. I understand Fintigen is an independent ICT assistance provider and not a government agency.</span>
      </label>

      <button disabled={submitting || loading || !services.length} className="mt-6 w-full rounded-xl bg-emerald-600 px-5 py-3.5 font-black text-white transition hover:bg-emerald-700 disabled:opacity-50">
        {submitting ? "Submitting request…" : "Create My Service Request"}
      </button>
    </form>
  );
}

function Field({ label, className = "", children }: { label: string; className?: string; children: React.ReactNode }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>{children}</label>;
}
