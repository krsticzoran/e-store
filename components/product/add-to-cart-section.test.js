import { render, screen, fireEvent } from "@testing-library/react";
import AddToCartSection from "./add-to-cart-section";

jest.mock("@/components/ui/quantity-control", () => ({
  __esModule: true,
  default: (props) => {
    const { quantity, onDecrement, onIncrement } = props;
    return (
      <div data-testid="quantity-control">
        <button onClick={onDecrement}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrement}>+</button>
      </div>
    );
  },
}));

jest.mock("../cart/add-to-cart-button", () => ({
  __esModule: true,
  default: (props) => {
    return (
      <button data-testid="add-to-cart-btn">
        Add {props.quantity} of {props.product.title}
      </button>
    );
  },
}));

const mockProduct = {
  id: 1,
  title: "Test Product",
};

describe("AddToCartSection", () => {
  test("renders initial quantity and buttons", () => {
    render(<AddToCartSection product={mockProduct} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  test("increments and decrements quantity correctly", () => {
    render(<AddToCartSection product={mockProduct} />);

    const decrementButton = screen.getByText("-");
    const incrementButton = screen.getByText("+");

    fireEvent.click(incrementButton);
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(decrementButton);
    expect(screen.getByText("1")).toBeInTheDocument();

    fireEvent.click(decrementButton);
    expect(screen.getByText("1")).toBeInTheDocument(); // should not go below 1
  });

  test("passes correct quantity to AddToCartButton", () => {
    render(<AddToCartSection product={mockProduct} />);
    expect(screen.getByText("Add 1 of Test Product")).toBeInTheDocument();

    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("Add 2 of Test Product")).toBeInTheDocument();
  });
});
