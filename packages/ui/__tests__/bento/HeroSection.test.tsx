import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HeroSection from "../../../../apps/bento/components/hero/hero";

// Mock framer-motion to avoid issues with scroll-based animations in tests
vi.mock("framer-motion", () => ({
    motion: {
        div: ({ children, style, className }: any) => <div className={className} style={style}>{children}</div>,
    },
    useScroll: () => ({ scrollYProgress: { onChange: vi.fn() } }),
    useTransform: () => ({ get: () => 0 }),
}));

const mockHero = {
    eyebrow: "MOCK EYEBROW",
    title: "MOCK TITLE",
    description: "MOCK DESCRIPTION",
    form: {
        title: "FORM TITLE",
        emailPlaceholder: "EMAIL PLACEHOLDER",
    },
    cta: {
        label: "CTA BUTTON",
    }
};

describe("HeroSection", () => {
    it("renders hero content correctly", () => {
        render(<HeroSection hero={mockHero as any} />);

        expect(screen.getByText("MOCK EYEBROW")).toBeInTheDocument();
        expect(screen.getByText("MOCK TITLE")).toBeInTheDocument();
        expect(screen.getByText("MOCK DESCRIPTION")).toBeInTheDocument();
        expect(screen.getByText("FORM TITLE")).toBeInTheDocument();
        expect(screen.getByText(/CTA BUTTON/)).toBeInTheDocument();
    });

    it("renders the country select field", () => {
        render(<HeroSection hero={mockHero as any} />);
        expect(screen.getByText("Country")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders the video iframe", () => {
        const { container } = render(<HeroSection hero={mockHero as any} />);
        const iframe = container.querySelector("iframe");
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute("src", expect.stringContaining("youtube.com"));
    });
});
