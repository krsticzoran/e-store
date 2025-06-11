"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import ModalWrapper from "../ui/modal-wrapper";
import CartItem from "./cart-item";
import {
  calculateTotalNumberOfProduct,
  handleRemoveItem,
  calculateTotal,
} from "@/utils/cart";
import ProceedToCheckoutButton from "../ui/proceed-to-checkout-button";
import useEscapeKey from "@/hooks/useEscapeKey";
import { useContext } from "react";
import { CartContext } from "@/context/cart-context";

export default function CartModal() {
  // Router and state management
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === "open";
  const path = usePathname();
  const router = useRouter();
  const context = useContext(CartContext);

  // Cart state
  const [cart, setCart] = useState();
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [total, setTotal] = useState(0);

  // Fetch cart items when modal opens/closes
  useEffect(() => {
    const currentCart = context.cart;
    setCart(currentCart);
  }, [isOpen, context.cart]);

  // Calculate cart totals when cart updates
  useEffect(() => {
    const number = calculateTotalNumberOfProduct(cart);
    setNumberOfProducts(number);
    const totalAmount = calculateTotal(cart);
    setTotal(totalAmount);
  }, [cart]);

  // Close modal handler (resets URL without scroll)
  const closeModal = () => {
    router.push(path, { scroll: false });
  };

  // Use the hook to close modal on Escape key
  useEscapeKey(() => router.push(path, { scroll: false }));

  return (
    <ModalWrapper
      className="fixed bottom-0 right-0 z-50 flex h-full w-full"
      isOpen={isOpen}
    >
      <div
        className="h-full flex-grow bg-black opacity-30"
        onClick={closeModal}
      ></div>
      <div className="z-50 flex h-full w-full flex-col bg-white p-5 font-urbanist text-primary opacity-100 sm:w-[500px]">
        {/* close button */}
        <div className="flex justify-end">
          <button onClick={closeModal} aria-label="Close modal">
            <i
              className="fa-solid fa-xmark text-xl text-primary opacity-75"
              aria-hidden="true"
            ></i>
          </button>
        </div>
        {/* title section */}
        <p className="mt-2 font-bold uppercase">
          your cart (<span>{numberOfProducts}</span>)
        </p>
        <p className="border-b-[0.5px] pb-4">
          Free shipping on all orders over $200.00
        </p>
        {/* products in the cart */}
        <ul className="flex-grow overflow-auto">
          {cart?.map((product) => (
            <li key={product.id} className="flex pl-2">
              <CartItem
                product={product}
                callback={handleRemoveItem.bind(
                  null,
                  cart,
                  product.id,
                  setCart,
                )}
                pathname={path}
              />
            </li>
          ))}
        </ul>
        <div className="border-t-[0.5px] pt-4">
          {/* subtotal */}
          <div className="flex justify-between text-sm font-bold">
            <p className="uppercase">subtotal</p>
            <p>{`$${Number.parseFloat(total).toFixed(2)}`}</p>
          </div>
          {/* checkout */}
          <ProceedToCheckoutButton cart={cart} router={router}>
            checkout
          </ProceedToCheckoutButton>
          {/* view cart */}
          <div className="mb-5 flex justify-center underline decoration-[0.5px] underline-offset-4">
            <Link href="/cart" aria-label="View your shopping cart">
              View cart
            </Link>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
