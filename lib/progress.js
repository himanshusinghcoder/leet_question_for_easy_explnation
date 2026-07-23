"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "dsa-progress";

function readAll() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeAll(data) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("dsa-progress-changed"));
}

// Tracks a single question's status: undefined | "done" | "review".
// Reads happen after mount (useEffect) so server and first client render
// both start blank, avoiding a hydration mismatch against localStorage.
export function useQuestionProgress(id) {
  const [status, setStatusState] = useState(undefined);

  useEffect(() => {
    setStatusState(readAll()[id]);
    const onChange = () => setStatusState(readAll()[id]);
    window.addEventListener("dsa-progress-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("dsa-progress-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [id]);

  const setStatus = useCallback(
    (next) => {
      const all = readAll();
      if (next) {
        all[id] = next;
      } else {
        delete all[id];
      }
      writeAll(all);
      setStatusState(next);
    },
    [id]
  );

  return [status, setStatus];
}

// Reads the full { [questionId]: "done" | "review" } map, live-updating
// whenever any question's status changes (including in other tabs).
export function useAllProgress() {
  const [all, setAll] = useState({});

  useEffect(() => {
    setAll(readAll());
    const onChange = () => setAll(readAll());
    window.addEventListener("dsa-progress-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("dsa-progress-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return all;
}
