import { stripHtmlTags } from "@/utils/html-utils";
import Link from "next/link";
import AddToCartButton from "@/components/ui/add-to-cart-button";
import getProduct from "@/lib/get-products";
import Image from "next/image";

export default async function ProductList() {
  const products = await getProduct();

  if (products.message) {
    return <p>{products.message}</p>;
  }

  console.log(products);
  return (
    <>
      {products.map((product) => {
        const hasDiscount = product.regular_price !== product.price;
        const isOutOfStock = product.stock_status === "outofstock";
        return (
          <div className="relative h-full" key={product.id}>
            <Link href={`/product/${product.id}`}>
              <div>
                {product.images.length && (
                  <div className="intems-center flex justify-center bg-warm-beige">
                    <Image
                      src={product.images[0].src}
                      alt={product.name}
                      width={300}
                      height={300}
                    />
                  </div>
                )}
                {/* Badges (Sale & Sold) */}
                {isOutOfStock && (
                  <div
                    className={`absolute rounded-full bg-primary text-white ${hasDiscount ? "top-24" : "top-4"} right-4 flex h-16 w-16 items-center justify-center font-bold uppercase`}
                  >
                    <p>sold</p>
                  </div>
                )}
                {hasDiscount && (
                  <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FDA043] font-bold uppercase text-white">
                    <p>sale</p>
                  </div>
                )}

                {/* Category */}

                {product.categories?.length > 0 && (
                  <p>{product.categories[0].name}</p>
                )}

                {/* Product Info */}
                <p>{product.price}</p>
                <p>{product.regular_price}</p>
                <h2>{product.name}</h2>
                <p>{stripHtmlTags(product.description)}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
