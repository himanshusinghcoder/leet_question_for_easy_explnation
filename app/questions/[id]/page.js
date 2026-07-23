"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestionById, getPatternById } from "@/lib/data";
import ProgressButtons from "@/components/ProgressButtons";
import TreeDiagram from "@/components/TreeDiagram";
import LinkedListDiagram from "@/components/LinkedListDiagram";

const difficultyColors = {
  Easy: "text-emerald-700 border-emerald-200 bg-emerald-50",
  Medium: "text-amber-700 border-amber-200 bg-amber-50",
  Hard: "text-rose-700 border-rose-200 bg-rose-50",
};

export default function QuestionDetailPage({ params }) {
  const { id } = use(params);
  const question = getQuestionById(id);

  if (!question) notFound();

  const pattern = getPatternById(question.patternId);

  const [hintsShown, setHintsShown] = useState(0);
  const [showPatternInfo, setShowPatternInfo] = useState(false);

  return (
    <div className="min-h-screen text-[#232338]">
      {/* Top bar */}
      <header className="border-b border-white/60 bg-white/40 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-violet-600 font-medium transition-colors flex items-center gap-1.5"
          >
            ← Dashboard
          </Link>
          <ProgressButtons questionId={question.id} />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Title block */}
        <div className="rounded-3xl border border-white/70 bg-white/50 backdrop-blur-xl p-6 shadow-[0_4px_30px_-10px_rgba(80,80,120,0.15)]">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`text-xs px-2.5 py-1 rounded-full border font-medium ${difficultyColors[question.difficulty]}`}
            >
              {question.difficulty}
            </span>
            {question.category && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100 font-medium">
                {question.category}
              </span>
            )}
            {pattern && (
              <button
                onClick={() => setShowPatternInfo((v) => !v)}
                className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors flex items-center gap-1 ${
                  showPatternInfo
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-violet-50 text-violet-600 border-violet-100 hover:bg-violet-100"
                }`}
                title="See how this pattern applies here, with an example"
              >
                🧩 {pattern.name}
                <span className="text-[10px]">{showPatternInfo ? "▴" : "▾"}</span>
              </button>
            )}
            {question.types.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-[#232338]">{question.title}</h1>

          {showPatternInfo && question.patternInAction && (
            <div className="mt-4 rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
              <div className="text-xs font-bold text-violet-700 uppercase tracking-wide mb-1.5">
                🧩 How {pattern?.name} applies here
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {question.patternInAction.explanation}
              </p>
              <div className="mt-3 rounded-xl bg-white border border-violet-100 p-3">
                <div className="text-xs text-violet-500 font-semibold mb-1.5">
                  Worked example
                </div>
                <div className="font-mono text-sm text-violet-700 break-words mb-2">
                  Input: {question.patternInAction.example.input}
                </div>
                <ol className="text-sm text-slate-600 space-y-1.5 list-decimal list-inside">
                  {question.patternInAction.example.walkthrough.map((step, i) => (
                    <li key={i} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {showPatternInfo && !question.patternInAction && pattern && (
            <div className="mt-4 rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
              <p className="text-sm text-slate-600 leading-relaxed">{pattern.whatItIs}</p>
            </div>
          )}
        </div>

        {/* Visual diagram for Tree / Linked List questions */}
        {question.visual && (
          <Section emoji="🌳" title="Visual example" accent="violet">
            {question.visual.type === "tree" ? (
              <TreeDiagram data={question.visual.data} />
            ) : (
              <LinkedListDiagram
                data={question.visual.data}
                cycleIndex={question.visual.cycleIndex}
              />
            )}
          </Section>
        )}

        {/* Problem statement */}
        <Section emoji="📋" title="The problem" accent="slate">
          <p className="text-sm text-slate-600 leading-relaxed">{question.problem}</p>
        </Section>

        {/* Elaborated explanation (starter questions only) */}
        {question.elaboratedExplanation && (
          <Section emoji="📖" title="Let's break it down" accent="sky">
            <p className="text-sm text-slate-600 leading-relaxed">
              {question.elaboratedExplanation}
            </p>
          </Section>
        )}

        {!question.elaboratedExplanation && (
          <Section emoji="💬" title="In simple words" accent="sky">
            <p className="text-sm text-slate-600 leading-relaxed">
              {question.simpleExplanation}
            </p>
          </Section>
        )}

        {/* Non-coder thinking (starter questions only) */}
        {question.nonCoderApproach && (
          <Section emoji="🧠" title="How a non-coder would think about it" accent="amber">
            <p className="text-sm text-slate-600 leading-relaxed">
              {question.nonCoderApproach}
            </p>
          </Section>
        )}

        {/* Solution steps, no code (starter questions only) */}
        {question.solutionSteps && (
          <Section emoji="🪜" title="Steps to reach the solution" accent="emerald">
            <ol className="space-y-2.5">
              {question.solutionSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="shrink-0 h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Edge cases */}
        <Section emoji="⚠️" title="Edge cases to keep in mind" accent="rose">
          <ul className="space-y-2">
            {question.edgeCases.map((c, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-slate-600 leading-relaxed">
                <span className="shrink-0 text-rose-400 mt-0.5">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Hints */}
        <div className="rounded-3xl border border-amber-100 bg-amber-50/60 backdrop-blur-xl p-6">
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm font-bold text-amber-700 flex items-center gap-1.5">
              💡 Stuck? Reveal hints one at a time
            </div>
            {hintsShown < question.hints.length ? (
              <button
                onClick={() => setHintsShown((n) => n + 1)}
                className="text-xs text-amber-700 hover:text-amber-800 bg-white border border-amber-200 rounded-full px-3 py-1 font-medium transition-colors"
              >
                Reveal next hint ({hintsShown}/{question.hints.length})
              </button>
            ) : (
              <button
                onClick={() => setHintsShown(0)}
                className="text-xs text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-full px-3 py-1 font-medium transition-colors"
              >
                Hide hints
              </button>
            )}
          </div>
          {hintsShown > 0 && (
            <ol className="text-sm text-slate-600 space-y-1.5 list-decimal list-inside mt-3">
              {question.hints.slice(0, hintsShown).map((h, i) => (
                <li key={i} className="leading-relaxed">
                  {h}
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* Samples — always visible */}
        <Section
          emoji="🔎"
          title={`${question.samples.length} sample inputs & explanations`}
          accent="sky"
        >
          <div className="space-y-3">
            {question.samples.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-sky-100 bg-white/70 p-4"
              >
                <div className="text-xs text-sky-500 font-semibold mb-1.5">
                  Example {i + 1}
                </div>
                <div className="font-mono text-sm text-sky-700 break-words">
                  Input: {s.input}
                </div>
                <div className="font-mono text-sm text-emerald-700 mt-0.5 break-words">
                  Output: {s.output}
                </div>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {s.explanation}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Bottom progress buttons + nav */}
        <div className="flex items-center justify-between pb-6 flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 font-medium transition-colors"
          >
            ← Back to all questions
          </Link>
          <ProgressButtons questionId={question.id} />
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
