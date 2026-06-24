import { NextRequest, NextResponse } from "next/server";
import { getTrendingMovies, searchMovies, getMoviesByGenre } from "@/services/tmdb/movies";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const genreId = searchParams.get("genreId");

  try {
    let movies;

    if (search) {
      movies = await searchMovies(search);
    } else if (genreId) {
      movies = await getMoviesByGenre(genreId);
    } else {
      movies = await getTrendingMovies();
    }

    return NextResponse.json(movies);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}