import { render, screen } from "@testing-library/react";
import { ContentCardSkeleton } from "@/components/ContentCardSkeleton";

describe("ContentCardSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<ContentCardSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("has the animate-pulse class for loading animation", () => {
    const { container } = render(<ContentCardSkeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });

  it("renders the poster placeholder area", () => {
    const { container } = render(<ContentCardSkeleton />);
    // The aspect-ratio div for the poster area
    const posterArea = container.querySelector(".aspect-\\[2\\/3\\]");
    expect(posterArea).toBeInTheDocument();
  });

  it("renders two metadata placeholder bars", () => {
    const { container } = render(<ContentCardSkeleton />);
    // Title bar and the two small bottom bars live in the p-3 section
    const metaSection = container.querySelector(".p-3");
    expect(metaSection).toBeInTheDocument();
    const bars = metaSection!.querySelectorAll(".bg-muted.rounded");
    // h-4 title bar + h-3 year bar + h-3 rating bar = 3
    expect(bars.length).toBeGreaterThanOrEqual(2);
  });
});
