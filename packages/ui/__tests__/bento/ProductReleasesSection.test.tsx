import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductReleasesSection from "../../../../apps/bento/components/product_realeses/product-releases-section";

// Mock Link
vi.mock("next/link", () => ({
    default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockData = {
    eyebrow: "RELEASES EYEBROW",
    title: "RELEASES TITLE",
    cta: { label: "VIEW ALL", href: "/all" },
    releases: [
        { id: "r1", date: "JAN 2024", title: "Release 1", versions: "v1.0", href: "/r1" },
        { id: "r2", date: "FEB 2024", title: "Release 2", versions: "v2.0", href: "/r2" }
    ]
};

describe("ProductReleasesSection", () => {
    it("renders header content", () => {
        render(<ProductReleasesSection data={mockData as any} />);

        expect(screen.getByText("RELEASES EYEBROW")).toBeInTheDocument();
        expect(screen.getByText("RELEASES TITLE")).toBeInTheDocument();
        expect(screen.getByText("VIEW ALL")).toBeInTheDocument();
    });

    it("renders release items", () => {
        render(<ProductReleasesSection data={mockData as any} />);

        expect(screen.getByText("JAN 2024")).toBeInTheDocument();
        expect(screen.getByText("Release 1")).toBeInTheDocument();
        expect(screen.getByText("v1.0")).toBeInTheDocument();

        expect(screen.getByText("FEB 2024")).toBeInTheDocument();
        expect(screen.getByText("Release 2")).toBeInTheDocument();
        expect(screen.getByText("v2.0")).toBeInTheDocument();
    });

    it("renders links for each release", () => {
        render(<ProductReleasesSection data={mockData as any} />);
        const links = screen.getAllByRole("link", { name: /View release/i });
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute("href", "/r1");
    });
});
