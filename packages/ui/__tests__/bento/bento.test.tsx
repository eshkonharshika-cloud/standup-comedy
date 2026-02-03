import { render, screen } from "@testing-library/react";
import BentoSection, { BentoSectionProps } from "../../src/bento";

/**
 * Mocked CMS-mapped data
 * (This is AFTER CMS → mapper → component)
 */
const bentoCMSProps: BentoSectionProps = {
  id: "argus-intelligence",
  eyebrow: "HOW ARGUS Intelligence works",
  title: "Optimize your CRE portfolio",
  description:
    "Streamline cash flow modeling, centralize asset data, enable powerful scenario views, and outperform the market.",
  cards: [
    {
      id: "1",
      label: "Step 1",
      title: "Model your cashflows",
      description:
        "Rely on ARGUS Enterprise, the leading commercial property valuation and cashflow forecasting solution.",
      imageUrl: "/step-1.jpg",
      imageAlt: "Model cashflows",
      colSpan: 3,
      rowSpan: 1,
      roundedVariant: "md",
    },
    {
      id: "2",
      label: "Step 2",
      title: "Organize your models",
      description:
        "Centralize and store your rich ARGUS models on ARGUS Intelligence.",
      imageUrl: "/step-2.jpg",
      imageAlt: "Organize models",
      colSpan: 3,
      rowSpan: 1,
      roundedVariant: "md",
    },
    {
      id: "3",
      label: "Step 3",
      title: "Integrate your data",
      description:
        "Incorporate rent rolls into cash flow and valuation models.",
      imageUrl: "/step-3.jpg",
      colSpan: 2,
      rowSpan: 1,
    },
  ],
};

describe("BentoSection (CMS-driven)", () => {
  it("renders eyebrow, title, and description from CMS", () => {
    render(<BentoSection {...bentoCMSProps} />);

    expect(
      screen.getByText("HOW ARGUS Intelligence works")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /optimize your cre portfolio/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/streamline cash flow modeling/i)
    ).toBeInTheDocument();
  });

  it("renders all bento cards from CMS data", () => {
    render(<BentoSection {...bentoCMSProps} />);

    expect(screen.getByText("Model your cashflows")).toBeInTheDocument();
    expect(screen.getByText("Organize your models")).toBeInTheDocument();
    expect(screen.getByText("Integrate your data")).toBeInTheDocument();
  });

  it("renders step labels when provided", () => {
    render(<BentoSection {...bentoCMSProps} />);

    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
  });

  it("renders card images with correct alt text fallback", () => {
    render(<BentoSection {...bentoCMSProps} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);

    expect(images[0]).toHaveAttribute("alt", "Model cashflows");
    expect(images[2]).toHaveAttribute("alt", "Integrate your data");
  });

  it("renders correctly when optional fields are missing", () => {
    const minimalProps: BentoSectionProps = {
      id: "minimal",
      title: "Minimal Bento",
      cards: [
        {
          id: "only-card",
          title: "Single card",
          imageUrl: "/single.jpg",
        },
      ],
    };

    render(<BentoSection {...minimalProps} />);

    expect(
      screen.getByRole("heading", { name: /minimal bento/i })
    ).toBeInTheDocument();

    expect(screen.getByText("Single card")).toBeInTheDocument();
  });

  it("renders the correct number of cards", () => {
    render(<BentoSection {...bentoCMSProps} />);

    const cards = screen.getAllByRole("img");
    expect(cards).toHaveLength(bentoCMSProps.cards.length);
  });
});
