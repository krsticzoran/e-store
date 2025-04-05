import getSingleProduct from "@/services/get-single-product";
import { stripHtmlTags } from "@/utils/utils";
import AddToCartButton from "@/components/cart/add-to-cart-button";
import Breadcrumb from "@/components/product/breadcrumb";
import ProductSlider from "@/components/product/product-slider";

export default async function ProdcutPage({ params }) {
  const product = await getSingleProduct(params.slug);

  return (
    <main className="relative pt-24 lg:pt-[140px]">
      <div className="bg-background-light pb-24 pt-10">
        <div className="px-5 xl:mx-auto xl:w-[1280px] xl:px-0">
          <Breadcrumb product={product} />
          <div className="grid grid-cols-2 pt-6">
            <div className="relative">
              <ProductSlider product={product} />
            </div>
            <div>
              <p>{product.price}</p>
              <h2>{product.name}</h2>
              <p>{stripHtmlTags(product.description)}</p>
              <AddToCartButton product={product} className="flex" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
