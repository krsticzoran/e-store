"use server";

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

export async function submitOrder(cart, prevState, formData) {
  if (cart.length === 0) {
    return {
      success: false,
      message:
        "Your cart is empty. Please add some products before placing an order.",
    };
  }
  const orderItems = cart.map((product) => ({
    product_id: product.id,
    quantity: product.amount,
  }));
  const total = cart.reduce((amount, product) => {
    return amount + product.price * product.amount;
  }, 0);

  // Collect data from FormData
  const orderData = {
    payment_method: "cod", // Set payment method to Cash on Delivery
    payment_method_title: "Cash on Delivery",
    set_paid: true,
    billing: {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      address_1: formData.get("address1"),
      city: formData.get("city"),
      postcode: formData.get("postcode"),
      country: formData.get("country"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    },
    shipping: {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      address_1: formData.get("address1"),
      city: formData.get("city"),
      postcode: formData.get("postcode"),
      country: formData.get("country"),
    },
    line_items: orderItems,
    shipping_lines: [
      {
        method_id: total > 1000 ? "free_shipping" : "flat_rate",
        method_title: total > 1000 ? "Free Shipping" : "Flat Rate Shipping",
        total: total > 1000 ? "0" : "100",
      },
    ],
  };

  // WooCommerce API endpoint
  const apiUrl = "https://estore.zkrstic.com/wp-json/wc/v3/orders";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();

    return {
      success: true,
      message: "Order placed successfully! Thank you for shopping with us.",
    };
  } catch (error) {
    return { success: false, message: "An error occurred during ordering" };
  }
}
