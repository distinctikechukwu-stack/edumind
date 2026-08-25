"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Brain,
  Camera,
  Upload,
  Loader2,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  BarChart3,
  Calendar,
  Sparkles,
  Home,
  RotateCcw,
} from "lucide-react";
import { solveQuestionFromText, generateQuiz, analyzePerformance, createStudyPlan } from "@/ai/mockAI";

type Stage =
  | "upload"
  | "solving"
  | "result"
  | "quiz"
  | "quiz-result"
  | "analysis"
  | "plan";

export default function DemoPage() {
  const [stage, setStage] = useState<Stage>("upload");
  const [questionText, setQuestionText] = useState(
    "Solve the quadratic equation: 2x² - 7x + 3 = 0. Find the roots and show your working."
  );
  const [solveResult, setSolveResult] = useState<Awaited<ReturnType<typeof solveQuestionFromText>> | null>(null);
  const [quiz, setQuiz] = useState<Awaited<ReturnType<typeof generateQuiz>> | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number; pct: number } | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [plan, setPlan] = useState<Awaited<ReturnType<typeof createStudyPlan>> | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSolve = async () => {
    setLoading(true);
    setStage("solving");
    try {
      const result = await solveQuestionFromText(questionText);
      setSolveResult(result);
      setStage("result");
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setQuestionText(
        `[Image uploaded: ${file.name}]\n\nSolve the quadratic equation: 2x² - 7x + 3 = 0. Find the roots and show your working.`
      );
    }
  };

  const startQuiz = async () => {
    if (!solveResult) return;
    setLoading(true);
    try {
      const q = await generateQuiz(solveResult.subject, solveResult.topic, solveResult.difficulty, 5);
      setQuiz(q);
      setAnswers({});
      setStage("quiz");
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = () => {
    if (!quiz) return;
    let correct = 0;
    quiz.forEach((q) => {
      if (answers[q.id]?.trim().toLowerCase() === q.correct.toLowerCase() || answers[q.id] === q.correct) {
        correct++;
      }
    });
    const pct = Math.round((correct / quiz.length) * 100);
    setQuizScore({ correct, total: quiz.length, pct });
    setStage("quiz-result");
  };

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const text = await analyzePerformance({
        scores: [
          { subject: "Mathematics", score: 82 },
          { subject: "Physics", score: 71 },
        ],
        recentTopics: [solveResult?.topic || "Quadratic Equations"],
        weakAreas: ["Trigonometry", solveResult?.topic || "Algebra"],
      });
      setAnalysis(text);
      setStage("analysis");
    } finally {
      setLoading(false);
    }
  };

  const generatePlan = async () => {
    setLoading(true);
    try {
      const p = await createStudyPlan({
        exam: "WAEC",
        examDate: "2026-05-15",
        subjects: ["Mathematics", "Physics", "Chemistry"],
        hoursPerDay: 2.5,
        targetScore: 85,
      });
      setPlan(p);
      setStage("plan");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStage("upload");
    setSolveResult(null);
    setQuiz(null);
    setAnswers({});
    setQuizScore(null);
    setAnalysis("");
    setPlan(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Brain className="h-5 w-5 text-blue-600" />
            EduMind Demo
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restart
            </button>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white"
            >
              <Home className="h-3.5 w-3.5" />
              Full App
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between text-xs font-medium text-slate-500">
          {["Upload", "Solve", "Quiz", "Analysis", "Plan"].map((label, i) => {
            const active =
              ((stage === "upload" || stage === "solving") && i === 0) ||
              (stage === "result" && i === 1) ||
              ((stage === "quiz" || stage === "quiz-result") && i === 2) ||
              (stage === "analysis" && i === 3) ||
              (stage === "plan" && i === 4);
            return (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${active ? "bg-blue-600" : "bg-slate-300"}`} />
                <span className={active ? "text-blue-600" : ""}>{label}</span>
              </div>
            );
          })}
        </div>

        {(stage === "upload" || stage === "solving") && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Camera className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Snap & Solve</h1>
                <p className="text-sm text-slate-500">Upload a question image or paste text</p>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-slate-700">Question</label>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                rows={5}
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Paste a maths, physics or chemistry question..."
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Upload className="h-4 w-4" />
                Upload photo of question
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <button
                onClick={handleSolve}
                disabled={loading || !questionText.trim()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Reading & solving...
                  </>
                ) : (
                  <>
                    Solve with AI
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Demo uses intelligent mock AI. Real deployment connects to vision + LLM models.
            </p>
          </div>
        )}

        {stage === "result" && solveResult && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {solveResult.subject}
                </span>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {solveResult.topic}
                </span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  {solveResult.difficulty}
                </span>
              </div>

              <h2 className="mt-4 text-sm font-medium text-slate-500">Recognised question</h2>
              <p className="mt-1 text-slate-900">{solveResult.question}</p>

              <h2 className="mt-6 text-sm font-semibold text-slate-900">Step-by-step solution</h2>
              <ol className="mt-3 space-y-3">
                {solveResult.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-slate-700">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-xl bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Final answer</p>
                <p className="mt-1 font-medium text-emerald-900">{solveResult.finalAnswer}</p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-900">Concept</p>
                <p className="mt-1 text-sm text-slate-600">{solveResult.concept}</p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-900">Tips</p>
                <ul className="mt-1 list-inside list-disc text-sm text-slate-600">
                  {solveResult.tips.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">Practice similar questions</h3>
              <ul className="mt-3 space-y-2">
                {solveResult.similarQuestions.map((q, i) => (
                  <li key={i} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                    {q}
                  </li>
                ))}
              </ul>
              <button
                onClick={startQuiz}
                disabled={loading}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookOpen className="h-4 w-4" />}
                Generate 5 practice questions & take quiz
              </button>
            </div>
          </div>
        )}

        {stage === "quiz" && quiz && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900">Practice Quiz</h2>
              <p className="text-sm text-slate-500">
                {solveResult?.topic} · {quiz.length} questions · Auto-marked
              </p>
            </div>
            {quiz.map((q, idx) => (
              <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-medium text-slate-900">
                  {idx + 1}. {q.question}
                </p>
                {q.options ? (
                  <div className="mt-3 space-y-2">
                    {q.options.map((opt) => (
                      <label
                        key={opt}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
                          answers[q.id] === opt
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt}
                          checked={answers[q.id] === opt}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                          className="h-4 w-4 text-blue-600"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={answers[q.id] || ""}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                    className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    placeholder="Type your answer"
                  />
                )}
              </div>
            ))}
            <button
              onClick={submitQuiz}
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Submit quiz
            </button>
          </div>
        )}

        {stage === "quiz-result" && quizScore && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              {quizScore.correct} / {quizScore.total}
            </h2>
            <p className="text-4xl font-bold text-blue-600">{quizScore.pct}%</p>
            <p className="mt-2 text-sm text-slate-500">
              Correct: {quizScore.correct} · Incorrect: {quizScore.total - quizScore.correct}
            </p>
            <button
              onClick={runAnalysis}
              disabled={loading}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BarChart3 className="h-4 w-4" />}
              Run AI Performance Analysis
            </button>
          </div>
        )}

        {stage === "analysis" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-bold text-slate-900">AI Learning Coach</h2>
              </div>
              <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {analysis}
              </div>
            </div>
            <button
              onClick={generatePlan}
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calendar className="h-4 w-4" />}
              Generate Personalised Study Plan
            </button>
          </div>
        )}

        {stage === "plan" && plan && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900">Your Smart Study Plan</h2>
              <p className="text-sm text-slate-500">WAEC · Adapted to your performance</p>
              <div className="mt-6 space-y-4">
                {plan.map((day) => (
                  <div key={day.day} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{day.day}</p>
                    <div className="mt-2 space-y-2">
                      {day.sessions.map((s, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">
                            {s.time} · {s.subject} · {s.topic}
                          </span>
                          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-700">
                            {s.duration} min
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
              <p className="mt-2 font-semibold text-emerald-900">Demo complete</p>
              <p className="mt-1 text-sm text-emerald-700">
                You experienced: Snap & Solve → Explanation → Quiz → AI Analysis → Study Plan
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <button
                  onClick={reset}
                  className="rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-medium text-emerald-800"
                >
                  Run again
                </button>
                <Link
                  href="/dashboard"
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Explore full platform
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
