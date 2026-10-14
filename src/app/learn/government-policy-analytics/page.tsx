import type { Metadata } from "next";
import CourseAccessGate from "@/components/course/CourseAccessGate";
import CoursePlayer from "@/components/course/CoursePlayer";
import {courseMeta,courseModules} from "@/lib/courses/government-policy-analytics";
export const metadata: Metadata = {title: "Government, Policy & Development Analytics | FINTIGEN", description: "Surveys, public budgets, programme evaluation, census indicators and policy briefs"};
export default function Page(){return <CourseAccessGate courseSlug="government-policy-analytics" courseTitle={courseMeta.title}><CoursePlayer meta={courseMeta} modules={courseModules} storageKey="fintigen-course-government-policy-analytics" certificateId="FTG-GOVERNMENT-POLICY-ANALYTICS" /></CourseAccessGate>}
