import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { jobListings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Career Center",
  description:
    "Internships, remote jobs, and freelance opportunities for FINTIGEN Academy students — plus the job board.",
};

const typeStyles: Record<string, string> = {
  Internship:
    "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  "Remote Job":
    "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300",
  Freelance:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

const pathways = [
  {
    icon: "🎯",
    title: "Internship Opportunities",
    text: "Placements with partner companies across Africa to gain your first real-world experience.",
  },
  {
    icon: "🌍",
    title: "Remote Jobs",
    text: "Curated remote roles with African and global companies hiring our graduates.",
  },
  {
    icon: "💼",
    title: "Freelance Opportunities",
    text: "Project-based gigs to build your portfolio and income while you learn.",
  },
];

export default function CareerCenterPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Career Center"
        title="From Learning to Earning"
        description="Internships, remote jobs, and freelance opportunities — because a course is only as good as the career it launches."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {pathways.map((pathway) => (
            <div
              key={pathway.title}
              className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"
            >
              <div className="text-3xl">{pathway.icon}</div>
              <h2 className="mt-3 font-semibold">{pathway.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {pathway.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-bold">📋 Job Board</h2>
            <p className="text-sm text-slate-500">
              Open to Premium students and graduates
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {jobListings.map((job) => (
              <div
                key={`${job.title}-${job.company}`}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-semibold">{job.title}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${typeStyles[job.type]}`}
                    >
                      {job.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {job.company} · {job.location}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/register"
                  className="shrink-0 rounded-lg bg-brand-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Apply
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-600 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Hiring FINTIGEN Graduates?</h2>
          <p className="mx-auto mt-2 max-w-xl text-brand-100">
            Post opportunities on our job board and reach thousands of trained,
            certified candidates.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            Partner With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
