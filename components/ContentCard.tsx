import Image from "next/image";
import Link from "next/link";
import { TMDBMovie } from "@/services/tmdb/types";
import { Star } from "lucide-react";

import { TMDB_IMAGE_BASE, IMAGE_SIZE } from "@/lib/constants/client";

interface ContentCardProps {
  movie: TMDBMovie;
}

export function ContentCard({ movie }: ContentCardProps) {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <Link href={`/title/${movie.id}`}>
      <div className="group relative rounded-lg overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer">
        {/* Thumbnail */}
        <div className="relative aspect-[2/3] w-full bg-muted">
          {movie.poster_path ? (
            <Image
              src={`${TMDB_IMAGE_BASE}/${IMAGE_SIZE.poster}${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <span className="text-4xl mb-2">🎬</span>
              <span className="text-xs text-muted-foreground font-medium line-clamp-2">{movie.title}</span>
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              View Details
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="p-3 space-y-1">
          <h3 className="text-sm font-semibold text-foreground line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{year}</span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {typeof movie.vote_average === "number" ? movie.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}