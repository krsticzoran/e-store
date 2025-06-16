import { render, screen, fireEvent } from "@testing-library/react";
import AuthForm from "./auth-form.js";

jest.mock("@/components/ui/form-button", () => {
  return function MockFormButton({ children }) {
    return <button>{children}</button>;
  };
});

describe("AuthForm", () => {
  const defaultProps = {
    formAction: jest.fn(),
    localMessage: "",
    handleInputChange: jest.fn(),
    onClose: jest.fn(),
    switchMode: jest.fn(),
  };

  test("renders login mode correctly", () => {
    render(<AuthForm {...defaultProps} mode="login" />);

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/username/i)).not.toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText(/confirm password/i),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("renders signup mode correctly", () => {
    render(<AuthForm {...defaultProps} mode="signup" />);

    expect(
      screen.getByRole("heading", { name: /register/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/confirm password/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /login/i }),
    ).not.toBeInTheDocument();
  });

  test("calls switchMode when switch text is clicked", () => {
    const switchMode = jest.fn();
    render(<AuthForm {...defaultProps} mode="login" switchMode={switchMode} />);
    fireEvent.click(screen.getByText(/sign up/i));
    expect(switchMode).toHaveBeenCalledWith("signup");
  });

  test("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<AuthForm {...defaultProps} mode="login" onClose={onClose} />);
    fireEvent.click(screen.getByLabelText(/close modal/i));
    expect(onClose).toHaveBeenCalled();
  });

  test("displays localMessage when provided", () => {
    render(
      <AuthForm
        {...defaultProps}
        mode="login"
        localMessage="Invalid credentials"
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid credentials");
  });
});
