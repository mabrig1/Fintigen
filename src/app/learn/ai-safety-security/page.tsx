import type { Metadata } from "next";
import CoursePlayer from "@/components/course/CoursePlayer";
import { courseMeta, courseModules } from "@/lib/courses/ai-safety-security";

export const metadata: Metadata = {
  title: "AI Safety & Security for Agentic Systems — Free Public-Interest Course",
  description:
    "A free 6-week practical course for software engineers entering AI assurance, model and agent evaluations, information security, and human oversight.",
};

export default function AiSafetySecurityCoursePage() {
  return (
    <CoursePlayer
      meta={courseMeta}
      modules={courseModules}
      storageKey="fintigen-course-ai-safety-security"
      certificateId="FTG-AISAFE-PILOT"
    />
  );
}
