import getSingleProduct from "@/services/get-single-product";
import Image from "next/image";
import { stripHtmlTags } from "@/utils/utils";
import AddToCartButton from "@/components/cart/add-to-cart-button";

export default async function ProdcutPage({ params }) {
  const product = await getSingleProduct(params.slug);

  return (
    <main className="bg-background-light">
      <Image
        src={product.images[0].src}
        alt={product.name}
        width={300}
        height={300}
        className="rounded-lg"
      />

      <p>{product.price}</p>
      <h2>{product.name}</h2>
      <p>{stripHtmlTags(product.description)}</p>
      <AddToCartButton product={product} className="flex" />
    </main>
  );
}
