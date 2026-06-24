import { WatchHistoryItem } from './types';

export function getWatchHistory(): WatchHistoryItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('watchHistory');
  return stored ? JSON.parse(stored) : [];
}

export function saveToWatchHistory(item: WatchHistoryItem) {
  // Implementation for saving to local storage
}
