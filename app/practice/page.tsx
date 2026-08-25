"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Loader2, CheckCircle2 } from "lucide-react";
import { generateQuiz } from "@/ai/mockAI";

export default function PracticePage() {
  const [subject, setSubject] = useState("Mathematics");
  const [topic, setTopic] = useState("Quadratic Equations");
  const [difficulty, setDifficulty] = useState("Medium");
  const [count, setCount] = useState(5);
  const [quiz, setQuiz] = useState<Awaited<ReturnType<typeof generateQuiz>> | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<{ c: number; t: number; p: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const start = async () => {
    setLoading(true);
    setScore(null);
    try {
      const q = await generateQuiz(subject, topic, difficulty, count);
      setQuiz(q);
      setAnswers({});
    } finally {
      setLoading(false);
    }
  };

  const submit = () => {
    if (!quiz) return;
    let c = 0;
    quiz.forEach((q) => {
      if (answers[q.id] === q.correct || answers[q.id]?.toLowerCase() === q.correct.toLowerCase()) c++;
    });
    setScore({ c, t: quiz.length, p: Math.round((c / quiz.length) * 100) });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <header className="sticky top-0 flex h-14 items-center gap-3 border-b bg-white px-4">
        <Link href="/dashboard"><ArrowLeft className="h-5 w-5 text-slate-500" /></Link>
        <h1 className="font-semibold">Practice & Exam Prep</h1>
      </header>
      <main className="mx-auto max-w-lg px-4 py-6">
        {!quiz ? (
          <div className="rounded-2xl border bg-white p-5 space-y-4">
            <p className="text-sm text-slate-600">Generate AI practice questions. Clearly labelled as practice material — not official WAEC/NECO/JAMB papers.</p>
            <div>
              <label className="text-sm font-medium">Exam focus</label>
              <select className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" defaultValue="WAEC">
                <option>WAEC</option>
                <option>NECO</option>
                <option>JAMB / UTME</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm">
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Biology</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Topic</label>
              <input value={topic} onChange={(e) => setTopic(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Difficulty</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Questions</label>
                <select value={count} onChange={(e) => setCount(+e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm">
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
            </div>
            <button onClick={start} disabled={loading} className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white">
              {loading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Generate quiz"}
            </button>
          </div>
        ) : score ? (
          <div className="rounded-2xl border bg-white p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <p className="mt-4 text-3xl font-bold">{score.c}/{score.t}</p>
            <p className="text-4xl font-bold text-blue-600">{score.p}%</p>
            <button onClick={() => { setQuiz(null); setScore(null); }} className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white">
              New quiz
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {quiz.map((q, i) => (
              <div key={q.id} className="rounded-2xl border bg-white p-4">
                <p className="text-sm font-medium">{i + 1}. {q.question}</p>
                {q.options?.map((o) => (
                  <label key={o} className={`mt-2 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${answers[q.id] === o ? "border-blue-500 bg-blue-50" : ""}`}>
                    <input type="radio" name={q.id} checked={answers[q.id] === o} onChange={() => setAnswers((a) => ({ ...a, [q.id]: o }))} />
                    {o}
                  </label>
                ))}
              </div>
            ))}
            <button onClick={submit} className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white">
              Submit
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
