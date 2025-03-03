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

console.log(products[0].categories)
return (
    <>
    {products.map((product) => (
        <div className="h-full rounded-lg border p-4" key={product.id}>
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

{product.categories?.length > 0 && <p>{product.categories[0].name}</p>}
            
            

              <p>{product.price}</p>
              <h2>{product.name}</h2>
              <p>{stripHtmlTags(product.description)}</p>
            </div>
          </Link>
        </div>
      ))}
      </>
)

}