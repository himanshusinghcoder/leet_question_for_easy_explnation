"use client";

import { useState } from "react";

const accentByIndex = [
  { border: "border-orange-300", bg: "bg-orange-50", text: "text-orange-600", chip: "bg-orange-100 text-orange-700 border-orange-200" },
  { border: "border-pink-300", bg: "bg-pink-50", text: "text-pink-600", chip: "bg-pink-100 text-pink-700 border-pink-200" },
  { border: "border-violet-300", bg: "bg-violet-50", text: "text-violet-600", chip: "bg-violet-100 text-violet-700 border-violet-200" },
  { border: "border-sky-300", bg: "bg-sky-50", text: "text-sky-600", chip: "bg-sky-100 text-sky-700 border-sky-200" },
  { border: "border-emerald-300", bg: "bg-emerald-50", text: "text-emerald-600", chip: "bg-emerald-100 text-emerald-700 border-emerald-200" },
];

export default function PatternPanel({ patterns, activePatternId }) {
  const [openId, setOpenId] = useState(activePatternId || patterns[0]?.id);

  return (
    <div className="rounded-2xl border border-pink-200 bg-white/80 backdrop-blur-sm shadow-sm shadow-pink-100 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-[#2b2440] tracking-wide uppercase flex items-center gap-1.5">
          🧩 Pattern Guide
        </h2>
        <span className="text-xs text-[#a89cbf]">{patterns.length} patterns</span>
      </div>

      <div className="space-y-2">
        {patterns.map((p, idx) => {
          const isOpen = openId === p.id;
          const accent = accentByIndex[idx % accentByIndex.length];
          return (
            <div
              key={p.id}
              className={`rounded-xl border transition-colors ${
                isOpen
                  ? `${accent.border} ${accent.bg}`
                  : "border-[#f0e6f9] bg-white/60 hover:border-pink-200"
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : p.id)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-left"
              >
                <div>
                  <div className={`text-sm font-semibold ${isOpen ? accent.text : "text-[#2b2440]"}`}>
                    {p.name}
                  </div>
                  <div className="text-xs text-[#a89cbf] mt-0.5">{p.shortDescription}</div>
                </div>
                <span
                  className={`text-xs transition-transform ${accent.text} ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <div className="px-3 pb-3 pt-1 space-y-3 border-t border-white/60">
                  <div>
                    <div className={`text-xs font-bold mb-1 ${accent.text}`}>
                      What it is
                    </div>
                    <p className="text-sm text-[#4a3f61] leading-relaxed">{p.whatItIs}</p>
                  </div>

                  <div>
                    <div className={`text-xs font-bold mb-1 ${accent.text}`}>
                      When to use it
                    </div>
                    <ul className="text-sm text-[#4a3f61] space-y-1 list-disc list-inside">
                      {p.whenToUse.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className={`text-xs font-bold mb-1 ${accent.text}`}>
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
