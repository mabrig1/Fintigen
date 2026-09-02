import type { Metadata } from "next";
import CourseAccessGate from "@/components/course/CourseAccessGate";
import CoursePlayer from "@/components/course/CoursePlayer";
import { courseMeta, courseModules } from "@/lib/courses/agentic-ai";

export const metadata: Metadata = {
  title: "Agentic AI & Autonomous Agents — Interactive Course",
  description:
    "Build and orchestrate AI agents that perform complex tasks independently. An 8-week interactive course covering ReAct, LangGraph, CrewAI, AutoGen, guardrails, evaluation, and deployment.",
};

export default function AgenticAiCoursePage() {
  return (
    <CourseAccessGate courseSlug="agentic-ai" courseTitle={courseMeta.title}>
      <CoursePlayer
        meta={courseMeta}
        modules={courseModules}
        storageKey="fintigen-course-agentic-ai"
        certificateId="FTG-AGENT-001"
      />
    </CourseAccessGate>
  );
}
