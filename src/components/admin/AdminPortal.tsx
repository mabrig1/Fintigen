"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  clearAuthSession,
  getAuthSession,
  saveAuthSession,
  type AuthUser,
} from "@/lib/auth-client";

type Session = { token: string; user: AuthUser };
type Tab = "overview" | "students" | "courses" | "payments" | "system";

type DashboardMetrics = {
  totalStudents?: number;
  totalCourses?: number;
  activeEnrollments?: number;
  successfulPayments?: number;
  totalTasksDone?: number;
  avgProgress?: number;
  totalPossibleTasks?: number;
  revenueByCurrency?: Record<string, number>;
};

type ProgressStudent = {
  id?: string;
  user_id?: string;
  name?: string;
  email?: string;
  total_tasks_done?: number;
  progressPct?: number;
};

type Student = {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active?: boolean;
  created_at?: string;
};

type Course = {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  description?: string;
  access?: string;
  levels?: Array<{ title?: string; modules?: unknown[] }>;
};

type Payment = {
  id: string;
  reference: string;
  provider: string;
  amount: number;
  currency: string;
  status: string;
  paid_at?: string | null;
  created_at?: string;
  user?: { id: string; name: string; email: string } | null;
  course?: { id: string; title: string; slug: string } | null;
};

type Health = {
  status?: string;
  database?: string;
  ai?: boolean;
  payments?: boolean;
  promoterCommissions?: boolean;
  adaptiveLearning?: boolean;
  accountLinkedMemory?: boolean;
  personalizedDashboard?: boolean;
  timestamp?: string;
};

type ApiEnvelope<T> = {
  status?: string;
  data?: T;
  error?: string;
  message?: string;
};

const ADMIN_EMAIL = "victoryonline1@gmail.com";
const WHATSAPP = "https://wa.me/2347065342818";

function formatMoney(amount: number, currency = "NGN") {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  } catch {
    return `${currency} ${(amount || 0).toLocaleString()}`;
  }
}

function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function unwrap<T>(payload: ApiEnvelope<T>): T {
  if (!payload?.data) throw new Error(payload?.error || payload?.message || "The server returned an empty response.");
  return payload.data;
}

export default function AdminPortal() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const healthUrl = apiBase.replace(/\/api\/v1\/?$/, "") + "/health";

  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionKey, setActionKey] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const [metrics, setMetrics] = useState<DashboardMetrics>({});
  const [progressStudents, setProgressStudents] = useState<ProgressStudent[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [health, setHealth] = useState<Health | null>(null);
  const [courseSelections, setCourseSelections] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = getAuthSession();
    if (saved?.user?.role === "admin") setSession(saved);
    setCheckingSession(false);
  }, []);

  const authenticatedFetch = useCallback(async <T,>(path: string, init: RequestInit = {}) => {
    if (!session?.token) throw new Error("Admin session is missing.");
    const response = await fetch(`${apiBase}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
        ...(init.headers || {}),
      },
    });
    const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        clearAuthSession();
        setSession(null);
      }
      throw new Error(payload.error || payload.message || `Request failed (${response.status}).`);
    }
    return unwrap(payload);
  }, [apiBase, session?.token]);

  const loadData = useCallback(async () => {
    if (!session || !apiBase) return;
    setLoading(true);
    setError("");
    try {
      const [dashboardData, studentData, paymentData, courseData, healthData] = await Promise.all([
        authenticatedFetch<{ metrics: DashboardMetrics; students: ProgressStudent[] }>("/admin/dashboard"),
        authenticatedFetch<{ students: Student[]; total: number }>("/admin/students"),
        authenticatedFetch<{ payments: Payment[]; total: number }>("/admin/payments?limit=50"),
        fetch(`${apiBase}/courses`).then(async (response) => {
          const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<{ catalog: Course[] }>;
          if (!response.ok) throw new Error(payload.error || "Could not load the course catalog.");
          return unwrap(payload);
        }),
        fetch(healthUrl).then(async (response) => {
          if (!response.ok) throw new Error("Health check failed.");
          return (await response.json()) as Health;
        }).catch(() => null),
      ]);

      setMetrics(dashboardData.metrics || {});
      setProgressStudents(dashboardData.students || []);
      setStudents(studentData.students || []);
      setPayments(paymentData.payments || []);
      setCourses(courseData.catalog || []);
      setHealth(healthData);

      const firstSlug = courseData.catalog?.[0]?.slug || "";
      if (firstSlug) {
        setCourseSelections((current) => {
          const next = { ...current };
          for (const student of studentData.students || []) {
            if (!next[student.id]) next[student.id] = firstSlug;
          }
          return next;
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load admin data.");
    } finally {
      setLoading(false);
    }
  }, [apiBase, authenticatedFetch, healthUrl, session]);

  useEffect(() => {
    if (session?.user?.role === "admin") void loadData();
  }, [session, loadData]);

  async function login(event: FormEvent) {
    event.preventDefault();
    if (!apiBase) {
      setLoginError("NEXT_PUBLIC_API_URL is not configured for the Fintigen frontend.");
      return;
    }
    setLoginLoading(true);
    setLoginError("");
    try {
      const response = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<{ token: string; user: AuthUser }>;
      if (!response.ok) throw new Error(payload.error || payload.message || "Admin login failed.");
      const data = unwrap(payload);
      if (!data.token || !data.user) throw new Error("The server did not return a valid session.");
      if (data.user.role !== "admin") throw new Error("This account does not have administrator access.");
      saveAuthSession(data.token, data.user);
      setSession({ token: data.token, user: data.user });
      setPassword("");
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Admin login failed.");
    } finally {
      setLoginLoading(false);
    }
  }

  function logout() {
    clearAuthSession();
    setSession(null);
    setMetrics({});
    setStudents([]);
    setPayments([]);
    setCourses([]);
    setHealth(null);
  }

  async function deactivateStudent(student: Student) {
    if (!window.confirm(`Deactivate ${student.name}? They will lose access until reactivated in the database.`)) return;
    setActionKey(`deactivate-${student.id}`);
    setNotice("");
    setError("");
    try {
      await authenticatedFetch(`/admin/students/${student.id}/deactivate`, { method: "PATCH" });
      setNotice(`${student.name} has been deactivated.`);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not deactivate student.");
    } finally {
      setActionKey("");
    }
  }

  async function grantAccess(student: Student) {
    const courseSlug = courseSelections[student.id] || courses[0]?.slug;
    if (!courseSlug) return;
    setActionKey(`grant-${student.id}`);
    setNotice("");
    setError("");
    try {
      await authenticatedFetch(`/admin/students/${student.id}/enrollments`, {
        method: "POST",
        body: JSON.stringify({ courseSlug, source: "admin" }),
      });
      const course = courses.find((item) => item.slug === courseSlug);
      setNotice(`Access to ${course?.title || courseSlug} granted to ${student.name}.`);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not grant course access.");
    } finally {
      setActionKey("");
    }
  }

  const revenueCards = useMemo(() => Object.entries(metrics.revenueByCurrency || {}), [metrics.revenueByCurrency]);
  const recentPayments = payments.slice(0, 6);
  const topLearners = [...progressStudents].sort((a, b) => (b.progressPct || 0) - (a.progressPct || 0)).slice(0, 6);

  if (checkingSession) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Checking administrator session…</div>;
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
        <div className="mx-auto grid min-h-[85vh] max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
          <section className="relative hidden overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-950 p-12 lg:block">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl font-black text-emerald-700">F</div>
                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">Fintigen.com</p>
                <h1 className="mt-3 max-w-xl text-5xl font-black leading-tight">Admin Command Center</h1>
                <p className="mt-5 max-w-lg text-lg leading-8 text-emerald-50/90">Manage learners, courses, enrollments, payments, platform health, and growth from one secure workspace.</p>
              </div>
              <div className="space-y-2 text-sm text-emerald-50/80">
                <p className="font-semibold text-white">A subsidiary of MABRIG Technologies</p>
                <p>Developed by MABRIG Technologies · MABRIG Korie</p>
                <p>WhatsApp: 07065342818</p>
              </div>
            </div>
          </section>

          <section className="flex items-center p-6 sm:p-10 lg:p-12">
            <div className="mx-auto w-full max-w-md">
              <div className="lg:hidden">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-xl font-black text-slate-950">F</div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Fintigen Admin</p>
              </div>
              <h2 className="mt-5 text-3xl font-bold">Administrator sign in</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Use the Fintigen administrator account. The initial owner email has been prefilled and can be changed later.</p>

              <form onSubmit={login} className="mt-8 space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">Admin email</span>
                  <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 outline-none transition focus:border-emerald-500" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">Password</span>
                  <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" required className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 outline-none transition focus:border-emerald-500" placeholder="Enter your Fintigen password" />
                </label>
                {loginError && <div className="rounded-xl border border-rose-900 bg-rose-950/40 px-4 py-3 text-sm text-rose-200">{loginError}</div>}
                <button disabled={loginLoading} className="w-full rounded-xl bg-emerald-500 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60">
                  {loginLoading ? "Signing in…" : "Open Admin Dashboard"}
                </button>
              </form>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-400">
                <Link href="/" className="hover:text-white">← Back to Fintigen</Link>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-emerald-400">WhatsApp support</a>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const navItems: Array<{ id: Tab; label: string; description: string }> = [
    { id: "overview", label: "Overview", description: "Business pulse" },
    { id: "students", label: "Students", description: "Accounts & access" },
    { id: "courses", label: "Courses", description: "Training catalog" },
    { id: "payments", label: "Payments", description: "Revenue records" },
    { id: "system", label: "System", description: "Platform health" },
  ];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 flex-col bg-slate-950 p-5 text-white lg:flex">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-xl font-black text-slate-950">F</div>
            <div>
              <p className="font-black tracking-tight">FINTIGEN ADMIN</p>
              <p className="text-xs text-slate-400">MABRIG Technologies</p>
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full rounded-xl px-4 py-3 text-left transition ${activeTab === item.id ? "bg-emerald-500 text-slate-950" : "text-slate-300 hover:bg-slate-900 hover:text-white"}`}>
                <span className="block font-semibold">{item.label}</span>
                <span className={`block text-xs ${activeTab === item.id ? "text-slate-800" : "text-slate-500"}`}>{item.description}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm">
            <p className="font-semibold">{session.user.name}</p>
            <p className="mt-1 truncate text-xs text-slate-400">{session.user.email}</p>
            <button onClick={logout} className="mt-4 w-full rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold hover:bg-slate-800">Sign out</button>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">Fintigen.com · Admin Portal</p>
                <h1 className="mt-1 text-xl font-black sm:text-2xl">{navItems.find((item) => item.id === activeTab)?.label}</h1>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => void loadData()} disabled={loading} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50">{loading ? "Refreshing…" : "Refresh"}</button>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hidden rounded-lg bg-emerald-500 px-3 py-2 text-sm font-bold text-slate-950 sm:inline-block">WhatsApp</a>
                <button onClick={logout} className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white lg:hidden">Sign out</button>
              </div>
            </div>
            <div className="mx-auto mt-4 flex max-w-7xl gap-2 overflow-x-auto pb-1 lg:hidden">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${activeTab === item.id ? "bg-emerald-500 text-slate-950" : "bg-slate-100 text-slate-600"}`}>{item.label}</button>
              ))}
            </div>
          </header>

          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
            {notice && <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">{notice}</div>}
            {error && <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">{error}</div>}

            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <MetricCard label="Active students" value={metrics.totalStudents || 0} detail="Registered learner accounts" />
                  <MetricCard label="Active enrollments" value={metrics.activeEnrollments || 0} detail="Current course access" />
                  <MetricCard label="Courses" value={metrics.totalCourses || courses.length || 0} detail="Training programs" />
                  <MetricCard label="Average progress" value={`${metrics.avgProgress || 0}%`} detail={`${(metrics.totalTasksDone || 0).toLocaleString()} completed learning tasks`} />
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-black">Revenue snapshot</h2>
                        <p className="mt-1 text-sm text-slate-500">Successful recorded payments by currency.</p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{metrics.successfulPayments || 0} successful</span>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {revenueCards.length ? revenueCards.map(([currency, amount]) => (
                        <div key={currency} className="rounded-xl bg-slate-950 p-5 text-white">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{currency} revenue</p>
                          <p className="mt-2 text-2xl font-black">{formatMoney(amount, currency)}</p>
                        </div>
                      )) : <p className="col-span-2 rounded-xl bg-slate-50 p-5 text-sm text-slate-500">No successful payment has been recorded yet.</p>}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-black">Platform status</h2>
                    <p className="mt-1 text-sm text-slate-500">Live backend capability check.</p>
                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                      <Status label="API" ok={health?.status === "ok"} />
                      <Status label="MongoDB" ok={health?.database === "mongodb"} />
                      <Status label="AI" ok={Boolean(health?.ai)} />
                      <Status label="Payments" ok={Boolean(health?.payments)} />
                      <Status label="Learning memory" ok={Boolean(health?.accountLinkedMemory)} />
                      <Status label="Personalization" ok={Boolean(health?.personalizedDashboard)} />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-black">Recent payments</h2>
                      <button onClick={() => setActiveTab("payments")} className="text-sm font-bold text-emerald-700">View all</button>
                    </div>
                    <div className="mt-4 space-y-3">
                      {recentPayments.length ? recentPayments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">{payment.user?.name || payment.user?.email || "Customer"}</p>
                            <p className="truncate text-xs text-slate-500">{payment.course?.title || payment.reference}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black">{formatMoney(payment.amount, payment.currency)}</p>
                            <p className={`text-xs font-semibold ${payment.status === "successful" ? "text-emerald-600" : "text-slate-500"}`}>{payment.status}</p>
                          </div>
                        </div>
                      )) : <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No payment records yet.</p>}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-black">Learner progress</h2>
                      <button onClick={() => setActiveTab("students")} className="text-sm font-bold text-emerald-700">Manage students</button>
                    </div>
                    <div className="mt-4 space-y-4">
                      {topLearners.length ? topLearners.map((student, index) => (
                        <div key={student.id || student.user_id || index}>
                          <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                            <span className="truncate font-semibold">{student.name || student.email || `Learner ${index + 1}`}</span>
                            <span className="font-black">{student.progressPct || 0}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.min(student.progressPct || 0, 100)}%` }} /></div>
                        </div>
                      )) : <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">Progress data will appear when learners begin course tasks.</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "students" && (
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-5">
                  <h2 className="text-lg font-black">Student management</h2>
                  <p className="mt-1 text-sm text-slate-500">Grant course access or deactivate active student accounts.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                      <tr><th className="px-5 py-3">Student</th><th className="px-5 py-3">Joined</th><th className="px-5 py-3">Grant course</th><th className="px-5 py-3">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td className="px-5 py-4"><p className="font-semibold">{student.name}</p><p className="text-xs text-slate-500">{student.email}</p></td>
                          <td className="px-5 py-4 text-slate-500">{formatDate(student.created_at)}</td>
                          <td className="px-5 py-4">
                            <div className="flex min-w-[310px] gap-2">
                              <select value={courseSelections[student.id] || courses[0]?.slug || ""} onChange={(event) => setCourseSelections((current) => ({ ...current, [student.id]: event.target.value }))} className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2">
                                {courses.map((course) => <option key={course.slug} value={course.slug}>{course.title}</option>)}
                              </select>
                              <button onClick={() => void grantAccess(student)} disabled={actionKey === `grant-${student.id}`} className="rounded-lg bg-emerald-500 px-3 py-2 font-bold text-slate-950 disabled:opacity-50">{actionKey === `grant-${student.id}` ? "Granting…" : "Grant"}</button>
                            </div>
                          </td>
                          <td className="px-5 py-4"><button onClick={() => void deactivateStudent(student)} disabled={actionKey === `deactivate-${student.id}`} className="rounded-lg border border-rose-200 px-3 py-2 font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50">Deactivate</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!students.length && <p className="p-6 text-sm text-slate-500">No active student accounts found.</p>}
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-black">Course catalog</h2>
                  <p className="mt-1 text-sm text-slate-500">Live catalog published by the Fintigen backend.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {courses.map((course) => {
                    const moduleCount = (course.levels || []).reduce((sum, level) => sum + (level.modules?.length || 0), 0);
                    return (
                      <article key={course.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-black leading-6">{course.title}</h3>
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{course.access || "course"}</span>
                        </div>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{course.description || "Fintigen training program"}</p>
                        <div className="mt-5 flex gap-4 text-xs font-semibold text-slate-500"><span>{course.levels?.length || 0} levels</span><span>{moduleCount} modules</span></div>
                        <Link href={`/courses/${course.slug}`} className="mt-5 inline-block text-sm font-bold text-emerald-700">Open public course →</Link>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-5">
                  <h2 className="text-lg font-black">Payment records</h2>
                  <p className="mt-1 text-sm text-slate-500">Most recent transactions recorded by Fintigen.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Course</th><th className="px-5 py-3">Reference</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Date</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-5 py-4"><p className="font-semibold">{payment.user?.name || "Customer"}</p><p className="text-xs text-slate-500">{payment.user?.email || "—"}</p></td>
                          <td className="px-5 py-4 text-slate-600">{payment.course?.title || "—"}</td>
                          <td className="px-5 py-4 font-mono text-xs text-slate-500">{payment.reference}</td>
                          <td className="px-5 py-4 font-black">{formatMoney(payment.amount, payment.currency)}</td>
                          <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${payment.status === "successful" ? "bg-emerald-50 text-emerald-700" : payment.status === "failed" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"}`}>{payment.status}</span></td>
                          <td className="px-5 py-4 text-slate-500">{formatDate(payment.paid_at || payment.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!payments.length && <p className="p-6 text-sm text-slate-500">No payment records found.</p>}
                </div>
              </div>
            )}

            {activeTab === "system" && (
              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-black">Platform configuration</h2>
                  <dl className="mt-5 space-y-4 text-sm">
                    <InfoRow label="Website" value="Fintigen.com" />
                    <InfoRow label="Company" value="Subsidiary of MABRIG Technologies" />
                    <InfoRow label="Developer" value="MABRIG Technologies · MABRIG Korie" />
                    <InfoRow label="Admin email" value={session.user.email} />
                    <InfoRow label="WhatsApp" value="07065342818" />
                    <InfoRow label="API configured" value={apiBase ? "Yes" : "No"} />
                  </dl>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950">Open WhatsApp</a>
                    <Link href="/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold">View Fintigen website</Link>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-black">Backend health</h2>
                  <p className="mt-1 text-sm text-slate-500">Last health response from the production API.</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Status label="API" ok={health?.status === "ok"} />
                    <Status label="Database" ok={health?.database === "mongodb"} />
                    <Status label="OpenRouter / AI" ok={Boolean(health?.ai)} />
                    <Status label="Paystack" ok={Boolean(health?.payments)} />
                    <Status label="Commissions" ok={Boolean(health?.promoterCommissions)} />
                    <Status label="Adaptive learning" ok={Boolean(health?.adaptiveLearning)} />
                  </div>
                  <p className="mt-5 text-xs text-slate-400">Health timestamp: {health?.timestamp ? new Date(health.timestamp).toLocaleString() : "Unavailable"}</p>
                </div>
              </div>
            )}

            <footer className="mt-10 border-t border-slate-200 py-6 text-center text-xs leading-6 text-slate-500">
              <p className="font-semibold text-slate-700">Fintigen.com — A subsidiary of MABRIG Technologies</p>
              <p>Developed by MABRIG Technologies · MABRIG Korie · WhatsApp 07065342818</p>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight">{value}</p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p>
    </div>
  );
}

function Status({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className={`rounded-xl border p-3 ${ok ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${ok ? "bg-emerald-500" : "bg-slate-300"}`} />
        <span className="font-semibold">{label}</span>
      </div>
      <p className={`mt-1 text-xs ${ok ? "text-emerald-700" : "text-slate-500"}`}>{ok ? "Operational" : "Not configured / unavailable"}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
      <dt className="text-slate-500">{label}</dt>
      <dd className="max-w-[65%] text-right font-semibold text-slate-800">{value}</dd>
    </div>
  );
}
