import type { Metadata } from "next";
import CourseAccessGate from "@/components/course/CourseAccessGate";
import CoursePlayer from "@/components/course/CoursePlayer";
import { courseMeta, courseModules } from "@/lib/courses/generative-ai";

export const metadata: Metadata = {
  title:
    "Generative AI, Prompt Engineering & Enterprise AI Literacy — Interactive Course",
  description:
    "Master advanced LLMs, multimodal systems, fine-tuning, and AI governance. An 8-week interactive course covering Transformers, prompt engineering, RAG vs. fine-tuning, safety, and enterprise policy.",
};

export default function GenerativeAiCoursePage() {
  return (
    <CourseAccessGate courseSlug="generative-ai" courseTitle={courseMeta.title}>
      <CoursePlayer
        meta={courseMeta}
        modules={courseModules}
        storageKey="fintigen-course-generative-ai"
        certificateId="FTG-GENAI-001"
      />
    </CourseAccessGate>
  );
}
