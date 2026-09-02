import type { Metadata } from "next";
import IctKnowledgeBasePortal from "@/components/admin/IctKnowledgeBasePortal";

export const metadata: Metadata = {
  title: "ICT Business Knowledge Base | Fintigen Admin",
  description: "Admin operating manual for NYSC, NIN/NIMC, CAC, Remita and related ICT assistance services in Nigeria.",
  robots: { index: false, follow: false },
};

export default function IctKnowledgeBasePage() {
  return <IctKnowledgeBasePortal />;
}
