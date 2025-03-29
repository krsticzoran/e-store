"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  calculateTotal,
  getCartItems,
  handleQuantityChange,
  handleRemoveItem,
} from "@/utils/cart";
import { proceedToCheckout } from "@/utils/checkout";
import CartItem from "@/components/cart/cart-item";
import bg from "@/public/images/bg_shop.webp";

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const pathname = usePathname();

  // Load the cart data from localStorage
  useEffect(() => {
    const savedCart = getCartItems();
    setCart(savedCart);
    setTotal(calculateTotal(savedCart));
  }, []);

  // Handle quantity change (increment/decrement)
  const handleUpdateCart = (product, action) => {
    const updatedCart = handleQuantityChange(cart, product, action);

    // remove product if amount is 0
    const filteredCart = updatedCart.filter((product) => product.amount !== 0);

    // Update localStorage and state
    setCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
    setTotal(calculateTotal(filteredCart)); // Recalculate total
  };

  // Handle removing item from cart
  const handleRemoveProduct = (id) => {
    const updatedCart = handleRemoveItem(cart, id, setCart);
    setTotal(calculateTotal(updatedCart)); // Recalculate total
  };

  return (
    <section className="relative pt-[140px]">
      <div className="relative h-[250px] w-full">
        <Image src={bg} alt="backgroung" fill />
        <h1 className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 font-youngSerif text-5xl leading-[61px] text-primary">
          Cart
        </h1>
      </div>
      <div className="bg-[#F0F0F0]">
        <div className="mx-auto flex justify-center py-20 xl:w-[1280px]">
          <div>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((product) => (
                  <li key={product.id} className="flex pl-5">
                    <CartItem
                      product={product}
                      callback={() => handleRemoveProduct(product.id)}
                      handleUpdateCart={handleUpdateCart}
                      pathname={pathname}
                    />
                  </li>
                ))}
              </ul>
            )}
            <p className="text-center">Total: ${total}</p>
            <button onClick={proceedToCheckout.bind(null, cart, router)}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
