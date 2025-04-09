const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

export default async function getSingleProduct(id) {
  // Validate environment variables first
  if (!consumerKey || !consumerSecret) {
    console.error('Missing WooCommerce API credentials');
    return null;
  }

  try {
    const response = await fetch(
      `https://estore.zkrstic.com/wp-json/wc/v3/products/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`,
      { next: { revalidate: 3600 } } // Optional: Add revalidation
    );

    // Handle 404 specifically for single products
    if (response.status === 404) {
      console.log(`Product ${id} not found`);
      return null;
    }

    if (!response.ok) {
      console.error('Failed to fetch product:', response.statusText);
      return null;
    }

    const product = await response.json();
    
    // Additional validation for product data
    if (!product?.id) {
      console.error('Invalid product data received');
      return null;
    }

    return product;
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}
