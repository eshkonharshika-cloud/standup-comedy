import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TopNavbar from "../../../../apps/bento/components/navbar/navbar";

describe("TopNavbar", () => {
    it("renders navigation items", () => {
        render(<TopNavbar />);
        expect(screen.getByText("EN")).toBeInTheDocument();
        expect(screen.getByText("Contact Support")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("renders icons", () => {
        const { container } = render(<TopNavbar />);
        const svgs = container.querySelectorAll("svg");
        expect(svgs.length).toBeGreaterThanOrEqual(4);
    });
});
