import { render, screen } from "@testing-library/react";
import TaxonomyList from "./taxonomy-list";
import "@testing-library/jest-dom";

const sampleItems = [
  { id: 1, name: "green tea", slug: "green-tea" },
  { id: 2, name: "black tea" }, // no slug, should fallback to name
  { id: 3, name: "oolong", slug: "oolong" },
];

describe("TaxonomyList component", () => {
  test("renders label and all taxonomy links with correct href and punctuation", () => {
    render(<TaxonomyList items={sampleItems} label="Categories" />);

    // Label presence
    expect(screen.getByText(/^Categories:/)).toBeInTheDocument();

    // Each item rendered as link with correct href and text
    sampleItems.forEach(({ name, slug }) => {
      const link = screen.getByText(new RegExp(name, "i"));
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/shop/${slug || name}`);
      expect(link).toHaveClass("capitalize");
    });

    // Check for commas between items except after the last
    const container = screen.getByText(/^Categories:/).parentElement;
    expect(container.textContent).toBe(
      "Categories: green tea, black tea, oolong",
    );
  });

  test("renders nothing if items is undefined or empty", () => {
    const { container: container1 } = render(
      <TaxonomyList items={undefined} label="Tags" />,
    );
    expect(container1.textContent).toBe("Tags: ");

    const { container: container2 } = render(
      <TaxonomyList items={[]} label="Tags" />,
    );
    expect(container2.textContent).toBe("Tags: ");
  });
});
