import { getProducts } from "@/services/fetch-product-data";
import ProductGridPage from "@/components/shop/product-grid-page";

export default async function Products({ searchParams }) {
  // get all products
  const products = await getProducts();

  // render list of product, dropdown for sorting & pagination
  return (
    <ProductGridPage
      products={products}
      searchParams={searchParams}
      basePath="/shop/"
    />
  );
}
