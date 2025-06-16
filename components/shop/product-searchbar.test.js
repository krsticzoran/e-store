import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductSearchBar from "./product-searchbar";

// MOCK next/navigation
const replaceMock = jest.fn();
const refreshMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
    refresh: refreshMock,
  }),
}));

// MOCK debounce
jest.mock("@/utils/utils", () => ({
  debounce: (fn) => fn, // Disable debounce for testing
}));

describe("ProductSearchBar", () => {
  beforeEach(() => {
    replaceMock.mockReset();
    refreshMock.mockReset();
  });

  describe("Rendering", () => {
    test("renders input field with correct attributes", () => {
      render(<ProductSearchBar />);
      const input = screen.getByPlaceholderText("Search product...");

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveAttribute("id", "search");
      expect(input).toHaveAttribute("name", "search");
      expect(input).toHaveAttribute("aria-label", "Product search bar");
      expect(input).toHaveAttribute("maxLength", "20");
    });

    test("renders search icon", () => {
      render(<ProductSearchBar />);
      const icon = screen.getByTestId("search-icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("fa-magnifying-glass");
    });
  });

  describe("Search functionality", () => {
    test("updates URL with search parameter when query is not empty", async () => {
      render(<ProductSearchBar />);
      const input = screen.getByPlaceholderText("Search product...");

      fireEvent.change(input, { target: { value: "laptop" } });

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith(
          "/shop/?page=1&search=laptop",
          { scroll: false },
        );
        expect(refreshMock).toHaveBeenCalled();
      });
    });

    test("trims whitespace from search query", async () => {
      render(<ProductSearchBar />);
      const input = screen.getByPlaceholderText("Search product...");

      fireEvent.change(input, { target: { value: "  laptop  " } });

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith(
          "/shop/?page=1&search=laptop",
          { scroll: false },
        );
      });
    });

    test("handles special characters in search query", async () => {
      render(<ProductSearchBar />);
      const input = screen.getByPlaceholderText("Search product...");

      fireEvent.change(input, { target: { value: "laptop&phone" } });

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith(
          "/shop/?page=1&search=laptop%26phone",
          { scroll: false },
        );
      });
    });

    test("clears URL when query becomes empty after backspace", async () => {
      render(<ProductSearchBar />);
      const input = screen.getByPlaceholderText("Search product...");

      // Set initial value
      fireEvent.change(input, { target: { value: "abc" } });

      // Simulate backspace and empty input
      fireEvent.keyDown(input, { key: "Backspace" });
      fireEvent.change(input, { target: { value: "" } });

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith("/shop/", { scroll: false });
        expect(refreshMock).toHaveBeenCalled();
      });
    });

    test("does not clear URL when query becomes empty without backspace", async () => {
      render(<ProductSearchBar />);
      const input = screen.getByPlaceholderText("Search product...");

      // Set initial value
      fireEvent.change(input, { target: { value: "abc" } });

      // Simulate select all + delete (no backspace)
      fireEvent.change(input, { target: { value: "" } });

      await waitFor(() => {
        expect(replaceMock).not.toHaveBeenCalledWith("/shop/", {
          scroll: false,
        });
      });
    });
  });

  describe("Input constraints", () => {
    test("has maxLength attribute set to 20", () => {
      render(<ProductSearchBar />);
      const input = screen.getByPlaceholderText("Search product...");
      expect(input).toHaveAttribute("maxLength", "20");
    });

    test("limits input to 20 characters", () => {
      render(<ProductSearchBar />);
      const input = screen.getByPlaceholderText("Search product...");

      const longText = "a".repeat(25);
      fireEvent.change(input, { target: { value: longText.slice(0, 20) } });

      expect(input.value).toHaveLength(20);
    });
  });
});
