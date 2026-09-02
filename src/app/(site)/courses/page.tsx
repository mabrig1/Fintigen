import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { courseCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Start free with FINTIGEN Digital Skills Foundation, then advance through paid specialist courses in programming, AI, data, design, digital business, and career skills.",
};

const levelStyles: Record<string, string> = {
  Beginner: "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300",
  Intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Advanced: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

export default function CoursesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Courses"
        title="Start Free. Build a Foundation. Advance with Paid Specialist Training."
        description="Digital Skills Foundation is FINTIGEN's free entry program. Every specialist and advanced course is a paid program."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <section className="mb-12 overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-brand-50 p-8 shadow-sm dark:border-emerald-900/50 dark:from-emerald-950/30 dark:via-slate-950 dark:to-brand-950/20 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">100% Free Foundation Program</span>
                <span className="rounded-full border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-800 dark:text-emerald-300">8 weeks · Beginner friendly</span>
              </div>
              <h2 className="mt-5 text-3xl font-black sm:text-4xl">Digital Skills Foundation & Employability Bootcamp</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
                Build essential digital literacy, productivity, online safety, professional communication, content creation, responsible AI use, portfolio skills, and employability confidence before choosing a paid specialization.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span>✓ No tuition fee</span><span>✓ Mobile friendly</span><span>✓ Practical labs</span><span>✓ Progress tracking</span><span>✓ Portfolio capstone</span>
              </div>
            </div>
            <Link href="/learn/digital-skills-foundation" className="rounded-2xl bg-emerald-600 px-7 py-4 text-center font-black text-white transition hover:bg-emerald-700">
              Start Free Foundation →
            </Link>
          </div>
        </section>

        <Link
          href="/courses/mabrig-full-stack-founder-pro"
          className="mb-12 grid gap-6 rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-8 text-white shadow-xl transition hover:shadow-2xl lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Flagship paid program</p>
            <h2 className="mt-3 text-3xl font-black">Mabrig Full-Stack Founder Pro</h2>
            <p className="mt-2 font-semibold text-emerald-200">Build, Deploy &amp; Scale Real Apps</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              A 12-week founder-engineer pathway covering full-stack product development, deployment, security, AI features, operations, and monetization through one production capstone.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 lg:text-right">
            <p className="text-2xl font-black">₦100,000 <span className="text-sm font-medium text-slate-400">Nigeria</span></p>
            <p className="mt-1 text-2xl font-black">$199 <span className="text-sm font-medium text-slate-400">International</span></p>
            <span className="mt-4 inline-block rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950">View Paid Course →</span>
          </div>
        </Link>

        <section className="mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-900">Premium · Interactive</span>
            <span className="text-sm font-semibold text-slate-500">Advanced interactive courses require paid enrollment, scholarship access, or an admin grant.</span>
          </div>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            {[
              { href: "/learn/generative-ai", title: "Generative AI, Prompt Engineering & Enterprise AI Literacy", blurb: "LLMs, multimodal systems, RAG, fine-tuning, safety, and enterprise AI governance.", level: "Beginner → Intermediate", weeks: "8 modules" },
              { href: "/learn/agentic-ai", title: "Agentic AI & Autonomous Agents", blurb: "Build and orchestrate autonomous agents with LangGraph, AutoGen, CrewAI, guardrails, and evaluation.", level: "Intermediate → Advanced", weeks: "8 modules" },
              { href: "/learn/ml-engineering", title: "AI & Machine Learning Engineering", blurb: "Classical ML, deep learning, model optimization, deployment, monitoring, and MLOps.", level: "Intermediate → Advanced", weeks: "9 modules" },
              { href: "/learn/data-science-analytics-engineering", title: "Data Science, Analytics & Engineering", blurb: "SQL, Python, Spark, Databricks, Delta Lake, Power BI, Tableau, and production data pipelines.", level: "Beginner → Intermediate", weeks: "8 modules" },
            ].map((course) => (
              <Link key={course.href} href={course.href} className="flex flex-col rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-slate-900 p-8 text-white transition hover:shadow-2xl">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-200">{course.level} · {course.weeks}</span>
                  <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-slate-950">PAID</span>
                </div>
                <h2 className="mt-3 text-xl font-bold sm:text-2xl">{course.title}</h2>
                <p className="mt-2 flex-1 text-sm text-brand-100/90">{course.blurb}</p>
                <span className="mt-5 inline-block self-start rounded-lg bg-white px-6 py-3 font-semibold text-brand-700">View Premium Course →</span>
              </Link>
            ))}
          </div>
        </section>

        <nav className="flex flex-wrap gap-2">
          {courseCategories.map((category) => (
            <a key={category.name} href={`#${category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:hover:text-brand-400">
              {category.icon} {category.name}
            </a>
          ))}
        </nav>

        {courseCategories.map((category) => (
          <section key={category.name} id={category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="mt-14 scroll-mt-24">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">{category.icon} {category.name}</h2>
              <span className="text-xs font-black uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">Paid specialist courses</span>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.courses.map((course) => (
                <div key={course.slug} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${levelStyles[course.level]}`}>{course.level}</span>
                    <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400">Paid</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{course.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{course.description}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-sm text-slate-500">⏱ {course.duration}</span>
                    <Link href={course.href ?? "/pricing"} className="text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">View Paid Course →</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
