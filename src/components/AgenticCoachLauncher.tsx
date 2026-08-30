"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AgenticCoachLauncher() {
  const pathname = usePathname();
  if (pathname === "/ai-lab") return null;

  return (
    <Link
      href="/ai-lab"
      aria-label="Open FINTIGEN AI Learning Copilot"
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-violet-600 px-4 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-300"
    >
      <span aria-hidden>✦</span>
      <span className="hidden sm:inline">AI Learning Copilot</span>
      <span className="sm:hidden">AI Coach</span>
    </Link>
  );
}
