import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your FINTIGEN Academy student account.",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
