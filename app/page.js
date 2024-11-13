import Image from "next/image";
import { stripHtmlTags } from "@/utils/html-utils";
import getProduct from "@/lib/get-product";
import Link from "next/link";

export default async function Home() {
  const products = await getProduct();

  if (products.message) {
    return <p>{products.message}</p>;
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-black">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div className="border p-4 rounded-lg h-full">
                {product.images.length > 0 && (
                  <Image
                    src={product.images[0].src}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                )}

                <p className="text-red-500">{product.price}</p>
                <h2 className="text-red-500">{product.name}</h2>
                <p className="text-red-500">
                  {stripHtmlTags(product.description)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
