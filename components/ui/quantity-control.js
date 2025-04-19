export default function QuantityControl({
  onDecrement,
  onIncrement,
  quantity,
  isCartPage = false,
}) {
  return (
    <div
      className={`flex ${isCartPage ? "w-[60px]" : "w-[90px]"} items-center justify-center border-[0.5px] border-primary px-2 py-1 text-lg text-primary lg:w-[120px] lg:text-xl`}
      role="group"
      aria-label="Product quantity controls"
    >
      {/* Decrement Button */}
      <button
        onClick={onDecrement}
        className="rounded-full px-1 text-xl duration-500 hover:bg-[#DEE5DC] lg:px-2 lg:text-2xl"
        aria-label="Decrease quantity"
      >
        -
      </button>
      {/* Current Quantity */}
      <span
        className={`${isCartPage ? "px-1 text-sm sm:text-base lg:text-xl" : "px-2"} font-bold lg:px-4`}
      >
        {quantity}
      </span>
      {/* Increment Button */}
      <button
        onClick={onIncrement}
        className="rounded-full px-1 text-xl duration-500 hover:bg-[#DEE5DC] lg:px-2 lg:text-2xl"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
