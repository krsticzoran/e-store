import { getProducts } from "@/services/fetch-product-data";
import ProductGridPage from "@/components/shop/product-grid-page";

export default async function Products({ searchParams }) {
  // get all products
  const products = await getProducts();
  const searchTerm = searchParams?.search?.toLowerCase().trim() || "";
  const priceMin = searchParams?.pricemin;
  const priceMax = searchParams?.pricemax;

  // filter products by search term && price
  const filteredProducts = products
    // Price filter condition
    .filter(
      (product) =>
        isNaN(priceMin) ||
        isNaN(priceMax) ||
        (product.price >= priceMin && product.price <= priceMax),
    )
    // Search term filter condition
    .filter(
      (product) =>
        !searchTerm || product.name.toLowerCase().includes(searchTerm),
    );

  // render list of product, dropdown for sorting & pagination
  return (
    <ProductGridPage
      products={filteredProducts}
      searchParams={searchParams}
      basePath="/shop/"
    />
  );
}
