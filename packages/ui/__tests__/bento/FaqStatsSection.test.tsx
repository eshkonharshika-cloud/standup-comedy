import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FaqStatsSection from "../../../../apps/bento/components/faq-section/faq-section";

const mockData = {
    title: "FAQ TITLE",
    stats: [
        { id: "s1", value: "100%", label: "Accuracy" },
        { id: "s2", value: "24/7", label: "Availability" }
    ],
    faqs: [
        { id: "f1", question: "Question 1", answer: "Answer 1" },
        { id: "f2", question: "Question 2", answer: "Answer 2" }
    ]
};

describe("FaqStatsSection", () => {
    it("renders stats correctly", () => {
        render(<FaqStatsSection data={mockData as any} />);

        expect(screen.getByText("100%")).toBeInTheDocument();
        expect(screen.getByText("Accuracy")).toBeInTheDocument();
        expect(screen.getByText("24/7")).toBeInTheDocument();
        expect(screen.getByText("Availability")).toBeInTheDocument();
    });

    it("renders FAQ title and questions", () => {
        render(<FaqStatsSection data={mockData as any} />);

        expect(screen.getByText("FAQ TITLE")).toBeInTheDocument();
        expect(screen.getByText("Question 1")).toBeInTheDocument();
        expect(screen.getByText("Question 2")).toBeInTheDocument();
    });

    it("toggles FAQ answer on click", () => {
        render(<FaqStatsSection data={mockData as any} />);

        // Answer is hidden initially
        expect(screen.queryByText("Answer 1")).not.toBeInTheDocument();

        const question = screen.getByText("Question 1");
        fireEvent.click(question);

        // Answer should be visible
        expect(screen.getByText("Answer 1")).toBeInTheDocument();

        fireEvent.click(question);
        // Answer should be hidden again
        expect(screen.queryByText("Answer 1")).not.toBeInTheDocument();
    });
});
