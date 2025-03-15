import Link from "next/link";
import Image from "next/image";

export default async function ProductList({ products }) {
  if (products.message) {
    return (
      <p>
        {`Oops! We couldn't load the products right now. Please check back soon`}
      </p>
    );
  }

  return (
    <>
      {products.map((product) => {
        const hasDiscount = product.regular_price !== product.price;
        const isOutOfStock = product.stock_status === "outofstock";
        return (
          <div className="relative h-full" key={product.id}>
            <div>
              {/* Product Image */}
              <Link href={`/product/${product.id}`}>
                {product.images.length && (
                  <div className="intems-center relative flex h-[400px] justify-center bg-warm-beige">
                    <Image
                      src={product.images[0].src}
                      alt={product.name}
                      fill
                    />
                  </div>
                )}
                {/* Badges (Sale & Sold) */}
                {isOutOfStock && (
                  <div
                    className={`absolute rounded-full bg-primary text-white ${hasDiscount ? "top-24" : "top-4"} right-4 flex h-16 w-16 items-center justify-center font-bold uppercase`}
                  >
                    <p>sold</p>
                  </div>
                )}
                {hasDiscount && (
                  <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FDA043] font-bold uppercase text-white">
                    <p>
                      -
                      {Math.floor(
                        (1 - product.price / product.regular_price) * 100,
                      )}
                      %
                    </p>
                  </div>
                )}
              </Link>
              {/* Product Name */}
              <h5 className="mb-1 mt-6 text-lg font-bold leading-6 text-primary">
                {product.name}
              </h5>

              {/* Product Info */}
              <div className="flex justify-between">
                <div className="flex">
                  {hasDiscount && (
                    <p className="mr-2 text-primary text-opacity-40 line-through">
                      ${product.regular_price}
                    </p>
                  )}
                  <p className="text-primary text-opacity-80">
                    ${product.price}
                  </p>
                </div>
                <Link
                  href="/cart"
                  aria-label="View Cart"
                  className="flex items-center capitalize text-primary text-opacity-90 hover:text-secondary"
                >
                  <p className="mr-3">add to cart</p>
                  <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
