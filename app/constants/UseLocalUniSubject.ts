"use client";
// useLocalUniSubject.ts

import { useState, useEffect } from "react";

export function useLocalUniSubject() {
  const [uniSubject, setUniSubject] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("uniSubject") || 0);
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem("uniSubject", String(uniSubject));
  }, [uniSubject]);

  return [uniSubject, setUniSubject] as const;
}
