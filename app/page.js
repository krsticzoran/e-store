import Image from "next/image";
import { stripHtmlTags } from "@/utils/html-utils";
import getProduct from "@/lib/get-product";
import Link from "next/link";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import Hero from "@/components/layout/home/hero";
export default async function Home() {
  const products = await getProduct();

  if (products.message) {
    return <p>{products.message}</p>;
  }
  return (
    <>
      <Hero />
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          </div>
        </main>
      </div>
    </>
  );
}
