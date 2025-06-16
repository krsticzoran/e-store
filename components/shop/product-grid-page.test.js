import { render, screen } from "@testing-library/react";
import ProductGridPage from "./product-grid-page";

jest.mock("@/components/shop/pagination", () => {
  const PaginationMock = () => <div data-testid="pagination" />;
  PaginationMock.displayName = "MockPagination";
  return PaginationMock;
});

jest.mock("@/components/shop/dropdown", () => {
  const DropdownMock = () => <div data-testid="dropdown" />;
  DropdownMock.displayName = "MockDropdown";
  return DropdownMock;
});

jest.mock("@/components/product/product-list", () => {
  const ProductListMock = ({ products }) => (
    <div data-testid="product-list">
      {products.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
  ProductListMock.displayName = "MockProductList";
  return ProductListMock;
});

jest.mock("@/utils/shop", () => ({
  sortProducts: (products) => products,
}));

describe("ProductGridPage", () => {
  const basePath = "/shop";

  test("renders no product message when products list is empty", () => {
    render(
      <ProductGridPage
        searchParams={{ page: "1", sort: "default" }}
        products={[]}
        basePath={basePath}
      />,
    );

    expect(
      screen.getByText("No products were found matching your selection."),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("product-list")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });

  test("renders product list and pagination when products are available", () => {
    const mockProducts = Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
    }));

    render(
      <ProductGridPage
        searchParams={{ page: "1", sort: "default" }}
        products={mockProducts}
        basePath={basePath}
      />,
    );

    for (let i = 1; i <= 6; i++) {
      expect(screen.getByText(`Product ${i}`)).toBeInTheDocument();
    }

    expect(screen.queryByText("Product 7")).not.toBeInTheDocument();

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
    expect(screen.getByText("Showing 1–6 of 9 results")).toBeInTheDocument();
  });

  test("correctly handles second page of results", () => {
    const mockProducts = Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
    }));

    render(
      <ProductGridPage
        searchParams={{ page: "2", sort: "default" }}
        products={mockProducts}
        basePath={basePath}
      />,
    );

    expect(screen.getByText("Product 7")).toBeInTheDocument();
    expect(screen.getByText("Product 9")).toBeInTheDocument();
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();

    expect(screen.getByText("Showing 7–9 of 9 results")).toBeInTheDocument();
  });
});
