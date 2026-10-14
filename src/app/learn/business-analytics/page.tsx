import type { Metadata } from "next";
import CourseAccessGate from "@/components/course/CourseAccessGate";
import CoursePlayer from "@/components/course/CoursePlayer";
import {courseMeta,courseModules} from "@/lib/courses/business-analytics";
export const metadata: Metadata = {title: "Business Analytics & Business Intelligence | FINTIGEN", description: "Sales, finance, customer retention, KPIs, Power BI, forecasting and executive reporting"};
export default function Page(){return <CourseAccessGate courseSlug="business-analytics" courseTitle={courseMeta.title}><CoursePlayer meta={courseMeta} modules={courseModules} storageKey="fintigen-course-business-analytics" certificateId="FTG-BUSINESS-ANALYTICS" /></CourseAccessGate>}
