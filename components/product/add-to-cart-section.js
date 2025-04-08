"use client"

import QuantityControl from "@/components/ui/quantity-control";
import AddToCartButton from "../cart/add-to-cart-button";

export default function AddToCartSection({product}) {
    return <div className="flex">
    <QuantityControl quantity={1} onDecrement={() => {}} onIncrement={() => {}} />
  <AddToCartButton product={product}  />
     </div>
}