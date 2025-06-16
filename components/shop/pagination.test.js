import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./pagination";

let currentPage = "2";

const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(`page=${currentPage}`),
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

describe("Pagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders pagination buttons when more than one page exists", () => {
    render(<Pagination totalItems={25} itemsPerPage={10} basePath="/shop" />);
    expect(screen.getByLabelText("previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("next page")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("calls router.push and router.refresh when page number is clicked", () => {
    currentPage = "1";
    render(<Pagination totalItems={30} itemsPerPage={10} basePath="/shop" />);

    const page2 = screen.getByRole("button", { name: /go to page 2/i });
    fireEvent.click(page2);

    expect(mockPush).toHaveBeenCalledWith("/shop?page=2", { scroll: false });
    expect(mockRefresh).toHaveBeenCalled();
  });

  test("disables previous button on first page", () => {
    currentPage = "1";
    render(<Pagination totalItems={30} itemsPerPage={10} basePath="/shop" />);
    const prevButton = screen.getByRole("button", { name: "previous page" });
    expect(prevButton).toBeDisabled();
  });

  test("disables next button on last page", () => {
    currentPage = "3"; // 30 items / 10 per page = 3 pages
    render(<Pagination totalItems={30} itemsPerPage={10} basePath="/shop" />);
    const nextButton = screen.getByRole("button", { name: "next page" });
    expect(nextButton).toBeDisabled();
  });

  test("does not render pagination if only one page", () => {
    currentPage = "1";
    const { container } = render(
      <Pagination totalItems={5} itemsPerPage={10} basePath="/shop" />,
    );
    expect(container).toBeEmptyDOMElement(); // no pagination rendered
  });
});
