import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CapabilityMarqueeSection } from "../../../../apps/bento/components/capabilities/CapabilityMarquee";

// Mock framer-motion
vi.mock("framer-motion", () => ({
    motion: {
        div: ({ children, style, className }: any) => <div className={className} style={style}>{children}</div>,
    },
    useScroll: () => ({ scrollYProgress: { onChange: vi.fn() } }),
    useTransform: () => ({ get: () => "0%" }),
}));

// Mock Link
vi.mock("next/link", () => ({
    default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock CapabilityCard
vi.mock("./capabilty", () => ({
    CapabilityCard: ({ item }: any) => <div>{item.title}</div>,
}));

const mockData = {
    highlight: {
        title: "HIGHLIGHT TITLE",
        description: "HIGHLIGHT DESC",
        cta: { label: "CTA", href: "/cta" }
    },
    capabilities: [
        { id: "1", title: "Cap 1" },
        { id: "2", title: "Cap 2" }
    ]
};

describe("CapabilityMarqueeSection", () => {
    it("renders highlight content", () => {
        render(<CapabilityMarqueeSection data={mockData as any} />);

        expect(screen.getByText("HIGHLIGHT TITLE")).toBeInTheDocument();
        expect(screen.getByText("HIGHLIGHT DESC")).toBeInTheDocument();
        expect(screen.getByText("CTA")).toBeInTheDocument();
    });

    it("renders capabilities in marquee", () => {
        render(<CapabilityMarqueeSection data={mockData as any} />);

        expect(screen.getByText("Cap 1")).toBeInTheDocument();
        expect(screen.getByText("Cap 2")).toBeInTheDocument();
    });
});
