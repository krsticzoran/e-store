"use server";
import getToken from "@/utils/auth/get-token";
import { redirect } from "next/dist/server/api-utils";
const url = process.env.NEXT_PUBLIC_API_URL;

export async function updateUserAction(prevState, formData) {
  // Retrieve authentication token from cookies
  const token = getToken();

  // If token is missing, redirect user to the homepage - add logged out
  if (!token) {
    redirect("/");
  }

  try {
    // Send PUT request to update the authenticated user's data via WooCommerce REST API
    const response = await fetch(`${url}/wp-json/wc/v3/customers/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Token must be passed as a Bearer token in the Authorization header
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
        billing: {
          address_1: formData.address,
          city: formData.city,
          country: formData.country,
          phone: formData.phone,
        },
      }),
    });

    // Handle non-2xx HTTP responses as errors
    if (!response.ok) throw new Error(data.message || "Update failed");

    const data = await response.json();

    // Return a success object to be used in client UI
    return { success: true, message: "Profile updated" };
  } catch (error) {
    // Gracefully handle any unexpected errors and return a user-friendly message
    return { success: false, message: error.message };
  }
}
