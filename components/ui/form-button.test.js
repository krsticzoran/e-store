jest.mock("react-dom", () => {
  const actual = jest.requireActual("react-dom");
  return {
    ...actual,
    useFormStatus: jest.fn(),
  };
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { useFormStatus } from "react-dom";
import FormButton from "./form-button";

describe("FormButton", () => {
  beforeEach(() => {
    useFormStatus.mockReset();
  });

  it("renders enabled button when pending is false", () => {
    useFormStatus.mockReturnValue({ pending: false });

    render(<FormButton className="btn">Submit</FormButton>);
    const button = screen.getByRole("button", { name: /submit form/i });

    expect(button).toBeEnabled();
    expect(button).toHaveTextContent("Submit");
  });

  it("renders disabled button when pending is true", () => {
    useFormStatus.mockReturnValue({ pending: true });

    render(<FormButton className="btn">Submit</FormButton>);
    const button = screen.getByRole("button", { name: /submitting form/i });
    expect(screen.queryByText(/submit/i)).toBeNull();

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Sending...");
  });
});
