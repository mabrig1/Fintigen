import type { Metadata } from "next";
import CourseAccessGate from "@/components/course/CourseAccessGate";
import CoursePlayer from "@/components/course/CoursePlayer";
import {courseMeta,courseModules} from "@/lib/courses/marketing-data-analytics";
export const metadata: Metadata = {title: "Marketing & Social Media Analytics | FINTIGEN", description: "Campaign attribution, funnels, engagement, experimentation and ROI reporting"};
export default function Page(){return <CourseAccessGate courseSlug="marketing-data-analytics" courseTitle={courseMeta.title}><CoursePlayer meta={courseMeta} modules={courseModules} storageKey="fintigen-course-marketing-data-analytics" certificateId="FTG-MARKETING-DATA-ANALYTICS" /></CourseAccessGate>}
