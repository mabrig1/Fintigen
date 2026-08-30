"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { authHeaders, getAuthSession, type AuthUser } from "@/lib/auth-client";

type MasteryItem = { concept: string; score: number; attempts: number };
type RecentProgress = {
  id: string;
  module_id: string;
  module_slug?: string | null;
  quiz_passed: boolean;
  assessment_done: boolean;
  assignment_done: boolean;
  quiz_score?: number | null;
  completed_at?: string | null;
  updated_at?: string;
};

type DashboardData = {
  user: AuthUser;
  memory: {
    account_linked: boolean;
    course_title: string;
    level: string;
    goal: string;
    last_agent: string;
    mastery_average: number | null;
    strongest: MasteryItem[];
    weakest: MasteryItem[];
    reviews_due: number;
    tracked_concepts: number;
  };
  progress: {
    modules_touched: number;
    modules_completed: number;
    tasks_done: number;
    quizzes_passed: number;
    assessments_done: number;
    assignments_done: number;
    average_quiz_score: number | null;
    recent: RecentProgress[];
  };
  recommended_course: {
    slug: string;
    title: string;
    description?: string;
    badge?: string;
    reason?: string;
  } | null;
  daily_mission: Mission | null;
  next_actions: Array<{ type: string; label: string; href: string }>;
};

type Mission = {
  id: string;
  date_key: string;
  content: string;
  model?: string;
  generated_at?: string;
};

type DashboardResponse = { dashboard?: DashboardData; error?: string; message?: string };
type MissionResponse = { mission?: Mission; cached?: boolean; error?: string; message?: string };

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{note}</p>
    </div>
  );
}

function MasteryList({ title, items, empty }: { title: string; items: MasteryItem[]; empty: string }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
      <h2 className="font-bold">{title}</h2>
      <div className="mt-4 space-y-4">
        {items.length === 0 && <p className="text-sm text-slate-500">{empty}</p>}
        {items.map((item) => (
          <div key={item.concept}>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="truncate font-semibold">{item.concept}</span>
              <span className="shrink-0 text-slate-500">{item.score}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="h-full rounded-full bg-violet-600" style={{ width: `${Math.max(2, Math.min(100, item.score))}%` }} />
            </div>
            <p className="mt-1 text-[11px] text-slate-400">{item.attempts} evidence event{item.attempts === 1 ? "" : "s"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PersonalizedDashboard() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [missionLoading, setMissionLoading] = useState(false);
  const [error, setError] = useState("");
  const [missionError, setMissionError] = useState("");
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  async function generateMission(force = false) {
    if (!apiBase) return;
    setMissionLoading(true);
    setMissionError("");
    try {
      const response = await fetch(`${apiBase}/dashboard/daily-mission`, {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ force }),
      });
      const payload = (await response.json().catch(() => ({}))) as MissionResponse;
      if (response.status === 401) {
        setSignedIn(false);
        return;
      }
      if (!response.ok) throw new Error(payload.error || payload.message || "Could not generate today's mission.");
      if (payload.mission) setMission(payload.mission);
    } catch (err) {
      setMissionError(err instanceof Error ? err.message : "Could not generate today's mission.");
    } finally {
      setMissionLoading(false);
    }
  }

  useEffect(() => {
    const auth = getAuthSession();
    setSignedIn(Boolean(auth));
    if (!auth) {
      setLoading(false);
      return;
    }
    if (!apiBase) {
      setError("NEXT_PUBLIC_API_URL is not configured.");
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const response = await fetch(`${apiBase}/dashboard`, {
          headers: authHeaders(),
          cache: "no-store",
        });
        const payload = (await response.json().catch(() => ({}))) as DashboardResponse;
        if (response.status === 401) {
          setSignedIn(false);
          return;
        }
        if (!response.ok || !payload.dashboard) throw new Error(payload.error || payload.message || "Could not load your dashboard.");
        setDashboard(payload.dashboard);
        setMission(payload.dashboard.daily_mission || null);
        if (!payload.dashboard.daily_mission) void generateMission(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load your dashboard.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [apiBase]);

  const completionRate = useMemo(() => {
    if (!dashboard?.progress.modules_touched) return 0;
    return Math.round((dashboard.progress.modules_completed / dashboard.progress.modules_touched) * 100);
  }, [dashboard]);

  if (signedIn === false) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-950">
          <div className="text-5xl">🔐</div>
          <h1 className="mt-4 text-3xl font-bold">Your personalized dashboard is account-linked</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">Log in to restore your mastery profile, reviews, progress, recommended course, and AI-generated daily mission across devices.</p>
          <div className="mt-7 flex justify-center gap-3">
            <Link href="/login" className="rounded-xl bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700">Log in</Link>
            <Link href="/register" className="rounded-xl border border-slate-300 px-5 py-3 font-bold dark:border-slate-700">Create account</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || signedIn === null) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-center text-slate-500 sm:px-6">Building your personalized learning dashboard…</div>;
  }

  if (error || !dashboard) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="rounded-2xl border border-rose-300 bg-rose-50 p-6 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">{error || "Your dashboard is temporarily unavailable."}</div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-violet-950 to-brand-950 p-8 text-white sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">FINTIGEN Intelligence Dashboard</p>
            <h1 className="mt-3 text-3xl font-black sm:text-5xl">Welcome back, {dashboard.user.name.split(" ")[0]}.</h1>
            <p className="mt-4 max-w-3xl text-slate-300">Your dashboard combines course progress, mastery evidence, spaced review, and account-linked AI memory into one next-action view.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-2 text-emerald-200">● Account memory synced</span>
            <span className="rounded-full border border-violet-300/30 bg-violet-400/10 px-3 py-2 text-violet-200">AI path: {dashboard.memory.last_agent || "ready"}</span>
          </div>
        </div>
      </section>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Mastery signal" value={dashboard.memory.mastery_average === null ? "New" : `${dashboard.memory.mastery_average}%`} note={`${dashboard.memory.tracked_concepts} concept${dashboard.memory.tracked_concepts === 1 ? "" : "s"} tracked`} />
        <MetricCard label="Reviews due" value={String(dashboard.memory.reviews_due)} note="Spaced-repetition items ready now" />
        <MetricCard label="Course progress" value={`${completionRate}%`} note={`${dashboard.progress.modules_completed}/${dashboard.progress.modules_touched || 0} touched modules completed`} />
        <MetricCard label="Tasks completed" value={String(dashboard.progress.tasks_done)} note={`Quiz average: ${dashboard.progress.average_quiz_score === null ? "No score yet" : `${dashboard.progress.average_quiz_score}%`}`} />
      </section>

      <section className="mt-7 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <article className="rounded-3xl border border-violet-200 bg-violet-50/60 p-6 dark:border-violet-900 dark:bg-violet-950/20 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">AI Daily Mission</p>
              <h2 className="mt-2 text-2xl font-bold">Your highest-value learning actions for today</h2>
            </div>
            <button type="button" disabled={missionLoading} onClick={() => generateMission(true)} className="shrink-0 rounded-xl border border-violet-300 bg-white px-4 py-2 text-sm font-bold text-violet-700 hover:bg-violet-100 disabled:opacity-50 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300">
              {missionLoading ? "Thinking…" : mission ? "Refresh mission" : "Generate mission"}
            </button>
          </div>
          {missionLoading && !mission && <div className="mt-6 rounded-2xl bg-white/70 p-5 text-sm text-slate-500 dark:bg-slate-950/50">Tutor, mastery, project, and career context are being condensed into one practical daily mission…</div>}
          {mission && <div className="mt-6 whitespace-pre-wrap rounded-2xl bg-white p-6 text-sm leading-7 text-slate-800 shadow-sm dark:bg-slate-950 dark:text-slate-100">{mission.content}</div>}
          {missionError && <div className="mt-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-300">{missionError}</div>}
          <p className="mt-4 text-xs text-slate-500">A mission is cached for the day to control AI cost. Refresh only when you want a new plan.</p>
        </article>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Current direction</p>
          <h2 className="mt-2 text-xl font-bold">{dashboard.memory.goal || "Set your next learning goal"}</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900"><span className="text-slate-500">Current course</span><p className="mt-1 font-semibold">{dashboard.memory.course_title || "Not selected yet"}</p></div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900"><span className="text-slate-500">Level</span><p className="mt-1 font-semibold">{dashboard.memory.level || "Run diagnostic"}</p></div>
          </div>
          <div className="mt-5 grid gap-2">
            {dashboard.next_actions.map((action) => <Link key={`${action.type}-${action.label}`} href={action.href} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold transition hover:border-violet-400 hover:bg-violet-50 dark:border-slate-800 dark:hover:bg-violet-950/20">→ {action.label}</Link>)}
          </div>
        </aside>
      </section>

      <section className="mt-7 grid gap-6 lg:grid-cols-3">
        <MasteryList title="Weak concepts to strengthen" items={dashboard.memory.weakest} empty="No weak-concept evidence yet. Run the Skills Diagnostic or complete reviews." />
        <MasteryList title="Strongest evidence" items={dashboard.memory.strongest} empty="Your strongest concepts will appear as you complete reviews and assessments." />
        <article className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">Recommended next course</p>
          {dashboard.recommended_course ? (
            <>
              <h2 className="mt-3 text-xl font-bold">{dashboard.recommended_course.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{dashboard.recommended_course.description || dashboard.recommended_course.reason}</p>
              {dashboard.recommended_course.reason && <p className="mt-3 text-xs text-emerald-800/80 dark:text-emerald-300/80">{dashboard.recommended_course.reason}</p>}
              <Link href="/courses" className="mt-5 inline-flex rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-500">Explore recommendation</Link>
            </>
          ) : (
            <><h2 className="mt-3 text-xl font-bold">Complete a diagnostic first</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-400">FINTIGEN needs a little learning evidence before recommending a next course.</p><Link href="/ai-lab" className="mt-5 inline-flex rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white">Run Skills Diagnostic</Link></>
          )}
        </article>
      </section>

      <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-xl font-bold">Evidence & activity</h2><p className="mt-1 text-sm text-slate-500">Real backend progress—not demo statistics.</p></div>
          <div className="flex gap-2"><Link href="/review" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold dark:border-slate-700">Review Queue</Link><Link href="/ai-lab" className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white">AI Learning Lab</Link></div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900"><p className="text-xs text-slate-500">Quizzes passed</p><p className="mt-1 text-2xl font-black">{dashboard.progress.quizzes_passed}</p></div>
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900"><p className="text-xs text-slate-500">Assessments submitted</p><p className="mt-1 text-2xl font-black">{dashboard.progress.assessments_done}</p></div>
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900"><p className="text-xs text-slate-500">Assignments submitted</p><p className="mt-1 text-2xl font-black">{dashboard.progress.assignments_done}</p></div>
        </div>
      </section>
    </main>
  );
}
