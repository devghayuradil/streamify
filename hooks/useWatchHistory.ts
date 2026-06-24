"use client";

import { useState, useEffect } from "react";

export interface WatchHistoryItem {
  id: number;
  title: string;
  poster_path: string | null;
  watchedAt: number;
}

const STORAGE_KEY = "streamify_watch_history";
const MAX_ITEMS = 10;

export function useWatchHistory() {
  const [history, setHistory] = useState<WatchHistoryItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {
      // localStorage unavailable
    }
  }, []);

  const addToHistory = (item: Omit<WatchHistoryItem, "watchedAt">) => {
    setHistory((prev) => {
      const filtered = prev.filter((m) => m.id !== item.id);
      const updated = [
        { ...item, watchedAt: Date.now() },
        ...filtered,
      ].slice(0, MAX_ITEMS);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}

      return updated;
    });
  };

  return { history, addToHistory };
}