"use client";

const difficultyColors = {
  Easy: "text-emerald-700 border-emerald-200 bg-emerald-50",
  Medium: "text-amber-700 border-amber-200 bg-amber-50",
  Hard: "text-rose-700 border-rose-200 bg-rose-50",
};

const statusColors = {
  done: "text-emerald-700 border-emerald-200 bg-emerald-50",
  review: "text-amber-700 border-amber-200 bg-amber-50",
  todo: "text-slate-500 border-slate-200 bg-slate-50",
};

export default function FilterBar({
  patterns,
  difficulties,
  categories,
  filters,
  setFilters,
  resultCount,
}) {
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  const reset = () =>
    setFilters({ search: "", difficulty: "All", patternId: "All", category: "All", status: "All" });

  return (
    <div className="rounded-3xl border border-white/70 bg-white/55 backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(80,80,120,0.12)] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[#232338] tracking-wide flex items-center gap-1.5">
          🎛️ Filters
        </h2>
        <button
          onClick={reset}
          className="text-xs text-violet-500 hover:text-violet-600 font-medium transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-slate-400 mb-1.5 block font-medium">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            placeholder="e.g. Two Sum"
            className="w-full rounded-xl bg-white/70 border border-slate-200 px-3 py-2 text-sm text-[#232338] placeholder-slate-300 focus:outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100 transition-all"
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1.5 block font-medium">Difficulty</label>
          <div className="flex flex-wrap gap-1.5">
            {["All", ...difficulties].map((d) => (
              <button
                key={d}
                onClick={() => update("difficulty", d)}
                className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all ${
                  filters.difficulty === d
                    ? d === "All"
                      ? "border-violet-200 bg-violet-100 text-violet-700"
                      : difficultyColors[d]
                    : "border-slate-200 text-slate-400 hover:border-violet-200 hover:bg-violet-50/60"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1.5 block font-medium">Progress</label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { key: "All", label: "All" },
              { key: "done", label: "✅ Done" },
              { key: "review", label: "🔖 Review" },
              { key: "todo", label: "◻️ To do" },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => update("status", s.key)}
                className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all ${
                  filters.status === s.key
                    ? s.key === "All"
                      ? "border-violet-200 bg-violet-100 text-violet-700"
                      : statusColors[s.key]
                    : "border-slate-200 text-slate-400 hover:border-violet-200 hover:bg-violet-50/60"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1.5 block font-medium">Category</label>
          <select
            value={filters.category}
            onChange={(e) => update("category", e.target.value)}
            className="w-full rounded-xl bg-white/70 border border-slate-200 px-3 py-2 text-sm text-[#232338] focus:outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100 transition-all"
          >
            <option value="All">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1.5 block font-medium">Pattern</label>
          <select
            value={filters.patternId}
            onChange={(e) => update("patternId", e.target.value)}
            className="w-full rounded-xl bg-white/70 border border-slate-200 px-3 py-2 text-sm text-[#232338] focus:outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100 transition-all"
          >
            <option value="All">All patterns</option>
            {patterns.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-400">
        Showing <span className="text-violet-600 font-semibold">{resultCount}</span> question
        {resultCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
