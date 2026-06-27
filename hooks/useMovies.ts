"use client";

import { useState, useEffect, useCallback } from "react";
import { TMDBMovie } from "@/services/tmdb/types";
import { useQueryParam } from "@/hooks/useQueryParam";
import { buildUrl } from "@/lib/utils";
import { API_ROUTES, QUERY_PARAMS } from "@/lib/constants/client";

interface UseMoviesOptions {
  initialMovies: TMDBMovie[];
}

export function useMovies({ initialMovies }: UseMoviesOptions) {
  const [searchQuery, setSearchQuery] = useQueryParam(QUERY_PARAMS.search);
  const [selectedGenreId, setSelectedGenreId] = useQueryParam(QUERY_PARAMS.genre);

  const [movies, setMovies] = useState<TMDBMovie[]>(initialMovies);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = buildUrl(API_ROUTES.movies, {
        [QUERY_PARAMS.search]: searchQuery.trim() || undefined,
        [QUERY_PARAMS.genreId]: searchQuery.trim() ? undefined : selectedGenreId,
      });

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch movies");

      const data = await res.json();
      setMovies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedGenreId]);

  useEffect(() => {
    if (!searchQuery && !selectedGenreId) {
      setMovies(initialMovies);
      return;
    }
    const debounce = setTimeout(fetchMovies, 400);
    return () => clearTimeout(debounce);
  }, [searchQuery, selectedGenreId, fetchMovies, initialMovies]);

  return {
    movies,
    searchQuery,
    setSearchQuery,
    selectedGenreId,
    setSelectedGenreId,
    isLoading,
    error,
  };
}