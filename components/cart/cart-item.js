import Image from "next/image";
import trash from "@/public/icons/cart/trash.svg";

export default function CartItem({ product, callback }) {
  return(
  <>
    <div className="relative h-[100px] w-[100px]">
      <Image
        src={product.images[0].src}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 25vw, (max-width: 1200px) 25vw, 25vw"
      />
    </div>
    <div className="flex w-full items-center">
      <div className="w-full">
        <p className="mb-1 font-bold">{product.name}</p>
        <div className="flex w-full justify-between">
          <p className="text-sm">{`${product.amount} x $${Number.parseFloat(product.price).toFixed(2)}`}</p>
          <button
            onClick={callback}
            aria-label="Remove item from cart"
          >
            <Image src={trash} width={16} height={16} alt="trash icon" />
          </button>
        </div>
      </div>
    </div>
  </>
  )
}
