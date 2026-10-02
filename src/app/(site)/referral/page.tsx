import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Referral Program",
  description:
    "Join the FINTIGEN referral program, access your dedicated referral growth workstation, and earn 15% commission on eligible successful paid-program referrals.",
};

const toolkit = [
  "Smart referral links",
  "WhatsApp conversion builder",
  "Social caption studio",
  "Personalized poster studio",
  "8s / 15s / 30s video scripts",
  "Remotion + PixVerse + fal + InVideo blueprints",
  "Campaign planner",
  "Lead CRM Lite",
  "15% earnings calculator",
  "Performance & conversion center",
];

export default function ReferralPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Fintigen Referral Program"
        title="Refer Learners. Earn 15%. Grow With Better Tools."
        description="Every FINTIGEN referrer gets a dedicated growth workstation for links, posters, videos, campaigns, leads and performance tracking."
      />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-300 to-emerald-300 p-8 text-slate-950 shadow-xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.18em]">FINTIGEN Referral Growth Program</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black sm:text-4xl">
            Share practical digital-skills training and get your own promoter workstation.
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-7">
            Refer learners to eligible FINTIGEN paid programs. When a qualifying successful payment is verified, the referral earns a 15% commission under the program terms.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/register?next=/referral/workstation"
              className="rounded-xl bg-slate-950 px-6 py-3 font-black text-white transition hover:bg-slate-800"
            >
              Join & Open My Workstation
            </Link>
            <Link
              href="/referral/workstation"
              className="rounded-xl border-2 border-slate-950/20 bg-white/60 px-6 py-3 font-black transition hover:bg-white"
            >
              Existing Referrer → Workstation
            </Link>
            <Link
              href="/referral/workstation"
              className="rounded-xl border-2 border-slate-950/20 bg-white/70 px-6 py-3 font-black transition hover:bg-white"
            >
              Open Referral Workstation
            </Link>
            <a
              href={brand.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border-2 border-slate-950/20 bg-white/40 px-6 py-3 font-bold transition hover:bg-white/75"
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
              Create or use your FINTIGEN account. Your workstation is tied to your account and promoter code.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <div className="text-3xl">2</div>
            <h3 className="mt-3 text-lg font-black">Create & Share</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Build personal links, WhatsApp messages, captions, posters and short-video campaign assets.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <div className="text-3xl">3</div>
            <h3 className="mt-3 text-lg font-black">Track & Earn</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Follow leads, measure campaign signals and earn 15% after eligible successful payments are verified.
            </p>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-900/50 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            Included for every referrer
          </p>
          <h2 className="mt-2 text-2xl font-black">10 high-level referral growth tools</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {toolkit.map((item, index) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold dark:border-slate-800 dark:bg-slate-950">
                <span className="mr-2 text-emerald-600">{String(index + 1).padStart(2, "0")}</span>
                {item}
              </div>
            ))}
          </div>
          <Link href="/referral/workstation" className="mt-7 inline-flex rounded-xl bg-emerald-600 px-6 py-3 font-black text-white hover:bg-emerald-500">
            Open Referral Growth Workstation →
          </Link>
        </section>

        <div className="mt-10 rounded-3xl border border-slate-200 p-7 dark:border-slate-800 sm:p-8">
          <h2 className="text-2xl font-black">Program terms at a glance</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
            <li>• Commission rate: <strong>15%</strong> on eligible successful referred payments.</li>
            <li>• Refunded, reversed, fraudulent or invalid payments do not generate withdrawable commission.</li>
            <li>• Only eligible paid FINTIGEN programs qualify.</li>
            <li>• Referral attribution must be recorded before or at the qualifying purchase.</li>
            <li>• Workstation activity is a growth aid; the verified administrator ledger remains the financial record.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
