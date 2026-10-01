"use client";

import { useState } from "react";

type ApplicationDraft = {
  schemaVersion: 1;
  savedAt: string;
  name: string;
  country: string;
  email: string;
  githubOrPortfolio: string;
  technicalBackground: string;
  strongestWorkSample: string;
  aiSafetyMotivation: string;
  evidenceReasoningExample: string;
  preferredTrack: "agent-security" | "evaluations" | "human-oversight" | "other";
  weeklyHours: string;
  accessibilityNeeds: string;
  consentToContactIfPilotOpens: boolean;
};

type ApiEnvelope<T> = {
  status?: string;
  data?: T;
  error?: string;
  message?: string;
};

type IntakeStatus = {
  cycle: string;
  intake_open: boolean;
  selection_model: string;
  automated_admission_decisions: boolean;
  formal_degree_required: boolean;
};

type SubmissionResult = {
  applicant_code: string;
  cycle: string;
  status: string;
  human_review_required: boolean;
  message: string;
};

const storageKey = "fintigen-ai-safety-fellowship-application-draft-v1";
const applicantCodeKey = "fintigen-ai-safety-applicant-code";

const emptyDraft: Omit<ApplicationDraft, "schemaVersion" | "savedAt"> = {
  name: "",
  country: "",
  email: "",
  githubOrPortfolio: "",
  technicalBackground: "",
  strongestWorkSample: "",
  aiSafetyMotivation: "",
  evidenceReasoningExample: "",
  preferredTrack: "agent-security",
  weeklyHours: "",
  accessibilityNeeds: "",
  consentToContactIfPilotOpens: false,
};

function loadDraft() {
  if (typeof window === "undefined") return emptyDraft;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return emptyDraft;
    const parsed = JSON.parse(raw) as ApplicationDraft;
    const { schemaVersion: _schemaVersion, savedAt: _savedAt, ...fields } = parsed;
    return { ...emptyDraft, ...fields };
  } catch {
    return emptyDraft;
  }
}

function exportDraft(draft: ApplicationDraft) {
  const blob = new Blob([JSON.stringify(draft, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "fintigen-ai-safety-fellowship-application-draft.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

async function readEnvelope<T>(response: Response) {
  const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;
  if (!response.ok) {
    throw new Error(payload.message || payload.error || `Request failed (${response.status}).`);
  }
  if (!payload.data) throw new Error("The server returned an empty response.");
  return payload.data;
}

export default function FellowshipApplicationDraft() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [draft, setDraft] = useState(() => loadDraft());
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [liveMessage, setLiveMessage] = useState("");
  const [liveError, setLiveError] = useState("");
  const [applicantCode, setApplicantCode] = useState(() =>
    typeof window === "undefined" ? "" : localStorage.getItem(applicantCodeKey) || ""
  );

  function update<K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function buildRecord(): ApplicationDraft {
    return {
      schemaVersion: 1,
      savedAt: new Date().toISOString(),
      ...draft,
    };
  }

  function saveLocal() {
    const record = buildRecord();
    localStorage.setItem(storageKey, JSON.stringify(record));
    setSavedAt(record.savedAt);
  }

  function download() {
    exportDraft(buildRecord());
  }

  async function submitLive() {
    if (!apiBase) {
      setLiveError("The fellowship API is not configured on this deployment.");
      return;
    }

    setSubmitting(true);
    setLiveError("");
    setLiveMessage("");
    try {
      const intake = await readEnvelope<IntakeStatus>(
        await fetch(`${apiBase}/fellowship/intake`, { cache: "no-store" })
      );

      if (!intake.intake_open) {
        setLiveMessage(
          `The ${intake.cycle} intake is currently closed. Your draft remains only in this browser unless you export it.`
        );
        return;
      }

      const result = await readEnvelope<SubmissionResult>(
        await fetch(`${apiBase}/fellowship/applications`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        })
      );

      localStorage.setItem(applicantCodeKey, result.applicant_code);
      localStorage.setItem(storageKey, JSON.stringify(buildRecord()));
      setApplicantCode(result.applicant_code);
      setLiveMessage(
        `Application received for human review. Applicant code: ${result.applicant_code}.`
      );
    } catch (error) {
      setLiveError(error instanceof Error ? error.message : "Could not submit the application.");
    } finally {
      setSubmitting(false);
    }
  }

  const fieldsComplete = Boolean(
    draft.name.trim() &&
    draft.country.trim() &&
    draft.email.trim() &&
    draft.technicalBackground.trim().length >= 40 &&
    draft.strongestWorkSample.trim().length >= 40 &&
    draft.aiSafetyMotivation.trim().length >= 40 &&
    draft.evidenceReasoningExample.trim().length >= 40 &&
    draft.weeklyHours.trim()
  );

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-amber-300 bg-amber-50 p-6 dark:border-amber-900/60 dark:bg-amber-950/20">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">
          Application prototype — intake closed unless explicitly activated
        </p>
        <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">
          Drafts stay in this browser unless you explicitly press the live-submission button. The backend independently checks whether a real fellowship intake has been opened and rejects submissions while intake is closed.
        </p>
        {applicantCode && (
          <p className="mt-3 text-sm font-black text-emerald-700 dark:text-emerald-300">
            Saved applicant code: {applicantCode}
          </p>
        )}
      </section>

      <section className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-bold">
            Name
            <input value={draft.name} onChange={(e) => update("name", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700" />
          </label>
          <label className="text-sm font-bold">
            Country
            <input value={draft.country} onChange={(e) => update("country", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700" />
          </label>
          <label className="text-sm font-bold">
            Email
            <input type="email" value={draft.email} onChange={(e) => update("email", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700" />
          </label>
          <label className="text-sm font-bold">
            GitHub or portfolio URL
            <input value={draft.githubOrPortfolio} onChange={(e) => update("githubOrPortfolio", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700" />
          </label>
        </div>

        <label className="text-sm font-bold">
          Technical background
          <span className="mt-1 block text-xs font-normal text-slate-500">Degrees are not requested. Describe what you can build, test, analyze, or secure.</span>
          <textarea value={draft.technicalBackground} onChange={(e) => update("technicalBackground", e.target.value)} rows={5} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700" />
        </label>

        <label className="text-sm font-bold">
          Strongest technical work sample
          <span className="mt-1 block text-xs font-normal text-slate-500">Describe one project, repository, analysis, or security/evaluation artifact and your individual contribution.</span>
          <textarea value={draft.strongestWorkSample} onChange={(e) => update("strongestWorkSample", e.target.value)} rows={5} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700" />
        </label>

        <label className="text-sm font-bold">
          Why AI safety / assurance?
          <textarea value={draft.aiSafetyMotivation} onChange={(e) => update("aiSafetyMotivation", e.target.value)} rows={5} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700" />
        </label>

        <label className="text-sm font-bold">
          Evidence reasoning example
          <span className="mt-1 block text-xs font-normal text-slate-500">Describe a time evidence caused you to revise a technical belief, design, or conclusion.</span>
          <textarea value={draft.evidenceReasoningExample} onChange={(e) => update("evidenceReasoningExample", e.target.value)} rows={5} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700" />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-bold">
            Preferred learning track
            <select value={draft.preferredTrack} onChange={(e) => update("preferredTrack", e.target.value as typeof draft.preferredTrack)} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700">
              <option value="agent-security">Agent security</option>
              <option value="evaluations">Model / agent evaluations</option>
              <option value="human-oversight">Human oversight & control</option>
              <option value="other">Other / undecided</option>
            </select>
          </label>
          <label className="text-sm font-bold">
            Realistic weekly availability
            <input value={draft.weeklyHours} onChange={(e) => update("weeklyHours", e.target.value)} placeholder="e.g. 6 hours/week" className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700" />
          </label>
        </div>

        <label className="text-sm font-bold">
          Accessibility or participation needs (optional)
          <textarea value={draft.accessibilityNeeds} onChange={(e) => update("accessibilityNeeds", e.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 font-normal dark:border-slate-700" />
        </label>

        <label className="flex gap-3 text-sm leading-6">
          <input type="checkbox" checked={draft.consentToContactIfPilotOpens} onChange={(e) => update("consentToContactIfPilotOpens", e.target.checked)} className="mt-1" />
          <span>I would like to be contacted if a real fellowship pilot opens.</span>
        </label>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={saveLocal} className="rounded-xl bg-brand-600 px-6 py-3 font-black text-white hover:bg-brand-700">
            Save draft in this browser
          </button>
          <button type="button" disabled={!fieldsComplete} onClick={download} className="rounded-xl border border-slate-300 px-6 py-3 font-black disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700">
            Export application draft
          </button>
          <button
            type="button"
            disabled={!fieldsComplete || submitting}
            onClick={submitLive}
            className="rounded-xl bg-emerald-600 px-6 py-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Checking intake…" : "Check intake & submit live"}
          </button>
        </div>
        {savedAt && <p className="text-xs text-slate-500">Saved locally at {new Date(savedAt).toLocaleString()}.</p>}
        {liveMessage && <p className="rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">{liveMessage}</p>}
        {liveError && <p className="rounded-xl bg-rose-50 p-4 text-sm font-semibold text-rose-800 dark:bg-rose-950/30 dark:text-rose-200">{liveError}</p>}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">Human reviewer rubric</p>
        <h2 className="mt-3 text-2xl font-black">Proposed selection criteria</h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          The system does not automatically accept, reject, or rank applicants. A real cohort uses structured human review and records evidence for each decision.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["Demonstrated technical ability", "Can the applicant show inspectable work or credible technical reasoning?"],
            ["Evidence discipline", "Do they separate observation, inference, uncertainty, and unsupported claims?"],
            ["Motivation and field fit", "Is the interest specifically connected to AI assurance, evaluations, security, or oversight rather than generic AI enthusiasm?"],
            ["Capacity to complete", "Is the proposed weekly commitment realistic for a demanding project-based cohort?"],
            ["Learning trajectory", "Would structured training and mentorship plausibly unlock a stronger contribution path?"],
            ["Responsible practice", "Does the applicant show respect for authorization, privacy, safety, and responsible disclosure?"],
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
              <p className="font-black">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
