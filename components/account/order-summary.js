import EmptyCard from "../cart/empty-cart";

export default function OrderSummary({ cart, total }) {
  const shippingCost = total > 0 ? 100 : 0;
  const finalTotal = (total + shippingCost).toFixed(2);

  return (
    <div className="mt-[88px] basis-1/3">
      <div className="h-full bg-[#F4F4F4] px-5 pt-4 text-primary">
        <p className="mb-5 text-center font-youngSerif text-lg leading-8 md:text-xl">
          Order summary
        </p>

        {/* List of products in cart */}
        <div className="border-b-[0.5px] border-primary">
          <ul>
            {cart.map((product) => (
              <li className="pt-2" key={product.id}>
                <div className="flex justify-between">
                  <div className="flex">
                    <p className="pr-4">{product.name} </p>
                  </div>
                  <p className="text-left">
                    {(product.amount * product.price).toFixed(2)} $
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {total > 0 && (
            <div className="flex justify-between pt-2">
              <p>Shipping</p> <p className="text-right">{shippingCost} $</p>
            </div>
          )}
        </div>
        {/* Total price */}
        {finalTotal > 0 && (
          <p className="py-6 font-bold uppercase tracking-[1px]">
            total : <span className="text-secondary">{finalTotal} $</span>
          </p>
        )}
        {cart.length === 0 && <EmptyCard />}
      </div>
    </div>
  );
}
