import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Learning Dashboard",
  description:
    "The FINTIGEN Academy student portal — video lessons, progress tracking, assignments, quizzes, certificates, and discussion forums.",
};

const enrolledCourses = [
  { title: "Web Development", progress: 68, nextLesson: "CSS Grid Layouts" },
  { title: "Python Programming", progress: 35, nextLesson: "Working with Files" },
  { title: "Prompt Engineering", progress: 90, nextLesson: "Final Project" },
];

const assignments = [
  { title: "Build a Portfolio Landing Page", course: "Web Development", due: "Due in 3 days", status: "In progress" },
  { title: "Data Cleaning Exercise", course: "Python Programming", due: "Due in 6 days", status: "Not started" },
  { title: "Prompt Library Submission", course: "Prompt Engineering", due: "Due tomorrow", status: "Submitted" },
];

const forumThreads = [
  { title: "How do I center a div (for real this time)?", replies: 24, course: "Web Development" },
  { title: "Best free datasets to practice Python?", replies: 17, course: "Python Programming" },
  { title: "Share your best system prompts", replies: 42, course: "Prompt Engineering" },
];

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Learning Dashboard"
        title="Welcome back, Student 👋"
        description="This is a preview of the student portal — video lessons, progress tracking, assignments, quizzes, certificates, and forums in one place."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
          🔒 This is a demo preview.{" "}
          <Link href="/login" className="font-semibold underline">
            Log in
          </Link>{" "}
          or{" "}
          <Link href="/register" className="font-semibold underline">
            create an account
          </Link>{" "}
          to access your real dashboard.
        </div>

        {/* Progress */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">📺 Continue Learning</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {enrolledCourses.map((course) => (
              <div
                key={course.title}
                className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"
              >
                <h3 className="font-semibold">{course.title}</h3>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {course.progress}% complete
                </p>
                <p className="mt-3 text-sm">
                  <span className="text-slate-500">Next lesson:</span>{" "}
                  <span className="font-medium">{course.nextLesson}</span>
                </p>
                <button className="mt-4 w-full rounded-lg bg-brand-600 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
                  Resume Course
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Assignments & quizzes */}
        <section className="mt-12">
          <h2 className="text-xl font-bold">📝 Assignments & Quizzes</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900">
                <tr>
                  <th className="px-5 py-3 font-semibold">Assignment</th>
                  <th className="px-5 py-3 font-semibold">Course</th>
                  <th className="px-5 py-3 font-semibold">Deadline</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr
                    key={assignment.title}
                    className="border-t border-slate-200 dark:border-slate-800"
                  >
                    <td className="px-5 py-3 font-medium">{assignment.title}</td>
                    <td className="px-5 py-3 text-slate-500">{assignment.course}</td>
                    <td className="px-5 py-3 text-slate-500">{assignment.due}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          assignment.status === "Submitted"
                            ? "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
                            : assignment.status === "In progress"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {assignment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Certificates */}
          <section>
            <h2 className="text-xl font-bold">🎓 My Certificates</h2>
            <div className="mt-4 rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">JavaScript</p>
                  <p className="text-sm text-slate-500">
                    Issued May 2026 · FTG-2026-07314
                  </p>
                </div>
                <button className="rounded-lg border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-600 transition hover:bg-brand-50 dark:hover:bg-brand-900/20">
                  Download
                </button>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Complete more courses to earn additional certificates.
              </p>
            </div>
          </section>

          {/* Forums */}
          <section>
            <h2 className="text-xl font-bold">💬 Discussion Forums</h2>
            <div className="mt-4 space-y-3">
              {forumThreads.map((thread) => (
                <div
                  key={thread.title}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
                >
                  <div>
                    <p className="font-medium">{thread.title}</p>
                    <p className="text-sm text-slate-500">{thread.course}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-800">
                    {thread.replies} replies
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
