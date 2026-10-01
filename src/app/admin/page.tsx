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
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <Link
          href="/admin/ai-safety-fellowship"
          className="rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-black text-white shadow-2xl ring-1 ring-cyan-400 transition hover:bg-cyan-500"
        >
          AI Safety Fellowship Ops →
        </Link>
        <Link
          href="/admin/ict-business"
          className="rounded-2xl bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 shadow-2xl ring-1 ring-amber-300 transition hover:bg-amber-300"
        >
          ICT Business Portal →
        </Link>
      </div>
    </>
  );
}
