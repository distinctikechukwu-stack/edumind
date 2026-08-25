"use client";

import Link from "next/link";
import {
  Brain,
  Camera,
  BookOpen,
  BarChart3,
  Calendar,
  MessageCircle,
  FileText,
  Trophy,
  Flame,
  Target,
  ChevronRight,
  Mic,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { getGreeting } from "@/lib/utils";

const subjects = [
  { name: "Mathematics", score: 78, color: "bg-blue-500" },
  { name: "Physics", score: 71, color: "bg-violet-500" },
  { name: "Chemistry", score: 84, color: "bg-emerald-500" },
  { name: "Biology", score: 76, color: "bg-amber-500" },
];

const quickActions = [
  { href: "/snap", icon: Camera, label: "Snap & Solve", desc: "Photo a question" },
  { href: "/tutor", icon: MessageCircle, label: "AI Tutor", desc: "Ask anything" },
  { href: "/practice", icon: BookOpen, label: "Practice", desc: "Quizzes & tests" },
  { href: "/planner", icon: Calendar, label: "Study Plan", desc: "Your schedule" },
  { href: "/analytics", icon: BarChart3, label: "Analytics", desc: "See progress" },
  { href: "/documents", icon: FileText, label: "Documents", desc: "PDF & notes AI" },
];

export default function DashboardPage() {
  const greeting = getGreeting();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Brain className="h-4 w-4" />
            </div>
            <span className="font-semibold text-slate-900">EduMind</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
              <Flame className="h-3.5 w-3.5" /> 7
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
              JS
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        <div className="mb-6">
          <p className="text-sm text-slate-500">{greeting} 👋</p>
          <h1 className="text-xl font-bold text-slate-900">Welcome back, Jordan</h1>
        </div>

        {/* Streak + XP */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-medium text-slate-500">Study streak</p>
            <p className="mt-1 flex items-center gap-1 text-2xl font-bold text-slate-900">
              <Flame className="h-5 w-5 text-orange-500" /> 7 days
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-medium text-slate-500">XP · Level 4</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">1,840</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-3/4 rounded-full bg-blue-600" />
            </div>
          </div>
        </div>

        {/* Progress */}
        <section className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Your progress</h2>
            <Link href="/analytics" className="text-xs font-medium text-blue-600">
              Details
            </Link>
          </div>
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            {subjects.map((s) => (
              <div key={s.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{s.name}</span>
                  <span className="text-slate-500">{s.score}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${s.color}`}
                    style={{ width: `${s.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Recommendation */}
        <section className="mb-6 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-slate-900">AI Recommendation</p>
              <p className="mt-1 text-sm text-slate-600">
                Focus on <strong>Trigonometry</strong> for 25 minutes, then do 10 practice questions.
                Your Algebra improved 14% last week — same method works here.
              </p>
              <Link
                href="/tutor?topic=Trigonometry"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-600"
              >
                Start lesson <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Continue */}
        <section className="mb-6">
          <h2 className="mb-3 font-semibold text-slate-900">Continue learning</h2>
          <Link
            href="/tutor?topic=Quadratic%20Equations"
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Target className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-900">Quadratic Equations</p>
              <p className="text-xs text-slate-500">Mathematics · Medium · 12 min left</p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </Link>
        </section>

        {/* Quick actions */}
        <section>
          <h2 className="mb-3 font-semibold text-slate-900">Quick actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex flex-col items-start rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <a.icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-slate-900">{a.label}</p>
                <p className="text-xs text-slate-500">{a.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Achievements teaser */}
        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent badges</h2>
            <Link href="/achievements" className="text-xs font-medium text-blue-600">
              All
            </Link>
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {[
              { icon: Flame, label: "7-Day Streak" },
              { icon: Trophy, label: "First Perfect" },
              { icon: BookOpen, label: "100 Questions" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex min-w-[100px] flex-col items-center rounded-xl border border-slate-200 bg-white p-3"
              >
                <b.icon className="h-6 w-6 text-amber-500" />
                <p className="mt-1 text-center text-xs font-medium text-slate-700">{b.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
          {[
            { href: "/dashboard", icon: HomeIcon, label: "Home" },
            { href: "/tutor", icon: MessageCircle, label: "Tutor" },
            { href: "/snap", icon: Camera, label: "Snap" },
            { href: "/practice", icon: BookOpen, label: "Practice" },
            { href: "/profile", icon: UserIcon, label: "Profile" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-slate-500 hover:text-blue-600"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
