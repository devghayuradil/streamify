"use client";

import { TMDBGenre } from "@/services/tmdb/types";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface GenreFilterProps {
  genres: TMDBGenre[];
  selectedGenreId: string;
  onSelect: (genreId: string) => void;
}

export function GenreFilter({
  genres,
  selectedGenreId,
  onSelect,
}: GenreFilterProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max gap-2 pb-2">
        <Button
          variant={selectedGenreId === "" ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect("")}
          className="rounded-full cursor-pointer shrink-0"
        >
          All
        </Button>
        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant={selectedGenreId === String(genre.id) ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(String(genre.id))}
            className="rounded-full cursor-pointer shrink-0"
          >
            {genre.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}