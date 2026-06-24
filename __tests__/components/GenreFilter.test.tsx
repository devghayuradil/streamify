import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GenreFilter } from "@/components/GenreFilter";
import { TMDBGenre } from "@/services/tmdb/types";

const mockGenres: TMDBGenre[] = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
];

describe("GenreFilter", () => {
  it("renders the 'All' button", () => {
    render(
      <GenreFilter
        genres={mockGenres}
        selectedGenreId=""
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
  });

  it("renders a button for each genre", () => {
    render(
      <GenreFilter
        genres={mockGenres}
        selectedGenreId=""
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Comedy" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Drama" })).toBeInTheDocument();
  });

  it("renders the correct total number of buttons", () => {
    render(
      <GenreFilter
        genres={mockGenres}
        selectedGenreId=""
        onSelect={jest.fn()}
      />
    );
    // 3 genres + 1 "All" button
    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  it("calls onSelect with empty string when 'All' is clicked", async () => {
    const handleSelect = jest.fn();
    render(
      <GenreFilter
        genres={mockGenres}
        selectedGenreId="28"
        onSelect={handleSelect}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "All" }));
    expect(handleSelect).toHaveBeenCalledWith("");
  });

  it("calls onSelect with the genre id as string when a genre is clicked", async () => {
    const handleSelect = jest.fn();
    render(
      <GenreFilter
        genres={mockGenres}
        selectedGenreId=""
        onSelect={handleSelect}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "Action" }));
    expect(handleSelect).toHaveBeenCalledWith("28");
  });

  it("renders with no genre buttons when genres array is empty", () => {
    render(
      <GenreFilter genres={[]} selectedGenreId="" onSelect={jest.fn()} />
    );
    // Only the "All" button should exist
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });
});
