"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { saveAuthSession, type AuthUser } from "@/lib/auth-client";

type Mode = "login" | "register";

type AuthPayload = {
  status?: string;
  data?: {
    token?: string;
    user?: AuthUser;
  };
  error?: string;
  message?: string;
  errors?: Array<{ field?: string; message?: string }>;
};

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;
    setError("");

    if (!apiBase) {
      setError("The FINTIGEN API is not configured yet.");
      return;
    }

    if (mode === "register" && name.trim().length < 2) {
      setError("Enter your full name.");
      return;
    }
    if (mode === "register" && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiBase}/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(mode === "register" ? { name: name.trim() } : {}),
          email: email.trim(),
          password,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as AuthPayload;
      if (!response.ok) {
        const fieldError = payload.errors?.map((item) => item.message).filter(Boolean).join(" ");
        throw new Error(fieldError || payload.error || payload.message || "Authentication failed.");
      }
      const token = payload.data?.token;
      const user = payload.data?.user;
      if (!token || !user) throw new Error("The server did not return a valid sign-in session.");

      saveAuthSession(token, user);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  const isRegister = mode === "register";

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-xl font-bold text-white">F</span>
          <h1 className="mt-4 text-2xl font-bold">{isRegister ? "Create Your Free Account" : "Welcome Back"}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {isRegister ? "Create an account so your learning memory follows you across devices." : "Log in to restore your courses, mastery memory, and review queue."}
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {isRegister && (
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" aria-label="Full name" autoComplete="name" className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900" />
          )}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" aria-label="Email address" autoComplete="email" required className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={isRegister ? "Create a password (8+ characters)" : "Password"} aria-label="Password" autoComplete={isRegister ? "new-password" : "current-password"} required className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-900" />

          {error && <div className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">{error}</div>}

          <button type="submit" disabled={loading} className="w-full rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Please wait…" : isRegister ? "Enroll Now — It’s Free" : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          {isRegister ? "Already have an account?" : "New to FINTIGEN Academy?"}{" "}
          <Link href={isRegister ? "/login" : "/register"} className="font-semibold text-brand-600 dark:text-brand-400">
            {isRegister ? "Log in" : "Create an account"}
          </Link>
        </p>
      </div>
    </div>
  );
}
