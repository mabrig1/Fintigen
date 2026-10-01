import type { Metadata } from "next";
import Link from "next/link";
import FellowshipApplicationDraft from "@/components/fellowship/FellowshipApplicationDraft";

export const metadata: Metadata = {
  title: "Prepare an AI Safety Fellowship Application — FINTIGEN",
  description:
    "Credential-light application prototype for FINTIGEN's proposed Africa AI Safety & Security Builder Fellowship.",
};

export default function FellowshipApplyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <Link href="/ai-safety-fellowship" className="text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400">
        ← Fellowship pilot
      </Link>
      <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
        Credential-light selection prototype
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
        Prepare a Fellowship Application
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
        This prototype demonstrates an ability-first intake process built around technical work, reasoning, motivation, and realistic participation capacity rather than formal education credentials.
      </p>
      <div className="mt-10">
        <FellowshipApplicationDraft />
      </div>
    </main>
  );
}
