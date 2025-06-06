export function buildOrderData(input, lineItems, shippingLine) {
  return {
    payment_method: "cod",
    payment_method_title: "Cash on Delivery",
    set_paid: true,
    billing: input,
    shipping: {
      first_name: input.first_name,
      last_name: input.last_name,
      address_1: input.address_1,
      city: input.city,
      postcode: input.postcode,
      country: input.country,
    },
    line_items: lineItems,
    shipping_lines: [shippingLine],
  };
}
