import { getProducts } from "@/services/fetch-product-data";
import ProductList from "@/components/product/product-list";

export default async function ProductListByType({ params }) {
  const products = await getProducts();
  const filtered = products.filter(
    (product) =>
      product.categories.some((category) => category.slug === params.type) ||
      product.tags.some((tag) => tag.slug === params.type),
  );

  return (
    <div
      className={`${!products.message ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" : "text-bold mb-20 mt-10"} `}
    >
      <ProductList products={filtered} />
    </div>
  );
}
