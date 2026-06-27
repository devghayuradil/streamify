// ─── TMDB API (server-only) ───────────────────────────────────────────────────
// These constants must only be imported in server-side code.

export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_API_KEY = process.env.TMDB_API_KEY as string;
