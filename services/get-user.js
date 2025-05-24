const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
import getToken from "@/utils/auth/get-token";

export default async function getUser() {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64",
  );
  const token = getToken();
  if (!token) return { success: false, error: "No token provided" };

  try {
    // Step 1: Fetch basic WordPress user info
    const userRes = await fetch(
      "https://estore.zkrstic.com/wp-json/wp/v2/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    if (!userRes.ok) {
      throw new Error("Failed to fetch WP user");
    }

    const wpUser = await userRes.json();

    // Step 2: Fetch WooCommerce customer details using user ID
    const customerRes = await fetch(
      `https://estore.zkrstic.com/wp-json/wc/v3/customers/${wpUser.id}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        cache: "no-store",
      },
    );

    if (!customerRes.ok) {
      throw new Error("Failed to fetch WooCommerce customer");
    }

    const customer = await customerRes.json();

    // Return WooCommerce customer data
    return {
      success: true,
      data: customer,
    };
  } catch (error) {
    // Return error data
    return { success: false, error: error.message || "Unknown error" };
  }
}
