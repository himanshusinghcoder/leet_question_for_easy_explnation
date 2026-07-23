"use client";

import { useState } from "react";

const accentByIndex = [
  { border: "border-emerald-200", bg: "bg-emerald-50", text: "text-emerald-600", chip: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { border: "border-rose-200", bg: "bg-rose-50", text: "text-rose-600", chip: "bg-rose-100 text-rose-700 border-rose-200" },
  { border: "border-violet-200", bg: "bg-violet-50", text: "text-violet-600", chip: "bg-violet-100 text-violet-700 border-violet-200" },
  { border: "border-sky-200", bg: "bg-sky-50", text: "text-sky-600", chip: "bg-sky-100 text-sky-700 border-sky-200" },
  { border: "border-amber-200", bg: "bg-amber-50", text: "text-amber-600", chip: "bg-amber-100 text-amber-700 border-amber-200" },
];

export default function PatternPanel({ patterns, activePatternId }) {
  const [openId, setOpenId] = useState(activePatternId || patterns[0]?.id);

  return (
    <div className="rounded-3xl border border-white/70 bg-white/55 backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(80,80,120,0.12)] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[#232338] tracking-wide flex items-center gap-1.5">
          🧩 Pattern Guide
        </h2>
        <span className="text-xs text-slate-400">{patterns.length} patterns</span>
      </div>

      <div className="space-y-2">
        {patterns.map((p, idx) => {
          const isOpen = openId === p.id;
          const accent = accentByIndex[idx % accentByIndex.length];
          return (
            <div
              key={p.id}
              className={`rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? `${accent.border} ${accent.bg}`
                  : "border-transparent bg-white/40 hover:bg-white/70"
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : p.id)}
                className="w-full flex items-center justify-between px-3.5 py-3 text-left"
              >
                <div>
                  <div className={`text-sm font-semibold ${isOpen ? accent.text : "text-[#232338]"}`}>
                    {p.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{p.shortDescription}</div>
                </div>
                <span
                  className={`text-xs transition-transform duration-300 ${accent.text} ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <div className="px-3.5 pb-4 pt-1 space-y-3 border-t border-white/70">
                  <div>
                    <div className={`text-xs font-semibold mb-1 ${accent.text}`}>
                      What it is
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.whatItIs}</p>
                  </div>

                  <div>
                    <div className={`text-xs font-semibold mb-1 ${accent.text}`}>
                      When to use it
                    </div>
                    <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                      {p.whenToUse.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className={`text-xs font-semibold mb-1 ${accent.text}`}>
                      Question types you can solve
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.questionTypes.map((t, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-0.5 rounded-full border font-medium ${accent.chip}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
