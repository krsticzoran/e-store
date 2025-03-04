import { stripHtmlTags } from "@/utils/html-utils";
import Link from "next/link";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import getProduct from "@/lib/get-products";
import Image from "next/image";


export default async function ProductList(){

   const products = await getProduct();
 
   if (products.message) {
     return <p>{products.message}</p>;
   }   

console.log(products)
return (
    <>
    {products.map((product) => {
        const hasDiscount = product.regular_price !== product.price;
        const isOutOfStock = product.stock_status === "outofstock";
        return (
        <div className="h-full  relative" key={product.id}>
          <Link href={`/product/${product.id}`}>
            <div>
              {product.images.length && (
                <div className="bg-warm-beige flex justify-center intems-center">
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  width={300}
                  height={300}
                 
                />
                </div>
              )}
              {/* Badges (Sale & Sold) */}
              {isOutOfStock &&  <div className={`bg-primary text-white rounded-full absolute ${hasDiscount ? "top-24" : "top-4"} right-4 w-16 h-16 uppercase flex justify-center items-center font-bold`}><p>sold</p></div>}
              {hasDiscount && <div className="bg-[#FDA043] text-white rounded-full absolute top-4 right-4 w-16 h-16 uppercase flex justify-center items-center font-bold"><p>sale</p></div>}
            



{/* Category */}

{product.categories?.length > 0 && <p>{product.categories[0].name}</p>}
            
               {/* Product Info */}
              <p>{product.price}</p>
              <p>{product.regular_price}</p>
              <h2>{product.name}</h2>
              <p>{stripHtmlTags(product.description)}</p>
            </div>
          </Link>
        </div>
        )
    })}
      </>
)

}