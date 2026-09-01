import type { Metadata } from "next";
import Link from "next/link";
import { flagshipCourse } from "@/lib/courses/mabrig-full-stack-founder-pro";

export const metadata: Metadata = {
  title: "Mabrig Full-Stack Founder Pro — Build, Deploy & Scale Real Apps",
  description:
    "A 12-week flagship full-stack engineering course. Build, deploy, secure, and monetize a real application with Next.js, Node.js, MongoDB, Vercel, Cloudflare, and agentic AI.",
};

const faqs = [
  {
    question: "Is this course only for experienced programmers?",
    answer:
      "No. The pathway starts with product and web foundations, then advances into production engineering. Complete beginners should expect to follow the weekly practice schedule consistently.",
  },
  {
    question: "Why are the Nigeria and international prices different?",
    answer:
      "FINTIGEN uses regional pricing to keep the program accessible in Nigeria while maintaining a globally competitive one-time price for international learners. The curriculum and core resources are the same.",
  },
  {
    question: "Will I build a real application?",
    answer:
      "Yes. Every week produces evidence for one capstone application. Graduation requires a deployed workflow, security and recovery checks, a technical case study, and a launch plan.",
  },
  {
    question: "Do I need to pay for many cloud tools?",
    answer:
      "No. The course teaches a lean stack and responsible use of free tiers. You will also learn when a paid upgrade is justified by users, risk, reliability, or revenue.",
  },
];

export default function MabrigFullStackFounderProPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.24),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.18),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div>
            <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em]">
              <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-2 text-emerald-200">
                FINTIGEN Flagship Program
              </span>
              <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-2 text-amber-200">
                2026 Edition
              </span>
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
              {flagshipCourse.title}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Build, deploy, and scale a real full-stack application.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A practical founder-engineer program built from firsthand experience creating and maintaining 13 applications with a lean cloud stack. Move beyond generated code and learn to ship evidence-backed products people can trust and pay for.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-xl bg-white/5 px-4 py-3">12 weeks</span>
              <span className="rounded-xl bg-white/5 px-4 py-3">8–10 hours/week</span>
              <span className="rounded-xl bg-white/5 px-4 py-3">One production capstone</span>
              <span className="rounded-xl bg-white/5 px-4 py-3">Lifetime course access</span>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/register?course=mabrig-full-stack-founder-pro"
                className="rounded-xl bg-amber-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-amber-300"
              >
                Create Account to Enroll
              </Link>
              <Link
                href="/learn/mabrig-full-stack-founder-pro"
                className="rounded-xl border border-white/25 px-6 py-3.5 font-bold transition hover:bg-white/10"
              >
                Student Course Area
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
              Regional one-time pricing
            </p>
            <div className="mt-6 space-y-4">
              {[flagshipCourse.pricing.nigeria, flagshipCourse.pricing.international].map(
                (price) => (
                  <div
                    key={price.market}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold text-slate-200">{price.market}</span>
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
                        {price.note}
                      </span>
                    </div>
                    <p className="mt-3 text-4xl font-black">{price.amount}</p>
                    <p className="mt-1 text-sm text-slate-400">One payment · no monthly subscription</p>
                  </div>
                ),
              )}
            </div>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>✓ Full 12-week implementation pathway</li>
              <li>✓ Premium founder toolkit and reusable templates</li>
              <li>✓ Practical labs, quizzes, and capstone milestones</li>
              <li>✓ Verifiable completion certificate</li>
            </ul>
            <Link
              href="/contact"
              className="mt-7 block rounded-xl border border-emerald-300/30 px-5 py-3 text-center font-bold text-emerald-200 transition hover:bg-emerald-400/10"
            >
              Talk to Admissions
            </Link>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
              Transformation
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              From AI-assisted beginner to responsible founder-engineer.
            </h2>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
              You will learn how the visible interface, invisible infrastructure, business promise, and operational evidence work together. The goal is not more code. It is more verified value per dollar.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {flagshipCourse.outcomes.map((outcome, index) => (
              <div
                key={outcome}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-black text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                  {index + 1}
                </span>
                <p className="mt-4 font-semibold leading-7">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="curriculum" className="bg-slate-50 py-18 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
              12-week curriculum
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Every week produces evidence for your capstone.
            </h2>
          </div>
          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            {flagshipCourse.modules.map((module) => (
              <article
                key={module.week}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white dark:bg-brand-600">
                    {module.week}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{module.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {module.summary}
                    </p>
                    <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
                      Build evidence: {module.project}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-18 sm:px-6 lg:grid-cols-2">
        <article className="rounded-3xl bg-gradient-to-br from-brand-800 to-slate-950 p-8 text-white sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-200">
            Premium implementation vault
          </p>
          <h2 className="mt-3 text-3xl font-black">Resources you can reuse after graduation.</h2>
          <ul className="mt-7 space-y-4 text-sm leading-6 text-brand-50">
            {flagshipCourse.included.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-amber-300">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-200 p-8 dark:border-slate-800 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
            Graduation standard
          </p>
          <h2 className="mt-3 text-3xl font-black">Production readiness is evidence, not confidence.</h2>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
            Your certificate is earned through a working capstone and a release evidence bundle—not by watching videos alone.
          </p>
          <ol className="mt-7 space-y-4">
            {flagshipCourse.capstone.map((item, index) => (
              <li key={item} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-black text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                  {index + 1}
                </span>
                <span className="pt-1 text-sm leading-6">{item}</span>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="bg-slate-50 py-18 dark:bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-black tracking-tight">Questions before you enroll</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
              >
                <summary className="cursor-pointer list-none font-bold">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-brand-600 transition group-open:rotate-45 dark:text-brand-400">+</span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6">
        <div className="rounded-3xl bg-slate-950 px-7 py-12 text-center text-white sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">
            One idea can become one real product
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black sm:text-5xl">
            Stop collecting tutorials. Start building evidence.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            Enroll at ₦100,000 in Nigeria or $199 internationally and build the application your portfolio has been waiting for.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register?course=mabrig-full-stack-founder-pro"
              className="rounded-xl bg-amber-400 px-6 py-3.5 font-bold text-slate-950 hover:bg-amber-300"
            >
              Create Account to Enroll
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/25 px-6 py-3.5 font-bold hover:bg-white/10"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
