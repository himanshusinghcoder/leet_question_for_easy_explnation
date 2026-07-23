"use client";

import { useMemo, useState } from "react";
import { questions, patterns, difficulties, getAllTypes, getPatternById } from "@/lib/data";
import FilterBar from "@/components/FilterBar";
import PatternPanel from "@/components/PatternPanel";
import QuestionCard from "@/components/QuestionCard";

export default function Home() {
  const [filters, setFilters] = useState({
    search: "",
    difficulty: "All",
    patternId: "All",
    type: "All",
  });

  const types = useMemo(() => getAllTypes(), []);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      if (
        filters.search &&
        !q.title.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.difficulty !== "All" && q.difficulty !== filters.difficulty) return false;
      if (filters.patternId !== "All" && q.patternId !== filters.patternId) return false;
      if (filters.type !== "All" && !q.types.includes(filters.type)) return false;
      return true;
    });
  }, [filters]);

  const easyCount = questions.filter((q) => q.difficulty === "Easy").length;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fff7ed_0%,#fdf9f3_35%,#f3f0ff_100%)] text-[#2b2440]">
      {/* Top bar */}
      <header className="border-b border-[#f0dfc4] bg-white/70 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-orange-400 via-pink-400 to-violet-500 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-pink-200 rotate-[-4deg]">
              DSA
            </div>
            <div>
              <h1 className="text-lg font-extrabold leading-none bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                DSA Easy Dashboard
              </h1>
              <p className="text-xs text-[#8b7f9e] mt-1">
                Learn easy questions, one pattern at a time ✨
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-right rounded-xl bg-orange-50 border border-orange-200 px-3 py-1.5">
              <div className="text-orange-500 text-xs font-medium">Total</div>
              <div className="font-bold text-orange-700">{questions.length}</div>
            </div>
            <div className="text-right rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5">
              <div className="text-emerald-500 text-xs font-medium">Easy</div>
              <div className="font-bold text-emerald-700">{easyCount}</div>
            </div>
            <div className="text-right rounded-xl bg-violet-50 border border-violet-200 px-3 py-1.5">
              <div className="text-violet-500 text-xs font-medium">Patterns</div>
              <div className="font-bold text-violet-700">{patterns.length}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress banner */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="rounded-2xl border border-pink-200 bg-gradient-to-r from-orange-100 via-pink-100 to-violet-100 p-4 flex items-center justify-between shadow-sm">
          <p className="text-sm text-[#5b4d73]">
            <span className="text-pink-600 font-bold">🚀 Step 1:</span> Master these{" "}
            <span className="text-[#2b2440] font-semibold">5 easy questions</span> first. New
            questions and patterns will be added as you grow.
          </p>
          <div className="text-xs text-[#8b7f9e] whitespace-nowrap ml-4 bg-white/70 rounded-full px-3 py-1 border border-pink-200">
            {questions.length} / {questions.length} unlocked
          </div>
        </div>
      </div>

      {/* Main layout */}
      <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          <FilterBar
            patterns={patterns}
            difficulties={difficulties}
            types={types}
            filters={filters}
            setFilters={setFilters}
            resultCount={filtered.length}
          />
          <PatternPanel patterns={patterns} />
        </aside>

        {/* Question list */}
        <section className="space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-pink-200 bg-white/50 p-10 text-center text-[#8b7f9e] text-sm">
              No questions match these filters. Try resetting them. 🔍
            </div>
          ) : (
            filtered.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                pattern={getPatternById(q.patternId)}
              />
            ))
          )}
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-8 text-center text-xs text-[#a89cbf]">
        Built for step-by-step DSA practice. More questions coming as you progress. 🌱
      </footer>
    </div>
  );
}
