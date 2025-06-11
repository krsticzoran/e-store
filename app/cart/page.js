"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  calculateTotal,
  handleQuantityChange,
  handleRemoveItem,
} from "@/utils/cart";
import CartItem from "@/components/cart/cart-item";
import Banner from "@/components/ui/banner";
import ProceedToCheckoutButton from "@/components/ui/proceed-to-checkout-button";
import Container from "@/components/ui/container";
import EmptyCard from "@/components/cart/empty-cart";
import { useContext } from "react";
import { CartContext } from "@/context/cart-context";

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const pathname = usePathname();
  const context = useContext(CartContext);

  // ===== Cart Initialization =====
  // Load the cart data from localStorage
  useEffect(() => {
    const savedCart = context.cart || [];
    setCart(savedCart);
    setTotal(calculateTotal(savedCart));
  }, [context.cart]);

  // ===== Cart Operations =====
  // Handle quantity change (increment/decrement)
  const handleUpdateCart = (product, action) => {
    const updatedCart = handleQuantityChange(cart, product, 1, action);

    // remove product if amount is 0
    const filteredCart = updatedCart.filter((product) => product.amount !== 0);

    // Update localStorage and state
    setCart(filteredCart);
    context.setCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
    setTotal(calculateTotal(filteredCart)); // Recalculate total
  };

  // Handle removing item from cart
  const handleRemoveProduct = (id) => {
    const updatedCart = handleRemoveItem(cart, id, setCart);
    setCart(updatedCart);
    context.setCart(updatedCart);
    setTotal(calculateTotal(updatedCart)); // Recalculate total
  };

  return (
    <Container>
      {/* ===== Hero Banner Section ===== */}
      <Banner title="cart" />
      {/* ===== Main Cart Content ===== */}
      <div className="bg-background-light px-5">
        <div className="mx-auto flex justify-center py-12 lg:py-20 xl:w-[1280px]">
          <div>
            {/* ===== Empty Cart State ===== */}
            {cart.length === 0 ? (
              <EmptyCard />
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
    </Container>
  );
}
