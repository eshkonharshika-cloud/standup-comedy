import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "../../../../apps/bento/components/footer/footer";



describe("Footer", () => {
    it("renders AltusGroup logo and copyright", () => {
        render(<Footer />);
        expect(screen.getByText("AltusGroup")).toBeInTheDocument();
        expect(screen.getByText(/Copyright ©/)).toBeInTheDocument();
    });

    it("renders footer link categories", () => {
        render(<Footer />);
        expect(screen.getByText("What we offer")).toBeInTheDocument();
        expect(screen.getByText("Resources")).toBeInTheDocument();
        expect(screen.getByText("Company")).toBeInTheDocument();
        expect(screen.getByText("Customer support")).toBeInTheDocument();
    });

    it("scrolls to top when button is clicked", () => {
        render(<Footer />);
        const scrollButton = screen.getByLabelText("Scroll to top");
        fireEvent.click(scrollButton);
        expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
});
