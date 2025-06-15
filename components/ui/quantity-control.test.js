import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuantityControl from "./quantity-control";

describe("QuantityControl", () => {
  const onIncrement = jest.fn();
  const onDecrement = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with given quantity", () => {
    render(
      <QuantityControl
        quantity={3}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByLabelText("Increase quantity")).toBeInTheDocument();
    expect(screen.getByLabelText("Decrease quantity")).toBeInTheDocument();
  });

  it("calls onIncrement when plus button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <QuantityControl
        quantity={1}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />,
    );
    await user.click(screen.getByLabelText("Increase quantity"));
    expect(onIncrement).toHaveBeenCalledTimes(1);
  });

  it("calls onDecrement when minus button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <QuantityControl
        quantity={1}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />,
    );
    await user.click(screen.getByLabelText("Decrease quantity"));
    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it("applies correct width class when isCartPage is true", () => {
    const { container } = render(
      <QuantityControl
        quantity={1}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        isCartPage
      />,
    );
    expect(container.firstChild).toHaveClass("w-[60px]");
  });

  it("applies correct width class when isCartPage is false", () => {
    const { container } = render(
      <QuantityControl
        quantity={1}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        isCartPage={false}
      />,
    );
    expect(container.firstChild).toHaveClass("w-[90px]");
  });
});
