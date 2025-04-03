import Image from "next/image";
import QuantityControl from "../ui/quantity-control";

export default function CartItem({
  product,
  callback,
  pathname,
  handleUpdateCart,
}) {
  const isCartPage = pathname === "/cart";
  return (
    <>
      {/* Product Image Container - Responsive sizing based on page */}
      <div
        className={`relative ${isCartPage ? "mr-5 min-h-[150px] min-w-[150px] lg:h-[300px] lg:w-[300px]" : "h-[100px] w-[100px]"} `}
      >
        <Image
          src={product.images[0].src}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
        />
      </div>
      {/* Product Info Container */}
      <div
        className={`flex w-full ${isCartPage ? "lg:w-[350px]" : null} items-center text-primary`}
      >
        <div className="w-full">
          {/* Product Name */}
          <p className={`mb-1 font-bold ${isCartPage ? "lg:text-xl" : null}`}>
            {product.name}
          </p>
          {/* Quantity Controls and Price */}
          <div
            className={`flex w-full justify-between ${isCartPage ? "lg:text-xl" : null} `}
          >
            <div className="flex items-center">
              {/* Show +/- buttons only on Cart page */}
              {isCartPage && (
                <QuantityControl
                  onDecrement={() => handleUpdateCart(product, "decrement")}
                  onIncrement={() => handleUpdateCart(product, "increment")}
                  quantity={product.amount}
                />
              )}
              {/* Display quantity and price (format differs based on page) */}
              <p
                className={isCartPage ? "ml-4" : "text-sm"}
              >{`${!isCartPage ? product.amount : ""} x $${Number.parseFloat(product.price).toFixed(2)}`}</p>
            </div>
            {/* Remove Item Button */}
            <button
              onClick={callback}
              aria-label={`Remove ${product.name} from cart`}
            >
              <i className="fa fa-trash text-primary" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
