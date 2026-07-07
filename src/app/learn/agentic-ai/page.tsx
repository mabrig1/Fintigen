import type { Metadata } from "next";
import CoursePlayer from "@/components/course/CoursePlayer";

export const metadata: Metadata = {
  title: "Agentic AI & Autonomous Agents — Interactive Course",
  description:
    "Build and orchestrate AI agents that perform complex tasks independently. An 8-week interactive course covering ReAct, LangGraph, CrewAI, AutoGen, guardrails, evaluation, and deployment.",
};

export default function AgenticAiCoursePage() {
  return <CoursePlayer />;
}
