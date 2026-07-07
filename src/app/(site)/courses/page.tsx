import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { courseCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Browse FINTIGEN Academy courses across programming, AI, data, design, digital business, and career skills.",
};

const levelStyles: Record<string, string> = {
  Beginner:
    "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300",
  Intermediate:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Advanced: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

export default function CoursesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Courses"
        title="Master Digital Skills, Technology, and Innovation"
        description="Career-focused courses across six tracks — taught by experts, built around real projects."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Featured interactive course */}
        <Link
          href="/learn/agentic-ai"
          className="mb-12 block rounded-3xl bg-gradient-to-r from-brand-800 via-brand-700 to-slate-900 p-8 text-white transition hover:shadow-2xl sm:p-10"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-900">
              ⚡ New · Interactive
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
              Free Preview
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            Agentic AI &amp; Autonomous Agents
          </h2>
          <p className="mt-2 max-w-2xl text-brand-100/90">
            Our first fully interactive course — 8 modules of lessons, hands-on
            labs, and quizzes with live progress tracking. Build and
            orchestrate AI agents with LangGraph, AutoGen, and CrewAI.
          </p>
          <span className="mt-5 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-brand-700">
            Start Learning Now →
          </span>
        </Link>

        {/* Category quick nav */}
        <nav className="flex flex-wrap gap-2">
          {courseCategories.map((category) => (
            <a
              key={category.name}
              href={`#${category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:hover:text-brand-400"
            >
              {category.icon} {category.name}
            </a>
          ))}
        </nav>

        {courseCategories.map((category) => (
          <section
            key={category.name}
            id={category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            className="mt-14 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold">
              {category.icon} {category.name}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.courses.map((course) => (
                <div
                  key={course.slug}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${levelStyles[course.level]}`}
                    >
                      {course.level}
                    </span>
                    <span
                      className={`text-xs font-bold uppercase ${
                        course.price === "Free"
                          ? "text-brand-600 dark:text-brand-400"
                          : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {course.price}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{course.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">
                    {course.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      ⏱ {course.duration}
                    </span>
                    <Link
                      href={course.href ?? "/register"}
                      className="text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
                    >
                      {course.href ? "Start Learning →" : "Enroll →"}
                    </Link>
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
