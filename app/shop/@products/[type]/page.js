import { getProducts } from "@/services/fetch-product-data";
import ProductGridPage from "@/components/shop/product-grid-page";

export default async function ProductListByType({ params, searchParams }) {
  // Fetch all products
  const products = await getProducts();
  const priceMin = searchParams?.pricemin;
  const priceMax = searchParams?.pricemax;

  // Filter products by matching either category or tag slug && price range
  const filtered = products
    .filter(
      // category filter condition
      (product) =>
        product.categories.some((category) => category.slug === params.type) ||
        product.tags.some((tag) => tag.slug === params.type),
    )
    // Price filter condition
    .filter(
      (product) =>
        isNaN(priceMin) ||
        isNaN(priceMax) ||
        (product.price >= priceMin && product.price <= priceMax),
    );

  // Render product list by tag or category
  return (
    <ProductGridPage
      products={filtered}
      searchParams={searchParams}
      basePath={`/shop/${params.type}/`}
    />
  );
}
