import { getMovieById } from "@/services/tmdb/movies";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/DetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TitlePage({ params }: Props) {
  const { id } = await params;

  try {
    const movie = await getMovieById(id);
    return <DetailPage movie={movie} />;
  } catch {
    notFound();
  }
}