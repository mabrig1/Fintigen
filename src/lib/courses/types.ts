export interface Lesson {
  id: string;
  title: string;
  /** Paragraphs of lesson content. */
  content: string[];
  /** Optional bullet points rendered after the paragraphs. */
  bullets?: string[];
  /** Optional code / formula block. */
  code?: { label: string; body: string };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface CourseModule {
  id: string;
  week: number;
  title: string;
  objective: string;
  lessons: Lesson[];
  lab: { title: string; description: string; steps: string[] };
  quiz: QuizQuestion[];
}

export interface CourseMeta {
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  pace: string;
  level: string;
  prerequisites: string[];
  overview: string[];
  objectives: string[];
  tools: { category: string; items: string }[];
  grading: { component: string; weight: string; detail: string }[];
}
