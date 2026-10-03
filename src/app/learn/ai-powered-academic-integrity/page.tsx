import type { Metadata } from "next";
import CourseAccessGate from "@/components/course/CourseAccessGate";
import CoursePlayer from "@/components/course/CoursePlayer";
import { courseMeta, courseModules } from "@/lib/courses/ai-powered-academic-integrity";

export const metadata: Metadata = {
  title: "AI-Powered Academic Integrity — Interactive Professional Course",
  description:
    "A four-week professional course for researchers, postgraduates, and academic leaders on ethical, verifiable, reproducible use of generative AI in research and scholarly writing.",
};

export default function AiPoweredAcademicIntegrityLearnPage() {
  return (
    <CourseAccessGate
      courseSlug="ai-powered-academic-integrity"
      courseTitle={courseMeta.title}
      purchaseHref="/checkout/ai-powered-academic-integrity"
      purchaseLabel="Enroll for ₦35,000"
    >
      <CoursePlayer
        meta={courseMeta}
        modules={courseModules}
        storageKey="fintigen-course-ai-powered-academic-integrity"
        certificateId="FTG-AIAI-001"
      />
    </CourseAccessGate>
  );
}
