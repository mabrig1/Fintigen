import type { Metadata } from "next";
import IctBusinessPortalV2 from "@/components/admin/IctBusinessPortalV2";

export const metadata: Metadata = {
  title: "Nigeria ICT Business Services | Fintigen Admin",
  description: "Admin-only customer case management for ICT and registration support services in Nigeria.",
  robots: { index: false, follow: false },
};

export default function IctBusinessPage() {
  return <IctBusinessPortalV2 />;
}
