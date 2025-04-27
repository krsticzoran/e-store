import ProductList from "@/components/product/product-list";
import Pagination from "@/components/shop/pagination";
import Dropdown from "@/components/shop/dropdown";
import { sortProducts } from "@/utils/shop";

export default function ProductGridPage({ searchParams, products, basePath }) {
  // Get sorting parameter from query string or use default
  const sortBy = searchParams.sort || "default";
  // Get current page from query string or fallback to page 1
  const page = Number(searchParams.page) || 1;
  const perPage = 6; // Number of products per page

  // Sort products using a reusable utility function
  const sortedProducts = sortProducts(products, sortBy);

  // Calculate the start and end index for pagination
  const start = (page - 1) * perPage;
  const end = start + perPage;

  // Get only the products for the current page
  const entries = sortedProducts.slice(start, end);

  return (
    <>
      <div className="mt-10 flex items-center justify-between text-primary">
        <p className="text-sm leading-4">{`Showing ${products.length === 0 ? 0 : start + 1}–${Math.min(end, products.length)} of ${products.length} results`}</p>
        <Dropdown basePath={basePath} />
      </div>
      {/* Product grid or message if no products found */}
      <div
        className={`${!products.message ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" : "text-bold mb-20 mt-10"} mt-10`}
      >
        {products.length === 0 ? (
          // Display message if no products match the filter
          <div className="col-span-3 bg-[#fef5e5] py-5 pl-8">
            <p>No products were found matching your selection.</p>
          </div>
        ) : (
          <>
            {/* Display paginated product list */}
            <ProductList products={entries} />
            {/* Pagination component */}
            <Pagination
              totalItems={products.length}
              itemsPerPage={perPage}
              basePath={basePath}
            />
          </>
        )}
      </div>
    </>
  );
}
