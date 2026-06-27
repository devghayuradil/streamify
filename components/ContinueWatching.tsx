"use client";

import { useWatchHistory } from "@/hooks/useWatchHistory";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";

const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE;

export function ContinueWatching() {
  const { history } = useWatchHistory();

  if (history.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Continue Watching
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {history.map((item) => {
          return (
            <Link
              key={item.id}
              href={`/title/${item.id}`}
              className="shrink-0 group"
            >
              <div className="relative w-24 rounded-md overflow-hidden border border-border group-hover:border-primary transition-colors">
                <div className="relative aspect-[2/3] bg-muted">
                  {item.poster_path ? (
                    <Image
                      src={`${IMAGE_BASE}/w200${item.poster_path}`}
                      alt={item.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                      <span className="text-2xl">🎬</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-center text-muted-foreground p-1 line-clamp-1">
                  {item.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}