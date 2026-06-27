"use client";

import { useState, useEffect } from "react";
import {
  WATCH_HISTORY_STORAGE_KEY,
  WATCH_HISTORY_MAX_ITEMS,
} from "@/lib/constants/client";

export interface WatchHistoryItem {
  id: number;
  title: string;
  poster_path: string | null;
  watchedAt: number;
}

export function useWatchHistory() {
  const [history, setHistory] = useState<WatchHistoryItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WATCH_HISTORY_STORAGE_KEY);
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
      ].slice(0, WATCH_HISTORY_MAX_ITEMS);

      try {
        localStorage.setItem(WATCH_HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch {}

      return updated;
    });
  };

  return { history, addToHistory };
}