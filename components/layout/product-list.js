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


return (
    <>
    {products.map((product) => (
        <div className="h-full rounded-lg border p-4" key={product.id}>
          <Link href={`/product/${product.id}`}>
            <div>
              {product.images.length > 0 && (
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              )}

              <p>{product.price}</p>
              <h2>{product.name}</h2>
              <p>{stripHtmlTags(product.description)}</p>
            </div>
          </Link>
          <AddToCartButton product={product} className="text-red-500">
            Add to Cart
          </AddToCartButton>
        </div>
      ))}
      </>
)

}