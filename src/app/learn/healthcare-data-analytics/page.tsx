import type { Metadata } from "next";
import CourseAccessGate from "@/components/course/CourseAccessGate";
import CoursePlayer from "@/components/course/CoursePlayer";
import {courseMeta,courseModules} from "@/lib/courses/healthcare-data-analytics";
export const metadata: Metadata = {title: "Healthcare & Public Health Analytics | FINTIGEN", description: "Clinical data governance, epidemiology, patient outcomes and public-health dashboards"};
export default function Page(){return <CourseAccessGate courseSlug="healthcare-data-analytics" courseTitle={courseMeta.title}><CoursePlayer meta={courseMeta} modules={courseModules} storageKey="fintigen-course-healthcare-data-analytics" certificateId="FTG-HEALTHCARE-DATA-ANALYTICS" /></CourseAccessGate>}
