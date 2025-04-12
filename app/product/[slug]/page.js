import { getProduct } from "@/services/fetch-product-data";
import { stripHtmlTags } from "@/utils/utils";
import Breadcrumb from "@/components/product/breadcrumb";
import ProductSlider from "@/components/product/product-slider";
import AddToCartSection from "@/components/product/add-to-cart-section";
import { notFound } from "next/navigation";
import TaxonomyList from "@/components/product/taxonomy-list";

export default async function ProdcutPage({ params }) {
  const product = await getProduct(params.slug);

  if (product.message) {
    notFound();
  }

  const isInstock = product.stock_status === "instock";

  return (
    <main className="relative pt-24 lg:pt-36 2xl:pt-44">
      <div className="bg-gradient-to-b from-background-light via-white to-white pb-24 pt-10">
        <div className="px-5 xl:mx-auto xl:w-[1280px] xl:px-0">
          <Breadcrumb product={product} />
          <div className="grid grid-cols-2 pt-6">
            <div className="relative">
              <ProductSlider product={product} />
            </div>
            <div className="ml-5 font-urbanist text-primary">
              <h2 className="mb-2 mt-4 font-youngSerif text-4xl leading-10">
                {product.name}
              </h2>
              <p className="pb-5 pt-2 text-2xl">{`$${Number(product.price).toFixed(2)}`}</p>
              <span
                className={`${isInstock ? "bg-[#71B154]" : "bg-primary"} mb-6 inline-block rounded px-[10px] text-white`}
              >
                {isInstock ? "Instock" : "Out of Stock"}
              </span>

              <div className="mb-7 border-y border-[#E8E8EB] pb-5 pt-6">
                <p className="mb-[6px]">Steeping Time: 2-3 min </p>
                <p className="mb-[6px]">Temperature: 190°F / 87°C</p>
                <p>{stripHtmlTags(product.description)}</p>
              </div>

              <AddToCartSection product={product} />
              <div className="pt-6">
                <TaxonomyList label="Categories" items={product.categories} />
                <TaxonomyList label="Tag" items={product.tags} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
