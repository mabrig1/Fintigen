import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Referral Program",
  description:
    "Join the FINTIGEN referral program and earn 15% commission on eligible successful paid-program referrals.",
};

export default function ReferralPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Fintigen Referral Program"
        title="Refer Learners. Earn 15% Commission."
        description="Share eligible FINTIGEN paid programs with people who need digital, AI, software, data, design, and future-skills training. Earn 15% commission on qualifying successful payments."
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-300 to-emerald-300 p-8 text-slate-950 shadow-xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.18em]">Start earning with Fintigen</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black sm:text-4xl">
            Join Our Referral Program — Start Earning
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-7">
            Refer a learner to an eligible paid FINTIGEN program. When the referred learner completes a qualifying successful payment, your referral earns a 15% commission, subject to the program terms.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/register?referral=join"
              className="rounded-xl bg-slate-950 px-6 py-3 font-black text-white transition hover:bg-slate-800"
            >
              Join the Referral Program
            </Link>
            <a
              href={brand.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border-2 border-slate-950/20 bg-white/50 px-6 py-3 font-bold transition hover:bg-white/75"
            >
              Referral Support
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <div className="text-3xl">1</div>
            <h3 className="mt-3 text-lg font-black">Join</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Create or use your FINTIGEN account and request referral-program activation.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <div className="text-3xl">2</div>
            <h3 className="mt-3 text-lg font-black">Refer</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Share eligible FINTIGEN paid courses with learners who genuinely need the training.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <div className="text-3xl">3</div>
            <h3 className="mt-3 text-lg font-black">Earn</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Earn 15% commission after an eligible referred payment is successfully completed and remains valid.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-900/50 sm:p-8">
          <h2 className="text-2xl font-black">Program terms at a glance</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
            <li>• Commission rate: <strong>15%</strong> on eligible successful referred payments.</li>
            <li>• Refunded, reversed, fraudulent, or otherwise invalid payments do not generate withdrawable commission.</li>
            <li>• Only eligible paid FINTIGEN programs qualify for commission.</li>
            <li>• Referral attribution must be recorded before or at the qualifying purchase.</li>
          </ul>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/register?referral=join"
            className="inline-block rounded-xl bg-brand-600 px-7 py-3.5 font-black text-white transition hover:bg-brand-700"
          >
            Join Now — Start Referring
          </Link>
          <p className="mt-3 text-sm text-slate-500">
            Already have an account? Use Referral Support to activate your participation.
          </p>
        </div>
      </section>
    </div>
  );
}
