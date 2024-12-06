const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

export default async function getProduct() {
  // Fetch products from the WooCommerce API
  const response = await fetch(
    `https://estore.zkrstic.com/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`,
  );

  if (!response.ok) {
    console.error("Failed to fetch products:", response.statusText);
    return { message: "Failed to fetch products" };
  }

  const products = await response.json();
  return products;
}
