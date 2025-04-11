"use client";
import { useState } from "react";
import QuantityControl from "@/components/ui/quantity-control";
import AddToCartButton from "../cart/add-to-cart-button";

export default function AddToCartSection({ product }) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1)); // Ensures never goes below 1
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex">
      <QuantityControl
        quantity={quantity}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />
      <AddToCartButton
        product={product}
        quantity={quantity}
        className="ml-5 flex items-center bg-primary px-4 py-[10px] capitalize text-white hover:bg-secondary"
      />
    </div>
  );
}
