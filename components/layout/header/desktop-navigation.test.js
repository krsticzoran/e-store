import { render, screen } from "@testing-library/react";
import DesktopNavigation from "./desktop-navigation.js";
import { pages } from "@/data/headerData";

describe("DesktopNavigation", () => {
  test("renders all links from pages", () => {
    render(<DesktopNavigation pathname="/" />);
    pages.forEach((page) => {
      const label = page === "" ? "home" : page === "about" ? "about us" : page;
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("applies text-secondary class to active link for exact pathname", () => {
    render(<DesktopNavigation pathname="/about" />);
    const activeLink = screen.getByText("about us");
    expect(activeLink.parentElement).toHaveClass("text-secondary");
    pages.forEach((page) => {
      if (page !== "about") {
        const label =
          page === "" ? "home" : page === "about" ? "about us" : page;
        const link = screen.getByText(label);
        expect(link.parentElement).not.toHaveClass("text-secondary");
      }
    });
  });

  test("applies text-secondary class to shop link for shop subpaths", () => {
    render(<DesktopNavigation pathname="/shop/product-123" />);
    const shopLink = screen.getByText("shop");
    expect(shopLink.parentElement).toHaveClass("text-secondary");
    pages.forEach((page) => {
      if (page !== "shop") {
        const label =
          page === "" ? "home" : page === "about" ? "about us" : page;
        const link = screen.getByText(label);
        expect(link.parentElement).not.toHaveClass("text-secondary");
      }
    });
  });
});
