import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Enroll Now",
  description: "Create your free FINTIGEN Academy account and start learning today.",
};

type RegisterPageProps = {
  searchParams: Promise<{ course?: string; next?: string; ref?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const flagship = params.course === "mabrig-full-stack-founder-pro";
  if (flagship) {
    const ref = String(params.ref || "").trim().replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);
    redirect(`/checkout/mabrig-full-stack-founder-pro${ref ? `?ref=${encodeURIComponent(ref)}` : ""}`);
  }

  const requestedNext = params.next;
  const nextPath = requestedNext?.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/dashboard";
  return <AuthForm mode="register" nextPath={nextPath} />;
}
