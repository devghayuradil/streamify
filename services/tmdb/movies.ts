import { tmdbFetch } from "./client";
import { TMDBGenre, TMDBMovie, TMDBMovieDetail, TMDBResponse } from "./types";

export async function getTrendingMovies(): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<TMDBResponse<TMDBMovie>>(
    "/movie/popular?page=1"
  );
  return data.results;
}

export async function searchMovies(query: string): Promise<TMDBMovie[]> {
  if (!query.trim()) return getTrendingMovies();

  const data = await tmdbFetch<TMDBResponse<TMDBMovie>>("/search/movie", {
    query,
    include_adult: "false",
  });
  return data.results;
}

export async function getMovieById(id: string): Promise<TMDBMovieDetail> {
  return tmdbFetch<TMDBMovieDetail>(`/movie/${id}`);
}

export async function getGenres(): Promise<TMDBGenre[]> {
  const data = await tmdbFetch<{ genres: TMDBGenre[] }>(
    "/genre/movie/list",
    {},
    { cache: "force-cache" }
  );
  return data.genres;
}

export async function getMoviesByGenre(genreId: string): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<TMDBResponse<TMDBMovie>>(
    "/discover/movie",
    { with_genres: genreId, sort_by: "popularity.desc" }
  );
  return data.results;
}