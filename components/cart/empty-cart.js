import Link from "next/link";

export default function EmptyCard() {
  return (
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
  );
}
