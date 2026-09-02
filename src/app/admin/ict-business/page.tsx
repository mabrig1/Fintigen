import type { Metadata } from "next";
import IctBusinessPortal from "@/components/admin/IctBusinessPortal";

export const metadata: Metadata = {
  title: "Nigeria ICT Business Services | Fintigen Admin",
  description: "Admin-only customer case management for ICT and registration support services in Nigeria.",
  robots: { index: false, follow: false },
};

export default function IctBusinessPage() {
  return <IctBusinessPortal />;
}
