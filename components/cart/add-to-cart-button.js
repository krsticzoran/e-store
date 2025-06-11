"use client";
import { useState } from "react";
import Spinner from "../ui/spinner";
import { handleQuantityChange } from "@/utils/cart";
import CartModal from "./cart-modal";
import { useRouter, usePathname } from "next/navigation";
import { Suspense } from "react";
import { useContext } from "react";
import { CartContext } from "@/context/cart-context";

export default function AddToCartButton({ product, className, quantity = 1 }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const context = useContext(CartContext);

  const handleAddToCart = () => {
    setIsLoading(true);

    // Get current cart and update with new product
    const cart = context.cart || [];

    // Persist updated cart
    const updatedCart = handleQuantityChange(cart, product, quantity);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    context.setCart(updatedCart);

    // Simulate async operation and open modal
    setTimeout(() => {
      setIsLoading(false);
      // Open modal via URL param (non-refresh navigation)
      router.push(`${path}?modal=open`, { scroll: false });
    }, 500); // Artificial delay for better UX perception
  };

  return (
    <>
      {/* Cart Modal (controlled via URL query parameter) */}
      <Suspense fallback={null}>
        <CartModal />
      </Suspense>

      {/* Add To Cart Button */}
      <button
        onClick={handleAddToCart}
        className={className}
        disabled={isLoading}
        aria-label={`Add ${product.name} to cart`}
        aria-busy={isLoading}
      >
        {/* Button Content */}
        <p className="mr-3">add to cart</p>
        {/* Loading State Indicator */}
        <div className="w-6">
          {isLoading ? (
            <Spinner />
          ) : (
            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
          )}
        </div>
      </button>
    </>
  );
}
