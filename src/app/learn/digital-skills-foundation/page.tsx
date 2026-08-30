import type { Metadata } from "next";
import CoursePlayer from "@/components/course/CoursePlayer";
import {
  courseMeta,
  courseModules,
} from "@/lib/courses/digital-skills-foundation";

export const metadata: Metadata = {
  title: "Digital Skills Foundation & Employability Bootcamp — FINTIGEN Academy",
  description:
    "An 8-week practical digital-skills bootcamp covering digital literacy, productivity, online safety, professional communication, content creation, AI literacy, freelancing, and employability.",
};

export default function DigitalSkillsFoundationPage() {
  return (
    <CoursePlayer
      meta={courseMeta}
      modules={courseModules}
      storageKey="fintigen-course-digital-skills-foundation"
      certificateId="FTG-DSF-001"
    />
  );
}
