"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Brain } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Brain className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="text-sm text-slate-500">Start learning smarter</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("edumind_user", JSON.stringify({ name, email }));
            router.push("/dashboard");
          }}
          className="space-y-4 rounded-2xl border bg-white p-6"
        >
          <input required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border px-3 py-2.5 text-sm" />
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border px-3 py-2.5 text-sm" />
          <input required type="password" placeholder="Password" className="w-full rounded-xl border px-3 py-2.5 text-sm" />
          <button type="submit" className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white">Create account</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link href="/login" className="font-semibold text-blue-600">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
