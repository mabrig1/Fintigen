import type { Metadata } from "next";
import CourseAccessGate from "@/components/course/CourseAccessGate";
import CoursePlayer from "@/components/course/CoursePlayer";
import { courseMeta, courseModules } from "@/lib/courses/data-analysis";

export const metadata: Metadata = { title: "Complete Data Analysis Course | FINTIGEN", description: "12-week hands-on data analysis course covering Excel, SQL, Python, statistics, Power BI and portfolio projects." };
export default function DataAnalysisCoursePage() { return <CourseAccessGate courseSlug="data-analysis" courseTitle={courseMeta.title}><CoursePlayer meta={courseMeta} modules={courseModules} storageKey="fintigen-course-data-analysis" certificateId="FTG-ANALYTICS-001" /></CourseAccessGate>; }
