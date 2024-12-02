import Image from "next/image";
import { stripHtmlTags } from "@/utils/html-utils";
import getProduct from "@/lib/get-product";
import Link from "next/link";
import AddToCartButton from "@/components/add-to-cart-button";
import teaKettle from "@/public/images/tea-kettle-1.webp";
import leaf from "@/public/images/leaf.webp";
import teaLeaves from "@/public/images/tea-leaves-png-transparent-png-1.webp";
import classes from "@/styles/pages/home.module.scss";

export default async function Home() {
  const products = await getProduct();

  if (products.message) {
    return <p>{products.message}</p>;
  }
  return (
    <>
      <section
        className={`${classes["hero-section"]} h-screen relative flex items-center justify-center`}
      >
        <div className="absolute top-0 left-0">
          <Image src={teaLeaves} priority alt="tea leaves" />
        </div>
        <div>
          <Image src={leaf} priority alt="tea laef" />
          <p>Hand made tea set</p>
          <h1>Organic Tea House</h1>
          <button>shop now</button>
        </div>
        <div className={`${classes["tea-kettle"]} absolute`}>
          <Image src={teaKettle} priority alt="tea kettle" />
        </div>

        <p></p>
      </section>
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
