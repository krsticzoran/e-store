import { render, screen } from "@testing-library/react";
import Breadcrumb from "./breadcrumb";
import "@testing-library/jest-dom";

const mockProduct = {
  name: "Green Tea",
  categories: [
    {
      name: "tea",
      slug: "tea",
    },
  ],
};

describe("Breadcrumb", () => {
  test("renders home, category, and product name correctly", () => {
    render(<Breadcrumb product={mockProduct} />);

    // Check for "Home" link
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");

    // Check for category link
    const categoryLink = screen.getByText("tea");
    expect(categoryLink).toBeInTheDocument();
    expect(categoryLink.closest("a")).toHaveAttribute("href", "/shop/tea");

    // Check for current product name (not a link)
    const productName = screen.getByText("Green Tea");
    expect(productName).toBeInTheDocument();
    expect(productName.closest("a")).not.toBeTruthy(); // not wrapped in a link
  });
});
