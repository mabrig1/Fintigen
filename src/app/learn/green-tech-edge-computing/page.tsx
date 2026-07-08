import type { Metadata } from "next";
import CoursePlayer from "@/components/course/CoursePlayer";
import {
  courseMeta,
  courseModules,
} from "@/lib/courses/green-tech-edge-computing";

export const metadata: Metadata = {
  title: "Sustainable/Green Technology & Edge Computing — Interactive Course",
  description:
    "Carbon-aware software design, power profiling and Green Ops, energy-efficient IoT, TinyML at the extreme edge, and green datacenters. An 8-module interactive course culminating in an autonomous carbon-aware edge sensing pipeline capstone.",
};

export default function GreenTechEdgeComputingCoursePage() {
  return (
    <CoursePlayer
      meta={courseMeta}
      modules={courseModules}
      storageKey="fintigen-course-green-tech-edge-computing"
      certificateId="FTG-GREEN-001"
    />
  );
}
