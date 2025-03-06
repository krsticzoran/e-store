import ProductList from "@/components/product/product-list";
import Hero from "@/components/home/hero";
import Experience from "@/components/home/experience";
import getProduct from "@/lib/get-products";
export default async function Home() {
  const allProducts = await getProduct();
  const products = allProducts.slice(0, 4);
  return (
    <>
      <Hero />
      <Experience />
      {/*Featured Items */}
      <div className="mx-auto pb-20 xl:max-w-[1280px]">
        <h4 className="text-bold mb-6 font-youngSerif text-2xl text-primary">
          Featured Items
        </h4>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <ProductList products={products} />
        </div>
      </div>
    </>
  );
}
