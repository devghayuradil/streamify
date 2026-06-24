"use client";

import { useState, useEffect, useCallback } from "react";
import { TMDBMovie } from "@/services/tmdb/types";

interface UseMoviesOptions {
  initialMovies: TMDBMovie[];
}

export function useMovies({ initialMovies }: UseMoviesOptions) {
  const [movies, setMovies] = useState<TMDBMovie[]>(initialMovies);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let url = "/api/movies";
      const params = new URLSearchParams();

      if (searchQuery.trim()) {
        params.set("search", searchQuery);
      } else if (selectedGenreId) {
        params.set("genreId", selectedGenreId);
      }

      if (params.toString()) url += `?${params.toString()}`;

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
      console.log("render")
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