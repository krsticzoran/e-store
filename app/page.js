import { getProducts } from "@/services/fetch-product-data";
import Hero from "@/components/home/hero";
import Experience from "@/components/home/experience";
import ProductList from "@/components/product/product-list";

export default async function Home() {
  // Fetch products data from WooCommerce API
  const products = await getProducts();

  return (
    <>
      {/* Main hero section */}
      <Hero />
      {/* Brand experience/features section */}
      <Experience />
      {/*Featured Items */}
      <div className="mx-auto px-5 pb-20 xl:max-w-[1280px] xl:px-0">
        {/* Section title */}
        <h4 className="text-bold mb-6 font-youngSerif text-2xl text-primary">
          Featured Items
        </h4>
        {/* 
          Products container with conditional classes:
          - Shows grid layout when products exist
          - Shows simple container when error occurs 
        */}
        <div
          className={`${!products.message ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" : "text-bold mb-20 mt-10"} `}
        >
          {/*
            ProductList component handles:
            - Rendering product cards when products array exists
            - Displaying error message when products.message exists
          */}
          <ProductList products={products.slice(0,8)} />
        </div>
      </div>
    </>
  );
}
