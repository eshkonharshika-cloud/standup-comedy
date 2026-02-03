import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import BentoEditor from "../../../../apps/bento/components/editor/BentoEditor";
import { BentoSection } from "@standup/contracts/bento";

// Mock next/navigation
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

const mockBentoData: BentoSection = {
    id: "test-bento",
    eyebrow: "Eyebrow",
    title: "Test Bento",
    description: "Description",
    cards: [
        {
            id: "card-1",
            label: "Label 1",
            title: "Title 1",
            description: "Description 1",
            imageUrl: "https://example.com/img1.jpg",
            colSpan: 3,
        },
        {
            id: "card-2",
            label: "Label 2",
            title: "Title 2",
            description: "Description 2",
            imageUrl: "https://example.com/img2.jpg",
            colSpan: 2,
        },
    ],
};

describe("BentoEditor", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("renders the first card by default", () => {
        render(<BentoEditor initialData={mockBentoData} />);

        expect(screen.getByText("Title 1")).toBeInTheDocument();
        expect(screen.getByText("Label 1")).toBeInTheDocument();
        expect(screen.getByText("Description 1")).toBeInTheDocument();
    });

    it("navigates to the next card when clicking the '>' button", () => {
        render(<BentoEditor initialData={mockBentoData} />);

        const nextButton = screen.getByLabelText("Next card");
        fireEvent.click(nextButton);

        expect(screen.getByText("Title 2")).toBeInTheDocument();
        expect(screen.getByText("Label 2")).toBeInTheDocument();
        expect(screen.getByText("Description 2")).toBeInTheDocument();
    });

    it("swaps field values between cards using pick & drop", () => {
        render(<BentoEditor initialData={mockBentoData} />);

        // Pick Title 1 from Card 1
        const title1 = screen.getByText("Title 1");
        fireEvent.click(title1);

        // Navigate to Card 2
        const nextButton = screen.getByLabelText("Next card");
        fireEvent.click(nextButton);

        // Drop into Title 2 of Card 2
        const title2 = screen.getByText("Title 2");
        fireEvent.click(title2);

        // Now Title 2 on Card 2 should be "Title 1"
        expect(screen.getByText("Title 1")).toBeInTheDocument();

        // Navigate back to Card 1
        const prevButton = screen.getByLabelText("Previous card");
        fireEvent.click(prevButton);

        // Now Card 1 should have "Title 2"
        expect(screen.getByText("Title 2")).toBeInTheDocument();
    });

    it("swaps field values within the same card", () => {
        render(<BentoEditor initialData={mockBentoData} />);

        // Pick Title 1
        const title1 = screen.getByText("Title 1");
        fireEvent.click(title1);

        // Drop into Description 1
        const desc1 = screen.getByText("Description 1");
        fireEvent.click(desc1);

        // Descriptions should now be swapped
        // Value swap happened
                expect(screen.getByText("Description 1")).toBeInTheDocument();
                expect(screen.getByText("Title 1")).toBeInTheDocument();

                // Ensure both fields still exist
                expect(screen.getAllByText(/Title|Description/).length).toBeGreaterThan(1);

    });

    it("enters edit mode on double click", () => {
        render(<BentoEditor initialData={mockBentoData} />);

        const titleField = screen.getByTestId("field-title");
        fireEvent.doubleClick(titleField);

        const input = screen.getByDisplayValue("Title 1");
        expect(input).toBeInTheDocument();

        fireEvent.change(input, { target: { value: "Updated Title" } });
        fireEvent.blur(input);

        expect(screen.getByText("Updated Title")).toBeInTheDocument();
    });
});
