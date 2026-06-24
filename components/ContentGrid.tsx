import { TMDBMovie } from "@/services/tmdb/types";
import { ContentCard } from "./ContentCard";
import { ContentCardSkeleton } from "./ContentCardSkeleton";

interface ContentGridProps {
  movies: TMDBMovie[];
  isLoading: boolean;
  error: string | null;
}

export function ContentGrid({ movies, isLoading, error }: ContentGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <ContentCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-destructive text-sm">{error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-muted-foreground text-sm">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <ContentCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}