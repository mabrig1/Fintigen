import type { Metadata } from "next";
import PremiumCourseArea from "@/components/course/PremiumCourseArea";

export const metadata: Metadata = {
  title: "Mabrig Full-Stack Founder Pro — Student Course Area",
  description:
    "Protected student learning area for the Mabrig Full-Stack Founder Pro flagship program.",
};

export default function MabrigFullStackFounderProLearnPage() {
  return <PremiumCourseArea />;
}
