import type { Metadata } from "next";
import PremiumCourseArea from "@/components/course/PremiumCourseArea";

export const metadata: Metadata = {
  title: "AI-Powered Academic Integrity — Interactive Professional Course",
  description:
    "A four-week professional course for researchers, postgraduates, and academic leaders on ethical, verifiable, reproducible use of generative AI in research and scholarly writing.",
};

export default function AiPoweredAcademicIntegrityLearnPage() {
  return (
    <PremiumCourseArea
      courseSlug="ai-powered-academic-integrity"
      courseTitle="AI-Powered Academic Integrity"
    />
  );
}
