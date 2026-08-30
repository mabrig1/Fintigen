import type { Metadata } from "next";
import PersonalizedDashboard from "@/components/dashboard/PersonalizedDashboard";

export const metadata: Metadata = {
  title: "Personalized Learning Dashboard",
  description:
    "Your FINTIGEN account-linked learning intelligence dashboard with mastery evidence, spaced review, course progress, recommendations, and an AI daily mission.",
};

export default function DashboardPage() {
  return <PersonalizedDashboard />;
}
