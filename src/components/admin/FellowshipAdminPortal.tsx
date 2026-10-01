"use client";

import { useState } from "react";
import { getAuthSession } from "@/lib/auth-client";

type FellowshipApplication = {
  id: string;
  applicant_code: string;
  cycle: string;
  name?: string;
  email?: string;
  country?: string;
  preferred_track: string;
  weekly_hours: string;
  status: string;
  reviewer_id?: string | null;
  contact_consent?: boolean;
  created_at?: string;
};

type ApiEnvelope<T> = {
  status?: string;
  data?: T;
  message?: string;
  error?: string;
};

async function parseEnvelope<T>(response: Response) {
  const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;
  if (!response.ok) {
    throw new Error(payload.message || payload.error || `Request failed (${response.status}).`);
  }
  if (!payload.data) throw new Error("The server returned an empty response.");
  return payload.data;
}

export default function FellowshipAdminPortal() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [applications, setApplications] = useState<FellowshipApplication[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [reviewerIds, setReviewerIds] = useState<Record<string, string>>({});
  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const [decisionNotes, setDecisionNotes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function adminFetch<T>(path: string, init: RequestInit = {}) {
    const session = getAuthSession();
    if (!session?.token || session.user?.role !== "admin") {
      throw new Error("Sign in through the FINTIGEN admin portal before using fellowship operations.");
    }
    if (!apiBase) throw new Error("NEXT_PUBLIC_API_URL is not configured.");

    return parseEnvelope<T>(
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

  async function loadApplications() {
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const query = statusFilter ? `?status=${encodeURIComponent(statusFilter)}` : "";
      const data = await adminFetch<{ applications: FellowshipApplication[]; total: number }>(
        `/fellowship/admin/applications${query}`
      );
      setApplications(data.applications || []);
      setNotice(`Loaded ${data.total ?? data.applications?.length ?? 0} fellowship application records.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load fellowship applications.");
    } finally {
      setLoading(false);
    }
  }

  async function assignReviewer(applicationId: string) {
    const reviewerId = (reviewerIds[applicationId] || "").trim();
    if (!reviewerId) {
      setError("Enter an instructor/admin MongoDB user ID before assigning a reviewer.");
      return;
    }

    setActionId(applicationId);
    setError("");
    setNotice("");
    try {
      await adminFetch(`/fellowship/admin/applications/${applicationId}/assign-reviewer`, {
        method: "POST",
        body: JSON.stringify({ reviewerId }),
      });
      setNotice("Reviewer assigned. The reviewer sees a de-identified review packet.");
      await loadApplications();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not assign reviewer.");
    } finally {
      setActionId("");
    }
  }

  async function saveDecision(applicationId: string) {
    const status = decisions[applicationId] || "";
    if (!status) {
      setError("Choose a decision status first.");
      return;
    }

    setActionId(applicationId);
    setError("");
    setNotice("");
    try {
      await adminFetch(`/fellowship/admin/applications/${applicationId}/decision`, {
        method: "PATCH",
        body: JSON.stringify({
          status,
          decisionNotes: decisionNotes[applicationId] || "",
        }),
      });
      setNotice(
        "Human decision recorded. Selected/waitlisted/declined decisions are rejected by the backend until at least one structured review exists."
      );
      await loadApplications();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save decision.");
    } finally {
      setActionId("");
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
        Admin-only · AI Safety Fellowship
      </p>
      <h1 className="mt-3 text-4xl font-black">Fellowship Operations</h1>
      <p className="mt-4 max-w-4xl leading-7 text-slate-600 dark:text-slate-300">
        Operational control for applications, reviewer assignment, and final human decisions. This interface does not rank candidates automatically and does not replace structured human review.
      </p>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-sm font-bold">
            Filter status
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="mt-2 block rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700"
            >
              <option value="">All statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under review</option>
              <option value="selected">Selected</option>
              <option value="waitlisted">Waitlisted</option>
              <option value="declined">Declined</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </label>
          <button
            type="button"
            onClick={loadApplications}
            disabled={loading}
            className="rounded-xl bg-cyan-700 px-6 py-3 font-black text-white disabled:opacity-50"
          >
            {loading ? "Loading…" : "Load live applications"}
          </button>
        </div>

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
      </section>

      <section className="mt-8 space-y-5">
        {applications.length === 0 && !loading ? (
          <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700">
            No application data loaded. Intake is expected to remain closed until an actual pilot is intentionally opened.
          </div>
        ) : (
          applications.map((application) => (
            <article
              key={application.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
                    {application.applicant_code} · {application.cycle}
                  </p>
                  <h2 className="mt-2 text-xl font-black">
                    {application.name || "Identity unavailable"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {application.email || "—"} · {application.country || "—"}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase dark:bg-slate-800">
                  {application.status.replaceAll("_", " ")}
                </span>
              </div>

              <div className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-slate-500">Preferred track</p>
                  <p className="font-bold">{application.preferred_track}</p>
                </div>
                <div>
                  <p className="text-slate-500">Weekly availability</p>
                  <p className="font-bold">{application.weekly_hours}</p>
                </div>
                <div>
                  <p className="text-slate-500">Reviewer</p>
                  <p className="break-all font-bold">{application.reviewer_id || "Not assigned"}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <p className="text-sm font-black">Assign structured human reviewer</p>
                  <input
                    value={reviewerIds[application.id] || ""}
                    onChange={(event) =>
                      setReviewerIds((current) => ({
                        ...current,
                        [application.id]: event.target.value,
                      }))
                    }
                    placeholder="Instructor/admin MongoDB user ID"
                    className="mt-3 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-sm dark:border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => assignReviewer(application.id)}
                    disabled={actionId === application.id}
                    className="mt-3 rounded-xl border border-cyan-600 px-4 py-2 text-sm font-black text-cyan-700 disabled:opacity-50 dark:text-cyan-300"
                  >
                    Assign reviewer
                  </button>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <p className="text-sm font-black">Human selection decision</p>
                  <select
                    value={decisions[application.id] || ""}
                    onChange={(event) =>
                      setDecisions((current) => ({
                        ...current,
                        [application.id]: event.target.value,
                      }))
                    }
                    className="mt-3 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-sm dark:border-slate-700"
                  >
                    <option value="">Choose status</option>
                    <option value="under_review">Under review</option>
                    <option value="selected">Selected</option>
                    <option value="waitlisted">Waitlisted</option>
                    <option value="declined">Declined</option>
                    <option value="withdrawn">Withdrawn</option>
                  </select>
                  <textarea
                    value={decisionNotes[application.id] || ""}
                    onChange={(event) =>
                      setDecisionNotes((current) => ({
                        ...current,
                        [application.id]: event.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="Decision evidence / notes"
                    className="mt-3 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-sm dark:border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => saveDecision(application.id)}
                    disabled={actionId === application.id}
                    className="mt-3 rounded-xl bg-brand-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
                  >
                    Save human decision
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
