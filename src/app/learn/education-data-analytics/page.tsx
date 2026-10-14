import type { Metadata } from "next";
import CourseAccessGate from "@/components/course/CourseAccessGate";
import CoursePlayer from "@/components/course/CoursePlayer";
import {courseMeta,courseModules} from "@/lib/courses/education-data-analytics";
export const metadata: Metadata = {title: "Education & Learning Analytics | FINTIGEN", description: "Assessment quality, attendance, learning outcomes, retention and institutional dashboards"};
export default function Page(){return <CourseAccessGate courseSlug="education-data-analytics" courseTitle={courseMeta.title}><CoursePlayer meta={courseMeta} modules={courseModules} storageKey="fintigen-course-education-data-analytics" certificateId="FTG-EDUCATION-DATA-ANALYTICS" /></CourseAccessGate>}
