"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import {
  authHeaders,
  clearAuthSession,
  getAuthSession,
} from "@/lib/auth-client";

type CatalogModule = {
  id: string;
  slug: string;
  title: string;
  sort_order: number;
  levelTitle: string;
};

type CourseCatalogItem = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  access?: "free" | "premium";
  pricing?: {
    nigeria?: { amount?: number; currency?: string };
    international?: { amount?: number; currency?: string };
  };
  levels: Array<{
    title: string;
    modules: Array<{
      id: string;
      slug: string;
      title: string;
      sort_order: number;
    }>;
  }>;
};

type ModuleContent = {
  id: string;
  slug: string;
  title: string;
  level_title: string;
  course_title: string;
  content_html: string;
  assessment: string;
  assignment: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
  }>;
};

type ApiPayload = {
  data?: {
    catalog?: CourseCatalogItem[];
    module?: ModuleContent;
  };
  catalog?: CourseCatalogItem[];
  module?: ModuleContent;
  error?: string;
  message?: string;
};

const COURSE_SLUG = "mabrig-full-stack-founder-pro";

function subscribeToAuth(callback: () => void) {
  window.addEventListener("fintigen-auth-changed", callback);
  return () => window.removeEventListener("fintigen-auth-changed", callback);
}

function getAuthSnapshot() {
  return Boolean(getAuthSession());
}

function getServerAuthSnapshot() {
  return false;
}

export default function PremiumCourseArea() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const signedIn = useSyncExternalStore(
    subscribeToAuth,
    getAuthSnapshot,
    getServerAuthSnapshot,
  );
  const [course, setCourse] = useState<CourseCatalogItem | null>(null);
  const [modules, setModules] = useState<CatalogModule[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [moduleContent, setModuleContent] = useState<ModuleContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [moduleLoading, setModuleLoading] = useState(false);
  const [error, setError] = useState("");
  const [locked, setLocked] = useState(false);

  const loadModule = useCallback(async (slug: string) => {
    if (!apiBase) return;
    setSelectedSlug(slug);
    setModuleLoading(true);
    setModuleContent(null);
    setError("");
    setLocked(false);

    try {
      const response = await fetch(`${apiBase}/courses/modules/${slug}`, {
        headers: authHeaders(),
        cache: "no-store",
      });
      const payload = (await response.json().catch(() => ({}))) as ApiPayload;

      if (response.status === 401) {
        clearAuthSession();
        return;
      }
      if (response.status === 403) {
        setLocked(true);
        setError(
          payload.error || payload.message || "Your account does not have access to this premium course yet.",
        );
        return;
      }
      if (!response.ok) {
        throw new Error(payload.error || payload.message || "Could not load this module.");
      }

      const nextModule = payload.data?.module || payload.module;
      if (!nextModule) throw new Error("The course API returned an incomplete module.");
      setModuleContent(nextModule);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load this module.");
    } finally {
      setModuleLoading(false);
    }
  }, [apiBase]);

  useEffect(() => {
    if (!signedIn || !apiBase) return;

    async function loadCatalog() {
      try {
        const response = await fetch(`${apiBase}/courses`, { cache: "no-store" });
        const payload = (await response.json().catch(() => ({}))) as ApiPayload;
        if (!response.ok) {
          throw new Error(payload.error || payload.message || "Could not load the course catalog.");
        }

        const catalog = payload.data?.catalog || payload.catalog || [];
        const flagship = catalog.find((item) => item.slug === COURSE_SLUG) || null;
        if (!flagship) {
          throw new Error("The flagship course is being prepared in the learning system. Please check again shortly.");
        }

        const flattened = flagship.levels
          .flatMap((level) =>
            level.modules.map((module) => ({
              ...module,
              levelTitle: level.title,
            })),
          )
          .sort((a, b) => a.sort_order - b.sort_order);

        setCourse(flagship);
        setModules(flattened);
        if (flattened[0]) await loadModule(flattened[0].slug);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load the course catalog.");
      } finally {
        setLoading(false);
      }
    }

    void loadCatalog();
  }, [apiBase, loadModule, signedIn]);

  if (signedIn === false) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-9 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-12">
          <div className="text-5xl">🔐</div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
            Premium student area
          </p>
          <h1 className="mt-3 text-3xl font-black">Log in to open Mabrig Full-Stack Founder Pro</h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
            Course lessons are protected. Sign in with the account used for enrollment, or review the program and create your account first.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/login?next=/learn/mabrig-full-stack-founder-pro"
              className="rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700"
            >
              Log In
            </Link>
            <Link
              href="/courses/mabrig-full-stack-founder-pro"
              className="rounded-xl border border-slate-300 px-6 py-3 font-bold dark:border-slate-700"
            >
              View Course & Pricing
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!apiBase) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="rounded-2xl border border-rose-300 bg-rose-50 p-6 text-rose-800 dark:bg-rose-950/30 dark:text-rose-200">
          The FINTIGEN course API is not configured.
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-24 text-center text-slate-500 sm:px-6">
        Loading your premium course access…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <Link href="/courses/mabrig-full-stack-founder-pro" className="text-sm font-semibold text-brand-600 dark:text-brand-400">
            ← Course overview
          </Link>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-300">
            Premium program
          </p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            {course?.title || "Mabrig Full-Stack Founder Pro"}
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">
            Select a module, complete the implementation work, and preserve evidence for your capstone release.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-24 lg:h-fit">
          <p className="px-3 pb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Course modules
          </p>
          <div className="space-y-1">
            {modules.map((module, index) => (
              <button
                key={module.slug}
                type="button"
                onClick={() => void loadModule(module.slug)}
                className={`w-full rounded-xl px-3 py-3 text-left text-sm transition ${
                  selectedSlug === module.slug
                    ? "bg-brand-50 font-bold text-brand-800 dark:bg-brand-900/40 dark:text-brand-200"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span className="mr-2 text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                {module.title}
              </button>
            ))}
          </div>
        </aside>

        <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-9">
          {moduleLoading && <p className="py-20 text-center text-slate-500">Opening module…</p>}

          {!moduleLoading && error && (
            <div className={`rounded-2xl border p-6 ${locked ? "border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200" : "border-rose-300 bg-rose-50 text-rose-800 dark:bg-rose-950/30 dark:text-rose-200"}`}>
              <h2 className="text-xl font-bold">{locked ? "Enrollment required" : "Course temporarily unavailable"}</h2>
              <p className="mt-3 text-sm leading-7">{error}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/courses/mabrig-full-stack-founder-pro"
                  className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white dark:bg-white dark:text-slate-950"
                >
                  View enrollment options
                </Link>
                <Link href="/contact" className="rounded-xl border border-current px-5 py-3 text-sm font-bold">
                  Contact admissions
                </Link>
              </div>
            </div>
          )}

          {!moduleLoading && moduleContent && (
            <article>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
                {moduleContent.level_title}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">{moduleContent.title}</h2>
              <div
                className="course-content mt-8"
                dangerouslySetInnerHTML={{ __html: moduleContent.content_html }}
              />

              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                <section className="rounded-2xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-900 dark:bg-brand-950/30">
                  <h3 className="font-bold text-brand-900 dark:text-brand-100">Implementation assignment</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-800 dark:text-brand-200">{moduleContent.assignment}</p>
                </section>
                <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
                  <h3 className="font-bold text-amber-900 dark:text-amber-100">Evidence assessment</h3>
                  <p className="mt-3 text-sm leading-7 text-amber-800 dark:text-amber-200">{moduleContent.assessment}</p>
                </section>
              </div>

              {moduleContent.questions.length > 0 && (
                <section className="mt-10">
                  <h3 className="text-xl font-bold">Knowledge check</h3>
                  <div className="mt-5 space-y-5">
                    {moduleContent.questions.map((question, questionIndex) => (
                      <div key={question.id} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                        <p className="font-semibold">{questionIndex + 1}. {question.question}</p>
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {question.options.map((option) => (
                            <li key={option} className="rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800">
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </article>
          )}
        </section>
      </div>
    </main>
  );
}
