import { proceedToCheckout } from "@/utils/checkout";

export default function ProceedToCheckoutButton({ children, cart, router }) {
  return (
    <button
      onClick={proceedToCheckout.bind(null, cart, router)}
      className="mb-5 mt-4 h-[50px] w-full border border-primary bg-primary font-bold uppercase text-white duration-500 hover:bg-secondary"
    >
      {children}
    </button>
  );
}
