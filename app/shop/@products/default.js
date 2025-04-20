import { getProducts } from "@/services/fetch-product-data";
import ProductList from "@/components/product/product-list";

export default async function Products() {
  const products = await getProducts();

  return (
    <div
      className={`${!products.message ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" : "text-bold mb-20 mt-10"} `}
    >
      <ProductList products={products} />
    </div>
  );
}
