const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

// 1. Base fetcher (private/reusable)
async function _fetchWoocommerce(endpoint) {
  if (!consumerKey || !consumerSecret) {
    return { message: "API configuration error" };
  }

  try {
    const response = await fetch(
      `https://estore.zkrstic.com/wp-json/wc/v3/${endpoint}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      return {
        message:
          response.status === 404 ? "Data not found" : "API request failed",
        status: response.status,
      };
    }

    return await response.json();
  } catch (error) {
    return { message: "Network error", error: error.message };
  }
}

// 2. Public methods
export async function getProduct(id) {
  return await _fetchWoocommerce(`products/${id}`);
}

export async function getProducts() {
  return await _fetchWoocommerce("products");
}
