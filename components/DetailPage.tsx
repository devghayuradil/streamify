"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { TMDBMovieDetail } from "@/services/tmdb/types";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useWatchHistory } from "@/hooks/useWatchHistory";
import { ArrowLeft, Star, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { TMDB_IMAGE_BASE, IMAGE_SIZE } from "@/lib/constants/client";

interface DetailPageProps {
    movie: TMDBMovieDetail;
}

export function DetailPage({ movie }: DetailPageProps) {
    const { addToHistory } = useWatchHistory();

    const backdropUrl = movie.backdrop_path
        ? `${TMDB_IMAGE_BASE}/${IMAGE_SIZE.backdrop}${movie.backdrop_path}`
        : null;

    const year = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : "N/A";

    // Add to watch history when page opens
    useEffect(() => {
        addToHistory({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
        });
    }, [movie.id]);

    return (
        <main className="min-h-screen bg-background">
            {/* Backdrop */}
            {backdropUrl && (
                <div className="relative w-full h-[40vh] md:h-[50vh]">
                    <Image
                        src={backdropUrl}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 100vw"
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
                </div>
            )}

            <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
                {/* Back button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Browse
                </Link>

                {/* Movie Info */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Poster */}
                    <div className="relative shrink-0 w-40 md:w-52 aspect-[2/3] rounded-lg overflow-hidden border border-border mx-auto md:mx-0 bg-muted">
                        {movie.poster_path ? (
                            <Image
                                src={`${TMDB_IMAGE_BASE}/${IMAGE_SIZE.poster}${movie.poster_path}`}
                                alt={movie.title}
                                fill
                                sizes="(max-width: 768px) 160px, 208px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                <span className="text-4xl mb-2">🎬</span>
                            </div>
                        )}
                    </div>

                    {/* Meta */}
                    <div className="space-y-4 flex-1">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                {movie.title}
                            </h1>
                            {movie.tagline && (
                                <p className="text-muted-foreground italic mt-1">
                                    {movie.tagline}
                                </p>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                {typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'N/A'} / 10
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {year}
                            </span>
                            {movie.runtime && (
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {movie.runtime} min
                                </span>
                            )}
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <Badge key={genre.id} variant="secondary">
                                    {genre.name}
                                </Badge>
                            ))}
                        </div>

                        {/* Overview */}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {movie.overview}
                        </p>
                    </div>
                </div>

                {/* Video Player */}
                <section className="space-y-3">
                    <h2 className="text-xl font-semibold text-foreground">
                        Watch Now
                    </h2>
                    <VideoPlayer />
                </section>
            </div>
        </main>
    );
}