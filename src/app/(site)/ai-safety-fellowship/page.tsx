import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Africa AI Safety & Security Builder Fellowship — Pilot",
  description:
    "FINTIGEN's public-interest pilot pathway for African software builders entering AI safety, evaluation, information security, and human oversight.",
};

const outcomes = [
  "Understand advanced-AI risk without overstating uncertain claims",
  "Build defensible threat models for tool-using agents",
  "Design reproducible model and agent evaluations",
  "Practice evidence-rich human oversight and control analysis",
  "Apply defensive information-security principles to AI systems",
  "Ship a mentor-reviewable AI assurance capstone",
];

const pilotMetrics = [
  "Pre/post technical assessment",
  "Course and lab completion",
  "Quality of reproducible capstone evidence",
  "Mentor review against a predefined rubric",
  "Public work samples produced with learner consent",
  "Follow-on study, research, projects, fellowships, or relevant roles",
];

export default function AiSafetyFellowshipPage() {
  return (
    <main className="bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
            Public-interest pilot · Grant-positioned
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
            Africa AI Safety &amp; Security Builder Fellowship
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            A proposed FINTIGEN pathway for technically capable African builders who want to move from general software or AI development into AI assurance, model and agent evaluations, information security, and meaningful human oversight.
          </p>
          <div className="mt-7 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-sm leading-6 text-amber-100">
            <strong>Pilot status:</strong> curriculum prototype in development. No funded cohort, mentor network, or participant outcomes are claimed yet. The open course is the first implementation step.
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/learn/ai-safety-security" className="rounded-xl bg-emerald-400 px-6 py-3 font-black text-slate-950 hover:bg-emerald-300">
              Start the Free Course →
            </Link>
            <Link href="/courses" className="rounded-xl border border-slate-700 px-6 py-3 font-bold hover:border-slate-500">
              View FINTIGEN Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">Who it is for</p>
            <h2 className="mt-3 text-2xl font-black">Ability first, not credentials first.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The proposed fellowship is intended for software engineers, cybersecurity practitioners, technical postgraduate learners, and strong self-taught builders. A formal university degree would not be required by the program itself.
            </p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">Pilot model</p>
            <h2 className="mt-3 text-2xl font-black">Open course → selective cohort → career bridge.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The first layer is freely accessible learning. A funded pilot would add selective cohort work, specialist mentors, structured capstone review, and connections to relevant research, security, evaluation, or governance-supporting pathways.
            </p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">Safety standard</p>
            <h2 className="mt-3 text-2xl font-black">Evidence over hype.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Learners are expected to separate facts from assumptions, work in authorized or synthetic environments, preserve uncertainty, report negative results, and avoid treating model output or automated scans as proof.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">Learning outcomes</p>
          <h2 className="mt-3 text-3xl font-black">What a strong participant should be able to demonstrate</h2>
          <div className="mt-7 space-y-3">
            {outcomes.map((outcome) => (
              <div key={outcome} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-slate-200">
                ✓ {outcome}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">Evaluation</p>
          <h2 className="mt-3 text-3xl font-black">A funded pilot would measure more than enrollment.</h2>
          <div className="mt-7 space-y-3">
            {pilotMetrics.map((metric) => (
              <div key={metric} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-slate-200">
                {metric}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">Current implementation step</p>
          <h2 className="mt-3 text-3xl font-black">The public course is live in the codebase first.</h2>
          <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-300">
            Mentors, cohort size, participant support, partnerships, and outcomes will only be shown as active after they are actually secured. This keeps the fellowship useful to funders and learners without inventing traction.
          </p>
          <Link href="/learn/ai-safety-security" className="mt-8 inline-block rounded-xl bg-white px-7 py-3 font-black text-slate-950 hover:bg-slate-200">
            Open AI Safety &amp; Security Course →
          </Link>
        </div>
      </section>
    </main>
  );
}
