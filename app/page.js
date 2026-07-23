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
    <div className="min-h-screen text-[#232338]">
      {/* Top bar */}
      <header className="border-b border-white/60 bg-white/40 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-300 via-sky-300 to-violet-300 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-violet-100">
              DSA
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-[#232338]">
                DSA Easy Dashboard
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                learn slow, learn calm, learn for real 🌱
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="text-right rounded-2xl bg-white/60 border border-white/70 px-3.5 py-1.5 backdrop-blur-sm">
              <div className="text-slate-400 text-[11px] font-medium">Total</div>
              <div className="font-bold text-[#232338]">{questions.length}</div>
            </div>
            <div className="text-right rounded-2xl bg-white/60 border border-white/70 px-3.5 py-1.5 backdrop-blur-sm">
              <div className="text-emerald-500 text-[11px] font-medium">Easy</div>
              <div className="font-bold text-emerald-600">{easyCount}</div>
            </div>
            <div className="text-right rounded-2xl bg-white/60 border border-white/70 px-3.5 py-1.5 backdrop-blur-sm">
              <div className="text-violet-500 text-[11px] font-medium">Patterns</div>
              <div className="font-bold text-violet-600">{patterns.length}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero / progress banner */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="rounded-3xl border border-white/70 bg-white/45 backdrop-blur-xl p-6 flex items-center justify-between shadow-[0_4px_30px_-10px_rgba(80,80,120,0.15)]">
          <div>
            <p className="text-xs font-semibold text-violet-500 tracking-wide uppercase mb-1">
              ✨ Step 1 of your journey
            </p>
            <h2 className="text-xl font-bold text-[#232338]">
              Master these 5 easy questions first
            </h2>
            <p className="text-sm text-slate-500 mt-1.5 max-w-xl">
              No pressure, no rush. Click into any question for a full, chill breakdown —
              explained the way a friend would, not a textbook.
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 via-sky-100 to-violet-100 px-6 py-4 border border-white/70">
            <div className="text-2xl font-extrabold text-[#232338]">
              {questions.length}/{questions.length}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">unlocked</div>
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
            <div className="rounded-3xl border-2 border-dashed border-white/70 bg-white/30 p-10 text-center text-slate-400 text-sm">
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

      <footer className="max-w-7xl mx-auto px-6 py-10 text-center text-xs text-slate-400">
        Built for step-by-step DSA practice. More questions coming as you progress. 🌿
      </footer>
    </div>
  );
}
