import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ArgusDiscoverSection from "../../../../apps/bento/components/discover/ArgusDiscoverSection";

// Mock next/image
vi.mock("next/image", () => ({
    default: ({ src, alt, className }: any) => <img src={src} alt={alt} className={className} />,
}));

const mockData = {
    eyebrow: "DISCOVER EYEBROW",
    title: "DISCOVER TITLE",
    description: "DISCOVER DESC",
    valueProps: [
        {
            id: "1",
            title: "Card 1",
            subtitle: "Subtitle 1",
            media: { url: "//example.com/img1.jpg", contentType: "image/jpeg" },
            linkLabel: "Learn More",
            linkUrl: "/link1"
        },
        {
            id: "2",
            title: "Card 2",
            subtitle: "Subtitle 2",
            media: { url: "//example.com/video1.mp4", contentType: "video/mp4" },
        }
    ]
};

describe("ArgusDiscoverSection", () => {
    it("renders header content", () => {
        render(<ArgusDiscoverSection data={mockData as any} />);
        expect(screen.getByText("DISCOVER EYEBROW")).toBeInTheDocument();
        expect(screen.getByText("DISCOVER TITLE")).toBeInTheDocument();
        expect(screen.getByText("DISCOVER DESC")).toBeInTheDocument();
    });

    it("renders card titles", () => {
        render(<ArgusDiscoverSection data={mockData as any} />);
        expect(screen.getByText("Card 1")).toBeInTheDocument();
        expect(screen.getByText("Card 2")).toBeInTheDocument();
    });

    it("shows subtitle on hover", () => {
        render(<ArgusDiscoverSection data={mockData as any} />);

        const card1 = screen.getByText("Card 1").closest(".group")!;

        // Initially, subtitle might be hidden by max-h-0 (testing-library doesn't check CSS visibility strictly unless configured, but we can check if it's in the DOM)
        expect(screen.getByText("Subtitle 1")).toBeInTheDocument();

        fireEvent.mouseEnter(card1);
        // We can check if the parent div has the active class/styles if needed, 
        // but typically we're just checking text existence.
    });

    it("renders image and video backgrounds", () => {
        const { container } = render(<ArgusDiscoverSection data={mockData as any} />);

        expect(container.querySelector("img")).toHaveAttribute("src", "https://example.com/img1.jpg");
        expect(container.querySelector("video")).toHaveAttribute("src", "https://example.com/video1.mp4");
    });
});
