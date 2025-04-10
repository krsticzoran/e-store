"use client";
import { useState } from "react";
import QuantityControl from "@/components/ui/quantity-control";
import AddToCartButton from "../cart/add-to-cart-button";

export default function AddToCartSection({ product }) {
  const [quantity, setQuantity] = useState(1); // Fixed typo in setQuantaty -> setQuantity

  // More robust handlers
  const handleDecrement = () => {
    setQuantity(prev => Math.max(1, prev - 1)); // Ensures never goes below 1
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1); // Functional update
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
        quantity={quantity} // Pass quantity to cart button
        className="flex items-center capitalize text-white px-4 py-[10px] bg-primary hover:bg-secondary ml-5" 
      />
    </div>
  );
}