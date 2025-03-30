import Image from "next/image";

export default function CartItem({
  product,
  callback,
  pathname,
  handleUpdateCart,
}) {
  const isCartPage = pathname === "/cart";
  return (
    <>
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
      <div
        className={`flex w-full ${isCartPage ? "lg:w-[350px]" : null} items-center`}
      >
        <div className="w-full">
          <p className={`mb-1 font-bold ${isCartPage ? "lg:text-xl" : null}`}>
            {product.name}
          </p>
          <div
            className={`flex w-full justify-between ${isCartPage ? "lg:text-xl" : null} `}
          >
            {isCartPage ? (
              <div className="flex">
                <button onClick={() => handleUpdateCart(product, "decrement")}>
                  -
                </button>
                <span>{product.amount}</span>
                <button onClick={() => handleUpdateCart(product, "increment")}>
                  +
                </button>
                <p className="ml-2">{`x $${Number.parseFloat(product.price).toFixed(2)}`}</p>
              </div>
            ) : (
              <p className="text-sm">{`${product.amount} x $${Number.parseFloat(product.price).toFixed(2)}`}</p>
            )}

            <button onClick={callback} aria-label={`Remove ${product.name} from cart`}>
              <i className="fa fa-trash text-primary" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
