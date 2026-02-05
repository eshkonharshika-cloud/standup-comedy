import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TestimonialSection from "../../../../apps/bento/components/testimonial/testimonial";

// Mock next/image
vi.mock("next/image", () => ({
    default: ({ src, alt, className }: any) => <img src={src} alt={alt} className={className} />,
}));

const mockData = {
    quote: "MOCK QUOTE",
    authorName: "AUTHOR NAME",
    authorRole: "AUTHOR ROLE",
    authorCompany: "AUTHOR COMPANY",
    authorAvatar: { url: "//example.com/avatar.jpg" },
    ctaLabel: "READ STORY",
    ctaLink: "/story"
};

describe("TestimonialSection", () => {
    it("renders testimonial content", () => {
        render(<TestimonialSection data={mockData as any} />);

        expect(screen.getByText(/MOCK QUOTE/)).toBeInTheDocument();
        expect(screen.getByText("AUTHOR NAME")).toBeInTheDocument();
        expect(screen.getByText(/AUTHOR ROLE/)).toBeInTheDocument();
        expect(screen.getByText(/AUTHOR COMPANY/)).toBeInTheDocument();
    });

    it("renders the author image", () => {
        const { container } = render(<TestimonialSection data={mockData as any} />);
        const img = container.querySelector("img");
        expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
        expect(img).toHaveAttribute("alt", "AUTHOR NAME");
    });

    it("renders the CTA link if provided", () => {
        render(<TestimonialSection data={mockData as any} />);
        const link = screen.getByRole("link", { name: /READ STORY/ });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/story");
    });
});
