"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import type {
  CourseMeta,
  CourseModule,
  Lesson,
  QuizQuestion,
} from "@/lib/courses/types";
import { createProgressStore } from "@/lib/courses/progress-store";

export interface CoursePlayerProps {
  meta: CourseMeta;
  modules: CourseModule[];
  /** localStorage key under which this course's progress is saved. */
  storageKey: string;
  /** Verification ID shown on the completion certificate. */
  certificateId: string;
}

type ItemKind = "lesson" | "lab" | "quiz";

interface CourseItem {
  key: string;
  kind: ItemKind;
  moduleIndex: number;
  title: string;
}

interface View {
  type: "overview" | "item" | "certificate";
  itemIndex: number;
}

function buildItems(modules: CourseModule[]): CourseItem[] {
  const items: CourseItem[] = [];
  modules.forEach((module, moduleIndex) => {
    module.lessons.forEach((lesson) => {
      items.push({
        key: lesson.id,
        kind: "lesson",
        moduleIndex,
        title: lesson.title,
      });
    });
    items.push({
      key: `${module.id}-lab`,
      kind: "lab",
      moduleIndex,
      title: `Lab: ${module.lab.title}`,
    });
    items.push({
      key: `${module.id}-quiz`,
      kind: "quiz",
      moduleIndex,
      title: "Module Quiz",
    });
  });
  return items;
}

const kindIcon: Record<ItemKind, string> = {
  lesson: "📖",
  lab: "🧪",
  quiz: "❓",
};

export default function CoursePlayer({
  meta,
  modules,
  storageKey,
  certificateId,
}: CoursePlayerProps) {
  const items = useMemo(() => buildItems(modules), [modules]);
  // The store touches localStorage only lazily on the client.
  const store = useMemo(() => createProgressStore(storageKey), [storageKey]);
  const saved = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
  const completed = useMemo(() => new Set(saved.completed), [saved]);
  const [view, setView] = useState<View>({ type: "overview", itemIndex: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModules, setOpenModules] = useState<Set<number>>(new Set([0]));

  const progress = Math.round((completed.size / items.length) * 100);
  const courseComplete = completed.size === items.length;

  const savedItemIndex =
    saved.itemIndex >= 0 && saved.itemIndex < items.length
      ? saved.itemIndex
      : 0;

  function markComplete(key: string, itemIndex: number) {
    const current = store.getSnapshot();
    if (!current.completed.includes(key)) {
      store.set({
        completed: [...current.completed, key],
        itemIndex,
      });
    }
  }

  function goToItem(index: number) {
    setView({ type: "item", itemIndex: index });
    setOpenModules((prev) => new Set(prev).add(items[index].moduleIndex));
    setSidebarOpen(false);
    store.set({ ...store.getSnapshot(), itemIndex: index });
    window.scrollTo({ top: 0 });
  }

  function completeAndContinue(index: number) {
    markComplete(items[index].key, index);
    if (index + 1 < items.length) {
      goToItem(index + 1);
    } else {
      setView({ type: "certificate", itemIndex: index });
      window.scrollTo({ top: 0 });
    }
  }

  function resetProgress() {
    store.set({ completed: [], itemIndex: 0 });
    setView({ type: "overview", itemIndex: 0 });
    setOpenModules(new Set([0]));
  }

  function moduleProgress(moduleIndex: number) {
    const moduleItems = items.filter((i) => i.moduleIndex === moduleIndex);
    const done = moduleItems.filter((i) => completed.has(i.key)).length;
    return { done, total: moduleItems.length };
  }

  const firstIncomplete = items.findIndex((i) => !completed.has(i.key));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle course menu"
            className="rounded-md border border-slate-200 p-2 lg:hidden dark:border-slate-700"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
          <Link
            href="/courses"
            className="hidden shrink-0 items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-brand-600 sm:flex"
          >
            ← Exit course
          </Link>
          <div className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => setView({ type: "overview", itemIndex: 0 })}
              className="block w-full truncate text-left font-bold hover:text-brand-600"
            >
              {meta.title}
            </button>
            <div className="mt-1 flex items-center gap-3">
              <div
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Course progress"
                className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="shrink-0 text-xs font-semibold text-brand-600 dark:text-brand-400">
                {progress}%
              </span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } fixed inset-x-0 top-[65px] bottom-0 z-30 w-full overflow-y-auto border-r border-slate-200 bg-white lg:sticky lg:top-[65px] lg:block lg:h-[calc(100vh-65px)] lg:w-80 lg:shrink-0 dark:border-slate-800 dark:bg-slate-950`}
        >
          <div className="p-4">
            <button
              type="button"
              onClick={() => {
                setView({ type: "overview", itemIndex: 0 });
                setSidebarOpen(false);
              }}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold ${
                view.type === "overview"
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
                  : "hover:bg-slate-100 dark:hover:bg-slate-900"
              }`}
            >
              🏠 Course Overview
            </button>

            {modules.map((module, moduleIndex) => {
              const { done, total } = moduleProgress(moduleIndex);
              const isOpen = openModules.has(moduleIndex);
              return (
                <div key={module.id} className="mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenModules((prev) => {
                        const next = new Set(prev);
                        if (next.has(moduleIndex)) next.delete(moduleIndex);
                        else next.add(moduleIndex);
                        return next;
                      })
                    }
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        done === total
                          ? "bg-brand-500 text-white"
                          : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {done === total ? "✓" : module.week}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">
                        {module.title}
                      </span>
                      <span className="text-xs text-slate-500">
                        {done}/{total} complete
                      </span>
                    </span>
                    <span
                      className={`text-xs text-slate-400 transition-transform ${isOpen ? "rotate-90" : ""}`}
                    >
                      ▶
                    </span>
                  </button>
                  {isOpen && (
                    <ul className="mt-1 space-y-0.5 border-l-2 border-slate-200 pl-4 ml-5 dark:border-slate-800">
                      {items.map((item, itemIndex) => {
                        if (item.moduleIndex !== moduleIndex) return null;
                        const isActive =
                          view.type === "item" && view.itemIndex === itemIndex;
                        const isDone = completed.has(item.key);
                        return (
                          <li key={item.key}>
                            <button
                              type="button"
                              onClick={() => goToItem(itemIndex)}
                              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm ${
                                isActive
                                  ? "bg-brand-50 font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
                                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
                              }`}
                            >
                              <span className="shrink-0">
                                {isDone ? "✅" : kindIcon[item.kind]}
                              </span>
                              <span className="min-w-0 truncate">
                                {item.title}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}

            {completed.size > 0 && (
              <button
                type="button"
                onClick={resetProgress}
                className="mt-6 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-500 transition hover:border-rose-300 hover:text-rose-600 dark:border-slate-800"
              >
                Reset progress
              </button>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl">
            {view.type === "overview" && (
              <CourseOverview
                meta={meta}
                moduleCount={modules.length}
                itemCount={items.length}
                progress={progress}
                courseComplete={courseComplete}
                onStart={() => goToItem(courseComplete ? 0 : savedItemIndex)}
                onViewCertificate={() =>
                  setView({ type: "certificate", itemIndex: 0 })
                }
                started={completed.size > 0}
              />
            )}

            {view.type === "item" && (
              <ItemView
                item={items[view.itemIndex]}
                itemIndex={view.itemIndex}
                totalItems={items.length}
                module={modules[items[view.itemIndex].moduleIndex]}
                isCompleted={completed.has(items[view.itemIndex].key)}
                onPrev={
                  view.itemIndex > 0
                    ? () => goToItem(view.itemIndex - 1)
                    : undefined
                }
                onCompleteAndContinue={() =>
                  completeAndContinue(view.itemIndex)
                }
              />
            )}

            {view.type === "certificate" && (
              <CertificateView
                meta={meta}
                certificateId={certificateId}
                courseComplete={courseComplete}
                onBackToCourse={() =>
                  goToItem(firstIncomplete === -1 ? 0 : firstIncomplete)
                }
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ------------------------------ Overview ------------------------------ */

function CourseOverview({
  meta,
  moduleCount,
  itemCount,
  progress,
  courseComplete,
  started,
  onStart,
  onViewCertificate,
}: {
  meta: CourseMeta;
  moduleCount: number;
  itemCount: number;
  progress: number;
  courseComplete: boolean;
  started: boolean;
  onStart: () => void;
  onViewCertificate: () => void;
}) {
  return (
    <div>
      <div className="rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 p-8 text-white sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-300">
          FINTIGEN Academy · Featured Course
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          {meta.title}
        </h1>
        <p className="mt-3 text-brand-100/90">{meta.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/10 px-4 py-1.5">
            ⏱ {meta.duration} · {meta.pace}
          </span>
          <span className="rounded-full bg-white/10 px-4 py-1.5">
            📊 {meta.level}
          </span>
          <span className="rounded-full bg-white/10 px-4 py-1.5">
            🧩 {moduleCount} modules · {itemCount} lessons, labs & quizzes
          </span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onStart}
            className="rounded-lg bg-accent-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-accent-400"
          >
            {courseComplete
              ? "Review Course"
              : started
                ? `Continue Learning (${progress}%)`
                : "Start Learning — Free Preview"}
          </button>
          {courseComplete && (
            <button
              type="button"
              onClick={onViewCertificate}
              className="rounded-lg border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              🎓 View Certificate
            </button>
          )}
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Course Overview</h2>
        {meta.overview.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="mt-3 text-slate-600 dark:text-slate-400"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">What You&apos;ll Learn</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {meta.objectives.map((objective) => (
            <li
              key={objective.slice(0, 40)}
              className="flex gap-3 rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-800"
            >
              <span className="text-brand-600 dark:text-brand-400">✓</span>
              {objective}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Prerequisites</h2>
        <ul className="mt-3 space-y-2">
          {meta.prerequisites.map((prerequisite) => (
            <li
              key={prerequisite}
              className="flex gap-3 text-sm text-slate-600 dark:text-slate-400"
            >
              <span>•</span>
              {prerequisite}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Tools & Technologies Covered</h2>
        <div className="mt-4 space-y-3">
          {meta.tools.map((tool) => (
            <div
              key={tool.category}
              className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
            >
              <p className="text-sm font-semibold">{tool.category}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {tool.items}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Grading & Assessment</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {meta.grading.map((grade) => (
            <div
              key={grade.component}
              className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
            >
              <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                {grade.weight}
              </p>
              <p className="mt-1 text-sm font-semibold">{grade.component}</p>
              <p className="mt-1 text-xs text-slate-500">{grade.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ------------------------------ Item view ------------------------------ */

function ItemView({
  item,
  itemIndex,
  totalItems,
  module,
  isCompleted,
  onPrev,
  onCompleteAndContinue,
}: {
  item: CourseItem;
  itemIndex: number;
  totalItems: number;
  module: CourseModule;
  isCompleted: boolean;
  onPrev?: () => void;
  onCompleteAndContinue: () => void;
}) {
  const isLast = itemIndex === totalItems - 1;

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
        Week {module.week} · {module.title}
      </p>

      {item.kind === "lesson" && (
        <LessonView
          lesson={module.lessons.find((lesson) => lesson.id === item.key)!}
        />
      )}
      {item.kind === "lab" && <LabView module={module} />}
      {item.kind === "quiz" && (
        <QuizView
          key={item.key}
          questions={module.quiz}
          alreadyPassed={isCompleted}
          onPassed={onCompleteAndContinue}
          isLast={isLast}
        />
      )}

      {/* Footer navigation (quiz advances via its own submit flow) */}
      <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
        <button
          type="button"
          onClick={onPrev}
          disabled={!onPrev}
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium transition enabled:hover:border-brand-500 enabled:hover:text-brand-600 disabled:opacity-40 dark:border-slate-700"
        >
          ← Previous
        </button>
        <span className="text-xs text-slate-400">
          {itemIndex + 1} / {totalItems}
        </span>
        {item.kind !== "quiz" && (
          <button
            type="button"
            onClick={onCompleteAndContinue}
            className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            {isCompleted
              ? "Continue →"
              : isLast
                ? "Mark Complete & Finish 🎉"
                : "Mark Complete & Continue →"}
          </button>
        )}
      </div>
    </div>
  );
}

function LessonView({ lesson }: { lesson: Lesson }) {
  return (
    <article>
      <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{lesson.title}</h1>
      {lesson.content.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300"
        >
          {paragraph}
        </p>
      ))}
      {lesson.code && (
        <div className="mt-6 overflow-x-auto rounded-xl bg-slate-900 p-5 dark:border dark:border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">
            {lesson.code.label}
          </p>
          <pre className="mt-3 text-sm text-slate-100">
            <code>{lesson.code.body}</code>
          </pre>
        </div>
      )}
      {lesson.bullets && (
        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5 dark:border-brand-800 dark:bg-brand-900/20">
          <p className="text-sm font-bold text-brand-700 dark:text-brand-300">
            🔑 Key Takeaways
          </p>
          <ul className="mt-3 space-y-2">
            {lesson.bullets.map((bullet) => (
              <li
                key={bullet.slice(0, 40)}
                className="flex gap-3 text-sm text-slate-700 dark:text-slate-300"
              >
                <span className="text-brand-600 dark:text-brand-400">→</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function LabView({ module }: { module: CourseModule }) {
  return (
    <article>
      <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
        🧪 Hands-on Lab: {module.lab.title}
      </h1>
      <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300">
        {module.lab.description}
      </p>
      <div className="mt-6 rounded-xl border border-slate-200 p-6 dark:border-slate-800">
        <p className="font-semibold">Lab Steps</p>
        <ol className="mt-4 space-y-3">
          {module.lab.steps.map((step, index) => (
            <li key={step.slice(0, 40)} className="flex gap-4 text-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                {index + 1}
              </span>
              <span className="pt-1 text-slate-700 dark:text-slate-300">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-4 text-sm text-slate-500">
        💡 Complete the lab in your own environment, then mark it complete to
        continue. Labs count toward 40% of your final grade in the full
        program.
      </p>
    </article>
  );
}

/* ------------------------------ Quiz ------------------------------ */

function QuizView({
  questions,
  alreadyPassed,
  onPassed,
  isLast,
}: {
  questions: QuizQuestion[];
  alreadyPassed: boolean;
  onPassed: () => void;
  isLast: boolean;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    questions.map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = answers.every((answer) => answer !== null);
  const score = answers.filter(
    (answer, index) => answer === questions[index].answerIndex
  ).length;
  const passed = score === questions.length;

  function retry() {
    setAnswers(questions.map(() => null));
    setSubmitted(false);
    window.scrollTo({ top: 0 });
  }

  return (
    <div>
      <h1 className="mt-2 text-2xl font-bold sm:text-3xl">❓ Module Quiz</h1>
      <p className="mt-2 text-sm text-slate-500">
        Answer all {questions.length} questions correctly to complete this
        module.
        {alreadyPassed && " You've already passed this quiz — review freely."}
      </p>

      <div className="mt-6 space-y-8">
        {questions.map((question, questionIndex) => {
          const selected = answers[questionIndex];
          return (
            <fieldset
              key={question.question.slice(0, 40)}
              className="rounded-xl border border-slate-200 p-6 dark:border-slate-800"
            >
              <legend className="px-2 text-sm font-semibold text-slate-500">
                Question {questionIndex + 1} of {questions.length}
              </legend>
              <p className="font-semibold">{question.question}</p>
              <div className="mt-4 space-y-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selected === optionIndex;
                  const isCorrect = optionIndex === question.answerIndex;
                  let style =
                    "border-slate-200 hover:border-brand-400 dark:border-slate-700";
                  if (submitted && isCorrect) {
                    style =
                      "border-brand-500 bg-brand-50 dark:bg-brand-900/30";
                  } else if (submitted && isSelected && !isCorrect) {
                    style = "border-rose-400 bg-rose-50 dark:bg-rose-900/20";
                  } else if (isSelected) {
                    style =
                      "border-brand-500 bg-brand-50 dark:bg-brand-900/30";
                  }
                  return (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition ${style}`}
                    >
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        checked={isSelected}
                        disabled={submitted}
                        onChange={() =>
                          setAnswers((prev) => {
                            const next = [...prev];
                            next[questionIndex] = optionIndex;
                            return next;
                          })
                        }
                        className="mt-0.5 accent-brand-600"
                      />
                      <span>{option}</span>
                      {submitted && isCorrect && <span className="ml-auto">✅</span>}
                      {submitted && isSelected && !isCorrect && (
                        <span className="ml-auto">❌</span>
                      )}
                    </label>
                  );
                })}
              </div>
              {submitted && (
                <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                  💡 {question.explanation}
                </p>
              )}
            </fieldset>
          );
        })}
      </div>

      <div className="mt-8">
        {!submitted ? (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            className="w-full rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            {allAnswered
              ? "Submit Answers"
              : `Answer all questions to submit (${answers.filter((a) => a !== null).length}/${questions.length})`}
          </button>
        ) : (
          <div
            className={`rounded-xl border p-6 ${
              passed
                ? "border-brand-300 bg-brand-50 dark:border-brand-700 dark:bg-brand-900/20"
                : "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/20"
            }`}
          >
            <p className="text-lg font-bold">
              {passed ? "🎉 Perfect score!" : `You scored ${score}/${questions.length}`}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {passed
                ? "You've mastered this module. Keep going!"
                : "Review the explanations above and try again — you need all answers correct to pass."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {passed || alreadyPassed ? (
                <button
                  type="button"
                  onClick={onPassed}
                  className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white transition hover:bg-brand-700"
                >
                  {isLast ? "Finish Course 🎓" : "Continue to Next Module →"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={retry}
                  className="rounded-lg bg-amber-500 px-6 py-2.5 font-semibold text-white transition hover:bg-amber-600"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ Certificate ------------------------------ */

function CertificateView({
  meta,
  certificateId,
  courseComplete,
  onBackToCourse,
}: {
  meta: CourseMeta;
  certificateId: string;
  courseComplete: boolean;
  onBackToCourse: () => void;
}) {
  if (!courseComplete) {
    return (
      <div className="py-16 text-center">
        <p className="text-5xl">🔒</p>
        <h1 className="mt-4 text-2xl font-bold">Almost there!</h1>
        <p className="mx-auto mt-2 max-w-md text-slate-600 dark:text-slate-400">
          Complete every lesson, lab, and quiz to unlock your certificate of
          completion.
        </p>
        <button
          type="button"
          onClick={onBackToCourse}
          className="mt-6 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
        >
          Continue Learning
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 text-center">
      <p className="text-6xl">🎉</p>
      <h1 className="mt-4 text-3xl font-bold">Congratulations!</h1>
      <p className="mx-auto mt-2 max-w-md text-slate-600 dark:text-slate-400">
        You&apos;ve completed <strong>{meta.title}</strong> — every
        lesson, lab, and quiz.
      </p>

      <div className="mx-auto mt-10 max-w-xl rounded-2xl border-4 border-double border-brand-600 bg-white p-8 text-center shadow-xl sm:p-10 dark:bg-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-600 text-xl font-bold text-white">
          F
        </div>
        <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-slate-500">
          FINTIGEN Academy
        </p>
        <h2 className="mt-2 text-2xl font-bold text-brand-700 dark:text-brand-300">
          Certificate of Completion
        </h2>
        <p className="mt-6 text-sm text-slate-500">
          This certifies successful completion of
        </p>
        <p className="mt-1 text-lg font-semibold">{meta.title}</p>
        <p className="mt-1 text-sm text-slate-500">{meta.tagline}</p>
        <div className="mt-8 flex items-end justify-between text-left text-xs text-slate-500">
          <div>
            <p className="font-semibold">Verification ID</p>
            <p>{certificateId}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Completed</p>
            <p>
              {new Date().toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-slate-500">
        Create an account to claim a verified, shareable certificate.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Link
          href="/register"
          className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
        >
          Claim Verified Certificate
        </Link>
        <Link
          href="/courses"
          className="rounded-lg border border-slate-300 px-6 py-3 font-semibold transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700"
        >
          Explore More Courses
        </Link>
      </div>
    </div>
  );
}
