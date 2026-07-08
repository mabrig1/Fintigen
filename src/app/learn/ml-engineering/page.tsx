import type { Metadata } from "next";
import CoursePlayer from "@/components/course/CoursePlayer";
import { courseMeta, courseModules } from "@/lib/courses/ml-engineering";

export const metadata: Metadata = {
  title: "AI & Machine Learning Engineering — Interactive Course",
  description:
    "Design, train, optimize, deploy, monitor, and scale production ML systems. A 9-module interactive course covering classical ML, deep learning, CV, NLP, model optimization, and the full MLOps lifecycle.",
};

export default function MlEngineeringCoursePage() {
  return (
    <CoursePlayer
      meta={courseMeta}
      modules={courseModules}
      storageKey="fintigen-course-ml-engineering"
      certificateId="FTG-MLENG-001"
    />
  );
}
