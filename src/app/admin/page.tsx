import type { Metadata } from "next";
import AdminPortal from "@/components/admin/AdminPortal";

export const metadata: Metadata = {
  title: "Fintigen Admin Portal | MABRIG Technologies",
  description: "Secure operations dashboard for Fintigen administrators.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminPortal />;
}
