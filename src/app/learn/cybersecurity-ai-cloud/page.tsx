import type { Metadata } from "next";
import CoursePlayer from "@/components/course/CoursePlayer";
import {
  courseMeta,
  courseModules,
} from "@/lib/courses/cybersecurity-ai-cloud";

export const metadata: Metadata = {
  title: "Cybersecurity with AI & Cloud Focus — Interactive Course",
  description:
    "Zero-Trust architecture, DevSecOps, cloud-native defense, AI-powered threat detection, and securing AI/LLM systems. An 8-module interactive course covering ethical hacking, compliance, and a hybrid defensive capstone.",
};

export default function CybersecurityAiCloudCoursePage() {
  return (
    <CoursePlayer
      meta={courseMeta}
      modules={courseModules}
      storageKey="fintigen-course-cybersecurity-ai-cloud"
      certificateId="FTG-CYBER-001"
    />
  );
}
