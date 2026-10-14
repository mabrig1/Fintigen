import type { Metadata } from "next";
import CourseAccessGate from "@/components/course/CourseAccessGate";
import CoursePlayer from "@/components/course/CoursePlayer";
import {courseMeta,courseModules} from "@/lib/courses/financial-data-analytics";
export const metadata: Metadata = {title: "Financial & Banking Analytics | FINTIGEN", description: "Budgeting, financial statements, risk, fraud signals and time-series reporting"};
export default function Page(){return <CourseAccessGate courseSlug="financial-data-analytics" courseTitle={courseMeta.title}><CoursePlayer meta={courseMeta} modules={courseModules} storageKey="fintigen-course-financial-data-analytics" certificateId="FTG-FINANCIAL-DATA-ANALYTICS" /></CourseAccessGate>}
