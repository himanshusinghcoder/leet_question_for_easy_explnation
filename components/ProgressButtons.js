"use client";

import { useQuestionProgress } from "@/lib/progress";

export default function ProgressButtons({ questionId }) {
  const [status, setStatus] = useQuestionProgress(questionId);

  const toggle = (value) => {
    setStatus(status === value ? undefined : value);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => toggle("done")}
        className={`text-xs px-3.5 py-1.5 rounded-full border font-semibold transition-all flex items-center gap-1.5 ${
          status === "done"
            ? "bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-200"
            : "bg-white/70 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
        }`}
      >
        ✅ {status === "done" ? "Done" : "Mark as Done"}
      </button>
      <button
        onClick={() => toggle("review")}
        className={`text-xs px-3.5 py-1.5 rounded-full border font-semibold transition-all flex items-center gap-1.5 ${
          status === "review"
            ? "bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-200"
            : "bg-white/70 text-amber-600 border-amber-200 hover:bg-amber-50"
        }`}
      >
        🔖 {status === "review" ? "Marked for Review" : "Mark as Review"}
      </button>
    </div>
  );
}
