"use client";

import { FormEvent, useMemo, useState } from "react";

type Mode = "tutor" | "quiz" | "project" | "career" | "study" | "mission";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const tools: Array<{ mode: Mode; label: string; icon: string; description: string }> = [
  { mode: "tutor", label: "Socratic Tutor", icon: "🧑‍🏫", description: "Get guided explanations, hints, and concept checks." },
  { mode: "quiz", label: "Adaptive Quiz", icon: "🧠", description: "Generate increasingly difficult practice with explanations." },
  { mode: "project", label: "Project Coach", icon: "🛠️", description: "Turn a skill into a portfolio-ready project and milestones." },
  { mode: "career", label: "Career Agent", icon: "🎯", description: "Connect skills to jobs, freelancing, internships, and proof of work." },
  { mode: "study", label: "Mastery Coach", icon: "📈", description: "Build a 7-day adaptive study plan with spaced review." },
  { mode: "mission", label: "Agent Mission", icon: "🤖", description: "Tutor + project + career agents collaborate on one goal." },
];

export default function AiLabPage() {
  const [mode, setMode] = useState<Mode>("tutor");
  const [courseTitle, setCourseTitle] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const selected = useMemo(() => tools.find((tool) => tool.mode === mode)!, [mode]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const clean = message.trim();
    if (!clean || loading) return;

    setError("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: clean }]);
    setMessage("");

    try {
      if (!apiBase) throw new Error("NEXT_PUBLIC_API_URL is not configured.");
      const endpoint = mode === "mission" ? `${apiBase}/ai/mission` : `${apiBase}/ai/coach`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          message: clean,
          courseTitle,
          moduleTitle,
          level,
          goal,
          progress: "Interactive session",
          history: messages.slice(-6),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || data.message || "AI service request failed.");
      setMessages((prev) => [...prev, { role: "assistant", content: data.content || "No response returned." }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reach the AI learning service.");
    } finally {
      setLoading(false);
    }
  }

  function startPrompt(prompt: string) {
    setMessage(prompt);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <section className="rounded-3xl bg-gradient-to-br from-violet-950 via-slate-900 to-brand-950 p-7 text-white sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">FINTIGEN Agentic Learning Lab</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Learn with a team of AI agents, not a single chatbot.</h1>
        <p className="mt-4 max-w-3xl text-slate-300">Choose a specialist for tutoring, assessment, projects, careers, or mastery planning. Agent Mission mode combines multiple specialists into one practical learning plan.</p>
      </section>

      <section className="mt-8 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {tools.map((tool) => (
          <button
            key={tool.mode}
            type="button"
            onClick={() => setMode(tool.mode)}
            className={`rounded-2xl border p-4 text-left transition ${mode === tool.mode ? "border-violet-500 bg-violet-50 ring-2 ring-violet-200 dark:bg-violet-950/30 dark:ring-violet-900" : "border-slate-200 bg-white hover:border-violet-300 dark:border-slate-800 dark:bg-slate-950"}`}
          >
            <div className="text-2xl">{tool.icon}</div>
            <div className="mt-2 font-bold">{tool.label}</div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{tool.description}</p>
          </button>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="font-bold">Learner Context</h2>
          <p className="mt-1 text-sm text-slate-500">Give the agents enough context to personalize the response.</p>
          <div className="mt-5 space-y-4">
            <label className="block text-sm font-medium">Course or skill
              <input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder="e.g. Agentic AI" className="mt-1 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" />
            </label>
            <label className="block text-sm font-medium">Current topic
              <input value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} placeholder="e.g. Tool calling" className="mt-1 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" />
            </label>
            <label className="block text-sm font-medium">Level
              <select value={level} onChange={(e) => setLevel(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700">
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </select>
            </label>
            <label className="block text-sm font-medium">Goal
              <textarea value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="What do you want to be able to do?" rows={4} className="mt-1 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700" />
            </label>
          </div>
          <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quick starts</p>
            <div className="mt-2 flex flex-col gap-2">
              <button type="button" onClick={() => startPrompt("Explain this topic with a simple analogy, then test me with one question.")} className="rounded-lg bg-slate-100 px-3 py-2 text-left text-xs hover:bg-slate-200 dark:bg-slate-900">Explain + test me</button>
              <button type="button" onClick={() => startPrompt("Find my likely prerequisite gaps and give me the fastest way to close them.")} className="rounded-lg bg-slate-100 px-3 py-2 text-left text-xs hover:bg-slate-200 dark:bg-slate-900">Find my skill gaps</button>
              <button type="button" onClick={() => startPrompt("Give me a small real-world project I can finish and show in my portfolio.")} className="rounded-lg bg-slate-100 px-3 py-2 text-left text-xs hover:bg-slate-200 dark:bg-slate-900">Build portfolio proof</button>
            </div>
          </div>
        </aside>

        <div className="flex min-h-[640px] flex-col rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <div className="flex items-center gap-3"><span className="text-2xl">{selected.icon}</span><div><h2 className="font-bold">{selected.label}</h2><p className="text-xs text-slate-500">{selected.description}</p></div></div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                <div className="text-4xl">{selected.icon}</div>
                <h3 className="mt-3 text-lg font-bold">Start a {selected.label} session</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">Describe what you are learning, where you are stuck, or what you want to build. Your context stays in this browser session unless your backend stores it separately.</p>
              </div>
            )}
            {messages.map((entry, index) => (
              <div key={`${entry.role}-${index}`} className={`max-w-3xl rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${entry.role === "user" ? "ml-auto bg-brand-600 text-white" : "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100"}`}>{entry.content}</div>
            ))}
            {loading && <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm dark:bg-slate-900">FINTIGEN agents are working…</div>}
            {error && <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">{error}</div>}
          </div>
          <form onSubmit={submit} className="border-t border-slate-200 p-4 dark:border-slate-800">
            <div className="flex gap-3">
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder={`Ask the ${selected.label}…`} className="min-h-[84px] flex-1 resize-none rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-violet-500 dark:border-slate-700" />
              <button type="submit" disabled={loading || !message.trim()} className="self-end rounded-xl bg-violet-600 px-5 py-3 font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50">Send</button>
            </div>
            <p className="mt-2 text-xs text-slate-500">AI can make mistakes. Verify important technical, financial, legal, or career information before acting on it.</p>
          </form>
        </div>
      </section>
    </main>
  );
}
