"use client";

const difficultyColors = {
  Easy: "text-emerald-700 border-emerald-300 bg-emerald-100",
  Medium: "text-amber-700 border-amber-300 bg-amber-100",
  Hard: "text-rose-700 border-rose-300 bg-rose-100",
};

export default function FilterBar({
  patterns,
  difficulties,
  types,
  filters,
  setFilters,
  resultCount,
}) {
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  const reset = () =>
    setFilters({ search: "", difficulty: "All", patternId: "All", type: "All" });

  return (
    <div className="rounded-2xl border border-pink-200 bg-white/80 backdrop-blur-sm shadow-sm shadow-pink-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-[#2b2440] tracking-wide uppercase flex items-center gap-1.5">
          🎯 Filters
        </h2>
        <button
          onClick={reset}
          className="text-xs text-pink-500 hover:text-pink-600 font-medium transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-[#8b7f9e] mb-1 block font-medium">Search by name</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            placeholder="e.g. Two Sum"
            className="w-full rounded-lg bg-orange-50/60 border border-orange-200 px-3 py-1.5 text-sm text-[#2b2440] placeholder-[#c4b8d4] focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
          />
        </div>

        <div>
          <label className="text-xs text-[#8b7f9e] mb-1 block font-medium">Difficulty</label>
          <div className="flex flex-wrap gap-1.5">
            {["All", ...difficulties].map((d) => (
              <button
                key={d}
                onClick={() => update("difficulty", d)}
                className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all ${
                  filters.difficulty === d
                    ? d === "All"
                      ? "border-violet-300 bg-violet-100 text-violet-700"
                      : difficultyColors[d]
                    : "border-[#eee2f5] text-[#a89cbf] hover:border-pink-200 hover:bg-pink-50"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-[#8b7f9e] mb-1 block font-medium">Pattern</label>
          <select
            value={filters.patternId}
            onChange={(e) => update("patternId", e.target.value)}
            className="w-full rounded-lg bg-orange-50/60 border border-orange-200 px-3 py-1.5 text-sm text-[#2b2440] focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
          >
            <option value="All">All patterns</option>
            {patterns.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-[#8b7f9e] mb-1 block font-medium">Type</label>
          <select
            value={filters.type}
            onChange={(e) => update("type", e.target.value)}
            className="w-full rounded-lg bg-orange-50/60 border border-orange-200 px-3 py-1.5 text-sm text-[#2b2440] focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
          >
            <option value="All">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-pink-100 text-xs text-[#8b7f9e]">
        Showing <span className="text-pink-600 font-bold">{resultCount}</span> question
        {resultCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
