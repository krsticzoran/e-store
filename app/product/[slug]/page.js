import { getProduct } from "@/services/fetch-product-data";
import { stripHtmlTags } from "@/utils/utils";
import Breadcrumb from "@/components/product/breadcrumb";
import ProductSlider from "@/components/product/product-slider";
import AddToCartSection from "@/components/product/add-to-cart-section";
import { notFound } from "next/navigation";
import TaxonomyList from "@/components/product/taxonomy-list";
import Container from "@/components/ui/container";

export default async function ProdcutPage({ params }) {
  // Fetch product data based on the slug parameter
  const product = await getProduct(params.slug);

  // If the product response contains a message (indicating error or not found), show 404 page
  if (product.message) {
    notFound();
  }

  // Determine if product is in stock based on stock_status
  const isInstock = product.stock_status === "instock";

  return (
    <Container>
      {/* Background gradient container */}
      <div className="bg-gradient-to-b from-background-light via-white to-white pb-24 pt-10">
        {/* Main content container with responsive padding */}
        <div className="px-5 xl:mx-auto xl:w-[1280px] xl:px-0">
          {/* Breadcrumb navigation showing product hierarchy */}
          <Breadcrumb product={product} />

          {/* Product details grid  */}
          <div className="grid grid-cols-1 pt-3 sm:pt-6 lg:grid-cols-2">
            {/* Left column - product images */}
            <div className="relative">
              <ProductSlider product={product} />
            </div>

            {/* Right column - product information */}
            <div className="pt-10 font-urbanist text-primary lg:ml-5 lg:pt-0">
              <h2 className="mb-2 mt-4 font-youngSerif text-3xl leading-10 sm:text-4xl">
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

              {/* If product is in stock add to cart */}
              {isInstock && <AddToCartSection product={product} />}

              {/* Taxonomy information (categories and tags) */}
              <div className="pt-6">
                <TaxonomyList label="Categories" items={product.categories} />
                <TaxonomyList label="Tag" items={product.tags} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
