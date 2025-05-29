"use server";
import getToken from "@/utils/auth/get-token";
import { redirect } from "next/navigation";
const url = process.env.NEXT_PUBLIC_API_URL;
import { isTokenValid } from "@/utils/auth/validate-token";
import { userSchema } from "@/schemas/user-profile";

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

export async function updateUserAction(id, prevState, formData) {
  // Retrieve authentication token from cookies
  const token = getToken();
  const isValid = await isTokenValid(token);

  // If token is missing, redirect user to the homepage - add logged out
  if (!token || !isValid) {
    redirect("/");
  }
  const formValues = Object.fromEntries(formData.entries());

  // Validate input using userSchema
  try {
    userSchema.parse(formValues);
  } catch (error) {
    return { success: false, message: "Enter full name (min. 3 characters)" };
  }

  const { first_name, last_name, city, country, phone, address } = formValues;

  try {
    // Send PUT request to update the authenticated user's data via WooCommerce REST API
    const response = await fetch(`${url}/wp-json/wc/v3/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
      },
      body: JSON.stringify({
        first_name,
        last_name,
        billing: {
          address_1: address,
          city,
          country,
          phone,
        },
      }),
    });

    const data = await response.json();

    // Handle non-2xx HTTP responses as errors
    if (!response.ok) throw new Error(data.message || "Update failed");

    // Return a success object to be used in client UI
    return { success: true, message: "Profile updated" };
  } catch (error) {
    // Gracefully handle any unexpected errors and return a user-friendly message
    return { success: false, message: error.message };
  }
}
