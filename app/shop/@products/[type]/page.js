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
      className={`${!products.message ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" : "text-bold mb-20 mt-10"} mt-10`}
    >
      {filtered.length === 0 ? (
        <div className="col-span-3 bg-[#fef5e5] py-5 pl-8">
          <p>No products were found matching your selection.</p>
        </div>
      ) : (
        <ProductList products={filtered} />
      )}
    </div>
  );
}
