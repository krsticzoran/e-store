"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import ModalWrapper from "../ui/modal-wrapper";
import close from "@/public/icons/cart/close.svg";
import trash from "@/public/icons/cart/trash.svg";
import {
  getCartItems,
  calculateTotalNumberOfProduct,
  handleRemoveItem,
  calculateTotal,
} from "@/utils/cart";
import { proceedToCheckout } from "@/utils/checkout";
import Link from "next/link";

export default function CartModal() {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === "open";
  const path = usePathname();
  const router = useRouter();
  const [cart, setCart] = useState();
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const currentCart = getCartItems();
    setCart(currentCart);
  }, [isOpen]);

  useEffect(() => {
    const number = calculateTotalNumberOfProduct(cart);
    setNumberOfProducts(number);
    const totalAmount = calculateTotal(cart);
    setTotal(totalAmount);
  }, [cart]);

  const closeModal = () => {
    router.push(path, { scroll: false });
  };

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
            <Image src={close} width={24} height={24} alt="close" />
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
              <div className="relative h-[100px] w-[100px]">
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 25vw, (max-width: 1200px) 25vw, 25vw"
                />
              </div>
              <div className="flex w-full items-center">
                <div className="w-full">
                  <p className="mb-1 font-bold">{product.name}</p>
                  <div className="flex w-full justify-between">
                    <p className="text-sm">{`${product.amount} x $${Number.parseFloat(product.price).toFixed(2)}`}</p>
                    <button
                      onClick={handleRemoveItem.bind(
                        null,
                        cart,
                        product.id,
                        setCart,
                      )}
                      aria-label="Remove item from cart"
                    >
                      <Image
                        src={trash}
                        width={16}
                        height={16}
                        alt="trash icon"
                      />
                    </button>
                  </div>
                </div>
              </div>
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
          <button
            onClick={proceedToCheckout.bind(null, cart, router)}
            className="mb-5 mt-4 h-[50px] w-full border border-primary bg-primary font-bold uppercase text-white duration-500 hover:bg-secondary"
          >
            checkout
          </button>
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
