import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import BentoPageContent from "../../../../apps/bento/components/bento/BentoPageContent";

// Mock the inner BentoSection and framer-motion
vi.mock("@/components/bento/bento", () => ({
    default: ({ data }: any) => <div data-testid="bento-inner">{data.title}</div>,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
    motion: {
        div: ({ children, style, className, ...props }: any) => <div className={className} style={style} {...props}>{children}</div>,
    },
    useScroll: () => ({ scrollYProgress: { onChange: vi.fn() } }),
    useTransform: () => ({ get: () => 0 }),
}));

const mockCmsData = {
    title: "CMS BENTO TITLE",
    description: "CMS DESC",
    cards: [
        { id: "1", title: "Card 1", description: "Desc 1" }
    ]
};

describe("BentoPageContent", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("renders CMS data by default", () => {
        render(<BentoPageContent cmsData={mockCmsData as any} />);
        expect(screen.getByTestId("bento-inner")).toHaveTextContent("CMS BENTO TITLE");
    });

    it("loads saved data from localStorage if available", () => {
        const localData = {
            title: "LOCAL BENTO TITLE",
            cards: []
        };
        window.localStorage.setItem("bento-data", JSON.stringify(localData));

        render(<BentoPageContent cmsData={mockCmsData as any} />);
        expect(screen.getByTestId("bento-inner")).toHaveTextContent("LOCAL BENTO TITLE");
    });

    it("renders the floating editor button", () => {
        render(<BentoPageContent cmsData={mockCmsData as any} />);
        const editorLink = screen.getByRole("link", { name: /Editor/i });
        expect(editorLink).toBeInTheDocument();
        expect(editorLink).toHaveAttribute("href", "/editor");
    });
});
