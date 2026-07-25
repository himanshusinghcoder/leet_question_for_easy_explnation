"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPatternById, getQuestionsByPattern } from "@/lib/data";

const difficultyColors = {
  Easy: "text-emerald-700 border-emerald-200 bg-emerald-50",
  Medium: "text-amber-700 border-amber-200 bg-amber-50",
  Hard: "text-rose-700 border-rose-200 bg-rose-50",
};

export default function PatternDetailPage({ params }) {
  const { id } = use(params);
  const pattern = getPatternById(id);

  if (!pattern) notFound();

  const relatedQuestions = getQuestionsByPattern(pattern.id);

  return (
    <div className="min-h-screen text-[#232338]">
      {/* Top bar */}
      <header className="border-b border-white/60 bg-white/40 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-violet-600 font-medium transition-colors flex items-center gap-1.5"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Title block */}
        <div className="rounded-3xl border border-violet-100 bg-violet-50/60 backdrop-blur-xl p-6 shadow-[0_4px_30px_-10px_rgba(80,80,120,0.15)]">
          <span className="text-xs px-2.5 py-1 rounded-full bg-white text-violet-600 border border-violet-200 font-medium">
            🧩 Pattern
          </span>
          <h1 className="text-2xl font-bold text-[#232338] mt-3">{pattern.name}</h1>
          <p className="text-sm text-slate-500 mt-1.5">{pattern.shortDescription}</p>
        </div>

        {/* What it is */}
        <Section emoji="📖" title="What it is" accent="sky">
          <p className="text-sm text-slate-600 leading-relaxed">{pattern.whatItIs}</p>
        </Section>

        {/* When to use it */}
        <Section emoji="🧭" title="When to use it" accent="amber">
          <ul className="space-y-2">
            {pattern.whenToUse.map((line, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-slate-600 leading-relaxed">
                <span className="shrink-0 text-amber-400 mt-0.5">•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Question types */}
        <Section emoji="🗂️" title="Question types you can solve" accent="emerald">
          <div className="flex flex-wrap gap-1.5">
            {pattern.questionTypes.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </Section>

        {/* Related questions in this app */}
        <Section
          emoji="📋"
          title={`Questions using this pattern (${relatedQuestions.length})`}
          accent="violet"
        >
          {relatedQuestions.length === 0 ? (
            <p className="text-sm text-slate-500">
              No questions tagged with this pattern yet.
            </p>
          ) : (
            <div className="space-y-2">
              {relatedQuestions.map((q) => (
                <Link
                  key={q.id}
                  href={`/questions/${q.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/70 bg-white/70 hover:bg-white px-4 py-2.5 transition-colors"
                >
                  <span className="text-sm font-medium text-[#232338] truncate">
                    {q.title}
                  </span>
                  <span
                    className={`shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${difficultyColors[q.difficulty]}`}
                  >
                    {q.difficulty}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Section>

        <div className="pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 font-medium transition-colors"
          >
            ← Back to all questions
          </Link>
        </div>
      </main>
    </div>
  );
}

const sectionAccents = {
  slate: { border: "border-white/70", bg: "bg-white/50", title: "text-[#232338]" },
  sky: { border: "border-sky-100", bg: "bg-sky-50/50", title: "text-sky-700" },
  amber: { border: "border-amber-100", bg: "bg-amber-50/50", title: "text-amber-700" },
  emerald: { border: "border-emerald-100", bg: "bg-emerald-50/50", title: "text-emerald-700" },
  rose: { border: "border-rose-100", bg: "bg-rose-50/50", title: "text-rose-700" },
  violet: { border: "border-violet-100", bg: "bg-violet-50/50", title: "text-violet-700" },
};

function Section({ emoji, title, accent, children }) {
  const a = sectionAccents[accent] || sectionAccents.slate;
  return (
    <div className={`rounded-3xl border ${a.border} ${a.bg} backdrop-blur-xl p-6`}>
      <div className={`text-sm font-bold mb-2.5 flex items-center gap-1.5 ${a.title}`}>
        {emoji} {title}
      </div>
      {children}
    </div>
  );
}
