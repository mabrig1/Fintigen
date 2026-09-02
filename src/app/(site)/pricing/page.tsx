import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "FINTIGEN Academy pricing — Digital Skills Foundation is free; specialist courses are paid, with premium and corporate options.",
};

const plans = [
  {
    name: "Foundation",
    price: "₦0",
    period: "free",
    description: "One complete free entry program for learners building essential digital confidence.",
    features: [
      "Digital Skills Foundation & Employability Bootcamp",
      "8 weeks of practical beginner training",
      "Productivity, online safety, communication and content creation",
      "Responsible AI fundamentals",
      "Practical labs and progress tracking",
      "Digital portfolio capstone",
    ],
    cta: "Start Foundation Free",
    href: "/learn/digital-skills-foundation",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "₦15,000",
    period: "per month",
    description: "Advance beyond the Foundation with paid specialist training and premium learning services.",
    features: [
      "Paid specialist course access",
      "AI, software, data, design and digital-business pathways",
      "Verified certificates",
      "Assignments and quizzes with feedback",
      "Career Center and job-board access",
      "Live classes and mentorship sessions",
      "Downloadable resources",
    ],
    cta: "Choose Premium",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Corporate",
    price: "Custom",
    period: "per team",
    description: "Train teams with tailored specialist programs, reporting, and implementation support.",
    features: [
      "Custom learning paths",
      "Team progress dashboards",
      "Dedicated account support",
      "Onsite or virtual workshops",
      "Bulk certificate verification",
      "Organization-specific implementation tracks",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Pricing"
        title="One Free Foundation. Paid Professional Advancement."
        description="Digital Skills Foundation is free. Every specialist course is paid, with scholarship and admin-approved access available where applicable."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Link
          href="/courses/mabrig-full-stack-founder-pro"
          className="mb-12 block rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-8 text-white shadow-xl transition hover:shadow-2xl sm:p-10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Flagship paid course</p>
              <h2 className="mt-3 text-3xl font-black">Mabrig Full-Stack Founder Pro</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                The 12-week flagship program is sold separately and includes a production capstone plus the Full-Stack Founder implementation vault.
              </p>
            </div>
            <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-2xl font-black">₦100,000 <span className="text-xs font-semibold text-slate-400">NG</span></p>
              <p className="mt-1 text-2xl font-black">$199 <span className="text-xs font-semibold text-slate-400">International</span></p>
              <p className="mt-3 text-sm font-bold text-amber-300">View flagship course →</p>
            </div>
          </div>
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-brand-500 shadow-xl ring-2 ring-brand-500"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Professional Path
                </span>
              )}
              <h2 className="text-lg font-bold">{plan.name}</h2>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-slate-500">{plan.period}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{plan.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm">
                    <span className="text-brand-600 dark:text-brand-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`mt-8 rounded-lg px-6 py-3 text-center font-semibold transition ${
                  plan.highlighted
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : "border border-slate-300 hover:border-brand-500 hover:text-brand-600 dark:border-slate-700"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 rounded-2xl bg-slate-50 p-8 sm:grid-cols-3 dark:bg-slate-900/50">
          <div>
            <h3 className="font-semibold">🎁 Referral Rewards</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Invite learners and earn rewards when referred students purchase eligible paid programs.</p>
          </div>
          <div>
            <h3 className="font-semibold">🤝 Affiliate Program</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Earn commission promoting FINTIGEN paid specialist courses to your audience.</p>
          </div>
          <div>
            <h3 className="font-semibold">🎓 Scholarship Program</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Approved learners can receive scholarship or admin-granted access to selected paid programs. <Link href="/contact" className="font-semibold text-brand-600 dark:text-brand-400">Apply here</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
