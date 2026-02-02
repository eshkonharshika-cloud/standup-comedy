import { render, screen, fireEvent } from "@testing-library/react";
import { BentoSection, BentoSectionProps } from "../src/bento";

const mockData: BentoSectionProps = {
  id: "bento-1",
  eyebrow: "Featured",
  title: "Discover Standup Comedy",
  description: "Top comedians and shows",
  cards: [
    {
      id: "card-1",
      label: "Popular",
      title: "Late Night Laughs",
      description: "Best late-night comedy specials",
      imageUrl: "/test-image-1.jpg",
      imageAlt: "Comedy show",
    },
    {
      id: "card-2",
      label: "Trending",
      title: "Open Mic Stars",
      description: "Upcoming standup talent",
      imageUrl: "/test-image-2.jpg",
      imageAlt: "Open mic",
    },
  ],
};

describe("BentoSection component", () => {
  it("renders eyebrow and title", () => {
    render(<BentoSection {...mockData} />);
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /discover standup comedy/i })).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<BentoSection {...mockData} />);
    expect(screen.getByText("Top comedians and shows")).toBeInTheDocument();
  });

  it("renders all cards with title and description", () => {
    render(<BentoSection {...mockData} />);
    expect(screen.getByText("Late Night Laughs")).toBeInTheDocument();
    expect(screen.getByText("Best late-night comedy specials")).toBeInTheDocument();
    expect(screen.getByText("Open Mic Stars")).toBeInTheDocument();
    expect(screen.getByText("Upcoming standup talent")).toBeInTheDocument();
  });

  it("renders card images with correct alt text", () => {
    render(<BentoSection {...mockData} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("alt", "Comedy show");
    expect(images[1]).toHaveAttribute("alt", "Open mic");
  });

  it("renders card labels when provided", () => {
    render(<BentoSection {...mockData} />);
    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("Trending")).toBeInTheDocument();
  });

  it("renders correctly without optional eyebrow and description", () => {
    const partialData: BentoSectionProps = {
      id: "bento-2",
      title: "Comedy Highlights",
      cards: [
        {
          id: "card-1",
          title: "Solo Act",
          imageUrl: "/solo.jpg",
        },
      ],
    };
    render(<BentoSection {...partialData} />);
    expect(screen.getByRole("heading", { name: /comedy highlights/i })).toBeInTheDocument();
    expect(screen.queryByText("Popular")).not.toBeInTheDocument();
    expect(screen.queryByText("Trending")).not.toBeInTheDocument();
  });

  it("renders single card correctly", () => {
    const singleCardData: BentoSectionProps = {
      id: "bento-3",
      title: "Solo Card",
      cards: [
        {
          id: "card-1",
          title: "Just One",
          imageUrl: "/one.jpg",
          description: "Only card here",
        },
      ],
    };
    render(<BentoSection {...singleCardData} />);
    expect(screen.getByText("Just One")).toBeInTheDocument();
    expect(screen.getByText("Only card here")).toBeInTheDocument();
  });

  it("applies hover interaction on cards without crashing", () => {
    render(<BentoSection {...mockData} />);
    const firstCard = screen.getByText("Late Night Laughs");
    fireEvent.mouseEnter(firstCard);
    fireEvent.mouseLeave(firstCard);
    expect(firstCard).toBeInTheDocument();
  });

  it("renders all cards and images correctly when multiple cards exist", () => {
    render(<BentoSection {...mockData} />);
    const cards = screen.getAllByRole("img");
    expect(cards).toHaveLength(2);
    expect(screen.getByText("Late Night Laughs")).toBeInTheDocument();
    expect(screen.getByText("Open Mic Stars")).toBeInTheDocument();
  });
});
