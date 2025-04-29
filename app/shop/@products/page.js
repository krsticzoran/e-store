import { getProducts } from "@/services/fetch-product-data";
import ProductGridPage from "@/components/shop/product-grid-page";

export default async function Products({ searchParams }) {
  // get all products
  const products = await getProducts();
  const searchTerm = searchParams?.search?.toLowerCase().trim() || "";

  // Filter products (if search term exists)
  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm),
      )
    : products;

  // render list of product, dropdown for sorting & pagination
  return (
    <ProductGridPage
      products={filteredProducts}
      searchParams={searchParams}
      basePath="/shop/"
    />
  );
}
