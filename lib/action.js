"use server";

const formId = process.env.FORM_ID;
const url = process.env.WP_CONTACT_API_BASE_URL;

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

export async function sendingEmail(prevState, formData) {
  const collectedData = {
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const data = new FormData();

  data.append("your-em", collectedData.email);
  data.append("your-subject", collectedData.subject);
  data.append("your-message", collectedData.message);
  data.append("_wpcf7_unit_tag", formId);
  try {
    const res = await fetch(`${url}/${formId}/feedback`, {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      const data = await res.json();
      return { message: data.message, success: true }; // Return success flag with message
    } else {
      const errorData = await res.json();
      return {
        message: errorData.message || "An error occurred.",
        success: false,
      };
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      message: "Failed to submit form. Please try again later.",
      success: false,
    };
  }
}

export async function submitOrder(formData) {
  // Default cart setup
  const defaultCart = [
    {
      product_id: 69, // ID of the product
      quantity: 1, // Default quantity
    },
  ];

  // Collect data from FormData
  const orderData = {
    payment_method: "cod", // Set payment method to Cash on Delivery
    payment_method_title: "Cash on Delivery", // Title for the payment method
    set_paid: false, // Mark order as unpaid initially
    billing: {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      address_1: formData.get("address1"),
      address_2: formData.get("address2"),
      city: formData.get("city"),
      state: formData.get("state"),
      postcode: formData.get("postcode"),
      country: formData.get("country"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    },
    shipping: {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      address_1: formData.get("address1"),
      address_2: formData.get("address2"),
      city: formData.get("city"),
      state: formData.get("state"),
      postcode: formData.get("postcode"),
      country: formData.get("country"),
    },
    line_items: defaultCart, // Default cart data
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
    console.log("Order successfully created:", result);
    return result;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
}
