import Image from "next/image";

const consumerKey = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const consumerSecret = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

export default async function Home() {
  // Fetch products from the WooCommerce API
  const response = await fetch(
    `https://estore.zkrstic.com/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`,
    {
      next: { revalidate: 10 },
    }
  );

  // Check for response status
  if (!response.ok) {
    console.error("Failed to fetch products:", response.statusText);
    return (
      <div>
        <h1>Error fetching products</h1>
      </div>
    );
  }

  const products = await response.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              {product.images.length > 0 && (
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              )}
              <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
