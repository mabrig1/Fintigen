import type { Metadata } from "next";
import Link from "next/link";
import AdminPortal from "@/components/admin/AdminPortal";

export const metadata: Metadata = {
  title: "Fintigen Admin Portal | MABRIG Technologies",
  description: "Secure operations dashboard for Fintigen administrators.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <>
      <AdminPortal />
      <Link
        href="/admin/training"
        className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-black text-white shadow-2xl ring-1 ring-blue-300 transition hover:bg-blue-400"
      >
        Full-Stack Enrollments →
      </Link>
      <Link
        href="/admin/referrals"
        className="fixed bottom-5 left-5 z-50 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 shadow-2xl ring-1 ring-emerald-300 transition hover:bg-emerald-400"
      >
        Referrals · 15% →
      </Link>
      <Link
        href="/admin/ict-business"
        className="fixed bottom-5 right-5 z-50 rounded-2xl bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 shadow-2xl ring-1 ring-amber-300 transition hover:bg-amber-300"
      >
        ICT Business Portal →
      </Link>
    </>
  );
}
