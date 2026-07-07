import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { instructors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Instructors",
  description:
    "Meet the expert instructors behind FINTIGEN Academy's courses in programming, AI, data, design, and digital business.",
};

export default function InstructorsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Instructors"
        title="Learn from Industry Experts"
        description="Our instructors bring years of real-world experience from leading companies and successful ventures across Africa and beyond."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2">
          {instructors.map((instructor) => (
            <article
              key={instructor.name}
              className="rounded-2xl border border-slate-200 p-8 dark:border-slate-800"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white">
                  {instructor.initials}
                </div>
                <div>
                  <h2 className="text-lg font-bold">{instructor.name}</h2>
                  <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                    {instructor.role}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                {instructor.bio}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {instructor.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-4 text-sm">
                {instructor.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
