import { getTrendingMovies, getGenres } from "@/services/tmdb/movies";
import { BrowsePage } from "@/components/BrowsePage";

export default async function Home() {
  const [initialMovies, genres] = await Promise.all([
    getTrendingMovies(),
    getGenres(),
  ]);

  const newGenres = genres.filter((genre) => genre.name !== "Documentary");

  return <BrowsePage initialMovies={initialMovies} genres={newGenres} />;
}