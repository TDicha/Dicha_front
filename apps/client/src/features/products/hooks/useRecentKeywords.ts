import { useCallback, useEffect, useState } from "react";

const RECENT_KEYWORDS_KEY = "dicha.recentKeywords";
const MAX_RECENT_KEYWORDS = 10;

function readRecentKeywords(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(RECENT_KEYWORDS_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (keyword): keyword is string => typeof keyword === "string",
    );
  } catch {
    // Storage may be unavailable or hold malformed data.
    return [];
  }
}

function writeRecentKeywords(keywords: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      RECENT_KEYWORDS_KEY,
      JSON.stringify(keywords),
    );
  } catch {
    // Storage may be unavailable in private or restricted browser contexts.
  }
}

export function useRecentKeywords() {
  const [recentKeywords, setRecentKeywords] = useState<string[]>(
    readRecentKeywords,
  );

  useEffect(() => {
    writeRecentKeywords(recentKeywords);
  }, [recentKeywords]);

  const addRecentKeyword = useCallback((keyword: string) => {
    const normalized = keyword.trim();
    if (!normalized) {
      return;
    }

    setRecentKeywords((previous) => {
      const deduped = previous.filter((item) => item !== normalized);
      return [normalized, ...deduped].slice(0, MAX_RECENT_KEYWORDS);
    });
  }, []);

  const removeRecentKeyword = useCallback((keyword: string) => {
    setRecentKeywords((previous) =>
      previous.filter((item) => item !== keyword),
    );
  }, []);

  const clearRecentKeywords = useCallback(() => {
    setRecentKeywords([]);
  }, []);

  return {
    recentKeywords,
    addRecentKeyword,
    removeRecentKeyword,
    clearRecentKeywords,
  };
}
