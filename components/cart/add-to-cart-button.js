"use client";
import { useState} from "react";
import { getCartItems } from "@/utils/cart";
import Spinner from "../ui/spinner";
import { handleQuantityChange } from "@/utils/cart";
import CartModal from "./cart-modal";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ product, className }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

 

  const handleAddToCart = () => {
    setIsLoading(true);
    const cart = getCartItems();
    const updatedCart = handleQuantityChange(cart, product);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTimeout(() => {
      setIsLoading(false);
      router.push("?modal=open", { scroll: false });
    }, 1000);
  };

  return (
    <>
   <CartModal />
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
    </>
  );
}
