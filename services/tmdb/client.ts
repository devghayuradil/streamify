import { FetchStrategy } from "./types";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY as string;


if (!API_KEY) {
  throw new Error("TMDB_API_KEY is not defined in environment variables");
}


export async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
  fetchOptions: FetchStrategy = { next: {revalidate: 600}}
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.set("api_key", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  console.log(fetchOptions,"fetchOptions")

  const res = await fetch(url.toString(), fetchOptions);

  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}