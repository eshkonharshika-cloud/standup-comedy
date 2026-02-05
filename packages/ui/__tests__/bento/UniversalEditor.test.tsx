import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import UniversalEditor from "../../../../apps/bento/components/editor/UniversalEditor";

// Mock next/navigation
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

const mockData = {
    bento: {
        cards: [
            { id: "1", label: "Step 1", title: "Bento Title 1", description: "Desc 1", imageUrl: "/img1.jpg" },
            { id: "2", label: "Step 2", title: "Bento Title 2", description: "Desc 2", imageUrl: "/img2.jpg" }
        ]
    },
    hero: {
        eyebrow: "Hero Eyebrow",
        title: "Hero Title",
        description: "Hero Desc"
    },
    faq: {
        faqs: [
            { question: "Q1", answer: "A1" }
        ]
    },
    faqStats: { stats: [] },
    testimonial: { quote: "Testimonial", authorName: "Author", authorRole: "Role" },
    capabilities: { capabilities: [] },
    productReleases: { releases: [] },
    featureVideo: { title: "Video Title" },
    discover: { valueProps: [] }
};

describe("UniversalEditor", () => {
    beforeEach(() => {
        window.localStorage.clear();
        vi.clearAllMocks();
    });

    it("renders the sidebar with component categories", () => {
        render(<UniversalEditor initialAllData={mockData} />);
        expect(screen.getByText(/Select Component/i)).toBeInTheDocument();
        // Item list in the sidebar
        const sidebar = screen.getByText("Select Component").closest("aside")!;
        expect(within(sidebar).getByText(/Bento Title 1/i)).toBeInTheDocument();
    });

    it("switches components when selected from dropdown", () => {
        render(<UniversalEditor initialAllData={mockData} />);

        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "hero" } });

        // Check header breadcrumb/label
        const header = screen.getByRole("banner");
        expect(within(header).getByText(/Hero Section/i)).toBeInTheDocument();

        // Check main stage
        const main = screen.getByRole("main");
        expect(within(main).getByText("Hero Title")).toBeInTheDocument();
    });

    it("toggles the left navigation sidebar", () => {
        render(<UniversalEditor initialAllData={mockData} />);

        // The layout icon button is the first button in header
        const toggleButton = screen.getAllByRole("button")[0]!;

        const sidebar = screen.getByText("Select Component").closest("aside")!;
        expect(sidebar).toHaveClass("w-72");

        fireEvent.click(toggleButton);
        expect(sidebar).toHaveClass("w-0");
    });

    it("enters edit mode on double click in center stage", () => {
        render(<UniversalEditor initialAllData={mockData} />);

        // Find the title in center stage
        const main = screen.getByRole("main");
        const titleField = within(main).getByText("Bento Title 1");
        fireEvent.doubleClick(titleField);

        const input = screen.getByDisplayValue("Bento Title 1");
        expect(input).toBeInTheDocument();

        fireEvent.change(input, { target: { value: "Bento Updated" } });
        fireEvent.blur(input);

        expect(within(main).getByText("Bento Updated")).toBeInTheDocument();
    });

    it("swaps field values between items in the component", () => {
        render(<UniversalEditor initialAllData={mockData} />);

        const main = screen.getByRole("main");
        const rightSidebar = screen.getByText("Visual Composition").closest("aside")!;

        // Pick Title 1 from Main Stage
        const title1 = within(main).getByText("Bento Title 1");
        fireEvent.click(title1.parentElement!);

        // Click on Item 2 in the right sidebar (visual composition overview) to switch focus
        const title2InOverview = within(rightSidebar).getByText("Bento Title 2");
        fireEvent.click(title2InOverview.closest("div[class*='group']")!);

        // Now center stage should show Title 2
        // Click on Title 2 in Stage to complete Swap
        const title2InStage = within(main).getByText("Bento Title 2");
        fireEvent.click(title2InStage.parentElement!);

        // They should be swapped. Total "Bento Title 1" should still be 1, same for "Bento Title 2"
        // But since we just swapped, the currentItem index is still 1, 
        // and its title should now be "Bento Title 1"
        expect(within(main).getByText("Bento Title 1")).toBeInTheDocument();
    });
});
