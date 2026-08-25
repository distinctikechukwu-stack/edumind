"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, Upload, Loader2, ArrowRight } from "lucide-react";
import { solveQuestionFromText } from "@/ai/mockAI";

export default function SnapPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Awaited<ReturnType<typeof solveQuestionFromText>> | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const solve = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const r = await solveQuestionFromText(text);
      setResult(r);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4">
        <Link href="/dashboard"><ArrowLeft className="h-5 w-5 text-slate-500" /></Link>
        <h1 className="font-semibold text-slate-900">Snap & Solve</h1>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        {!result ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-600">
              Upload a photo of any exam question or paste the text. AI will identify the subject, topic, solve it step-by-step and teach the concept.
            </p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="mt-4 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              placeholder="Paste question text or upload image..."
            />
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => fileRef.current?.click()}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-sm font-medium"
              >
                <Upload className="h-4 w-4" /> Image
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setText(`[Image: ${f.name}]\nSolve: 2x² - 7x + 3 = 0`);
                }}
              />
              <button
                onClick={solve}
                disabled={loading || !text.trim()}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                Solve
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{result.subject}</span>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">{result.topic}</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{result.difficulty}</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-medium text-slate-500">Question</p>
              <p className="mt-1 text-sm">{result.question}</p>
              <p className="mt-4 text-sm font-semibold">Steps</p>
              <ol className="mt-2 space-y-2">
                {result.steps.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <div className="mt-4 rounded-xl bg-emerald-50 p-3">
                <p className="text-xs font-semibold text-emerald-700">Answer</p>
                <p className="text-sm font-medium text-emerald-900">{result.finalAnswer}</p>
              </div>
              <p className="mt-4 text-sm font-semibold">Concept</p>
              <p className="mt-1 text-sm text-slate-600">{result.concept}</p>
            </div>
            <button
              onClick={() => setResult(null)}
              className="w-full rounded-xl border border-slate-300 py-2.5 text-sm font-medium"
            >
              Solve another
            </button>
            <Link
              href="/tutor"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white"
            >
              Discuss with AI Tutor <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
