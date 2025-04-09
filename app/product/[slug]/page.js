
import getSingleProduct from "@/services/get-single-product";
import { stripHtmlTags } from "@/utils/utils";
import Breadcrumb from "@/components/product/breadcrumb";
import ProductSlider from "@/components/product/product-slider";
import AddToCartSection from "@/components/product/add-to-cart-section";
import { notFound } from "next/navigation";



export default async function ProdcutPage({ params }) {
  const product = await getSingleProduct(params.slug);

  if(!product){
    notFound();
  }

const isInstock = product.stock_status === "instock"


  return (
    <main className="relative pt-24 lg:pt-[140px]">
      <div className="bg-gradient-to-b from-background-light via-white to-white pb-24 pt-10">
        <div className="px-5 xl:mx-auto xl:w-[1280px] xl:px-0">
          <Breadcrumb product={product} />
          <div className="grid grid-cols-2 pt-6">
            <div className="relative">
              <ProductSlider product={product} />
            </div>
            <div className="ml-5 font-urbanist text-primary">
            <h2 className="mt-4 mb-2 text-4xl leading-10 font-youngSerif">{product.name}</h2>
              <p className="text-2xl pt-2 pb-5">{`$${Number(product.price).toFixed(2)}`}</p>
              <span className={`${isInstock ? "bg-[#71B154]" : "bg-primary" }  text-white px-[10px] rounded inline-block mb-6`}>{isInstock ? "Instock" : "Out of Stock"}</span>

              <div className="border-y border-[#E8E8EB] pt-6 pb-5 mb-7">
                <p className="mb-[6px]">Steeping Time: 2-3 min </p>
                <p className="mb-[6px]">Temperature: 190°F / 87°C</p>
              <p>{stripHtmlTags(product.description)}</p>
              </div>
              
             <AddToCartSection  product={product}/>
              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
