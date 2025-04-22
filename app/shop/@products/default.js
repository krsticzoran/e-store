import { getProducts } from "@/services/fetch-product-data";
import ProductList from "@/components/product/product-list";
import Pagination from "@/components/ui/pagination";

export default async function Products({ searchParams }) {
  const products = await getProducts();

  const page = Number(searchParams.page) || 1;
  const perPage = 2;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const entries = products.slice(start, end);

  return (
    <>
      <div className="mt-10 flex items-center justify-between text-primary">
        <p className="text-sm leading-4">{`Showing ${start + 1}–${end} of ${products.length} results`}</p>
      </div>
      <div
        className={`${!products.message ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" : "text-bold mb-20 mt-10"} mt-10`}
      >
        <ProductList products={entries} />
        <Pagination totalItems={products.length} itemsPerPage={perPage} />
      </div>
    </>
  );
}
