"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { clearAuthSession, getAuthSession, type AuthUser } from "@/lib/auth-client";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const digitalSkillsLink = { label: "Digital Skills", href: "/digital-skills" };
  const futureSkillsLink = { label: "Future Skills", href: "/future-skills" };
  const aiLabLink = { label: "AI Lab", href: "/ai-lab" };
  const businessLink = { label: "Business Operations", href: "/business-operations" };
  const links = [...navLinks, digitalSkillsLink, futureSkillsLink, aiLabLink, businessLink];

  useEffect(() => {
    const refresh = () => setAuthUser(getAuthSession()?.user || null);
    refresh();
    window.addEventListener("fintigen-auth-changed", refresh);
    return () => window.removeEventListener("fintigen-auth-changed", refresh);
  }, []);

  function logout() {
    clearAuthSession();
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">F</span>
          <span className="text-lg tracking-tight">FINTIGEN <span className="text-brand-600">Academy</span></span>
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`rounded-md px-3 py-2 text-sm font-medium transition ${pathname === link.href ? "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300" : link.href === digitalSkillsLink.href ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300" : link.href === futureSkillsLink.href ? "bg-violet-50 text-violet-700 hover:bg-violet-100 dark:bg-violet-950/40 dark:text-violet-300" : link.href === aiLabLink.href ? "bg-fuchsia-50 text-fuchsia-700 hover:bg-fuchsia-100 dark:bg-fuchsia-950/40 dark:text-fuchsia-300" : link.href === businessLink.href ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300" : "text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"}`}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {authUser ? (
            <>
              <Link href="/dashboard" className="hidden max-w-36 truncate rounded-md px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 sm:block dark:text-brand-300 dark:hover:bg-brand-900/30">{authUser.name}</Link>
              <button type="button" onClick={logout} className="hidden rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:border-rose-300 hover:text-rose-600 sm:block dark:border-slate-700 dark:text-slate-300">Log out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 sm:block dark:text-slate-300 dark:hover:text-brand-400">Log in</Link>
              <Link href="/register" className="hidden rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 sm:block">Enroll Now</Link>
            </>
          )}
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen} className="rounded-md border border-slate-200 p-2 lg:hidden dark:border-slate-700"><span className="block h-0.5 w-5 bg-current" /><span className="mt-1 block h-0.5 w-5 bg-current" /><span className="mt-1 block h-0.5 w-5 bg-current" /></button>
        </div>
      </nav>
      {menuOpen && (
        <div className="border-t border-slate-200 px-4 pb-4 lg:hidden dark:border-slate-800">
          <ul className="flex flex-col gap-1 pt-3">
            {links.map((link) => (
              <li key={link.href}><Link href={link.href} onClick={() => setMenuOpen(false)} className={`block rounded-md px-3 py-2 text-sm font-medium ${pathname === link.href ? "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300" : link.href === digitalSkillsLink.href ? "bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300" : link.href === futureSkillsLink.href ? "bg-violet-50 font-semibold text-violet-700 dark:bg-violet-950/40 dark:text-violet-300" : link.href === aiLabLink.href ? "bg-fuchsia-50 font-semibold text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300" : link.href === businessLink.href ? "bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" : "text-slate-600 dark:text-slate-300"}`}>{link.label}</Link></li>
            ))}
            {authUser ? (
              <li className="mt-2 grid grid-cols-2 gap-2"><Link href="/dashboard" onClick={() => setMenuOpen(false)} className="rounded-md bg-brand-50 px-4 py-2 text-center text-sm font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">My Dashboard</Link><button type="button" onClick={logout} className="rounded-md border border-slate-300 px-4 py-2 text-center text-sm font-medium dark:border-slate-700">Log out</button></li>
            ) : (
              <li className="mt-2 flex gap-2"><Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-center text-sm font-medium dark:border-slate-700">Log in</Link><Link href="/register" onClick={() => setMenuOpen(false)} className="flex-1 rounded-md bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white">Enroll Now</Link></li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
