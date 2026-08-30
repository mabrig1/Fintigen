import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { futureSkillCourses } from "@/lib/courses/future-skills";

export const metadata: Metadata = {
  title: "Future Skills Academy",
  description:
    "Future-facing FINTIGEN courses in responsible AI, automation, cloud, cybersecurity, quantum, green edge technology, decentralized systems, robotics, and spatial computing.",
};

const alreadyCovered = [
  "Agentic AI & prompt orchestration",
  "Generative AI & machine learning",
  "Data science, analytics & visualization",
  "UI/UX design",
  "Digital-skills foundations",
];

export default function FutureSkillsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="FINTIGEN FUTURE SKILLS"
        title="Learn the capabilities that outlast today's tools"
        description="A curated frontier curriculum built to complement—not duplicate—the courses already in FINTIGEN Academy. Each track includes practical labs, quizzes, saved progress, and a portfolio capstone."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {futureSkillCourses.map((course) => (
            <article
              key={course.slug}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
                  {course.category}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                  {course.horizon}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-bold tracking-tight">{course.shortTitle}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {course.summary}
              </p>
              <div className="mt-5 flex items-center justify-between gap-3 text-xs text-slate-500">
                <span>{course.meta.duration}</span>
                <span>{course.level}</span>
              </div>
              <Link
                href={`/learn/future/${course.slug}`}
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Start interactive course →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">No duplicate curriculum</p>
            <h2 className="mt-2 text-2xl font-bold">Existing strengths stay where they belong</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              The frontier catalog intentionally does not create another version of subjects FINTIGEN already teaches well. Instead, it extends those foundations into adjacent roles and technologies.
            </p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {alreadyCovered.map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950">
                ✓ {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Portfolio first</p>
        <h2 className="mt-2 text-3xl font-bold">Finish with proof, not just a certificate</h2>
        <p className="mx-auto mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
          Every track ends with a small capstone designed around evidence: the problem, constraints, architecture, test cases, risks, results, and what you would improve next.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/digital-skills" className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold dark:border-slate-700">
            Start with Digital Skills
          </Link>
          <Link href="/courses" className="rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white">
            Browse all existing courses
          </Link>
        </div>
      </section>
    </main>
  );
}
