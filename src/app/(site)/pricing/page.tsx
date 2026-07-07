import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { pricingPlans } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "FINTIGEN Academy pricing — free courses, premium subscription, and corporate training packages. Pay with Paystack or Flutterwave.",
};

export default function PricingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Pricing"
        title="Simple Plans for Every Learner"
        description="Start free, upgrade when you're ready. Secure payments via Paystack and Flutterwave."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
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
                  Most Popular
                </span>
              )}
              <h2 className="text-lg font-bold">{plan.name}</h2>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-slate-500">{plan.period}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                {plan.description}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm">
                    <span className="text-brand-600 dark:text-brand-400">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.name === "Corporate" ? "/contact" : "/register"}
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
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Invite friends and earn discounts on your subscription for every
              student who joins.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">🤝 Affiliate Program</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Earn commission promoting FINTIGEN Academy courses to your
              audience.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">🎓 Scholarship Program</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Need-based scholarships available every cohort.{" "}
              <Link
                href="/contact"
                className="font-semibold text-brand-600 dark:text-brand-400"
              >
                Apply here
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
