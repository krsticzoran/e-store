import getSingleProduct from "@/services/get-single-product";
import Image from "next/image";
import { stripHtmlTags } from "@/utils/utils";
import AddToCartButton from "@/components/cart/add-to-cart-button";
import Breadcrumb from "@/components/product/breadcrumb";

export default async function ProdcutPage({ params }) {
  const product = await getSingleProduct(params.slug);

  return (
    <main className="relative pt-24 lg:pt-[140px]">
      <div className="bg-background-light pt-10">
        <div className="px-5 xl:mx-auto xl:w-[1280px] xl:px-0">
          <Breadcrumb product={product} />
          <div className="grid grid-cols-2 pt-6">
            <div>
              <div className="flex h-[400px] items-center justify-center bg-accent-second">
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-auto w-auto bg-secondary"
                />
              </div>
              <ul className="flex">
                {product.images.map((image, index) => (
                  <li key={index} className="relative h-[100px] w-[100px]">
                    <Image
                      src={image.src}
                      alt={image.name}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </li>
                ))}
              </ul>
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
