"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { clearAuthSession, getAuthSession, type AuthUser } from "@/lib/auth-client";

type Session = { token: string; user: AuthUser };

type TrainingEnrollment = {
  id: string;
  external_learner_id: string;
  name: string;
  email: string;
  plan: "free" | "masterclass" | "staff";
  status: "active" | "completed" | "paused" | "cancelled";
  course_title: string;
  onboarding_complete: boolean;
  email_verified: boolean;
  access_source: string;
  progress: {
    completed_modules?: number;
    total_modules?: number;
    percent?: number;
    verified_projects?: number;
    skill_score?: number | null;
    last_module_id?: number | null;
  };
  enrolled_at?: string;
  last_activity_at?: string;
  last_event?: string;
};

type Metrics = {
  total?: number;
  active?: number;
  completed?: number;
  masterclass?: number;
  avgProgress?: number;
  atRisk?: number;
};

type ApiEnvelope<T> = {
  status?: string;
  data?: T;
  error?: string;
  message?: string;
};

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function TrainingEnrollmentsPortal() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [rows, setRows] = useState<TrainingEnrollment[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({});
  const [integrationConfigured, setIntegrationConfigured] = useState<boolean | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = getAuthSession();
    if (saved?.user?.role === "admin") setSession(saved);
    setChecking(false);
  }, []);

  const load = useCallback(async () => {
    if (!session?.token || !apiBase) return;
    setLoading(true);
    setMessage("");
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (status) params.set("status", status);
      if (plan) params.set("plan", plan);

      const response = await fetch(
        apiBase + "/admin/training-enrollments?" + params.toString(),
        {
          headers: { Authorization: "Bearer " + session.token },
          cache: "no-store",
        },
      );
      const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<{
        enrollments: TrainingEnrollment[];
        metrics: Metrics;
        integrationConfigured?: boolean;
      }>;

      if (response.status === 401 || response.status === 403) {
        clearAuthSession();
        setSession(null);
        throw new Error("Your admin session expired. Sign in again.");
      }
      if (!response.ok || !payload.data) {
        throw new Error(payload.error || payload.message || "Could not load training enrollments.");
      }

      setRows(payload.data.enrollments || []);
      setMetrics(payload.data.metrics || {});
      setIntegrationConfigured(Boolean(payload.data.integrationConfigured));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load training enrollments.");
    } finally {
      setLoading(false);
    }
  }, [apiBase, plan, query, session?.token, status]);

  useEffect(() => {
    if (session) void load();
  }, [session, load]);

  async function search(event: FormEvent) {
    event.preventDefault();
    await load();
  }

  async function syncExistingLearners() {
    if (!session?.token || !apiBase) return;
    setBusy("sync-existing");
    setMessage("Importing and refreshing Full-Stack learner records…");
    try {
      const response = await fetch(apiBase + "/admin/training-enrollments/sync", {
        method: "POST",
        headers: { Authorization: "Bearer " + session.token },
      });
      const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<{
        scanned?: number;
        synced?: number;
        failed?: number;
      }>;
      if (!response.ok || !payload.data) {
        throw new Error(payload.error || payload.message || "Learner synchronization failed.");
      }
      setMessage(
        "Synchronization complete: " +
          String(payload.data.synced || 0) +
          " of " +
          String(payload.data.scanned || 0) +
          " learners synchronized" +
          (payload.data.failed ? "; " + String(payload.data.failed) + " need retry." : "."),
      );
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Learner synchronization failed.");
    } finally {
      setBusy("");
    }
  }

  async function setAccess(enrollment: TrainingEnrollment, nextPlan: "free" | "masterclass") {
    if (!session?.token || !apiBase) return;
    const label = nextPlan === "masterclass" ? "grant Master-Class access" : "move this learner to the free plan";
    if (!window.confirm("Are you sure you want to " + label + " for " + enrollment.name + "?")) return;

    setBusy(enrollment.id + nextPlan);
    setMessage("");
    try {
      const response = await fetch(
        apiBase + "/admin/training-enrollments/" + enrollment.id + "/access",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.token,
          },
          body: JSON.stringify({ plan: nextPlan }),
        },
      );
      const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<{ message?: string }>;
      if (!response.ok) throw new Error(payload.error || payload.message || "Access update failed.");
      setMessage(
        nextPlan === "masterclass"
          ? "Master-Class access granted in Fintigen and synchronized to the Full-Stack app."
          : "Learner access changed to free in Fintigen and synchronized to the Full-Stack app.",
      );
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Access update failed.");
    } finally {
      setBusy("");
    }
  }

  const atRiskRows = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return rows.filter((row) => {
      const time = new Date(row.last_activity_at || 0).getTime();
      return Number.isFinite(time) && time < cutoff && row.status === "active";
    }).length;
  }, [rows]);

  if (checking) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Loading training operations…</div>;
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Fintigen Admin</p>
          <h1 className="mt-3 text-3xl font-black">Administrator sign-in required</h1>
          <p className="mt-4 text-slate-400">
            Full-Stack enrollment and learner records are available only inside the Fintigen administrator workspace.
          </p>
          <Link href="/admin" className="mt-7 inline-flex rounded-xl bg-emerald-500 px-5 py-3 font-bold text-slate-950">
            Open Admin Sign In
          </Link>
        </div>
      </main>
    );
  }

  const cardData = [
    ["Total enrollments", metrics.total || 0, "All synced Full-Stack learners"],
    ["Master-Class", metrics.masterclass || 0, "Premium access"],
    ["Average progress", String(metrics.avgProgress || 0) + "%", "Across all synced learners"],
    ["Needs follow-up", metrics.atRisk ?? atRiskRows, "No activity for 7+ days"],
  ];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-slate-950 px-4 py-6 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Fintigen Admin · Training Operations</p>
            <h1 className="mt-2 text-3xl font-black">Full-Stack Master-Class Enrollments</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Fintigen is the central enrollment command center. New registrations, paid access, and learning progress synchronize from the Full-Stack app.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => void syncExistingLearners()}
              disabled={Boolean(busy) || integrationConfigured === false}
              className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy === "sync-existing" ? "Synchronizing…" : "Sync Full-Stack learners"}
            </button>
            <Link href="/admin" className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold hover:bg-slate-900">
              ← Admin home
            </Link>
            <a
              href="https://fullstack.mabrigkorie.org"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-slate-950"
            >
              Open course ↗
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        {integrationConfigured === false && (
          <section className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950">
            <strong>Enrollment connection needs deployment configuration.</strong>
            <p className="mt-2 text-sm">
              The dashboard is deployed, but the shared Full-Stack integration secret must be configured on both server projects before learner synchronization and access changes can run.
            </p>
          </section>
        )}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cardData.map(([label, value, note]) => (
            <article key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">{label}</p>
              <strong className="mt-3 block text-3xl font-black">{value}</strong>
              <p className="mt-2 text-xs text-slate-500">{note}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <form onSubmit={search} className="grid gap-3 lg:grid-cols-[1fr_180px_180px_auto]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search learner name, email or learner ID"
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            />
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3">
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select value={plan} onChange={(event) => setPlan(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3">
              <option value="">All plans</option>
              <option value="free">Free</option>
              <option value="masterclass">Master-Class</option>
              <option value="staff">Staff</option>
            </select>
            <button disabled={loading} className="rounded-xl bg-slate-950 px-5 py-3 font-bold text-white">
              {loading ? "Refreshing…" : "Search / Refresh"}
            </button>
          </form>
          {message && <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{message}</div>}
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Learner</th>
                  <th className="px-5 py-4">Access</th>
                  <th className="px-5 py-4">Progress</th>
                  <th className="px-5 py-4">Evidence</th>
                  <th className="px-5 py-4">Activity</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => {
                  const completed = Number(row.progress?.completed_modules || 0);
                  const total = Number(row.progress?.total_modules || 64);
                  const percent = Number(row.progress?.percent || 0);
                  const inactive = row.status === "active" && new Date(row.last_activity_at || 0).getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000;
                  return (
                    <tr key={row.id} className="align-top hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <strong className="block">{row.name}</strong>
                        <span className="block text-xs text-slate-500">{row.email}</span>
                        <span className="mt-1 block text-[11px] text-slate-400">ID {row.external_learner_id.slice(-10)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={row.plan === "masterclass" ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800" : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700"}>
                          {row.plan}
                        </span>
                        <p className="mt-2 text-xs text-slate-500">{row.status} · {row.access_source || "sync"}</p>
                      </td>
                      <td className="min-w-56 px-5 py-4">
                        <div className="flex items-center justify-between text-xs">
                          <span>{completed}/{total} modules</span>
                          <strong>{percent}%</strong>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: Math.min(100, Math.max(0, percent)) + "%" }} />
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <strong>{Number(row.progress?.verified_projects || 0)}</strong>
                        <span className="block text-xs text-slate-500">verified projects</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={inactive ? "font-bold text-rose-600" : "text-slate-700"}>
                          {formatDate(row.last_activity_at)}
                        </span>
                        <span className="block text-xs text-slate-500">{inactive ? "Follow-up suggested" : row.last_event || "active"}</span>
                      </td>
                      <td className="px-5 py-4">
                        {row.plan !== "masterclass" && row.plan !== "staff" ? (
                          <button
                            disabled={Boolean(busy)}
                            onClick={() => void setAccess(row, "masterclass")}
                            className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-black text-slate-950 disabled:opacity-50"
                          >
                            Grant Master-Class
                          </button>
                        ) : row.plan === "masterclass" ? (
                          <button
                            disabled={Boolean(busy)}
                            onClick={() => void setAccess(row, "free")}
                            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold disabled:opacity-50"
                          >
                            Set free
                          </button>
                        ) : (
                          <span className="text-xs text-slate-500">Staff access</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {!rows.length && !loading && (
                  <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">No Full-Stack enrollment records found yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600">Enrollment source</p>
            <h2 className="mt-2 text-xl font-black">One learner record per Full-Stack account</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Registration is synchronized automatically. Duplicate syncs update the same record rather than creating duplicates.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600">Training intelligence</p>
            <h2 className="mt-2 text-xl font-black">Progress becomes operational data</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Module completion and verified project evidence are visible here so follow-up can focus on learners who are stalled.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600">Access control</p>
            <h2 className="mt-2 text-xl font-black">Fintigen can grant course access</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Changing a learner between free and Master-Class is sent securely back to the Full-Stack application.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
