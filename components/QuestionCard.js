"use client";

import { useState } from "react";

const difficultyColors = {
  Easy: "text-emerald-700 border-emerald-300 bg-emerald-100",
  Medium: "text-amber-700 border-amber-300 bg-amber-100",
  Hard: "text-rose-700 border-rose-300 bg-rose-100",
};

export default function QuestionCard({ question, pattern }) {
  const [expanded, setExpanded] = useState(false);
  const [hintsShown, setHintsShown] = useState(0); // how many hints revealed, one at a time
  const [showSamples, setShowSamples] = useState(false);
  const [showPatternInfo, setShowPatternInfo] = useState(false);

  return (
    <div className="rounded-2xl border border-pink-200 bg-white/80 backdrop-blur-sm shadow-sm shadow-pink-100 overflow-hidden hover:shadow-md hover:shadow-pink-100 transition-shadow">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${difficultyColors[question.difficulty]}`}
          >
            {question.difficulty}
          </span>
          <span className="text-base font-semibold text-[#2b2440] truncate">
            {question.title}
          </span>
        </div>
        <span
          className={`shrink-0 text-pink-400 text-sm transition-transform ml-3 ${
            expanded ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      <div className="px-5 pb-2 flex flex-wrap gap-1.5 -mt-1">
        {pattern && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPatternInfo((v) => !v);
            }}
            className={`text-xs px-2 py-0.5 rounded-full border font-medium transition-colors flex items-center gap-1 ${
              showPatternInfo
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200"
            }`}
            title="Click to see how this pattern applies here, with an example"
          >
            🧩 {pattern.name}
            <span className="text-[10px]">{showPatternInfo ? "▴" : "▾"}</span>
          </button>
        )}
        {question.types.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200 font-medium"
          >
            {t}
          </span>
        ))}
      </div>

      {showPatternInfo && question.patternInAction && (
        <div className="mx-5 mb-3 rounded-xl border border-violet-200 bg-violet-50/70 p-3">
          <div className="text-xs font-bold text-violet-700 uppercase tracking-wide mb-1">
            🧩 How {pattern?.name} applies here
          </div>
          <p className="text-sm text-[#4a3f61] leading-relaxed">
            {question.patternInAction.explanation}
          </p>

          <div className="mt-3 rounded-lg bg-white border border-violet-200 p-3">
            <div className="text-xs text-violet-500 font-semibold mb-1.5">
              Worked example
            </div>
            <div className="font-mono text-sm text-violet-700 break-words mb-2">
              Input: {question.patternInAction.example.input}
            </div>
            <ol className="text-sm text-[#4a3f61] space-y-1.5 list-decimal list-inside">
              {question.patternInAction.example.walkthrough.map((step, i) => (
                <li key={i} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {expanded && (
        <div className="px-5 pb-5 pt-2 space-y-5 border-t border-pink-100 mt-2">
          {/* Problem */}
          <div>
            <div className="text-xs font-bold text-[#8b7f9e] uppercase tracking-wide mb-1">
              📋 Problem
            </div>
            <p className="text-sm text-[#4a3f61] leading-relaxed">{question.problem}</p>
          </div>

          {/* Simple explanation */}
          <div>
            <div className="text-xs font-bold text-[#8b7f9e] uppercase tracking-wide mb-1">
              💬 In simple words
            </div>
            <p className="text-sm text-[#4a3f61] leading-relaxed">
              {question.simpleExplanation}
            </p>
          </div>

          {/* Hints - direction to think, revealed one at a time */}
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                💡 Hints — think in this direction
              </div>
              {hintsShown < question.hints.length ? (
                <button
                  onClick={() => setHintsShown((n) => n + 1)}
                  className="text-xs text-amber-700 hover:text-amber-800 bg-white border border-amber-300 rounded-full px-2.5 py-0.5 font-medium"
                >
                  Reveal next hint ({hintsShown}/{question.hints.length})
                </button>
              ) : (
                <button
                  onClick={() => setHintsShown(0)}
                  className="text-xs text-[#a89cbf] hover:text-[#8b7f9e] bg-white border border-[#eee2f5] rounded-full px-2.5 py-0.5 font-medium"
                >
                  Hide hints
                </button>
              )}
            </div>
            {hintsShown > 0 && (
              <ol className="text-sm text-[#4a3f61] space-y-1.5 list-decimal list-inside mt-2">
                {question.hints.slice(0, hintsShown).map((h, i) => (
                  <li key={i} className="leading-relaxed">
                    {h}
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* Samples */}
          <div>
            <button
              onClick={() => setShowSamples((v) => !v)}
              className="text-xs font-bold text-sky-600 uppercase tracking-wide hover:text-sky-700"
            >
              🔎 {showSamples ? "Hide" : "Show"} 5 sample inputs & explanations
            </button>

            {showSamples && (
              <div className="mt-3 space-y-3">
                {question.samples.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-sky-200 bg-sky-50/60 p-3"
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
                    <p className="text-sm text-[#4a3f61] mt-2 leading-relaxed">
                      {s.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
