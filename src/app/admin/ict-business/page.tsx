import type { Metadata } from "next";
import Link from "next/link";
import IctBusinessPortalV2 from "@/components/admin/IctBusinessPortalV2";

export const metadata: Metadata = {
  title: "Nigeria ICT Business Services | Fintigen Admin",
  description: "Admin-only customer case management for ICT and registration support services in Nigeria.",
  robots: { index: false, follow: false },
};

export default function IctBusinessPage() {
  return (
    <>
      <div className="border-b border-emerald-900 bg-emerald-950 px-4 py-3 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-sm">
          <p className="font-bold">ICT Business Operations · Fintigen / MABRIG Technologies</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/ict-business/knowledge-base" className="rounded-lg bg-emerald-400 px-3 py-2 font-black text-slate-950">📚 Business Knowledge Base</Link>
            <Link href="/ict-services" className="rounded-lg border border-emerald-700 px-3 py-2 font-bold hover:bg-emerald-900">🌐 Public ICT Website</Link>
          </div>
        </div>
      </div>
      <IctBusinessPortalV2 />
    </>
  );
}
