"use client";

import { useMemo, useState } from "react";
import {
  capstoneRubric,
  competencyLabels,
  fellowshipAssessmentQuestions,
  scoreFellowshipAssessment,
  type AssessmentStage,
  type FellowshipAssessmentResult,
} from "@/lib/fellowship-evaluation";

const storageKey = "fintigen-ai-safety-assessment-v1";

type SavedAssessments = Partial<Record<AssessmentStage, FellowshipAssessmentResult>>;

function loadSaved(): SavedAssessments {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "{}") as SavedAssessments;
  } catch {
    return {};
  }
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function FellowshipAssessment() {
  const [stage, setStage] = useState<AssessmentStage>("baseline");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [consent, setConsent] = useState(false);
  const [saved, setSaved] = useState<SavedAssessments>(() => loadSaved());
  const [result, setResult] = useState<FellowshipAssessmentResult | null>(null);

  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === fellowshipAssessmentQuestions.length;

  const comparison = useMemo(() => {
    if (!saved.baseline || !saved.final) return null;
    return saved.final.scorePercent - saved.baseline.scorePercent;
  }, [saved]);

  function submitAssessment() {
    if (!complete) return;
    const next = scoreFellowshipAssessment(stage, answers, consent);
    const nextSaved = { ...saved, [stage]: next };
    localStorage.setItem(storageKey, JSON.stringify(nextSaved));
    setSaved(nextSaved);
    setResult(next);
  }

  function resetCurrent() {
    setAnswers({});
    setResult(null);
    setConsent(false);
  }

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 dark:border-cyan-900/60 dark:bg-cyan-950/20 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
          Privacy-preserving pilot instrumentation
        </p>
        <h2 className="mt-3 text-2xl font-black">Baseline / final technical assessment</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
          This prototype stores responses only in this browser. It does not send answers to FINTIGEN or claim that a funded cohort exists. Exported records can later be submitted to an approved cohort system if one is deployed.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {(["baseline", "final"] as AssessmentStage[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setStage(value);
                resetCurrent();
              }}
              className={`rounded-xl px-5 py-2.5 text-sm font-black capitalize ${
                stage === value
                  ? "bg-cyan-700 text-white"
                  : "border border-cyan-300 bg-white text-cyan-800 dark:bg-slate-950 dark:text-cyan-200"
              }`}
            >
              {value} assessment
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        {fellowshipAssessmentQuestions.map((question, index) => (
          <article
            key={question.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
                {index + 1}. {competencyLabels[question.competency]}
              </p>
              {answers[question.id] !== undefined && (
                <span className="text-xs font-semibold text-emerald-600">Answered</span>
              )}
            </div>
            <h3 className="mt-3 text-lg font-bold">{question.prompt}</h3>
            <div className="mt-4 grid gap-3">
              {question.options.map((option, optionIndex) => (
                <label
                  key={option}
                  className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-4 hover:border-brand-400 dark:border-slate-800"
                >
                  <input
                    type="radio"
                    name={question.id}
                    checked={answers[question.id] === optionIndex}
                    onChange={() =>
                      setAnswers((current) => ({
                        ...current,
                        [question.id]: optionIndex,
                      }))
                    }
                    className="mt-1"
                  />
                  <span className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
        <label className="flex gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1"
          />
          <span>
            I would allow an approved future fellowship system to include this score in anonymized aggregate program metrics. This prototype does not transmit the data.
          </span>
        </label>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            disabled={!complete}
            onClick={submitAssessment}
            className="rounded-xl bg-brand-600 px-6 py-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Score {stage} assessment
          </button>
          <span className="text-sm text-slate-500">
            {answeredCount}/{fellowshipAssessmentQuestions.length} answered
          </span>
        </div>
      </section>

      {result && (
        <section className="rounded-3xl border border-emerald-300 bg-emerald-50 p-7 dark:border-emerald-900/60 dark:bg-emerald-950/20">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
            Assessment result
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-4">
            <p className="text-5xl font-black">{result.scorePercent}%</p>
            <p className="pb-1 text-slate-600 dark:text-slate-300">
              {result.totalCorrect}/{result.totalQuestions} correct
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {Object.entries(result.competencyScores).map(([key, value]) => (
              <div key={key} className="rounded-xl bg-white p-4 dark:bg-slate-950">
                <p className="text-sm font-bold">{competencyLabels[key as keyof typeof competencyLabels]}</p>
                <p className="mt-1 text-2xl font-black">{value.percent}%</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              downloadJson(`fintigen-ai-safety-${stage}-assessment.json`, result)
            }
            className="mt-6 rounded-xl border border-emerald-400 px-5 py-2.5 text-sm font-black text-emerald-800 dark:text-emerald-200"
          >
            Export assessment evidence (JSON)
          </button>
        </section>
      )}

      {(saved.baseline || saved.final) && (
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-black">Local progress evidence</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Baseline</p>
              <p className="text-3xl font-black">{saved.baseline?.scorePercent ?? "—"}{saved.baseline ? "%" : ""}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Final</p>
              <p className="text-3xl font-black">{saved.final?.scorePercent ?? "—"}{saved.final ? "%" : ""}</p>
            </div>
          </div>
          {comparison !== null && (
            <p className="mt-4 text-sm font-bold">
              Score change: {comparison > 0 ? "+" : ""}{comparison} percentage points.
              This is a descriptive learner-level change, not proof that the course caused the improvement.
            </p>
          )}
        </section>
      )}

      <section className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-950">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
          Capstone review instrument
        </p>
        <h2 className="mt-3 text-2xl font-black">Transparent 100-point assurance rubric</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
          A funded cohort can use this rubric for mentor review. The criteria are published in advance so participants know that evidence quality, reproducibility, safety practice, and honest limitations matter more than dramatic claims.
        </p>

        <div className="mt-7 space-y-5">
          {capstoneRubric.map((dimension) => (
            <article key={dimension.id} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-black">{dimension.label}</h3>
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-black text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                  {dimension.weight} points
                </span>
              </div>
              <div className="mt-4 grid gap-3 text-sm lg:grid-cols-3">
                <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/20">
                  <p className="font-black text-emerald-700 dark:text-emerald-300">Excellent</p>
                  <p className="mt-2 leading-6 text-slate-700 dark:text-slate-300">{dimension.excellent}</p>
                </div>
                <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-950/20">
                  <p className="font-black text-amber-700 dark:text-amber-300">Developing</p>
                  <p className="mt-2 leading-6 text-slate-700 dark:text-slate-300">{dimension.developing}</p>
                </div>
                <div className="rounded-xl bg-rose-50 p-4 dark:bg-rose-950/20">
                  <p className="font-black text-rose-700 dark:text-rose-300">Insufficient</p>
                  <p className="mt-2 leading-6 text-slate-700 dark:text-slate-300">{dimension.insufficient}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
