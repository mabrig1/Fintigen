"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getLearningSessionId } from "@/lib/learning-session";

type ReviewItem = {
  id: string;
  concept: string;
  prompt: string;
  source_label: string;
  source_ref: string;
  due_at: string;
  repetitions: number;
  interval_days: number;
};

type MasteryItem = {
  concept: string;
  score: number;
  attempts: number;
};

type Memory = {
  course_title?: string;
  level?: string;
  goal?: string;
  mastery?: MasteryItem[];
};

const ratings = [
  { quality: 0, label: "Again" },
  { quality: 1, label: "Very hard" },
  { quality: 2, label: "Hard" },
  { quality: 3, label: "Okay" },
  { quality: 4, label: "Good" },
  { quality: 5, label: "Easy" },
];

export default function ReviewPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [sessionId, setSessionId] = useState("");
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [memory, setMemory] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(true);
  const [grading, setGrading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const id = getLearningSessionId();
    setSessionId(id);

    if (!apiBase) {
      setError("NEXT_PUBLIC_API_URL is not configured.");
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const [queueResponse, memoryResponse] = await Promise.all([
          fetch(`${apiBase}/learning/review/${id}/due`),
          fetch(`${apiBase}/learning/memory/${id}`),
        ]);
        const queueData = (await queueResponse.json().catch(() => ({}))) as { items?: ReviewItem[]; error?: string };
        const memoryData = (await memoryResponse.json().catch(() => ({}))) as { memory?: Memory | null; error?: string };
        if (!queueResponse.ok) throw new Error(queueData.error || "Could not load review queue.");
        setItems(Array.isArray(queueData.items) ? queueData.items : []);
        if (memoryResponse.ok) setMemory(memoryData.memory || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load review queue.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [apiBase]);

  const weakest = useMemo(
    () => (memory?.mastery || []).slice().sort((a, b) => a.score - b.score).slice(0, 5),
    [memory]
  );

  async function grade(item: ReviewItem, quality: number) {
    if (!apiBase || !sessionId || grading) return;
    setGrading(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`${apiBase}/learning/review/${sessionId}/${item.id}/grade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quality,
          evidence: `Learner self-rated review of ${item.concept} at quality ${quality}/5.`,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
        memory?: Memory;
        item?: { interval_days?: number; due_at?: string };
      };
      if (!response.ok) throw new Error(data.error || data.message || "Could not grade review.");
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      if (data.memory) setMemory(data.memory);
      setNotice(`${item.concept} scheduled again in ${data.item?.interval_days ?? 1} day(s).`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not grade review.");
    } finally {
      setGrading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-violet-950 to-brand-950 p-8 text-white sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">FINTIGEN Mastery Memory</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Spaced Review Queue</h1>
        <p className="mt-4 max-w-3xl text-slate-300">Review weak concepts at increasing intervals. Each rating updates your mastery evidence and schedules the next review automatically.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/ai-lab" className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white hover:bg-violet-500">Open AI Learning Lab</Link>
          <span className="rounded-xl border border-white/15 px-4 py-3 text-sm text-slate-300">{items.length} review{items.length === 1 ? "" : "s"} due now</span>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          {loading && <div className="rounded-2xl border border-slate-200 p-8 text-center dark:border-slate-800">Loading your learning memory…</div>}
          {!loading && items.length === 0 && !error && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950/20">
              <div className="text-4xl">✅</div>
              <h2 className="mt-3 text-xl font-bold">You are caught up</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Use “Save to review” in the AI Lab whenever you encounter a concept worth revisiting.</p>
            </div>
          )}

          <div className="space-y-5">
            {items.map((item, index) => (
              <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-violet-600 dark:text-violet-400">Review {index + 1}</p>
                    <h2 className="mt-1 text-xl font-bold">{item.concept}</h2>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300">Seen {item.repetitions}×</span>
                </div>
                <div className="mt-5 rounded-xl bg-slate-50 p-5 dark:bg-slate-900">
                  <p className="font-medium">{item.prompt}</p>
                  {item.source_label && <p className="mt-3 text-xs text-slate-500">Source: {item.source_label}</p>}
                </div>
                <p className="mt-5 text-sm font-semibold">After answering from memory, how well did you recall it?</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                  {ratings.map((rating) => (
                    <button key={rating.quality} type="button" disabled={grading} onClick={() => grade(item, rating.quality)} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold transition hover:border-violet-500 hover:bg-violet-50 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-violet-950/30">{rating.label}<span className="mt-0.5 block text-[10px] text-slate-400">{rating.quality}/5</span></button>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {notice && <div className="mt-5 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{notice}</div>}
          {error && <div className="mt-5 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">{error}</div>}
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="font-bold">Mastery Snapshot</h2>
          <p className="mt-1 text-xs text-slate-500">Scores are evidence signals from reviews, not formal grades.</p>
          {memory?.goal && <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-900"><strong>Goal</strong><p className="mt-1 text-slate-600 dark:text-slate-400">{memory.goal}</p></div>}
          <div className="mt-5 space-y-3">
            {weakest.length === 0 && <p className="text-sm text-slate-500">No mastery evidence yet. Complete a few reviews to build your profile.</p>}
            {weakest.map((item) => (
              <div key={item.concept}>
                <div className="flex justify-between gap-3 text-xs"><span className="truncate font-medium">{item.concept}</span><span>{item.score}%</span></div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-full rounded-full bg-violet-600" style={{ width: `${Math.max(2, item.score)}%` }} /></div>
                <p className="mt-1 text-[10px] text-slate-400">{item.attempts} review attempt{item.attempts === 1 ? "" : "s"}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
