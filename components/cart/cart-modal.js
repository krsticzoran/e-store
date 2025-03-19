import { useRouter, usePathname } from "next/navigation";
import ModalWrapper from "../modal/modal-wrapper";
import { getCartItems, calculateTotalNumberOfProduct } from "@/utils/cart";

export default function CartModal() {
  const path = usePathname();
  const router = useRouter();
  const cart = getCartItems();
  const numberOfProducts = calculateTotalNumberOfProduct(cart);

  const closeModal = () => {
    router.push(path, { scroll: false });
  };

  return (
    <ModalWrapper className="fixed bottom-0 right-0 z-50 flex h-full w-full">
      <div
        className="h-full w-full bg-black opacity-30"
        onClick={closeModal}
      ></div>
      <div className="z-50 h-full w-[500px] bg-white p-5 font-urbanist text-primary opacity-100">
        {/* close button */}
        <div className="flex justify-end">
          <button onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-primary"
              aria-label="Cancel"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
      </div>
    </ModalWrapper>
  );
}
