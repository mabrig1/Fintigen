import type { Metadata } from "next";
import CourseAccessGate from "@/components/course/CourseAccessGate";
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
    <CourseAccessGate
      courseSlug="digital-skills-foundation"
      courseTitle={courseMeta.title}
      purchaseHref="/checkout/digital-skills-foundation"
      purchaseLabel="Enroll for ₦5,000"
    >
      <CoursePlayer
        meta={courseMeta}
        modules={courseModules}
        storageKey="fintigen-course-digital-skills-foundation"
        certificateId="FTG-DSF-001"
      />
    </CourseAccessGate>
  );
}
