"use client";

import Link from "next/link";
import { useQuestionProgress } from "@/lib/progress";

const difficultyColors = {
  Easy: "text-emerald-700 border-emerald-200 bg-emerald-50",
  Medium: "text-amber-700 border-amber-200 bg-amber-50",
  Hard: "text-rose-700 border-rose-200 bg-rose-50",
};

const statusStyles = {
  done: "border-emerald-300 ring-2 ring-emerald-100",
  review: "border-amber-300 ring-2 ring-amber-100",
};

export default function QuestionCard({ question, pattern }) {
  const [status] = useQuestionProgress(question.id);

  return (
    <Link
      href={`/questions/${question.id}`}
      className={`group block rounded-3xl border bg-white/55 backdrop-blur-xl p-5 shadow-[0_4px_24px_-8px_rgba(80,80,120,0.15)] hover:shadow-[0_8px_32px_-8px_rgba(80,80,120,0.25)] hover:-translate-y-0.5 hover:border-white transition-all duration-300 ${
        status ? statusStyles[status] : "border-white/70"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`shrink-0 text-xs px-2.5 py-1 rounded-full border font-medium ${difficultyColors[question.difficulty]}`}
          >
            {question.difficulty}
          </span>
          <span className="text-base font-semibold text-[#232338] truncate group-hover:text-violet-700 transition-colors">
            {question.title}
          </span>
          {status === "done" && <span className="shrink-0 text-emerald-500 text-sm">✅</span>}
          {status === "review" && <span className="shrink-0 text-amber-500 text-sm">🔖</span>}
        </div>
        <span className="shrink-0 text-slate-300 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all text-lg">
          →
        </span>
      </div>

      <p className="text-sm text-slate-500 mt-2.5 leading-relaxed line-clamp-2">
        {question.simpleExplanation}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {question.category && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100 font-medium">
            {question.category}
          </span>
        )}
        {pattern && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-100 font-medium">
            🧩 {pattern.name}
          </span>
        )}
      </div>
    </Link>
  );
}
