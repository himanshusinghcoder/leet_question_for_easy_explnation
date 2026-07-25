"use client";

import Link from "next/link";

const accentByIndex = [
  { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", hover: "hover:bg-emerald-100" },
  { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", hover: "hover:bg-rose-100" },
  { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", hover: "hover:bg-violet-100" },
  { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200", hover: "hover:bg-sky-100" },
  { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", hover: "hover:bg-amber-100" },
];

export default function PatternStrip({ patterns }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/55 backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(80,80,120,0.12)] p-4">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-semibold text-[#232338] tracking-wide flex items-center gap-1.5">
          🧩 Pattern Guide
        </h2>
        <span className="text-xs text-slate-400">
          Click a pattern for the full breakdown →
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5 px-1">
        {patterns.map((p, idx) => {
          const accent = accentByIndex[idx % accentByIndex.length];
          return (
            <Link
              key={p.id}
              href={`/patterns/${p.id}`}
              className={`rounded-2xl border ${accent.border} ${accent.bg} ${accent.hover} px-4 py-2.5 transition-all duration-200 hover:-translate-y-0.5`}
            >
              <div className={`text-sm font-semibold ${accent.text}`}>{p.name}</div>
              <div className="text-xs text-slate-500 mt-0.5 max-w-[220px] line-clamp-1">
                {p.shortDescription}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
