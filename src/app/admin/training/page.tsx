import type { Metadata } from "next";
import TrainingEnrollmentsPortal from "@/components/admin/TrainingEnrollmentsPortal";

export const metadata: Metadata = {
  title: "Full-Stack Enrollments | Fintigen Admin",
  description: "Central enrollment and learner operations for the Full-Stack Master-Class.",
  robots: { index: false, follow: false },
};

export default function TrainingAdminPage() {
  return <TrainingEnrollmentsPortal />;
}
