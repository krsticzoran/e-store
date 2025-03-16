"use client";
import { useState } from "react";
import { getCartItems } from "@/utils/cart";
import Spinner from "../ui/spinner";

export default function AddToCartButton({ product, className }) {
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle cart logic separately
  const updateCart = () => {
    const cart = getCartItems();

    let productExists = false;

    const updatedCart = cart.map((cartProduct) => {
      if (cartProduct.id === product.id) {
        productExists = true;
        return {
          ...cartProduct,
          amount: cartProduct.amount + 1,
        };
      }
      return cartProduct;
    });

    if (!productExists) {
      updatedCart.push({ ...product, amount: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToCart = () => {
    setIsLoading(true);
    updateCart();
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={className}
      disabled={isLoading}
    >
      <p className="mr-3">add to cart</p>
      <div className="w-6">
        {isLoading ? (
          <Spinner />
        ) : (
          <i className="fa fa-shopping-bag" aria-hidden="true"></i>
        )}
      </div>
    </button>
  );
}
