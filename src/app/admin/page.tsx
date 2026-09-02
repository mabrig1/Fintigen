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
        href="/admin/ict-business"
        className="fixed bottom-5 right-5 z-50 rounded-2xl bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 shadow-2xl ring-1 ring-amber-300 transition hover:bg-amber-300"
      >
        ICT Business Portal →
      </Link>
    </>
  );
}
