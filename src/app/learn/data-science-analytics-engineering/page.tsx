import type { Metadata } from "next";
import CoursePlayer from "@/components/course/CoursePlayer";
import {
  courseMeta,
  courseModules,
} from "@/lib/courses/data-science-analytics-engineering";

export const metadata: Metadata = {
  title: "Data Science, Analytics & Engineering — Interactive Course",
  description:
    "SQL, Python data wrangling, data warehousing, Apache Spark, Databricks & Delta Lake, and executive dashboards in Power BI and Tableau. An 8-module interactive course culminating in an end-to-end enterprise data pipeline capstone.",
};

export default function DataScienceAnalyticsEngineeringCoursePage() {
  return (
    <CoursePlayer
      meta={courseMeta}
      modules={courseModules}
      storageKey="fintigen-course-data-science-analytics-engineering"
      certificateId="FTG-DATA-001"
    />
  );
}
