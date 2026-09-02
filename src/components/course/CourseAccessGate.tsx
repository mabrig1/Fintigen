"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { authHeaders, clearAuthSession, getAuthSession } from "@/lib/auth-client";

type AccessPayload = {
  data?: {
    allowed?: boolean;
    access?: "free" | "premium";
    reason?: string;
  };
  error?: string;
  message?: string;
};

export default function CourseAccessGate({
  courseSlug,
  courseTitle,
  children,
}: {
  courseSlug: string;
  courseTitle: string;
  children: ReactNode;
}) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [state, setState] = useState<"loading" | "allowed" | "signin" | "locked" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (courseSlug === "digital-skills-foundation") {
      setState("allowed");
      return;
    }

    const session = getAuthSession();
    if (!session) {
      setState("signin");
      return;
    }

    if (!apiBase) {
      setMessage("The FINTIGEN course access service is not configured.");
      setState("error");
      return;
    }

    let active = true;
    async function checkAccess() {
      try {
        const response = await fetch(`${apiBase}/courses/${encodeURIComponent(courseSlug)}/access`, {
          headers: authHeaders(),
          cache: "no-store",
        });
        const payload = (await response.json().catch(() => ({}))) as AccessPayload;
        if (!active) return;

        if (response.status === 401) {
          clearAuthSession();
          setState("signin");
          return;
        }
        if (!response.ok) {
          throw new Error(payload.error || payload.message || "Could not verify course access.");
        }

        if (payload.data?.allowed) setState("allowed");
        else setState("locked");
      } catch (error) {
        if (!active) return;
        setMessage(error instanceof Error ? error.message : "Could not verify course access.");
        setState("error");
      }
    }

    void checkAccess();
    return () => {
      active = false;
    };
  }, [apiBase, courseSlug]);

  if (state === "allowed") return <>{children}</>;

  if (state === "loading") {
    return <main className="mx-auto max-w-4xl px-4 py-24 text-center text-slate-500 sm:px-6">Checking course access…</main>;
  }

  if (state === "signin") {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-9 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-12">
          <div className="text-5xl">🔐</div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Paid FINTIGEN course</p>
          <h1 className="mt-3 text-3xl font-black">Sign in to verify your access</h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
            {courseTitle} is a paid program. Digital Skills Foundation is FINTIGEN&apos;s only free course.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={`/login?next=/learn/${courseSlug}`} className="rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700">Log In</Link>
            <Link href="/pricing" className="rounded-xl border border-slate-300 px-6 py-3 font-bold dark:border-slate-700">View Pricing</Link>
          </div>
        </div>
      </main>
    );
  }

  if (state === "locked") {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-9 text-center shadow-sm dark:border-amber-900/60 dark:bg-amber-950/20 sm:p-12">
          <div className="text-5xl">💳</div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">Premium access required</p>
          <h1 className="mt-3 text-3xl font-black">Enroll to unlock {courseTitle}</h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
            This course is paid. Purchase premium access or contact FINTIGEN if you have been approved for a scholarship or manual enrollment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/pricing" className="rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700">View Paid Plans</Link>
            <a href="https://wa.me/2347065342818" className="rounded-xl border border-slate-300 px-6 py-3 font-bold dark:border-slate-700">WhatsApp Support</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <div className="rounded-2xl border border-rose-300 bg-rose-50 p-6 text-rose-800 dark:bg-rose-950/30 dark:text-rose-200">
        {message || "Course access could not be verified."}
      </div>
    </main>
  );
}
