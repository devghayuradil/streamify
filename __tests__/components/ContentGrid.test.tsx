import { render, screen } from "@testing-library/react";
import { ContentGrid } from "@/components/ContentGrid";
import { TMDBMovie } from "@/services/tmdb/types";

const mockMovies: TMDBMovie[] = [
  {
    id: 1,
    title: "Inception",
    overview: "A thief who steals corporate secrets.",
    poster_path: "/inception.jpg",
    backdrop_path: null,
    release_date: "2010-07-16",
    vote_average: 8.8,
    vote_count: 34000,
    genre_ids: [28, 878],
    popularity: 100,
  },
  {
    id: 2,
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole.",
    poster_path: null,
    backdrop_path: null,
    release_date: "2014-11-07",
    vote_average: 8.6,
    vote_count: 30000,
    genre_ids: [18, 878],
    popularity: 95,
  },
];

describe("ContentGrid", () => {
  describe("Loading state", () => {
    it("renders 10 skeleton cards when isLoading is true", () => {
      const { container } = render(
        <ContentGrid movies={[]} isLoading={true} error={null} />
      );
      // ContentCardSkeleton renders a div with animate-pulse
      const skeletons = container.querySelectorAll(".animate-pulse");
      expect(skeletons).toHaveLength(10);
    });

    it("does not render any movie titles when loading", () => {
      render(<ContentGrid movies={mockMovies} isLoading={true} error={null} />);
      expect(screen.queryByText("Inception")).not.toBeInTheDocument();
    });
  });

  describe("Error state", () => {
    it("displays the error message", () => {
      render(
        <ContentGrid
          movies={[]}
          isLoading={false}
          error="Failed to load movies"
        />
      );
      expect(screen.getByText("Failed to load movies")).toBeInTheDocument();
    });

    it("does not render skeletons or movie cards when there is an error", () => {
      const { container } = render(
        <ContentGrid
          movies={[]}
          isLoading={false}
          error="Something went wrong"
        />
      );
      expect(container.querySelectorAll(".animate-pulse")).toHaveLength(0);
    });
  });

  describe("Empty state", () => {
    it("renders 'No movies found.' when movies array is empty", () => {
      render(
        <ContentGrid movies={[]} isLoading={false} error={null} />
      );
      expect(screen.getByText("No movies found.")).toBeInTheDocument();
    });
  });

  describe("Success state", () => {
    it("renders a card for each movie", () => {
      render(
        <ContentGrid movies={mockMovies} isLoading={false} error={null} />
      );
      // Use getByRole("heading") to target only the <h3> title.
      // Interstellar has no poster_path so its name also appears in a fallback
      // <span>, making getByText ambiguous.
      expect(screen.getByRole("heading", { name: "Inception" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Interstellar" })).toBeInTheDocument();
    });

    it("renders the release year for each movie", () => {
      render(
        <ContentGrid movies={mockMovies} isLoading={false} error={null} />
      );
      expect(screen.getByText("2010")).toBeInTheDocument();
      expect(screen.getByText("2014")).toBeInTheDocument();
    });

    it("renders the vote average for each movie", () => {
      render(
        <ContentGrid movies={mockMovies} isLoading={false} error={null} />
      );
      expect(screen.getByText("8.8")).toBeInTheDocument();
      expect(screen.getByText("8.6")).toBeInTheDocument();
    });

    it("does not show 'No movies found.' when movies are present", () => {
      render(
        <ContentGrid movies={mockMovies} isLoading={false} error={null} />
      );
      expect(
        screen.queryByText("No movies found.")
      ).not.toBeInTheDocument();
    });
  });
});
