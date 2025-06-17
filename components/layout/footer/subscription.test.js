import { render, screen } from "@testing-library/react";
import React from "react";

jest.mock("@/components/ui/form-button", () => {
  const MockFormButton = (props) => (
    <button {...props} data-testid="mock-form-button">
      {props.children}
    </button>
  );
  MockFormButton.displayName = "MockFormButton";
  return MockFormButton;
});

jest.mock("next/image", () => {
  const MockNextImage = (props) => {
    return <img {...props} alt={props.alt || "image"} />;
  };
  MockNextImage.displayName = "MockNextImage";
  return MockNextImage;
});

describe("Subscription component", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("renders without message", async () => {
    jest.doMock("@/hooks/useFormHandler", () => () => ({
      ref: { current: null },
      formAction: jest.fn(),
      handleInputFocus: jest.fn(),
      message: "",
    }));

    const { default: Subscription } = await import(
      "@/components/layout/footer/subscription"
    );
    render(<Subscription />);
    expect(
      screen.getByPlaceholderText(/enter your email/i),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-form-button")).toBeInTheDocument();
    expect(
      screen.queryByText(/successfully subscribed/i),
    ).not.toBeInTheDocument();
  });

  it("renders with message", async () => {
    jest.doMock("@/hooks/useFormHandler", () => () => ({
      ref: { current: null },
      formAction: jest.fn(),
      handleInputFocus: jest.fn(),
      message: "Successfully subscribed!",
    }));

    const { default: Subscription } = await import(
      "@/components/layout/footer/subscription"
    );
    render(<Subscription />);
    expect(screen.getByText(/successfully subscribed/i)).toBeInTheDocument();
  });
});
