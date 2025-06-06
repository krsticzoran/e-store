export function calculateShipping(cart) {
  const total = cart.reduce((amount, product) => {
    return amount + product.price * product.amount;
  }, 0);

  if (total > 1000) {
    return {
      method_id: "free_shipping",
      method_title: "Free Shipping",
      total: "0",
    };
  }

  return {
    method_id: "flat_rate",
    method_title: "Flat Rate Shipping",
    total: "100",
  };
}
