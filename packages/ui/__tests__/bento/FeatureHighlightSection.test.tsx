import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FeatureHighlightSection from "../../../../apps/bento/components/featurevideo/FeatureHighlightSection";

// Mock framer-motion
vi.mock("framer-motion", () => ({
    motion: {
        div: ({ children, style, className, animate, ...props }: any) => (
            <div className={className} style={style} {...props}>{children}</div>
        ),
    },
    useInView: () => true, // Simulate being in view for tests
}));

const mockSection = {
    eyebrow: "MOCK EYEBROW",
    title: "MOCK TITLE",
    description: "MOCK DESCRIPTION",
    interactionHint: "LAUNCH NOW"
};

describe("FeatureHighlightSection", () => {
    it("renders hero content correctly", () => {
        render(<FeatureHighlightSection section={mockSection as any} />);

        expect(screen.getByText("MOCK EYEBROW")).toBeInTheDocument();
        expect(screen.getByText("MOCK TITLE")).toBeInTheDocument();
        expect(screen.getByText("MOCK DESCRIPTION")).toBeInTheDocument();
        expect(screen.getByText("LAUNCH NOW")).toBeInTheDocument();
    });

    it("toggles the video on button click", () => {
        const { container } = render(<FeatureHighlightSection section={mockSection as any} />);

        // Before expansion there is no iframe
        expect(container.querySelector("iframe")).not.toBeInTheDocument();

        const button = screen.getByRole("button", { name: /LAUNCH NOW/ });
        fireEvent.click(button);

        // After expansion there is an iframe
        expect(container.querySelector("iframe")).toBeInTheDocument();
        expect(screen.getByText(/Pause Experience/)).toBeInTheDocument();
    });
});
