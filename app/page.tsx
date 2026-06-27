import { Suspense } from "react";
import { getTrendingMovies, getGenres } from "@/services/tmdb/movies";
import { BrowsePage } from "@/components/BrowsePage";
import { EXCLUDED_GENRES } from "@/lib/constants/client";

export default async function Home() {
  const [initialMovies, genres] = await Promise.all([
    getTrendingMovies(),
    getGenres(),
  ]);

  const newGenres = genres.filter((genre) => !EXCLUDED_GENRES.includes(genre.name as typeof EXCLUDED_GENRES[number]));

  return (
    <Suspense>
      <BrowsePage initialMovies={initialMovies} genres={newGenres} />
    </Suspense>
  );
}