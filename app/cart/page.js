"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  calculateTotal,
  getCartItems,
  handleQuantityChange,
  handleRemoveItem,
} from "@/utils/cart";
import CartItem from "@/components/cart/cart-item";
import bg from "@/public/images/bg_shop.webp";
import ProceedToCheckoutButton from "@/components/ui/proceed-to-checkout-button";

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const pathname = usePathname();

  // ===== Cart Initialization =====
  // Load the cart data from localStorage
  useEffect(() => {
    const savedCart = getCartItems();
    setCart(savedCart);
    setTotal(calculateTotal(savedCart));
  }, []);

  // ===== Cart Operations =====
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
    <section className="relative pt-24 lg:pt-[140px]">
      {/* ===== Hero Banner Section ===== */}
      <div className="relative h-[150px] w-full lg:h-[250px]">
        {/* Background Image */}
        <Image src={bg} alt="backgroung" fill />
        {/* Page Title */}
        <h1 className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 font-youngSerif text-5xl leading-[61px] text-primary">
          Cart
        </h1>
      </div>
      {/* ===== Main Cart Content ===== */}
      <div className="bg-background-light px-5">
        <div className="mx-auto flex justify-center py-12 lg:py-20 xl:w-[1280px]">
          <div>
            {/* ===== Empty Cart State ===== */}
            {cart.length === 0 ? (
              <div className="flex h-[50vh] flex-col items-center justify-center">
                <i className="fa-solid fa-cart-shopping text-center text-3xl text-primary opacity-50 lg:text-5xl"></i>
                <p className="mb-10 pt-7 text-center font-urbanist text-xl font-bold uppercase text-primary lg:text-3xl">
                  Your cart is currently empty.
                </p>
                <Link
                  href="/shop"
                  className="inline-block w-[200px] bg-secondary px-12 py-3 text-center text-white duration-500 hover:bg-primary lg:w-[250px] lg:px-16 lg:py-4"
                >
                  Return to shop
                </Link>
              </div>
            ) : (
              <>
                {/* ===== Cart With Items ===== */}
                {/* Product List */}
                <ul>
                  {cart.map((product) => (
                    <li key={product.id} className="flex">
                      <CartItem
                        product={product}
                        callback={() => handleRemoveProduct(product.id)}
                        handleUpdateCart={handleUpdateCart}
                        pathname={pathname}
                      />
                    </li>
                  ))}
                </ul>
                {/* Cart Summary */}
                <p className="mb-5 text-end text-xl font-bold text-primary">
                  Total: ${total.toFixed(2)}
                </p>
                {/* Checkout Action */}
                <ProceedToCheckoutButton cart={cart} router={router}>
                  proceed To Checkout
                </ProceedToCheckoutButton>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
