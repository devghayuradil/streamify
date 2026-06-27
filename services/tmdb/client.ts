import { FetchStrategy } from "./types";
import { TMDB_BASE_URL, TMDB_API_KEY } from "@/lib/constants/server";

if (!TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY is not defined in environment variables");
}


export async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
  fetchOptions: FetchStrategy = { next: {revalidate: 600}}
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);

  url.searchParams.set("api_key", TMDB_API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString(), fetchOptions);

  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}