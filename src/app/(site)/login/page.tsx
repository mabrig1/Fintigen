import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your FINTIGEN Academy student account.",
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const requestedNext = params.next;
  const nextPath =
    requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/dashboard";

  return (
    <AuthForm
      mode="login"
      nextPath={nextPath}
      contextLabel={
        nextPath === "/learn/mabrig-full-stack-founder-pro"
          ? "Mabrig Full-Stack Founder Pro"
          : undefined
      }
    />
  );
}
