"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Brain } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@edumind.ai");
  const [password, setPassword] = useState("demo1234");
  const router = useRouter();

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: accept any credentials and go to dashboard
    if (typeof window !== "undefined") {
      localStorage.setItem("edumind_user", JSON.stringify({ email, name: "Jordan" }));
    }
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Brain className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to EduMind AI</p>
        </div>
        <form onSubmit={handle} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            Sign in
          </button>
          <p className="text-center text-xs text-slate-500">
            Demo credentials pre-filled. Any values work.
          </p>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          No account?{" "}
          <Link href="/register" className="font-semibold text-blue-600">
            Create one
          </Link>
        </p>
        <p className="mt-2 text-center">
          <Link href="/demo" className="text-sm font-medium text-slate-500 hover:text-blue-600">
            Or try the competition demo →
          </Link>
        </p>
      </div>
    </div>
  );
}
