import type { Metadata } from "next";
import Link from "next/link";
import FellowshipReviewPortal from "@/components/fellowship/FellowshipReviewPortal";

export const metadata: Metadata = {
  title: "AI Safety Fellowship Review Queue — FINTIGEN",
  description: "Structured, de-identified reviewer workflow for the FINTIGEN AI Safety Fellowship pilot.",
  robots: { index: false, follow: false },
};

export default function FellowshipReviewPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <Link href="/ai-safety-fellowship" className="text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400">
          ← Fellowship pilot
        </Link>
      </div>
      <FellowshipReviewPortal />
    </>
  );
}
