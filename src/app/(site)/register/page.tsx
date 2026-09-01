import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Enroll Now",
  description: "Create your free FINTIGEN Academy account and start learning today.",
};

type RegisterPageProps = {
  searchParams: Promise<{ course?: string; next?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const flagship = params.course === "mabrig-full-stack-founder-pro";
  const requestedNext = params.next;
  const nextPath =
    requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : flagship
        ? "/courses/mabrig-full-stack-founder-pro"
        : "/dashboard";

  return (
    <AuthForm
      mode="register"
      nextPath={nextPath}
      contextLabel={flagship ? "Mabrig Full-Stack Founder Pro enrollment" : undefined}
    />
  );
}
