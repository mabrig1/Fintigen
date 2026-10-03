import type { Metadata } from "next";
import PremiumCourseArea from "@/components/course/PremiumCourseArea";

export const metadata: Metadata = {
  title: "Digital Skills Foundation & Employability Bootcamp — FINTIGEN Academy",
  description:
    "An 8-week practical digital-skills bootcamp covering digital literacy, productivity, online safety, professional communication, content creation, AI literacy, freelancing, and employability.",
};

export default function DigitalSkillsFoundationPage() {
  return (
    <PremiumCourseArea
      courseSlug="digital-skills-foundation"
      courseTitle="Digital Skills Foundation & Employability Bootcamp"
    />
  );
}
