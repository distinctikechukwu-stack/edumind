"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Brain,
  Camera,
  BookOpen,
  BarChart3,
  Calendar,
  Sparkles,
  Trophy,
  Mic,
  FileText,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Snap & Solve",
    desc: "Upload any question photo. Get subject, topic, step-by-step solution, concept explanation and similar practice questions.",
  },
  {
    icon: Brain,
    title: "AI Tutor",
    desc: "Conversational tutor that explains, gives examples, tests you, adjusts difficulty and detects misconceptions.",
  },
  {
    icon: BookOpen,
    title: "Exam Prep",
    desc: "Timed practice tests for WAEC, NECO & JAMB with AI-generated questions clearly labelled as practice material.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    desc: "See mastery by subject and topic, track improvement, and get precise AI recommendations.",
  },
  {
    icon: Calendar,
    title: "Smart Study Planner",
    desc: "Personalised daily schedules based on your exam date, available hours and current weaknesses.",
  },
  {
    icon: Sparkles,
    title: "AI Learning Coach",
    desc: "Analyses your real activity and tells you exactly what to study next and for how long.",
  },
];

export default function LandingPage() {
  const [demoLoading, setDemoLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Brain className="h-5 w-5" />
            </div>
            <span className="text-lg tracking-tight">EduMind AI</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#how" className="hover:text-slate-900">How it works</a>
            <a href="#demo" className="hover:text-slate-900">Demo</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 sm:block"
            >
              Log in
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Try Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <Zap className="h-3.5 w-3.5" />
            Built for Nigerian students • WAEC · NECO · JAMB
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Learn Smarter.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Prepare Better.
            </span>
            <br />
            Achieve More.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            EduMind AI is your intelligent academic companion. Snap any question,
            get clear explanations, practise with purpose, and follow a study plan
            that adapts to your real performance.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 sm:w-auto"
            >
              Launch Competition Demo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              Create free account
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            No credit card · Works on phone · Demo ready in seconds
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-200 bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Everything a serious student needs
            </h2>
            <p className="mt-3 text-slate-600">
              Not just another chatbot — a complete learning system that understands you.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition hover:border-blue-200 hover:bg-white hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - competition flow */}
      <section id="how" className="border-t border-slate-200 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            The core learning loop
          </h2>
          <p className="mt-3 text-center text-slate-600">
            Question → Explanation → Practice → Analysis → Personalised plan
          </p>
          <div className="mt-12 space-y-4">
            {[
              { step: "1", title: "Snap or type a question", desc: "Upload a photo or paste text. AI reads it." },
              { step: "2", title: "Get a full teaching response", desc: "Subject, topic, difficulty, steps, concept, similar questions." },
              { step: "3", title: "Practise with generated quiz", desc: "Timed MCQ / True-False / Short answer with auto-marking." },
              { step: "4", title: "See AI analysis", desc: "Strengths, weaknesses and exact next actions." },
              { step: "5", title: "Follow smart study plan", desc: "Schedule that updates as you improve." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="border-t border-slate-200 bg-slate-900 px-4 py-20 text-white sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Trophy className="mx-auto h-12 w-12 text-amber-400" />
          <h2 className="mt-6 text-3xl font-bold">Ready for the judges?</h2>
          <p className="mt-3 text-slate-300">
            One click opens the full competition demo: Snap & Solve → AI Tutor → Quiz → Analytics → Study Plan.
          </p>
          <Link
            href="/demo"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Start Demo Experience
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
        <p className="font-medium text-slate-700">EduMind AI</p>
        <p className="mt-1">Learn Smarter. Prepare Better. Achieve More.</p>
        <p className="mt-4">AI-generated practice material · Not affiliated with WAEC, NECO or JAMB</p>
      </footer>
    </div>
  );
}
