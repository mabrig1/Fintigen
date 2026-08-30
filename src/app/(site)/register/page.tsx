import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Enroll Now",
  description: "Create your free FINTIGEN Academy account and start learning today.",
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
