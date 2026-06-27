// ─── TMDB Image ───────────────────────────────────────────────────────────────

export const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE ?? "";

/** Canonical TMDB image sizes used across the app */
export const IMAGE_SIZE = {
  thumbnail: "w200",
  poster: "w500",
  backdrop: "w1280",
} as const;

// ─── Watch History ────────────────────────────────────────────────────────────

export const WATCH_HISTORY_STORAGE_KEY = "streamify_watch_history";
export const WATCH_HISTORY_MAX_ITEMS = 10;

// ─── Test Stream ───────────────────────────────────────────────────────────────
export const TEST_STREAM =
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";


// ─── API Routes ───────────────────────────────────────────────────────────────

export const API_ROUTES = {
  movies: "/api/movies",
} as const;

// ─── URL Query Param Keys ─────────────────────────────────────────────────────

export const QUERY_PARAMS = {
  search: "search",
  genre: "genre",
  genreId: "genreId",
} as const;

// ─── Genre Filter ─────────────────────────────────────────────────────────────

/** Genre names to exclude from the browse filter */
export const EXCLUDED_GENRES = ["Documentary"] as const;
