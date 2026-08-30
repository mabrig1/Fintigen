"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { getLearningSessionId } from "@/lib/learning-session";

type Mode = "tutor" | "quiz" | "project" | "career" | "study" | "diagnostic" | "mission";

type Source = {
  citation: number;
  id: string;
  label: string;
  course: string;
  module: string;
  module_slug: string;
  excerpt: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

type AiResponse = {
  content?: string;
  error?: string;
  message?: string;
  sources?: Source[];
};

type RecognitionResult = {
  0?: { transcript?: string };
};

type RecognitionEvent = {
  results: ArrayLike<RecognitionResult>;
};

type RecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
};

type RecognitionConstructor = new () => RecognitionInstance;

type SpeechWindow = Window & {
  SpeechRecognition?: RecognitionConstructor;
  webkitSpeechRecognition?: RecognitionConstructor;
};

const tools: Array<{ mode: Mode; label: string; icon: string; description: string }> = [
  { mode: "tutor", label: "Socratic Tutor", icon: "🧑‍🏫", description: "Guided explanations, hints, and concept checks." },
  { mode: "quiz", label: "Adaptive Quiz", icon: "🧠", description: "Practice that increases in difficulty with feedback." },
  { mode: "project", label: "Project Coach", icon: "🛠️", description: "Turn a skill into portfolio milestones and proof." },
  { mode: "career", label: "Career Agent", icon: "🎯", description: "Connect skills to realistic work and opportunity paths." },
  { mode: "study", label: "Mastery Coach", icon: "📈", description: "Build a 7-day plan with spaced review and practice." },
  { mode: "diagnostic", label: "Skills Diagnostic", icon: "🩺", description: "Find prerequisite gaps and generate a personal pathway." },
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
  const [sessionId, setSessionId] = useState("");
  const [grounded, setGrounded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const selected = useMemo(() => tools.find((tool) => tool.mode === mode)!, [mode]);

  useEffect(() => {
    setSessionId(getLearningSessionId());
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const clean = message.trim();
    if (!clean || loading) return;

    setError("");
    setNotice("");
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
          sessionId,
          grounded,
          progress: "Interactive AI Lab session",
          history: messages.slice(-6).map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as AiResponse;
      if (!response.ok) throw new Error(data.error || data.message || "AI service request failed.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content || "No response returned.",
          sources: Array.isArray(data.sources) ? data.sources : [],
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reach the AI learning service.");
    } finally {
      setLoading(false);
    }
  }

  function startPrompt(prompt: string, nextMode?: Mode) {
    if (nextMode) setMode(nextMode);
    setMessage(prompt);
  }

  function startListening() {
    setError("");
    const speechWindow = window as SpeechWindow;
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setError("Voice input is not supported by this browser. You can still type your question.");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "en-GB";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript || "")
        .join(" ")
        .trim();
      if (transcript) setMessage((current) => `${current}${current ? " " : ""}${transcript}`);
    };
    recognition.onerror = () => {
      setError("Voice input could not be captured. Please try again or type your question.");
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    setListening(true);
    recognition.start();
  }

  function readAloud(text: string) {
    if (!("speechSynthesis" in window)) {
      setError("Read-aloud is not supported by this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 12000));
    utterance.lang = "en-GB";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }

  async function saveToReview(entry: ChatMessage) {
    setError("");
    setNotice("");
    try {
      if (!apiBase || !sessionId) throw new Error("Learning memory is not ready yet.");
      const concept = (moduleTitle || courseTitle || goal || "AI learning note").slice(0, 200);
      const firstSource = entry.sources?.[0];
      const response = await fetch(`${apiBase}/learning/review/seed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          concept,
          prompt: `Without looking at notes, explain ${concept} in your own words and give one practical example.`,
          sourceLabel: firstSource?.label || "",
          sourceRef: firstSource?.id || "",
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string; message?: string };
      if (!response.ok) throw new Error(data.error || data.message || "Could not add review item.");
      setNotice(`Saved “${concept}” to your spaced-review queue.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save this review item.");
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <section className="rounded-3xl bg-gradient-to-br from-violet-950 via-slate-900 to-brand-950 p-7 text-white sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">FINTIGEN Agentic Learning Lab</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-bold sm:text-5xl">Learn with agents that remember, retrieve, test, and adapt.</h1>
            <p className="mt-4 max-w-3xl text-slate-300">Your AI team can ground answers in FINTIGEN course material, track review evidence across sessions, diagnose skill gaps, and turn weak concepts into a spaced-repetition queue.</p>
          </div>
          <Link href="/review" className="shrink-0 rounded-xl border border-violet-300/40 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20">Open Review Queue →</Link>
        </div>
      </section>

      <section className="mt-8 grid gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
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
          <p className="mt-1 text-sm text-slate-500">This context is attached to the anonymous learning session stored in this browser.</p>
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
            <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800">
              <input type="checkbox" checked={grounded} onChange={(e) => setGrounded(e.target.checked)} className="mt-1 accent-violet-600" />
              <span><strong>Ground in FINTIGEN course content</strong><span className="mt-1 block text-xs text-slate-500">When matching course material exists, answers include numbered source citations.</span></span>
            </label>
          </div>
          <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quick starts</p>
            <div className="mt-2 flex flex-col gap-2">
              <button type="button" onClick={() => startPrompt("Explain this topic with a simple analogy, then test me with one question.", "tutor")} className="rounded-lg bg-slate-100 px-3 py-2 text-left text-xs hover:bg-slate-200 dark:bg-slate-900">Explain + test me</button>
              <button type="button" onClick={() => startPrompt("Interview me briefly about what I can already do, identify my prerequisite gaps, then build a personalized learning pathway with measurable checkpoints.", "diagnostic")} className="rounded-lg bg-slate-100 px-3 py-2 text-left text-xs hover:bg-slate-200 dark:bg-slate-900">Run skills diagnostic</button>
              <button type="button" onClick={() => startPrompt("Give me a small real-world project I can finish and show in my portfolio.", "project")} className="rounded-lg bg-slate-100 px-3 py-2 text-left text-xs hover:bg-slate-200 dark:bg-slate-900">Build portfolio proof</button>
            </div>
          </div>
        </aside>

        <div className="flex min-h-[680px] flex-col rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <div className="flex items-center gap-3"><span className="text-2xl">{selected.icon}</span><div><h2 className="font-bold">{selected.label}</h2><p className="text-xs text-slate-500">{selected.description}</p></div></div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                <div className="text-4xl">{selected.icon}</div>
                <h3 className="mt-3 text-lg font-bold">Start a {selected.label} session</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">Describe what you are learning, where you are stuck, or what you want to build. FINTIGEN can retain your learning context and review schedule under an anonymous browser session ID.</p>
              </div>
            )}
            {messages.map((entry, index) => (
              <div key={`${entry.role}-${index}`} className={`max-w-3xl rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${entry.role === "user" ? "ml-auto bg-brand-600 text-white" : "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100"}`}>
                <div>{entry.content}</div>
                {entry.role === "assistant" && (
                  <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => readAloud(entry.content)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:border-violet-400 dark:border-slate-700">🔊 Read aloud</button>
                      <button type="button" onClick={() => saveToReview(entry)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:border-violet-400 dark:border-slate-700">🧠 Save to review</button>
                    </div>
                    {!!entry.sources?.length && (
                      <div className="mt-3 rounded-xl bg-white/70 p-3 dark:bg-slate-950/60">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Course sources</p>
                        <div className="mt-2 space-y-2">
                          {entry.sources.map((source) => (
                            <div key={source.id} className="text-xs text-slate-600 dark:text-slate-400"><strong>[{source.citation}] {source.label}</strong><span className="mt-0.5 block">{source.excerpt.slice(0, 220)}{source.excerpt.length > 220 ? "…" : ""}</span></div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm dark:bg-slate-900">FINTIGEN agents are retrieving context and working…</div>}
            {notice && <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{notice}</div>}
            {error && <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">{error}</div>}
          </div>
          <form onSubmit={submit} className="border-t border-slate-200 p-4 dark:border-slate-800">
            <div className="flex flex-col gap-3 sm:flex-row">
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder={`Ask the ${selected.label}…`} className="min-h-[84px] flex-1 resize-none rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-violet-500 dark:border-slate-700" />
              <div className="flex gap-2 sm:flex-col sm:justify-end">
                <button type="button" onClick={startListening} disabled={listening} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold transition hover:border-violet-400 disabled:opacity-50 dark:border-slate-700">{listening ? "Listening…" : "🎙 Speak"}</button>
                <button type="submit" disabled={loading || !message.trim()} className="rounded-xl bg-violet-600 px-5 py-3 font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50">Send</button>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500">AI can make mistakes. Course citations show which FINTIGEN material informed an answer; verify important external technical, financial, legal, or career information before acting.</p>
          </form>
        </div>
      </section>
    </main>
  );
}
