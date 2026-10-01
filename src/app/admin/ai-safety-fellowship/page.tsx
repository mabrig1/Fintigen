import type { Metadata } from "next";
import Link from "next/link";
import FellowshipAdminPortal from "@/components/admin/FellowshipAdminPortal";

export const metadata: Metadata = {
  title: "AI Safety Fellowship Operations | FINTIGEN Admin",
  description: "Admin-only operations for the proposed FINTIGEN AI Safety Fellowship pilot.",
  robots: { index: false, follow: false },
};

export default function FellowshipAdminPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <div className="flex flex-wrap gap-4">
          <Link href="/admin" className="text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400">
            ← Main admin portal
          </Link>
          <Link href="/mentor/ai-safety-fellowship" className="text-sm font-bold text-violet-600 hover:text-violet-700 dark:text-violet-400">
            Open structured reviewer queue →
          </Link>
        </div>
      </div>
      <FellowshipAdminPortal />
    </>
  );
}
