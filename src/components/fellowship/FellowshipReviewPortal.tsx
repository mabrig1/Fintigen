"use client";

import { useMemo, useState } from "react";
import { getAuthSession } from "@/lib/auth-client";

type ReviewApplication = {
  id: string;
  applicant_code: string;
  cycle: string;
  preferred_track: string;
  weekly_hours: string;
  technical_background: string;
  strongest_work_sample: string;
  ai_safety_motivation: string;
  evidence_reasoning_example: string;
  github_or_portfolio?: string;
  status: string;
  reviewer_id?: string | null;
};

type ReviewDraft = {
  demonstratedTechnicalAbility: number;
  evidenceDiscipline: number;
  motivationAndFieldFit: number;
  capacityToComplete: number;
  learningTrajectory: number;
  responsiblePractice: number;
  recommendation: "advance" | "hold" | "do-not-advance";
  notes: string;
};

type ApiEnvelope<T> = {
  status?: string;
  data?: T;
  message?: string;
  error?: string;
};

const emptyReview: ReviewDraft = {
  demonstratedTechnicalAbility: 0,
  evidenceDiscipline: 0,
  motivationAndFieldFit: 0,
  capacityToComplete: 0,
  learningTrajectory: 0,
  responsiblePractice: 0,
  recommendation: "hold",
  notes: "",
};

async function readEnvelope<T>(response: Response) {
  const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;
  if (!response.ok) {
    throw new Error(payload.message || payload.error || `Request failed (${response.status}).`);
  }
  if (!payload.data) throw new Error("The server returned an empty response.");
  return payload.data;
}

export default function FellowshipReviewPortal() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [applications, setApplications] = useState<ReviewApplication[]>([]);
  const [drafts, setDrafts] = useState<Record<string, ReviewDraft>>({});
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const totalScores = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const [id, draft] of Object.entries(drafts)) {
      totals[id] =
        draft.demonstratedTechnicalAbility +
        draft.evidenceDiscipline +
        draft.motivationAndFieldFit +
        draft.capacityToComplete +
        draft.learningTrajectory +
        draft.responsiblePractice;
    }
    return totals;
  }, [drafts]);

  function reviewFor(id: string) {
    return drafts[id] || emptyReview;
  }

  function updateReview<K extends keyof ReviewDraft>(
    id: string,
    key: K,
    value: ReviewDraft[K]
  ) {
    setDrafts((current) => ({
      ...current,
      [id]: { ...(current[id] || emptyReview), [key]: value },
    }));
  }

  async function reviewerFetch<T>(path: string, init: RequestInit = {}) {
    const session = getAuthSession();
    if (!session?.token || !["instructor", "admin"].includes(session.user?.role || "")) {
      throw new Error("Sign in with an instructor or admin account before reviewing fellowship applications.");
    }
    if (!apiBase) throw new Error("NEXT_PUBLIC_API_URL is not configured.");

    return readEnvelope<T>(
      await fetch(`${apiBase}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
          ...(init.headers || {}),
        },
      })
    );
  }

  async function loadQueue() {
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const data = await reviewerFetch<{
        applications: ReviewApplication[];
        total: number;
        identity_redacted: boolean;
      }>("/fellowship/reviews/queue");
      setApplications(data.applications || []);
      setNotice(
        `Loaded ${data.total ?? data.applications?.length ?? 0} assigned review records. Direct applicant identity is redacted from the reviewer queue.`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load reviewer queue.");
    } finally {
      setLoading(false);
    }
  }

  async function submitReview(applicationId: string) {
    const draft = reviewFor(applicationId);
    setActionId(applicationId);
    setError("");
    setNotice("");
    try {
      const data = await reviewerFetch<{
        review: {
          total_score: number;
          recommendation: string;
          final_decision: boolean;
          message: string;
        };
      }>(`/fellowship/reviews/${applicationId}`, {
        method: "POST",
        body: JSON.stringify(draft),
      });
      setNotice(
        `Review saved: ${data.review.total_score}/100 · ${data.review.recommendation}. This is a reviewer recommendation, not a final admission decision.`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the structured review.");
    } finally {
      setActionId("");
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
        Instructor / Admin · Structured Human Review
      </p>
      <h1 className="mt-3 text-4xl font-black">AI Safety Fellowship Review Queue</h1>
      <p className="mt-4 max-w-4xl leading-7 text-slate-600 dark:text-slate-300">
        Reviewers receive the applicant&apos;s technical evidence and reasoning without direct identity fields. Scores structure the review; they do not automatically rank, select, or reject candidates.
      </p>

      <button
        type="button"
        onClick={loadQueue}
        disabled={loading}
        className="mt-7 rounded-xl bg-violet-700 px-6 py-3 font-black text-white disabled:opacity-50"
      >
        {loading ? "Loading…" : "Load assigned review queue"}
      </button>

      {notice && (
        <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
          {notice}
        </p>
      )}
      {error && (
        <p className="mt-5 rounded-xl bg-rose-50 p-4 text-sm font-semibold text-rose-800 dark:bg-rose-950/30 dark:text-rose-200">
          {error}
        </p>
      )}

      <section className="mt-8 space-y-6">
        {applications.length === 0 && !loading ? (
          <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700">
            No assigned applications loaded.
          </div>
        ) : (
          applications.map((application) => {
            const review = reviewFor(application.id);
            const total = totalScores[application.id] || 0;
            return (
              <article key={application.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-violet-600 dark:text-violet-300">
                      {application.applicant_code} · Identity redacted
                    </p>
                    <h2 className="mt-2 text-2xl font-black">{application.preferred_track}</h2>
                    <p className="mt-1 text-sm text-slate-500">Availability: {application.weekly_hours}</p>
                  </div>
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-black text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
                    {total}/100
                  </span>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  {[
                    ["Technical background", application.technical_background],
                    ["Strongest work sample", application.strongest_work_sample],
                    ["AI safety motivation", application.ai_safety_motivation],
                    ["Evidence reasoning example", application.evidence_reasoning_example],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-300">{value}</p>
                    </div>
                  ))}
                </div>

                {application.github_or_portfolio && (
                  <p className="mt-4 break-all text-sm">
                    <span className="font-black">Work-sample link:</span>{" "}
                    <a href={application.github_or_portfolio} target="_blank" rel="noreferrer" className="text-brand-600 underline dark:text-brand-400">
                      {application.github_or_portfolio}
                    </a>
                  </p>
                )}

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ["demonstratedTechnicalAbility", "Demonstrated technical ability", 20],
                    ["evidenceDiscipline", "Evidence discipline", 20],
                    ["motivationAndFieldFit", "Motivation & field fit", 20],
                    ["capacityToComplete", "Capacity to complete", 15],
                    ["learningTrajectory", "Learning trajectory", 15],
                    ["responsiblePractice", "Responsible practice", 10],
                  ].map(([key, label, max]) => (
                    <label key={String(key)} className="text-sm font-bold">
                      {label} / {max}
                      <input
                        type="number"
                        min={0}
                        max={Number(max)}
                        value={review[key as keyof ReviewDraft] as number}
                        onChange={(event) =>
                          updateReview(
                            application.id,
                            key as keyof ReviewDraft,
                            Number(event.target.value) as never
                          )
                        }
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700"
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[240px_1fr]">
                  <label className="text-sm font-bold">
                    Reviewer recommendation
                    <select
                      value={review.recommendation}
                      onChange={(event) =>
                        updateReview(
                          application.id,
                          "recommendation",
                          event.target.value as ReviewDraft["recommendation"]
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700"
                    >
                      <option value="advance">Advance</option>
                      <option value="hold">Hold for discussion</option>
                      <option value="do-not-advance">Do not advance</option>
                    </select>
                  </label>
                  <label className="text-sm font-bold">
                    Evidence / reviewer notes
                    <textarea
                      rows={4}
                      value={review.notes}
                      onChange={(event) => updateReview(application.id, "notes", event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => submitReview(application.id)}
                  disabled={actionId === application.id}
                  className="mt-6 rounded-xl bg-violet-700 px-6 py-3 font-black text-white disabled:opacity-50"
                >
                  Save structured review
                </button>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
