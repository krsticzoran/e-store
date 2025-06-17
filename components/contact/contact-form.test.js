import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "./contact-form";

jest.mock("@/hooks/useFormHandler", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    ref: { current: null },
    message: "",
    formAction: jest.fn(),
    handleInputFocus: jest.fn(),
    isSubmitted: false,
  })),
}));

jest.mock("@/components/ui/form-button", () => {
  const MockFormButton = (props) => (
    <button {...props} type="submit">
      {props.children}
    </button>
  );
  MockFormButton.displayName = "MockFormButton";
  return MockFormButton;
});

describe("ContactForm", () => {
  test("renders all inputs and button", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Your message")).toBeInTheDocument();
    expect(
      screen.getByLabelText(/consent to data processing/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });

  test("checkbox toggles when clicked", () => {
    render(<ContactForm />);
    const checkbox = screen.getByLabelText(/consent/i);
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
