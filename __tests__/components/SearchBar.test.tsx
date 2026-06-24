import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "@/components/SearchBar";

describe("SearchBar", () => {
  it("renders the search input with placeholder", () => {
    render(<SearchBar value="" onChange={jest.fn()} />);
    expect(
      screen.getByPlaceholderText("Search movies...")
    ).toBeInTheDocument();
  });

  it("displays the current value in the input", () => {
    render(<SearchBar value="Inception" onChange={jest.fn()} />);
    expect(screen.getByDisplayValue("Inception")).toBeInTheDocument();
  });

  it("calls onChange when the user types", async () => {
    const handleChange = jest.fn();
    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Search movies...");
    await userEvent.type(input, "A");

    expect(handleChange).toHaveBeenCalledWith("A");
  });

  it("does not show the clear button when value is empty", () => {
    render(<SearchBar value="" onChange={jest.fn()} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows the clear button when value is not empty", () => {
    render(<SearchBar value="Batman" onChange={jest.fn()} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onChange with empty string when clear button is clicked", async () => {
    const handleChange = jest.fn();
    render(<SearchBar value="Batman" onChange={handleChange} />);

    const clearBtn = screen.getByRole("button");
    await userEvent.click(clearBtn);

    expect(handleChange).toHaveBeenCalledWith("");
  });
});
