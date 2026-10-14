import type { Metadata } from "next";
import CourseAccessGate from "@/components/course/CourseAccessGate";
import CoursePlayer from "@/components/course/CoursePlayer";
import {courseMeta,courseModules} from "@/lib/courses/academic-research-data-analysis";
export const metadata: Metadata = {title: "Academic Research Data Analysis | FINTIGEN", description: "Research design, questionnaire coding, SPSS, R, hypotheses, regression, APA tables and reproducibility"};
export default function Page(){return <CourseAccessGate courseSlug="academic-research-data-analysis" courseTitle={courseMeta.title}><CoursePlayer meta={courseMeta} modules={courseModules} storageKey="fintigen-course-academic-research-data-analysis" certificateId="FTG-ACADEMIC-RESEARCH-DATA-ANALYSIS" /></CourseAccessGate>}
