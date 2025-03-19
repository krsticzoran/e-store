"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import ModalWrapper from "../modal/modal-wrapper";
import close from "@/public/icons/cart/close.svg";
import trash from "@/public/icons/cart/trash.svg";
import { getCartItems, calculateTotalNumberOfProduct } from "@/utils/cart";

export default function CartModal() {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("modal") === "open";
  const path = usePathname();
  const router = useRouter();
  const [cart, setCart] = useState();
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  useEffect(() => {
    const currentCart = getCartItems();
    setCart(currentCart);
  }, [isOpen]);

  useEffect(() => {
    const number = calculateTotalNumberOfProduct(cart);
    setNumberOfProducts(number);
  }, [cart]);

  const closeModal = () => {
    router.push(path, { scroll: false });
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);

    // Update localStorage and state
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <ModalWrapper
      className="fixed bottom-0 right-0 z-50 flex h-full w-full"
      isOpen={isOpen}
    >
      <div
        className="h-full w-full bg-black opacity-30"
        onClick={closeModal}
      ></div>
      <div className="z-50 h-full w-[500px] bg-white p-5 font-urbanist text-primary opacity-100">
        {/* close button */}
        <div className="flex justify-end">
          <button onClick={closeModal}>
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
        <ul>
          {cart?.map((product) => (
            <li key={product.id} className="flex pl-2">
              <Image
                src={product.images[0].src}
                alt={product.name}
                width={100}
                height={100}
              />

              <div className="flex w-full items-center">
                <div className="w-full">
                  <p className="mb-1 font-bold">{product.name}</p>
                  <div className="flex w-full justify-between">
                    <p className="text-sm">{`${product.amount} x $${product.price}`}</p>
                    <button onClick={handleRemoveItem.bind(null, product.id)}>
                      <Image src={trash} width={16} height={16} alt="trash" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ModalWrapper>
  );
}
