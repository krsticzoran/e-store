import { render, screen } from "@testing-library/react";
import EmptyCart from "./empty-cart";
import "@testing-library/jest-dom";

describe("EmptyCard", () => {
  test("renders empty cart message, icon, and return to shop link", () => {
    render(<EmptyCart />);

    // Check for the empty cart message
    expect(
      screen.getByText(/your cart is currently empty/i),
    ).toBeInTheDocument();

    // Check for the return to shop link
    const returnLink = screen.getByRole("link", { name: /return to shop/i });
    expect(returnLink).toBeInTheDocument();
    expect(returnLink).toHaveAttribute("href", "/shop");

    // Check for the cart icon (via class)
    const icon = document.querySelector(".fa-cart-shopping");
    expect(icon).toBeInTheDocument();
  });
});
