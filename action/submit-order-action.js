"use server";

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

import { buildOrderData } from "@/utils/order/build-order.data";
import { calculateShipping } from "@/utils/order/calculate-shipping";
import { validateFormInput } from "@/utils/order/validate-form-input";

export async function submitOrder(cart, prevState, formData) {
  // Block submission if the cart is empty
  if (cart.length === 0) {
    return {
      success: false,
      message:
        "Your cart is empty. Please add some products before placing an order.",
    };
  }

  // Format cart items into WooCommerce-compatible line items
  const orderItems = cart.map((product) => ({
    product_id: product.id,
    quantity: product.amount,
  }));

  // Determine shipping method and cost based on cart total
  const shippingLine = calculateShipping(cart);

  // Validate and extract user-provided form input
  const validated = validateFormInput(formData);
  if (!validated || validated.success === false) return validated;

  // Build full WooCommerce order payload
  const orderData = buildOrderData(validated, orderItems, shippingLine);

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

    // Handle unsuccessful responses
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();

    // Return success message
    return {
      success: true,
      message: "Order placed successfully! Thank you for shopping with us.",
    };
  } catch (error) {
    // Log the error for debugging and return a user-friendly message
    console.error("Order submission error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
}
