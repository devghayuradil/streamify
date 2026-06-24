"use client";

import { TMDBMovie, TMDBGenre } from "@/services/tmdb/types";
import { useMovies } from "@/hooks/useMovies";
import { SearchBar } from "@/components/SearchBar";
import { GenreFilter } from "@/components/GenreFilter";
import { ContentGrid } from "@/components/ContentGrid";
import { ContinueWatching } from "@/components/ContinueWatching";

interface BrowsePageProps {
    initialMovies: TMDBMovie[];
    genres: TMDBGenre[];
}

export function BrowsePage({ initialMovies, genres }: BrowsePageProps) {
    const {
        movies,
        searchQuery,
        setSearchQuery,
        selectedGenreId,
        setSelectedGenreId,
        isLoading,
        error,
    } = useMovies({ initialMovies });

    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-primary shrink-0">
                        Streamify
                    </h1>
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
                {/* Continue Watching */}
                <ContinueWatching />

                {/* Genre Filter */}
                <GenreFilter
                    genres={genres}
                    selectedGenreId={selectedGenreId}
                    onSelect={setSelectedGenreId}
                />

                {/* Title */}
                <div>
                    <h2 className="text-xl font-semibold text-foreground">
                        {searchQuery
                            ? `Results for "${searchQuery}"`
                            : selectedGenreId
                                ? "Filtered Results"
                                : "Trending This Week"}
                    </h2>
                </div>

                {/* Grid */}
                <ContentGrid
                    movies={movies}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
        </main>
    );
}