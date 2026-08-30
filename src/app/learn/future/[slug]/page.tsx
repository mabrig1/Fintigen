import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoursePlayer from "@/components/course/CoursePlayer";
import { futureSkillCourses, futureSkillsBySlug } from "@/lib/courses/future-skills";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return futureSkillCourses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = futureSkillsBySlug[slug];
  if (!course) return { title: "Future Skills Course" };

  return {
    title: `${course.title} — Interactive Course`,
    description: course.summary,
  };
}

export default async function FutureSkillsCoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = futureSkillsBySlug[slug];
  if (!course) notFound();

  return (
    <CoursePlayer
      meta={course.meta}
      modules={course.modules}
      storageKey={`fintigen-future-${course.slug}`}
      certificateId={`FTG-FUTURE-${course.slug.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}`}
    />
  );
}
