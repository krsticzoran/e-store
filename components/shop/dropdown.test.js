import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "./dropdown";

const mockPush = jest.fn();
const mockRefresh = jest.fn();

let searchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
  useSearchParams: () => searchParams,
}));

jest.mock("@/data/shop", () => ({
  sortingOptions: [
    { label: "Default", value: "default" },
    { label: "Price: Low to High", value: "priceAsc" },
    { label: "Price: High to Low", value: "priceDesc" },
  ],
}));

describe("Dropdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    searchParams = new URLSearchParams();
  });

  test("renders with default label and opens dropdown on click", () => {
    render(<Dropdown basePath="/shop" />);

    expect(screen.getByRole("button")).toHaveTextContent("Default");

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("Price: Low to High")).toBeInTheDocument();
    expect(screen.getByText("Price: High to Low")).toBeInTheDocument();
  });

  test("selects an option, updates query and closes dropdown", () => {
    render(<Dropdown basePath="/shop" />);

    fireEvent.click(screen.getByRole("button"));

    const option = screen.getByText("Price: High to Low");
    fireEvent.click(option);

    expect(mockPush).toHaveBeenCalledWith("/shop?sort=priceDesc&page=1", {
      scroll: false,
    });
    expect(mockRefresh).toHaveBeenCalled();
    expect(screen.getByRole("button")).toHaveTextContent("Price: High to Low");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
