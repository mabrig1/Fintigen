import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { coreValues } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "FINTIGEN Academy's story, mission, vision, and core values — equipping Africans with world-class digital and technology skills.",
};

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About Us"
        title="Our Story"
        description="FINTIGEN — where Finance, Technology, Innovation, and the next Generation meet."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold">What FINTIGEN Means</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          FINTIGEN stands for <strong>Fin</strong>ance, <strong>T</strong>
          echnology, <strong>I</strong>nnovation, and the next{" "}
          <strong>Gen</strong>eration. We were founded on a simple belief: that
          Africa&apos;s greatest resource is its young people, and that access
          to world-class digital skills should not depend on where you were
          born. FINTIGEN Academy exists to close that gap — delivering
          practical, career-focused technology education to learners across
          the continent and beyond.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 dark:border-brand-800 dark:bg-brand-900/20">
            <h3 className="text-xl font-bold text-brand-700 dark:text-brand-300">
              🎯 Our Mission
            </h3>
            <p className="mt-3 text-lg text-slate-700 dark:text-slate-300">
              To equip Africans with world-class digital and technology skills.
            </p>
          </div>
          <div className="rounded-2xl border border-accent-400/40 bg-amber-50 p-8 dark:bg-amber-900/10">
            <h3 className="text-xl font-bold text-amber-700 dark:text-amber-300">
              🔭 Our Vision
            </h3>
            <p className="mt-3 text-lg text-slate-700 dark:text-slate-300">
              To become Africa&apos;s leading online technology and innovation
              academy.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold">Our Core Values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <div
                key={value.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{value.name}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
