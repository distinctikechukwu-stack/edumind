"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Brain, Send, ArrowLeft, Mic, Volume2, Loader2 } from "lucide-react";
import { chatWithTutor, type TutorMessage } from "@/ai/mockAI";

export default function TutorPage() {
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI Tutor. I can explain concepts, give examples, test you, and adjust difficulty. What would you like to learn today?\n\nTry: \"Explain quadratic equations\" or \"Teach me Newton's laws\".",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: TutorMessage = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const reply = await chatWithTutor([...messages, userMsg]);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } finally {
      setLoading(false);
    }
  };

  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text.slice(0, 400));
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    }
  };

  const startVoice = () => {
    if (typeof window === "undefined") return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert("Voice input is not supported in this browser. Please type instead.");
      return;
    }
    const rec = new SR();
    rec.lang = "en-NG";
    rec.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
    };
    rec.start();
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4">
        <Link href="/dashboard" className="text-slate-500">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Brain className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">AI Tutor</p>
            <p className="text-[10px] text-emerald-600">Online · Context aware</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto max-w-lg space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-800"
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>
                {m.role === "assistant" && (
                  <button
                    onClick={() => speak(m.content)}
                    className="mt-2 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600"
                  >
                    <Volume2 className="h-3 w-3" /> Read aloud
                  </button>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white p-3">
        <div className="mx-auto flex max-w-lg items-end gap-2">
          <button
            onClick={startVoice}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
            title="Ask by voice"
          >
            <Mic className="h-4 w-4" />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Ask me anything..."
            className="max-h-32 flex-1 resize-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
