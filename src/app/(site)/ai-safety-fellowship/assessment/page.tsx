import type { Metadata } from "next";
import Link from "next/link";
import FellowshipAssessment from "@/components/fellowship/FellowshipAssessment";

export const metadata: Metadata = {
  title: "AI Safety Fellowship Assessment Lab — FINTIGEN",
  description:
    "Privacy-preserving baseline/final assessment and transparent capstone rubric for FINTIGEN's proposed Africa AI Safety & Security Builder Fellowship.",
};

export default function FellowshipAssessmentPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <Link
        href="/ai-safety-fellowship"
        className="text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
      >
        ← Fellowship pilot
      </Link>
      <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
        Evaluation infrastructure
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
        Fellowship Assessment &amp; Capstone Lab
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
        This page prototypes how a funded cohort could measure technical learning and review capstone quality without relying on enrollment numbers or self-reported confidence alone.
      </p>
      <div className="mt-10">
        <FellowshipAssessment />
      </div>
    </main>
  );
}
