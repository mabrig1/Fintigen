import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Skills Training — FINTIGEN Academy",
  description:
    "Practical, mobile-friendly digital skills training for students, job seekers, entrepreneurs, and first-time technology learners across Africa.",
};

const modules = [
  ["01", "Digital Foundations", "Devices, files, browsers, search, cloud storage, and information checking."],
  ["02", "Productivity Tools", "Documents, spreadsheets, presentations, file sharing, and collaboration."],
  ["03", "Professional Communication", "Email, messaging, online meetings, calendars, and remote-work habits."],
  ["04", "Cyber Safety", "Passwords, MFA, privacy, phishing, scams, backups, and account protection."],
  ["05", "Content Creation", "Mobile-first graphics, simple video, personal branding, and digital portfolios."],
  ["06", "AI Productivity", "Responsible prompting, research support, planning, drafting, verification, and privacy."],
  ["07", "Digital Income", "Freelancing, remote jobs, service packaging, client safety, and entrepreneurship."],
  ["08", "Portfolio Capstone", "Publish evidence of your skills and build a focused 90-day growth plan."],
];

const pathways = [
  { title: "Web & Software", href: "/courses", detail: "HTML, CSS, JavaScript, Python, Next.js and software engineering." },
  { title: "AI & Automation", href: "/learn/generative-ai", detail: "Generative AI, prompt engineering, agentic AI and machine learning." },
  { title: "Data & Analytics", href: "/learn/data-science-analytics-engineering", detail: "Spreadsheets, SQL, Python, Power BI, analytics and data engineering." },
  { title: "Digital Business", href: "/courses", detail: "Digital marketing, freelancing, social media, e-commerce and online business." },
];

export default function DigitalSkillsPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-brand-50 px-4 py-20 dark:border-slate-800 dark:from-indigo-950/30 dark:via-slate-950 dark:to-brand-950/20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            Free foundation programme
          </span>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
            <div>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
                Digital Skills That Move You From Consumer to Creator
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                An 8-week, practical training pathway for students, job seekers, entrepreneurs, and beginners. Learn the everyday digital skills needed for school, work, business, online safety, AI productivity, freelancing, and deeper technology training.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/learn/digital-skills-foundation" className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700">
                  Start Training Free
                </Link>
                <Link href="/register" className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                  Create Student Account
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-indigo-200 bg-white p-6 shadow-xl shadow-indigo-100/50 dark:border-indigo-900 dark:bg-slate-900 dark:shadow-none">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Built for real conditions</p>
              <div className="mt-5 space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <p>📱 Mobile-first and usable on ordinary smartphones</p>
                <p>📶 Designed for low-bandwidth learners</p>
                <p>🧪 Practical labs in every module</p>
                <p>✅ Quizzes and saved progress</p>
                <p>🎓 Completion certificate</p>
                <p>💼 Portfolio and income pathway at the end</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-semibold text-brand-600">8-module foundation</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">What learners will actually do</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">This is not a list of videos. Learners create documents, spreadsheets, security checklists, professional emails, digital content, AI workflows, service offers, and a final portfolio.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {modules.map(([number, title, detail]) => (
              <article key={number} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-bold text-brand-700 dark:bg-brand-950 dark:text-brand-300">{number}</span>
                  <div>
                    <h3 className="font-bold text-slate-950 dark:text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-4 py-16 dark:border-slate-800 dark:bg-slate-900/40 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight">Choose your next specialization</h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">The foundation course is the front door. After completing it, learners can move into a focused FINTIGEN pathway and build deeper job-ready evidence.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pathways.map((pathway) => (
              <Link key={pathway.title} href={pathway.href} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-brand-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
                <h3 className="font-bold group-hover:text-brand-600">{pathway.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{pathway.detail}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-brand-600">Explore pathway →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-slate-950 px-6 py-10 text-center text-white sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-300">Start with what you have</p>
          <h2 className="mt-3 text-3xl font-bold">A phone, internet connection, and consistent practice are enough to begin.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Finish the practical labs, save your work, and graduate with evidence you can show to employers, clients, mentors, and future training programmes.</p>
          <Link href="/learn/digital-skills-foundation" className="mt-7 inline-flex rounded-lg bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-400">
            Begin Module 1
          </Link>
        </div>
      </section>
    </main>
  );
}
