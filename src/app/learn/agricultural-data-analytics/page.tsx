import type { Metadata } from "next";
import CourseAccessGate from "@/components/course/CourseAccessGate";
import CoursePlayer from "@/components/course/CoursePlayer";
import {courseMeta,courseModules} from "@/lib/courses/agricultural-data-analytics";
export const metadata: Metadata = {title: "Agricultural & Food Systems Analytics | FINTIGEN", description: "Crop yields, market prices, postharvest losses, geospatial trends and supply chains"};
export default function Page(){return <CourseAccessGate courseSlug="agricultural-data-analytics" courseTitle={courseMeta.title}><CoursePlayer meta={courseMeta} modules={courseModules} storageKey="fintigen-course-agricultural-data-analytics" certificateId="FTG-AGRICULTURAL-DATA-ANALYTICS" /></CourseAccessGate>}
