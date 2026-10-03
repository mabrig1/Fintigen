import type { Metadata } from "next";
import Link from "next/link";
import { courseMeta, courseModules } from "@/lib/courses/ai-powered-academic-integrity";

export const metadata: Metadata = {
  title: "AI-Powered Academic Integrity — Professional Certificate",
  description:
    "Master generative AI for rigorous research and scholarly writing in a four-week FINTIGEN professional course for researchers, postgraduates, and academic leaders.",
};

const audiences = [
  "Doctoral candidates and postdoctoral researchers",
  "Graduate students and research assistants",
  "Early-career faculty and principal investigators",
  "Research librarians, integrity officers, and faculty developers",
  "Editors, grant writers, and academic consultants",
];

const portfolio = [
  "Research Lifecycle AI Map",
  "Versioned Prompt Architecture Library",
  "Three Claim–Evidence Verification Logs",
  "Disclosure Statement Suite + Academic Voice Charter",
  "Data-Use Decision Matrix",
  "Capstone AI-Augmented Research Workflow",
];

export default function AiPoweredAcademicIntegrityCoursePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.24),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.18),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-sky-200">
                Professional Certificate
              </span>
              <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-200">
                Researchers · Postgraduates · Academic Leaders
              </span>
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-sky-300">{courseMeta.title}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Use generative AI without surrendering scholarly judgment.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Build a defensible research workflow for prompting, source verification, disclosure, academic voice, privacy, bias, governance, and reproducibility.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-xl bg-white/5 px-4 py-3">4 weeks</span>
              <span className="rounded-xl bg-white/5 px-4 py-3">6–8 hours/week</span>
              <span className="rounded-xl bg-white/5 px-4 py-3">6 applied modules</span>
              <span className="rounded-xl bg-white/5 px-4 py-3">Portfolio assessment</span>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/checkout/ai-powered-academic-integrity" className="rounded-xl bg-amber-400 px-6 py-3.5 font-black text-slate-950 hover:bg-amber-300">
                Enroll for ₦35,000
              </Link>
              <Link href="/learn/ai-powered-academic-integrity" className="rounded-xl border border-white/25 px-6 py-3.5 font-bold hover:bg-white/10">
                Student Course Area
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Regional one-time pricing</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <p className="font-semibold text-slate-200">Nigeria</p>
                <p className="mt-3 text-4xl font-black">₦35,000</p>
                <p className="mt-1 text-sm text-slate-400">One payment · lifetime course access</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <p className="font-semibold text-slate-200">International</p>
                <p className="mt-3 text-4xl font-black">$79</p>
                <p className="mt-1 text-sm text-slate-400">Contact admissions for international payment</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>✓ Interactive lessons, labs, and quizzes</li>
              <li>✓ Research-integrity templates and decision tools</li>
              <li>✓ Capstone workflow and portfolio assessment</li>
              <li>✓ Verifiable Certificate of Mastery</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">Who should enroll</p>
            <h2 className="mt-3 text-3xl font-black">Built for people responsible for credible scholarship.</h2>
            <ul className="mt-6 space-y-3">
              {audiences.map((item) => <li key={item} className="rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-800">✓ {item}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">What you leave with</p>
            <h2 className="mt-3 text-3xl font-black">Evidence of competence, not just attendance.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {portfolio.map((item, index) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <span className="text-xs font-black text-brand-600">0{index + 1}</span>
                  <p className="mt-2 font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">Four-week curriculum</p>
          <h2 className="mt-3 text-3xl font-black">Six modules from task selection to audit-ready workflow.</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {courseModules.map((module) => (
              <article key={module.id} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white dark:bg-brand-600">W{module.week}</span>
                  <div>
                    <h3 className="text-lg font-bold">{module.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{module.objective}</p>
                    <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">Applied output: {module.lab.title}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-slate-950 px-7 py-12 text-center text-white sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">Research faster. Defend every decision.</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black sm:text-5xl">Build an AI workflow you can explain to a supervisor, reviewer, collaborator, or audit committee.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-slate-300">Enroll once for ₦35,000 in Nigeria or $79 internationally and retain lifetime access to the interactive course.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/checkout/ai-powered-academic-integrity" className="rounded-xl bg-amber-400 px-6 py-3.5 font-black text-slate-950 hover:bg-amber-300">Enroll Now</Link>
            <Link href="/contact" className="rounded-xl border border-white/25 px-6 py-3.5 font-bold hover:bg-white/10">Institutional / International Enquiry</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
