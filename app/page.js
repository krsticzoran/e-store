import Image from "next/image";
import { stripHtmlTags } from "@/utils/html-utils";
import getProduct from "@/lib/get-product";
import Link from "next/link";
import AddToCartButton from "@/components/add-to-cart-button";
import Hero from "@/components/layout/hero";
export default async function Home() {
  const products = await getProduct();

  if (products.message) {
    return <p>{products.message}</p>;
  }
  return (
    <>
      <Hero />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {products.map((product) => (
              <div className="border p-4 rounded-lg h-full" key={product.id}>
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
          </div>
        </main>
      </div>
    </>
  );
}
